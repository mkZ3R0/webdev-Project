import React, { useState } from 'react';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <nav className="bg-blue-500 p-4">
            <div className="flex items-center justify-between">
                <div className="text-white text-2xl font-bold">ReactTailWind</div>  {/* Logo */}

                <div className="md:hidden">
                    <button className="text-white" onClick={toggleMenu}>
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

                <ul className="hidden md:flex space-x-4 items-center">
                    <li><a href="#" className='text-white px-3 py-2 rounded hover:bg-blue-700'>Home</a></li>
                    <li><a href="#" className='text-white px-3 py-2 rounded hover:bg-blue-700'>Experiences</a></li>
                    <li><a href="#" className='text-white px-3 py-2 rounded hover:bg-blue-700'>Online Experiences</a></li>
                    <li className="relative">
                        <button className="text-white px-3 py-2 rounded hover:bg-blue-700" onClick={toggleDropdown}>
                            My Profile
                        </button>
                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 text-center bg-blue-500 rounded-md shadow-lg py-2 pz-10">
                                <a href="/signup" className="block px-4 py-2 text-white hover:bg-blue-700 rounded">Sign Up</a>
                                <a href="/login" className="block px-4 py-2 text-white hover:bg-blue-700 rounded">Login</a>
                            </div>
                        )}
                    </li>
                </ul>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden">
                    <a href="#" className="block px-4 py-2 text-white hover:bg-blue-700">Home</a>
                    <a href="#" className="block px-4 py-2 text-white hover:bg-blue-700">Experiences</a>
                    <a href="#" className="block px-4 py-2 text-white hover:bg-blue-700">Online Experiences</a>
                    <div className="relative">
                        <button className="block w-full text-left px-4 py-2 text-white hover:bg-blue-700" onClick={toggleDropdown}>
                            My Profile
                        </button>
                        {isDropdownOpen && (
                            <div className="mt-0 w-full bg-blue-500 rounded-md shadow-lg py-2">
                                <a href="/signup" className="block px-4 py-2 text-white hover:bg-blue-700 rounded">Sign Up</a>
                                <a href="/login" className="block px-4 py-2 text-white hover:bg-blue-700 rounded">Login</a>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;