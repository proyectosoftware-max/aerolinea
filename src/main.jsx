import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './App.css'
import './index.css'
import './css/navbar.css'
import './css/modal.css'
import './css/carrusel.css'
import './css/radio.css'
import './css/accordion.css'
import './css/resumen.css'
import 'bootstrap/dist/css/bootstrap.min.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

//Barranquilla, medellin, bogotá, cartagena, santa marta