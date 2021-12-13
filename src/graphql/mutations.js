import gql from "graphql-tag";

// export const ADD_EVENT = gql`
// mutation($event: EventInput){
//     createEvent(event: $event){
//         name, description, day
//     }
// }
// `


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

export const REGISTER_USER = gql `
    mutation (
        $email: String!, 
        $name: String!,
        $password: String!
    ) {
        registerUser(newUser: {
            email: $email,
            name: $name,
            password: $password
        }) {
                user{
                    id
                    email
                    name
                    token
                }
            }
    }
`;

export const LOGIN = gql`
    mutation (
        $email: String!,
        $password: String!
    ) {
        loginUser(
            email: $email,
            password: $password
        ) {
            user {
                id
                email
                name
                token
            }
        }
    }
`;

export const CREATE_LOCATION = gql`
    mutation($address: String!) {
        createLocation(createLocationInput: {address: $address}) {
            id
            address
        }
    }
`;

export const UPDATE_LOCATION = gql`
mutation($id: Int!, $address: String!) {
    updateLocation(updateLocationInput: {id:$id, address:$address}) {
      address
      id
    }
  }
`;

export const DELETE_LOCATION = gql`
    mutation($id: Int!){
        removeLocation(id:$id){
            id
        }
    }
`;
