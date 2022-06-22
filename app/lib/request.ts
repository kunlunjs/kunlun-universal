import axios from 'axios'

export const request = axios.create({
  baseURL: 'http://localhost:3001/api' // `http://localhost:${process.env.SERVER_PORT}`
})
