<template>
<div>
  <BContainer
    class="d-flex justify-content-center align-items-center"
    style="height: 100vh"
	>
		<b-form class="bg-light p-5 rounded" @submit.prevent="loginForm">
        <h5 class="d-flex justify-content-center">Войти</h5>
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
            label="Ваш пароль:"
            label-for="input-3"
        >
            <b-form-input
                id="input-3"
                v-model="user.password"
                type="password"
                placeholder="Введите пароль"
                required
            >
          </b-form-input>
			</b-form-group>
                <p class="errors" v-if="error">{{ error }}</p>
                <p class="paths">
                    Не зарегистрированы?
                    <router-link :to="{name: 'Register'}">Регистрация</router-link>
                </p>
                <p>
                    <router-link :to="{}"> Забыли пароль? </router-link>
                </p>
			<div class="d-flex justify-content-center align-items-center">
			<b-button type="submit" variant="primary">Войти </b-button>
            </div>
		</b-form>
	</BContainer>
</div>
</template>

<script>
import { mapActions } from 'vuex';
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
        ...mapActions([
            'getAllEvents'
        ]),
        makeToast(variant = null, title) {
            this.$bvToast.toast(`body `, {
                title: `${title || 'default'}`,
                variant: variant,
                solid: true,
                autoHideDelay: 700
            })
        },
        loginForm(){
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			const checkEmail = regex.test(this.user.email);
            if(checkEmail){
            this.$store.dispatch('loginUser', {
                email: this.user.email,
                password: this.user.password
            })
            .then(() => {
                this.$router.push({name: 'EventsList'})
            })
            .catch(error => {
                this.makeToast('danger', error.message.split(':')[1])
            })
            } else {
				this.makeToast('danger', 'Введите адрес эл.почты корректно')
            }
        }
    }
}
</script>

<style>

</style>