<template>
  <div class="auth">
    <h4 class='mv3'>{{isLogin ? 'Login' : 'Sign Up'}}</h4>
    <div class='auth-form'>
      <b-form-input
        class="auth-form__input"
        v-show="!isLogin"
        v-model="name"
        type="text"
        placeholder="Your name">
      </b-form-input>
      <b-form-input
        class="auth-form__input"  
        v-model="email"
        type="text"
        placeholder="Your email address">
      </b-form-input>
      <b-form-input
        class="auth-form__input"
        v-model="password"
        type="password"
        placeholder="Password">
      </b-form-input>
    </div>
    <div class='flex mt3'>
      <b-button variant='success'
        type="button"
        class='pointer mr2 button'
        @click="isLogin ? signUp() : register()">
        {{isLogin ? "login" : "register"}}
      </b-button>
      <button
        type="button"
        class='pointer btn-style'
        @click="isLogin = !isLogin">
        {{isLogin ? 'need to create an account?' : 'already have an account?'}}
      </button>
    </div>
  </div>
</template>

<script>


  export default {
    name: 'Login',
    data () {
      return {
        email: '',
        isLogin: true,
        name: '',
        password: ''
      }
    },
    methods: {

      register() {
        this.$store.dispatch('registerUser', {
          email: this.email,
          name: this.name,
          password: this.password
        })
      },

      login() {
        this.$store.dispatch('login', {
          email: this.email,
          password: this.password
        })
      }
    }
  }
  
</script>


<style scoped>
.auth {
  width: 40%;
  box-shadow: 0 2px 5px rgb(87, 87, 87);
  padding: 20px 15px;
  margin: 10% auto;
}
.auth-form {
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.auth-form__input {
  width: 100%;
  margin: 10px 0;
}
.btn-style {
  background: none;
  color: green;
  border: none;
}
.btn-style:hover {
  background: none;
  color: rgb(0, 80, 0);
}
.btn-style:active {
  background: none;
}
</style>