import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-burger-builder-d0989.firebaseio.com/'
})

export default instance;