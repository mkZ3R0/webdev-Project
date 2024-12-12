import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import BookingItemContainer from '../components/BookingItemContainer';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useAuthStore } from '../store/useAuthStore';

function UserProfilePage() {

    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [initload, setInitLoad] = useState(true);
    const [error, setError] = useState(null);

    const { user } = useAuthStore();


    useEffect(() => {


        const fetchInitBookings = async () => {

            try {
                const token = localStorage.getItem("token");
                if (token) {
                    const response = await axios.get(`http://localhost:8000/api/bookings/${user._id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        }
                    });
                    setBookings(response.data);
                    setError(null);
                }
                else {
                    toast.error("Token not found, please sign in again.");
                }

            }
            catch (error) {
                console.log(error);
                setError(error);
            }
            finally {
                setLoading(false);
            }
        }

        fetchInitBookings();
        setInitLoad(false);
    }, []);

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

            {loading && <div className="flex flex-col items-center mt-8">
                <div className="animate-spin h-12 w-12 border-4 border-t-4 border-t-teal-400 border-gray-300 rounded-full"></div>
                <div className="text-teal-400 text-2xl sm:text-5xl mt-4">Loading</div>
            </div>}

            <div className="flex flex-col items-center mt-8">
                <h1 className="text-center text-violet-400 text-2xl sm:text-5xl mt-8">
                    User Profile
                </h1>
                <div className="text-center text-teal-400 text-xl sm:text-3xl mt-4">
                    <strong>User ID:</strong> {user._id}
                </div>
                <div className="text-center text-teal-400 text-xl sm:text-3xl mt-4">
                    <strong>Username:</strong> {user.username}
                </div>
                <div className="text-center text-teal-400 text-xl sm:text-3xl mt-4">
                    <strong>Account Created On:</strong> {new Date(user.createdAt).toLocaleDateString()}
                </div>
            </div>
            <div className="flex-grow">
                <h1 className="text-center text-violet-400 text-2xl sm:text-5xl mt-8">
                    Past Bookings
                </h1>
                {error && <div className="text-center text-red-400 text-2xl sm:text-5xl mt-8">
                    <strong>An Error occurred loading past bookings</strong>
                </div>}
                {!error && !loading && bookings.length === 0 && <div className="text-center text-teal-400 text-2xl sm:text-5xl mt-8">
                    <strong>No Past Bookings</strong>
                </div>}
                <BookingItemContainer bookings={bookings} />
            </div>

            <Footer className="mt-auto" />
        </div>
    )
};

export default UserProfilePage
