
const CategoryButton = ({ category, onClick }) => 
{
    const handleButtonClick = () =>
    {
        onClick(category);
    }

    return (   
    <button 
        className='text-white px-3 py-2 rounded bg-gray-700 hover:text-teal-400 duration-300 border-2 border-teal-400'
        onClick={handleButtonClick}
    >
        {category}
    </button>
    );
}

export default CategoryButton;