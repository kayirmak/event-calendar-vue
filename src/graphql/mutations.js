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

export const CHANGE_PASSWORD = gql`
    mutation($old_password: String!, $new_password: String!, $confirm_password: String!){
        changePassword(changePassword:{
        old_password: $old_password
        new_password: $new_password
        confirm_password: $confirm_password
        }){
        id
        username
        email
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
mutation($name:String!, $description: String!, $day: String!, $location: Float!){
    createActivity(createActivityInput: {
      name: $name,
      description: $description,
      day: $day,
      location: $location
    }){
      id,
      day,
      name,
      description,
      location{
        id
        address
      }
      account{
        id
        email
      }
    }
  }
`

export const DELETE_EVENT = gql`
mutation($id: Int!){
  removeActivity(id: $id){
    id
  }
}
`

export const UPDATE_EVENT = gql`
mutation(
  $day: String!
  $description: String!
  $id: Int!
  $location: Float!
  $name: String!
) {
  updateActivity(
    updateActivityInput: {
      day: $day
      description: $description
      id: $id
      location: $location
      name: $name
    }
  ) {
    name
    description
    id
    day
    location {
      id
      address
    }
    account {
      id
      username
    }
  }
}

`

export const CREATE_LOCATION = gql`
  mutation($address: String!) {
      createLocation(createLocationInput: {address: $address}) {
          id
          address
        }
  }
`

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
