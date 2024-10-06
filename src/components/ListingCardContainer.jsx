import ListingCard from './ListingCard'
import {PROPERTIES} from '../Data/PROPERTIES'

const ListingCardContainer = () => 
{
    return (
        <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {PROPERTIES.map((property) => (
            <ListingCard key={property.id} property={property} />
            ))}
        </div>
        </div>
    );
};

export default ListingCardContainer;

