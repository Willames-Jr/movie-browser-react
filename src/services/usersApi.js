const axios = require('axios')

const usersApi = axios.create({
    baseURL: 'http://localhost:5000/api/v1/',
    validateStatus: status =>  {
        return status; // default
    },
})

export default usersApi;