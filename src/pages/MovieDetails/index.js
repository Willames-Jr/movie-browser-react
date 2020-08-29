import React, { Component } from 'react';
import NavBar from '../../components/NavBar';
import { Container, CardText, Card, CardBody, CardSubtitle, CardHeader, CardFooter, Button, Badge, Col, Row, CardImg } from 'reactstrap';
import movieApi from '../../services/movieApi';
import noImage from '../../assets/images/no-image.jpg'
import './styles.css';

export default class MovieDetails extends Component {

    constructor() {
        super();
        this.state = {
            movieDetails: {},
            genres: [''],
            cast: [''],
            loadMore: false
        }
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        this.findMovieDetails(id);
        this.findMovieCast(id);
    }

    findMovieDetails = (id) => {
        movieApi.get(`https://api.themoviedb.org/3/movie/${id}?api_key=edfb0ea0d4a2c7c78cb457a8cf9d01cf&language=en-US`)
            .then((response) => {
                return this.setState({
                    movieDetails: response.data,
                    genres: response.data.genres
                });

            })
            .catch((error) => {
                return console.log(error);
            });
    }

    findMovieCast = (id) => {
        movieApi.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=edfb0ea0d4a2c7c78cb457a8cf9d01cf`)
            .then((response) => {
                return this.setState({
                    cast: response.data.cast
                });
            })
            .catch((error) => {
                return console.log(error);
            });
    }

    showCast = () => {
        if(this.state.loadMore){
            return this.state.cast.map(actor => {
                return (
                    <Col key={actor.cast_id} className="mt-3">
                        <Card className="cast-image" style = {{width: "150px", height:"200px"}} >
                            {
                                actor.profile_path === null
                                    ? <CardImg  style = {{width: "150px", height:"200px"}} top src={noImage} alt="no image" />
                                    : <CardImg  style = {{width: "150px", height:"200px"}} top src={'http://image.tmdb.org/t/p/w300/' + actor.profile_path} alt="actor" />
                            }
                        </Card>
                    </Col>
                );
            });
        }else{
            const firstActors = this.state.cast.slice(0,6);
            return firstActors.map(actor => {
                return (
                    <Col className="actor-image"  key={actor.cast_id}>
                        <Card>
                            {
                                actor.profile_path === null
                                    ? <CardImg top src={noImage} alt="no image" />
                                    : <CardImg top src={'http://image.tmdb.org/t/p/w300/' + actor.profile_path} alt="actor" />
                            }
                        </Card>
                    </Col>
                );
            });
        }  
    }

    showGenres = () => {
        const genresArray = this.state.genres;
        return genresArray.map(value => {
            return (
                <Badge color="primary" id="genre">{value.name}</Badge>
            );
        });
    }

    render() {
        const movieDetails = this.state.movieDetails;
        return (
            <Container >
                <NavBar />
                <Container className="principal-container">
                    <div className="flex-row flex-wrap no-gutters" id="movie-details">
                        <div className="col-auto">
                            <img id="movie-img"
                                src={'http://image.tmdb.org/t/p/w300/' + movieDetails.poster_path}
                                alt="movie" />
                        </div>
                        <div className="col-lg-8 col-md-10">
                            <Card id="principal-card">
                                <CardHeader id="card-header">
                                    <div>
                                        <h2>{movieDetails.title}</h2>
                                        <CardText id="rate-card">{movieDetails.vote_average}</CardText>
                                    </div>
                                    <CardSubtitle className="text-properties"><strong>{movieDetails.tagline}</strong></CardSubtitle><br />
                                </CardHeader>
                                <CardBody id="card-body">
                                    <Button color="success">Add to my list</Button>
                                    <CardText id="overview-text" className="text-properties">{movieDetails.overview}</CardText>
                                    <CardText>
                                        Genres: {
                                            this.showGenres()
                                        }
                                    </CardText>
                                </CardBody>
                                <CardFooter id="card-footer" style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
                                    <Row xs="1" lg="2">
                                        <Col className="content-center fa fa-clock-o"></Col>
                                        <Col className="content-center" >Time</Col>
                                    </Row>
                                    <Row xs="1" lg="2">
                                        <Col className="content-center fa fa-calendar"></Col>
                                        <Col className="content-center">Releasedataasdsdas</Col>
                                    </Row>
                                    <Row xs="1" lg="2">
                                        <Col className="content-center fa fa-money"></Col>
                                        <Col className="content-center">Budget</Col>
                                    </Row>
                                </CardFooter>
                            </Card>
                        </div>
                    </div>
                    <Container className = "mt-4 mb-5">
                        <Card>
                            <CardHeader id = "cast-header">
                                <h3>Actors: </h3>
                                <Button className = "mt-4" style = {{width: "120px"}} color = "success" 
                                    onClick = {(e) => this.setState({loadMore: !this.state.loadMore})}
                                    >{
                                        this.state.loadMore === true ? "Show Less" : "Show More"
                                    }
                                </Button>
                            </CardHeader>
                            <CardBody>
                                <Row xs="2" md="3" lg="6" className="mt-3" >
                                    {
                                        this.showCast()
                                    }
                                </Row>
                            </CardBody>
                        </Card>
                    </Container>
                </Container>
            </Container >
        )
    }
}