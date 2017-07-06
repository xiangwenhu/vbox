import Other from '../api/Other'

let state = {
  DFTopList: [],
  GlobalTopList: [],
  updateTime: new Date(1970, 1, 1)
}
// state = proxy(state, 'player', ['mode'])

const mutations = {

  /**
   * 更新巅峰榜
   * @param {Object} state 
   * @param {Array} list 
   */
  updateDFTopList(state, list = []) {
    state.DFTopList = list
  },

  /**
   * 更新全球榜
   * @param {Object} state 
   * @param {Array} list 
   */
  updateGlobalTopList(state, list = []) {
    state.GlobalTopList = list
  },

  updateUpdateTime(state, updateTime) {
    state.updateTime = new Date(updateTime)
  }
}

const actions = {
  async gettoplist({ commit, state }) {
    try {
      let now = new Date()
      // 更新时间, 排行1小时更新一次    
      if (now - new Date(state.updateTime) > 3600 * 1000) {
        let topListOpt = await Other.topList()
        commit('updateDFTopList', topListOpt[0].List)
        commit('updateGlobalTopList', topListOpt[1].List)
        commit('updateUpdateTime', now)
      }
    } catch (err) {
      console.log(err)
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions: actions
}