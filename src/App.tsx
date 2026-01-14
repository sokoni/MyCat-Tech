import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Authenticator } from '@aws-amplify/ui-react'
import './styles/global.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Portfolio from './pages/Portfolio'
import Store from './pages/Store'
import Login from './pages/Login'
import Cart from './pages/Cart'
import CheckoutSuccess from './pages/CheckoutSuccess'

function App() {
  return (
    <Authenticator.Provider>
      <Router>
        <div className="app-container">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/store" element={<Store />} />
              <Route path="/login" element={<Login />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout-success" element={<CheckoutSuccess />} />
            </Routes>
          </main>
          <footer className="section" style={{ textAlign: 'center', color: 'var(--text-muted)', borderTop: '1px solid var(--glass-border)', marginTop: '4rem' }}>
            <p>© 2026 GatoTech Portfolio. Stay Purr-fect.</p>
          </footer>
        </div>
      </Router>
    </Authenticator.Provider>
  )
}

export default App
