import gql from 'graphql-tag'

export const allUsers = gql`
query getAllUsers {
    getAllUsers  {
        id, username, age
    }
}
`

// export const GET_ALL_EVENTS = gql`
// query getAllEvents {
//     getAllEvents {
//         id, name, day, description
//     }
// }
// `

export const LOGIN_USER = gql`
query loginUser {
    loginUser {
        email, password
    }
}
`


export const GET_ALL_EVENTS = gql`
query {
    events {
        _id, name, description, day, createdAt
    }
}
`
export const LOCATIONS = gql`
query {
    locations{
      id,
      address,
      account{
        id,
        email
      }
    },
  }
`;

export const AUTHENTICATED_USER = gql`
    query {
        authUser {
            id
            name
            email
        }
    }

`;

export const LOCATION_BY_ID = gql`
    query($id: Int!){
        todos(where: {id: {_eq: $id}}) {
        title
        created_at
        }
    }
`;

export const GET_ALL_EVENTS_FROM_LOCATION = gql`
    query($id: Int!){
        findAllActivityFromLocationId(id:$id){
            name
            description
            day
            id
            account{
                id
                email
            }
            location{
                id
                address
            }
        }
    }
`