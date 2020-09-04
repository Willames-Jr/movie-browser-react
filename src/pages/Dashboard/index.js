import React, { Component } from 'react';
import Header from '../../components/Header';
import usersApi from '../../services/usersApi';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import NavBar from '../../components/NavBar';


export default class DashBoard extends Component{
    
    constructor(){
        super();
        this.state = {
            user: {},
        }
    }

    componentDidMount(){
        const token = localStorage.getItem('token');
        usersApi.get('/users', { headers: {"Authorization" : `Bearer ${token}`} })
        .then(res => {
            this.setState({
                user: res.data,
            });
        }).catch(err => {
            console.log(err);
        });
    }
    
    render() {
        return (
            <div>
                <NavBar/>
                <p>{this.state.user.name}</p>
                <Link to = "/logout"><Button>logout</Button></Link>
            </div>
        )
    }
}
