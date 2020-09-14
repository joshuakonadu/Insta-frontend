<template>
  <div>
      <b-navbar class="bordD" toggleable="lg" type="light" variant="light">
          <div class="container">
    <b-navbar-brand href="#">NavBar</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-form>
          <input type="text" class="form-control h-50" placeholder="Suchen">
        </b-nav-form>
      </b-navbar-nav>

      <b-navbar-nav class="ml-auto">
        <b-nav-form v-if="!$store.state.authentication.user">
          <router-link to="/login" tag="button" class="btn btn-primary btn-sm" type="submit">Anmelden</router-link>
          <router-link to="/register" tag="button" class="btn btn-secondary ml-2 btn-sm" type="submit">Registrieren</router-link>
        </b-nav-form>
        <b-nav-form v-else>
          <router-link to="/" tag="button" class="btn btn-primary btn-sm" type="submit">Mein Profil</router-link>
          <button @click="logout" class="btn btn-secondary ml-2 btn-sm" type="button">Ausloggen</button>
        </b-nav-form>
      </b-navbar-nav>
    </b-collapse>
    </div>
  </b-navbar>
  </div>
</template>

<script>
export default {
  name:'TopNav',
  methods:{
    logout(){
      
    }
  }
}
</script>

<style scoped>
.bordD{
    box-shadow: 0px 1px 1px 1px rgba(0, 0, 0, 0.2);
}
</style>