import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  // dangerouslyAllowBrowser: true,
})

const handler = async (event) => {
  console.log('console from fetchAI:', event.body)
  try {
    // const response = await openai.chat.completions.create({
    //   model: 'gpt-3.5-turbo',
    //   messages: event.body,
    // })
    // messages.push({
    //   role: 'system',
    //   content: response.choices[0].message.content,
    // })
    // console.log(response.choices[0].message.content)
    // console.log(messages)
    const data = event.body
    return {
      statusCode: 200,
      body: JSON.stringify({ data }),
      // body: JSON.stringify({ reply: response.choices[0].message.content }),
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
