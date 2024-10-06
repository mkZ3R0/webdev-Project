
const ListingCard = ({ property }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-gray-900 flex flex-col h-full border-teal-400 border-2">
      {/* Property Image */}
      <img className="w-full h-48 object-cover" src={property.img} alt={property.title} />

      {/* Property Details */}
      <div className="px-6 py-4 flex-grow">
        {/* Property Title */}
        <div className="font-bold text-xl mb-2 text-teal-400">{property.title}</div>

        {/* Property Type */}
        <p className="text-violet-400 text-sm">{property.type}</p>

        {/* Guests, Bedrooms, Bathrooms */}
        <div className="flex space-x-2 text-violet-400 text-sm mt-2">
          <span>{property.guests} guests</span>
          <span>{property.bedrooms} bedrooms</span>
          <span>{property.bathrooms} bathrooms</span>
        </div>

        {/* Price per Night */}
        <div className="text-lg font-bold text-teal-500 mt-4">${property.price_per_night} / night</div>

        {/* Rating */}
        <div className="flex items-center mt-2">
          <span className="text-yellow-500">⭐ {property.rating}</span>
          <span className="ml-2 text-violet-400 text-sm">({property.reviews_count} reviews)</span>
        </div>
      </div>

      {/* "Book Me" Button */}
      <div className="mt-auto px-6 pb-4">
        <button className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded w-full">
          Book Me
        </button>
      </div>
    </div>
  );
};
  
  export default ListingCard;