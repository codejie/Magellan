import { graphqlConnection } from '@/vue-apollo'

export function query(gql, variables, update) {
  return new Promise((resolve, reject) => {
    console.log(graphqlConnection)
    graphqlConnection.query({
      query: gql,
      variables: variables
    }).then(data => {
      if (!update) {
        resolve(update(data))
      } else {
        resolve(data)
      }
    }).catch(error => {
      reject(error)
    })
  })
}
