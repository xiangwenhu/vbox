<template>
  <div>
    <div class="top_title_zone">
      <h3 class="align-center top_title">{{DFName}}</h3>
    </div>
    <top-list-slide :toplist="DFTopList" @addToPlaying='addTLToPlaying'></top-list-slide>
    <div class="top_title_zone">
      <h3 class="align-center top_title">{{GlobalName}}</h3>
    </div>
    <!--可以设计使用slot自定义title -->
    <global-top-list :toplist='GlobalTopList' @addToPlaying='addTLToPlaying'></global-top-list>
  </div>
</template>

<script>
  import Other from '../api/other'
  import TopListSlide from '../components/Home/TopListSlide'
  import GlobalTopList from '../components/TopList/GlobalTopList'
  import { mapState } from 'vuex'
  export default {
    name: 'toplist-home-view',
    components: {
      TopListSlide,
      GlobalTopList
    },
    data() {
      return {       
        DFName: 'QQ音乐巅峰榜',       
        GlobalName: '全球榜'
      }
    },
    async mounted() {
      this.$store.dispatch('toplist/gettoplist')
    },
    methods: {
      // 添加排行榜到播放列表
      addTLToPlaying: async function (topId) {
        let topListList = await Other.topListList(topId).then(res => res.json())
        this.$store.commit('playing/addSongs', topListList.songlist.map(s => s.data))
        // 空闲状态，才自动播放
        // if (this.$store.state.player.state === 0) {
        this.$store.commit('playing/next', topListList.songlist[0].data)
        // }
      }
    },
    computed: {
      ...mapState('toplist', {
        DFTopList: state => state.DFTopList,
        GlobalTopList: state => state.GlobalTopList
      })
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