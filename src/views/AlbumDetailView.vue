<template>
  <div :style="{'background-color': album.color}" class="album-detail">
    <album-info :album='album' @addToPlaying='addToPlaying'></album-info>
    <div>
      <song-list :songs='albumSongs' :pure='true' @addsong='addsong' @playsong='playsong'></song-list>
    </div>
    <div class="desc">
      <h2 class="mod_tit" id="brief_block_title"><span class="mod_tit__text c_txt1">简 介</span></h2>
      <div class="mod_summary">
        <p class="summary__para c_txt1" id="album_desc" v-html="descHTML"></p>
      </div>
    </div>
  </div>
</template>

<script>
  import AlbumInfo from '../components/Album/AlbumInfo'
  import SongList from '../components/public/SongList'
  import Search from '../api/search'
  import { mapMutations } from 'vuex'
  export default {
    name: 'album-detail-view',
    components: {
      AlbumInfo,
      SongList
    },
    data() {
      return {
        album: {
          name: '',
          singername: '',
          aDate: '',
          genre: '',
          color: '#000',
          mid: ''
        },
        albumSongs: [],
        desc: ''
      }
    },
    computed: {
      albumid() {
        return this.$router.params.albummid
      },
      descHTML() {
        return this.desc.replace(/\n/g, '<br>')
      }
    },
    async mounted() {
      let res = await Search.albumInfo(this.$route.params.albummid).then(res => res.json())
      this.album = {
        aDate: res.data.aDate,
        color: this.getBgColor(res.data.color),
        name: res.data.name,
        genre: res.data.genre,
        mid: res.data.mid,
        singername: res.data.singername
      }
      this.albumSongs = (res.data.list || []).map(s => ({
        songname: s.songname,
        albummid: s.albummid,
        albumname: s.albumname,
        singer: s.singer,
        songmid: s.songmid,
        interval: s.interval,
        strMediaMid : s.strMediaMid
      }))
      this.desc = res.data.desc
    },
    methods: {
      ...mapMutations({ addSongs: 'playing/addSongs' }),
      ...mapMutations({ addSong: 'playing/addSong' }),
      ...mapMutations({ next: 'playing/next' }),
      addToPlaying() {
        this.addSongs(this.albumSongs)
        if (this.albumSongs && this.albumSongs.length > 0) {
          this.next(this.albumSongs[0])
        }
      },
      addsong(song) {
        this.addSong(song)
      },
      playsong(song) {
        this.addSong(song)
        this.next(song)
      },
      getBgColor(color) {
        return '#' + (color || '000').toString(16)
      }
    }
  }

</script>

<style scoped>
  .desc {
    color: #FFF
  }

  .mod_tit {
    position: relative;
    display: -webkit-box;
    -webkit-box-pack: center;
    -webkit-box-align: center;
    margin: 1.25rem 0;
    font-size: 1rem;
    font-weight: 400;
  }

  .summary__para {
    margin: 0 0.75rem;
    text-align: justify;
    font-size: 0.75rem;
  }
</style>