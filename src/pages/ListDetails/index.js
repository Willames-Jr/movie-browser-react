import React,{Component} from 'react';
import { Container, Row } from 'reactstrap';
import MovieInList from '../../components/MovieInList';
import NavBar from '../../components/NavBar';
import movieApi from '../../services/movieApi';
import usersApi from '../../services/usersApi';

export default class ListDetails extends Component{
    
    constructor(){
        super();
        this.state = {
            listName:'',
            movies: []
        }
    }

    componentDidMount(){
        const {list_id,user_id} = this.props.match.params;
        this.loadList(list_id, user_id);
    }

    

    loadList =  async(list_id,user_id) => {
        usersApi.get(`/lists/${user_id}/${list_id}`,{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then((response) => {
            this.setState({
                listName: response.data.results.name,
                movies: response.data.results.movies
            })
        }).catch((err) => {
            console.log(err);
        })
        
    }

    loadMovies = async () => {
        if(this.state.list.movies.length !== 0){
            let movies = [];
            this.state.list.movies.map(async (movie) => {
                await movieApi.get(`https://api.themoviedb.org/3/movie/${movie}?api_key=edfb0ea0d4a2c7c78cb457a8cf9d01cf&language=en-US`)
                    .then((response) => {
                        movies.push(response.data);
                    }).catch((err) => {
                        console.log(err);
                    });
            });
            this.setState({
                movies
            });
        }
    }

    showMovies = () => {  
        return this.state.movies.map(movie => {
            return (
                <MovieInList movieId = {movie}/>
            );
        });
    }

    render(){
        return(
            <div>
                <NavBar/>
                <Container className = "mt-4 principal-container">
                    <div className = "flex-center"><h2>{this.state.listName}</h2></div>
                    <hr style = {{background: 'white'}}/>
                    <Row xs="2" md="3" lg="4" xl="5" className="mt-3" >
                        {
                            this.showMovies()
                        }
                    </Row>                
                </Container>
            </div>
        );
    }
}