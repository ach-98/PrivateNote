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
        //var june = JSON.parse(sessionStorage.getItem('user'));
        var name = sessionStorage.getItem('user');
        //JSON.parse(sessionStorage.getItem('user'))
        axios.get('http://localhost:7000/notes/', {params: {username: name}})
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
                <div className="container" style={{marginTop: "5rem", textAlign: "center"}}>
                <h4>Notes List:</h4>
                <div className="container" style={{textAlign: "right"}}>
                <h7>Sort by:  
                <select onChange={(e) => this.sortArray(e.target.value)}>
                    <option value="select">Select..</option>
                    <option value="title">Title</option>
                    <option value="date">Date Created</option>
                    <option value="category">Category</option>
                </select>
                </h7>
                </div>
                <table className="table" style={{marginTop: "2rem", textAlign: "left"}}>
                    <thead className="thead" style={{backgroundColor: "aliceblue"}}>
                    <tr>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Text</th>
                    <th>Date Created</th>
                    <th>Options</th>
                    </tr>
                    </thead>
                    <tbody>{this.noteList()}</tbody>
                </table>
            </div>
            </div>
        )
    }
}