import { 
    CREATE_LOCATION, 
    DELETE_LOCATION, 
    UPDATE_LOCATION 
} from "../graphql/mutations"
import { GET_MY_LOCATIONS, LOCATIONS } from "../graphql/queries"
import { apolloClient } from "../vue-apollo"


const state = {
    locations: [],
    myLocations: [],
    isLoadingBtn: false,
    isLoading: false,
    errors: []
}

const getters = {
    locations: state => state.locations,
    isLoadingBtn: state => state.isLoadingBtn,
    isLoading: state => state.isLoading,
    error: state => state.error,
    myLocations: state => state.myLocations
}

const mutations = {
    ALL_LOCATIONS_START(state) {
        state.isLoading = true
    },
    ALL_LOCATIONS_SUCCESS(state, payload) {
        state.locations = payload
        state.isLoading = false
    },
    ALL_MY_LOCATIONS(state, payload){
        state.myLocations = payload
    },

    CREATE_LOCATION_START(state) {
        state.isLoadingBtn = true
    },
    CREATE_LOCATION_SUCCESS(state, payload) {
        state.isLoadingBtn = false
        state.locations.push(payload)
        state.myLocations.push(payload)
    },
    CREATE_LOCATION_FAILURE(state) {
        state.isLoadingBtn = false
    },


    EDIT_LOCATION_START(state) {
        state.isLoadingBtn = true
    },
    EDIT_LOCATION_SUCCESS(state) {
        state.isLoadingBtn = false
    },
    EDIT_LOCATION_FAILURE(state) {
        state.isLoadingBtn = false
    },
    
    DELETE_LOCATION_START(state, id) {
        state.isLoadingBtn = id
    },
    DELETE_LOCATION_SUCCESS(state, id) {
        state.isLoadingBtn = false
        state.locations = state.locations.filter(item => item.id !== id)
    },
    DELETE_LOCATION_FAILURE(state, errors) {
        console.log(errors);
        state.errors = errors
        state.isLoadingBtn = false
    }
}

const actions = {
    async getAllLocations({commit}) {
        commit("ALL_LOCATIONS_START")
        const data = await apolloClient.query({
            query: LOCATIONS
        })
        commit("ALL_LOCATIONS_SUCCESS", data.data.locations)
        console.log(data);
    },

    async getMyLocations({commit}){
        await apolloClient.query({
            query: GET_MY_LOCATIONS
        })
        .then((res) => {
        console.log(res.data.locationsByUser, 'my locat');
        commit('ALL_MY_LOCATIONS', res.data.locationsByUser)
        })
        .catch(error => {
            console.log(error);
        })
    },

    async createLocation({commit, dispatch}, address) {
        commit("CREATE_LOCATION_START")
        await apolloClient.mutate({
            mutation: CREATE_LOCATION,
            variables: {address: address}
        }).then((res) => {
            console.log(res.data.createLocation);
            const location = res.data.createLocation
            commit("CREATE_LOCATION_SUCCESS", location)
        })
    },
    async editLocation({commit, dispatch}, payload) {
        commit("EDIT_LOCATION_START")
        await apolloClient.mutate({
                mutation: UPDATE_LOCATION,
                variables: {
                    id: payload.id,
                    address: payload.title
                }
            }).then((data) => {
                dispatch('getAllLocations')
                commit("EDIT_LOCATION_SUCCESS")
            })
        },

    async deleteLocation({commit, dispatch}, id) {
        commit("DELETE_LOCATION_START", id)
        await apolloClient.mutate({
            mutation: DELETE_LOCATION,
            variables: {id: id},
        }).then((res) => {
            const removedLocation = res.data.removeLocation.id
            commit("DELETE_LOCATION_SUCCESS", removedLocation)
        })
    },
}

export default {
    state, getters, mutations, actions
}