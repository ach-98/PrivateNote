import React, {Component} from 'react';
import {Link} from 'react-router-dom';

// Navbar contains links to note list, new note, change password, and to logout.
export default class NavBar extends Component {
    render() {
        return (
            <nav className="navbar navbar-light navbar-expand-lg" style={{backgroundColor: "aliceblue"}}>
                <Link to ="/" className="navbar-brand">PrivateNotes</Link>
                <div className="collapse navbar-collapse">
                <ul className="navbar-nav ml-auto">
                    <li className="navbar-item">
                    <Link to ="/" className="nav-link">Notes</Link>{''}
                    </li>
                    <li className="navbar-item">
                    <Link to ="/create" className="nav-link">Create Note</Link>{''}
                    </li>
                    <li className="navbar-item">
                    <Link to ="/change" className="nav-link">Account</Link>{''}
                    </li>
                    <li className="navbar-item" style={{float: "right"}}>
                    <Link to ="/logout" className="nav-link">Logout</Link>{''}
                    </li>
                </ul>   
                </div>
            </nav>
        )
    } 
}