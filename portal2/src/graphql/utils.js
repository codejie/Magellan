import { grapqlConnection } from '@/vue-apollo'

export function query(vue, gql, variables, update) {
  return new Promise((resolve, reject) => {
    console.log(grapqlConnection)
    grapqlConnection.query({
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
