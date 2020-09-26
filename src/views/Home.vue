<template>
  <div class="home">
    <top-nav></top-nav>
    <profile-info></profile-info>
    <image-gallery></image-gallery>
  </div>
</template>

<script>
// @ is an alias to /src
import { user } from '@/store/user.module';
import { authentication } from '@/store/authentication.module'
export default {
  name: 'Home',
  components: {
    'profile-info': ()=> import('@/components/ProfileInfo.vue'),
    'topNav': () => import('@/components/TopNav'),
    'imageGallery': () => import('@/components/ImageGallery')
  },
  created(){
    if(!this.$store.state.user) this.$store.registerModule('user', user)
    if(!this.$store.state.authentication) this.$store.registerModule('authentication', authentication)
    this.$store.dispatch('user/getUserData')
  },
}
</script>
