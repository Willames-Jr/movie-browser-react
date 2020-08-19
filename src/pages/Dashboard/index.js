import React, { Component } from 'react';
import Header from '../../components/Header';
import usersApi from '../../services/usersApi';


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
                <Header title="Dashboard"/>
                <p>{this.state.user.name}</p>
            </div>
        )
    }
}
