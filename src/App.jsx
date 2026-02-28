import { Navigate, Route, Routes } from 'react-router-dom'
import SignInPage from './features/auth/pages/SignInPage'
import SignUpPage from './features/auth/pages/SignUpPage'
import ApiWorkspacePage from './features/workspace/pages/ApiWorkspacePage'
import PublicOnlyRoute from './components/routing/PublicOnlyRoute'
import NotFoundPage from './features/errors/pages/NotFoundPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/workspace" replace />} />
      <Route
        path="/signin"
        element={
          <PublicOnlyRoute>
            <SignInPage />
          </PublicOnlyRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <PublicOnlyRoute>
            <SignUpPage />
          </PublicOnlyRoute>
        }
      />
      <Route
        path="/workspace"
        element={<ApiWorkspacePage />}
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
