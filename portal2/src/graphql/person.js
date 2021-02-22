import LOGIN from './schema/person/login.gql'
import LOGOUT from './schema/person/logout.gql'
import STOCK_DATA from './schema/person/stock-data.gql'
import UPDATE_STOCK_DATA from './schema/person/update-stock-data.gql'
import { query, mutation, defaultUpdate } from './utils'

export function login(data) {
  return query(LOGIN, data, defaultUpdate)
}

export function logout(data) {
  return mutation(LOGOUT, data, defaultUpdate)
}

export function stockData(data) {
  return query(STOCK_DATA, data, defaultUpdate)
}

export function updateStockData(data) {
  return mutation(UPDATE_STOCK_DATA, data, defaultUpdate)
}
