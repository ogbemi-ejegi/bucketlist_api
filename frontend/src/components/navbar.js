import React from 'react';
import {Link} from 'react-router-dom';

export const Navigation = () => {
    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-dark">
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                <Link to="/"><li className="nav-link">Home</li></Link>
                <Link to="/addBucket"><li className="nav-link">Add Bucket</li></Link>
                <Link to="/registration"><li className="nav-link">Register</li></Link>
                <Link to="/login"><li className="nav-link">Login</li></Link>
            </ul>
            </div>
        </nav>
    )
}
