<template>
    <div>
    <BContainer
		class="d-flex justify-content-center align-items-center"
		style="height: 100vh"
	>
		<b-form class="bg-light p-5 rounded" @submit.prevent="registerForm">
			<h5 class="d-flex justify-content-center">Sign Up</h5>
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
        id="input-group-2"
        label="Name:"
        label-for="input-2"
      >
				<b-form-input
					id="input-2"
					v-model="user.name"
					type="text"
					placeholder="Enter name"
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
            <p class="errors" v-if="error">{{error}}</p>
            <p class="paths">
                Already have an account? 
                <router-link :to="{name: 'Login'}"> Login</router-link>
            </p>
			<div class="d-flex justify-content-center align-items-center">
			<b-button type="submit" variant="primary">Register</b-button>
      </div>
		</b-form>
	</BContainer>
</div>
</template>

<script>
export default {
    name: "Register",
    data(){
        return {
			user: {
				email: '',
				name: '',
				password: '',
			},
            error: ''
        }
    },
	methods: {
		registerForm(){
			console.log(this.user);
		}
	}
}
</script>

<style>

</style>