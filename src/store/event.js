import { DELETE_EVENT, ADD_EVENT, UPDATE_EVENT } from "../graphql/mutations"
import { GET_ALL_EVENTS } from "../graphql/queries"
import { apolloClient } from "../vue-apollo"

const state = {
    events: [],
    eventState: {
        name: '',
        day: '',
        description: ''
    },
    eventDetails: {},
    notFound: false
}

const getters = {
    EVENTS(state){
    return state.events
    },
    EVENT_DETAILS(state){
    return state.eventDetails
    },
    NOT_FOUND(state){
      return state.notFound
    }
}

const mutations = {
    setAllEvents(state, events){
        state.events = events;
    },
    setAddEvent(state, events){
    state.events = events
    },
    setDeleteEvent(state, payload){
    state.eventDetails = payload
    console.log(payload, 'payload');
    },
    setEventDetails(state, eventDetails){
    state.eventDetails = eventDetails
    },
    setEditEvent(state, payload){
      state.eventDetails.name = payload.name
      state.eventDetails.description = payload.description
      state.eventDetails.day = payload.day
    },
    setNotFound(state, payload){
      state.notFound = payload
    }
}

const actions = {
    async getAllEvents({commit}){
        const response = await apolloClient.query({
          query: GET_ALL_EVENTS
        });
        console.log(response.data, 'response');
        commit('setAllEvents', response.data)
      },
      async addEvent({commit}, event){
        console.log(event, 'event store');
        const response = await apolloClient.mutate({
          mutation: ADD_EVENT,
          variables: {
            event: {
              name: event.name,
              day: event.day,
              description: event.description
            }
          },
          refetchQueries: [
            {query: GET_ALL_EVENTS}
          ]
        });
        console.log(response.data.createEvent, 'response');
        commit('setAddEvent', response.data.createEvent)
      },
      async deleteEvent({commit}, id){
        const response = await apolloClient.mutate({
          mutation: DELETE_EVENT,
          variables: {
            id: id
          },
          refetchQueries: [
            {query: GET_ALL_EVENTS}
          ]
        })
        console.log(id, 'id');
        console.log(response.data, 'response');
        commit('setDeleteEvent', null)
        commit('setNotFound', true)
      },
      async editEvent({commit}, eventObj){
        const response = await apolloClient.mutate({
          mutation: UPDATE_EVENT,
          variables: {
              id: eventObj.id,
              name: eventObj.name,
              description: eventObj.description,
              day: eventObj.day
          },
          refetchQueries: [
            {query: GET_ALL_EVENTS}
          ]
        })
        console.log(response.data, 'edited data');
        // commit('setEditEvent', eventObj.name)
        commit('setEditEvent', eventObj)
      },
      getEventDetails({commit}, eventDetails){
        commit('setEventDetails', eventDetails)
      }
}

export default {
    state, getters, actions, mutations
}