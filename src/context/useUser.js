import { useContext } from 'react'
import { UserContext } from './UserContext'

function useUser() {
  return useContext(UserContext)
}

export { useUser }
