import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import ProductPage from './pages/ProductPage'
import FAQPage from './pages/FAQPage'
import './App.css'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/faq" element={<FAQPage />} />
      </Route>
    </Routes>
  )
}

export default App
