import { apolloClient, onLogout } from "../vue-apollo"
import { REGISTER_USER, LOGIN_USER, CHANGE_PASSWORD } from "../graphql/mutations"
import { GET_CURRENT_USER } from "../graphql/queries"


const state = {
    currentUser: {},
    token: localStorage.getItem('apollo-token') || null,
    isAuth: localStorage.getItem('apollo-token') ? true : false,
    errorsChangePassword: null
}

const getters = {
    isAuth: state => state.isAuth,
    errorsChangePassword: state => state.errorsChangePassword,
    USER: state => state.currentUser,
    // myLocations: state => state.currentUser.locations
}

const mutations = {
      registerSuccess(state, payload){
        // state.currentUser = payload;
      },
      loginSuccess(state, payload){
        // state.currentUser = payload
        state.isAuth = true
      },
      setToken(state, payload){
        state.token = payload
      },
      getCurrentUserSuccess(state, payload) {
        state.currentUser = payload
        state.isAuth = true
      },
      changePasswordFailure(state, errors) {
        state.errorsChangePassword = errors.split(':')[1]
      },
      changePasswordClear(state) {
        state.errorsChangePassword = ''
      },
      setLogoutUser(state, payload){
        state.user = payload
        state.token = payload
        state.isAuth = false
        state.currentUser = null
      }
}

const actions = {
    async registerUser({commit}, user){
        const response = await apolloClient.mutate({
          mutation: REGISTER_USER,
          variables: {
              username: user.username,
              email: user.email,
              password: user.password
          }
        });
        // console.log(user, 'user');
        console.log(response.data.signup, 'data');
        // commit('registerSuccess', response.data.signup);
      },
      async loginUser({commit, dispatch}, user){
        const response = await apolloClient.mutate({
          mutation: LOGIN_USER,
          variables: {
            email: user.email,
            password: user.password
          }
        });
        console.log(response.data.login, 'responsedata');
        commit('loginSuccess')
        dispatch('getCurrentUser')
        dispatch('getAllLocationsByUser')
        commit('setToken', response.data.login.access_token)
        localStorage.setItem('apollo-token', response.data.login.access_token)
      },
      getCurrentUser({commit}) {
        const token = localStorage.getItem('apollo-token')
        apolloClient.query({
          query: GET_CURRENT_USER
        }).then((res) => {
          console.log(res);
            commit('getCurrentUserSuccess', {...res.data.profile, access_token: token})
        })
        

      },

      async changePassword({commit}, payload) {
        await apolloClient.mutate({
          mutation: CHANGE_PASSWORD,
          variables: {
            old_password: payload.oldPassword,
            new_password: payload.newPassword,
            confirm_password: payload.confirmPassword
          }
        })
      },

      logoutUser({commit}){
        onLogout(apolloClient)
        commit('setLogoutUser', null)
      }

}

export default {
    state, getters, mutations, actions
}