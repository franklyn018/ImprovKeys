import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// index.html
//    ↓
// main.jsx        ← starts React
//    ↓
// App.jsx         ← main UI
//    ↓
// App.css         ← styles App
//    ↓
// assets/*        ← images used by App