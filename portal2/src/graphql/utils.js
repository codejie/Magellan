import { graphqlConnection } from '@/vue-apollo'
// import gql from 'graphql-tag'

export function query(gql, variables, update) {
  return new Promise((resolve, reject) => {
    console.log(graphqlConnection)
    graphqlConnection.query({
      query: gql,
      // query: gql`query ($name: String!, $passwd: String!) {
      //   Person {
      //       token(name: $name, passwd: $passwd) {
      //           name
      //           flag
      //           token
      //       }
      //   }
      // }`,
      variables: {
        name: 'Jie',
        passwd: '123'
      } // variables
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
