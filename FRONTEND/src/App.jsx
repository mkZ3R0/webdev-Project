import BookingPage from './pages/BookingPage'
import Mainpage from './pages/MainPage'
import ListingDetailsPage from './pages/ListingDetailsPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import axios from 'axios'
import {useEffect} from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/useAuthStore';

function App() {

  const {user, setUser} = useAuthStore();

  useEffect(() => {
    handleLoginBack();
  }, []);

  const handleLoginBack = async() => {
    try {
      const token = localStorage.getItem("token");
      if(token) 
      {
        const response = await axios.get("http://localhost:8000/api/auth/me",{
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        console.log(response.data);
        setUser(response.data.user);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
      <Routes>
        <Route path="/" element={<Mainpage />} />
        <Route path="/x" element={ user ? <Navigate to="/"/> : <LoginPage />} />
        <Route path="/property-listing/:id" element={<ListingDetailsPage />} />
        <Route path="/book/:id" element={ user ? <BookingPage /> : <Navigate to="/login" />} />
        <Route path="/login" element={ user ? <Navigate to="/"/> : <LoginPage />} />
        <Route path="/signup" element={ user ? <Navigate to="/"/> : <SignupPage />} />
      </Routes>
  )
}

export default App
