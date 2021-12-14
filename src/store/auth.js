import { apolloClient, onLogout } from "../vue-apollo"
import { REGISTER_USER, LOGIN_USER } from "../graphql/mutations"
import { GET_CURRENT_USER } from "../graphql/queries"


const state = {
    currentUser: null,
    token: localStorage.getItem('apollo-token') || null,
    isAuth: localStorage.getItem('apollo-token') ? true : false

}

const getters = {
    USERS: state => state.users,
    isAuth: state => state.isAuth,
    USER: state => state.currentUser
}

const mutations = {
      registerSuccess(state, payload){
        // state.currentUser = payload;
      },
      loginSuccess(state, payload){
        state.currentUser = payload
        state.isAuth = true
      },
      setToken(state, payload){
        state.token = payload
      },
//       setLogoutUser(state){
//         state.currentUser = null
//         state.isAuth = false
//       },
      getCurrentUserSuccess(state, payload) {
        state.currentUser = payload
        state.isAuth = true
      },
      setLogoutUser(state, payload){
        state.user = payload
        state.token = payload
        state.isAuth = false
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
        onLogout(apolloClient)
        commit('setLogoutUser', null)
      }

}

export default {
    state, getters, mutations, actions
}