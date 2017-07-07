<template>
  <div class="song-list">
    <div class="songlist__item box border_b" v-for="(item,index) in list">
      <div class="songlist__artist box-item-info ellipsis" :class="current&&current.songmid == item.songmid ? 'song-current' : ''">
        <span class="song-title">{{item.songname}}</span>
        <span class="song-con">-</span>
        <span class="song-singer ellipsis" @click.stop='play(item)'>
          {{ item.singer |mp('name') |jn('/') }}
        </span>
      </div>
      <div class="box-item-operation">
        <span @click.stop='play(item)'>
          <play-icon height="1.2"></play-icon>          
        </span>
        <span @click.stop='del(item)'>
          <close-icon height="1.2"></close-icon>          
        </span>
      </div>
    </div>
  </div>
</template>

<script>
  import PlayIcon from './Icon/PlayIcon'
  import CloseIcon from './Icon/CloseIcon'
  import { mapState } from 'vuex'
  export default {
    props: {
      list: {
        type: Array,
        default: function () {
          return []
        }
      }
    },
    components: {
      PlayIcon,
      CloseIcon
    },
    computed: {
      ...mapState('playing', {
        current: state => state.current
      })
    },
    methods: {
      del(song) {
        this.$store.dispatch('playing/delSong', song.songmid)
      },
      play(song) {
        this.$store.commit('playing/next', song)
      }
    }
  }

</script>



<style scoped>
  .song-list {
    color: #FFF
  }

  .song-current {
    color: #20bc22
  }

  .songlist__item {
    border-bottom: rgba(0, 0, 0, .15) solid 1px;
    position: relative;
  }

  .box {
    display: flex;
    flex-wrap: nowrap;
    justify-content: left;
    align-content: space-between;
    align-items: center;
  }

  .box-item-info {
    flex: 1
  }

  .box-item-info {
    line-height: 1.2rem
  }

  .song-title {
    font-size: 0.8rem;
    flex: 1 1 auto;
    padding-left: 0.5rem
  }

  .song-singer {
    font-size: 0.7rem;
    flex: 1 1 auto
  }

  .song-con {
    flex: 0 0 0.2rem
  }

  .box-item-operation {
    flex: 0 0 4rem;
    display: flex;
    justify-content: space-between
  }

  .box-item-operation span {
    flex: 1
  }
</style>