import React from 'react';
import {Route,Redirect} from 'react-router-dom';

const isAuth = () =>{
    return localStorage.getItem('token') !== null;
}

export const PrivateRoute = ({component:Component, ...rest}) => {
    return (
        <Route
            {...rest}
            render = { props => isAuth() ? (
                <Component {...props}/>
            ):(
                <Redirect to={{
                    pathname: '/login',
                    state: {message: 'You must be logged in'}
                }}/>
            )}
        />
    );
}

export const AuthRoute = ({component:Component, ...rest}) => {
    return (
        <Route
            {...rest}
            render = { props => isAuth() ?(
                <Redirect to={{
                    pathname: '/dashboard',
                    state: {message: 'You must be logged in'}
                }}/>
            ): (
                <Component {...props}/>
            )}
        />
    );
}
