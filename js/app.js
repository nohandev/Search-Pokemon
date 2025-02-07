const select = e => document.querySelector(e)
const createEl = e => document.createElement(e)

const inputPokemonName = select('[data-js="pokemonName"]')
const form = select('[data-js="form"]')
const container = select('[data-js="container-cards"]')
const alertContainer = select('[data-js="container-alert"]')
const alertSpan = select('[data-js="container-alert"]')

const endPoint = 'https://pokeapi.co/api/v2/pokemon'

const classCard = 'p-0  mx-3 my-4'
const styleCard = 'max-width: 200px; width: 100%;'

const imgClass = 'w-100 bg-light border-2 border-bottom border-dark rounded-top-4'

const bodyCardClass = 'bg-danger p-1 border-n rounded-bottom-4'

const titleClass = 'text-center fs-3 text-white text-nowrap overflow-hidden'

const warningClass = 'd-block alert alert-warning p-2'

const dangerClass = 'd-block alert alert-danger p-2'

const getData = async url => await fetch(url)


const createCard = (name, imgSrc) => {
  const card = createEl('div')
  const img = createEl('img')
  const bodyCard = createEl('div')
  const title = createEl('p')

  title.setAttribute('class', titleClass)
  title.textContent = `${name}`

  bodyCard.setAttribute('class', bodyCardClass)

  img.setAttribute('class', imgClass)
  img.setAttribute('alt', `${name} imagem`)
  img.setAttribute('src', imgSrc.front_default)

  card.setAttribute('class', classCard)
  card.setAttribute('style', styleCard)

  bodyCard.append(title)
  card.append(img)
  card.append(bodyCard)

  container.append(card)
}

 const setError = message => {
  alertContainer.setAttribute('class', dangerClass)
  alertSpan.textContent = message
 }

 const setWarning = () => {
  alertContainer.setAttribute('class', warningClass)
  alertSpan.textContent = 'Preencha os campos vazios!'
}

const setCard = async url => {
   await getData(url)
    .then(response => {
      if(!response.ok) {
        throw new Error(`Pokemon not found, status: ${response.status}`)
      }
      return response.json()
    })
    .then(({ name, sprites }) => createCard(name, sprites))
    .catch(error => setError(error))
}

form.addEventListener('submit', e => {
  e.preventDefault()
  const pokemonName = e.target.pokemonName.value
  if (!pokemonName) {
    setWarning()
    return
  }
  
   alertContainer.setAttribute('class', 'd-none')
   setCard(`${endPoint}/${pokemonName.trim()}`)
  inputPokemonName.value = ''
})