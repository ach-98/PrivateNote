import React, {Component} from 'react';
import axios from 'axios';
import NavBar from './navbar.component';

export default class CreateNote extends Component {
    constructor(props) {
        super(props)

        this.setUsername = this.setUsername.bind(this);
        this.setText = this.setText.bind(this);
        this.setTitle = this.setTitle.bind(this);
        this.setDate = this.setDate.bind(this);
        this.submitNote = this.submitNote.bind(this);
        this.setCategory = this.setCategory.bind(this);

        this.state = {
            username: sessionStorage.getItem('user'),
            title: '',
            category: '',
            text: '',
            date: new Date(),
        }
    }

    // Sets username for the specified note to retrieve from database.
    setUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    // Sets note message specified by user.
    setText(e) {
        this.setState({
            text: e.target.value
        });
    }

    // Sets note title specified by user.
    setTitle(e) {
        this.setState({
            title: e.target.value
        });
    }

    // Sets category specified by user.
    setCategory(e) {
        this.setState({
            category: e.target.value
        });
    }

    // Sets the current date and time.
    setDate(e) {
        this.setState({
            date: e.target.value
        });
    }

    // Submits note to save to the database.
    submitNote(e) {
        e.preventDefault();

        const note = {
            username: this.state.username,
            title: this.state.title,
            category: this.state.category,
            text: this.state.text,
            date: this.state.date
        };

        // Saves note to the database.
        axios.post('http://localhost:7000/notes/add', note)
           .then(res => console.log(res))
           .catch(console.error());

        console.log(note);
        
        // Success note creation redirects back to note list.
        window.location = '/';
    }

    render() {
        return (
        <div>
            <NavBar />
            <div className="container" style={{marginTop: "2rem" ,marginLeft: "auto", marginRight: "auto"}}>
            <h3>Create Note</h3>
            <form onSubmit={this.submitNote}>
                <div className="form-group">
                    <label>Title: </label>
                    <input type="text"
                        required
                        className="form-control"
                        value={this.state.title}
                        onChange={this.setTitle}
                        />
                </div>
                <div className="form-group">
                    <label>Category: </label>
                    <input type="text"
                        required
                        className="form-control"
                        value={this.state.category}
                        onChange={this.setCategory}
                        />
                </div>
                <div className="form-group">
                    <label>Text:</label>
                    <textarea 
                        required
                        className="form-control"
                        value={this.state.text}
                        onChange={this.setText}
                        />
                </div>
                <div className="form-group">
                    <input type="submit" value="Create Note" className="btn btn-primary"/>
                </div>
            </form>
            </div>
        </div>
        )
    }
}