import axios from 'axios'

const service = axios.create({baseURL: 'http://localhost:3000'});

const getWebSites = async () => {
  try {
    const response = await service.get('/sites')
    return response.data
  } catch (error) {
    console.error(error)
  }
}

const getWebSite = async (id) => {
  try {
    const response = await service.get(`/sites/${id}`)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

const postWebSites = async (payload) => {
  try {
    const response = await service.post('/sites', payload)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

const deleteWebSite = async (id) => {
  try {
    const response = await service.delete(`/sites/${id}`)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export default {
  getWebSites,
  getWebSite,
  postWebSites,
  deleteWebSite
}
