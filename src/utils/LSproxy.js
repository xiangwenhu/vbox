import LStorage from './LStorage'

export const proxy = function (initState, lsKey, keys = []) {
  let ks = keys, obj = LStorage.getItem(lsKey) || initState
  return new Proxy(obj, {
    set: function (target, key, value, receiver) {
      ks.indexOf(key) >= 0 && LStorage.setItem(lsKey, target)
      return Reflect.set(target, key, value, receiver)
    }
  })
}