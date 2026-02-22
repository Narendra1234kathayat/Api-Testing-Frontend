import { request } from "./authClient"
function forgotPassword(payload) {
    return request('/api/auth/forgot-password', {
        method: 'POST',
        data:payload,
    })
}
export {forgotPassword}