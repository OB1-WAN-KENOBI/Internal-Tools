import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from './app/routes'

// Get base path from import.meta.env or use default
const basename = import.meta.env.BASE_URL || '/'

function App() {
  return (
    <BrowserRouter
      basename={basename}
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
