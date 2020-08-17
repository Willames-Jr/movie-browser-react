import React from 'react';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import DashBoard from './pages/Dashboard';
import PrivateRoute from './auth';
import Logout from './pages/Logout';

const Routes = () => (
    <Router>
        <Switch>
            <Route exact path="/" component={Login}/>
            <PrivateRoute path="/admin" component={DashBoard}/>
            <Route exact path="/logout" component={Logout}/>
        </Switch>
    </Router>
)

export default Routes;