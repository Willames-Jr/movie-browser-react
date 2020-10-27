import React, { Component } from 'react';
import movieApi from '../../services/movieApi';
import MovieImg from '../../components/MovieImg';


export default class MovieInList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            movie: {}
        }
    }

    componentDidMount() {
        this.loadMovies(this.props.movieId);
    }

    loadMovies = (movieId) => {
        movieApi.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=edfb0ea0d4a2c7c78cb457a8cf9d01cf&language=en-US`)
            .then((response) => {
                this.setState({
                    movie: response.data
                })
            }).catch((err) => {
                console.log(err);
            });
    }

    showMovie = () => {
        const movie = this.state.movie;
        return (
            <MovieImg movieId = {movie.id} posterPath = {movie.poster_path}/>
        );
    }

    render() {
        return (
            <div>
                {this.showMovie()}
            </div>
        )
    }
} 