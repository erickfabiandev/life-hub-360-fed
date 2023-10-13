import { http } from './http';

export const loginService = async (email, password) => {
  try {
    const { data } = await http.post('/auth/login', { email, password })
    return data
  } catch (error) {
    throw error
  }
}