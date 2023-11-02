import { Link } from "react-router-dom";
import { X } from 'react-bootstrap-icons';

const MobileMenu = ({ closeMethod }) => {
    return (
        <>
            <button id="close-nav-menu" onClick={closeMethod}>
                <X />
            </button>
            <ul id='mobile-menu'>
                <li>
                    <Link to="/" onClick={closeMethod}>Home</Link>
                </li>
                <li>
                    <Link to="/dinosaurs" onClick={closeMethod}>Dinosaurs</Link>
                </li>
                <li>
                    <Link to="/about" onClick={closeMethod}>About</Link>
                </li>
                <li>
                    <Link to="/contact" onClick={closeMethod}>Contact</Link>
                </li>
                <li>
                    <Link to="/shop" onClick={closeMethod}>Shop</Link>
                </li>
            </ul>
        </>
    )
}

export default MobileMenu