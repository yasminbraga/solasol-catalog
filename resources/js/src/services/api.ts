import axios from 'axios'

const baseURL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3333/api/v1'
    : 'http://localhost:3333/api/v1'

export default axios.create({
  baseURL,
})
