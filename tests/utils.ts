import supertest from 'supertest'
const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}/api`
const BASE_URL_API_V1 = `http://${process.env.HOST}:${process.env.PORT}/api/v1`

export const api = supertest(BASE_URL)
export const apiV1 = supertest(BASE_URL_API_V1)
