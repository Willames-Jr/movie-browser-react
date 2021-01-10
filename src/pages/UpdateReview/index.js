import React,{Component} from 'react';
import { Button, Card, CardBody, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import DeleteListModal from '../../components/DeleteListModal';
import NavBar from '../../components/NavBar';
import usersApi from '../../services/usersApi';

export default class WriteReview extends Component{
    constructor(props){
        super(props);
        this.state = {
            title: '',
            content: '',
            rate: '',
            movie: ''
        }
    }


    componentDidMount(){
        window.scrollTo(0,0);
        this.loadReview();
    }

    loadReview = () => {
        usersApi.get(`/reviews/${this.props.match.params.movie_id}`)
            .then((response) => {
                this.setState(response.data);
            }).catch((err) =>{
                console.log(err)
            });
    }

    registerReview = () => {
        usersApi.put(`/reviews/${this.props.match.params.movie_id}`, {
            movie: this.state.movie,
            content: this.state.content,
            title: this.state.title,
            rate: this.state.rate,
        }, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then(() => {
            //this.props.history.push('/dashboard');
        }).catch((err) => {
            console.log(err);
        })
    }

    deleteReview = (close) => {
        usersApi.delete(`/reviews/${this.state._id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((response) => {
                if (response.status === 401) {
                    close();
                    return;
                }
                this.props.history.push('/dashboard');
                close();
            }).catch((err) => {
                console.log(err);
            });
    }

    render(){
        return(
            <div>
                <NavBar/>
                <Container id="container">
                    <Card id="card">
                        <CardBody>
                            <Form>
                                <h3 className = "text-center font-weight-bold" style = {{color: "black"}}>
                                    Edit the review about: "{this.state.movie}"
                                </h3>
                                <hr className="my-3" />
                                <FormGroup>
                                    <Label for="rate" style={{ color: "black" }}>Rate:</Label>
                                    <Input type="number" max = {10} min = {0.5} step = {0.5} id="rate" 
                                        onChange={e => {this.setState({rate: e.target.value})}} value = {this.state.rate}/>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="title" style={{ color: "black" }}>Title:</Label>
                                    <Input type="text" id="title" onChange={e => {this.setState({title: e.target.value})}} placeholder="enter the review title" value = {this.state.title}/>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="content" style={{ color: "black" }}>Content:</Label>
                                    <Input type="textarea" id="content" style = {{height: "300px"}} onChange={e => {this.setState({content: e.target.value})}} placeholder="write your review here" value = {this.state.content} />
                                </FormGroup>
                                <Button color="primary" block onClick={() => {this.registerReview()}}>Send review</Button>
                            </Form>
                            <DeleteListModal deleteFunction = {this.deleteReview}>
                                <button color = "danger" className = "btn btn-danger mt-3" style = {{width: "100%"}}>Delete Review</button>
                            </DeleteListModal>
                        </CardBody>
                    </Card>
                </Container>
            </div>
        );
    }
}