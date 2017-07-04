import { proxy } from '../utils/LSProxy'
let state = {
  list: []
}
// state = proxy(state, 'searchHistory', ['list'])

const mutations = {

  /**
   * 添加搜索记录
   * @param {*} state 
   * @param {*} keywords 关键字
   */
  add(state, kw) {
    let index = state.list.findIndex(k => k === kw)
    if (index < 0) {
      // 不存在插入头
      state.list.unshift(kw)
    } else {
      // 存在删除原来的再重新插入头
      state.list.splice(index, 1).unshift(kw)
    }
    if (state.list.length > 10) {
      state.list.splice(10)
    }
  },
  /**
   * 删除搜索记录
   * @param {*} state 
   * @param {*} kw 
   */
  remove(state, kw) {
    let index = state.list.findIndex(k => k === kw)
    if (index < 0) {
      state.list.splice(index, 1)
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations
}