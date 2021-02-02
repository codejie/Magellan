import LOGIN from './schema/login.gql'
import LOGOUT from './schema/logout.gql'
import { query, mutation } from './utils'

export function login(data) {
  return query(LOGIN, data, (resp) => {
    return resp.data
  })
}

export function logout(data) {
  return mutation(LOGOUT, data, (resp) => {
    return resp.data
  })
}

// export async function tLogin(apollo, data) {
//   return new Promise((resolve, reject) => {
//     apollo.addSmartQuery('login', {
//       query: LOGIN,
//       variables: {
//         id: 1
//       },
//       update: (store, { data }) => {
//         console.log(data)
//         resolve(data)
//       }
//     })
//     apollo.queries.login.start()
//   })
//   // await apollo.query({
//   //   query: LOGIN,
//   //   variables: {
//   //     id: 1
//   //   },
//   //   update: (store, { data }) => {
//   //     console.log(data)
//   //   }
//   // })
// }
