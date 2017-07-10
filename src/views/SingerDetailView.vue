<template>
  <div class="singer-detail" :style="{'background-color': cBgColor}">
    <singer-info @playhot='playhot' :singermid='singermid' :singername='singername' :fansnum='fansnum' :bgColor='cBgColor'></singer-info>
    <div>
      <ul class="tag">
        <li @click.stop='changeTag(1)' class="tag-item" :class='tag == 1 ? "tag-item-selected" : ""'>歌曲<span class="focus__number" id="singer_fans"> {{songcount}}</span></li>
        <li @click.stop='changeTag(2)' class="tag-item" :class='tag == 2 ? "tag-item-selected" : ""'>专辑<span class="focus__number" id="singer_fans"> {{albumcount}}</span></li>
        <li @click.stop='changeTag(3)' class="tag-item" :class='tag == 3 ? "tag-item-selected" : ""'>MV<span class="focus__number" id="singer_fans"> {{mvcount}}</span></li>
        <li @click.stop='changeTag(4)' class="tag-item" :class='tag == 4 ? "tag-item-selected" : ""'>详情</li>
      </ul>

      <div class="list">
        <song-list :songs='songs' @addsong='addsong' @playsong='playsong' :pure='true' v-if='tag==1'></song-list>

        <album-list :albums='albums' @addAlbumToPlaying='addAlbumToPlaying' v-if='tag==2'></album-list>

        <mv-list :mvs='mvs' v-if='tag==3'></mv-list>

        <div v-if='tag==4'>
          <p class="s-desc">{{singerDesc}}</p>
        </div>
        <infinite-loading :on-infinite="onInfinite" ref="infiniteLoading" spinner='bubbles' v-if='[1,2,3].indexOf(tag)>=0'>
        </infinite-loading>
      </div>
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
  import InfiniteLoading from 'vue-infinite-loading'

  export default {
    name: 'singer-detail-view',
    components: {
      SingerInfo,
      SongList,
      AlbumList,
      'mv-list': MVList,
      InfiniteLoading
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
        bgColor: null,
        // 1 歌曲 2专辑 3 MV 4 详情
        tag: 1,
        singerDesc: '',
        pageIndex: 0,
        pageSie: 20
      }
    },
    async mounted() {
      /*  获取歌曲
      let res = await this.singer.songs(0, 5).then(r => r.json())
      this.songs = res.data.list.map(s => {
        s.data = s.musicData;
        delete s.musicData;
        return s
      })
      this.songcount = res.data.total
      this.singername = res.data.singer_name  

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
      this.mvcount = res.data.total */

      let res = await this.singer.track(0, 1).then(r => r.json())
      this.fansnum = res.data.fans
      this.bgColor = res.data.color
      this.songcount = res.data.total
      this.singerDesc = res.data.SingerDesc

      // 获取专辑数目
      res = await this.singer.albums(0, 1).then(r => r.json())
      this.albumcount = res.data.total

      // 获取MV
      res = await this.singer.mvs(0, 1).then(r => r.json())

      this.mvcount = res.data.total
    },
    computed: {
      singermid: function () {
        return this.$route.params.singermid
      },
      cBgColor() {
        return '#' + (this.bgColor || '000').toString(16)
      },
      singer() {
        return new Singer(this.$route.params.singermid)
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
      },
      changeTag(tag) {
        this.pageIndex = 0
        this.tag = tag
        if (this.$refs.infiniteLoading) {
          this.$refs.infiniteLoading.isLoading = true
        }
        this.songs.splice(0)
        this.mvs.splice(0)
        this.albums.splice(0)
        this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset');
        // this.executeSearch()
      },
      onInfinite() {
        this.executeSearch()
      },
      async executeSearch() {
        try {
          let ended = true
          let res, pageIndex = this.pageIndex
          if (this.tag === 1) {
            res = await this.singer.songs(pageIndex * this.pageSie, this.pageSie).then(rs => rs.json())
            this.songs.push(...res.data.list.map(s => ({
              songname: s.musicData.songname,
              albummid: s.musicData.albummid,
              albumname: s.musicData.albumname,
              singer: s.musicData.singer,
              songmid: s.musicData.songmid,
              interval: s.musicData.interval
            })))
            //  大于等于total ended
            ended = !res.data.list || res.data.list.length === 0 || pageIndex * this.pageSie + res.data.list.length >= res.data.total
            this.pageIndex++
          } else if (this.tag === 2) {
            res = await this.singer.albums(pageIndex * this.pageSie, this.pageSie).then(rs => rs.json())
            this.albums.push(...res.data.list.map(al => ({
              albumMID: al.albumMID,
              albumName: al.albumName,
              singers: al.singer
            })))
            ended = !res.data.list || res.data.list.length === 0 || pageIndex * this.pageSie + res.data.list.length >= res.data.total
            this.pageIndex++
          } else if (this.tag === 3) {
            res = await this.singer.mvs(pageIndex * this.pageSie, this.pageSie).then(rs => rs.json())
            this.mvs.push(...res.data.list.map(it => ({
              vid: it.vid,
              title: it.title,
              pic: it.pic,
              listenCount: it.listenCount,
              date: it.date
            })))
            ended = !res.data.list || res.data.list.length === 0 || pageIndex * this.pageSie + res.data.list.length >= res.data.total
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
      }
    }
  }

</script>

<style>
  .singer-detail {
    background-color: rgb(170, 194, 218)
  }

  .part__tit {
    font-size: 1.2rem;
    font-weight: 400;
    line-height: 3rem;
    padding-left: 0.2rem
  }

  .tag {
    display: flex;
    text-align: center;
    color: white
  }

  .tag-item {
    flex: 1;
    line-height: 1.6rem
  }

  .tag-item-selected {
    color: #31c27c;
    border-bottom: #31c27c solid 0.2rem
  }

  .list {
    margin-top: 0.2rem
  }

  .s-desc {
    margin: 0 3%;
    text-align: justify;
    font-size: 0.8rem;
    line-height: 1.4rem;
    color: #FFF
  }
</style>