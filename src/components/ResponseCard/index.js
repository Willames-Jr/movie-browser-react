import React, { Component } from 'react';
import Card from 'reactstrap/lib/Card';
import CardBody from 'reactstrap/lib/CardBody';
import CardFooter from 'reactstrap/lib/CardFooter';
import CardHeader from 'reactstrap/lib/CardHeader';
import usersApi from '../../services/usersApi';

export default class ResponseCard extends Component {

    constructor() {
        super();
        this.state = {
            likes: 0,
            dislikes: 0,
            liked: false,
            disliked: false
        };
    }

    componentDidMount() {
        this.setState({
            likes: this.props.likes.length,
            dislikes: this.props.dislikes.length,
            liked: this.props.likes.includes(JSON.parse(localStorage.getItem('user'))?.id),
            disliked: this.props.dislikes.includes(JSON.parse(localStorage.getItem('user'))?.id)
        });
    }
    addRemoveLike = () => {
        const user = JSON.parse(localStorage.getItem('user')).id

        if (user === null || user === undefined) return;

        usersApi.put('/like/response', {
            user: user,
            response: this.props.responseId
        }, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        }).then((response) => {
            console.log(this.state)
            if (response.data.message === "like removed") {
                this.setState({
                    likes: this.state.likes - 1,
                    liked: false
                });
                console.log(this.state)
                return;
            } else {
                this.setState({
                    likes: this.state.likes + 1,
                    liked: true,
                    disliked: false,
                    dislikes: this.state.disliked === true ? this.state.dislikes - 1 : this.state.dislikes,
                });
                console.log(this.state)
                return;
            }
        }).catch((err) => {
            console.log(err)
        });
    }

    addRemoveDislike = () => {
        const user = JSON.parse(localStorage.getItem('user')).id

        if (user === null || user === undefined) return;

        usersApi.put('/dislike/response', {
            user: user,
            response: this.props.responseId
        }, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        }).then((response) => {
            console.log(this.state)

            if (response.data.message === "dislike removed") {
                this.setState({
                    dislikes: this.state.dislikes - 1,
                    disliked: false
                });
                console.log(this.state)

                return;
            } else {
                this.setState({
                    dislikes: this.state.dislikes + 1,
                    disliked: true,
                    liked: false,
                    likes: this.state.liked === true ? this.state.likes - 1 : this.state.likes,
                });
                console.log(this.state)

                return;
            }
        }).catch((err) => {
            console.log(err)
        });
    }

    render() {
        return (
            <Card inverse className="mb-3 container-border" style = {this.props.style}>
                <CardHeader style={{ borderColor: "white", padding: "10px", paddingBottom: "5px" }}><h3>{this.props.title}</h3></CardHeader>
                <CardBody id="content-container" style = {{paddingBottom: 0}}>
                    {this.props.children}
                </CardBody>
                <CardFooter style={{ borderColor: "white"}}>
                    <button className="no-decoration-button" onClick={this.addRemoveLike}>
                        <i className="fa fa-thumbs-up" style={{ color: "white" }}></i>
                    </button>
                    <span className="mr-2">{this.state.likes}</span>
                    <button className="no-decoration-button" onClick={this.addRemoveDislike}>
                        <i className="fa fa-thumbs-down" style={{ color: "white" }}></i>
                    </button>
                    <span className="mr-2">{this.state.dislikes}</span>
                </CardFooter>
            </Card>
        );
    }
}