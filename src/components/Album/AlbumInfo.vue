<template>
  <div class="mod_focus">
    <div class="focus__body">
      <div class="focus__info">
        <div class="focus__text">
          <h1 class="focus__tit c_txt1 ellipsis">
            <div class="js_marquee" style="float: left; white-space: nowrap; text-overflow: ellipsis;">{{album.name}}</div>
          </h1>
          <p class="focus__desc c_txt1 ellipsis">
            <span class="focus__gap js_opensinger">{{album.singername}}</span>
            <span class="focus__gap">{{album.aDate}}</span>
            <span class="focus__gap">{{album.genre}}</span>
          </p>
        </div>
        <span @click.stop='addToPlaying()'><play-icon height='2'></play-icon></span>
      </div>
    </div>
    <div class="focus__bg" id="album_bgimg" :style="{'background-image': bgImage}"></div>
    <div class="focus__gradient c_gradient" :style='{color: album.color}'></div>
  </div>
</template>

<script>
  import PlayIcon from '../PlayIcon'
  export default {
    name: 'album-info',
    props: ['album'],
    components: {
      PlayIcon
    },
    computed: {
      bgImage() {
        // `url(&quot;https://y.gtimg.cn/music/photo/mid_album_500/S/R/${album.mid}.jpg&quot;`
        if (this.album && this.album.mid) {
          let z = [...this.album.mid].reverse(),
            z1 = z[1], z2 = z[0]
          return `url("https://y.gtimg.cn/music/photo/mid_album_500/${z1}/${z2}/${this.album.mid}.jpg"`
        }
      }
    },
    methods: {
      addToPlaying() {
        this.$emit('addToPlaying')
      }
    }
  }

</script>


<style scoped>
  .mod_focus {
    position: relative
  }

  .focus__body {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    color: #FFF;
    z-index: 3;
  }

  .focus__bg {
    background-repeat: no-repeat;
    background-position: top center;
    background-size: cover;
  }

  .focus__bg::after {
    content: "";
    display: block;
    padding-top: 100%;
  }

  .focus__text {
    -webkit-box-flex: 1;
    flex: 1;
  }

  .focus__desc,
  .focus__tit {
    font-size: 0.7rem;
  }

  .focus__info {
    display: -webkit-box;
    -webkit-box-align: center;
    margin: 0 0.75rem 1.25rem;
  }

  .focus__tit {
    position: relative;
    height: 1.8rem;
    overflow: hidden;
    font-size: 1.2rem;
    font-weight: 400;
  }

  .focus__gradient::after {
    content: "";
    display: block;
    padding-top: 60%;
  }
</style>