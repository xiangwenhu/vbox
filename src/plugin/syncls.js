import ls from '../utils/LStorage'
import { copy } from '../utils/utils'

export const createLSPlugin = function (lsKey, mappings, whitelist = []) {
  let k = lsKey || 'lsKey'
  return store => {
    store.subscribe((mutation, state) => {
      if (whitelist.findIndex(m => m === mutation.type) < 0) {
        let cd = Object.create(null)
        Object.keys(state).forEach(k => {
          if (mappings[k]) {
            cd[k] = copy(state[k], mappings[k])
          }
        })
        ls.setItem(k, cd)
      }
    })
  }
}
