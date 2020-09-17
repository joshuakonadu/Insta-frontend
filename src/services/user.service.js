import { store } from '../store'
import axios from 'axios'

var baseURL = 'http://localhost:5000/api'

export const userService = {
    login,
    register,
    logout,
    getUserData,
    changeAvatar,
    uploadImages,
    getUserImage
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
  function changeAvatar(avatar) {
    const apiClient = axios.create({
      baseURL: baseURL,
      withCredentials: false,
      headers:{
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
          'authorization': 'Bearer ' + store.state.authentication.user
      }
  })
    return apiClient.post('/change-avatar',{avatar})
  }

  function uploadImages(data){
    const apiClient = axios.create({
        baseURL: baseURL,
        withCredentials: false,
        headers:{
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
            'authorization': 'Bearer ' + store.state.authentication.user
        }
    })
      return apiClient.post('/uploadImages',data)
  }

  function getUserImage(id){
    const apiClient = axios.create({
        baseURL: baseURL,
        withCredentials: false,
        headers:{
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache'
        }
    })
      return apiClient.get('/getUserImage/'+id)
  }

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
    sessionStorage.removeItem('user');
}
