import React from 'react';
import {Route, Redirect} from 'react-router-dom';

// Must be logged in to access a private route.
const PrivateRoute = ({component: Component, ...rest}) => {
    // Checks session storage to see if user is saved and has access.
    var condition = sessionStorage.getItem('user');
    return (
        // Determines route to take based on user authentication.
        <Route {...rest} render ={props => {
            
            // User logged in to go to user's notes page.
            if (condition !== null)
            {
                console.log(condition);
                return <Component {...props} />;
            }

            // User not logged in so return to login page.
            else 
            {  console.log(condition);
               return <Redirect to='/login'/>;
            }
        }} />
    );
};

export default PrivateRoute;
