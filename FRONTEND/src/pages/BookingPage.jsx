import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";
import { useAuthStore } from "../store/useAuthStore";
import {toast} from 'react-hot-toast';

const BookingPage = () => 
{
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuthStore();

  //STATES FOR BOOKING FORM
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userContact, setUserContact] = useState("");
  const [error, setError] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);

  //STATES FOR PAGE ITSELF
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorPage, setErrorPage] = useState(null);
  const [sentPOST, setSentPost] = useState(false);

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/listings/${id}`);
        setProperty(response.data);
        setLoading(false);
        setErrorPage(null);
      } catch (error) {
        setErrorPage(error.message);
        setLoading(false);
      }
    };
  
    fetchPropertyDetails();
  }, [id]);

  const calculateTotalPrice = () => {
    if (property === null)
    {
      return;
    }
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);

    if (checkOut > checkIn) 
    {
      const days = Math.ceil(
        (checkOut - checkIn) / (1000 * 60 * 60 * 24)
      );
      setTotalPrice(days * property.price_per_night);
      setError("");
    } 
    else 
    {
      setError("Check-out date must be after check-in date.");
      setTotalPrice(0);
    }
  };

  const handleBooking = (e) => {
    e.preventDefault();
    if (!checkInDate || !checkOutDate || !userName || !userEmail || !userContact) 
    {
      setError("All fields are required.");
      return;
    }
    if ( userContact.length !== 11) 
    {
      setError("Contact number must be 11 digits.");
      return;
    }
    if (!/^\d+$/.test(userContact)) //cHECK HAS ONLY DIGITS
    {
      setError("Contact number must contain only digits.");
      return;
    }
    calculateTotalPrice();
  };

  const confirmBooking = async () => {
    try {
      setSentPost(true);
      const response = await axios.post(`http://localhost:8000/api/bookings/${id}`,{
        user_id: user._id,  
        user_name: userName,
        user_email: userEmail,
        user_contact: userContact,
        check_in: checkInDate,
        check_out: checkOutDate,
        total_price: totalPrice,
      });
      toast.success(response.data.message);
      setSentPost(false);
      navigate(`/`);
    }
    catch (error) {
      if(error.response) {
        toast.error(error.response.data.message);
      }
      else
      {
        toast.error("Network Error");
      }
      setSentPost(false);
    }
  };

  //Rendering

  if (loading) {
    return (
  <div className="flex flex-col justify-center items-center min-h-screen bg-gray-700">
    <div className="animate-spin h-12 w-12 border-4 border-t-4 border-t-teal-400 border-gray-300 rounded-full"></div>
    <div className="text-teal-400 text-2xl sm:text-5xl mt-4">Loading</div>
  </div>
    )
  }

  if (errorPage) {
    return (
    <div className="flex flex-col min-h-screen bg-gray-700">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8 flex justify-center items-center text-white">
        <div className="text-teal-400 text-2xl sm:text-5xl text-center">
          An Error occurred trying to fetch properties
          <br />
          <br/>
          <p className="text-red-500 text-2xl sm:text-5xl text-center">{errorPage}</p>
        </div>
      </main>
      <Footer />
    </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow bg-gray-700 py-8 px-4">
        <div className="max-w-4xl mx-auto bg-gray-800 text-teal-400 rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold mb-4">Booking for {property.title}</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div>
              <img
                src={"http://localhost:8000/images/"+property.img}
                alt={property.title}
                className="rounded-lg mb-4 w-full h-64 object-cover"
              />
              <h2 className="text-xl font-bold">{property.title}</h2>
              <p className="text-teal-400">
                Location: <span className="font-semibold">{property.location}</span>
              </p>
              <p className="text-yellow-500 font-medium">
                Rating: {property.rating} ⭐ ({property.reviews_count} reviews)
                </p>
              <p className="text-teal-400">
                Price per night: <span className="font-semibold">${property.price_per_night}</span>
              </p>
              <p className="text-teal-400">
                Total Price:{" "}
                <span className="font-semibold">
                  {totalPrice > 0 ? `$${totalPrice}` : "Select dates to calculate"}
                </span>
              </p>
            </div>

            {/* Booking Form */}
            <form onSubmit={handleBooking} className="space-y-4">
              <div>
                <label
                  htmlFor="userName"
                  className="block text-sm font-medium text-teal-400"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="userName"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-600 focus:ring-blue-500 focus:border-blue-500 sm:text-sm placeholder-teal-400"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label
                  htmlFor="userEmail"
                  className="block text-sm font-medium text-teal-400"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="userEmail"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-600 focus:ring-blue-500 focus:border-blue-500 sm:text-sm placeholder-teal-400"
                  placeholder="Your Email"
                />
              </div>
              <div>
                <label
                  htmlFor="userContact"
                  className="block text-sm font-medium text-teal-400"
                >
                  Contact Number
                </label>
                <input
                  type="tel"
                  id="userContact"
                  value={userContact}
                  onChange={(e) => setUserContact(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-600 focus:ring-blue-500 focus:border-blue-500 sm:text-sm placeholder-teal-400"
                  placeholder="Your Contact Number"
                />
              </div>

              {/* Check-in and Check-out Dates */}
              <div>
                <label
                  htmlFor="checkInDate"
                  className="block text-sm font-medium text-teal-400"
                >
                  Check-in Date
                </label>
                <input
                  type="date"
                  id="checkInDate"
                  value={checkInDate}
                  onChange={(e) => setCheckInDate(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-600 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="checkOutDate"
                  className="block text-sm font-medium text-teal-400"
                >
                  Check-out Date
                </label>
                <input
                  type="date"
                  id="checkOutDate"
                  value={checkOutDate}
                  onChange={(e) => setCheckOutDate(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-600 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}

              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded font-semibold"
              >
                Calculate Total Price
              </button>
              {totalPrice > 0 && (
                    <button
                    type="button"
                    onClick={confirmBooking} 
                    disabled={sentPOST}
                    className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded font-semibold mt-4"
                    >
                    Confirm Booking
                    </button>
                )}
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BookingPage;
