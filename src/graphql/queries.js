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