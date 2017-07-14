import Vue from 'vue'
import Vuex from 'vuex'

import playing from './playing'
import player from './player'
import searchHistory from './searchHistory'
import toplist from './toplist'

import { createLSPlugin } from '../plugin/syncls'
import ls from '../utils/LStorage'
import '../utils/LocalFileSystem'

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
  plugins: [plugin],
  actions: {
    reset({ commit, state }) {
      Object.keys(state).forEach(key => commit(`${key}/reset`))
    },
    cache({ commit, state }, src) {
      saveFile(src)
    }
  },
  mutations: {
    checkUpdate() {
      window.location.href = '/update.html'
    }
  }
})

const saveFile = async function (src) {
  try {
    let fs = await window.LocalFileSystem.getInstance()
    if (src && src.indexOf('blob:') < 0 && fs && typeof fs.clear === 'function') {
      let xhr = new XMLHttpRequest()
      xhr.open('get', src, true)
      xhr.responseType = 'blob'
      xhr.onload = async function () {
        var res = xhr.response
        var fname = 'vbox/' + src.split('?')[0].split('/').reverse()[0]
        let file = await fs.getFile(fname)
        if (!file) {
          fs.writeToFile(fname, res)
        }
      }
      xhr.send()
    }
  } catch (err) {
    console.log(err)
  }
}
export default store