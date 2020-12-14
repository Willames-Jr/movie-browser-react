import React,{Component} from 'react';
import { Container } from 'reactstrap';
import NavBar from '../../components/NavBar';

import './styles.css';

export default class TodoApp extends Component {
    constructor() {
      super();
      this.state = {

      }
    }
    
    componentDidMount(){
      const passedState = this.props.location.state;
      this.setState(passedState);
    }

    render(){
        return (
          <div>
            <NavBar/>
            <Container className = "principal-container">
              
              <h3 className = "flex-center">{this.state.title}</h3>
              <h5 className = "flex-center">{this.state.movieName}</h5>
              <hr style = {{backgroundColor:"white"}}/>

              <p id = "review-content" style = {{whiteSpace: "pre-wrap"}}>{this.state.content}</p>
              <hr style = {{backgroundColor:"white"}}/>
              <span>By: {this.state.writer}</span><br/>
              <span>{this.state.date}</span>
            </Container>
          </div>
        )
    }
}