import { store } from '../store'
import axios from 'axios'

var baseURL = 'http://localhost:5000/api'

const apiClient = axios.create({
    baseURL: baseURL,
    withCredentials: false,
    headers:{
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
    }
})

export const userService = {
    logout,
};



function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
    sessionStorage.removeItem('user');
}
