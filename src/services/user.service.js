import {ApiClient } from "@/backend.config";



export function register(username, password) {
    return ApiClient.post('/register', {username, password})
  }
  
export function login(username, password) {    
      return ApiClient.post('/login', {username, password})
          .then(user => {
              return user;
          })
          .catch(error => console.log(error));
  }

  export function getUserData(){
    return ApiClient.get('/getUserData');
  }
  export function changeAvatar(avatar) {
    return ApiClient.post('/change-avatar',{avatar})
  }

  export function uploadImages(data){
      return ApiClient.post('/uploadImages',data)
  }

  export function getUserImage(id){
      return ApiClient.get('/getUserImage/'+id)
  }

  export function deleteImage(data){
      return ApiClient.post('/deleteImage',data)
  }

