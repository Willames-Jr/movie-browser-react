import React, { Component } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';

import './styles.css';

export default class InfoCard extends Component {
    render() {
        return (
            <Card inverse className="mt-3 container-border">
                <CardHeader style={{ borderColor: "white" }}><h3>{this.props.title}</h3></CardHeader>
                <CardBody>
                    {this.props.children}
                </CardBody>
            </Card>
        );
    }
}