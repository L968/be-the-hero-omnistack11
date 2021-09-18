import axios from 'axios';

export default axios.create({
    baseURL: 'http://localhost:3333/',
    validateStatus: (status) => {
        return status >= 200 && status < 500;
    },
});