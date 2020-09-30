import React, { Component } from "react";
import Popup from 'reactjs-popup';
import { Button, Card, CardBody, CardFooter, CardHeader, FormGroup, Input, Label } from 'reactstrap';
import usersApi from "../../services/usersApi";
import './styles.css';

export default class Modal extends Component {
    constructor() {
        super();
        this.state = {
            hidden: true,
            allLists: []
        };
    }

    componentDidUpdate() {
        this.loadLists();
    }

    loadLists = () => {

        usersApi.get(`lists/${JSON.parse(localStorage.getItem('user')).id}`)
        .then((response) => {
            this.setState({
                allLists: response.data.results
            });
        }).catch((err) => {

        })

    }

    showAllLists = () =>{
        return this.state.allLists.map(list => {
            return (
                <li key = {list.name}><Button color = "success" className = "mb-2">{list.name}</Button></li>
            );
        });
    }

    createList = (closeFunction) => {
        usersApi.post(`lists/${JSON.parse(localStorage.getItem('user')).id}`,{
            list_name: this.name
        },{ 
            headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}` 
            }
        }
        ).then(() => {
            console.log(localStorage.getItem('token'))
            console.log(JSON.parse(localStorage.getItem('user')).id)
            console.log(this.name)
            closeFunction();
        }).catch((err) => {
            console.log(err);
        })
    }

    render() {
        const { hidden } = this.state;
        return (
            <Popup trigger={<button color="success" className="btn btn-success"> <i className="fa fa-bookmark"></i> Add to list </button>} modal>
                {close => (<Card className="container-border" inverse>
                    <CardHeader style={{ borderColor: "white" }}>
                        <h4>Add to list... </h4>
                    </CardHeader>
                    <CardBody id  = "lists-body">
                        <ul id="lists">
                            {this.showAllLists()}
                        </ul>
                    </CardBody>
                        {hidden ?
                        <CardFooter onClickCapture={() => { this.setState({ hidden: false }) }} id="container-create">
                            <div>
                                <i className="fa fa-plus"></i> {' '}
                                Create new list
                            </div>
                            </CardFooter>
                            :
                            <CardFooter id = "container-info">
                                <FormGroup>
                                    <Label for="name">Name:</Label>
                                    <Input type="text" id="name" onChange={e => this.name = e.target.value} placeholder="Insert list name..." />
                                </FormGroup>
                                <div id = "container-info-div">
                                    <Button color = "success" onClick = {() => {this.createList(close)}}>Create</Button>
                                </div>
                            </CardFooter>
                        }
                </Card>)}
            </Popup>
        );
    }
};