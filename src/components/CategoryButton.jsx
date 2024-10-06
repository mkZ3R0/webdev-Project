
const CategoryButton = ({ category, onClick, currCategory }) => 
{
    const handleButtonClick = () =>
    {
        onClick(category);
    }

    return (   
        <button
        className={`text-white px-3 py-2 rounded border-2 duration-300 
                    ${category === currCategory ? 'bg-black' : 'bg-gray-700 hover:text-teal-400'}`}
        onClick={handleButtonClick}
      >
        {category}
      </button>
    );
}

export default CategoryButton;