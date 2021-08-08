import axios from 'axios'

const baseURL = process.env.NODE_ENV === 'development' ? '/api/v1' : '/api/v1'

const api = axios.create({
  baseURL,
})

export default api
