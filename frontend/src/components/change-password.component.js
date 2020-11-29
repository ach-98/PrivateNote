import React, {Component} from 'react';
import axios from 'axios';
import NavBar from './navbar.component';

export default class ChangePassword extends Component {
    constructor(props) {
        super(props)

        this.setUsername = this.setUsername.bind(this);
        this.submitChange = this.submitChange.bind(this);
        this.setCurrPassword = this.setCurrPassword.bind(this);
        this.setNewPassword = this.setNewPassword.bind(this);

        this.state = {
            username: '',
            currentpassword: '',
            newpassword: ''
        }
    }

    // Takes username input from user.
    setUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    // Takes current password input from user.
    setCurrPassword(e) {
        this.setState({
            currentpassword: e.target.value
        });
    }

    // Takes input from user for new password.
    setNewPassword(e) {
        this.setState({
            newpassword: e.target.value
        });
    }

    // Changes user password if old login credentials match.
    submitChange(e) {
        e.preventDefault();

        const user = {
            username: this.state.username,
            currentpassword: this.state.currentpassword,
            newpassword: this.state.newpassword
        };

        // Checks for correct login credentials and if successful, changes password.
        axios.post('http://localhost:7000/users/change', user)
           .then(res => window.location = '/')
           .catch(err => this.setState({error: 'Incorrect password.'}));

        console.log(user);
    }

    render() {
        return (
        <div>
            <NavBar />
            <div className="container" style={{marginTop: "2rem" ,marginLeft: "auto", marginRight: "auto"}}>
            <h3>Change Password</h3>
            <form onSubmit={this.submitChange}>
                <div className="form-group">
                    <label>Username: </label>
                    <input type="text"
                        required
                        className="form-control"
                        value={this.state.username}
                        onChange={this.setUsername}
                        />
                </div>
                <div className="form-group">
                    <label>Current Password: </label>
                    <input type="text"
                        required
                        className="form-control"
                        value={this.state.currentpassword}
                        onChange={this.setCurrPassword}
                        />
                </div>
                <div className="form-group">
                    <label>New Password: </label>
                    <input type="text"
                        required
                        className="form-control"
                        value={this.state.newpassword}
                        onChange={this.setNewPassword}
                        />
                </div>
                <div className="form-group">
                    <input type="submit" value="Submit" className="btn btn-primary"/>
                </div>
            </form>
        </div>
        </div>
        )
    }
}