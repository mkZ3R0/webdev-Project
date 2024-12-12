import React from 'react';

const BookingItem = ({ booking, property }) => {
  if (!property) 
  {
    return (<div className="flex flex-col items-center mt-8">
      <div className="animate-spin h-12 w-12 border-4 border-t-4 border-t-teal-400 border-gray-300 rounded-full"></div>
      <div className="text-teal-400 text-2xl sm:text-5xl mt-4">Loading</div>
    </div>);
  }
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
          <h2 className="text-lg font-semibold text-teal-400">Property ID: {booking.property_id}</h2>
          <h2 className="text-lg font-semibold text-teal-400">Customer ID: {booking.user_id}</h2>
          <p className="text-teal-400">
            <span className="font-medium">Guest:</span> {booking.user_name}
          </p>
          <p className="text-teal-400">
            <span className="font-medium">Email:</span> {booking.user_email}
          </p>
          <p className="text-teal-400">
            <span className="font-medium">Contact:</span> {booking.user_contact}
          </p>
          <p className="text-teal-400">
            <span className="font-medium">Check-In:</span> {new Date(booking.check_in).toLocaleDateString()}
          </p>
          <p className="text-teal-400">
            <span className="font-medium">Check-Out:</span> {new Date(booking.check_out).toLocaleDateString()}
          </p>
          <p className="text-teal-400 font-semibold">
            <span className="font-medium">Total Price:</span> ${booking.total_price}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookingItem;

