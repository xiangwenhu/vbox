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
   * @param {*} song 歌曲信息 
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
  removeSong(state, songmid) {
    let index = state.list.findIndex(s => s.songmid === songmid)
    index >= 0 && state.list.splice(index, 1)
  },

  /**
   * 批量删除歌曲
   * @param {*} state 
   * @param {*} songmids 歌曲媒体列表 
   */
  removeSongs(state, songmids = []) {
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
        state.current = state.list[index]
        return
      }
      return
    }
    // 如果current为空，表示没有播放的歌曲
    if (!state.current && state.list && state.list.length > 0) {
      state.current = state.list[0]
      return
    }
    // 如果不是插放，并且current不为空
    if (!song && state.current) {
      // 播放的歌曲是不是在当前的列表
      let index = state.list.findIndex(s => s.songmid === state.current.songmid)
      // 如果在歌曲列表里面，接着播放下首
      if (index >= 0) {
        state.current = (index === state.list.length - 1 ? state.list[0] : state.list[index + 1])
      } else {
        state.current = state.list[0]
      }
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations
}