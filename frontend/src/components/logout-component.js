import React, {Component} from 'react';
import axios from 'axios';

// Logs the user out of the app.
export default class Logout extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
        }
    }

    // Logs the user out of the app and returns to the login page. 
    componentDidMount(e) {
        axios.post('http://localhost:7000/users/logout')
            .then(response => sessionStorage.removeItem('user'))
            .catch(error => console.log(error))

        // Removes user from session storage so no longer authenticated.
        sessionStorage.removeItem('user');
        window.location='/logout';
    }

    render() {
        return (
            <div>
                <p>Logout successful</p>
            </div>
        )
    }
}