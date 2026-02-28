import { request } from './authClient'

function signIn(payload) {
  return request('/api/auth/signin', {
    method: 'POST',
    data: payload,
  })
}

export { signIn }
