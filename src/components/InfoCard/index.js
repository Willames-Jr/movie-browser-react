import React, { Component } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';

export default class InfoCard extends Component {
    render() {
        return (
            <Card inverse className="mt-3 container-border">
                <CardHeader style={{ borderColor: "white" , padding: "10px", paddingBottom: "5px"}}><h3>{this.props.title}</h3></CardHeader>
                <CardBody className = "content-container" >
                    {this.props.children}
                </CardBody>
            </Card>
        );
    }
}