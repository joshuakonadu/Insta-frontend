import { userService } from '../services';


export const user = {
    namespaced: true,
    state: {
        userId:'',
        description: '',
        typedName: '',
        avatar: {
            format: '',
            imageB64: ''
        },
        images:[],
        image:{},
        comments:[]
    },
    actions: {
        getUserData({dispatch,commit }) {
           return userService.getUserData()
                .then(
                    user => {
                        commit('getUserSucces',user.data) 
                    }
                )
        },
        updateAvatar({ commit }, edit) {
            userService.changeAvatar(edit)
            .then(
                avatar => commit('updateAvatar', avatar.data.avatar),
            );
        },
        uploadImages({ commit }, data) {
            userService.uploadImages(data)
            .then(
                avatar => commit('uploadImagesSuccess', data.images),
            );
        },
        getUserImage({commit},id){
            userService.getUserImage(id)
            .then(
                data => commit('getUserImageSuccess', data.data),
            );
        }
    },
    mutations: {
        getUserSucces(state,data){

            this._vm.$set(state,'images',data.images)
            this._vm.$set(state,'avatar',data.userData.avatar)
            this._vm.$set(state,'description',data.userData.description)
            this._vm.$set(state,'userId',data.userData._id)
            this._vm.$set(state,'typedName',data.userData.typedName)
        },
        updateAvatar(state,data){
            this._vm.$set(state,'avatar',data)
        },
        uploadImagesSuccess(state,data){
            this._vm.$set(state,'images',data)
        },
        getUserImageSuccess(state,data){
            this._vm.$set(state,'image',data.image);
            this._vm.$set(state,'avatar',data.avatar);   
        },
        editInfo(state,data){
            this._vm.$set(state,data.prop,data.value);
        }
    }
    
}
