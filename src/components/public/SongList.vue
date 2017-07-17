<template>
  <div class="song-list">
    <div class="songlist__item box border_b" v-for="(song,index) in songs">
      <div class="tit box-item box-item-num">
        {{index + 1}}
      </div>
      <div class="songlist__artist box-item box-item-info">
        <p class="tit ellipsis">{{pure ? song.songname :song.data.songname}}</p>
        <p class="tit2 ellipsis">
          {{ (pure ? song.singer : song.data.singer).map(s=>s.name).join('/')}}
        </p>
      </div>
      <div class="box-item-operation">
        <span  @click.stop='play(pure ? song :song.data)'>
          <play-icon height="1.2"></play-icon>          
        </span>
        <span  @click.stop='add(pure ? song  : song.data)'>
          <add-icon height="1.2"></add-icon>          
        </span>
      </div>
    </div>
  </div>
</template>



<script>
  import PlayIcon from './Icon/PlayIcon'
  import AddIcon from './Icon/AddIcon'
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
  .song-list{
    color: #FFF
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

  .box-item {
    flex-basis: 100%;
    justify-content: flex-start;
    margin: 0.1rem 0;
  }

  .box-item-num {
    justify-content: center;
    text-align: center;    
    flex: 0 0 3rem
  }

  .box-item-info {
    width: 60%;
    flex: 1  
  }

  .song-title {
    font-size: 1rem;
    overflow: hidden;
    text-overflow: ellipsis;  
    white-space: nowrap;
    width: 100%; 
  }

  .song-singer {
    font-size: 0.7rem;
    color: rgba(255, 255, 255, .6);
  }

  .box-item-operation {
    flex: 0 0 3.5rem;   
  }
  .tit{
    color: #FFF
  }
</style>