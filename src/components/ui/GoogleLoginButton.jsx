import { GoogleLogin } from '@react-oauth/google'
import { googleApi } from '../../api/auth/googleApi'
import { markAuthenticated } from '../../utils/auth'
import { useUser } from '../../context/useUser'

function extractUser(res) {
  return res?.user ?? res?.data?.user
}

function extractToken(res) {
  return (
    res?.tokens?.accessToken ??
    res?.token ??
    res?.tokens ??
    res?.data?.tokens?.accessToken ??
    res?.data?.token ??
    res?.data?.tokens
  )
}

export default function GoogleLoginButton() {
  const { setUser } = useUser()

  const handleSuccess = async (credentialResponse) => {
    try {
      const googleToken = credentialResponse?.credential
      if (!googleToken) {
        throw new Error('Google credential is missing.')
      }

      const res = await googleApi({ googleToken })
      const token = extractToken(res)
      if (token) {
        localStorage.setItem(
          'token',
          typeof token === 'string' ? token : JSON.stringify(token)
        )
      }
      const user = extractUser(res)
      if (user) {
        setUser(user)
      }

      markAuthenticated()

      window.location.href = '/workspace'
    } catch (error) {
      console.log('Google Login Error:', error?.message || error)
    }
  }

  const handleGoogleError = () => {
    alert('Google Login Failed. Please try again.')
    console.log('Google Login Failed')
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <GoogleLogin onSuccess={handleSuccess} onError={handleGoogleError} useOneTap />
    </div>
  )
}
