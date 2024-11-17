import BookingPage from './pages/Bookingpage'
import Mainpage from './pages/Mainpage'
import ListingDetailsPage from './pages/PropertyListingPage'

const Property = {
  id: 1,
  img: '/assets/house1.jpg',
  title: 'Cozy Mountain Cabin',
  types: ['CABIN','TRENDING'],
  guests: 6,
  bedrooms: 3,
  bathrooms: 2,
  price_per_night: 150,
  rating: 4.9,
  reviews_count: 90,
  description: 'This is a great cabin for couples/large families. Enjoy a beautiful nightsky view from the balcony. The cabin is located in the heart of the mountains. The cabin is fully furnished and has a fully equipped kitchen. The cabin is located near a lake and a river. The cabin is pet friendly.',
  amenities: ['Wifi', 'Kitchen', 'Heating', 'Washer', 'Dryer', 'Free parking'],
}

function App() {
  return (
    <>
      {/* <Mainpage /> */}
      {/* <ListingDetailsPage property={Property}/> */}
      <BookingPage property={Property}/>
    </>
  )
}

export default App
