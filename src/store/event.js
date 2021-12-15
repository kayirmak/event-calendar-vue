import { DELETE_EVENT, ADD_EVENT, UPDATE_EVENT } from "../graphql/mutations"
import { 
  GET_ALL_EVENTS, 
  GET_ALL_EVENTS_FROM_LOCATION,  
  GET_EVENTS_BY_DATES, 
  GET_EVENT_BY_ID 
} from "../graphql/queries"
import { apolloClient } from "../vue-apollo"

const state = {
    events: [],
    eventDetails: null,
    eventsFromLocation: [],
    notFound: false,
    showBtnDetails: true,
    errors: ''
}

const getters = {
    EVENTS(state){
      return state.events
    },
    EVENT_DETAILS(state){
      return state.eventDetails
    },
    EVENTS_FROM_LOCATION(state){
      return state.eventsFromLocation
    },
    NOT_FOUND(state){
      return state.notFound
    },
    ERRORS(state){
      return state.errors
    },
    SHOW_BTN_DETAILS(state){
      return state.showBtnDetails
    },
    ERRORS(state){
      return state.errors
    }
}

const mutations = {
    setAllEvents(state, events){
      state.events = events
    },
    setAddEvent(state, payload){
      state.events.push(payload)
    },
    setDeleteEvent(state, payload){
      state.eventDetails = payload
    },
    setEventDetails(state, eventDetails){
      state.eventDetails = eventDetails
    },
    setEditEvent(state, payload){
      state.eventDetails = payload
    },
    setEventsFromLocation(state, payload) {
      state.eventsFromLocation = payload
      state.eventDetails = payload
    },
    setNotFound(state, payload){
      state.notFound = payload
    },
    setEventsByDates(state, payload){
      state.events = payload
      state.showBtnDetails = false
    },
    setClearEventStore(state, payload){
      state.events = payload
      state.eventDetails = payload
    },
    setErrors(state, payload){
      state.errors = payload
    },
    setShowBtnDetails(state, payload){
      state.showBtnDetails = payload
    },
    setErrors(state, payload){
      state.errors = payload
    }

}

const actions = {

      async getAllEvents({commit}){
        await apolloClient.query({
          query: GET_ALL_EVENTS
        })
        .then((res) => {
          console.log(res.data.findActByUser, 'response');
          commit('setAllEvents', res.data.findActByUser)
          commit('setNotFound', false)
          commit('setShowBtnDetails', true)
        })
        .catch((error) => {
          console.log(error);
          commit('setNotFound', true)
        })
      },

      async addEvent({commit}, eventObj){
        await apolloClient.mutate({
          mutation: ADD_EVENT,
          variables: {
              name: eventObj.name,
              day: eventObj.day,
              description: eventObj.description,
              location: eventObj.location
          }
        })
        .then((res) => {
          console.log(res.data.createActivity, 'response store');
          commit('setAddEvent', res.data.createActivity)
        })
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
        await apolloClient.mutate({
          mutation: UPDATE_EVENT,
          variables: {
              day: eventObj.day,
              description: eventObj.description,
              id: eventObj.id,
              location: eventObj.location,
              name: eventObj.name
          }
        })
        .then((res) => {
          console.log(res.data.updateActivity, 'res edit');
          commit('setEventDetails', res.data.updateActivity)
          commit('setErrors', null)
        })
      },

      async getAllEventsFromLocation({commit}, id) {
        console.log(id);
        await apolloClient.query({
          query: GET_ALL_EVENTS_FROM_LOCATION,
          variables: {id: id}
        }).then((res) => {
          const events = res.data.findAllActivityFromLocationId
          commit('setEventsFromLocation', events) 
          commit('setErrors', null)
        }).catch((error) => {
          console.log(error);
          commit('setEventsFromLocation', null)
          commit('setErrors', error.message.split(':')[1])
        })
      },
  
      async getEventDetails({commit}, eventId){
        console.log(eventId, 'resp')
        const response = await apolloClient.query({
          query: GET_EVENT_BY_ID,
          variables: {
            id: eventId
          }
        })
        commit('setEventDetails', response.data.findActOne)
      },

      async getEventsByDates({commit}, dateObj){
        const response = await apolloClient.query({
          query: GET_EVENTS_BY_DATES,
          variables: {
            startDay: dateObj.startDay,
            endDay: dateObj.endDay
          }
        })
        console.log(response.data.dates, 'response dates');
        commit('setEventsByDates', response.data.dates)
        commit('setShowBtnDetails', false)
      },

      clearEventStore({commit}, credentials){
        commit('setClearEventStore', credentials)
      }
    }

export default {
    state, getters, actions, mutations
}