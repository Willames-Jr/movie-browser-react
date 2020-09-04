import React from 'react';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import DashBoard from './pages/Dashboard';
import Home from './pages/Home';
import {PrivateRoute,AuthRoute} from './auth';
import Logout from './pages/Logout';
import MovieDetails from './pages/MovieDetails';
import SingIn from './pages/SingIn';

const Routes = () => (
    <Router>
        <Switch>
            <Route exact path="/" component={Home}/>
            <PrivateRoute path="/dashboard" component={DashBoard}/>
            <AuthRoute exact path="/login" component={Login}/>
            <AuthRoute exact path="/singin" component = {SingIn}/>
            <Route exact path="/logout" component={Logout}/>
            <Route path="/moviedetails/:id" component = {MovieDetails}/>
        </Switch>
    </Router>
)

export default Routes;