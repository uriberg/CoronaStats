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
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/continent/Oceania">Oceania</Link>
                    </li>
                    <li>
                        <Link to="/continent/Europe">Europe</Link>
                    </li>
                </ul>
            </header>
        );
    }
};

export default Header;



