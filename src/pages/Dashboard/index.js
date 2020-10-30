import React, { Component } from 'react';
import usersApi from '../../services/usersApi';
import { Button, Container, Card, CardHeader, CardBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import NavBar from '../../components/NavBar';

import './styles.css';

export default class DashBoard extends Component {

    constructor() {
        super();
        this.state = {
            user: {},
            allLists: []
        }
    }

    componentDidMount() {
        this.loadLists();
    }

    loadLists = () => {
        usersApi.get(`lists/${JSON.parse(localStorage.getItem('user')).id}`)
            .then((response) => {
                console.log(response)
                this.setState({
                    allLists: response.data.results,
                    user: JSON.parse(localStorage.getItem('user'))
                });
            }).catch((err) => {
                console.log(err)
            });
    }

    showLists = () => {
        return this.state.allLists.map(list => {
            return (
                <li >
                    <Link to = {`/list/${this.state.user.id}/${list._id}`} className = "list-link">
                        {list.name}
                    </Link>
                </li>
            )
        })
    }

    render() {
        const user = this.state.user;
        return (
            <div>
                <NavBar />
                <Container className="mt-4 principal-container">
                    <Container className="container-border" id="user-infos">
                        <div className="flex-center">
                            <img src={user.avatar} className="avatar-icon" alt="user-avatar" />
                            <h4 className="ml-3">{user.name}</h4>
                        </div>
                        <Link to="/logout" ><Button color="danger">Logout</Button></Link>
                    </Container>
                    <Card inverse className="mt-3 container-border">
                        <CardHeader style={{ borderColor: "white" }}><h3>Your movie lists:</h3></CardHeader>
                        <CardBody>
                            <ul>
                                {this.state.allLists.length === 0 ? 
                                    <h2>No lists found, try to create one</h2>
                                    : this.showLists()
                                }
                            </ul>
                        </CardBody>
                    </Card>
                </Container>
            </div>
        )
    }
}
