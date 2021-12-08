

const state = {
    currentUser: null,
    user: {},
    token: localStorage.getItem('apollo-token') || null,
    isAuth: true

}

const getters = {
    USERS(state){
        return state.users
    },
    isAuth: state => state.isAuth
}

const mutations = {
    // LOGIN_USER(state, userData) {
    //     state.currentUser = userData
    // }
      registerSuccess(state, payload){
        state.user = payload.user;
        state.isAuth = true
      },
      loginSuccess(state, payload){
        state.user = payload.user
        state.isAuth = true
      },
      setToken(state, payload){
        state.token = payload.token
      },
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

    async registerUser({commit}, userData){
        const response = await apolloClient.mutate({
          mutation: REGISTER_USER,
          variables: userData,
        });
        console.log(userData, 'userData');
        console.log(response.data, 'data');
        commit('registerSuccess', response.data);
        commit('setToken', response.data);
        localStorage.setItem('apollo-token', response.data.token);
      },
      async loginUser({commit}, userData){
        const response = await apolloClient.query({
          query: LOGIN_USER,
          variables: userData
        });
        commit('loginSuccess', response.data)
        commit('setToken', response.data)
        localStorage.setItem('apollo-token', response.data.token)
      },

}

export default {
    state, getters, mutations, actions
}