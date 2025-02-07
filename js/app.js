const select = e => document.querySelector(e)
const createEl = e => document.createElement(e)

const inputPokemonName = select('[data-js="pokemonName"]')
const form = select('[data-js="form"]')
const container = select('[data-js="container-cards"]')

const endPoint = 'https://pokeapi.co/api/v2/pokemon'

const classCard = 'p-0  mx-3 my-4'
const styleCard = 'max-width: 200px; width: 100%;'

const imgClass = 'w-100 bg-light border-2 border-bottom border-dark rounded-top-4'

const bodyCardClass = 'bg-danger p-1 border-n rounded-bottom-4'

const titleClass = 'text-center fs-3 text-white text-nowrap overflow-hidden'

const getData = async url => {
  const response = await fetch(url)
    .then(response => response)
    .then(data => data.json())
    .catch(console.log)
    return response
}


const createCard = async url => {
  const { name,  sprites} = await getData(url) 

  const card = createEl('div')
  const img = createEl('img')
  const bodyCard = createEl('div')
  const title = createEl('p')

  title.setAttribute('class', titleClass)
  title.textContent = `${name}`

  bodyCard.setAttribute('class', bodyCardClass)

  img.setAttribute('class', imgClass)
  img.setAttribute('alt', `${name} imagem`)
  img.src = `${sprites.front_default}`

  card.setAttribute('class', classCard)
  card.setAttribute('style', styleCard)

  bodyCard.append(title)
  card.append(img)
  card.append(bodyCard)

  container.append(card)
}

form.addEventListener('submit', e => {
  e.preventDefault()
  const pokemonName = e.target.pokemonName.value
  createCard(`${endPoint}/${pokemonName.trim()}`)
  inputPokemonName.value = ''
})