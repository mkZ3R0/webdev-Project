import React from 'react';

const ListingItem = ({ property, onDelete }) => {
return (
    <div className="flex flex-col md:flex-row mb-5 items-center bg-gray-700 p-3 rounded-lg gap-4 border border-violet-500">
        <img src={"http://localhost:8000/images/" + property.img} alt={property.title} className="w-full md:w-36 h-48 md:h-24 mr-0 md:mr-5 rounded-lg" />
        <div className="flex-1 text-center md:text-left">
            <h3 className="m-0 mb-2 text-teal-400">{property.title}</h3>
            <p className="m-0 mb-1 text-teal-400">{property.location}</p>
            <p className="m-0 mb-1">
                <span className="text-violet-400">Listing ID# </span>
                <span className="text-teal-400">{property._id}</span>
            </p>
            <p className="m-0 mb-1">
                <span className="text-violet-400">Guests: </span>
                <span className="text-teal-400">{property.guests}</span>
            </p>
            <p className="m-0 mb-1">
                <span className="text-violet-400">Price/night: </span>
                <span className="text-teal-400">${property.price_per_night}</span>
            </p>
            <p className="m-0 mb-1 text-yellow-500">⭐  {property.rating}</p>
        </div>
        <button onClick={() => onDelete(property._id)} className="px-4 py-2 bg-red-500 text-white border-none rounded cursor-pointer">Delete</button>
    </div>
);
};

export default ListingItem;