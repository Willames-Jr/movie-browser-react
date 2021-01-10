import React, { Component } from 'react';
import Card from 'reactstrap/lib/Card';
import CardBody from 'reactstrap/lib/CardBody';
import CardFooter from 'reactstrap/lib/CardFooter';
import CardHeader from 'reactstrap/lib/CardHeader';
import Form from 'reactstrap/lib/Form';
import Input from 'reactstrap/lib/Input';
import usersApi from '../../services/usersApi';
import ResponseCard from '../ResponseCard';

export default class CommentCard extends Component {

    constructor() {
        super();
        this.state = {
            response: "",
            responses: [],
            likes: 0,
            dislikes: 0,
            liked: false,
            disliked: false,
            toggleResponses: false,
            showResponseField: false
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
        const user = JSON.parse(localStorage.getItem('user'))?.id

        if (user === null || user === undefined) return;

        usersApi.put('/like/comment', {
            user: user,
            comment: this.props.commentId
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
        const user = JSON.parse(localStorage.getItem('user'))?.id

        if (user === null || user === undefined) return;

        usersApi.put('/dislike/comment', {
            user: user,
            comment: this.props.commentId
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

    loadResponses = () => {
        if (this.state.toggleResponses === true) {
            this.setState({
                toggleResponses: !this.state.toggleResponses
            });
            return;
        }

        usersApi.get(`/responses/${this.props.commentId}`).then((response) => {
            this.setState({
                responses: response.data,
                toggleResponses: true
            })
        }).catch((err) => {
            console.log(err);
        });
    }

    stringToDate = (dateString) => {
        return new Date(dateString).toDateString();
    }

    showResponses = () => {
        return this.state.responses?.map((response) => {
            return (
                <ResponseCard
                    style={{ marginLeft: "50px" }}
                    key={response._id}
                    responseId={response._id}
                    likes={response.likes}
                    dislikes={response.dislikes}
                    title={
                        <div className="align-comment-header">
                            <div className="identifier-align">
                                <img className="avatar-icon flex-center mb-3" src={response.writer.avatar} alt="user-icon" />
                                <h5 className="ml-2">{response.writer.name}</h5>
                            </div>
                            <div>
                                {this.stringToDate(response.date)}
                            </div>
                        </div>
                    }>
                    <p className="comment-content">{response.content}</p>
                </ResponseCard>
            );
        });
    }

    sendResponse = () => {
        if(this.state.response === undefined || this.state.response === null || !this.state.response){
            return;
        }

        const response = {
            content: this.state.response,
            writer: JSON.parse(localStorage.getItem('user')).id,
            comment: this.props.commentId
        };

        usersApi.post("/responses", response , {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        }).then(() =>{
            this.setState({
                showResponseField: false,
                response: "",
                responses: this.state.responses.push(response)
            });
        }).catch((err) =>{
            console.log(err);
        });
    }

    render() {
        console.log(this.state.responses)
        return (
            <div>
                <Card inverse className="mb-3 container-border">
                    <CardHeader style={{ borderColor: "white", padding: "10px", paddingBottom: "5px" }}><h3>{this.props.title}</h3></CardHeader>
                    <CardBody id="content-container" style={{ paddingBottom: 0 }}>
                        {this.props.children}
                    </CardBody>
                    <CardFooter style={{ borderColor: "white" }}>
                        <button className="no-decoration-button" onClick={this.addRemoveLike}>
                            <i className="fa fa-thumbs-up" style={{ color: "white" }}></i>
                        </button>
                        <span className="mr-2">{this.state.likes}</span>
                        <button className="no-decoration-button" onClick={this.addRemoveDislike}>
                            <i className="fa fa-thumbs-down" style={{ color: "white" }}></i>
                        </button>
                        <span className="mr-2">{this.state.dislikes}</span>
                        <button className="no-decoration-button" style={{ color: "white" }} onClick={() => this.loadResponses()} >See answers</button>
                        <button className="no-decoration-button" style={{ color: "white" }} onClick={() => this.setState({ showResponseField: !this.state.showResponseField })} >Answer</button>

                        {
                            this.state.showResponseField &&
                            <Card inverse className="mt-2 container-border">
                                <CardBody >
                                    <div className="identifier-align">
                                        <img className="avatar-icon mr-3 mb-3 flex-center"
                                            src={JSON.parse(localStorage.getItem('user'))?.avatar ?? "https://i0.wp.com/ipc.digital/wp-content/uploads/2016/07/icon-user-default.png?fit=462%2C462&ssl=1"} alt="user-avatar" />
                                        <h5 className="ml-2">{JSON.parse(localStorage.getItem("user"))?.name ?? "Anonymous"}</h5>
                                    </div>

                                    <Form className="mt-2">
                                        <Input id="response-input" type="textarea" value={this.state.response} onChange={e => this.setState({response: e.target.value})} placeholder="Enter your response here" required />
                                        <div>
                                            <div className="mt-2">
                                                <button className="btn btn-info mr-3" style={{ color: "white" }} onClick={() => this.setState({ showResponseField: !this.state.showResponseField })}>Cancel</button>
                                                <button type = "button" className="btn btn-success" onClick={() => { this.sendResponse() }}>Send</button>
                                            </div>
                                        </div>
                                    </Form>
                                </CardBody>
                            </Card>
                        }
                    </CardFooter>
                </Card>
                {
                    this.state.toggleResponses &&
                    this.showResponses()
                }
            </div>
        );
    }

}