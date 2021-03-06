import React, { Component } from 'react';
import NavBar from '../../components/NavBar';
import { Container, CardText, Card, CardBody, CardSubtitle, CardHeader, CardFooter, Button, Badge, Col, Row, CardImg} from 'reactstrap';
import movieApi from '../../services/movieApi';
import noImage from '../../assets/images/no-image.jpg'
import './styles.css';
import MovieImg from '../../components/MovieImg';
import { Link } from 'react-router-dom';
import CreateListModal from '../../components/CreateListModal';

export default class MovieDetails extends Component {

    constructor() {
        super();
        this.state = {
            movieDetails: {},
            genres: [''],
            cast: [''],
            recommendations: [''],
            loadMore: false
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        const { id } = this.props.match.params;
        this.findMovieDetails(id);
        this.findMovieCast(id);
        this.findRecommendations(id);
    }

    async componentDidUpdate(prevProps) {
        const { id } = this.props.match.params;
        if ( id !== prevProps.match.params.id) {
            window.scrollTo(0, 0);
            this.findMovieDetails(id);
            this.findMovieCast(id);
            this.findRecommendations(id);
        }
    }

    findMovieDetails = (id) => {
        movieApi.get(`movie/${id}?api_key=edfb0ea0d4a2c7c78cb457a8cf9d01cf&language=en-US`)
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

    findRecommendations = (id) => {
        movieApi.get(`https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=edfb0ea0d4a2c7c78cb457a8cf9d01cf`)
            .then((response) => {
                return this.setState({
                    recommendations: response.data.results
                });
            })
            .catch((error) => {
                return console.log(error);
            });
    }

    showCast = () => {
        if (this.state.loadMore) {
            return this.state.cast.map(actor => {
                return (
                    <Col key={actor.cast_id} className="actor-image">
                        <Card>
                            {
                                actor.profile_path === null
                                    ? <CardImg top src={noImage} alt="no image" />
                                    : <CardImg top src={'http://image.tmdb.org/t/p/w300/' + actor.profile_path} alt="actor" />
                            }
                            <CardFooter className="movie-cast_info">
                                {actor.name}<br />
                                <span className="small">{actor.character}</span>
                            </CardFooter>
                        </Card>
                    </Col>
                );
            });
        } else {
            const firstActors = this.state.cast.slice(0, 6);
            return firstActors.map(actor => {
                return (
                    <Col className="actor-image" key={actor.cast_id}>
                        <Card>
                            {
                                actor.profile_path === null
                                    ? <CardImg top src={noImage} alt="no image" />
                                    : <CardImg top src={'http://image.tmdb.org/t/p/w300/' + actor.profile_path} alt="actor" />
                            }
                            <CardFooter className="movie-cast_info">
                                {actor.name}<br />
                                <span className="small">{actor.character}</span>
                            </CardFooter>
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
                <Badge color="primary" id="genre" key = {value.name}>{value.name}</Badge>
            );
        });
    }

    showRecommendations = () => {
        return this.state.recommendations.map((movie) => {
            return (
                <MovieImg movieId = {movie.id} posterPath = {movie.poster_path}/>
            );
        });
    }

    minutesToTimeString = (minutes) => {
        const hours = Math.floor(minutes / 60);
        const minutesMinusHours = minutes - (hours * 60);

        return `${hours}h ${minutesMinusHours}min`;
    }

    stringFormatter = (stringDate) => {
        if (stringDate === undefined) {
            return;
        }

        const stringSplit = stringDate.split('-');

        return (`${stringSplit[2]}/${stringSplit[1]}/${stringSplit[0]}`);

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
                                        <CardText className="rate-card">{movieDetails.vote_average}</CardText>
                                    </div>
                                    <CardSubtitle className="text-properties"><strong>{movieDetails.tagline}</strong></CardSubtitle><br />
                                </CardHeader>
                                <CardBody id="card-body">
                                    <div>
                                        <CreateListModal movieId = {movieDetails.id} />
                                        <Link to = {`/write_review/${movieDetails.id}/${movieDetails.title}`}>
                                            <Button color = "info" className = "ml-4"> <i className="fa fa-edit"></i> Write a review</Button>
                                        </Link>
                                    </div>
                                    <CardText id="overview-text" className="text-properties">{movieDetails.overview}</CardText>
                                    <CardText>
                                        Genres: {
                                            this.showGenres()
                                        }
                                    </CardText>
                                </CardBody>
                                <CardFooter id="card-footer">
                                    <div>
                                        <i className="fa fa-clock-o movie-icon"></i>
                                        Duration: {this.minutesToTimeString(movieDetails.runtime)}
                                    </div>
                                    <div >
                                        <i className="fa fa-calendar movie-icon"></i>
                                        Release date: {this.stringFormatter(movieDetails.release_date)}
                                    </div>
                                    <div>
                                        <i className="fa fa-money movie-icon"></i>
                                        Budget: ${movieDetails.budget}
                                    </div>
                                </CardFooter>
                            </Card>
                        </div>
                    </div>
                    <Container className="mt-4 mb-4">
                        <Card>
                            <CardHeader className="information-header">
                                <h3>Actors: </h3>
                                <Button className="mt-4" style={{ width: "120px" }} color="success"
                                    onClick={(e) => this.setState({ loadMore: !this.state.loadMore })}
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
                    <Container className="mt-4 mb-5">
                        <Card>
                            <CardHeader className="information-header"><h3>Recommendations:</h3></CardHeader>
                            <CardBody>
                                <Row xs="2" md="3" lg="4" xl="5" className="mt-3" >
                                    {
                                        this.showRecommendations()
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