import React, { Component } from 'react';
import axios from 'axios';
import { Table, Container, Card, CardImg, CardBody, CardText, Col, Row } from 'reactstrap';
import loading from '../../assets/loading.gif';
import NavBar from '../../components/NavBar';
import './styles.css';

export default class Home extends Component {

    divInfiniteScrollRef;

    constructor() {
        super();
        this.divInfiniteScrollRef = React.createRef();
        this.state = {
            result: [],
            page: 1,
            showLoading: false
        };
    }

    componentDidMount() {
        this.getFilms();
        const intersecterObserver = new IntersectionObserver((entires) => {
            const ratio = entires[0].intersectionRatio;

            if (ratio > 0) {
                this.setState({
                    page: this.state.page + 1,
                    showLoading: true
                }, () => {
                    this.getFilms();
                })
            }
        });

        intersecterObserver.observe(this.divInfiniteScrollRef.current);
    }

    getFilms = () => {
        axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=edfb0ea0d4a2c7c78cb457a8cf9d01cf&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${this.state.page}`)
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

    render() {
        return (
            <div>
                <NavBar />
                <Container>
                    <h2>Listagem de filmes:</h2>
                    <hr />
                    <Row xs="1" sm = "2" lg = "4" xl = "5" className = "mt-3" >
                        {
                            this.state.result.map(movie => {
                                return (
                                    <Col key = {movie.title} className = "mt-3">
                                        <Card className="movie-image" width={400} height={400}>
                                            <CardImg top src={'http://image.tmdb.org/t/p/w300/' + movie.poster_path} alt="imagem do filme" />
                                        </Card>
                                    </Col>
                                );
                            })
                        }
                    </Row>
                    {this.state.showLoading && <img alt="Carregando" src={loading} width={200} height={200} />}
                    <div height = {300} ref={this.divInfiniteScrollRef}></div>
                </Container>
            </div>
        )
    }
}
/*
<Table>
                        <thead>
                            <th>Imagem</th>
                            <th>Title</th>
                        </thead>
                        <tbody>
                            {
                                this.state.result.map(movie => {
                                    return (
                                        <tr>
                                            <td><img className = "movie-image" alt="imagem do filme" src={'http://image.tmdb.org/t/p/w185/' + movie.poster_path} /></td>
                                            <td>{movie.title}</td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </Table>
*/