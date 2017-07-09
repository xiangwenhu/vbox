<template>
  <div class="result box-col">
    <div class="mod_tab">
      <a v-for="(t,index) in tabs" class="mod_tab__item" @click.stop='changeTab(t.value)' :class='tab == index +1?"mod_tab__current":""'>{{t.title}}</a>
    </div>

    <div class="list-wrapper">
      <song-list @addsong='addsong' @playsong='playsong' :songs='songs' :pure='true' class="song-list of-auto" v-if='tab == 1'></song-list>
      <album-list :albums='albums' @addAlbumToPlaying='addAlbumToPlaying' v-if="tab == 2" class="of-auto"></album-list>
      <mv-list :mvs='mvs' v-if="tab == 3" class="of-auto"></mv-list>
      <diss-list :dissList='disss' v-if="tab == 4" class="of-auto"></diss-list>
      <infinite-loading :on-infinite="onInfinite" ref="infiniteLoading" spinner='bubbles' v-if='enableLoading'>
      </infinite-loading>
    </div>

  </div>
</template>

<script>
  import InfiniteLoading from 'vue-infinite-loading'
  import Search from '../api/search'
  import SongList from '../components/public/SongList'
  import AlbumList from '../components/Album/AlbumList'
  import MVListSingle from '../components/MV/MVListSingle'
  import DissList from '../components/Diss/DissList'
  export default {
    components: {
      InfiniteLoading,
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
        disss: [],
        enableLoading: true
      }
    },
    methods: {
      async executeSearch() {
        try {
          let ended = true
          let res
          if (this.tab === 1) {
            res = await Search.searchSongs(this.kw, this.pageIndex, this.pageSie).then(rs => rs.json())
            this.songs.push(...res.data.song.list.map(s => ({
              songname: s.name,
              singer: s.singer.map(sr => ({
                name: sr.name,
                mid: sr.mid
              })),
              songmid: s.mid,
              albummid: s.album.mid
            })))
            //  大于等于total ended
            ended = this.pageIndex * this.pageSie + res.data.song.curnum >= res.data.song.totalnum
            this.pageIndex++
          } else if (this.tab === 2) {
            res = await Search.searchAlbums(this.kw, this.pageIndex, this.pageSie).then(rs => rs.json())
            this.albums.push(...res.data.album.list.map(al => ({
              albumMID: al.albumMID,
              albumName: al.albumName,
              singers: al.singer_list.map(sr => ({
                singer_name: sr.name,
                mid: sr.mid
              }))
            })))
            ended = this.pageIndex * this.pageSie + res.data.album.curnum >= res.data.album.totalnum
            this.pageIndex++
          } else if (this.tab === 3) {
            res = await Search.searchMVs(this.kw, this.pageIndex, this.pageSie).then(rs => rs.json())
            this.mvs.push(...res.data.mv.list.map(it => ({
              vid: it.v_id,
              mvname: it.mv_name,
              singers: it.singer_list.map(sr => ({
                name: sr.name,
                mid: sr.mid
              }))
            })))
            ended = this.pageIndex * this.pageSie + res.data.mv.curnum >= res.data.mv.totalnum
            this.pageIndex++
          } else if (this.tab === 4) {
            // 特殊， pageIndex 0 开始
            res = await Search.searchDiss(this.kw, this.pageIndex - 1, this.pageSie).then(rs => rs.json())
            this.disss.push(...res.data.list.map(it => ({
              dissid: it.dissid,
              dissname: it.dissname,
              imgurl: it.imgurl,
              creator: {
                name: it.creator.name
              }
            })))
            ended = this.pageIndex + 1 >= Math.ceil(res.data.display_num / res.data.num_per_page)
            this.pageIndex++
          } else {
            ended = true
          }
          if (ended) {
            this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete')
          } else {
            this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded')
          }
        } catch (err) {
          console.log(err)
          if (this.$refs.infiniteLoading) {
            this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete')
          }
        }
      },
      changeTab(tab) {
        this.songs.splice(0)
        this.albums.splice(0)
        this.mvs.splice(0)
        this.disss.splice(0)
        this.$refs.infiniteLoading.isLoading = true
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

      },
      onInfinite() {
        this.executeSearch()
      }
    },
    mounted() {
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
    flex-shrink: 0
  }

  .list-wrapper {
    overflow: auto
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