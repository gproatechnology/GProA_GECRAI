export interface User {
  id: string
  username: string
  role: string
}

export interface Project {
  id: string
  name: string
  status: string
  created: string
}

export interface Analysis {
  type: string
  date: string
  result: string
  details: string
}

export interface MemoryCalculation {
  generated?: string
  pages?: number
  status?: string
}

export interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
}
