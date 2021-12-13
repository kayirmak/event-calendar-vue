import { DELETE_EVENT, ADD_EVENT, UPDATE_EVENT } from "../graphql/mutations"
import { GET_ALL_EVENTS, GET_ALL_EVENTS_FROM_LOCATION,  GET_EVENTS_BY_DATES, GET_EVENT_BY_ID } from "../graphql/queries"
import { apolloClient } from "../vue-apollo"

const state = {
    events: [],
    eventState: {
        name: '',
        day: '',
        description: ''
    },
    eventDetails: null,
    eventsFromLocation: [],
    notFound: false
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
    }
}

const mutations = {
    setAllEvents(state, events){
      console.log('events', events);
      state.events = events;
    },
    setAddEvent(state, payload){
      state.events.push(payload)
    },
    setDeleteEvent(state, payload){
      state.eventDetails = payload
      console.log(payload, 'payload');
    },
    setEventDetails(state, eventDetails){
      state.eventDetails = eventDetails
    },
    setEditEvent(state, payload){
    state.eventDetails = {
        name: payload
    }
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
    },
    clearEventStore(state, payload){
      state.events = payload
    }

}

const actions = {
      async getAllEvents({commit}){
        const response = await apolloClient.query({
          query: GET_ALL_EVENTS
        });
        console.log('response.data.findActByUser', 'response');
        commit('setAllEvents', response.data.findActByUser)
        // commit('setNotFound', false)
      },
      async addEvent({commit}, event){
        console.log(event, 'event store');
        const response = await apolloClient.mutate({
          mutation: ADD_EVENT,
          variables: {
              name: event.name,
              day: event.day,
              description: event.description,
              location: event.location
          }
        });
        console.log(response.data.createActivity, 'response');
        commit('setAddEvent', response.data.createActivity)
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
      async editEvent({commit, dispatch}, eventObj){
        await apolloClient.mutate({
          mutation: UPDATE_EVENT,
          variables: {
              day: eventObj.day,
              description: eventObj.description,
              id: eventObj.id,
              location: eventObj.location,
              name: eventObj.name
          }
        }).then((response) => {
          dispatch('getAllEvents')
          console.log(eventObj, 'edited data');
          commit('setEditEvent', eventObj)
        })
      },
      // async getAllEventsFromLocation({commit}, id) {
      //   console.log(id);
      //   await apolloClient.query({
      //     query: GET_ALL_EVENTS_FROM_LOCATION,
      //     variables: {id: id}
      //   }).then((res) => {
      //     const events = res.data.findAllActivityFromLocationId
      //     commit('setEventsFromLocation', events)          
      //   })
      // },
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
      }
    }

export default {
    state, getters, actions, mutations
}