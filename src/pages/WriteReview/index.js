import React,{Component} from 'react';
import { Button, Card, CardBody, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import NavBar from '../../components/NavBar';
import usersApi from '../../services/usersApi';

export default class WriteReview extends Component{
    constructor(props){
        super(props);
        this.state = {
            movie_id: '',
            movie_name: ''
        }
    }

    componentDidMount(){
        const {movie_name,movie_id} = this.props.match.params;
        this.setState({
            movie_id,
            movie_name 
        })
    }

    registerReview = () => {

        usersApi.post(`/user-reviews/${JSON.parse(localStorage.getItem('user')).id}`, {
            movie: this.state.movie_name,
            content: this.content,
            title: this.title,
            rate: this.rate,
        }, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then(() => {
            this.props.history.push('/dashboard');

        }).catch((err) => {
            console.log(err);
        })
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
                                    Write a review about: "{this.state.movie_name}"
                                </h3>
                                <hr className="my-3" />
                                <FormGroup>
                                    <Label for="rate" style={{ color: "black" }}>Rate:</Label>
                                    <Input type="number" max = {10} min = {0.5} step = {0.5} id="rate" 
                                        onChange={e => this.rate = e.target.value} />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="title" style={{ color: "black" }}>Title:</Label>
                                    <Input type="text" id="title" onChange={e => this.title = e.target.value} placeholder="enter the review title" />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="content" style={{ color: "black" }}>Content:</Label>
                                    <Input type="textarea" id="content" style = {{height: "300px"}} onChange={e => this.content = e.target.value} placeholder="write your review here" />
                                </FormGroup>
                                <Button color="primary" block onClick={this.registerReview}>Send review</Button>
                            </Form>
                        </CardBody>
                    </Card>
                </Container>
            </div>
        );
    }
}