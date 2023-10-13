import { http } from './http'
export const registerService = async (user) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
    const response = await http.post('/users', user, config)
    return response.data
  } catch (error) {
    throw error
  }
}