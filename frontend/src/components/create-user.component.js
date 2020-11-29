import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

// Adds new user to the database.
export default class CreateUser extends Component {
    constructor(props) {
        super(props)

        this.setUsername = this.setUsername.bind(this);
        this.setPassword = this.setPassword.bind(this);
        this.submitUser = this.submitUser.bind(this);

        this.state = {
            username: '',
            password: '',
            error: '',
        }
    }
    
    // Sets username for new user.
    setUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    // Sets password for new user.
    setPassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    // Saves new user credentials and sends to the database.
    submitUser(e) {
        e.preventDefault();

        const user = {
            username: this.state.username,
            password: this.state.password,
        };

        // Creates a new user in the database. Checks for repeat username.
        // Sent to login page if new account created successfully.
        axios.post('http://localhost:7000/users/add', user)
           .then(res => window.location = '/login')
           .catch(err => this.setState({error: 'Username already taken.'}))
    }

    render() {
        return ( 
            <div className="header" style={{marginTop: "5rem", textAlign: "center"}}>
            <h3>Welcome to Private Notes</h3>
            <div className="card card-container" style={{ marginTop: "3rem", marginLeft: "38rem", marginRight: "38rem", backgroundColor: "aliceblue"}}>
            <div style={{ marginTop: "1rem", marginLeft: "1rem", marginRight: "1rem", marginBottom: "1rem"}} className="column">
            <h3>Register</h3>
                <form onSubmit={this.submitUser}>
                    <div className="form-group" style={{textAlign: "left"}}>
                        <label>Username: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.setUsername} />
                    </div>
                    {this.state.error &&
                    <h7 className='error'>{this.state.error}</h7>}
                    <div className="form-group" style={{textAlign: "left"}}>
                        <label>Password: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.password}
                            onChange={this.setPassword} />
                    </div>
                    <p className="grey-text text-darken-1">
                Already have an account? <Link to="/login">Login</Link>
              </p>
                    <div className="form-group">
                        <input type="submit" value="Register" className="btn btn-primary" />
                    </div>
                </form>
            </div>
            </div>
            </div>
        )
    }
}