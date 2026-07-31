import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import { ThemeContextProvider } from './Context/ThemeContext'
import './index.css'



/* LLama al div y renderiza el app dentro de el */
createRoot(
  document.getElementById('root')
).render(
  <BrowserRouter>
    <ThemeContextProvider>
      <App />
    </ThemeContextProvider>
  </BrowserRouter>
)
