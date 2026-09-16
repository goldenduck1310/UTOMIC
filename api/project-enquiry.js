const allowedProjectTypes = new Set([
  'AI SYSTEM',
  'AI AUTOMATION',
  'MODERN WEB APP',
  'PREMIUM WEBSITE',
  'DIGITAL EXPERIENCE',
  'CUSTOM DIGITAL SYSTEM'
])

const allowedScopes = new Set([
  'SMALL PROJECT',
  'GROWTH PROJECT',
  'LARGE / CUSTOM PROJECT',
  'NOT SURE YET'
])

const requestLog = new Map()
const RATE_WINDOW_MS = 15 * 60 * 1000
const RATE_LIMIT = 5
const MAX_BODY_BYTES = 20_000

const textValue = (value) => typeof value === 'string' ? value.trim() : ''
const safeLine = (value, maxLength) => textValue(value)
  .replace(/[\u0000-\u001f\u007f]/g, ' ')
  .replace(/\s+/g, ' ')
  .slice(0, maxLength)

const safeMessage = (value, maxLength) => textValue(value)
  .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, '')
  .slice(0, maxLength)

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function clientAddress(request) {
  const forwarded = request.headers['x-forwarded-for']
  if (Array.isArray(forwarded)) return forwarded[0] || 'unknown'
  return String(forwarded || request.headers['x-real-ip'] || 'unknown').split(',')[0].trim()
}

function isRateLimited(key) {
  const now = Date.now()
  const recent = (requestLog.get(key) || []).filter(timestamp => now - timestamp < RATE_WINDOW_MS)
  recent.push(now)
  requestLog.set(key, recent)

  if (requestLog.size > 500) {
    for (const [storedKey, timestamps] of requestLog) {
      if (!timestamps.some(timestamp => now - timestamp < RATE_WINDOW_MS)) requestLog.delete(storedKey)
    }
  }

  return recent.length > RATE_LIMIT
}

function validate(body) {
  const projectType = safeLine(body.projectType, 80)
  const name = safeLine(body.name, 120)
  const email = safeLine(body.email, 254).toLowerCase()
  const phone = safeLine(body.phone, 80)
  const projectName = safeLine(body.projectName, 160)
  const description = safeMessage(body.description, 5000)
  const goal = safeMessage(body.goal, 1500)
  const scope = safeLine(body.scope, 80)

  if (!allowedProjectTypes.has(projectType)) return { error: 'Choose a valid project type.' }
  if (!allowedScopes.has(scope)) return { error: 'Choose a valid project scope.' }
  if (name.length < 2) return { error: 'Enter your name.' }
  if (!emailPattern.test(email) || email.length > 254) return { error: 'Enter a valid email address.' }
  if (projectName.length < 2) return { error: 'Enter a project or company name.' }
  if (description.length < 20) return { error: 'Add a little more detail about the project.' }
  if (goal.length < 10) return { error: 'Describe the primary goal of the project.' }

  return { value: { projectType, name, email, phone, projectName, description, goal, scope } }
}

export default async function handler(request, response) {
  response.setHeader('Cache-Control', 'no-store')

  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST')
    return response.status(405).json({ error: 'Method not allowed.' })
  }

  if (!String(request.headers['content-type'] || '').toLowerCase().startsWith('application/json')) {
    return response.status(415).json({ error: 'Content-Type must be application/json.' })
  }

  const declaredLength = Number(request.headers['content-length'] || 0)
  if (declaredLength > MAX_BODY_BYTES) return response.status(413).json({ error: 'Request is too large.' })

  const body = request.body && typeof request.body === 'object' ? request.body : {}
  if (Buffer.byteLength(JSON.stringify(body), 'utf8') > MAX_BODY_BYTES) {
    return response.status(413).json({ error: 'Request is too large.' })
  }

  // Honeypot submissions are accepted quietly without contacting the provider.
  if (textValue(body.companyWebsite)) return response.status(200).json({ ok: true })

  if (isRateLimited(clientAddress(request))) {
    response.setHeader('Retry-After', String(Math.ceil(RATE_WINDOW_MS / 1000)))
    return response.status(429).json({ error: 'Too many requests. Please wait before trying again.' })
  }

  const validation = validate(body)
  if (validation.error) return response.status(400).json({ error: validation.error })

  const apiKey = process.env.RESEND_API_KEY
  const notificationEmail = process.env.PROJECT_NOTIFICATION_EMAIL
  const fromEmail = process.env.PROJECT_FROM_EMAIL
  if (!apiKey || !notificationEmail || !fromEmail) {
    return response.status(503).json({ error: 'Project enquiries are temporarily unavailable. Please try again later.' })
  }

  const { projectType, name, email, phone, projectName, description, goal, scope } = validation.value
  const submittedAt = new Date().toISOString()
  const message = [
    'NEW UTOMIC PROJECT ENQUIRY',
    '',
    `Name: ${name}`,
    `Email: ${email}`,
    `WhatsApp / Phone: ${phone || 'Not provided'}`,
    `Project / Company: ${projectName}`,
    `Project Type: ${projectType}`,
    `Project Scope: ${scope}`,
    '',
    'Project Description:',
    description,
    '',
    'Primary Goal:',
    goal,
    '',
    `Submitted: ${submittedAt}`,
    'Source: UTOMIC Website'
  ].join('\n')

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 10_000)

  try {
    const providerResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      signal: controller.signal,
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [notificationEmail],
        reply_to: email,
        subject: `New UTOMIC project enquiry — ${projectType}`,
        text: message
      })
    })

    if (!providerResponse.ok) {
      return response.status(502).json({ error: 'We could not send your project enquiry. Please try again.' })
    }

    return response.status(200).json({ ok: true })
  } catch {
    return response.status(502).json({ error: 'We could not send your project enquiry. Please try again.' })
  } finally {
    clearTimeout(timeout)
  }
}
