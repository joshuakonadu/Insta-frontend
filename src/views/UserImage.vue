<template>
<div class="">
    <top-nav></top-nav>
  <div class="containerSelf">
      <div class="row align-items-center">
          <div class="col-md-8 mr-0 pr-0">
              <img :src="`data:image/${userImage.image.format};base64,${userImage.image.imageB64}`" class="card-img-top minH">
          </div>
          <div class="ml-0 pl-0 col-md-4 align-self-stretch">
              <div class="card h-100">
                <div class="card-body">
                  <p>blank</p>
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
.containerSelf{
    max-width: 1000px;
    width: 100%;
    padding-right: 0.75rem;
    padding-left: 0.75rem;
    margin-right: auto;
    margin-left: auto;
}

</style>