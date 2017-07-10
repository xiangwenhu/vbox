const state = {
  // 歌单
  diss: []
}

const mutations = {
  reset(state) {
    state.diss.splice(0)
  },
  // 添加歌曲
  addSong({ state }, payload) {

  },
  // 删除歌曲
  removeSong({ state }, payload) {

  },
  // 添加歌单
  addDiss(diss) {
    state.diss.push(diss)
  },
  // 删除歌单
  removeDiss({ state }, mid) {
    let index = state.diss.findIndex(s => s.mid === mid)
    index >= 0 && state.diss.splice(index, 1)
  }
}

export default {
  state,
  mutations
}