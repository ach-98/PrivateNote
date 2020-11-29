import React, {Component} from 'react';
import axios from 'axios';

export default class EditNote extends Component {
    constructor(props) {
        super(props)

        this.setUsername = this.setUsername.bind(this);
        this.setText = this.setText.bind(this);
        this.setTitle = this.setTitle.bind(this);
        this.setDate = this.setDate.bind(this);
        this.submitNote = this.submitNote.bind(this);
        this.setCategory = this.setCategory.bind(this);

        this.state = {
            username: '',
            title: '',
            category: '',
            text: '',
            date: new Date(),
        }
    }

    // Loads note into specified boxes to be edited by user.
    componentDidMount() {
        axios.get('http://localhost:7000/notes/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    username: response.data.username,
                    title: response.data.title,
                    category: response.data.category,
                    text: response.data.text,
                    date: response.data.date
                })
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    // Sets new username if changed by user.
    setUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    // Sets new text of note if changed by user.
    setText(e) {
        this.setState({
            text: e.target.value
        });
    }

    // Sets new title if changed by user.
    setTitle(e) {
        this.setState({
            title: e.target.value
        });
    }

    // Sets new category if changed by user.
    setCategory(e) {
        this.setState({
            category: e.target.value
        });
    }

    // Date created is not changed by user.
    setDate(e) {
        this.setState({
            date: e.target.value
        });
    }

    // Submits note changes set by the user.
    submitNote(e) {
        e.preventDefault();

        const note = {
            username: this.state.username,
            title: this.state.title,
            category: this.state.category,
            text: this.state.text,
            date: this.state.date
        };

        // Sends note changes to be saved to the database.
        axios.post('http://localhost:7000/notes/update/'+this.props.match.params.id, note)
           .then(res => console.log(res))
           .catch(console.error());

        console.log(note);
        
        // Once changes are saved, sent back to note list page.
        window.location = '/';
    }

    render() {
        return (
        <div className="container" style={{marginTop: "2rem" ,marginLeft: "auto", marginRight: "auto"}}>
            <h3>Edit Note</h3>
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
                    <input type="submit" value="Save" className="btn btn-primary"/>
                </div>
            </form>
        </div>
        )
    }
}