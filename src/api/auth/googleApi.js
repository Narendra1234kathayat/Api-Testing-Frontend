import { request } from './authClient'

function googleApi(payload) {
  return request('/api/auth/google-login', {
    method: 'POST',
    data: payload,
  })
}

export { googleApi }
