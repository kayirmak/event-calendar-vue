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
export const TODOS = gql`
query($name: String!)
{
  todos(where: {user: {name: {_like: $name}}}) {
    title
    id
  }
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
`