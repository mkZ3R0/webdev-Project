import BookingPage from './pages/BookingPage'
import Mainpage from './pages/MainPage'
import ListingDetailsPage from './pages/ListingDetailsPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import AdminPage from './pages/AdminPage'
import UserProfilePage from './pages/UserProfilePage'
import HostPage from './pages/HostPage'
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
        setUser(response.data.user);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const HostConditionalRoute = () => {
    if (!user) {
      return <Navigate to="/login" />;
    } else if (user.role === 'admin') {
      return <Navigate to="/admin-panel" />;
    } else if (user.role === 'host') {
      return <HostPage />;
    } else if (user.role === 'guest') {
      return <Navigate to="/user-profile" />;
    } else {
      return <Navigate to="/login" />;
    }
  };

  const AdminConditionalRoute = () => {
    if (!user) {
      return <Navigate to="/login" />;
    } else if (user.role === 'admin') {
      return <AdminPage />;
    } else if (user.role === 'host') {
      return <Navigate to="/host-panel" />
    } else if (user.role === 'guest') {
      return <Navigate to="/user-profile" />;
    } else {
      return <Navigate to="/login" />;
    }
  };

  const GuestConditionalRoute = () => {
    if (!user) {
      return <Navigate to="/login" />;
    } else if (user.role === 'admin') {
      return <Navigate to="/admin-panel" />;
    } else if (user.role === 'host') {
      return <Navigate to="/host-panel" />
    } else if (user.role === 'guest') {
      return <UserProfilePage/>;
    } else {
      return <Navigate to="/login" />;
    }
  };

  return (
      <Routes>
        <Route path="/" element={<Mainpage />} />
        <Route path="/property-listing/:id" element={<ListingDetailsPage />} />
        <Route path="/book/:id" element={ user ? <BookingPage /> : <Navigate to="/login" />} />
        <Route path="/login" element={ user ? <Navigate to="/"/> : <LoginPage />} />
        <Route path="/signup" element={ user ? <Navigate to="/"/> : <SignupPage />} />
        <Route path="/user-profile" element={<GuestConditionalRoute/>} />
        <Route path="/admin-panel" element={<AdminConditionalRoute/> }/>
        <Route path="/host-panel" element={<HostConditionalRoute />} />
      </Routes>
  )
}

export default App
