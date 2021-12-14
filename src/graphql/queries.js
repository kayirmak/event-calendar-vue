import gql from 'graphql-tag'


export const GET_CURRENT_USER = gql`
    query{
        getInfo{
          username
          id
        }
    }
`


export const GET_ALL_EVENTS = gql`
query{
    findActByUser{
      id
      name
      description
      day
      location{
        id
        address
      }
      account{
        id
        username
      }
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

export const GET_EVENT_BY_ID = gql`
query($id: Int!){
    findActOne(id: $id){
      name
      description
      day
      id
      account{
        id
        username
      }
      location{
        id
        address
      }
    }
  }
`

export const GET_ALL_LOCATIONS = gql`
query{
    locations{
        address
        id
    }
}
`


export const GET_EVENTS_BY_DATES = gql`
query($startDay: String!, $endDay: String!) {
  dates(dateIntervalInput: { startDay: $startDay, endDay: $endDay }) {
    name
    day
    id
    description
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