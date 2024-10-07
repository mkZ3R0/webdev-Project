import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Searchform from '../components/Searchform'
import CategoryList from '../components/CategoryList'
import ListingCardContainer from '../components/ListingCardContainer'
import {PROPERTIES} from '../Data/PROPERTIES'

function Mainpage() {

  const [activeCategory, setActiveCategory] = useState("TRENDING");
  const [filteredProperties, setFilteredProperties] = useState([]);

  useEffect(() => {

    const fetchProperties = async () => {
      //Simulate loading time
      await new Promise(resolve => setTimeout(resolve, 2000));

      const initialProperties = PROPERTIES.filter(property => 
        property.types.includes(activeCategory));

      setFilteredProperties(initialProperties);
    };

    fetchProperties();
  }, []); //Empty array means it only runs once when mounted

  const [noResults, setNoResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currSearch, setCurrSearch] = useState("");

  const handleCategoryClick = (name) =>
  {
      setActiveCategory(name);
      setCurrSearch("");
  };

  const handleSearchClick = (newSearch) =>
  {
    setCurrSearch(newSearch);
  };
  
  const fetchProperties = async () =>
  {
    setLoading(true);
    setFilteredProperties([]);

    await new Promise(resolve => setTimeout(resolve, 1000));

    let propertiesToDisplay;

    //Apply category filter
    if (activeCategory === "ALL") {
      propertiesToDisplay = PROPERTIES;
    } 
    else 
    {
      propertiesToDisplay = PROPERTIES.filter(property => property.types.includes(activeCategory));
    }

    //Apply search filter
    if (currSearch) 
    {
      propertiesToDisplay = propertiesToDisplay.filter(property =>
        property.title.toLowerCase().includes(currSearch.toLowerCase())
      );
    }

    setFilteredProperties(propertiesToDisplay);
    setNoResults(propertiesToDisplay.length === 0);
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
        <ListingCardContainer properties={filteredProperties}/>
      </div>
      <Footer className="mt-auto" />
    </div>
  )
}

export default Mainpage
