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
                  <div class="col-12">
                      Name
                  </div>
                  <div class="col-4">
                      Beiträge
                  </div>
                  <div class="col-4">
                      Abos
                  </div>
                  <div class="col-4">
                      ias
                  </div>
                  <div class="col-12">
                      Name
                  </div>
                  <div class="col-12">Zusatzinfos</div>
              </div>
              <div class="row">
                  <div class="">
                    <button class="btn btn-sm btn-primary">Info Bearbeiten</button>
                  </div>

                  <div class="ml-3">
                    <form id="avatarform" action="/uploadavatar" method="post" enctype="multipart/form-data">
                    <label class="btn btn-sm btn-secondary file-attachment-btn mb-1 mb-sm-0 mr-1" for="avatarBtn">
                        Bild Hochladen
                        <input
                        id="avatarBtn"
                        @change="uploadImage"
                        name="files[]"
                        ref="file"
                        type="file"
                        style="display:none;"
                        >
                    </label>
                    </form>
            </div>
            </div>
          </div>
      </div>
      <hr>
  </div>
</template>

<script>
export default {
    name:'ProfileInfo',
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