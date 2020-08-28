import React, { Component } from 'react';
import NavBar from '../../components/NavBar';
import { Container,CardText, Card, CardBody, CardSubtitle, CardHeader, CardFooter, Button, Badge} from 'reactstrap';
import movieApi from '../../services/movieApi';
import './styles.css';

export default class MovieDetails extends Component {

    constructor() {
        super();
        this.state = {
            movieDetails: {},
            genres: ['']
        }
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        this.findMovieDetails(id);
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

    showGenres = () => {
        const genresArray = this.state.genres;
        return genresArray.map(value => {
            return (
                <Badge color="primary" id = "genre">{value.name}</Badge>
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
                            <Card id = "principal-card">
                                <CardHeader id = "card-header">
                                    <div>
                                        <h2>{movieDetails.title}</h2>
                                        <CardText id = "rate-card">{movieDetails.vote_average}</CardText>
                                    </div>
                                    <CardSubtitle className = "text-properties"><strong>{movieDetails.tagline}</strong></CardSubtitle><br />
                                </CardHeader>
                                <CardBody id = "card-body">
                                    <Button color="success">Add to my list</Button>
                                    <CardText id = "overview-text" className = "text-properties">{movieDetails.overview}</CardText>
                                    <CardText>
                                        Genres: {
                                            this.showGenres()
                                        }
                                    </CardText>
                                </CardBody>
                                <CardFooter id = "card-footer">

                                </CardFooter>
                            </Card>
                        </div>
                    </div>

                </Container>
            </Container >
        )
    }
}