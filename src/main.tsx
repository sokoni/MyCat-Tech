import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Amplify } from 'aws-amplify'
import awsExports from './aws-exports'
import './index.css'
import App from './App.tsx'
import { CartProvider } from './context/CartContext'

// Initialize Amplify
Amplify.configure(awsExports);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </StrictMode>,
)
