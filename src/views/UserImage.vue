<template>
<div class="vh">
    <top-nav></top-nav>
  <div class="containerSelf h-100">
      <div v-if="userImage.image" class="row align-items-center h-100">
          <div class="col-md-8 mr-0 pr-0">
              <img :src="`data:image/${userImage.image.format};base64,${userImage.image.imageB64}`" class="card-img-top minH">
          </div>
          <div class="ml-0 pl-0 col-md-4">
              <div class="card mb-0 minH2">
                  <div class="card-header headerH">
                        <span v-if="avatar.imageB64" class="avatar avatar-md" :style="{'background-image': `url(data:image/${avatar.format};base64,${avatar.imageB64}`}"></span>
                        <span v-else class="avatar avatar-md" :style="{'background-image': `url(@/assets/user.jpg)`}"></span>
                   </div>
                <div class="card-body">
                  <p>blank</p>
                </div>
                <div class="card-footer text-muted footerH">
                    <div class="row">
                        <div class="col-12">
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon" :class="{'clickB herz':loggedIn}" width="32" height="32" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"></path><path d="M12 20l-7 -7a4 4 0 0 1 6.5 -6a.9 .9 0 0 0 1 0a4 4 0 0 1 6.5 6l-7 7"></path></svg>
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon ml-4" :class="{'clickB':loggedIn}" width="32" height="32" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"></path><path d="M3 20l1.3 -3.9a9 8 0 1 1 3.4 2.9l-4.7 1"></path><line x1="12" y1="12" x2="12" y2="12.01"></line><line x1="8" y1="12" x2="8" y2="12.01"></line><line x1="16" y1="12" x2="16" y2="12.01"></line></svg>
                        </div>
                        <div class="col-12 mt-1">
                        Gefällt {{userImage.likes.length}} Mal
                        </div>
                        <div class="col-12">
                            <span class="smText text-muted">Vor {{userImage.createdAt | elapsed}}</span>
                        </div>
                    </div> 
                   
                </div>
                <div v-if="!loggedIn" class="card-footer">
                  <router-link tag="a" to="/login"> Melde dich an</router-link>, um mit „Gefällt mir“ zu markieren oder zu kommentieren.
                </div>
              </div>
          </div>
      </div>
  </div>
  </div>
</template>

<script>
import { user } from '@/store/user.module';
import { authentication } from '@/store/authentication.module'

export default {
    name:'UserImage',
    components: {
    'topNav': () => import('@/components/TopNav'),
  },
    data(){
        return{

        }
    },
    methods:{

    },
    computed:{
        userImage(){
            return this.$store.state.user.image;
        },
        avatar(){
            return this.$store.state.user.avatar;
        },
        loggedIn(){
            return this.$store.state.authentication.user ? true : false
        }
    },
    created(){
        if(!this.$store.state.profile) this.$store.registerModule('user', user)
        if(!this.$store.state.authentication) this.$store.registerModule('authentication', authentication)
        this.$store.dispatch('user/getUserImage',this.$route.params.id)
    }
}
</script>

<style scoped>
.minH{
    min-height:400px;
    height: 580px;
}
.minH2{
    min-height:402px;
    height: 582px;
}
.headerH{
    height: 4.5rem;
}
.footerH{
    height: 6.5rem;
}
.containerSelf{
    max-width: 1000px;
    width: 100%;
    padding-right: 0.75rem;
    padding-left: 0.75rem;
    margin-right: auto;
    margin-left: auto;
}
.vh{
    height: 90vh;
}
.smText{
    font-size: 11px;
}
.clickB:hover{
    cursor: pointer;
}

</style>