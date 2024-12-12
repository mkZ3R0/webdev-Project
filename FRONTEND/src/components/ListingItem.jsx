import React from 'react';

const ListingItem = ({ property, onDelete }) => {

    return (
        <div className="flex flex-col md:flex-row bg-gray-700 shadow-md rounded-lg p-4 mb-4 hover:shadow-lg transition-shadow rounded-lg gap-4 border border-violet-500">
          <img
            src={"http://localhost:8000/images/" + property.img}
            alt={property.title}
            className="w-full md:w-1/3 h-auto rounded-lg mb-4 md:mb-0 md:mr-4"
          />
          <div className="flex flex-col justify-between w-full">
            <div>
              <h3 className="text-violet-400 text-xl font-semibold">{property.title}</h3>
              <p className="text-teal-400">{property.location}</p>
            </div>
            <div className="flex flex-col space-y-2 mt-4">
              <h2 className="text-lg font-semibold text-teal-400">Property ID: {property._id}</h2>
              <p className="text-teal-400">
                <span className="font-medium">Guests:</span> {property.guests}
              </p>
              <p className="text-teal-400">
                <span className="font-medium">Bathrooms:</span> {property.bathrooms}
              </p>
              <p className="text-teal-400">
                <span className="font-medium">Price/night: $</span> {property.price_per_night}
              </p>
              <p className="text-teal-400">
                <span className="font-medium">Reviews: </span> {property.reviews_count}
              </p>
              <p className="text-yellow-500">
                <span className="font-medium">Rating: ⭐</span> {property.rating}
              </p>
              <button onClick={() => onDelete(property._id)} className="px-4 py-2 bg-red-500 text-white border-none rounded cursor-pointer">Delete</button>
            </div>
          </div>
        </div>
      );
};

export default ListingItem;