import { Navigate, Route, Routes } from 'react-router-dom'
import SignInPage from './features/auth/pages/SignInPage'
import SignUpPage from './features/auth/pages/SignUpPage'
import ApiWorkspacePage from './features/workspace/pages/ApiWorkspacePage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/signin" replace />} />
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/workspace" element={<ApiWorkspacePage />} />
    </Routes>
  )
}

export default App
