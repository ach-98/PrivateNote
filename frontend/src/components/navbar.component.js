import React, {Component} from 'react';
import {Link} from 'react-router-dom';

                //    <li className="navbar-item">
                //    <Link to ="/user" className="nav-link">Register</Link>
                //    </li>
                //    <li className="navbar-item">
                //    <Link to ="/login" className="nav-link">Login</Link>
                //    </li>

export default class NavBar extends Component {
    render() {
        return (
            <nav className="navbar navbar-light bg-light navbar-expand-lg">
                <Link to ="/" className="navbar-brand">PrivateNotes</Link>
                <div className="collapse navbar-collapse">
                <ul className="navbar-nav mr-auto">
                    <li className="navbar-item">
                    <Link to ="/" className="nav-link">Notes</Link>{''}
                    </li>
                    <li className="navbar-item">
                    <Link to ="/create" className="nav-link">Create Note</Link>{''}
                    </li>
                    <li className="navbar-item">
                    <Link to ="/login" className="nav-link">Logout</Link>{''}
                    </li>
                </ul>   
                </div>
            </nav>
        )
    } 
}