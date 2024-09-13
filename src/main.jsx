import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './App.css'
import './index.css'
import './Css/navbar.css'
import './Css/modal.css'
import './Css/carrusel.css'
import './Css/radio.css'
import './Css/accordion.css'
import './Css/resumen.css'
import 'bootstrap/dist/css/bootstrap.min.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

//Barranquilla, medellin, bogotá, cartagena, santa marta