import React from 'react';
import {Route,Redirect} from 'react-router-dom';

const isAuth = () =>{
    return localStorage.getItem('token') !== null;
}

const PrivateRoute = ({component:Component, ...rest}) => {
    return (
        <Route
            {...rest}
            render = { props => isAuth() ? (
                <Component {...props}/>
            ):(
                <Redirect to={{
                    pathname: '/',
                    state: {message: 'You must be logged in'}
                }}/>
            )}
        />
    );
}

export default PrivateRoute;