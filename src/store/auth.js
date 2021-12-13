import { apolloClient, onLogout } from "../vue-apollo"
import { REGISTER_USER, LOGIN_USER } from "../graphql/mutations"
import { GET_CURRENT_USER } from "../graphql/queries"

const state = {
    currentUser: null,
    token: localStorage.getItem('apollo-token') || null,
    isAuth: localStorage.getItem('apollo-token') ? true : false

}

const getters = {
    USERS(state){
      return state.users
    },
    isAuth: state => state.isAuth,
    USER(state){
      return state.currentUser
    }
}

const mutations = {
      registerSuccess(state, payload){
        state.currentUser = payload;
        state.isAuth = true
      },
      loginSuccess(state, payload){
        state.currentUser = payload
        state.isAuth = true
      },
      setToken(state, payload){
        state.token = payload
      },
      setLogoutUser(state){
        state.currentUser = null
        state.isAuth = false
      },
      getCurrentUserSuccess(state, payload) {
        state.currentUser = payload
        state.isAuth = true
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
      async getCurrentUser({commit}) {
        const token = localStorage.getItem('apollo-token')
        await apolloClient.query({
          query: GET_CURRENT_USER
        }).then((res) => {
          console.log(res);
            commit('getCurrentUserSuccess', {...res.data.getInfo, access_token: token})
        })
        

      },
      logoutUser({commit}){
        localStorage.removeItem('apollo-token')
        onLogout(apolloClient)
        commit('setLogoutUser')
      }

}

export default {
    state, getters, mutations, actions
}