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
  const [noResults, setNoResults] = useState(false);
  const [currSearch, setCurrSearch] = useState("");

  const handleNavigate = (propertyID) => {
    console.log(propertyID);
    navigate(`/property-listing/${propertyID}`);
  };

  useEffect(() => {

    const fetchInitProperties = async () => {

      const response = await axios.get("http://localhost:8000/api/listings");

      console.log("fetching all using api");//TODO: REMOVE

      setAllProperties(response.data);

      const initialProperties = response.data.filter(property => 
        property.types.includes(activeCategory));

      setFilteredProperties(initialProperties);

    };

    fetchInitProperties();
  },[]); //Empty array means it only runs once when mounted

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

  // If properties are empty
  useEffect(() => 
  {
      setNoResults(filteredProperties.length === 0);
  }, [filteredProperties]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-700">
      <Navbar />
      <Searchform currSearch={currSearch} handleSearchClick={handleSearchClick} />
      <CategoryList activeCategory={activeCategory} handleCategoryClick={handleCategoryClick}/>

      {loading &&  <div className="flex flex-col items-center mt-8">
        <div className="animate-spin h-12 w-12 border-4 border-t-4 border-t-teal-400 border-gray-300 rounded-full"></div>
        <div className="text-teal-400 text-2xl sm:text-5xl mt-4">Loading</div>
    </div>}

      {!loading && noResults && <div className="text-center text-teal-400 text-2xl sm:text-5xl mt-8">
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
