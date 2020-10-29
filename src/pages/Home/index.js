import React, { Component } from 'react';
import { Container, Row, ButtonGroup, Button, InputGroup, Input, InputGroupAddon } from 'reactstrap';
import loading from '../../assets/images/loading.gif';
import NavBar from '../../components/NavBar';
import './styles.css';
import movieApi from '../../services/movieApi';
import MovieImg from '../../components/MovieImg';

export default class Home extends Component {

    divInfiniteScrollRef;

    constructor() {
        super();
        this.divInfiniteScrollRef = React.createRef();
        this.state = {
            movieSearch: '',
            title: 'Popular Movies:',
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
            if (ratio > 0) {
                this.setState({
                    page: this.state.page + 1,
                    showLoading: true
                }, () => {
                    if (this.state.buttonClicked === 'popularity') {
                        this.getMoviesByPopularity();
                    }
                    if (this.state.buttonClicked === 'date') {
                        this.getMoviesByDate();
                    }
                    if (this.state.buttonClicked === 'vote') {
                        this.getMoviesByVote();
                    }
                    if (this.state.buttonClicked === 'none') {
                        this.getMoviesByName(this.state.movieSearch);
                    }
                })
            }
        });

        intersecterObserver.observe(this.divInfiniteScrollRef.current);
    }

    buttonClick = (buttonClicked) => {
        if (buttonClicked !== this.state.buttonClicked) {
            this.setState({
                result: [],
                buttonClicked: buttonClicked,
                page: 1
            }, () => {
                this.changeTitle();
                if (buttonClicked === 'popularity') {
                    this.getMoviesByPopularity();
                }
                if (buttonClicked === 'date') {
                    this.getMoviesByDate();
                }
                if (buttonClicked === 'vote') {
                    this.getMoviesByVote();
                }
            })
        }
    }

    onSearchUpdate = (movieName) => {
        this.setState({
            movieSearch: movieName,
            title: `Results of "${movieName}":`,
            result: [],
            page: 1,
            buttonClicked: 'none'
        }, () => {
            if (movieName !== '') {

                this.getMoviesByName(movieName);

            } else {
                this.changeTitle();
                this.buttonClick("popularity");
            }
        });
    }

    getMoviesByName = (movieName) => {
        movieApi.get(`search/movie?api_key=edfb0ea0d4a2c7c78cb457a8cf9d01cf&language=en-US&query=${movieName}&page=${this.state.page}&include_adult=false`)
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
                <MovieImg movieId = {movie.id} posterPath = {movie.poster_path}></MovieImg>
            );
        });
    }

    changeTitle = () => {
        var titleMessage;

        if (this.state.buttonClicked === 'popularity') {
            titleMessage = 'Popular movies:';
        }
        if (this.state.buttonClicked === 'vote') {
            titleMessage = 'Top rated movies:';
        }
        if (this.state.buttonClicked === 'date') {
            titleMessage = 'Upcoming movies:';
        }
        return this.setState({
            title: titleMessage
        });
    }

    render() {
        return (
            <div>
                <NavBar />
                <Container className="principal-container">
                    <InputGroup>
                        <Input placeholder="Search movie" 
                        onChange={(e) => this.onSearchUpdate(e.target.value)} />
                        <InputGroupAddon addonType="prepend">
                            <Button color="primary">
                                <i className="fa fa-search"></i>
                            </Button>
                        </InputGroupAddon>
                    </InputGroup>
                    <ButtonGroup className="mt-3">
                        <Button 
                        color={this.state.buttonClicked === 'popularity' ? 'success' : 'secondary'} 
                        onClick={(e) => { this.buttonClick('popularity') }}
                        >Popular</Button>

                        <Button 
                        color={this.state.buttonClicked === 'date' ? 'success' : 'secondary'} 
                        onClick={(e) => { this.buttonClick('date') }}
                        >Upcoming</Button>

                        <Button 
                        color={this.state.buttonClicked === 'vote' ? 'success' : 'secondary'} 
                        onClick={(e) => { this.buttonClick('vote') }}
                        >Top rated</Button>

                    </ButtonGroup>
                    <h2 className="mt-4" >{this.state.title}</h2>
                    <Row xs="2" md="3" lg="4" xl="5" className="mt-3" >
                        {
                            this.showMovies()
                        }
                        <div className="mt-4" ref={this.divInfiniteScrollRef}><p></p></div>
                    </Row>
                    {this.state.showLoading &&
                        <Container id = "loading-container">
                            <img height="50" width="50" alt="loading" src={loading} />
                        </Container>
                    }
                </Container>
            </div>
        );
    }
}