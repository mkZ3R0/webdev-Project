import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Searchform from '../components/Searchform'
import CategoryList from '../components/CategoryList'

function Mainpage() {

  return (
    <div className="min-h-screen flex flex-col bg-gray-700">
      <Navbar />
      <Searchform />
      <CategoryList />
      <div className="flex-grow">
        {/* Main content here */}
      </div>
      <Footer className="mt-auto" />
    </div>
  )
}

export default Mainpage
