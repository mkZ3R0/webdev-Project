import Mainpage from './pages/Mainpage'
import ListingDetailsPage from './pages/PropertyListingPage'

const Property = {
  id: 1,
  img: '/assets/house1.jpg',
  title: 'Cozy Mountain Cabin',
  types: ['CABIN'],
  guests: 6,
  bedrooms: 3,
  bathrooms: 2,
  price_per_night: 150,
  rating: 4.9,
  reviews_count: 90,
}

function App() {
  return (
    <>
      {/* <Mainpage /> */}
      <ListingDetailsPage property={Property}/>
    </>
  )
}

export default App
