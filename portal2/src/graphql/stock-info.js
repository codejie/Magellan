import { query, defaultUpdate } from './utils'
import ITEMS from './schema/stock-info/items.gql'
import DAYDATALATEST from './schema/stock-info/daydata-latest.gql'

export function items(data) {
  return query(ITEMS, data, defaultUpdate)
}

export function dayDataLatest(data) {
  return query(DAYDATALATEST, data, defaultUpdate)
}
