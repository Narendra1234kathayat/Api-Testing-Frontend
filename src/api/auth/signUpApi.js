import { request } from './authClient'

function signUp(payload) {
  return request('/api/auth/signup', {
    method: 'POST',
    data: payload,
  })
}

export { signUp }
