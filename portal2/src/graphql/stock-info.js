import { query, defaultUpdate } from './utils'
import ITEMS from './schema/stock-info/items.gql'

export function items(data) {
  return query(ITEMS, data, defaultUpdate)
}
