<template>
  <header id="header" class="clearfix">
    <router-link to="/" @click='goback'>
      <img class='logo' :src="logoImg" alt="logo">
    </router-link>
    <router-link class="searchBtn" to="/pages/search">
      <img :src="searchImg" alt="搜索">
    </router-link>
    <div class="btn_nav_slide" id="btnNavSlide"><i class="draw"></i></div>
  </header>
</template>

<script>
  export default {
    name: 'top-header',
    data() {
      return {
        searchImg: require('../assets/img/searchBtn.png'),
        logoImg: require('../assets/img/logo.jpg')
      }
    },
    methods: {
      goback() {
        this.$router.go(-1)
      }
    }
  }

</script>

<style scoped>
  #header {
    background: #20bc22;
    color: #fff;
    height: 2rem;
    position: fixed;
    top: 0;
    width: 100%;
    padding: 0.25rem 0;
    z-index: 999;
    background-image: -webkit-linear-gradient(270deg, #31c27c, #20bc22);
    background-image: linear-gradient(270deg, #31c27c, #20bc22);
  }

  .btn_nav_slide {
    position: absolute;
    right: 1rem;
    top: 1rem;
    width: 1rem;
    height: 1.2rem;
  }

  .draw {
    top: 0.2rem;
    right: 0;
  }

  .draw,
  .draw:before,
  .draw:after {
    width: 1rem;
    height: 0.1rem;
    background: #fff;
    position: absolute;
    left: 0;
    -webkit-transition: all .5s;
    -webkit-transform-style: preserve-3d;
    -webkit-backface-visibility: hidden;
  }

  .draw:before {
    content: "";
    top: -0.5rem;
  }

  .draw:after {
    content: "";
    top: 0.5rem;
  }

  #header .searchBtn {
    position: absolute;
    right: 3rem;
    top: 0.5rem;
  }

  .searchBtn img {
    height: 1.5rem
  }

  .logo {
    height: 2rem;
    padding-left: 0.25rem
  }
</style>