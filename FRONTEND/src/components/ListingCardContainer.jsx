import ListingCard from './ListingCard'

const ListingCardContainer = ({properties, detailsCallback}) => 
{
    return (
        <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {properties.map((property) => (
            <ListingCard key={property.id} property={property} detailsCallback={detailsCallback}/>
            ))}
        </div>
        </div>
    );
};

export default ListingCardContainer;

