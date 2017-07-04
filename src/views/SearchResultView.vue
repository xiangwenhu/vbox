<template>
  <div class="result">
    <div class="mod_tab">
      <a v-for="(t,index) in tabs" class="mod_tab__item" @click.stop='changeTab(t.value)' :class='tab == index +1?"mod_tab__current":""'>{{t.title}}</a>
    </div>
    <song-list @addsong='addsong' @playsong='playsong' :songs='songs' :pure='true' class="song-list"></song-list>
  </div>
</template>

<script>
  import Search from '../api/search'
  import SongList from '../components/SongList'
  export default {
    components: {
      SongList
    },
    data() {
      return {
        // 搜索的数据类型 1 歌曲 2 专辑 3 MV 4歌单,
        tabs: [{
          title: '单曲',
          value: 1
        }, {
          title: '专辑',
          value: 2
        }, {
          title: 'MV',
          value: 3
        }, {
          title: '歌单',
          value: 4
        }],
        tab: 1,
        pageIndex: 1,
        pageSie: 30,
        songs: []
      }
    },
    methods: {
      async executeSearch() {
        let res = await Search.searchSongs(this.kw, this.pageIndex, this.pageSie).then(res => res.json())
        this.songs = res.data.song.list.map(s => {
          s.songname = s.name
          s.songmid = s.mid
          return s
        })
      },
      changeTab(tab) {
        this.tab = tab
      },
      addsong(song) {
        this.$store.commit('playing/addSong', song)
      },
      playsong(song) {
        this.$store.commit('playing/addSong', song)
        this.$store.commit('playing/next', song)
      }
    },
    created() {
      this.executeSearch()
    },
    computed: {
      kw() {
        return this.$route.params.keyWords
      }
    },
    watch: {
      '$route'(to, from) {
        this.executeSearch()
      }
    }
  }

</script>

<style scoped>
  .s-result {
    display: flex;
    flex-direction: column;
  }

  .mod_tab {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }



  .mod_tab__item {
    position: relative;
    float: left;
    font-size: 0.9rem;
    overflow: hidden;
    color: #666;
    flex: 1;
    text-align: center;
  }

  .mod_tab__current {
    color: #31c27c;
  }

  .mod_tab,
  .mod_tab__item {
    line-height: 3rem;
  }

  .song-list {
    background-color: mediumaquamarine
  }
</style>