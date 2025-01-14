import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Profile from './pages/Profile.jsx'
import Home from './pages/Home.jsx'
import Management from './pages/Management.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Home />
    {/* <Profile /> */}
    {/*<div className="tailwind-scope"> 
      <Management/>
    </div> */}
  </StrictMode>,
)
