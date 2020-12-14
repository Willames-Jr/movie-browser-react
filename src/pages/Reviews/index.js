import React, { Component } from 'react';
import { Container } from 'reactstrap';
import NavBar from '../../components/NavBar';
import PostDescription from '../../components/PostDescription';
import usersApi from '../../services/usersApi';
import loading from '../../assets/images/loading.gif';

import './styles.css';

export default class Reviews extends Component {

    constructor() {
        super();
        this.divInfiniteScrollRef = React.createRef();
        this.state = {
            reviews: [{}],
            page: 1,
            showLoading: false,
            totalPages: 0
        }
    }

    componentDidMount() {
        this.getAllReviews();
        const intersecterObserver = new IntersectionObserver((entires) => {
            const ratio = entires[0].intersectionRatio;
            if (ratio > 0) {
                this.setState({
                    page: this.state.page + 1,
                    showLoading: !(this.state.totalPages !== this.state.actualPage)
                });
            }
        });
        intersecterObserver.observe(this.divInfiniteScrollRef.current);
    }

    getAllReviews = () => {
        usersApi.get(`/reviews/?page=${this.state.actualPage}`)
            .then((response) => {
                console.log(response)
                this.setState({
                    reviews: response.data.reviews,
                    totalPages: response.data.totalPages
                });
                return;
            })
            .catch((err) => {
                this.setState({
                    reviews: null
                });
                return;
            });
    }

    showAllReviews = () => {
        return this.state.reviews.map((review) => {
            return (
                <PostDescription
                    title={review.title}
                    movieName={review.movie}
                    content={review.content}
                    writer={review.writer?.name}
                    date={review.date}
                    id={review._id} />
            );
        });
    }

    render() {
        return (
            <div>
                <NavBar />
                <Container className="principal-container">
                    <h2>Last posts</h2>
                    <hr style={{ backgroundColor: "white" }} />
                    {
                        this.showAllReviews()
                    }
                    <div className="mt-4" ref={this.divInfiniteScrollRef}><p></p></div>
                    {
                        this.state.showLoading &&
                        <Container id="loading-container">
                            <img height="50" width="50" alt="loading" src={loading} />
                        </Container>
                    }

                </Container>
            </div>
        );
    }
}