<template>
  <transition name="slide-right">

    <div class="video-player">
      <top-header></top-header>
      <div class="tvp_video">
        <video width="100%" controls ref='videoPlayer' loop webkit-playsinline="true" playsinline="true" />
        <div class="tvp_overlay_play" @click.stop='play' v-if='!started'>
          <play-icon height='3'></play-icon>
        </div>
        <div class="tvp_overlay_poster" v-if='!started'>
          <div class="tvp_poster_img" :style="{'background-image':bgSrc}">
          </div>
        </div>
      </div>

      <div class="video_more">

        <div>
          <div class="mv_info">
            <p class="qui_tit_text tit_h4">{{mvinfo.mvname}}</p>
            <p class="desc" data-id="5062">{{mvinfo.singers |mp('name') | jn}}</p>
            <p>
              <span v-if='toplistinfo.topnum > 0' class="desc mv_top">MV排行榜第{{toplistinfo.topnum}}名(第{{toplistinfo.weekno}})期</span>
              <span class="desc mv_top">{{mvinfo.listennum |tt}}万次播放</span>
              <span class="desc mv_top">{{mvinfo.pubdate}}</span>
            </p>
          </div>
          <hr/>
        </div>

        <mv-list :mvs='singermvlist'>
          <div class="qui_tit">
            <h3 class="qui_tit_text">同艺人的其他MV</h3>
          </div>
        </mv-list>

        <mv-list :mvs='fanmvlist' v-if='fanmvlist && fanmvlist.length > 0'>
          <div class="qui_tit">
            <h3 class="qui_tit_text">粉丝们也喜欢看</h3>
          </div>
        </mv-list>

        <mv-list :mvs='uploadermvlist' v-if='uploadermvlist && uploadermvlist.length > 0'>
          <div class="qui_tit">
            <h3 class="qui_tit_text">该上传者的其他作品
            </h3>
          </div>
        </mv-list>
      </div>

    </div>


    </div>
  </transition>
</template>

<script>
  import TopHeader from '../components/TopHeader'
  import Search from '../api/search'
  import PlayIcon from '../components/PlayIcon'
  import MVListSingle from '../components/MV/MVListSingle'
  export default {
    name: 'mv-player-view',
    components: {
      PlayIcon,
      TopHeader,
      'mv-list': MVListSingle
    },
    data() {
      return {
        mvkeyinfo: null,
        mvinfo: {},
        othermvs: [],
        similarmvs: [],
        src: '',
        vsrc: '',
        vplayer: null,
        started: false
      }
    },
    beforeRouteLeave(to, from, next) {
      this.$store.commit('player/setState', 1)
      next();
    },
    computed: {
      vid() {
        return this.$route.params.vid
      },
      bgSrc() {
        return `url("https://shp.qpic.cn/qqvideo/0/${this.vid}/0")`
      },
      singermvlist() {
        return this.mvinfo && this.mvinfo.singermvlist ? this.mvinfo.singermvlist.list : []
      },
      fanmvlist() {
        return this.mvinfo && this.mvinfo.fanmvlist ? this.mvinfo.fanmvlist.list.slice(0, 3) : []
      },
      uploadermvlist() {
        return this.mvinfo && this.mvinfo.uploadermvlist ? this.mvinfo.uploadermvlist.list.slice(0, 3) : []
      },
      toplistinfo() {
        return this.mvinfo.toplist || {}
      }
    },
    created() {
      this.load();
    },
    methods: {
      // http://103.18.209.159/music.qqvideo.tc.qq.com/m00240pahpk.mp4?
      // vkey=2FD83FF4885B7F4DE767CE2D7FCCE1E5A35013DAE64D4231ECD34A72CC1898F8523E15756537B2BA2B7CEAACE8C9938C7201EB8327FD20EDA35066E53832F4FA23DF680052E45395306A5E30BB14CD3C3569EC7B05AACB0D
      // &br=121&platform=2&fmt=auto&level=0&sdtfrom=v3010&guid=d756e889e0148f3c2eea4f6724d7da9b
      updateMVUrl() {
        // 可用解构     
        /* 
        if (this.mvkeyinfo && this.mvkeyinfo.vl && this.mvkeyinfo.vl.vi && this.mvkeyinfo.vl.vi.length > 0) {
          var vi = this.mvkeyinfo.vl.vi[0]
          if (vi.fvkey && vi.fvkey && vi.ul.ui && vi.ul.ui.length > 0) {
            let fvkey = vi.fvkey
            let fn = vi.fn
            let bUrl = vi.ul.ui[0].url
            // this.src = `${bUrl}${fn}?vkey=${fvkey}&br=121&platform=2&fmt=auto&level=0&sdtfrom=v3010&guid=d756e889e0148f3c2eea4f6724d7da9b`
          }
        } */
        try {
          let { vl: { vi: [{ fvkey, fn, ul: { ui: [{ url: bUrl }] } }] } } = this.mvkeyinfo || {}
          if (fvkey && fn && bUrl) {
            this.src = `${bUrl}${fn}?vkey=${fvkey}&br=121&platform=2&fmt=auto&level=0&sdtfrom=v3010&guid=d756e889e0148f3c2eea4f6724d7da9b`
          }
        } catch (err) {
          alert(err)
        }
      },
      play() {
        if (this.src) {
          this.$store.commit('player/setState', 2)
          this.started = true
          this.$refs.videoPlayer.src = this.src;
          this.$refs.videoPlayer.play()
        }
      },
      async load() {
        // mv vkey 信息
        let res = await Search.mvVkey(this.vid)
        this.mvkeyinfo = res
        this.updateMVUrl()

        // mv 信息
        res = await Search.mmvInfo(this.vid).then(res => res.json())
        this.mvinfo = res.data    

        // 设置了 access-control-allow-origin:https://y.qq.com
        // res = await Search.comments(this.vid).then(res => res.text())      
      }
    },
    watch: {
      async vid(to) {
        this.mvkeyinfo = this.mvinfo = {}
        this.started = false
        this.$refs.videoPlayer.pause()
        this.load()
      }
    }
  }

</script>

<style scoped>
  .video-player {
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100%
  }

  .tvp_video {
    position: relative;
    width: 100%;  
    flex-shrink: 0;  
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

  .qui_tit {
    position: relative;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-box-pack: center;
    -webkit-box-align: center;
    height: 2.75rem;
    padding: 0 2rem;
    overflow: hidden;
    text-align: center;
  }

  .qui_tit_text {
    letter-spacing: 1px;
  }

  .mv_info {
    text-align: left;
    padding: 0 1rem;
  }

  .mv_name {
    width: 100%;
    line-height: 1.4rem;
    font-size: 0.9rem
  }

  .mv_top {
    color: #31c27c;
  }
  .video_more{
    overflow: auto;
  }
</style>