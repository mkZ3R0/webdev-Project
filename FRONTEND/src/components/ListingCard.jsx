
const ListingCard = ({ property , detailsCallback}) => {

  //Details Callback
  const handleNavigate = () => 
  {
    detailsCallback(property._id);
  }


  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-gray-900 flex flex-col h-full border-teal-400 border-2">
      {/* Property Image */}
      <img className="w-full h-48 object-cover" src={property.img} alt={property.title} />

      {/* Property Details */}
      <div className="px-6 py-4 flex-grow">
        {/* Property Title */}
        <div className="font-bold text-xl mb-2 text-teal-400">{property.title}</div>
      
      {/* Property types List */}
        <div className="flex flex-wrap mt-2">
          {property.types.map((type, index) => (
            <span key={index} className="bg-violet-700 rounded-full px-3 py-1 text-teal-400 text-sm mr-2 mb-2">
              {type}
            </span>
          ))}
        </div>

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
        <button className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded w-full" onClick={handleNavigate}>
          Book Me
        </button>
      </div>
    </div>
  );
};
  
  export default ListingCard;