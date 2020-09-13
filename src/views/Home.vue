<template>
  <div class="home">
    <profile-info></profile-info>
  </div>
</template>

<script>
// @ is an alias to /src
import { user } from '@/store/user.module';
export default {
  name: 'Home',
  components: {
    'profile-info': ()=> import('@/components/ProfileInfo.vue')
  },
  created(){
    if(!this.$store.state.profile) this.$store.registerModule('user', user)
  }
}
</script>
