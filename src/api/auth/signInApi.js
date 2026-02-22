import { request } from './authClient'

function signIn(payload) {
  console.log(payload);
  return request('/api/auth/signin', {
    method: 'POST',
    data:payload,
  })
}

export { signIn }
