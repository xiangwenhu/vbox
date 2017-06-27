<template>
  <div class="mod_focus">
    <div class="focus__body">
      <div class="focus__info">
        <div class="focus__text">
          <h1 class="focus__tit c_txt1" id="singer_name">
            <div class="js_marquee" style="float: left; white-space: nowrap; text-overflow: ellipsis;">{{singername}}</div>
          </h1>
          <p class="focus__desc c_txt1">粉丝<span class="focus__number" id="singer_fans"> {{fansnum | tt}} 万人</span></p>
          <p class="focus__desc c_txt1">歌曲<span class="focus__number" id="singer_fans"> {{songcount}}</span> 专辑
            <span class="focus__number" id="singer_fans"> {{albumcount}}</span> MV <span class="focus__number" id="singer_fans"> {{mvcount}}</span>
          </p>

        </div>
        <span @click.stop='playhot' class="play-icon">
          <play-icon height='2'></play-icon>      
        </span>
      </div>
    </div>
    <div class="focus__bg" id="singer_bgimg" :style='{"background-image":bgImage}'></div>
    <div class="focus__gradient c_gradient" style="color: rgb(170, 194, 218);"></div>
  </div>
</template>

<script>
  import PlayIcon from '../PlayIcon'
  export default {
    name: 'singer-info',
    components: {
      PlayIcon
    },
    props: ['singermid', 'singername', 'fansnum', 'songcount', 'albumcount', 'mvcount'],
    computed: {
      bgImage: function () {
        return this.singermid ? 'url("https://y.gtimg.cn/music/photo_new/T001R300x300M000' + this.singermid + '.jpg?max_age=2592000")'
          : 'url("https://y.gtimg.cn/mediastyle/music_v11/extra/default_300x300.jpg?max_age=31536000")'
      }
    },
    methods: {
      playhot() {
        this.$emit('playhot')
      }
    }
  }

</script>


<style scoped>
  .mod_focus {
    position: relative;
    overflow: hidden;
  }

  .focus__body {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 3;
  }

  .focus__info {
    display: -webkit-box;
    -webkit-box-align: center;
    margin: 0 15px 25px;
    position: relative;
  }

  .c_txt1 {
    color: #fff;
  }


  .focus__desc,
  .focus__tit {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 0.7rem;
  }

  .focus__desc {
    color: rgba(255, 255, 255, .6)
  }



  .focus__tit {
    position: relative;
    height: 2rem;
    overflow: hidden;
    font-size: 1.5rem;
    font-weight: 400;
  }

  .c_ico1 {
    color: #fff;
  }

  .focus__play_text {
    opacity: 0;
  }

  .focus__bg {
    background-repeat: no-repeat;
    background-position: top center;
    background-size: cover;
    height: 12rem;
  }

  .focus__gradient {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 2;
    width: 100%;
    background-image: -webkit-linear-gradient(top, transparent, currentColor 80%);
  }

  .focus__gradient::after {
    content: "";
    display: block;
    padding-top: 60%;
  }

  .play-icon {
    position: absolute;
    right: 0.5rem;
    bottom: 0.5rem
  }
</style>