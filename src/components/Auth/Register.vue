<template>
    <div>
    <BContainer
		class="d-flex justify-content-center align-items-center"
		style="height: 100vh"
	>
		<b-form class="bg-light p-5 rounded" @submit.prevent="registerForm">
			<h5 class="d-flex justify-content-center">Регистрация</h5>

			<b-form-group
        id="input-group-2"
        label="Имя:"
        label-for="input-2"
      >
				<b-form-input
					id="input-2"
					v-model="user.username"
					type="text"
					placeholder="Введите ваше имя"
					required
				>
				</b-form-input>
			</b-form-group>
			<b-form-group 
            id="input-group-1"
            label="Email адрес:"
            label-for="input-1"
      >
				<b-form-input
                    id="input-1"
					v-model="user.email"
					type="text"
					placeholder="Введите почту"
                    autocomplete="off"
					required
				>
				</b-form-input>
			</b-form-group>

			<b-form-group
				id="input-group-3"
				label="Пароль:"
				label-for="input-3"
			>
				<b-form-input
					id="input-3"
					v-model="user.password"
					type="password"
					placeholder="Введите ваш пароль"
					required
				>
          </b-form-input>
			</b-form-group>
            <p class="errors" v-if="error">{{error}}</p>
            <p class="paths">
                Уже зарегистрированы? 
                <router-link :to="{name: 'Login'}"> Войти</router-link>
            </p>
			<div class="d-flex justify-content-center align-items-center">
			<b-button type="submit" variant="primary">Зарегистрироваться</b-button>
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
				username: '',
				email: '',
				password: ''
			},
            error: ''
        }
    },
	methods: {
		registerForm(){
			this.$store.dispatch('registerUser', {
				username: this.user.username,
				email: this.user.email,
				password: this.user.password
			})
			.then(() => {
				// this.$router.push({name: 'Login'})
			})
			.catch(error => {
				console.log(error);
			})
		}
	}
}
</script>

<style>

</style>