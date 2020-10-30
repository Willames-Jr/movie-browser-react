const axios = require('axios')

const usersApi = axios.create({
    baseURL: 'https://movie-app-serv.herokuapp.com/api/v1/',
    validateStatus: status =>  {
        return status; // default
    },
})

export default usersApi;