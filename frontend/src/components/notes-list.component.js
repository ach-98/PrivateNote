import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import NavBar from './navbar.component';
//import qs from 'qs';

const Note = props => (
    <tr>
        <td>{props.note.title}</td>
        <td>{props.note.category}</td>
        <td>{props.note.text}</td>
        <td>{props.note.date.substring(0,10)}</td>
        <td>
        <Link to={"/edit/"+props.note._id}>edit</Link> | <a href="#" onClick={() => {props.deleteNote(props.note._id)}}>delete</a>
        </td>
    </tr>
)

export default class NotesList extends Component {
    constructor(props) {
        super(props);

        this.deleteNote = this.deleteNote.bind(this);
        this.sortTitle = this.sortTitle.bind(this);
        this.sortCategory = this.sortCategory.bind(this);
        this.sortDate = this.sortDate.bind(this);
        this.sortArray = this.sortArray.bind(this);

        this.state = {notes: []}
    }

    componentDidMount() {
        axios.get('http://localhost:7000/notes/')
            .then(response => {
                this.setState({notes: response.data})
            })
            .catch(error => console.log(error))
    }

    deleteNote(id) {
        axios.delete('http://localhost:7000/notes/' + id)
            .then(res => console.log(res.data));
        this.setState({
            notes: this.state.notes.filter(el => el._id !== id)
        })
    }

    noteList() {
        return this.state.notes.map(currentnote => {
            return <Note note={currentnote} deleteNote={this.deleteNote} key={currentnote._id}/>;
        })
    }

    
    sortTitle() {
        const sortedNotes = [...this.state.notes].sort((a,b) => {
            if (a.title < b.title) return -1;
            if (a.title > b.title) return 1;
            return 0;
        });
        this.setState({notes : sortedNotes});
    }

    sortCategory() {
        const sortedNotes = [...this.state.notes].sort((a,b) => {
            if (a.category < b.category) return -1;
            if (a.category > b.category) return 1;
            return 0;
        });
        this.setState({notes : sortedNotes});
    }

    sortDate() {
        const sortedNotes = [...this.state.notes].sort((a,b) => {
            if (a.date < b.date) return -1;
            if (a.date > b.date) return 1;
            return 0;
        });
        this.setState({notes : sortedNotes});
    }

    sortArray(e) 
    {
        if (e == "title")
        {
            const sortedNotes = [...this.state.notes].sort((a,b) => {
                if (a.title < b.title) return -1;
                if (a.title > b.title) return 1;
                return 0;
            });
            this.setState({notes : sortedNotes});
        }

        if (e == "category")
        {
            const sortedNotes = [...this.state.notes].sort((a,b) => {
                if (a.category < b.category) return -1;
                if (a.category > b.category) return 1;
                return 0;
            });
            this.setState({notes : sortedNotes});
        }

        if (e == "date")
        {
            const sortedNotes = [...this.state.notes].sort((a,b) => {
                if (a.date < b.date) return 1;
                if (a.date > b.date) return -1;
                return 0;
            });
            this.setState({notes : sortedNotes});
        }
    }

    render() {
        return (
            <div>
                <NavBar />
                <h3>Notes List</h3>
                <h5>Sort by:  
                <select onChange={(e) => this.sortArray(e.target.value)}>
                    <option value="select">Select..</option>
                    <option value="title">Title</option>
                    <option value="date">Date Created</option>
                    <option value="category">Category</option>
                </select>
                </h5>
                <table className="table">
                    <thead className="thead-dark">
                    <tr>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Text</th>
                    <th>Date Created</th>
                    <th> </th>
                    </tr>
                    </thead>
                    <tbody>{this.noteList()}</tbody>
                </table>
            </div>
        )
    }
}

//| <a href="#" onClick={() => {props.deleteNote(props.note._id)}}>delete</a>
//<Link to={"/edit/"+props.note._id}>edit</Link> | <a href="#" onClick={() => {props.deleteNote(props.note._id)}}>delete</a>
//<th>Username</th>
//<td>{props.note.username}</td>