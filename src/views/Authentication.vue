<template>
  <div class="page-single h-100 py-0">
    <router-view />
  </div>
</template>

<script>
import { authentication } from "@/store/authentication.module";
export default {
  name: "Authentication",
  created() {
    if (!this.$store.state.authentication)
      this.$store.registerModule("authentication", authentication);
  }
};
</script>

<style scoped>
.page-single {
  align-items: stretch;
  justify-content: space-around;
}
</style>
