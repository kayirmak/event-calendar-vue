import gql from 'graphql-tag'

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