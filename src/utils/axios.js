import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL
});

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 500) {
      console.log('Server error')
    }

    return Promise.reject(error)
  }
)

export default axiosInstance
