<template>
  <div class="containerSelf">
      <div class="row">
      <div v-for="(image,index) in images" :key="image._id" class="col-sm-6 col-lg-4">
              <div class="card card-sm">
                <div @click="goToRoute({name:'userImage', params:{ id:image._id}})" class="d-block curS"><img :src="`data:image/${image.image.format};base64,${image.image.imageB64}`" class="card-img-top max-height"></div>
                <div class="card-body">
                  <div class="d-flex align-items-center">
                    <div class="lh-sm">
                      <div>Sunny Airey</div>
                      <div class="text-muted">Vor {{image.createdAt | elapsed}}</div>
                    </div>
                    <div class="ml-auto">
                      <!-- <a href="#" class="text-muted">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"></path><circle cx="12" cy="12" r="2"></circle><path d="M2 12l1.5 2a11 11 0 0 0 17 0l1.5 -2"></path><path d="M2 12l1.5 -2a11 11 0 0 1 17 0l1.5 2"></path></svg>
                        301
                      </a> -->
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"></path><path d="M12 20l-7 -7a4 4 0 0 1 6.5 -6a.9 .9 0 0 0 1 0a4 4 0 0 1 6.5 6l-7 7"></path></svg>
                        {{image.likes.length}}
                        
                    </div>
                    <span v-if="!image.private" title="Privat" class="ml-4 curS"><font-awesome-icon :icon="['far', 'eye-slash']" /></span>
                    <span v-else title="Öffentlich" class="ml-4 curS"><font-awesome-icon :icon="['far', 'eye']" /></span>
                  </div>
                </div>
              </div>
            </div>
            </div>
  </div>
</template>

<script>
export default {
    name:'ImageGallery',
    data(){
        return{

        }
    },
    methods:{
      goToRoute(params){
        this.$router.push(params)
      }
    },
    computed:{
        images(){
            return this.$store.state.user.images
        }
    }
}
</script>

<style scoped>
.max-height{
    height: 380px;
}
.curS:hover{
    cursor: pointer;
}
</style>