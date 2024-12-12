import React from 'react';
import ListingItem from './ListingItem';

const ListingItemContainer = ({listings, onDelete}) => {

return (
    <div className="w-full h-full p-4 bg-gray-800">
        {listings.map(listing => (
            <ListingItem key={listing._id} property={listing} onDelete={onDelete} />
        ))}
    </div>
);
};

export default ListingItemContainer;