<template>
    <div class="container-fluid d-flex">
        <div class="row flex-grow-1">
        <div class="col-lg-4 col-xl-4 d-none d-lg-flex align-items-center gradient-bg full-height px-0">
            <div class="w-100 h-100">
                <b-carousel class="h-100"
      id="carousel-1"
      v-model="slide"
      :interval="4000"
      controls
      indicators
      background="#ababab"
      img-width="1024"
      style="text-shadow: 1px 1px 2px #333;"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
    <b-carousel-slide img-blank
    class=""
      ></b-carousel-slide>
      <b-carousel-slide
    class="" img-blank
      ></b-carousel-slide>
                </b-carousel>
            </div>
        </div>
        <div class="col-md-8 col-lg-8 col-xl-8 flex-center">
            <div class="registercom p-sm-2">
                        <div class="my-5 text-center">
                            <img src="@/assets/nature.png" width="260" height="68" alt="verlingo TalentScout"/>
                        </div>
                        <div class="mb-7">
                            <h1 class="text-primary font-weight-normal mb-1">Willkommen zu <strong>Insta</strong></h1>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore, similique!
                            </p>
                        </div>
                        <form @submit.prevent="submit" action="/register" method="post">
                        <div class="form-group" >
                            <label class="form-label" for="signinSrEmail">E-Mail-Adresse</label>
                            <input v-model.trim="$v.email.$model" :class="{ 'is-invalid': $v.email.$error && email_flag == false, 'is-valid': !$v.email.$invalid && email_flag == false  }" @focus="email_flag = true" @blur="email_flag = false" type="email" class="form-control" name="email" id="signinSrEmail" placeholder="E-Mail Adresse" aria-label="Email input" required>
                            <div class="invalid-feedback" v-if="!$v.email.required">Bitte geben Sie eine Email-Adresse ein</div>
                            <div class="invalid-feedback" v-if="!$v.email.email">Bitte geben Sie eine gültige Email-Adresse ein</div>
                        </div>
                        <div class="form-group">
                            <label class="form-label" for="signinSrPassword">Passwort</label>
                            <input v-model="password" type="password" class="form-control" name="password" id="signinSrPassword"
                                placeholder="Passwort" aria-label="Passwort" required :class="{ 'is-invalid': $v.password.$error }">
                                <!-- <password v-model="password" :strength-meter-only="true"/> -->
                                <div class="invalid-feedback" v-if="!$v.password.required">Bitte geben Sie ein Passwort ein</div>
                                <div class="invalid-feedback" v-if="!$v.password.minLength">Ihr Passwort ist zu kurz. Mindestens {{$v.password.$params.minLength.min}} Zeichen</div>
                        </div>
                        <div class="form-group">
                            <label class="form-label" for="signinSrConfirmPassword">Passwort bestätigen</label>
                            <input type="password" v-model="passwordcnf" class="form-control" name="confirmPassword" id="signinSrConfirmPassword"
                                placeholder="Passwort" aria-label="Passwort" required :class="{ 'is-invalid': $v.passwordcnf.$error }">
                                <div class="invalid-feedback" v-if="!$v.passwordcnf.sameAsPassword">Die Passwörter stimmen nicht überein</div>
                        </div>
                        <div class="js-form-message mb-5">
                            <div class="custom-control custom-checkbox reg d-flex align-items-center text-muted">
                                <input v-model="checkbox" type="checkbox" class="custom-control-input" id="termsCheckbox" name="termsCheckbox" required/>
                                <label class="custom-control-label" for="termsCheckbox">
                                    <small>
                                        Ich stimme den
                                        <a class="link-muted" href="https://www.verlingo.de/impressum/" target="_blank">AGB</a> und
                                        <a class="link-muted" href="https://www.verlingo.de/datenschutz-talentscout/" target="_blank">Datenschutzbestimmungen</a>
                                        zu.
                                    </small>
                                </label>
                            </div>
                        </div>
                        <div class="row align-items-center mb-5">
                            <div class="col-5 col-sm-6">
                                <span class="small text-muted">Sie haben bereits einen Account? </span>
                                <router-link class="small" to="/login">Anmelden</router-link>
                            </div>
                            <div class="col-7 col-sm-6 text-right">
                                <button type="submit" class="btn btn-primary transition-3d-hover">Registrieren</button>
                            </div>
                        </div>
                    </form>
                </div>
                </div>
                </div>
    </div>
</template>


<script>
import { required, minLength, maxLength, sameAs, email } from 'vuelidate/lib/validators'
export default {
    name: 'register',
    data () {
    return {
        slide: 0,
        sliding: null,
        email: '',
        password: '',
        passwordcnf:'',
        submitStatus: null,
        email_flag: false,
        checkbox: false
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
    },
    passwordcnf:{
        required,
        sameAsPassword: sameAs('password')
    },
  },
  methods: {
    submit() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
      this.$store.dispatch('authentication/register', {username:this.email, password:this.password });
        this.submitStatus = 'PENDING'
        setTimeout(() => {
          this.submitStatus = 'OK'
        }, 500)
      }
    },
    onSlideStart(slide) {
        this.sliding = true
      },
      onSlideEnd(slide) {
        this.sliding = false
      }
  },
  components: {

  },

}
</script>

<style scoped>

.registercom{
    max-width: 500px;
}
.flex-center{
    display: flex;
    justify-content: center;
}

.gradient-bg {
    background-image: linear-gradient(150deg, #1DA1B3 0%, #2F7785 100%);
    background-repeat: repeat-x;
}
.fill-white {
    fill: #fff !important;
}

.text-trans {
    color: rgba(255, 255, 255, 0.7);
}

.carousel-indicators {
    bottom: 0px !important;
}

.form-group .Password{
    margin: 0;
}

.custom-control.reg .custom-control-label::before,
.custom-control.reg .custom-control-label::after{
    left: -1.5rem;
}
.imgH{
    height: 100% !important;
}
</style>
