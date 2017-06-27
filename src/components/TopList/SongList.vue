<template>
  <div class="song-list">
    <div class="songlist__item box border_b" v-for="(song,index) in songs">
      <div class="songlist__rank box-item box-item-num">
        {{index + 1}}
      </div>
      <div class="songlist__artist box-item box-item-info">
        <p class="song-title">{{pure ? song.songname :song.data.songname}}</p>
        <p class="song-singer">
          {{ (pure ? song.singer : song.data.singer).map(s=>s.name).join('/')}}
        </p>
      </div>
      <div class="box-item-operation">
        <span style="position:absolute;right:2.4rem" @click.stop='play(pure ? song :song.data)'>
          <play-icon height="1.2"></play-icon>          
        </span>
        <span style="position:absolute;right:0.8rem" @click.stop='add(pure ? song  : song.data)'>
          <add-icon height="1.2"></add-icon>          
        </span>
      </div>
    </div>
  </div>
</template>



<script>
  import PlayIcon from '../PlayIcon'
  import AddIcon from '../AddIcon'
  export default {
    name: 'song-list',
    props: {
      songs: {
        default: []
      },
      pure: {
        default: false
      }
    },
    components: {
      PlayIcon,
      AddIcon
    },
    methods: {
      add(song) {
        this.$emit('addsong', song)
      },
      play(song) {
        this.$emit('playsong', song)
      }
    }
  }

</script>



<style scoped>

  .songlist__item {
    border-bottom: rgba(0, 0, 0, .15) solid 1px;
    position: relative;
  }

  .box {
    display: flex;
    display: -webkit-box;
    flex-wrap: nowrap;
    justify-content: left;
    align-content: space-between;
    align-items: center;
  }

  .box-item {
    flex-basis: 100%;
    justify-content: flex-start;
    margin: 0.1rem 0;
  }

  .box-item-num {
    width: 10%;
    justify-content: center;
    text-align: center;
    color: #FFF;
  }

  .box-item-info {
    width: 60%;
    margin-right: 30%;
  }

  .song-title {
    font-size: 1rem;
    overflow: hidden;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
    color: #FFF;
  }

  .song-singer {
    font-size: 0.7rem;
    color: rgba(255, 255, 255, .6);
  }

  .box-item-operation {
    position: absolute;
    top: 30%
  }
</style>