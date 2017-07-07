import { proxy } from '../utils/LSProxy'
let state = {
  list: [],
  current: null
}
// state = proxy(state, 'playing', ['list', 'current'])

const mutations = {

  /**
   * 添加歌曲
   * @param {*} state 
   * @param {*} song 歌曲信息 {songname,songmid,singer,albummid}
   *   
   */
  addSong(state, song) {
    let index = state.list.findIndex(s => s.songmid === song.songmid)
    if (index < 0) {
      state.list.push(song)
    }
  },

  /**
   * 添加歌曲
   * @param {*} state  内置
   * @param {*} songs  歌曲列表
   */
  addSongs(state, songs) {
    let index = -1
    songs.forEach(song => {
      index = state.list.findIndex(s => s.songmid === song.songmid)
      if (index < 0) {
        state.list.push(song)
      }
    })
  },

  /**
   * 删除歌曲
   * @param {*} state 
   * @param {*} songmid  歌曲媒体id 
   */
  delSong(state, songmid) {
    let index = state.list.findIndex(s => s.songmid === songmid)
    if (index >= 0) {
      state.list.splice(index, 1)
    }
  },

  /**
   * 批量删除歌曲
   * @param {*} state 
   * @param {*} songmids 歌曲媒体列表 
   */
  delSongs(state, songmids = []) {
    let index = -1
    songmids.forEach(songmid => {
      index = state.list.findIndex(s => s.songmid === songmid)
      index >= 0 && state.list.splice(index, 1)
    })
  },

  /**
   * 播放下一首，
   * @param {*} state 
   * @param {*} song 为空
   */
  next(state, song) {
    // 如果song不为空，表示是插放，（前提是已经添加到playing）
    if (song) {
      let index = state.list.findIndex(s => s.songmid === song.songmid)
      if (index >= 0) {
        state.current = Object.assign({}, state.list[index])
        return
      }
      return
    }
    // 如果current为空，表示没有播放的歌曲
    if (!state.current && state.list && state.list.length > 0) {
      state.current = Object.assign({}, state.list[0])
      return
    }
    // 如果不是插放，并且current不为空
    if (!song && state.current) {
      // 播放的歌曲是不是在当前的列表
      let index = state.list.findIndex(s => s.songmid === state.current.songmid)
      // 如果在歌曲列表里面，接着播放下首
      if (index >= 0) {
        state.current = (index === state.list.length - 1 ? Object.assign({}, state.list[0]) : Object.assign({}, state.list[index + 1]))
      } else {
        state.current = Object.assign({}, state.list[0])
      }
    }
  },
  /**
   * 前一首
   * @param {Object} state 
   */
  pre(state) {
    if (state.list && state.current) {
      let index = state.list.findIndex(s => s.songmid === state.current.songmid)
      if (index >= 0) {
        state.current = Object.assign({}, index === 0 ? state.list[state.list.length - 1] : state.list[state.list.length === 1 ? 0 : index - 1])
      } else {
        state.current = Object.assign({}, state.list[0])
      }
    }
  }
}

const actions = {
  delSong({ state, commit }, songmid) {
    // 删除的是当前播放歌曲 
    if (songmid !== state.current.songmid) {
      commit('delSong', songmid)
    } else {
      commit('next')
      commit('delSong', songmid)
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}