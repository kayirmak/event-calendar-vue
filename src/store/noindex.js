// import Vue from 'vue'
// import Vuex from 'vuex'
// import { apolloClient } from '../vue-apollo'
// import { GET_ALL_EVENTS, LOGIN_USER } from '../graphql/queries'
// import { ADD_EVENT, DELETE_EVENT, REGISTER_USER, UPDATE_EVENT } from '../graphql/mutations'

// Vue.use(Vuex)

// export default new Vuex.Store({
//   state: {
//     user: {},
//     events: [],
//     eventState: {
//       name: '',
//       day: '',
//       description: '',
//     },
//     eventDetails: {},
//     token: localStorage.getItem('apollo-token') || null
//   },
//   mutations: {
//     setAllEvents(state, events){
//       state.events = events;
//     },
//     registerSuccess(state, payload){
//       state.user = payload.user;
//     },
//     loginSuccess(state, payload){
//       state.user = payload.user
//     },
//     setToken(state, payload){
//       state.token = payload.token
//     },
//     setAddEvent(state, events){
//       state.events = events
//     },
//     setDeleteEvent(state, payload){
//       state.eventDetails = payload
//       console.log(payload, 'payload');
//     },
//     setEventDetails(state, eventDetails){
//       state.eventDetails = eventDetails
//     },
//     setEditEvent(state, payload){
//       state.eventDetails = {
//         name: payload
//       }
//     }
//   },
//   actions: {
//     async getAllEvents({commit}){
//       const response = await apolloClient.query({
//         query: GET_ALL_EVENTS
//       });
//       console.log(response.data, 'response');
//       commit('setAllEvents', response.data)
//     },
//     async addEvent({commit}, event){
//       console.log(event, 'event store');
//       const response = await apolloClient.mutate({
//         mutation: ADD_EVENT,
//         variables: {
//           event: {
//             name: event.name,
//             day: event.day,
//             description: event.description
//           }
//         },
//         refetchQueries: [
//           {query: GET_ALL_EVENTS}
//         ]
//       });
//       console.log(response.data.createEvent, 'response');
//       commit('setAddEvent', response.data.createEvent)
//     },
//     async deleteEvent({commit}, id){
//       const response = await apolloClient.mutate({
//         mutation: DELETE_EVENT,
//         variables: {
//           id: id
//         },
//         refetchQueries: [
//           {query: GET_ALL_EVENTS}
//         ]
//       })
//       console.log(id, 'id');
//       console.log(response, 'response');
//       commit('setDeleteEvent', null)
//     },
//     async registerUser({commit}, userData){
//       const response = await apolloClient.mutate({
//         mutation: REGISTER_USER,
//         variables: userData,
//       });
//       console.log(userData, 'userData');
//       console.log(response.data, 'data');
//       commit('registerSuccess', response.data);
//       commit('setToken', response.data);
//       localStorage.setItem('apollo-token', response.data.token);
//     },
//     async loginUser({commit}, userData){
//       const response = await apolloClient.query({
//         query: LOGIN_USER,
//         variables: userData
//       });
//       commit('loginSuccess', response.data)
//       commit('setToken', response.data)
//       localStorage.setItem('apollo-token', response.data.token)
//     },
//     async editEvent({commit}, eventObj){
//       const response = await apolloClient.mutate({
//         mutation: UPDATE_EVENT,
//         variables: {
//           eventObj: {
//             id: eventObj.id,
//             name: eventObj.name
//           }
//         },
//         refetchQueries: [
//           {query: GET_ALL_EVENTS}
//         ]
//       })
//       console.log(response.data, 'edited data');
//       commit('setEditEvent')
//     },
//     getEventDetails({commit}, eventDetails){
//       commit('setEventDetails', eventDetails)
//     }
//   },
//   getters: {
//     USERS(state){
//       return state.users
//     },
//     EVENTS(state){
//       return state.events
//     },
//     EVENT_DETAILS(state){
//       return state.eventDetails
//     }
//   },
//   modules: {
//   }
// })
