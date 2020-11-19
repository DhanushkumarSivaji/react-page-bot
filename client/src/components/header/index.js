import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <nav className="black">
            <div className="nav-wrapper container ">
                <Link to="/" className="brand-logo">It Courses</Link>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><Link to={'/shop'}>Shop</Link></li>
                    <li><Link to={'/about'}>About</Link></li>
                </ul>
            </div>
        </nav>
    )
}

export default Header