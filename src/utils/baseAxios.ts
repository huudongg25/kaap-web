import axios from 'axios'

const BaseAxios = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}`,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
})

BaseAxios.interceptors.request.use(
  async config => {
    let token
    try {
      // token =
      //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImYyMDcwNzQ4LWQ4NzgtNGUwMS05OTQ5LTg3NzY5NjJkYWU4ZCIsInVzZXJuYW1lIjoiQ2FuaEdpYXAiLCJ0eXBlIjoiYWNjZXNzVG9rZW4iLCJpYXQiOjE2NzI5Nzc5MDEsImV4cCI6MTcwNDUxMzkwMX0.HK4hRSiqQVByUV3Tb-fg5BMY9C5z8f9MSFjuGe6QdoY'

      token = localStorage.getItem('accessToken') ? localStorage.getItem('accessToken') : sessionStorage.getItem('accessToken')

    } catch (e) {}
    if (token !== null && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  error => {
    Promise.reject(error)
  }
)

// after send request
BaseAxios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    return Promise.reject(error)
  }
)

export default BaseAxios
