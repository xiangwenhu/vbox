<template>
  <div class="audioContent">
    <video  webkit-playsinline="true" playsinline="true" @click='init' data-init='0' preload controls id='audioPlayer' src="/stream/C400002THu6m2oNbAy.m4a?vkey=6D1EC2B9D9913D3AE5539D01BB882DB8CD01E2EE793C84D3B3D02BFD57D395CDAEDE0648AF98650CB6C107C21878DB53F38A568B146FA2FA&guid=488797456&uin=0&fromtag=66"
      @ended="next" @timeupdate='timeupdate' @play="play" :style='cstyle'></video>
  </div>
</template>



<script>
  import { mapState } from 'vuex'
  import Other from '../api/other'
  export default {
    name: 'audio-player',
    data() {
      return {
        player: null,
        cstyle: {
          // width: '100%',
          // height: '100%',
          opacity: 0,
          position: 'absolute',
          top: 0,
          display: 'none'
        }
      }
    },
    computed: mapState({
      current: state => state.playing.current,
      pstate: state => state.player.state
    }),
    methods: {
      next: function () {
        this.$store.commit('playing/next')
      },
      timeupdate: function () {
        this.$store.commit('player/timeUpdate', this.player.currentTime)
      },
      // 播放时，更新状态为播放
      play: function () {
        console.log('play')
        // this.player.play()
        // this.player.removeAttribute('src')
        // alert('play')
        // this.player.load();
        this.cstyle = {
          display: 'none'
        }

        // setTimeout(function () { this.player.pause() }, 10)

        // 更新状态为播放
        if (this.$store.state.player.state !== 1) {
          this.$store.commit('player/setState', 1)
        }
      },
      init() {
        if (this.player.getAttribute('data-init') === "0") {
          this.cstyle = {
            display: 'none'
          }
        }
      }
    },
    mounted() {
      this.player = document.querySelector('#audioPlayer')
      /*
      let player = new Audio()
      player.ontimeupdate = this.timeupdate
      player.onplay = this.play
      player.onended = this.next
      this.player = player */
    },
    watch: {
      async current(to) {
        let res = await Other.vkey(to.songmid).then(res => res.json()),
          vkey = res.data.items[0].vkey,
          fileName = `C400${to.songmid}.m4a`
        this.player.src = `/stream/${fileName}?vkey=${vkey}&guid=488797456&uin=0&fromtag=66`
        this.player.play()
      },
      // 监听state，外部出发要暂停的时候，暂停播放
      pstate(to) {
        to === 2 ? this.player.pause() : this.player.play()
      }
    }
  }

</script>

<style scoped>
  .audioContent {
    bottom: 0
  }
</style>