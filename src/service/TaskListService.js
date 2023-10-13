import { http } from './http'

export const getAllTaskList = async () => {
  try {
    const { data } = await http.get('/tasklist/all')
    return data
  } catch (error) {
    throw error
  }
}

export const updateTaskList = async (idTaskList, data) => {
  try {
    const response = await http.patch('/tasklist', { idTaskList, data })
    return response?.data
  } catch (error) {
    throw error
  }
}

export const createTask = async (task, idTaskList) => {
  try {
    const { data } = await http.post('/task', { task, idTaskList })
    return data
  } catch (error) {
    throw error
  }
}

export const updateTask = async (idTask, idTaskList, data) => {
  try {
    const response = await http.patch('/task', { idTask, idTaskList, data })
    return response?.data
  } catch (error) {
    throw error
  }
}

export const createTaskList = async (data) => {
  try {
    const response = await http.post('/tasklist', { data })
    return response?.data
  } catch (error) {
    throw error
  }
}

export const deleteTaskList = async (idTaskList) => {
  try {
    const { data } = await http.delete('/tasklist', { data: { idTaskList } })
    return data
  } catch (error) {
    throw error
  }
}

export const getLatestTasksLists = async () => {
  try {
    const { data } = await http.get('/tasklist/latest')
    return data
  } catch (error) {
    throw error
  }
}