import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Event from './pages/Event'
import Home from './pages/Home'
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/event/:id" element={<Event />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
