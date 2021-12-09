import { CREATE_LOCATION, DELETE_LOCATION, UPDATE_LOCATION } from "../graphql/mutations"
import { TODOS } from "../graphql/queries"
import { apolloClient } from "../vue-apollo"

const state = {
    locations: [],
    isLoadingBtn: false,
    isLoading: false
}

const getters = {
    locations: state => state.locations,
    isLoadingBtn: state => state.isLoadingBtn,
    isLoading: state => state.isLoading
}

const mutations = {
    ALL_LOCATIONS_START(state) {
        state.isLoading = true
    },
    ALL_LOCATIONS_SUCCESS(state, locations) {
        state.locations = locations
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
        const {data: {todos}} = await apolloClient.query({
            query: TODOS,
            variables: {
                name: "dzhumabaev.kai"
            }
        })
        const todosMap = todos.map(obj => {
            return {id: obj.id, title: obj.title}
        })
        commit("ALL_LOCATIONS_SUCCESS", todosMap)
        console.log(todos);
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