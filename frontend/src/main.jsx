import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Profile from './pages/Profile.jsx'
// import Home from './pages/Home.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Profile />
    {/* <Home /> */}
  </StrictMode>,
)
