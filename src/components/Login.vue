<template>
    <div class="container d-flex justify-content-center align-items-center py-3">
    <div class="row">
        <div class="col-login mx-auto" >
            <div class="text-center mb-6">
                <!-- <img src="./demo/brand/tabler.svg" class="h-6" alt=""> -->
              </div>
              <form class="card" @submit="onSubmit" @reset="onReset">
                  <div class="card-body p-6">
                      <div class="card-title">Melden Sie sich in Ihrem Konto an</div>
                      <div class="form-group" :class="{ 'form-group--error': $v.email.$error }">
                      <label class="form-label">E-Mail-Adresse</label>
                      <input v-model.trim="$v.email.$model" :class="{ 'is-invalid': $v.email.$error && email_flag == false }" @focus="email_flag = true" @blur="email_flag = false" name="email" class="form-control" id="InputEmail" aria-describedby="email input" placeholder="E-Mail-Adresse" required>
                      <div class="invalid-feedback" v-if="!$v.email.required">Bitte geben Sie eine Email Adresse ein</div>
                      <div class="invalid-feedback" v-if="!$v.email.email">Bitte geben Sie eine gültige Email Adresse ein</div>
                      </div>
                      <div class="form-group">
                      <label class="form-label">
                          Passwort
                          <router-link to="/password-reset" class="float-right small">Passwort vergessen?</router-link>
                      </label>
                      <input v-model="password" :class="{ 'is-invalid': $v.password.$invalid && pw_flag == false && password }" @focus="pw_flag = true" @blur="pw_flag = false" type="password" name="password" class="form-control" id="InputPassword" placeholder="Passwort" required>
                      <div class="invalid-feedback" v-if="!$v.password.required && password">Bitte geben Sie ihr Passwort ein</div>
                      <div class="invalid-feedback" v-if="!$v.password.password && password">Bitte geben Sie ein gültiges Passwort ein</div>
                      </div>
                      <div class="form-group">
                      <label class="custom-control custom-checkbox">
                          <input v-model="persist" type="checkbox" class="custom-control-input" />
                          <span class="custom-control-label">Angemeldet bleiben</span>
                      </label>
                      </div>
                      <div class="form-footer">
                      <button type="submit" class="btn btn-primary btn-block">Anmelden</button>
                      <!-- <a href="/login/google" class="btn btn-secondary btn-block"><span class="btn-icon baseline"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 48 48"><defs><path id="a" d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"></path></defs><clipPath id="b"><use xlink:href="#a" overflow="visible"></use></clipPath><path clip-path="url(#b)" fill="#FBBC05" d="M0 37V11l17 13z"></path><path clip-path="url(#b)" fill="#EA4335" d="M0 11l17 13 7-6.1L48 14V0H0z"></path><path clip-path="url(#b)" fill="#34A853" d="M0 37l30-23 7.9 1L48 0v48H0z"></path><path clip-path="url(#b)" fill="#4285F4" d="M48 48L17 24l-4-3 35-10z"></path></svg>
                      </span> Sign in with Google</a> -->
                      </div>
                  </div>
              </form>
              <div class="text-center text-muted">
                Sie haben noch keinen Account? <router-link to="/register">Hier registrieren</router-link>
              </div>
        </div>
    </div>
</div>
</template>

<script>
 import { required, minLength, maxLength, email } from 'vuelidate/lib/validators'
export default {
    name: 'login',
    data () {
    return {
        email: '',
        password: '',
        emailformate: null,
        email_flag: true,
        pw_flag: true,
        persist: false,
    }
  },
  validations: {
    email: {
      required,
      email,
      maxLength: maxLength(250),
    },
    password: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(50)
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault();
      if(this.$v.$error){
        return
      }
      this.$store.dispatch('authentication/login', {username:this.email, password:this.password});
    },
    onReset (evt) {
      evt.preventDefault();
      this.email = '';
      this.password = '';
      this.show = false;
      this.$nextTick(() => { this.show = true });
    }
  },
  computed: {
        alert () {
            return this.$store.state.alert
        }
    },
}
</script>


<style scoped>
.col-login {
    max-width: 24rem;
}

.custom-checkbox{
  display: flex;
}

.invalid-feedback{
  color: #f57f6c;
}
</style>
