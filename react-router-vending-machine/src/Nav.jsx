import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
    return (
        <nav className="navbar">
            <Link to='/coke'>Coke</Link>
            <Link to='/pepsi'>Pepsi</Link>
            <Link to='/snickers'>Snickers</Link>
            <Link to='/kitkat'>Kitkat</Link>
        </nav>
    )
}

export default Nav