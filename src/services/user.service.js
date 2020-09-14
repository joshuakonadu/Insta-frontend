import { store } from '../store'
import axios from 'axios'

var baseURL = 'http://localhost:5000/api'

export const userService = {
    login,
    register,
    logout,
    getUserData,
};

function register(username, password) {
    const apiClient = axios.create({
        baseURL: baseURL,
        withCredentials: false,
        headers:{
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
        }
    })
    return apiClient.post('/register', {username, password})
  }
  
  function login(username, password) {    
    const apiClient = axios.create({
        baseURL: baseURL,
        withCredentials: false,
        headers:{
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
        }
    })
      return apiClient.post('/login', {username, password})
          .then(user => {
              return user;
          })
          .catch(error => console.log(error));
  }

  function getUserData(){
    const apiClient = axios.create({
        baseURL: baseURL,
        withCredentials: false,
        headers:{
            Accept: 'application/json',
            'Content-Type': 'text/plain',
            'Cache-Control': 'no-cache',
            'authorization': 'Bearer ' + store.state.authentication.user
        }
    })
    return apiClient.get('/getUserData');
  }

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
    sessionStorage.removeItem('user');
}
