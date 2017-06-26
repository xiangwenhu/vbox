<template>
  <div :class="{'rootc':landscape}" style="height:100%">
    <top-header></top-header>
    <router-view></router-view>
    <router-view name='settings'></router-view>
    <router-view name='other'></router-view>
    <audio-player></audio-player>
  </div>
</template>

<script>
  import TopHeader from './components/TopHeader'
  import AudioPlayer from './components/AudioPlayer'
  import Search from './api/search'
  export default {
    name: 'app',
    components: {
      AudioPlayer,
      TopHeader
    },
    data() {
      return {
        landscape: false
      }
    },
    async mounted() {
      // Listen for orientation changes
      window.addEventListener('orientationchange', () => {
        // Announce the new orientation number
        if (window.orientation === 90 || window.orientation === -90) {
          this.landscape = true
        } else {
          this.landscape = false
        }

        // alert(window.orientation)
      }, false)

      Search.mvVkey('h00233zx9am').then(data => console.log(data))
    }
  }

</script>

<style>
  /* @import 'assets/index_light.css'; */

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

  * {
    padding: 0;
    margin: 0
  }

  html,
  body {
    height: 100%
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


  .fade-enter-active,
  .fade-leave-active {
    transition: opacity .5s ease;
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0
  }

  .child-view {
    position: absolute;
    transition: all .5s cubic-bezier(.55, 0, .1, 1);
    width: 100%;
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
    justify-content:flex-start;
    align-content: space-between;   
  }

  .box-item {    
    justify-content: center;    
  }
</style>