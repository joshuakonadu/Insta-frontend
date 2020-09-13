<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import { user } from '@/store/user.module';
export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  created(){
    if(!this.$store.state.profile) this.$store.registerModule('user', user)
  }
}
</script>
