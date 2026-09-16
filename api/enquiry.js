const recipient = 'sheehansheehan120@gmail.com'

const clean = (value, limit = 4000) => String(value || '').trim().replace(/[\u0000-\u001f\u007f]/g, ' ').slice(0, limit)

const allowedServices = new Set(['AI SYSTEM','MODERN WEB APP','PREMIUM WEBSITE','AI AUTOMATION','DIGITAL EXPERIENCE','CUSTOM DIGITAL SYSTEM'])
const allowedScopes = new Set(['SMALL PROJECT','GROWTH PROJECT','LARGE / CUSTOM PROJECT','NOT SURE YET'])

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST')
    return response.status(405).json({ error: 'Method not allowed.' })
  }

  if (!process.env.RESEND_API_KEY || !process.env.UTOMIC_ENQUIRY_FROM) {
    return response.status(503).json({ error: 'Project enquiries are not configured yet. Please contact UTOMIC directly.' })
  }

  const body = request.body || {}
  const service = clean(body.service, 80)
  const name = clean(body.name, 120)
  const email = clean(body.email, 254)
  const phone = clean(body.phone, 80)
  const projectName = clean(body.projectName, 160)
  const description = clean(body.description, 5000)
  const goal = clean(body.goal, 1500)
  const scope = clean(body.scope, 80)

  if (!allowedServices.has(service) || !allowedScopes.has(scope) || !projectName || !name || !description || !goal || !/^\S+@\S+\.\S+$/.test(email)) {
    return response.status(400).json({ error: 'Please complete the required project details.' })
  }

  const submittedAt = new Intl.DateTimeFormat('en-GB', { dateStyle:'full', timeStyle:'long', timeZone:'Asia/Colombo' }).format(new Date())
  const text = `NEW UTOMIC PROJECT ENQUIRY\n\nService: ${service}\nProject / Company: ${projectName}\nScope: ${scope}\n\nProject Description:\n${description}\n\nPrimary Goal:\n${goal}\n\nContact Name: ${name}\nEmail: ${email}\nWhatsApp / Phone: ${phone || 'Not provided'}\n\nSubmission date/time: ${submittedAt}`

  try {
    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: process.env.UTOMIC_ENQUIRY_FROM, to: [recipient], reply_to: email, subject: `New UTOMIC project request — ${service}`, text })
    })
    if (!emailResponse.ok) throw new Error('Email provider rejected the enquiry.')
    return response.status(200).json({ ok: true })
  } catch {
    return response.status(502).json({ error: 'We couldn’t send your enquiry. Please try again.' })
  }
}
