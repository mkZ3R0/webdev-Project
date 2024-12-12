import { useState, useEffect} from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ListingItemContainer from '../components/ListingItemContainer';
import BookingItemContainer from '../components/BookingItemContainer';
import ListingForm from '../components/ListingForm';
import axios from 'axios';
import {toast} from 'react-hot-toast';

function AdminPage() {

  const [listings, setListings] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [isListing, setIsListing] = useState('A');//A=listing, B=Booking, C=Add Listing
  const [loading, setLoading] = useState(true);
  const [initload, setInitLoad] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {

    const fetchInitListings = async () => {

      try{
        const token = localStorage.getItem("token");
        if (token) {
            const response = await axios.get("http://localhost:8000/api/admin/listings", {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            setListings(response.data);
            setError(null);
        }
      }
      catch (error) {
        setError(error);
      }
    };

    const fetchInitBookings = async () => {
            
        try{
          const token = localStorage.getItem("token");
          if (token) {
              const response = await axios.get("http://localhost:8000/api/admin/bookings", {
                  headers: {
                      Authorization: `Bearer ${token}`,
                  }
              });
              setBookings(response.data);
              setError(null);
          }
        }
        catch (error) {
          setError(error);
        }
        finally{
          setLoading(false);
        }
    }

    fetchInitListings();
    fetchInitBookings();
    setInitLoad(false);
  },[]);

    const deleteListing = async (id) => {
        
        try {
            const token = localStorage.getItem("token");
            if (token) {
                const response = await axios.delete(`http://localhost:8000/api/admin/listings/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                setListings(listings.filter(listing => listing._id !== id));
                toast.success(response.data.message);
            }
        } catch (error) {
            console.log(error);
            setError(error);
        }
    }



  if (initload) {
    return (
  <div className="flex flex-col justify-center items-center min-h-screen bg-gray-700">
    <div className="animate-spin h-12 w-12 border-4 border-t-4 border-t-teal-400 border-gray-300 rounded-full"></div>
    <div className="text-teal-400 text-2xl sm:text-5xl mt-4">Loading</div>
  </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-800">
      <Navbar />

      <div className="flex justify-center items-center bg-gray-800 mt-8 mb-4 space-x-4">
        <button 
          className={`px-4 py-2 rounded ${isListing === "A" ? 'bg-teal-500' : 'bg-violet-500'}`} 
          onClick={() => setIsListing("A")}
        >
          Listings Management
        </button>
        <button 
          className={`px-4 py-2 rounded ${isListing === "B" ? 'bg-teal-500' : 'bg-violet-500'}`} 
          onClick={() => setIsListing("B")}
        >
          Bookings Management
        </button>
        <button 
          className={`px-4 py-2 rounded ${isListing === "C" ? 'bg-teal-500' : 'bg-violet-500'}`} 
          onClick={() => setIsListing("C")}
        >
          Add a Listing
        </button>
      </div>

      {loading &&  <div className="flex flex-col items-center mt-8">
        <div className="animate-spin h-12 w-12 border-4 border-t-4 border-t-teal-400 border-gray-300 rounded-full"></div>
        <div className="text-teal-400 text-2xl sm:text-5xl mt-4">Loading</div>
    </div>}

      {error && <div className="text-center text-red-400 text-2xl sm:text-5xl mt-8">
        <strong>An Error occured loading listings and bookings</strong>
        </div>}

      {!error && !loading && isListing === "A" && listings.length === 0 && <div className="text-center text-teal-400 text-2xl sm:text-5xl mt-8">
        <strong>No Available listings</strong>
        </div>}

    {!error && !loading && isListing === "B" && bookings.length === 0 && <div className="text-center text-teal-400 text-2xl sm:text-5xl mt-8">
        <strong>No Available Bookings</strong>
        </div>}

      {isListing === "A" && <div className="flex-grow">
        <ListingItemContainer listings={listings} onDelete={deleteListing}/>
      </div> }

      {isListing === "B" && <div className="flex-grow">
        <BookingItemContainer bookings={bookings}/>
       </div> }

      {isListing === "C" && <div className="flex-grow">
        <ListingForm />
      </div> }
      <Footer className="mt-auto" />
    </div>
  )
};

export default AdminPage
