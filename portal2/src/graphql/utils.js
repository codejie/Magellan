
export function query(vue, gql, variables, update) {
  return new Promise((resolve, reject) => {
    vue.$apollo.query({
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