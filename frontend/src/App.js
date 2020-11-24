import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
//import {Switch} from 'react-router';

import NavBar from "./components/navbar.component";
import NotesList from "./components/notes-list.component";
import EditNote from "./components/edit-note.component";
import CreateNote from "./components/create-note.component";
import CreateUser from "./components/create-user.component";
import Login from "./components/login-component";

    //<NavBar />
    // <br/>
    //  <Route path="/" exact component={NotesList} />
    //  <Route path="/edit/:id" exact component={EditNote} />
    //  <Route path="/create" exact component={CreateNote} />
    //<Route path="/user" exact component={CreateUser} />

function App() {
  return (
    <Router>
      <Route path="/login" exact component={Login} />
      <Route path="/register" exact component={CreateUser} />
        <NavBar />
        <br/>
        <Route path="/" exact component={NotesList} />
        <Route path="/edit/:id" exact component={EditNote} />
        <Route path="/create" exact component={CreateNote} />
        <Route path="/user" exact component={CreateUser} />
    </Router>
  );
}

export default App;
