<template>
  <div class="home">
    <top-nav></top-nav>
    <profile-info></profile-info>
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
    'topNav': () => import('@/components/TopNav')
  },
  created(){
    if(!this.$store.state.profile) this.$store.registerModule('user', user)
    if(!this.$store.state.authentication) this.$store.registerModule('authentication', authentication)
  }
}
</script>
