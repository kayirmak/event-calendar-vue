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
mutation($id: String, $name: String, $description: String, $day: String){
    updateEvent(_id:$id, name: $name, description: $description, day: $day)
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
