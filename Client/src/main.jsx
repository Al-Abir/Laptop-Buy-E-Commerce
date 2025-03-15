import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import { AuthProvider } from './context/auth.jsx'
import 'antd/dist/reset.css';
createRoot(document.getElementById('root')).render(
  <AuthProvider>
      <BrowserRouter>
      <StrictMode>
    <App />
  </StrictMode>
  </BrowserRouter>

  </AuthProvider>

  
)
