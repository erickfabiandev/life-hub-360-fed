import { http } from './http'

export const createEvent = async (event) => {
  try {
    const { data } = await http.post('/event', event)
    return data
  } catch (error) {
    throw error
  }
}

export const getAllEvent = async () => {
  try {
    const { data } = await http.get('/event/all')
    return data
  } catch (error) {
    throw error
  }
}

export const getLatestEventsForUser = async () => {
  try {
    const { data } = await http.get('/event/latest')
    return data
  } catch (error) {
    throw error
  }
} 