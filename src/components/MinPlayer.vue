<template>
  <div class="miniplayer footer">
    <progress-bar :progress='progress'></progress-bar>
    <div>
      <div class="inlineblock albuminfo">
        <img class='albumimg' :src="song?`https://y.gtimg.cn/music/photo_new/T002R150x150M000${song.albummid}.jpg?max_age=2592000`:''" onerror='this.src = "https://y.gtimg.cn/mediastyle/yqq/extra/player_cover.png?max_age=31536000"'
        />
      </div>

      <div class="inlineblock songinfo">
        <span class="song_name">{{song.songname}}</span>
        <div class="song_singer"> {{song.singer | mp('name') | jn('/') }}</div>
      </div>
      <div class="inlineblock operation">
        <a @click.stop='pause' href="javascript:;" :class='["focus__play", "c_ico1 js_playallsong",playerState == 1 ? "focus__play__pause":""  ]'><span class="focus__play_text"></span></a>
        <a @click.stop='next' href="javascript:;" class="focus__play__next focus__play c_ico1 js_playallsong"><span class="focus__play_text"></span></a>
      </div>
    </div>


  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import ProgressBar from './ProgressBar'
  export default {
    name: 'min-player',
    data() {
      return {
        progress: '0%'
      }
    },
    components: {
      ProgressBar
    },
    computed: {
      ...mapState({
        current: state => state.playing.current,
        currentTime: state => state.player.currentTime,
        playerState: state => state.player.state
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
        this.$store.commit('player/setState', this.$store.state.player.state === 2 ? 1 : 2)
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
    /* position: fixed; 
    bottom: 0; */
    width: 100%
  }

  .albuminfo {
    height: 4rem;
    width: 4rem
  }

  .albumimg {
    height: 100%;
    width: 100%;
    border-radius: 999px
  }

  .songinfo {
    color: #FFF;
    width: auto;
    vertical-align: top;
    /* height: 100%; */
    margin-top: 1rem;
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
    position: absolute;
    right: 0;
    width: 5rem
  }

  .focus__play {
    /* right: 1rem; */
    top: 1rem;
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
</style>