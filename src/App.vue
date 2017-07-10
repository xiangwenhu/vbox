<template>
  <div :class="{'rootc':landscape}" style="height:100%;width:100%">
    <router-view></router-view>
    <router-view name='settings'></router-view>
    <router-view name='other'></router-view>
    <audio-player></audio-player>
  </div>
</template>

<script>
  import 'whatwg-fetch'
  import 'es6-promise'
  import AudioPlayer from './components/public/AudioPlayer'
  import Search from './api/search'
  export default {
    name: 'app',
    components: {
      AudioPlayer
    },
    data() {
      return {
        landscape: false
      }
    },
    watch: {
      '$route'(to, from) {
        window.scrollTo(0, 0)
      }
    },
    async mounted() {
      // 注册resize 或者 orientationchange
      var docEl = document.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
          var landscape = (window.orientation === 90 || window.orientation === -90)
          var clientWidth = docEl.clientWidth;
          if (!clientWidth) return;
          if (clientWidth >= 640) {
            docEl.style.fontSize = landscape ? '20px' : '30px';
            // alert(clientWidth)
          } else {
            docEl.style.fontSize = ((landscape ? 16 : 32) * (clientWidth / 640)).toFixed(1) + 'px';
            // alert(clientWidth)
          }
        };

      if (!document.addEventListener) return;
      window.addEventListener(resizeEvt, recalc, false);
      document.addEventListener('DOMContentLoaded', recalc, false);

      function touchstart() {
        let audioPlayer = document.getElementById('audioPlayer')
        audioPlayer.play()
        audioPlayer.src = ""
        audioPlayer.load();
        audioPlayer.style.height = 0
        audioPlayer.style.width = 0
        audioPlayer.style.display = 'none'
        setTimeout(function () { audioPlayer.pause() }, 10)
        document.removeEventListener('touchstart', touchstart)
      }
    }
  }

</script>

<style>
  /* @import 'assets/index_light.css'; */

  * {
    padding: 0;
    margin: 0
  }

  html,
  body {
    height: 100%;
    width: 100%;
    overflow: hidden;
  }

  a {
    text-decoration: none
  }

  .align-center {
    text-align: center
  }

  li {
    list-style: none
  }

  .item {
    line-height: 1.6rem;
    padding: 0.1rem 0.5rem;
    color: #666;
    font-size: 0.8rem
  }

  .bar-item {
    line-height: 1.8rem;
    padding: 0.1rem 0.5rem;
    color: #666;
    font-size: 1rem
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity .5s ease;
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0
  }

  .slide-left-enter,
  .slide-right-leave-active {
    opacity: 0;
    -webkit-transform: translate(30px, 0);
    transform: translate(30px, 0);
  }

  .slide-left-leave-active,
  .slide-right-enter {
    opacity: 0;
    -webkit-transform: translate(-30px, 0);
    transform: translate(-30px, 0);
  }

  .ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .box {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-content: space-between;
  }

  .box-col {
    display: flex;
    flex-direction: column;
  }

  .box-item {
    justify-content: center;
  }

  .focus__gradient {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 2;
    width: 100%;
    background-image: -webkit-linear-gradient(top, transparent, currentColor 80%);
  }

  .tag-hd {
    position: relative;
    height: 2rem;
  }

  .h100 {
    height: 100%
  }

  .of-auto {
    overflow: auto
  }

  .sort-type {
    display: inline-block;
    padding: 0.2rem 0.4rem;
    height: 1.2rem;
    position: relative;
    font-size: 0.8rem;
    border-width: 1px;
    border-style: solid;
    border-color: #c9c9c9;
  }

  .tag-select {
    background-color: #31c27c;
    color: #fff;
    border-color: #31c27c;
  }

  .tit {
    font-size: 0.8rem;
    color: #333
  }

  .tit2 {
    font-size: 0.8rem;
    color: #666
  }

  .t_h2,
  .tit_h2_w {
    font-weight: 400;
    font-size: 1.2rem;
    line-height: 1.6rem;
    color: #333
  }

  .tit_h2_w {
    color: #FFF
  }

  .tit_h4,
  .tit_h4_w {
    font-weight: 300;
    font-size: 0.9rem;
    line-height: 1.2rem;
    color: #333
  }

  .tit_h4_w {
    color: #FFF
  }

  .desc {
    color: #999;
    font-size: 0.7rem
  }

  .top_title {
    color: #FFF;
    margin: 0.2rem 0;
    padding: 0.2rem 0;
    line-height: 1.8rem;
    font-weight: 300;
    letter-spacing: 0.2rem
  }

  .flex {
    display: flex
  }

  .flex-flex {
    flex: 1
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    transform: rotate(0deg);
  }

  .rootc {
    transform: rotate(0) !important;
  }
</style>