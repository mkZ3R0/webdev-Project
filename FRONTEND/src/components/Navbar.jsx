import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';


const Navbar = () => {
    const navigate = useNavigate();
    const {user, setUser} = useAuthStore();

    const handleNavigate = (path) => {
      navigate(path);
    };

    const handleLogOut = (path) => {
        setUser(null);
        localStorage.removeItem('token');
        navigate(path);
    }

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <nav className="bg-gray-900 p-4">
            <div className="flex items-center justify-between">
            <img src="/assets/airbnb.png" alt="Logo" className="h-24 w-54 mr-2" />
                <div className="md:hidden">
                    <button className="text-teal-400" onClick={toggleMenu}>
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
                    <li><a href="#" onClick={() => handleNavigate('/')}  className='text-white text-2xl px-3 py-2 rounded hover:text-teal-400 duration-300'>Home</a></li>
                    <li><a href="#" onClick={() => handleNavigate('/')}  className='text-white text-2xl px-3 py-2 rounded hover:text-teal-400 duration-300'>Experiences</a></li>
                    <li><a href="#" onClick={() => handleNavigate('/')}  className='text-white text-2xl px-3 py-2 rounded hover:text-teal-400 duration-300'>Online Experiences</a></li>
                    <li className="relative">
                        <button className="text-white text-2xl px-3 py-2 rounded hover:text-teal-400 duration-300" onClick={toggleDropdown}>
                            My Profile
                        </button>
                        {isDropdownOpen && !user && (
                            <div className="absolute right-0 text-center bg-gray-900 rounded-md shadow-lg py-2 pz-10 border-teal-400 border-2">
                                <a onClick={() => handleNavigate('/signup')} className="block px-4 py-2 text-white text-2xl hover:text-teal-400 duration-300 rounded">Sign Up</a>
                                <a onClick={() => handleNavigate('/login')} className="block px-4 py-2 text-white text-2xl hover:text-teal-400 duration-300 rounded">Login</a>
                            </div>
                        )}
                        {isDropdownOpen && user && (
                            <div className="absolute right-0 text-center bg-gray-900 rounded-md shadow-lg py-2 pz-10 border-teal-400 border-2">
                                <a onClick={() => handleNavigate('/')} className="block px-4 py-2 text-white text-2xl hover:text-teal-400 duration-300 rounded">Profile</a>
                                <a onClick={() => handleLogOut('/')} className="block px-4 py-2 text-white text-2xl hover:text-teal-400 duration-300 rounded">Log Out</a>
                            </div>
                        )}
                    </li>
                </ul>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden">
                    <a href="#" onClick={() => handleNavigate('/')}  className="block py-2 text-white hover:text-teal-400 duration-300">Home</a>
                    <a href="#" onClick={() => handleNavigate('/')}  className="block py-2 text-white hover:text-teal-400 duration-300">Experiences</a>
                    <a href="#" onClick={() => handleNavigate('/')}  className="block py-2 text-white hover:text-teal-400 duration-300">Online Experiences</a>
                    <div className="relative">
                        <button className="block w-full text-left py-2 text-white hover:text-teal-400 duration-300" onClick={toggleDropdown}>
                            My Profile
                        </button>
                        {isDropdownOpen && !user && (
                            <div className="mt-0 w-full bg-gray-900 rounded-md shadow-lg py-2 ">
                                <a onClick={() => handleNavigate('/signup')} className="block py-2 text-white hover:text-teal-400 duration-300 rounded">Sign Up</a>
                                <a onClick={() => handleNavigate('/login')} className="block py-2 text-white hover:text-teal-400 duration-300 rounded">Login</a>
                            </div>
                        )}

                        {isDropdownOpen && user && (
                            <div className="mt-0 w-full bg-gray-900 rounded-md shadow-lg py-2 ">
                                <a onClick={() => handleNavigate('/')} className="block py-2 text-white hover:text-teal-400 duration-300 rounded">Profile</a>
                                <a onClick={() => handleLogOut('/')} className="block py-2 text-white hover:text-teal-400 duration-300 rounded">Log Out</a>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;