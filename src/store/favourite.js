const state = {
  // 歌曲
  songs: [],
  // 歌单
  diss: [],
  // 专辑 
  album: []
}

const mutations = {

  reset(state) {
    state.songs.splice(0)
    state.diss.splice(0)
    state.album.splice(0)
  },
  // 添加歌曲
  addSong({ state }, song) {
    state.songs.push(song)
  },
  // 删除歌曲
  removeSong({ state }, mid) {
    let index = state.songs.findIndex(s => s.mid === mid)
    index >= 0 && state.songs.splice(index, 1)
  },
  // 添加歌单
  addDiss(diss) {
    state.diss.push(diss)
  },
  // 删除歌单
  removeDiss({ state }, dissid) {
    let index = state.diss.findIndex(s => s.mid === dissid)
    index >= 0 && state.diss.splice(index, 1)
  },
  // 添加专辑
  addAlbum({ state }, song) {
    state.songs.push(song)
  },
  // 删除专辑
  removeAlbum({ state }, album_id) {
    let index = state.songs.findIndex(s => s.mid === album_id)
    index >= 0 && state.songs.splice(index, 1)
  }
}

export default {
  state,
  mutations
}