import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

export default class Login extends Component {
    constructor(props) {
        super(props)

        this.setUsername = this.setUsername.bind(this);
        this.setPassword = this.setPassword.bind(this);
        this.submitUser = this.submitUser.bind(this);

        this.state = {
            username: '',
            password: '',
            error: ''
        }
    }

    // Sets username based on user input.
    setUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    // Sets password based on user input.
    setPassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    // After user clicks submit, verifies login credentials.
    submitUser(e) {
        e.preventDefault();

        const user = {
            username: this.state.username,
            password: this.state.password,
        };

        // Checks login credentials to database user credentials.
        axios.post('http://localhost:7000/users/login', user)
           .then(res => sessionStorage.setItem('user', user.username))
           .catch(err => this.setState({error: 'Invalid login, please try again.'}));

        // If successful login, user authenticated and put in session storage.
        var answer = sessionStorage.getItem('user');

        // User logged in successfully and taken to notes page. Otherwise, login error message.
        if (answer !== null)
        {
            var secondanswer = sessionStorage.getItem('user');
            console.log(secondanswer);
            window.location='/'
        }
    }

    render() {
        return (
            <div className="header" style={{marginTop: "5rem", textAlign: "center"}}>
            <h3>Welcome to Private Notes</h3>
            <div className="card card-container" style={{ marginTop: "3rem", marginLeft: "38rem", marginRight: "38rem", backgroundColor: "aliceblue"}}>
            <div style={{ marginTop: "1rem", marginLeft: "1rem", marginRight: "1rem", marginBottom: "1rem"}} className="column">
                <h3>Login</h3>
                <form onSubmit={this.submitUser}>
                    <div className="form-group" style={{textAlign: "left"}}>
                        <label>Username: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.setUsername} />
                    </div>
                    <div className="form-group" style={{textAlign: "left"}}>
                        <label>Password: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.password}
                            onChange={this.setPassword} />
                    </div>
                    {this.state.error &&
                      <h7 className='error'>{this.state.error}</h7>}
                    <p className="grey-text text-darken-1">
                Don't have an account? <Link to="/register">Register</Link>
              </p>
                    <div className="form-group">
                        <input type="submit" value="Login" className="btn btn-primary" />
                    </div>
                </form>
                </div>
                </div>
                </div>
        )
    }
}