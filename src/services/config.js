const devBaseURL = 'http://139.196.7.90:8080'
const proBaseURL = 'http://139.196.7.90:8080'
export const BASE_URL =
  process.env.NODE_ENV === 'development' ? devBaseURL : proBaseURL

export const TIMEOUT = 5000
