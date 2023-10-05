const { VITE_BASE_URL: BASE_URL, VITE_API_KEY: API_KEY } = import.meta.env

async function fetchData(urlApi) {
  const response = await fetch(urlApi)
  const data = await response.json()
  return data
}

async function getGIFsByQuery(q, limit) {
  let searchGIFsUrl = `${BASE_URL}/search?api_key=${API_KEY}&q=${q}`
  if (limit) searchGIFsUrl += `&limit=${limit}`

  const GIFsList = await fetchData(searchGIFsUrl)
  return GIFsList
}

export { getGIFsByQuery }
