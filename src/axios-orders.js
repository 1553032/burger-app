import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://my-burger-app-46081.firebaseio.com/'
});

export default instance;