import React, {useState} from 'react'
import MobileMenu from './MobileMenu'
import {Link} from "react-router-dom"
import { List, CartFill} from 'react-bootstrap-icons';

const Header = () => {
  // declare on and off state for navbar
  const [menuIsOpen, openMenu] = useState(false);
  // toggle the state of openMenu
  const toggleMobileMenu = () => {
    openMenu(!menuIsOpen);
    document.body.classList.toggle('no-scroll');
  }
  return (
    <>
      <div id='topnav'>
        <div id='logo'>
          <Link to="/">Website Title</Link>
        </div>


        {/* Desktop Menu, which only appears on large screens */}
        <ul id='menu'>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/dinosaurs">Dinosaurs</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/shop">Shop</Link>
          </li>
          <li>
            <Link to={`/cart`}>
              <CartFill /> Cart
            </Link>
          </li>
        </ul>

        {/* Hamburger icon, only shows up on small screens. */}
        <div id="menu-container">
          <button id="menu-button" className='show-mobile-menu-button' onClick={toggleMobileMenu}>
            <List id="hamburger-icon" />
          </button>
        </div>
      </div>

      {/* If menuIsOpen, show the mobile menu*/}
      {/* give the mobile menu our close method (toggleMobileMenu) too, as a prop, so you can close it by clicking on a link */}
      {menuIsOpen && <MobileMenu closeMethod={toggleMobileMenu} />}
      {/* If menuIsOpen, show the close button */}
    </>
              

            
  )
}

export default Header