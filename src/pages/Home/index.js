import React, { Component } from 'react';
import { Container, Card, CardImg, Col, Row, ButtonGroup, Button } from 'reactstrap';
import loading from '../../assets/loading.gif';
import noImage from '../../assets/no-image.jpg';
import NavBar from '../../components/NavBar';
import './styles.css';
import movieApi from '../../services/movieApi';

export default class Home extends Component {

    divInfiniteScrollRef;

    constructor() {
        super();
        this.divInfiniteScrollRef = React.createRef();
        this.state = {
            result: [],
            page: 1,
            buttonClicked: 'popularity',
            showLoading: false
        };
    }

    componentDidMount() {
        this.getMoviesByPopularity();
        const intersecterObserver = new IntersectionObserver((entires) => {
            const ratio = entires[0].intersectionRatio;
            console.log(ratio);
            if (ratio > 0) {
                this.setState({
                    page: this.state.page + 1,
                    showLoading: true
                }, () => {
                    if(this.state.buttonClicked === 'popularity'){
                        this.getMoviesByPopularity();
                    }
                    if(this.state.buttonClicked === 'date'){
                        this.getMoviesByDate();
                    }
                    if(this.state.buttonClicked === 'vote'){
                        this.getMoviesByVote();
                    }
                })
            }
        });

        intersecterObserver.observe(this.divInfiniteScrollRef.current);
    }

    buttonClick = (buttonClicked) => {
        if(buttonClicked !== this.state.buttonClicked){
            this.setState({
                result: [],
                buttonClicked: buttonClicked,
                page: 1
            }, () => {
                if(buttonClicked === 'popularity'){
                    this.getMoviesByPopularity();
                }
                if(buttonClicked === 'date'){
                    this.getMoviesByDate();
                }
                if(buttonClicked === 'vote'){
                    this.getMoviesByVote();
                }
            })
        }
    }

    getMoviesByVote = () => {
        movieApi.get(`movie/top_rated?api_key=edfb0ea0d4a2c7c78cb457a8cf9d01cf&language=en-US&page=${this.state.page}`)
            .then((response) => {
                if (this.state.page !== 1) {
                    var oldResult = this.state.result;
                    oldResult.push(...response.data.results)
                    this.setState({
                        result: oldResult,
                        showLoading: false
                    });
                } else {
                    this.setState({
                        result: response.data.results,
                        showLoading: false
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            });

    }

    getMoviesByDate = () => {
        movieApi.get(`movie/upcoming?api_key=edfb0ea0d4a2c7c78cb457a8cf9d01cf&language=en-US&page=${this.state.page}`)
            .then((response) => {
                if (this.state.page !== 1) {
                    var oldResult = this.state.result;
                    oldResult.push(...response.data.results)
                    this.setState({
                        result: oldResult,
                        showLoading: false
                    });
                } else {
                    this.setState({
                        result: response.data.results,
                        showLoading: false
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            });

    }

    getMoviesByPopularity = () => {
        movieApi.get(`discover/movie?api_key=edfb0ea0d4a2c7c78cb457a8cf9d01cf&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${this.state.page}`)
            .then((response) => {
                if (this.state.page !== 1) {
                    var oldResult = this.state.result;
                    oldResult.push(...response.data.results)
                    this.setState({
                        result: oldResult,
                        showLoading: false
                    });
                } else {
                    this.setState({
                        result: response.data.results,
                        showLoading: false
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            });

    }

    showMovies = () => {
        return this.state.result.map(movie => {
            return (
                <Col key={movie.title} className="mt-3">
                    <Card className="movie-image" width={400} height={400}>
                        {
                            movie.poster_path === null
                                ? <CardImg height={294} top src={noImage} alt="imagem do filme nulo" />
                                : <CardImg top src={'http://image.tmdb.org/t/p/w300/' + movie.poster_path} alt="imagem do filme" />
                        }
                    </Card>
                </Col>
            );
        });
    }

    render() {
        return (
            <div>
                <NavBar />
                <Container className="mt-4">
                    <ButtonGroup>
                        <Button color = {this.state.buttonClicked === 'popularity' ? 'success' : 'secondary'} onClick = {(e) => {this.buttonClick('popularity')}}>Popularidade</Button>
                        <Button color = {this.state.buttonClicked === 'date' ? 'success' : 'secondary'} onClick = {(e) => {this.buttonClick('date')}}>Em breve</Button>
                        <Button color = {this.state.buttonClicked === 'vote' ? 'success' : 'secondary'} onClick = {(e) => {this.buttonClick('vote')}}>Melhores avaliações</Button>
                    </ButtonGroup>
                    <h2 className="mt-4" style={{ color: "white" }}>Filmes populares:</h2>
                    <hr />
                    <Row xs="2" lg="4" xl="5" className="mt-3" >
                        {
                            this.showMovies()
                        }
                        <div className="mt-4" ref={this.divInfiniteScrollRef}><p></p></div>
                    </Row>
                    {this.state.showLoading &&
                        <Container style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <img style={{ display: "flex", alignSelf: "center" }} height="50" width="50" alt="Carregando" src={loading} />
                        </Container>
                    }
                </Container>
            </div>
        )
    }
}