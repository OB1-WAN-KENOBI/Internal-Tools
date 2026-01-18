import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from './app/routes'

function App() {
  return (
    <BrowserRouter
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
