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
        }
    }

    setUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    setPassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    submitUser(e) {
        e.preventDefault();

        const user = {
            username: this.state.username,
            password: this.state.password,
        };

        axios.post('http://localhost:7000/users/add', user)
           .then(res => console.log(res.data))
           .catch(console.error());

        console.log(user);
          
        window.location = '/';
    }

    render() {
        return (
            <div className="container">
            <div style={{ marginTop: "4rem" }} className="row">
            <div className="col s8 offset-s2">
                <h3>Login</h3>
                <form onSubmit={this.submitUser}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.setUsername} />
                    </div>
                    <div className="form-group">
                        <label>Password: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.password}
                            onChange={this.setPassword} />
                    </div>
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