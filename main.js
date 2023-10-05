import { getGIFsByQuery } from "./fetch"

const $ = (selector) => document.querySelector(selector)
const $$ = (selector) => document.querySelectorAll(selector)

const searchInput = $('#search-input')
const searchButton = $('#search-button')
const limitInput = $('#limit-input')
const GIFsSection = $('.gifs-section')
const notResults = $('.not-results')
const loader = $('.loader')

function createGIFsElements(GIFsList) {
  console.log(GIFsList)
  GIFsList.forEach((gif) => {
    const img = document.createElement('img')
    img.setAttribute('src', gif.images.original.url)
    img.setAttribute('width', gif.images.original.width / 2)
    img.setAttribute('class', 'img-gif')
    GIFsSection.appendChild(img)
  })
}

function cleanData() {
  notResults.setAttribute('hidden', true)
  $$('.img-gif').forEach((element) => element.remove())
}

searchButton.addEventListener('click', async () => {
  cleanData()
  loader.removeAttribute('hidden')

  const query = searchInput.value.trim()
  const limit = limitInput.value
  const GIFsList = await getGIFsByQuery(query, limit)

  if (GIFsList.data.length > 0) {
    createGIFsElements(GIFsList.data)
  } else {
    notResults.removeAttribute('hidden')
  }

  loader.setAttribute('hidden', true)
  searchInput.value = ''
})

searchInput.addEventListener('keydown', (event) => {
  const { code } = event

  if (code === 'Enter') {
    event.preventDefault()
    searchButton.click()
  }
})
