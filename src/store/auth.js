import gql from 'graphql-tag'
import VueRouter from 'vue-router'
import { LOGIN, REGISTER_USER } from '../graphql/mutations'
import { AUTHENTICATED_USER } from '../graphql/queries'
import { apolloClient, AUTH_TOKEN } from '../vue-apollo'

const state = {
    currentUser: null
}

const mutations = {
    LOGIN_USER(state, userData) {
        state.currentUser = userData
    }
}

const actions = {
    async registerUser({commit}, credentials) { //doesn't exist api
        const res = await apolloClient.mutate({
            mutation: REGISTER_USER,
            variables: credentials
        })
        commit('LOGIN_USER', res.data.user)
        localStorage.setItem(AUTH_TOKEN, res.token.split(' ')[1])
    },

    async login({commit}, credentials) {
        const res = await apolloClient.mutate({
            mutation: LOGIN,
            variables: credentials
        })
        commit('LOGIN_USER', res.data.user)
    },

    async getCurrentUser({commit}) {
        const res = await apolloClient.query({   //doesn't exist api
            query: AUTHENTICATED_USER,
        })
        commit('LOGIN_USER', res.data.user)
    },

}

export default {
    state, mutations, actions
}