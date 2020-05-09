import React, {Component} from 'react';
import {Link} from "react-router-dom";

class Header extends Component {

    componentDidMount(): void {
    }

    render() {
        return (
            <header className="header">
                <ul>
                    <li>
                        <Link to="/">World</Link>
                    </li>
                    <li>
                        <Link to="/continent/Europe">Europe</Link>
                    </li>
                    <li>
                        <Link to="/continent/Asia">Asia</Link>
                    </li>
                    <li>
                        <Link to="/continent/North_America">North America</Link>
                    </li>
                    <li>
                        <Link to="/continent/South_America">South America</Link>
                    </li>
                    <li>
                        <Link to="/continent/Africa">Africa</Link>
                    </li>
                    <li>
                        <Link to="/continent/Oceania">Oceania</Link>
                    </li>
                </ul>
            </header>
        );
    }
};

export default Header;



