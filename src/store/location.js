import { CREATE_LOCATION, DELETE_LOCATION, UPDATE_LOCATION } from "../graphql/mutations"
import { GET_ALL_LOCATIONS } from "../graphql/queries"
import { apolloClient } from "../vue-apollo"

const state = {
    locations: [],
    isLoadingBtn: false,
    isLoading: false
}

const getters = {
    // locations: state => state.locations,
    LOCATIONS(state){
        return state.locations
    },
    isLoadingBtn: state => state.isLoadingBtn,
    isLoading: state => state.isLoading
}

const mutations = {
    ALL_LOCATIONS_START(state) {
        state.isLoading = true
    },
    ALL_LOCATIONS_SUCCESS(state, payload) {
        state.locations = payload
        state.isLoading = false
    },

    ACTION_LOCATION_START(state) {
        state.isLoadingBtn = true
    },
    ACTION_LOCATION_SUCCESS(state) {
        state.isLoadingBtn = false
    },
    ACTION_LOCATION_FAILURE(state) {
        state.isLoadingBtn = false
    },

    DELETE_LOCATION_START(state, id) {
        state.isLoadingBtn = id
    },
    DELETE_LOCATION_SUCCESS(state) {
        state.isLoadingBtn = false
    }
}

const actions = {
    async getAllLocations({commit}) {
        commit("ALL_LOCATIONS_START")
        const response = await apolloClient.query({
            query: GET_ALL_LOCATIONS
        })
        console.log(response.data, 'res');
        commit("ALL_LOCATIONS_SUCCESS", response.data.locations)
    },

    async createLocation({commit}, title) {
        commit("ACTION_LOCATION_START")
        const response = await apolloClient.mutate({
            mutation: CREATE_LOCATION,
            variables: {
                address : title.address
            }
        })
        console.log(response.data, 'created');
        
    },
    
    async editLocation({commit, dispatch}, payload) {
        commit("ACTION_LOCATION_START")
        console.log(payload);
        await apolloClient.mutate({
                mutation: UPDATE_LOCATION,
                variables: {
                    id: payload.id,
                    title: payload.title
                }
            }).then(({data}) => {
                commit("ACTION_LOCATION_SUCCESS")
                const dataLocations = data.update_todos.returning[0].user.todos
                commit("ALL_LOCATIONS_SUCCESS", dataLocations)
            })
    },

    async deleteLocation({commit, dispatch}, id) {
        commit("DELETE_LOCATION_START", id)
        await apolloClient.mutate({
            mutation: DELETE_LOCATION,
            variables: {id: id},
            refetchQueries: [
                {
                    query: TODOS,
                    variables: {
                        name: "dzhumabaev.kai"
                    }
                }
            ]
        }).then(({data}) => {
            commit("DELETE_LOCATION_SUCCESS")
            const dataLocations = data.delete_todos.returning[0].user.todos
            commit("ALL_LOCATIONS_SUCCESS", dataLocations)
        })
    },
}

export default {
    state, getters, mutations, actions
}