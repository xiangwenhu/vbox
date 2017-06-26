const state = {
  currentTime: 0,
  // 当前状态 空闲， playing, pause
  state: 0,
  // 当前播放的模式 0顺序循环， 1单曲，2随机
  mode: 0
}

const mutations = {
  /**
   * 播放的时间更新
   * @param {*} state 
   * @param {*} currentTime 播放了的时间
   */
  timeUpdate(state, currentTime) {
    state.currentTime = currentTime
  },
  /**
   * 更新播放器状态
   * @param {*} state 
   * @param {*} val  0顺序循环， 1单曲，2随机
   */
  setState(state, val) {
    state.state = val
  }
}

export default {
  namespaced: true,
  state,
  mutations
}