/**
 * 数据简单复制
 * @param {*} source 
 * @param {*} keys 
 */
const copy = function (source, keys = []) {
  if (!source) {
    return source
  }
  let d = Object.create(null)
  keys.forEach(k => { d[k] = source[k] })
  return d
}

export {
  copy
}