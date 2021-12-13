import { apolloClient } from "../vue-apollo"
import { REGISTER_USER, LOGIN_USER } from "../graphql/mutations"

const state = {
    currentUser: null,
    user: {},
    token: localStorage.getItem('apollo-token') || null

}

const getters = {
    USERS(state){
        return state.users
    },
    USER(state){
      return state.user
    }
}

const mutations = {
    // LOGIN_USER(state, userData) {
    //     state.currentUser = userData
    // }
      registerSuccess(state, payload){
        state.user = payload;
      },
      loginSuccess(state, payload){
        state.user = payload
      },
      setToken(state, payload){
        state.token = payload
      },
      setLogoutUser(state, payload){
        state.user = payload
        state.token = payload
      }
}

const actions = {
    // async registerUser({commit}, credentials) { //doesn't exist api
    //     const res = await apolloClient.mutate({
    //         mutation: REGISTER_USER,
    //         variables: credentials
    //     })
    //     commit('LOGIN_USER', res.data.user)
    //     localStorage.setItem(AUTH_TOKEN, res.token.split(' ')[1])
    // },

    // async login({commit}, credentials) {
    //     const res = await apolloClient.mutate({
    //         mutation: LOGIN,
    //         variables: credentials
    //     })
    //     commit('LOGIN_USER', res.data.user)
    // },

    // async getCurrentUser({commit}) {
    //     const res = await apolloClient.query({   //doesn't exist api
    //         query: AUTHENTICATED_USER,
    //     })
    //     commit('LOGIN_USER', res.data.user)
    // },

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
        commit('registerSuccess', response.data.signup);
      },
      async loginUser({commit}, user){
        const response = await apolloClient.mutate({
          mutation: LOGIN_USER,
          variables: {
            email: user.email,
            password: user.password
          }
        });
        console.log(response.data.login, 'responsedata');
        commit('loginSuccess', response.data.login)
        commit('setToken', response.data.login.access_token)
        localStorage.setItem('apollo-token', response.data.login.access_token)
      },
      logoutUser({commit}){
        localStorage.removeItem('apollo-token')
        commit('setLogoutUser', null)
      }

}

export default {
    state, getters, mutations, actions
}