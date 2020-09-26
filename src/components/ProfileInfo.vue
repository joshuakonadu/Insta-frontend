<template>
  <div class="containerSelf mt-5">
      <div class="row">
          <div class="col-4">
              <img
                v-if="$store.state.user.avatar.imageB64"
                id="AvatarPicture"
                v-bind:src="'data:image/'+$store.state.user.avatar.format+';base64,'+$store.state.user.avatar.imageB64"
                class="avatar avatarXL"
                alt="avatar"
              >
              <img v-else class="avatar avatarXL" src="@/assets/user.jpg" alt="Profilbild">
              <div class="avatar-statusSelf">
              <form id="avatarform" action="/uploadavatar" method="post" enctype="multipart/form-data">
              <label class="btn btn-sm btn-primary file-attachment-btn mb-1 mb-sm-0 mr-1" for="avatarBtn">
                <font-awesome-icon class="" :icon="['far', 'plus']"/>
                <input
                  id="avatarBtn"
                  @change="updateAvatar"
                  name="files[]"
                  ref="file"
                  type="file"
                  style="display:none;"
                >
              </label>
            </form>
            </div>
            <!-- <form @submit.prevent="deleteAvatar()" action="/deleteavatar" method="post">
              <button type="submit" class="btn btn-soft-secondary mb-1 mb-sm-0"><font-awesome-icon class="" :icon="['far', 'plus']"/></button>
            </form> -->
          </div>
          <div class="col-8 align-self-stretch">
              <div class="row h-100">
                  <div v-if="!lock" class="col-12">
                      {{typedName || '(Name)'}}
                  </div>
                  <div v-else class="col-12">
                      <label for="InputName">Name</label>
                      <input v-model="typedName" type="text" class="form-control" id="InputName" placeholder="Name eingeben">  
                  </div>
                  <div v-if="!lock" class="col-4">
                      Beiträge
                  </div>
                  <div v-if="!lock" class="col-4">
                      Abos
                  </div>
                  <div v-if="!lock" class="col-4">
                      ias
                  </div>
                  <div v-if="!lock" class="col-12">{{description || '(Beschreibung)'}}</div>
                  <div v-else class="col-12">
                    <label for="description">Beschreibung</label>
                    <textarea v-model="description" class="form-control" id="description" rows="3"></textarea>
                  </div>
              </div>
              <div v-if="!lock" class="row">
                  <div class="">
                    <button @click="lockFalse" class="btn btn-sm btn-primary">Info Bearbeiten</button>
                  </div>

                  <div class="ml-3">
                    <button @click="showUploadModal" class="btn btn-sm btn-secondary">Bilder Hochladen</button>
            </div>
            </div>
            <div v-else class="row">
              <div class="">
                    <button @click="save" class="btn btn-sm btn-success">Speichern</button>
                  </div>

                  <div class="ml-3">
                    <button @click="cancel" class="btn btn-sm btn-secondary">Abbrechen</button>
              </div>
            </div>
          </div>
      </div>
      <hr>
      <upload-image></upload-image>
  </div>
</template>

<script>
export default {
    name:'ProfileInfo',
    components:{
      'UploadImage': () => import('@/components/UploadImage')
    },
    data(){
      return{
        lock:false,
      }
    },
    methods:{
    updateAvatar(event) {
      var file = event.target.files[0];
      var filetype = file.name.split('.').pop().toLowerCase()
      var reader;
      var that = this;
      reader = new FileReader();
      reader.onloadend = function() {
        that.$store.dispatch("user/updateAvatar", {image:reader.result.split(",")[1], format:filetype});
      };
      reader.readAsDataURL(file);
    },
    uploadImage(event){
      var file = event.target.files[0];
      var filetype = file.name.split('.').pop().toLowerCase()
      var reader;
      var that = this;
      reader = new FileReader();
      
      reader.onloadend = function() {
          console.log(reader.result)
        // that.$store.dispatch("user/uploadImage", {imageB64:reader.result.split(",")[1], format:filetype});
      };
      reader.readAsDataURL(file);
    },
    lockFalse(){
      this.lock = true;
    },
    save(){
      this.lock = false;
    },
    cancel(){
      this.lock = false;
    },
    showUploadModal(){
      this.$bvModal.show('imageUpload')
    }
    },
    computed:{
      description:{
        get(){
          return this.$store.state.user.description
        },
        set(value){
          this.$store.commit('user/editInfo',{prop:'description',value})
        }
      },
      typedName:{
         get(){
          return this.$store.state.user.typedName
        },
        set(value){
          this.$store.commit('user/editInfo',{prop:'typedName',value})
        }
      }
    }

}
</script>

<style>
.avatarXL{
    width: 12rem;
    height: 12rem;
    line-height: 12rem;
    font-size: 1.75rem;
}
.containerSelf{
    max-width: 1000px;
    width: 100%;
    padding-right: 0.75rem;
    padding-left: 0.75rem;
    margin-right: auto;
    margin-left: auto;
}
.avatar-statusSelf {
    position: absolute;
    bottom: 1rem;
}
</style>