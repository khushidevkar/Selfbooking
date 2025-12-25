import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import "@/styles/scrollbar.css";
import "@/styles/HotelLoader.css"
import "@/styles/animation.css"


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
