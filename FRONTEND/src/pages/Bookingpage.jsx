import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const BookingPage = ({ property }) => 
{
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userContact, setUserContact] = useState("");
  const [error, setError] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);

  const calculateTotalPrice = () => {
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

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow bg-gray-700 py-8 px-4">
        <div className="max-w-4xl mx-auto bg-gray-800 text-teal-400 rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold mb-4">Booking for {property.title}</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div>
              <img
                src={property.img}
                alt={property.title}
                className="rounded-lg mb-4 w-full h-64 object-cover"
              />
              <h2 className="text-xl font-bold">{property.title}</h2>
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
                    // TODO: UPDATE THIS TO IMPLEMENT MOCK POINT AND REDIRECT USER TO HOME PAGE
                    onClick={() => alert('Booking Confirmed!')} 
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
