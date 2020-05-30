import React from 'react';
import {Link} from "react-router-dom";

const Header = () => (

    <header className="header">
        <ul className="nav nav--animated">
            <li className="nav__item">
                <Link className="nav__link" to="/">World</Link>
            </li>
            <li className="nav__item">
                <Link className="nav__link" to="/continent/Europe">Europe</Link>
            </li>
            <li className="nav__item">
                <Link className="nav__link" to="/continent/Asia">Asia</Link>
            </li>
            <li className="nav__item">
                <Link className="nav__link" to="/continent/North_America">North America</Link>
            </li>
            <li className="nav__item">
                <Link className="nav__link" to="/continent/South_America">South America</Link>
            </li>
            <li className="nav__item nav__item--africa">
                <Link className="nav__link" to="/continent/Africa">Africa</Link>
            </li>
            <li className="nav__item">
                <Link className="nav__link" to="/continent/Oceania">Oceania</Link>
            </li>
        </ul>
    </header>
);

export default Header;



