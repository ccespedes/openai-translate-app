import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  // dangerouslyAllowBrowser: true,
})

const handler = async (event) => {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: JSON.parse(event.body),
    })
    // console.log(response.choices[0].message.content)
    // console.log(messages)
    return {
      statusCode: 200,
      body: JSON.stringify({ reply: response }),
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
