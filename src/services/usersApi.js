const axios = require('axios')

const usersApi = axios.create({
    // mongodb://localhost:27017/movie-app
    //https://movie-app-serv.herokuapp.com/api/v1/
    baseURL: 'https://movie-app-serv.herokuapp.com/api/v1/',
    validateStatus: status =>  {
        return status; // default
    },
})

export default usersApi;