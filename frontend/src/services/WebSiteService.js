import axios from 'axios'

const getWebSites = async () => {
  try {
    const response = await axios.get('http://localhost:3000/sites')
    return response.data;
  } catch (error) {
    throw new error;
  }
}

export default {
  getWebSites
}
