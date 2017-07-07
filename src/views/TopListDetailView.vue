<template>
  <div class="toplist-detail">
    <song-list :songs='songlist' @addsong='addsong' @playsong='playsong'></song-list>
    <infinite-loading :on-infinite="onInfinite" ref="infiniteLoading" spinner='bubbles'>
      <span slot="no-more" class="no-more" style="">
        没有更多了
     </span>
    </infinite-loading>
  </div>
</template>

<script>
  import Other from '../api/other'
  import SongList from '../components/public/SongList'
  import InfiniteLoading from 'vue-infinite-loading'
  export default {
    name: 'toplist-detail-view',
    components: {
      SongList,
      InfiniteLoading
    },
    data() {
      return {
        topListOpt: [],
        songlist: [],
        song_begin: 0,
        page_size: 30
      }
    },
    async mounted() {
      // 排行榜的分类
      let topListOpt = await Other.topList()
      this.topListOpt = topListOpt
      // 某个排行榜的数据
      // let topListList = await Other.topListList(this.$route.params.topid).then(res => res.json())
      // this.songlist.concat(topListList.songlist)
    },
    methods: {
      addsong(song) {
        this.$store.commit('playing/addSong', song)
      },
      playsong(song) {
        this.$store.commit('playing/addSong', song)
        this.$store.commit('playing/next', song)
      },
      onInfinite() {
        var topId = this.$route.params.topid, begin = this.song_begin
        Other.topListList(topId, begin, this.page_size).then(res => res.json()).then(result => {
          this.songlist = this.songlist.concat(result.songlist)
          if (result.cur_song_num < this.page_size) {
            this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete');
          } else {
            this.song_begin = result.song_begin + result.cur_song_num
            this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded');
          }
        }).catch(err => {
          console.log(err)
          if (this.$refs.infiniteLoading) {
            this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete')
          }
        })
      }
    }
  }

</script>

<style scoped>
  .toplist-detail {
    background-image: linear-gradient(to right, #FFF, #999);
  }
</style>