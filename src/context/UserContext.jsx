import { createContext, useMemo, useState } from 'react'

const UserContext = createContext({ user: null, userId: null, setUser: () => {} })

function readStoredUser() {
  try {
    const raw = localStorage.getItem('user')
    if (raw) {
      const parsed = JSON.parse(raw)
      if (parsed && typeof parsed === 'object') return parsed
    }
  } catch {
    // Ignore malformed user payload in localStorage.
  }

  const userId = localStorage.getItem('userId')
  return userId ? { id: userId } : null
}

function UserProvider({ children }) {
  const [user, setUserState] = useState(readStoredUser)

  const setUser = (nextUser) => {
    setUserState(nextUser)
    if (nextUser) {
      localStorage.setItem('user', JSON.stringify(nextUser))
      if (nextUser.uid) localStorage.setItem('userId', JSON.stringify(nextUser.uid))
      return
    }
    localStorage.removeItem('user')
    localStorage.removeItem('userId')
  }

  const value = useMemo(
    () => ({
      user,
      userId: user?.uid ?? null,
      setUser,
    }),
    [user]
  )

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export { UserContext, UserProvider }
