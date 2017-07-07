<template>
  <div class="singer-detail" :style="{'background-color': cBgColor}">
    <singer-info @playhot='playhot' :singermid='singermid' :singername='singername' :fansnum='fansnum' :songcount='songcount'
      :albumcount='albumcount' :mvcount='mvcount' :bgColor='cBgColor'></singer-info>
    <div>
      <div class="part__hd">
        <h2 class="part__tit">热门歌曲</h2>
        <router-link class="part__more" :to='{path:"/pages/singer/songs",params:{singermid:singermid}}'> 全部 > </router-link>
      </div>
      <song-list :songs='songs' @addsong='addsong' @playsong='playsong' :pure='true'></song-list>
      <div class="part__hd">
        <h2 class="part__tit">专辑</h2>
        <router-link class="part__more" :to='{path:"/pages/singer/albums",params:{singermid:singermid}}'> 全部 > </router-link>
      </div>
      <album-list :albums='albums' @addAlbumToPlaying='addAlbumToPlaying'></album-list>
      <div class="part__hd">
        <h2 class="part__tit">MV</h2>
        <router-link class="part__more" :to='{path:"/pages/singer/mvs",params:{singermid:singermid}}'> 全部 > </router-link>
      </div>
      <mv-list :mvs='mvs'></mv-list>
    </div>
  </div>
</template>

<script>
  import SingerInfo from '../components/Singer/SingerInfo'
  import SongList from '../components/public/SongList'
  import AlbumList from '../components/Album/AlbumList'
  import MVList from '../components/MV/MVList'
  import Singer from '../api/singer'
  import Search from '../api/search'
  export default {
    name: 'singer-detail-view',
    components: {
      SingerInfo,
      SongList,
      AlbumList,
      'mv-list': MVList
    },
    data() {
      return {
        singername: null,
        fansnum: null,
        songs: [],
        songcount: 0,
        albums: [],
        albumcount: 0,
        mvs: [],
        mvcount: 0,
        singer: null,
        bgColor: null
      }
    },
    async mounted() {
      this.singer = new Singer(this.singermid)
      /*  获取歌曲
      let res = await this.singer.songs(0, 5).then(r => r.json())
      this.songs = res.data.list.map(s => {
        s.data = s.musicData;
        delete s.musicData;
        return s
      })
      this.songcount = res.data.total
      this.singername = res.data.singer_name  */

      let res = await this.singer.track(0, 5).then(r => r.json())
      this.songs = res.data.list.map(s => {
        let so = s.musicData
        return {
          songname: so.songname,
          albummid: so.albummid,
          albumname: so.albumname,
          singer: so.singer,
          songmid: so.songmid
        }
      })
      this.songcount = res.data.total
      this.singername = res.data.singer_name
      this.albums = res.data.albumlist.map(a => ({
        albumMID: a.albummid,
        albumName: a.name,
        pubTime: a.publish_date
      }))

      // 粉丝数
      // res = await this.singer.fans().then(res => res.json())
      this.fansnum = res.data.fans
      this.bgColor = res.data.color

      // 获取专辑数目
      res = await this.singer.albums(0, 1).then(r => r.json())
      this.albumcount = res.data.total

      // 获取MV
      res = await this.singer.mvs(0, 4).then(r => r.json())
      this.mvs = res.data.list
      this.mvcount = res.data.total
    },
    computed: {
      singermid: function () {
        return this.$route.params.singermid
      },
      cBgColor() {
        return '#' + (this.bgColor || '000').toString(16)
      }
    },
    methods: {
      async playhot() {
        // 获取热门歌曲30条，添加到当前播放列表，并开始播放
        let res = await this.singer.songs(0, 30).then(r => r.json())
        let songs = res.data.list
        this.$store.commit('playing/addSongs', songs.map(s => s.musicData))
        this.$store.commit('playing/next', songs[0].musicData)
        // 不建议如此
        this.$store.commit('player/setState', 1)
      },
      addsong(song) {
        this.$store.commit('playing/addSong', song)
      },
      playsong(song) {
        this.$store.commit('playing/addSong', song)
        this.$store.commit('playing/next', song)
      },
      async addAlbumToPlaying(albumMID) {
        let res = await Search.albumInfo(albumMID).then(res => res.json())
        this.$store.commit('playing/addSongs', res.data.list)
        this.$store.commit('playing/next', res.data.list[0])
      }
    }
  }

</script>

<style>
  a {
    text-decoration: none
  }

  ul {
    -webkit-padding-start: 0;
  }

  li {
    list-style: none;
    display: list-item;
    text-align: -webkit-match-parent;
  }

  .singer-detail {
    background-color: rgb(170, 194, 218)
  }

  .part__tit {
    font-size: 1.2rem;
    font-weight: 400;
    line-height: 3rem;
    padding-left: 0.2rem
  }

  .part__hd {
    position: relative;
  }

  .part__more {
    position: absolute;
    font-size: 0.8rem;
    color: #FFF;
    right: 5%;
    top: 30%;
  }
</style>