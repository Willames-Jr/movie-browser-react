const axios = require('axios')

const movieApi = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    validateStatus: status =>  {
        return status; // default
    },
})

export default movieApi;