const state = {
  // 横屏 ， 默认是false
  landscape: false
}

const mutations = {
  reset() {

  },
  landscape({ state }, val) {
    state.landscape = val
  }
}

export default {
  state,
  mutations,
  namespaced: true
}