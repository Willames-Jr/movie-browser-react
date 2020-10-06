import React, { Component } from "react";
import Popup from 'reactjs-popup';
import { Alert, Button, Card, CardBody, CardFooter, CardHeader, FormGroup, Input, Label } from 'reactstrap';
import usersApi from "../../services/usersApi";
import './styles.css';

export default class Modal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hidden: true,
            allLists: [],
            checkedLists: {},
            alert: {
                showMessage: false,
                alertMessage: '',
                alertType: ''
            }
        };
    }

    componentWillUpdate(nextProps) {
        if (typeof nextProps.movieId !== 'undefined' && nextProps.movieId !== this.props.movieId) {
            this.loadLists();
        }
    }

    loadLists = () => {
        usersApi.get(`lists/${JSON.parse(localStorage.getItem('user')).id}`)
            .then((response) => {
                let checkedLists = {};
                response.data.results.forEach(list => {
                    if (list.movies.includes(this.props.movieId.toString())) {
                        checkedLists[list.name] = true;
                    } else {
                        checkedLists[list.name] = false;
                    }
                });
                if (!this.state.hidden) {
                    this.setState({
                        allLists: response.data.results,
                        checkedLists
                    });
                } else {
                    this.setState({
                        allLists: response.data.results,
                        hidden: true,
                        checkedLists
                    });
                }
            }).catch((err) => {
                console.log(err)
            });
    }

    addMovieToList = (listId, closeFunction) => {
        usersApi.post(`lists/movie/${JSON.parse(localStorage.getItem('user')).id}`, {
            list_id: listId,
            movie: this.props.movieId
        }, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then(() => {
            console.log('ok')
        }).catch((error) => {
            console.log(error);
        });
    }

    createList = (closeFunction) => {
        usersApi.post(`lists/${JSON.parse(localStorage.getItem('user')).id}`, {
            list_name: this.name
        }, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then(() => {
            this.loadLists();
            closeFunction();
        }).catch((err) => {
            console.log(err);
        })
    }

    changeClickedState = async (listName, listId) => {
        let newCheckedList = this.state.checkedLists;
        let alertMessage = '';
        if (!this.state.checkedLists[listName]) {
            await usersApi.post(`lists/movie/${JSON.parse(localStorage.getItem('user')).id}`, {
                list_id: listId,
                movie: this.props.movieId
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }).then(() => {
                newCheckedList[listName] = !this.state.checkedLists[listName];
                alertMessage += 'Added to ';
                console.log('added')
            }).catch((error) => {
                console.log(error);
            });
        } else {
            await usersApi.delete(`lists/movie/${JSON.parse(localStorage.getItem('user')).id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                data: {
                    list_id: listId,
                    movie: this.props.movieId
                }
            }).then((response) => {
                console.log(response)
                if (response.status >= 401) {
                    console.log(listId)
                    console.log(this.props.movieId)
                    newCheckedList[listName] = true;
                }
                newCheckedList[listName] = false;
                alertMessage += 'Deleted from the ';
                console.log('deleted')
            }).catch((error) => {
                console.log(error);
            });
        }
        this.setState({
            checkedLists: newCheckedList,
            alert:{
                showMessage: true,
                alertMessage: `${alertMessage}${listName}`
            }
        });
        setTimeout(() => {
            this.setState({
                alert:{
                    showMessage:false
                }
            })
        }, 6000);
    }

    showAllLists = () => {

        return this.state.allLists.map(list => {
            return (
                <div id="list-select" key={list._id}>
                    {this.state.checkedLists[list.name] ?
                        <button key={list.name} className="clicked-button flex-center mr-2" onClick={() => { this.changeClickedState(list.name, list._id) }}><i className="fa fa-check"></i></button>
                        :
                        <button key={list.name} className="unclicked-button mr-2" onClick={() => { this.changeClickedState(list.name, list._id) }}></button>
                    }
                    <div>{list.name}</div>
                </div>
            );
        });
    }

    onDismiss = () => {
        this.setState({
            showMessage: false
        });
    }

    render() {
        const { hidden } = this.state;
        return (
            <Popup trigger={<button color="success" className="btn btn-success"> <i className="fa fa-bookmark"></i> Add to list </button>} modal>
                {close => (<Card className="container-border" inverse>
                    <CardHeader style={{ borderColor: "white" }} >
                        <h4>Add to list... </h4>
                        {this.state.alert.showMessage && 
                            <Alert className = "fixed-bottom flex-center" color="success" isOpen={this.state.showMessage} toggle={this.onDismiss}>
                            {this.state.alert.alertMessage}
                            </Alert>}
                    </CardHeader>
                    <CardBody id="lists-body">
                        {this.showAllLists()}
                    </CardBody>
                    {hidden ?
                        <CardFooter onClick={e => { this.setState({ hidden: false }) }} id="container-create">
                            <div>
                                <i className="fa fa-plus"></i> {' '}
                                    Create new list
                                </div>
                        </CardFooter>
                        :
                        <CardFooter id="container-info">
                            <FormGroup>
                                <Label for="name">Name:</Label>
                                <Input type="text" id="name" onChange={e => this.name = e.target.value} placeholder="Insert list name..." />
                            </FormGroup>
                            <div id="container-info-div">
                                <Button color="success" onClick={() => { this.createList(close) }}>Create</Button>
                            </div>
                        </CardFooter>
                    }
                </Card>)}
            </Popup>
        );
    }
};