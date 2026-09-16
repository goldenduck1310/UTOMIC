const recipient = 'sheehansheehan120@gmail.com'

const clean = (value, limit = 4000) => String(value || '').trim().replace(/[\u0000-\u001f\u007f]/g, ' ').slice(0, limit)

const allowedServices = new Set(['AI SYSTEMS','MODERN WEB APPS','DIGITAL EXPERIENCES'])
const allowedStages = new Set(['Idea','Planning','Existing Product','Rebuild / Improvement'])
const allowedContactMethods = new Set(['Email','WhatsApp'])

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
  const company = clean(body.company, 160)
  const description = clean(body.description, 5000)
  const website = clean(body.website, 500)
  const stage = clean(body.stage, 100)
  const contactMethod = clean(body.contactMethod, 40)

  if (!allowedServices.has(service) || !allowedStages.has(stage) || !allowedContactMethods.has(contactMethod) || !name || !description || !/^\S+@\S+\.\S+$/.test(email)) {
    return response.status(400).json({ error: 'Please complete the required project details.' })
  }

  const submittedAt = new Intl.DateTimeFormat('en-GB', { dateStyle:'full', timeStyle:'long', timeZone:'Asia/Colombo' }).format(new Date())
  const text = `NEW UTOMIC PROJECT REQUEST\n\nName: ${name}\nEmail: ${email}\nPhone / WhatsApp: ${phone || 'Not provided'}\nCompany / Brand: ${company || 'Not provided'}\nProject Area: ${service}\nProject Stage: ${stage}\nWebsite: ${website || 'Not provided'}\nPreferred Contact: ${contactMethod}\n\nProject Description:\n${description}\n\nSubmission date/time: ${submittedAt}`

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
