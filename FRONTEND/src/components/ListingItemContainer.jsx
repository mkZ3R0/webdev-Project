import React from 'react';
import ListingItem from './ListingItem';

const ListingItemContainer = ({listings, onDelete}) => {

return (
    <div className="flex flex-col bg-gray-800">
        {listings.map(listing => (
            <ListingItem key={listing._id} property={listing} onDelete={onDelete} />
        ))}
    </div>
);
};

export default ListingItemContainer;