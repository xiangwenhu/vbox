<template>
  <div class="audioContent" id='audioPlayerWraper' style="position:absolute;opacity:0;display:none">
    <video webkit-playsinline="true" playsinline="true" @click='init' data-init='0' preload controls id='audioPlayer' src="static/d.mp3"
      @ended="next" @timeupdate='timeupdate' @play="play" :style='cstyle'></video>
  </div>
</template>



<script>
  import { mapState } from 'vuex'
  import Other from '../../api/other'
  export default {
    name: 'audio-player',
    data() {
      return {
        player: null,
        cstyle: {
          // width: '100%',
          // height: '100%',
          opacity: 0,
          height: '100%'
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
        // this.player.play()
        // this.player.removeAttribute('src')
        // alert('play')
        // this.player.load();       

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
      },
      async updateMedia(to) {
        let res = await Other.vkey(to.songmid).then(res => res.json()),
          vkey = res.data.items[0].vkey,
          fileName = `C400${to.songmid}.m4a`
        this.player.src = `/stream/${fileName}?vkey=${vkey}&guid=488797456&uin=0&fromtag=66`
        this.player.play()
      }
    },
    mounted() {
      // ref
      this.player = document.querySelector('#audioPlayer')
      this.updateMedia(this.current)
      /*
      let player = new Audio()
      player.ontimeupdate = this.timeupdate
      player.onplay = this.play
      player.onended = this.next
      this.player = player */
    },
    watch: {
      current(to) {
        if (!to) {
          this.player.src = ''
          return
        }
        this.updateMedia(to)
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