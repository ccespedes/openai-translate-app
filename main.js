import './style.css'
// import OpenAI from 'openai'
import loader from '/loader.svg'

const loading = document.getElementById('loading')
const messageContainer = document.querySelector('.message-container')
const setup = document.getElementById('setup')
const result = document.getElementById('result')
const originalTextBubble = document.getElementById('original-text')
const translatedTextBubble = document.getElementById('translated-text')
let textToTranslate

result.style.display = 'none'
loading.style.display = 'none'

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
//   dangerouslyAllowBrowser: true,
// })

const messages = [
  {
    role: 'system',
    content:
      'You are a translator that strictly translates English into another language. Only provide the translation in your response.',
  },
]

async function pingAi(text, language) {
  messages.push({
    role: 'user',
    content: `Please translate the following: ${text} into ${language}`,
  })
  try {
    const url =
      'https://openai-translate.netlify.app/.netlify/functions/fetchAI'

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain',
      },
      body: messages,
    })

    const data = await res.json()
    console.log('data: ', data)

    // const response = await openai.chat.completions.create({
    //   model: 'gpt-3.5-turbo',
    //   messages: messages,
    // })
    // messages.push({
    //   role: 'system',
    //   content: response.choices[0].message.content,
    // })
    // console.log(response.choices[0].message.content)
    // console.log(messages)

    // messageContainer.classList.toggle('min')
    // loading.style.display = 'none'
    // setTimeout(() => {
    //   result.style.display = 'block'
    //   originalTextBubble.innerText = textToTranslate
    //   translatedTextBubble.innerText = response.choices[0].message.content
    // }, 200)
  } catch (error) {
    // showError(error)
    // console.log(messages)
    console.log('error: ', error)
  }
}

document.getElementById('language').addEventListener('submit', (e) => {
  const langChoices = document.getElementsByName('language')
  const translateTextInput = document.getElementById('translate-text')
  e.preventDefault()
  let selectedLanguage
  for (let i = 0; i < langChoices.length; i++) {
    langChoices[i].checked && (selectedLanguage = langChoices[i].id)
  }
  textToTranslate = translateTextInput.value
  selectedLanguage =
    selectedLanguage.charAt(0).toUpperCase() + selectedLanguage.slice(1)
  pingAi(textToTranslate, selectedLanguage)

  messageContainer.classList.toggle('min')
  translateTextInput.value = ''
  setup.style.display = 'none'
  loading.style.display = 'block'
  loading.innerHTML = `
    <p>loading ${selectedLanguage} translation...</p>
    <img src="${loader}" alt="loading">
  `
})

document.getElementById('start-over').addEventListener('click', () => {
  setup.style.display = 'block'
  result.style.display = 'none'
  loading.style.display = 'none'
})

const showError = (error) => {
  messages.push({
    role: 'system',
    content: error,
  })
  loading.innerHTML = ``
  const p = document.createElement('p')
  p.innerHTML = `<p>${error}</p>`
  const close = document.createElement('button')
  close.id = 'close'
  close.innerText = 'Close'
  close.addEventListener('click', () => {
    messageContainer.classList.toggle('min')
    setup.style.display = 'block'
    loading.style.display = 'none'
  })
  loading.append(p)
  loading.append(close)
}
