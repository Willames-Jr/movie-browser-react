import React from 'react';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import DashBoard from './pages/Dashboard';
import Home from './pages/Home';
import {PrivateRoute,AuthRoute} from './auth';
import Logout from './pages/Logout';
import MovieDetails from './pages/MovieDetails';
import SingIn from './pages/SingIn';
import ListDetails from './pages/ListDetails';
import WriteReview from './pages/WriteReview';
import UpdateReview from './pages/UpdateReview';
import Reviews from './pages/Reviews';
import ReviewDetails from './pages/ReviewDetails';

const Routes = () => (
    <Router>
        <Switch>
            <Route exact path="/" component={Home}/>
            <PrivateRoute path="/dashboard" component={DashBoard}/>
            <AuthRoute exact path="/login" component={Login}/>
            <AuthRoute exact path="/singin" component = {SingIn}/>
            <Route exact path="/logout" component={Logout}/>
            <Route path="/moviedetails/:id" component = {MovieDetails}/>
            <Route path="/list/:user_id/:list_id" component = {ListDetails}/>
            <PrivateRoute path= "/write_review/:movie_id/:movie_name" component = {WriteReview}/>
            <Route exact path="/reviews" component = {Reviews}></Route>
            <Route path="/reviews/:review" component = {ReviewDetails}></Route>
            <PrivateRoute path = "/update_review/:movie_id" component = {UpdateReview}/>
        </Switch>
    </Router>
)

export default Routes;