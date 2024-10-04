import React, { useState } from "react";

const Navbar = () =>
{
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => 
    {
        setIsMenuOpen(!isMenuOpen);
    }

    return (
        <nav className="bg-blue-500 p-4">
            <div className="flex items-center justify-between">
                <div className="text-white text-2xl font-bold">ReactTailWind</div>  {/*MY logo comes here */}

                <div className="md:hidden">
                    <button className="text-white" onClick={toggleMenu} >
                        <svg
                            fill='none'
                            stroke='currentColor'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            viewBox='0 0 24 24'
                            className='w-6 h-6'
                        >
                            <path d='M4 6h16M4 12h16M4 18h16'></path>
                        </svg>
                    </button>
                </div>


                <ul className="hidden md:flex space-x-4">
                    <li><a href="#" className='text-white'>Home</a></li>
                    <li><a href="#" className='text-white'>Experiences</a></li>
                    <li><a href="#" className='text-white'>Online Experiences</a></li>
                </ul>
            </div>


            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden">
                    <ul className="flex flex-col">
                        <li className='py-2'><a href="#" className='text-white'>Home</a></li>
                        <li className='py-2'><a href="#" className='text-white'>Experiences</a></li>
                        <li className='py-2'><a href="#" className='text-white'>Online Experiences</a></li>
                    </ul>
                </div>
            )}

        </nav>
    )
}

export default Navbar