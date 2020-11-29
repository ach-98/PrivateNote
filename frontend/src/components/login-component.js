import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
//import AuthServ from './auth-serv';

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
        var removed = sessionStorage.getItem('user');
        console.log(removed);

        axios.post('http://localhost:7000/users/login', user)
           .then(res => sessionStorage.setItem('user', user.username))
           .catch(err => this.setState({error: 'Invalid login, please try again.'}));

        var answer = sessionStorage.getItem('user');
        if (answer !== null)
        {
            var secondanswer = sessionStorage.getItem('user');
            console.log(secondanswer);
            window.location='/'
        }
        console.log(answer);
        //localStorage.removeItem('user');
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

//{this.state.error &&
  //  <h7 className='error'>{this.state.error}</h7>}