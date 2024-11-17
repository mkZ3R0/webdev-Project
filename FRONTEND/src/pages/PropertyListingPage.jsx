import React from "react";
// import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer"; // Adjust import as per your file structure
import Navbar from "../components/Navbar";

const ListingDetailsPage = ({ property }) => {
//   const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Property Image */}
          <div>
            <img
              src={property.img}
              alt={property.title}
              className="rounded-lg w-full object-cover"
            />
          </div>

          {/* Property Details */}
          <div>
            <h1 className="text-2xl font-bold mb-4">{property.title}</h1>
            <p className="text-gray-700 mb-2">
              <strong>Type:</strong> {property.types.join(", ")}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Guests:</strong> {property.guests}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Bedrooms:</strong> {property.bedrooms}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Bathrooms:</strong> {property.bathrooms}
            </p>
            <p className="text-gray-800 text-lg font-semibold">
              ${property.price_per_night} / night
            </p>
            <p className="text-yellow-500 font-medium mb-2">
              Rating: {property.rating} ⭐ ({property.reviews_count} reviews)
            </p>
            <button
            //   onClick={() => navigate("/booking")}
              className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Book Now
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ListingDetailsPage;
