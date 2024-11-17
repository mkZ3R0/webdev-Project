import BookingPage from './pages/BookingPage'
import Mainpage from './pages/MainPage'
import ListingDetailsPage from './pages/LIstingDetailsPage'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Mainpage />} />
        <Route path="/property-listing/:id" element={<ListingDetailsPage />} />
        <Route path="/book/:id" element={<BookingPage />} />
      </Routes>
    </Router>
  )
}

export default App
