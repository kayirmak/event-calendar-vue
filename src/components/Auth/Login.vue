<template>
<div>
  <BContainer
    class="d-flex justify-content-center align-items-center"
    style="height: 100vh"
	>
		<b-form class="bg-light p-5 rounded" @submit.prevent="loginForm">
        <h5 class="d-flex justify-content-center">Sign In</h5>
        <b-form-group 
            id="input-group-1"
            label="Email:"
            label-for="input-1"
        >
		<b-form-input
            id="input-1"
            v-model="user.email"
            type="text"
            placeholder="Enter email"
            autocomplete="off"
			required
		>
		</b-form-input>
		</b-form-group>
        <b-form-group
            id="input-group-3"
            label="Your Password:"
            label-for="input-3"
        >
            <b-form-input
                id="input-3"
                v-model="user.password"
                type="password"
                placeholder="Enter password"
                required
            >
          </b-form-input>
			</b-form-group>
                <p class="errors" v-if="error">{{ error }}</p>
                <p class="paths">
                    Don't have an account?
                    <router-link :to="{name: 'Register'}">Register</router-link>
                </p>
                <p>
                    <router-link :to="{}"> Forgot your password? </router-link>
                </p>
			<div class="d-flex justify-content-center align-items-center">
			<b-button type="submit" variant="primary">Login </b-button>
            </div>
		</b-form>
	</BContainer>
</div>
</template>

<script>
export default {
    name: "Login",
    data(){
        return {
            user: {
                email: '',
                password: ''
            },
            error: ''
        }
    },
    methods: {
        loginForm(){
            this.$store.dispatch('loginUser', this.user)
            .then((res) => {
                console.log(res);
            })
            .catch(error => this.error = error)
        }
    }
}
</script>

<style>

</style>