import gql from 'graphql-tag'

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
    mutation ($title: String!) {
        insert_todos(objects: {title: $title}) {
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