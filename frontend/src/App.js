import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

import NotesList from "./components/notes-list.component";
import EditNote from "./components/edit-note.component";
import CreateNote from "./components/create-note.component";
import CreateUser from "./components/create-user.component";
import Login from "./components/login-component";
import ChangePassword from "./components/change-password.component";
import PrivateRoute from "./components/private-route.component";
import Logout from "./components/logout-component";

// Routes for the web application. Only logged in users can access the private routes.
function App () {

  return (
    <Router>
      <Route path="/login" exact component={Login} />
      <Route path="/register" exact component={CreateUser} />
      <PrivateRoute path="/" exact component={NotesList} />
      <PrivateRoute path="/edit/:id" exact component={EditNote} />
      <PrivateRoute path="/create" exact component={CreateNote} />
      <PrivateRoute path="/change" exact component={ChangePassword} />
      <PrivateRoute path="/logout" exact component={Logout} />
    </Router>
  );
}

export default App;
