import LOGIN from './schema/login.gql'
import LOGOUT from './schema/logout.gql'
import { query, mutation, defaultUpdate } from './utils'

export function login(data) {
  return query(LOGIN, data, defaultUpdate)
}

export function logout(data) {
  return mutation(LOGOUT, data, defaultUpdate)
}
