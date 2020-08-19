import React from 'react';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import DashBoard from './pages/Dashboard';
import Home from './pages/Home';
import PrivateRoute from './auth';
import Logout from './pages/Logout';

const Routes = () => (
    <Router>
        <Switch>
            <Route exact path="/" component={Home}/>
            <PrivateRoute path="/admin" component={DashBoard}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/logout" component={Logout}/>
        </Switch>
    </Router>
)

export default Routes;