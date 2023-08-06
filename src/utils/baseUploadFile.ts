import axios from 'axios'

const BaseUploadFile = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}`,
  headers: {
    'Content-Type': 'multipart/form-data'
  }
})

BaseUploadFile.interceptors.request.use(
  async config => {
    let token
    try {
      token = localStorage.getItem('accessToken') ? localStorage.getItem('accessToken') : sessionStorage.getItem('accessToken')
    } catch (e) { }
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
BaseUploadFile.interceptors.response.use(
  response => {
    return response
  },
  error => {
    return Promise.reject(error)
  }
)

export default BaseUploadFile
