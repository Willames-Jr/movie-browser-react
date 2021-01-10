import React, { Component } from 'react';
import { Container } from 'reactstrap';
import Alert from 'reactstrap/lib/Alert';
import Button from 'reactstrap/lib/Button';
import Form from 'reactstrap/lib/Form';
import Input from 'reactstrap/lib/Input';
import CommentCard from '../../components/CommentCard';
import InfoCard from '../../components/InfoCard';
import NavBar from '../../components/NavBar';
import usersApi from '../../services/usersApi';

import './styles.css';

export default class TodoApp extends Component {
  constructor() {
    super();
    this.state = {

    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    const passedState = this.props.location.state;
    const newState = {
      ...passedState,
      allComments: [],
      comment: "",
      message: "",
      showErrorMessage: false,
      showSuccessMessage: false,
      messageColor: ""
    }
    this.setState(newState);
    this.loadComments();
  }

  sendComment = () => {
    
    const userId = JSON.parse(localStorage.getItem('user'))?.id;
    if (this.state.comment === "" || !this.state.comment || this.state.comment === undefined || this.state.comment === null) {
      this.setState({
        message: "The comment field must be filled",
        messageColor: "danger",
        showErrorMessage: true,
        comment: ""
      });
      return;
    }

    if (userId === undefined || userId === null) {
      this.setState({
        message: "You must be logged in",
        messageColor: "danger",
        showErrorMessage: true,
        comment: ""
      });
      return;
    }

    usersApi.post(`/comments/${this.props.match.params.review}`, {
      content: this.state.comment,
      writer: userId
    }, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    })
      .then((response) => {
        //TODO: adicionar o comentario em uma lista local
        if (response.status === 201) {
          this.setState({
            message: "Comment has been saved",
            messageColor: "success",
            showSuccessMessage: true,
            comment: ""
          });
          this.loadComments();
        }
      }).catch((err) => {
        console.log(err);
      });
  }

  loadComments = () => {
    usersApi.get(`/comments/${this.props.match.params.review}`)
      .then((response) => {
        this.setState({
          allComments: response.data
        })
      }).catch((err) => {
        console.log(err);
      });
  }

  stringToDate = (dateString) => {
    return new Date(dateString).toDateString();
  }

  showComments = () => {
    return this.state.allComments?.map((comment) => {
      return (
        <CommentCard
          key = {comment._id} 
          commentId = {comment._id}
          likes = {comment.likes}
          dislikes = {comment.dislikes}
          responses = {comment.responses}
          title={
            <div className = "align-comment-header">
              <div className="identifier-align">
                <img className="avatar-icon flex-center mb-3" src={comment.writer.avatar} alt="user-icon" />
                <h5 className="ml-2">{comment.writer.name}</h5>
              </div>
              <div>
                {this.stringToDate(comment.date)}
              </div>
            </div>
          }>
          <p className = "comment-content">{comment.content}</p>
        </CommentCard>
      );
    });
  }

  onDismissError = () => {
    this.setState({
      showErrorMessage: false
    });
  }

  onDismissSuccess = () => {
    this.setState({
      showSuccessMessage: false
    });
  }

  render() {
    return (
      <div>
        <NavBar />
        <Container className="principal-container">

          <h3 className="flex-center">{this.state.title}</h3>
          <h5 className="flex-center">{this.state.movieName}</h5>
          <hr style={{ backgroundColor: "white" }} />

          <p id="review-content" style={{ whiteSpace: "pre-wrap" }}>{this.state.content}</p>
          <hr style={{ backgroundColor: "white" }} />
          <span>By: {this.state.writer}</span><br />
          <span>{this.state.date}</span>

          <InfoCard title="Leave your comment:">
            <div className="identifier-align mb-3">
              <img className="avatar-icon flex-center mb-3" 
                src={JSON.parse(localStorage.getItem("user"))?.avatar ?? "https://i0.wp.com/ipc.digital/wp-content/uploads/2016/07/icon-user-default.png?fit=462%2C462&ssl=1"} 
                alt="user-icon" />
              <h5 className="ml-2">
                {JSON.parse(localStorage.getItem("user"))?.name ?? "Anonymous"}
              </h5>
            </div>
            <Form>
              <Alert className="mb-3" color="danger" isOpen={this.state.showErrorMessage} toggle={this.onDismissError}>{
                this.state.message
              }</Alert>
              <Input type="textarea" value={this.state.comment} onChange={e => this.setState({ comment: e.target.value })} placeholder="Enter your comment here" required />
              <div id="send-comment">
                <div>{this.comment}</div>
                <Button onClick={e => { this.sendComment() }} color="success" className="mt-3 mb-3">Send</Button>
              </div>
            </Form>
          </InfoCard>
          <Alert className="flex-center mt-3" color="success" isOpen={this.state.showSuccessMessage} toggle={this.onDismissSuccess}>{
            this.state.message
          }</Alert>
          <InfoCard title="Comments:">
            {
              (this.state.allComments === undefined || this.state.allComments === null || this.state.allComments?.length === 0) ?
              <h5>Be the first to comment</h5> :
              this.showComments() 
            }
          </InfoCard>
          
        </Container>
      </div>
    )
  }
}