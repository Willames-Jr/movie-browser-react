import React, { Component } from "react";
import Popup from 'reactjs-popup';
import { Button, Card, CardBody, CardFooter, CardHeader} from 'reactstrap';


export default class DeleteListModal extends Component {
    render() {
        return (
            <Popup trigger={this.props.children} modal>
                {close => (
                    <Card className = "container-border" inverse>
                        <CardHeader style = {{borderColor: "white"}}>
                            <h3>Confirm</h3>
                        </CardHeader>
                        <CardBody>
                            <h5>Do you want to delete this item?</h5>
                        </CardBody>
                        <CardFooter style = {{borderColor: "white"}}>
                            <Button color = "danger"  onClick = {e => {this.props.deleteFunction(close)}} className = "mr-3">Yes</Button>
                            <Button color = "primary" onClick = {close}>No</Button>
                        </CardFooter>
                    </Card>
                )}
            </Popup>
        );
    }
};