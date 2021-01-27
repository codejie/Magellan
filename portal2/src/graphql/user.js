import LOGIN from './schema/login.gql'
import { query } from './utils'

export function login(vue, data) {
  return query(vue, LOGIN, {
    id: 1
  }, (data) => { data }); 
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
