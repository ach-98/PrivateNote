import React from 'react';
import {Route, Redirect} from 'react-router-dom';
//import AuthServ from './auth-serv';

const PrivateRoute = ({component: Component, ...rest}) => {
    var condition = sessionStorage.getItem('user');
    return (
        <Route 
            {...rest}
            render ={props => {
                if (condition !== null)
                {
                    console.log(condition);
                    return <Component {...props} />;
                }

                else 
                {  console.log(condition);
                    return <Redirect to='/login'/>;
                }
            }} />
    );
};

   // return condition ? (<Route path={props.path} exact = {props.exact} component={props.component} />) :
    //    (<Redirect to='/login'/>);

export default PrivateRoute;
