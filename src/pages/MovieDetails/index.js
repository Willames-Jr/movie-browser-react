import React, { Component } from 'react';
import NavBar from '../../components/NavBar';
import { Container, CardTitle, CardText, Card, CardBody, CardSubtitle, CardHeader} from 'reactstrap';
import movieApi from '../../services/movieApi';
import './styles.css';

export default class MovieDatails extends Component {

    constructor() {
        super();
        this.state = {
            movieDetails: {}
        }
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        this.findmovieDetails(id);
    }

    findmovieDetails = (id) => {
        movieApi.get(`https://api.themoviedb.org/3/movie/${id}?api_key=edfb0ea0d4a2c7c78cb457a8cf9d01cf&language=en-US`)
            .then((response) => {
                return this.setState({
                    movieDetails: response.data,
                });

            })
            .catch((error) => {
                return console.log(error);
            });
    }

    render() {
        const movieDetails = this.state.movieDetails;
        return (
            <Container >
                <NavBar />
                <Container className="principal-container">
                    <div class="flex-row flex-wrap no-gutters" style = {{display: "flex", alignItems: "flex-start",justifyContent: "center"}}>
                        <div class="col-auto" style = {{display: "flex", justifyContent: "center", alignItems: "center"}}>
                            <img height="450" style={{ width: 300}} src={'http://image.tmdb.org/t/p/w300/' + movieDetails.poster_path} alt="imagem do filme" />
                        </div>
                        <div class="col-lg-8 col-md-10" >
                            <Card>
                                <CardBody style={{ backgroundColor: "black" }}>
                                    <div style = {{display: "flex", justifyContent: "space-between"}}>
                                        <CardTitle><h3>{movieDetails.title}</h3></CardTitle>
                                        <CardText style = {{display:"flex",justifyContent:"center",alignItems:"center",width: "50px",height:"50px",borderColor: "yellow", borderWidth: "4px", borderStyle: "solid", borderRadius: "30px"}}>{movieDetails.vote_average}</CardText>
                                    </div>
                                    <CardText>{movieDetails.overview}</CardText>
                                </CardBody>
                            </Card>
                        </div>
                    </div>

                </Container>
            </Container >
        )
    }
}


/*<Container className="principal-container">
                    <Card style = {{color: "black"}}>
                        <CardBody>
                            <CardTitle>{this.state.movieDetails.title}</CardTitle>
                        </CardBody>
                    </Card>
                </Container>*/