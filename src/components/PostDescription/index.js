import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
    Card, Button, CardHeader, CardFooter, CardBody,
    CardTitle, CardText
} from 'reactstrap';

import './styles.css';

export default class PostDescription extends Component {

    stringToDate = (dateString) => {
        return new Date(dateString).toDateString();
    }

    render() {
        return (
            <div>
                <Card inverse color="dark" className = "mb-4"> 
                    <CardHeader tag="h3">{this.props.title}</CardHeader>
                    <CardBody>
                        <CardTitle tag="h5">{this.props.movieName}</CardTitle>
                        <CardText id="content-card">
                            {this.props.content}
                        </CardText>
                        <Link to={{
                            pathname: `/reviews/${this.props.id}`,
                            state: {
                                title: this.props.title,
                                name: this.props.name,
                                content: this.props.content,
                                movieName: this.props.movieName,
                                writer: this.props.writer,
                                date: this.stringToDate(this.props.date)
                            }
                            }} >
                            <Button color="primary">Read more</Button>
                        </Link>
                    </CardBody>
                    <CardFooter>
                        <div>Written by: {this.props.writer} in {this.stringToDate(this.props.date)}</div>
                    </CardFooter>
                </Card>
            </div>
        );
    }
}