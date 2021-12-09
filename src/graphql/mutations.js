import gql from "graphql-tag";


export const REGISTER_USER = gql`
mutation(
    $username: String!
    $email: String!
    $password: String!
  ) {
    signup(
      createUserInput: { username: $username, email: $email, password: $password }
    ) {
      id
      username
      password
    }
  }
`


export const LOGIN_USER = gql`
mutation($email: String!, $password: String!) {
    login(loginUserInput: { email: $email, password: $password }) {
      access_token
      userId
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
mutation($id: String, $name: String, $description: String, $day: String){
    updateEvent(_id:$id, name: $name, description: $description, day: $day)
  }
`

export const CREATE_LOCATION = gql`
mutation($address: String!){
    createLocation(createLocationInput: {address: $address}){
      id
      address
    }
  }
`

export const UPDATE_LOCATION = gql`
    mutation ($id: Int, $title: String!) {
        update_todos(_set: {title: $title}, where: {id: {_eq: $id}}) {
            returning {
                user {
                    todos {
                        title
                        id
                    }
                }
            }
        }
    }
`;

export const DELETE_LOCATION = gql`
    mutation ($id: Int!) {
        delete_todos(where: {id: {_eq: $id}}) {
            returning {
                user {
                    todos {
                        title
                        id
                    }
                }
            }
        }
    }
`
