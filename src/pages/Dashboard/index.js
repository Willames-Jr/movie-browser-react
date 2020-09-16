import React, { Component } from 'react';
import usersApi from '../../services/usersApi';
import { Button, Container, Card, CardHeader, CardBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import NavBar from '../../components/NavBar';

import './styles.css';

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
        const user = this.state.user;
        return (
            <div>
                <NavBar/>
                <Container className = "mt-4 principal-container">
                    <Container className = "container-border" id = "user-infos">
                        <div className = "flex-center">
                            <img src = {user.avatar} className = "avatar-icon" alt = "user-avatar"/>
                            <h4 className = "ml-3">{user.name}</h4>
                        </div>
                        <Link to = "/logout" ><Button color = "danger">Logout</Button></Link>
                    </Container>
                    <Card inverse className = "mt-3 container-border">
                        <CardHeader style  = {{borderColor: "white"}}><h3>Your movie lists:</h3></CardHeader>
                        <CardBody>
                            <p>Lists HERE</p>
                        </CardBody>
                    </Card>
                </Container>
            </div>
        )
    }
}
