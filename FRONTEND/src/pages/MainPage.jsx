import { useState, useEffect} from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Searchform from '../components/Searchform'
import CategoryList from '../components/CategoryList'
import ListingCardContainer from '../components/ListingCardContainer'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function MainPage() {
  const navigate = useNavigate();

  const [activeCategory, setActiveCategory] = useState("TRENDING");
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [allProperties, setAllProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [initload, setInitLoad] = useState(true);
  const [currSearch, setCurrSearch] = useState("");
  const [error, setError] = useState(null);

  const handleNavigate = (propertyID) => {
    navigate(`/property-listing/${propertyID}`);
  };

  useEffect(() => {

    const fetchInitProperties = async () => {

      try{
        const response = await axios.get("http://localhost:8000/api/listings");
        setAllProperties(response.data);
        setError(null);
      }
      catch (error) {
        setError(error);
      }
    };

    fetchInitProperties();
    setLoading(false);
    setInitLoad(false);
  },[]); //Empty array means it only runs once when mounted

  //Initial render list
  useEffect(() => {

    const trendingProperties = allProperties.filter(property => 
      property.types.includes(activeCategory));
    setFilteredProperties(trendingProperties)
  },[allProperties]);

  const handleCategoryClick = (name) =>
  {
      setActiveCategory(name);
      setCurrSearch("");
  };

  const handleSearchClick = (newSearch) =>
  {
    setCurrSearch(newSearch);
  };
  
  const fetchProperties = () =>
  {
    setLoading(true);
    setFilteredProperties([]);

    let propertiesToDisplay;

    //Apply category filter
    if (activeCategory === "ALL") {
      propertiesToDisplay = allProperties;
    } 
    else 
    {
      propertiesToDisplay = allProperties.filter(property => property.types.includes(activeCategory));
    }

    //Apply search filter
    if (currSearch) 
    {
      propertiesToDisplay = propertiesToDisplay.filter(property =>
        property.title.toLowerCase().includes(currSearch.toLowerCase())
      );
    }

    setFilteredProperties(propertiesToDisplay);
    setLoading(false);
  };

  //For Category queries
  useEffect(() => 
  {
      fetchProperties();
  }, [activeCategory,currSearch]);

  if (initload) {
    return (
  <div className="flex flex-col justify-center items-center min-h-screen bg-gray-700">
    <div className="animate-spin h-12 w-12 border-4 border-t-4 border-t-teal-400 border-gray-300 rounded-full"></div>
    <div className="text-teal-400 text-2xl sm:text-5xl mt-4">Loading</div>
  </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-700">
      <Navbar />
      <Searchform currSearch={currSearch} handleSearchClick={handleSearchClick} />
      <CategoryList activeCategory={activeCategory} handleCategoryClick={handleCategoryClick}/>

      {loading &&  <div className="flex flex-col items-center mt-8">
        <div className="animate-spin h-12 w-12 border-4 border-t-4 border-t-teal-400 border-gray-300 rounded-full"></div>
        <div className="text-teal-400 text-2xl sm:text-5xl mt-4">Loading</div>
    </div>}

      {error && <div className="text-center text-teal-400 text-2xl sm:text-5xl mt-8">
        <strong>An Error occured trying to fetch properties</strong>
        </div>}

      {!error && !loading && filteredProperties.length === 0 && <div className="text-center text-teal-400 text-2xl sm:text-5xl mt-8">
        <strong>No Available Properties</strong>
        </div>}

      <div className="flex-grow">
        <ListingCardContainer properties={filteredProperties} detailsCallback={handleNavigate}/>
      </div>
      <Footer className="mt-auto" />
    </div>
  )
}

export default MainPage
