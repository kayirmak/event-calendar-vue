import gql from "graphql-tag";

// export const ADD_EVENT = gql`
// mutation($event: EventInput){
//     createEvent(event: $event){
//         name, description, day
//     }
// }
// `

export const REGISTER_USER = gql`
mutation($newUser: UserInput){
    registerUser(newUser: $newUser){
        user {
            id, username, email
        }
    }
}
`

export const ADD_EVENT = gql`
mutation($event: EventType) {
    createEvent(event: $event ){
        name
        day
        description
    }
  }
`

export const DELETE_EVENT = gql`
mutation($id: String){
    deleteEvent(_id: $id){
        _id,
        name
    }
}
`

export const UPDATE_EVENT = gql`
mutation($id:String, $name:String){
    updateEvent(_id:$id, name: $name)
  }
`
