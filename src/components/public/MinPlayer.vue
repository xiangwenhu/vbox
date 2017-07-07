<template>
  <div class="miniplayer footer" @touchstart.stop='touchstart' @touchend.stop='touchend'>
    <progress-bar :progress='progress'></progress-bar>
    <div class="play-info">
      <div class="inlineblock albuminfo">
        <img class='albumimg' :src="song?`https://y.gtimg.cn/music/photo_new/T002R150x150M000${song.albummid}.jpg?max_age=2592000`:''"
          onerror='this.src = "https://y.gtimg.cn/mediastyle/yqq/extra/player_cover.png?max_age=31536000"' />
      </div>

      <div class="inlineblock ellipsis songinfo">
        <span class="song_name">{{song.songname || song.name }}</span>
        <div class="song_singer"> {{ song.singer instanceof Array ? song.singer.map(s=>s.name).join('/') : song.singer }}</div>
      </div>
      <div class="inlineblock operation">
        <a @click.stop='pause' href="javascript:;" :class='["focus__play", "c_ico1 js_playallsong",playerState == 1 ? "focus__play__pause":""  ]'><span class="focus__play_text"></span></a>
        <!-- <a @click.stop='next' href="javascript:;" class="focus__play__next focus__play c_ico1 js_playallsong"><span class="focus__play_text"></span></a> -->
        <span class="player-detail" @click.stop='togglePlayingList'>
          <setting-icon :height='1.2' :width='1.2'></setting-icon>
        </span>
      </div>
    </div>
    <div class="playing-list" v-if='showList' @touchstart.stop='' @touchend.stop=''>
      <div class="pl-header">
        <div class="pl-mode">顺序播放</div>
        <div class="pl-close"  @click.stop='togglePlayingList'>
          <close-icon :size='1.2'></close-icon>
        </div>
      </div>
      <song-list class="pl-list" :list='plist'></song-list>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import ProgressBar from './ProgressBar'
  import SettingIcon from './Icon/SettingIcon'
  import CloseIcon from './Icon/CloseIcon'
  import { detect } from '../../utils/TouchDetect'
  import OSongList from './OSongList'
  export default {
    name: 'min-player',
    data() {
      return {
        progress: '0%',
        startPoint: null,
        endPoint: null,
        showList: false
      }
    },
    components: {
      ProgressBar,
      SettingIcon,
      'song-list': OSongList,
      CloseIcon
    },
    computed: {
      ...mapState({
        current: state => state.playing.current,
        currentTime: state => state.player.currentTime,
        playerState: state => state.player.state,
        plist: state => state.playing.list
      }),
      song() {
        return this.current || {}
      }
    },
    methods: {
      next: function () {
        this.$store.commit('playing/next')
      },
      pause: function () {
        let ns = this.playerState === 2 ? 1 : 2
        this.$store.commit('player/setState', ns)
      },
      touchstart(ev) {
        this.startPoint = ev.touches[0]
      },
      touchend(ev) {
        if (this.startPoint === null) {
          return;
        }
        this.endPoint = ev.changedTouches[0]
        let direction = detect(this.startPoint, this.endPoint);
        if (direction === 3) {
          this.$store.commit('playing/pre')
        } else if (direction === 4) {
          this.$store.commit('playing/next')
        }
      },
      togglePlayingList() {
        this.showList = !this.showList
      }
    },
    watch: {
      currentTime(to) {
        if (this.current) {
          this.progress = (to / this.current.interval).toFixed(4) * 100 + '%'
        }
      }
    }
  }

</script>


<style scoped>
  .inlineblock {
    display: inline-block
  }

  .miniplayer {
    background: rgba(0, 0, 0, .7);
    width: 100%;
    color: #FFF
  }

  .play-info {
    display: flex;
    align-items: center
  }

  .albuminfo {
    width: 3rem;
    flex-shrink: 0
  }

  .albumimg {
    height: 100%;
    width: 100%;
    border-radius: 999px
  }

  .songinfo {
    color: #FFF;
    width: auto;
    align-self: center;
    flex: 1 1 auto;
    padding-left: 0.3rem
  }

  .song_name {
    position: relative;
    height: 1.5rem;
    overflow: hidden;
    font-size: 1.1rem;
    font-weight: normal;
    color: #fff;
  }

  .song_singer {
    height: 1rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 0.7rem;
    color: #fff;
  }

  .c_ico1 {
    color: #fff;
  }

  .operation {
    flex: 0 0 4.5rem;
    position: relative;
    display: flex;
    justify-content: space-around
  }

  .focus__play {
    position: relative;
    display: inline-block;
    width: 1.8rem;
    height: 1.8rem;
    /* margin-left: 0.8rem; */
    border: solid 0.1rem;
    border-radius: 999px;
  }

  .focus__play::before {
    content: "";
    position: absolute;
    top: 0.5rem;
    left: 0.65rem;
    height: 0;
    /* width: 0; */
    /* line-height: 999rem; */
    /* overflow: hidden; */
    border-color: transparent transparent transparent currentColor;
    border-width: 0.45rem 0.75rem;
    border-style: solid;
  }

  .focus__play__pause::before {
    content: "";
    /* border-width: 0.45rem 0.75rem; */
    border-style: solid;
    height: 0.8rem;
    width: 0.1rem;
    border-width: 0.1rem;
    right: 0.2rem;
    position: absolute;
    top: 0.4rem;
    background-color: #FFF;
  }

  .focus__play__pause::after {
    content: "";
    /* border-width: 0.45rem 0.75rem; */
    border-style: solid;
    height: 0.8rem;
    width: 0.1rem;
    border-width: 0.1rem;
    right: 0.5rem;
    position: absolute;
    top: 0.4rem;
    background-color: #FFF;
  }


  .focus__play__next::after {
    content: "";
    /* border-width: 0.45rem 0.75rem; */
    border-style: solid;
    height: 0.8rem;
    width: 0.1rem;
    border-width: 0.1rem;
    right: 0.2rem;
    position: absolute;
    top: 0.4rem;
    background-color: #FFF;
  }

  .player-detail {
    align-self: center;
  }

  .playing-list {
    width: 100%;
    position: absolute;
    bottom: 0;
    width: 100%;
    background: #000;
    opacity: 0.75;
    display: flex;
    flex-direction: column;
    height: 65%;
    z-index: 999
  }

  .pl-header {
    width: 100%;
    display: flex;
    flex: 0 0 2.2rem;
    justify-content: center;
    padding-top: 0.5rem;
  }

  .pl-mode{
    flex: 1;
    text-align: center;
  }

  .pl-close{
    flex: 0 0 2rem;   
  }

  .pl-list {
    overflow: auto;
    flex: 1
  }
</style>