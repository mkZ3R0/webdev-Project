import { useState, useEffect} from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ListingItemContainer from '../components/ListingItemContainer';
import axios from 'axios';
import {toast} from 'react-hot-toast';

function AdminPage() {

  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [initload, setInitLoad] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {

    const fetchInitListings = async () => {

      try{
        const response = await axios.get("http://localhost:8000/api/admin/listings");
        setListings(response.data);
        setError(null);
      }
      catch (error) {
        setError(error);
      }
      finally{
        setLoading(false);
      }
    };

    fetchInitListings();
    setInitLoad(false);
  },[]);

    const deleteListing = async (id) => {
        
        try {
            const response = await axios.delete(`http://localhost:8000/api/admin/listings/${id}`);
            setListings(listings.filter(listing => listing._id !== id));
            toast.success(response.data.message);
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
    <div className="min-h-screen flex flex-col bg-gray-700">
      <Navbar />

      {loading &&  <div className="flex flex-col items-center mt-8">
        <div className="animate-spin h-12 w-12 border-4 border-t-4 border-t-teal-400 border-gray-300 rounded-full"></div>
        <div className="text-teal-400 text-2xl sm:text-5xl mt-4">Loading</div>
    </div>}

      {error && <div className="text-center text-red-400 text-2xl sm:text-5xl mt-8">
        <strong>An Error occured trying to fetch listings</strong>
        </div>}

      {!error && !loading && listings.length === 0 && <div className="text-center text-teal-400 text-2xl sm:text-5xl mt-8">
        <strong>No Available listings</strong>
        </div>}

      <div className="flex-grow">
        <ListingItemContainer listings={listings} onDelete={deleteListing}/>
      </div>
      <Footer className="mt-auto" />
    </div>
  )
};

export default AdminPage
