import { graphqlConnection } from '@/vue-apollo'

export function defaultUpdate(resp) {
  const data = resp.data
  const level1 = Object.keys(data)[0]
  const level2 = Object.keys(data[level1])[0]
  return data[level1][level2]
}

export function query(gql, variables, update) {
  return new Promise((resolve, reject) => {
    // console.log(graphqlConnection)
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
    // console.log(graphqlConnection)
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
