<template>
  <div id="app">
    <top-nav></top-nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  components:{
    'topNav': () => import('@/components/TopNav')
  }

}
</script>

<style>

</style>
