const axios = require('axios')

const usersApi = axios.create({
    // http://localhost:5000/api/v1/
    // https://movie-app-serv.herokuapp.com/api/v1/
    baseURL: 'https://react-movies-server.herokuapp.com/api/v1/',
    validateStatus: status =>  {
        return status; // default
    },
})

export default usersApi;
