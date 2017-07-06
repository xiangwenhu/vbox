import Vue from 'vue'
import Vuex from 'vuex'

import playing from './playing'
import player from './player'
import searchHistory from './searchHistory'
import toplist from './toplist'

import { createLSPlugin } from '../plugin/syncls'
import ls from '../utils/LStorage'

const LS_KEY = 'vbox'

const lsData = ls.getItem(LS_KEY)
let mapping = {
  playing: ['list', 'current'],
  player: ['mode'],
  searchHistory: ['list'],
  toplist: ['DFTopList', 'GlobalTopList', 'updateTime']
}
let mWhiteList = ['player/timeUpdate', 'player/setState']
if (lsData) {
  let { playing: ls_playing, player: ls_player, searchHistory: ls_searchHistory, toplist: ls_toplist } = lsData
  Object.assign(playing.state, ls_playing)
  Object.assign(player.state, ls_player)
  Object.assign(searchHistory.state, ls_searchHistory)
  Object.assign(toplist.state, ls_toplist)
}

Vue.use(Vuex)
const plugin = createLSPlugin(LS_KEY, mapping, mWhiteList)
const store = new Vuex.Store({
  modules: {
    playing,
    player,
    searchHistory,
    toplist
  },
  plugins: [plugin]
})

export default store