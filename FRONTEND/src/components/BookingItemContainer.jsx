import React, { useState, useEffect } from 'react';
import BookingItem from './BookingItem';
import axios from 'axios';

const BookingItemContainer = ({ bookings }) => {
  const [properties, setProperties] = useState({});

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      const propertyDetails = {};
      for (const booking of bookings) {
        try {
          const response = await axios.get(`http://localhost:8000/api/listings/${booking.property_id}`);
          propertyDetails[booking.property_id] = response.data;
        } catch (error) {
          console.error(`Error fetching property details for property ID ${booking.property_id}:`, error);
        }
      }
      setProperties(propertyDetails);
    };

    fetchPropertyDetails();
  }, [bookings]);

  return (
    <div className="w-full h-full p-4 bg-gray-800">
      {bookings.map((booking) => (
        <BookingItem
          key={booking.property_id}
          booking={booking}
          property={properties[booking.property_id]}
        />
      ))}
    </div>
  );
};

export default BookingItemContainer;