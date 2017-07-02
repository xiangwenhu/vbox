import LStorage from './LStorage'

/**
 * 代理二级属性
 * @param {*} lsKey 存在localStorage的key
 * @param {*} pk    一级属性的key
 */
function createHanlder(lsKey, pk) {
  return {
    set: function (target, key, value, receiver) {
      let item = LStorage.getItem(lsKey)
      if (item && item[pk]) {
        item[pk][key] = value
        LStorage.setItem(lsKey, item)
      }
      return Reflect.set(target, key, value, receiver)
    }
  }
}

/**
 * 仅仅存需要存放的数据
 * @param {*} source 
 * @param {*} keys 
 */
function copy(source, keys = []) {
  if (!source) {
    return source
  }
  let d = Object.create(null)
  keys.forEach(k => { d[k] = source[k] })
  return d
}

/**
 * 代理state
 * @param {*} initState 初始化的值
 * @param {*} lsKey  localStorage的key
 * @param {*} keys   需要存储的键
 */
const proxy = function (initState, lsKey, keys = []) {
  let ks = keys, obj = Object.assign({}, initState, LStorage.getItem(lsKey))

  // 代理二级属性
  keys.forEach(k => {
    if (obj[k]) {
      obj[k] = new Proxy(obj[k], createHanlder(lsKey, k))
    }
  })
  // 存入合并的值
  LStorage.setItem(lsKey, copy(obj, keys))
  return new Proxy(obj, {
    set: function (target, key, value, receiver) {
      ks.indexOf(key) >= 0 && LStorage.setItem(lsKey, copy(target, keys))
      return Reflect.set(target, key, value, receiver)
    }
  })
}

export { proxy }
