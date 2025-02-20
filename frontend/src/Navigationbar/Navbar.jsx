import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import Buttons from '../components/Buttons';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="flex justify-between items-center py-8 px-10 bg-white shadow-md sticky top-0 z-50">
      {/* Logo */}
      <div className="logo">
        <Link to="/" className="font-bold">Logo</Link>
      </div>

      {/* Navigation Links for Desktop */}
      <ul className="hidden md:flex flex-row gap-10">
        <li><Link to="/" className="text-primary">Form</Link></li>
        <li><Link to="/UpdateandDelete" className="hover:text-primary">Update/Delete</Link></li>
        <li><Link to="/Display" className="hover:text-primary">Display</Link></li>
      </ul>

      {/* Contact Me Button for Desktop */}
      <div className="hidden md:block">
        <Buttons
          buttonText="Contact Me"
          className="hover:bg-primary hover:text-white text-primary py-2 px-4 rounded border-2 border-primary"
          navigateTo="Contactform"
        />
      </div>

      {/* Menu Button for Mobile */}
      <div className="md:hidden z-50" onClick={toggleMenu}>
        {menuOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
      </div>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onClick={toggleMenu}></div>
      )}

      {/* Mobile Menu */}
      <div className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <ul className="flex flex-col gap-6 p-8 mt-16">
          <li><Link to="/" className="text-primary" onClick={toggleMenu}>Form</Link></li>
          <li><Link to="/UpdateandDelete" className="hover:text-primary" onClick={toggleMenu}>Update/Delete</Link></li>
          <li><Link to="/Display" className="hover:text-primary" onClick={toggleMenu}>Display</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
