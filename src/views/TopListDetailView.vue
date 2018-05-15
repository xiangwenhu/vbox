<template>
  <div class="toplist-detail">
    <cover :color='bgColor' :bgImage='bgImage'>
      <div class="focus__text">
        <h1 class="tit_h2_w">
          {{name}}
        </h1>
        <p class="tit_h4_w">{{update_time}} 更新</p>
      </div>
    </cover>
    <div class="list-wraper" :style='{"background-color":bgColor}'>
      <song-list :songs='songlist' @addsong='addsong' @playsong='playsong'></song-list>
      <infinite-loading :on-infinite="onInfinite" ref="infiniteLoading" spinner='bubbles'>
        <span slot="no-more" class="no-more">
          没有更多了
        </span>
      </infinite-loading>
    </div>
  </div>
</template>

<script>
  import Other from '../api/other'
  import SongList from '../components/public/SongList'
  import Cover from '../components/public/Cover'
  import InfiniteLoading from 'vue-infinite-loading'
  export default {
    name: 'toplist-detail-view',
    components: {
      SongList,
      InfiniteLoading,
      Cover
    },
    data() {
      return {
        topListOpt: [],
        songlist: [],
        song_begin: 0,
        page_size: 30,
        update_time: '',
        color: null,
        bgImage: null,
        name: ''
      }
    },
    async mounted() {
      // 排行榜的分类
      let topListOpt = await Other.topList()
      this.topListOpt = topListOpt
      // 某个排行榜的数据
      // let topListList = await Other.topListList(this.$route.params.topid).then(res => res.json())
      // this.songlist.concat(topListList.songlist)
      this.$nextTick(() => {
        this.$refs.infiniteLoading.isLoading = true
        this.onInfinite();
      });
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
          if (!this.color) {
            this.color = result.color
            this.update_time = result.update_time
            this.bgImage = result.topinfo.pic_album
            this.name = result.topinfo.ListName
          }

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
    },
    computed: {
      bgColor() {
        return '#' + (this.color || '000').toString(16)
      }
    }

  }

</script>

<style scoped>
  .list-wraper {
    background-image: linear-gradient(to right, transparent, currentColor 1000%);
    background-image: -webkit-linear-gradient(to right, transparent, currentColor 1000%);
  }
</style>