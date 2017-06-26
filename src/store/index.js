import Vue from 'vue'
import Vuex from 'vuex'
import playing from './playing'
import player from './player'

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    playing,
    player
  }
})

export default store