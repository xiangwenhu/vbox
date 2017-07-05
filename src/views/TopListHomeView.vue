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
  export default {
    name: 'toplist-home-view',
    components: {
      TopListSlide,
      GlobalTopList
    },
    data() {
      return {
        DFTopList: [],
        DFName: 'QQ音乐巅峰榜',
        GlobalTopList: [],
        GlobalName: '全球榜'
      }
    },
    async mounted() {
      // 排行榜的分类
      let topListOpt = await Other.topList()
      this.DFTopList = topListOpt[0].List
      this.DFName = topListOpt[0].GroupName
      this.GlobalTopList = topListOpt[1].List
      this.GlobalName = topListOpt[1].GroupName
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