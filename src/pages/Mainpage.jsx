import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Searchform from '../components/Searchform'

function Mainpage() {

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Searchform />
      <div className="flex-grow">
        {/* Main content here */}
      </div>
      <Footer className="mt-auto" />
    </div>
  )
}

export default Mainpage
