<template>
  <transition name="slide-right">

    <div class="video-player">
      <top-header></top-header>
      <div class="tvp_video">
        <video width="100%" controls :src="src" ref='videoPlayer' loop />
      </div>
      <div>
        <div class="tvp_overlay_play" @click.stop='play' v-if='!started'>
          <play-icon height='3'></play-icon>
        </div>
        <div class="tvp_overlay_poster" v-if='!started'>
          <div class="tvp_poster_img" :style="{'background-image':bgSrc}">
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import TopHeader from '../components/TopHeader'
  import Search from '../api/search'
  import PlayIcon from '../components/PlayIcon'
  export default {
    name: 'mv-player-view',
    components: {
      PlayIcon,
      TopHeader
    },
    data() {
      return {
        mvinfo: null,
        src: '',
        vplayer: null,
        started: false
      }
    },
    async created() {
      let res = await Search.mvVkey(this.vid)
      this.mvinfo = res
      this.updateMVUrl()
    },
    computed: {
      vid() {
        return this.$route.params.vid
      },
      bgSrc() {
        return 'url("https://shp.qpic.cn/qqvideo/0/m00240pahpk/0")'
      }
    },
    methods: {
      // http://103.18.209.159/music.qqvideo.tc.qq.com/m00240pahpk.mp4?
      // vkey=2FD83FF4885B7F4DE767CE2D7FCCE1E5A35013DAE64D4231ECD34A72CC1898F8523E15756537B2BA2B7CEAACE8C9938C7201EB8327FD20EDA35066E53832F4FA23DF680052E45395306A5E30BB14CD3C3569EC7B05AACB0D
      // &br=121&platform=2&fmt=auto&level=0&sdtfrom=v3010&guid=d756e889e0148f3c2eea4f6724d7da9b
      updateMVUrl() {
        // 可用解构
        if (this.mvinfo && this.mvinfo.vl && this.mvinfo.vl.vi && this.mvinfo.vl.vi.length > 0) {
          var vi = this.mvinfo.vl.vi[0]
          if (vi.fvkey && vi.fvkey && vi.ul.ui && vi.ul.ui.length > 0) {
            let fvkey = vi.fvkey
            let fn = vi.fn
            let bUrl = vi.ul.ui[0].url
            this.src = `${bUrl}${fn}?vkey=${fvkey}&br=121&platform=2&fmt=auto&level=0&sdtfrom=v3010&guid=d756e889e0148f3c2eea4f6724d7da9b`
          }
        }
      },
      play() {
        this.started = true
        this.$refs.videoPlayer.play()
      }
    }
  }

</script>

<style scoped>
  .video-player {
    position: relative
  }

  .tvp_video {
    position: relative;
    width: 100%;
    height: 100%;
    margin-top: 2.5rem
  }

  .tvp_overlay_poster {
    position: absolute;
    z-index: 2;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    text-align: center;
    display: -webkit-box;
    -webkit-box-pack: center;
    -webkit-box-align: center;
    display: box;
    box-pack: center;
    box-align: center;
    display: -webkit-flex;
    display: flex;
    -webkit-align-items: center;
    align-items: center;
    -webkit-justify-content: center;
    justify-content: center;
  }

  .tvp_poster_img {
    display: block;
    width: 100%;
    height: 100%;
    max-width: 100%;
    max-height: 100%;
    background: #000 center no-repeat;
    background-size: contain;
  }

  .tvp_overlay_play,
  .tvp_overlay_play_try,
  .tvp_overlay_replay {
    position: absolute;
    z-index: 5;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 3.3rem;
    height: 3.3rem;
    line-height: 3.3rem;
    margin: auto!important;
    overflow: hidden;
    font-size: 0;
    text-align: center;
    background: rgba(23, 23, 23, .9);
    border-radius: 3px;
    cursor: pointer;
  }
</style>