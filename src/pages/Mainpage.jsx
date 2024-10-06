import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Searchform from '../components/Searchform'
import CategoryList from '../components/CategoryList'
import ListingCardContainer from '../components/ListingCardContainer'
import {PROPERTIES} from '../Data/PROPERTIES'

function Mainpage() {

  const [activeCategory, setActiveCategory] = useState("TRENDING");

  const initialProperties = PROPERTIES.filter(property => 
    property.types.includes(activeCategory));

  const [filteredProperties, setFilteredProperties] = useState(initialProperties);
  const [noResults, setNoResults] = useState(false);

  const handleCategoryClick = (name) =>
  {
      setActiveCategory(name);
  };
  
  useEffect(() => {
    if (activeCategory === "ALL") {
      setFilteredProperties(PROPERTIES); // Show all properties
    } 
    else 
    {
      const filtered = PROPERTIES.filter(property => 
        property.types.includes(activeCategory)
      );
      setFilteredProperties(filtered); // Filter properties based on the active category

    }
  }, [activeCategory]);

  useEffect(() => {
    setNoResults(filteredProperties.length === 0); // Check if there are no results
  }, [filteredProperties]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-700">
      <Navbar />
      <Searchform />
      <CategoryList activeCategory={activeCategory} handleCategoryClick={handleCategoryClick}/>

      {noResults && <div className="text-center text-teal-400 text-2xl sm:text-5xl mt-8">
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
