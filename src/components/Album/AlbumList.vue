<template>
  <div class="box">
    <div v-for="(album,index) in albums" class="box-item align-center">
      <figure>
        <div class="album_pic_zone">
          <img class="album_pic" :src='"http://y.gtimg.cn/music/photo_new/T002R150x150M000"+ album.albumMID + ".jpg?max_age=2592000"'
          />
          <span class="play-icon" @click.stop='addToPlaying(album.albumMID)'><play-icon height='2'></play-icon></span>
        </div>
        <figcaption>
          <p class="ellipsis album_name">{{album.albumName}}</p>
          <p class="ellipsis album_singer"> {{album.singers.map(s=>s.singer_name).join('/')}}</p>
        </figcaption>
      </figure>
    </div>
  </div>
</template>

<script>
  import PlayIcon from '../PlayIcon'
  export default {
    name: 'album-list',
    props: ['albums'],
    components: {
      PlayIcon
    },
    methods: {
      addToPlaying(albumMID) {
        this.$emit('addAlbumToPlaying', albumMID)
      }
    }
  }

</script>

<style scoped>
  .c_txt1 {
    color: #fff;
  }

  .song_list__tit {
    line-height: 1.5rem;
    font-size: 1rem;
    font-weight: 400;
  }

  .c_txt2 {
    color: rgba(255, 255, 255, .6);
  }

  .song_list__desc {
    display: -webkit-box;
    -webkit-box-align: center;
    font-size: 0.8rem;
    padding-left: 4rem
  }

  .song_list__box {
    display: -webkit-box;
    height: 4rem;
    padding-left: 0.6rem;
  }

  .box {
    display: flex;
    display: -webkit-flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    align-content: space-between;
  }

  .box-item {
    width: 33%;
    justify-content: flex-start;
    text-align: left;
  }

  .box-item img {
    width: 96%;
    padding-left: 4%
  }

  .album_name {
    font-size: 0.8rem;
  }

  .album_singer {
    font-size: 0.6rem;
    color: #999
  }

  .album_pic_zone {
    position: relative
  }

  .album_pic {
    position: relative
  }

  .play-icon {
    position: absolute;
    top: 33%;
    left: 33%
  }
</style>