<template>
  <div class="home">
    <div class="top_title_zone">
      <router-link to="/pages/toplist">
        <h3 class="align-center top_title">排行榜</h3>
      </router-link>
    </div>
    <top-list-slide :toplist="toplist" @addToPlaying='addTLToPlaying'></top-list-slide>
    <hot-diss :hotdiss="hotdiss" @addDissToPlaying='addDissToPlaying'></hot-diss>
  </div>
</template>

<script>
  import Other from '../api/other'
  import TopListSlide from '../components/Home/TopListSlide'
  import HotDiss from '../components/Home/HotDiss'
  export default {
    name: 'home-view',
    components: {
      TopListSlide,
      HotDiss
    },
    data() {
      return {
        toplist: [],
        hotdiss: []
      }
    },
    async created() {
      let recom = await Other.recomList().then(res => res.json())
      if (recom.code === 0) {
        this.toplist = recom.data.toplist
        this.hotdiss = recom.data.hotdiss.list.slice(0, 6)
      }
    },
    mounted() {
      if (this.$store.state.player.state === 0) {
        this.$store.commit('playing/next')
      }
    },
    methods: {
      // 添加排行榜到播放列表
      addTLToPlaying: async function (topId) {
        let topListList = await Other.topListList(topId).then(res => res.json())
        console.log(topListList)
        this.$store.commit('playing/addSongs', topListList.songlist.map(s => s.data))
        // 空闲状态，才自动播放
        // if (this.$store.state.player.state === 0) {
        this.$store.commit('playing/next', topListList.songlist[0].data)
        // }
      },
      addDissToPlaying: async function (dissid) {
        let dissRes = await Other.dissInfo(dissid).then(res => res.json())
        let songlist = dissRes.cdlist.map(d => d.songlist).reduce((a, b) => a.concat(b))
        this.$store.commit('playing/addSongs', songlist)
        this.$store.commit('playing/next', songlist[0])
      }
    }
  }

</script>


<style scoped>
  .top_title_zone {
    background-color: #345
  }

  .top_title {
    color: #FFF;
    margin: 0.2rem 0;
    padding: 0.2rem 0;
  }
</style>