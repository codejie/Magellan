import { graphqlConnection } from '@/vue-apollo'
// import gql from 'graphql-tag'

export function query(gql, variables, update) {
  return new Promise((resolve, reject) => {
    console.log(graphqlConnection)
    graphqlConnection.query({
      query: gql,
      variables: variables
    }).then(data => {
      if (update) {
        resolve(update(data))
      } else {
        resolve(data)
      }
    }).catch(error => {
      reject(error)
    })
  })
}

export function mutation(gql, variables, update) {
  return new Promise((resolve, reject) => {
    console.log(graphqlConnection)
    graphqlConnection.mutate({
      mutation: gql,
      variables: variables
    }).then(data => {
      if (update) {
        resolve(update(data))
      } else {
        resolve(data)
      }
    }).catch(error => {
      reject(error)
    })
  })
}
