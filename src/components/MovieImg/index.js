import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardImg, Col } from 'reactstrap';
import noImage from '../../assets/images/no-image.jpg';

import './styles.css'

export default class MovieImg extends Component {
    render() {
        return (
            <Link to={`/moviedetails/${this.props.movieId}`} >
                <Col key={this.props.movieId} className="mt-3">
                    <Card className="movie-image" width={400} height={400}>
                        {
                            this.props.posterPath === null
                                ? <CardImg height={294} top src={noImage} alt="no image" />
                                : <CardImg top src={'http://image.tmdb.org/t/p/w300/' + this.props.posterPath} alt="movie" />
                        }
                    </Card>
                </Col>
            </Link>
        );
    }
} 