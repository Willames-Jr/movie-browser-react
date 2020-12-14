import React, { Component } from 'react';
import usersApi from '../../services/usersApi';
import { Button, Container } from 'reactstrap';
import { Link } from 'react-router-dom';
import NavBar from '../../components/NavBar';

import './styles.css';
import InfoCard from '../../components/InfoCard';

export default class DashBoard extends Component {

    constructor() {
        super();
        this.state = {
            user: {},
            allLists: [],
            showAllLists: false,
            allReviews: [],
            showAllReviews: false
        }
    }

    componentDidMount() {
        this.loadLists();
        this.loadUserReviews();
    }

    loadUserReviews = () => {
        usersApi.get(`user-reviews/${JSON.parse(localStorage.getItem('user')).id}`)
            .then((response) => {
                console.log(response);
                this.setState({
                    allReviews: response.data
                })
            }).catch((err) => {
                console.log(err);
            })
    }

    loadLists = () => {
        usersApi.get(`lists/${JSON.parse(localStorage.getItem('user')).id}`)
            .then((response) => {
                console.log(response)
                this.setState({
                    allLists: response.data.results,
                    user: JSON.parse(localStorage.getItem('user'))
                });
            }).catch((err) => {
                console.log(err)
            });
    }

    showLists = () => {
        const lists = this.state.allLists?.map(list => {
            return (
                <li>
                    <Link key={list._id} to={`/list/${this.state.user.id}/${list._id}`} className="list-link">
                        {list.name}
                    </Link>
                </li>
            );
        });
        const returnList = !this.state.showAllLists
            ? lists.slice(0, 10)
            : lists;

        return returnList;
    }

    showListsButton = () => {
        
        if(this.state.allLists.length < 10){
            return
        }

        const buttonMessage = this.state.showAllLists ? "Show less" : "Show more";

        return (<Button onClick={e => { this.setState({ showAllLists: !this.state.showAllLists }) }} color="primary">{buttonMessage}</Button>)
    }

    showReviews = () => {
        const reviews = this.state.allReviews?.map(review => {
            return (
                <li >
                    <Link key={review._id} to={`/update_review/${review._id}`} className="list-link">
                        {review.title}
                    </Link>
                </li>
            );
        });
        const returnReviews = !this.state.showAllReviews
            ? reviews.slice(0, 10)
            : reviews;

        return returnReviews;
    }

    showReviewsButton = () => {
        if(this.state.allReviews.length < 10){
            return
        }

        const buttonMessage = this.state.showAllReviews ? "Show less" : "Show more";

        return (<Button onClick={e => { this.setState({ showAllReviews: !this.state.showAllReviews }) }} color="primary">{buttonMessage}</Button>)
    }

    render() {
        const user = this.state.user;
        return (
            <div>
                <NavBar />
                <Container className="mt-4 principal-container">
                    <Container className="container-border" id="user-infos">
                        <div className="flex-center">
                            <img src={user.avatar} className="avatar-icon" alt="user-avatar" />
                            <h4 className="ml-3">{user.name}</h4>
                        </div>
                        <Link to="/logout" ><Button color="danger">Logout</Button></Link>
                    </Container>
                    <InfoCard title="Your movie lists:">
                        <ul>
                            {this.state.allLists?.length === 0 || this.state.allLists === undefined ?
                                <h2>No lists found, try to create one</h2>
                                : this.showLists()
                            }
                        </ul>
                        {
                            this.showListsButton()
                        }
                    </InfoCard>
                    <InfoCard title="Your reviews:">
                        <ul>
                            {this.state.allReviews?.length === 0 || this.state.allReviews === undefined ?
                                <h2>No reviews found, try to create one</h2>
                                : this.showReviews()
                            }
                        </ul>
                        {
                            this.showReviewsButton()
                        }
                    </InfoCard>
                </Container>
            </div>
        )
    }
}
