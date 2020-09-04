import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button, Alert, Card, CardBody, Container } from 'reactstrap';
import Header from '../../components/Header';
import usersApi from '../../services/usersApi';
import NavBar from '../../components/NavBar';
import './styles.css'
export default class Login extends Component {

    constructor(props) {
        console.log(props);
        super(props);
        this.state = {
            message: this.props.location.state === undefined ? [] : [this.props.location.state.message]
        };
    }

    showErrors = () => {
        return this.state.message.map((err) => {
            if(err === "You have been registered make your login"){
                return <Alert color="success" key={err} className="text-center">{err}</Alert>
            }
            return <Alert color="danger" key={err} className="text-center">{err}</Alert>
        });
    }

    login = () => {

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
        if (errors.length > 0) {
            return this.setState({
                message: errors
            });
        }

        const data = {
            email: this.email, password: this.password
        };

        usersApi.post('login', data)
            .then(response => {
                if (response.data.error) {
                    return this.setState({
                        message: [response.data.error]
                    });
                }

                const user = {
                    name: response.data.result.name,
                    avatar: response.data.result.avatar
                };

                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(user));
                this.setState({
                    message: []
                });
                this.props.history.push('/dashboard');
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
                <Container id="container">
                    <Card id="card">
                        <CardBody>
                            <Form>
                                <Header title="Login" />
                                <hr className="my-3" />
                                {
                                    this.showErrors()
                                }
                                <FormGroup>
                                    <Label for="email" style={{ color: "black" }}>Email:</Label>
                                    <Input type="text" id="email" onChange={e => this.email = e.target.value} placeholder="inform you email" />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="password" style={{ color: "black" }}>Password:</Label>
                                    <Input type="password" id="password" onChange={e => this.password = e.target.value} placeholder="inform you password" />
                                </FormGroup>
                                <Button color="primary" block onClick={this.login}>Log in</Button>
                            </Form>
                        </CardBody>
                    </Card>
                </Container>

            </div>
        );
    }
}