import {useState} from 'react';

const Searchform = ({currSearch, handleSearchClick}) => 
{
    const [searchTerm,setSearchTerm] = useState(currSearch);

    const handleSearchInput = (event) =>
    {
        setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = (event) =>
    {
        event.preventDefault();

        handleSearchClick(searchTerm);
    };


    return (
        <div className="bg-gray-900 text-white">
            <form className="md:flex md:justify-between md:items-center sm:px-12 px-4 bg-[#ffffff19] py-7"
            onSubmit={handleSearchSubmit}>
                <h1 className="lg:text-4xl text-3xl md:mb-0 mb-6 lg:leading-normal font-semibold
                md:w-2/5">
                    Where Every Stay <br></br><span className="text-teal-400">Feels Like a Dream</span>
                </h1>
                <div>
                    <input type="text" placeholder="What are you looking for?" onChange={handleSearchInput}
                    className="text-gray-800 sm:w-72 w-full sm:mr-5 mr-1 lg:mb-0 mb-4 py-2.5 rounded 
                    px-2 focus:outline-none" />
                    <button className="bg-teal-400 hover:bg-teal-500 duration-300 px-5 py-2.5 font-[Poppins]
                    rounded-md text-white md:w-auto w-full" type="submit" disabled={!searchTerm}>
                    Search
                    </button>
                </div>
            </form>
        </div>
    );

};

export default Searchform;