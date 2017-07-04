<template>
  <div class="result">
    <div class="mod_tab">
      <a v-for="(t,index) in tabs" class="mod_tab__item" @click.stop='changeTab(t.value)' :class='tab == index +1?"mod_tab__current":""'>{{t.title}}</a>
    </div>
    <song-list @addsong='addsong' @playsong='playsong' :songs='songs' :pure='true' class="song-list" v-if='tab == 1'></song-list>
    <album-list :albums='albums' @addAlbumToPlaying='addAlbumToPlaying' v-if="tab == 2"></album-list>
    <mv-list :mvs='mvs' v-if="tab == 3"></mv-list>
    <diss-list :songsList='disss' v-if="tab == 4"></diss-list>
  </div>
</template>

<script>
  import Search from '../api/search'
  import SongList from '../components/SongList'
  import AlbumList from '../components/Album/AlbumList'
  import MVListSingle from '../components/MV/MVListSingle'
  import DissList from '../components/Diss/SongsList'
  export default {
    components: {
      SongList,
      AlbumList,
      'mv-list': MVListSingle,
      'diss-list': DissList
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
        songs: [],
        albums: [],
        mvs: [],
        disss: []
      }
    },
    methods: {
      async executeSearch() {
        let res = null
        switch (this.tab) {
          case 1:
            res = await Search.searchSongs(this.kw, this.pageIndex, this.pageSie).then(res => res.json())
            this.songs = res.data.song.list.map(s => ({
              songname: s.name,
              singer: s.singer.map(sr => ({
                name: sr.name,
                mid: sr.mid
              })),
              songmid: s.mid,
              albummid: s.album.mid
            }))
            break
          case 2:
            res = await Search.searchAlbums(this.kw, this.pageIndex, this.pageSie).then(res => res.json())
            this.albums = res.data.album.list.map(al => ({
              albumMID: al.albumMID,
              albumName: al.albumName,
              singers: al.singer_list.map(sr => ({
                name: sr.name,
                mid: sr.mid
              }))
            }))
            break
          case 3:
            res = await Search.searchMVs(this.kw, this.pageIndex, this.pageSie).then(res => res.json())
            this.mvs = res.data.mv.list.map(it => ({
              vid: it.v_id,
              mvname: it.mv_name,
              singers: it.singer_list.map(sr => ({
                name: sr.name,
                mid: sr.mid
              }))
            }))
            break
          case 4:
            // 特殊， pageIndex 0 开始
            res = await Search.searchDiss(this.kw, this.pageIndex - 1, this.pageSie).then(res => res.json())
            this.disss = res.data.list.map(it => ({
              dissid: it.dissid,
              dissname: it.dissname,
              imgurl: it.imgurl,
              creator: {
                name: it.creator.name
              }
            }))
            break
          default:
            break
        }
      },
      changeTab(tab) {
        this.pageIndex = 1
        this.tab = tab
      },
      addsong(song) {
        this.$store.commit('playing/addSong', song)
      },
      playsong(song) {
        this.$store.commit('playing/addSong', song)
        this.$store.commit('playing/next', song)
      },
      addAlbumToPlaying() {

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
      },
      tab(to) {
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