const MAX_MESSAGES = 16
const MAX_MESSAGE_LENGTH = 2000

const advisorInstructions = `You are the UTOMIC AI Advisor for a premium AI systems and modern web applications studio. Answer clearly, concisely and honestly. Focus on AI systems, automation, digital products, modern web applications, product strategy and practical implementation. Do not invent UTOMIC case studies, clients, prices, guarantees or capabilities. When a question requires project-specific details, recommend discussing the requirements with UTOMIC.`

function readOutputText(response) {
  if (typeof response.output_text === 'string' && response.output_text.trim()) return response.output_text.trim()
  return (response.output || [])
    .flatMap(item => item.type === 'message' ? item.content || [] : [])
    .filter(item => item.type === 'output_text' && typeof item.text === 'string')
    .map(item => item.text)
    .join('\n')
    .trim()
}

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST')
    return response.status(405).json({ error:'Method not allowed.' })
  }

  if (!process.env.OPENAI_API_KEY) return response.status(503).json({ error:'The AI Advisor is not configured yet.' })

  const suppliedMessages = Array.isArray(request.body?.messages) ? request.body.messages : []
  const messages = suppliedMessages
    .slice(-MAX_MESSAGES)
    .filter(message => ['user','assistant'].includes(message?.role) && typeof message?.content === 'string')
    .map(message => ({ role:message.role, content:message.content.trim().slice(0, MAX_MESSAGE_LENGTH) }))
    .filter(message => message.content)

  if (!messages.length || messages[messages.length - 1].role !== 'user') return response.status(400).json({ error:'A user message is required.' })

  try {
    const openAIResponse = await fetch('https://api.openai.com/v1/responses', {
      method:'POST',
      headers:{ 'Authorization':`Bearer ${process.env.OPENAI_API_KEY}`, 'Content-Type':'application/json' },
      body:JSON.stringify({
        model:process.env.OPENAI_MODEL || 'gpt-5.6-luna',
        instructions:advisorInstructions,
        input:messages,
        max_output_tokens:700,
        store:false
      })
    })
    const result = await openAIResponse.json().catch(() => ({}))
    if (!openAIResponse.ok) {
      console.error('OpenAI response error', openAIResponse.status, result?.error?.type || 'unknown')
      return response.status(502).json({ error:'The AI Advisor could not respond right now.' })
    }
    const message = readOutputText(result)
    if (!message) return response.status(502).json({ error:'The AI Advisor returned an empty response.' })
    return response.status(200).json({ message })
  } catch (error) {
    console.error('AI Advisor request failed', error instanceof Error ? error.message : 'unknown error')
    return response.status(502).json({ error:'The AI Advisor could not respond right now.' })
  }
}
