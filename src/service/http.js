import { AuthOptions } from '@/app/api/auth/[...nextauth]/route'
import axios from 'axios'
import { getServerSession } from 'next-auth'
import { getSession } from 'next-auth/react'

export const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api'
})

http.interceptors.request.use(
  async function (config) {
    let session = undefined
    try {
      session = await getServerSession(AuthOptions)
    } catch (error) {
      session = await getSession()
    }
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${session ? session.accessToken : undefined}`
    }

    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)