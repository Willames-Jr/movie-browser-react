import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Card, CardBody, Container, Button, Alert } from 'reactstrap';
import NavBar from '../../components/NavBar';
import Header from '../../components/Header';
import usersApi from '../../services/usersApi';

export default class SingIn extends Component {

    constructor(props) {
        console.log(props);
        super(props);
        this.state = {
            message: this.props.location.state === undefined ? [] : [this.props.location.state.message]
        };
    }

    showErrors = () => {
        return this.state.message.map((err) => {
            return <Alert color="danger" key={err} className="text-center">{err}</Alert>
        })
    }

    signIn = () => {
        var errors = [];

        if (!this.password || typeof this.password == undefined || this.password == null) {
            errors.push('The password is empty');
        } else if (this.password.length < 6) {
            errors.push('Password must be longer than 5 characters');
        }
        if (!this.email || typeof this.email == undefined || this.email == null) {
            errors.push('The email cannot be empty');
        } else if (!this.email.includes('@') || !this.email.includes('.com')) {
            errors.push('invalid email');
        }
        if (!this.name || typeof this.name == undefined || this.name == null) {
            errors.push('The name cannot be empty');
        }
        if (errors.length > 0) {
            return this.setState({
                message: errors
            });

        }
        
        const data = this.avatar !== "" ? {name:this.name, avatar: this.avatar, email: this.email, password: this.password} : {name:this.name, email: this.email, password: this.password} 

        usersApi.post('register', data)
            .then(response => {
                if (response.data.error) {
                    return this.setState({
                        message: [response.data.error]
                    });
                }
                this.setState({
                    message: []
                });
                this.props.history.push({
                    pathname: '/login',
                    state: {message: 'You have been registered make your login'}
                });
                return;
            }).catch(err => {
                this.setState({
                    message: ['Error connecting to the database']
                });
            });
    }

    render() {
        return (
            <div>
                <NavBar />
                <Container id = "container">
                    <Card id = "card">
                        <CardBody>
                            <Form>
                                <Header title = "Sing in"/>
                                <hr className = "my-3"/>
                                {
                                    this.showErrors()
                                }
                                <FormGroup>
                                    <Label for="name">*Name:</Label>
                                    <Input type="text" id="name" onChange={e => this.name = e.target.value} placeholder="enter your name" />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="avatar">Avatar:</Label>
                                    <Input type="text" id="avatar" onChange={e => this.avatar = e.target.value} placeholder="enter a link to an image" />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="email">*Email:</Label>
                                    <Input type="email" id="email" onChange={e => this.email = e.target.value} placeholder="enter your email" />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="password">*Password:</Label>
                                    <Input type="password" id="password" onChange={e => this.password = e.target.value} placeholder="enter your password" />
                                </FormGroup>
                                <small>Fields with * are required</small>
                                <Button className = "mt-3" color="primary" block onClick={this.signIn}>Sing in</Button>
                            </Form>
                        </CardBody>
                    </Card>
                </Container>
            </div>
        );
    };
}