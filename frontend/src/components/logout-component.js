import React, {Component} from 'react';
//import {Link} from 'react-router-dom';
import axios from 'axios';

export default class Logout extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
        }
    }

    componentDidMount(e) {
        //e.preventDefault();
        axios.post('http://localhost:7000/users/logout')
            .then(response => sessionStorage.removeItem('user'))
            .catch(error => console.log(error))

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