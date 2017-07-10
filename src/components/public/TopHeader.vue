<template>
  <header id="header" class="clearfix">
    <a @click='goback'>
      <img class='logo' :src="logoImg" alt="logo">
    </a>
    <span class="header-seat"></span>
    <span class="searchBtn">
      <router-link  to="/search">
        <img :src="searchImg" alt="搜索">
      </router-link>
    </span>
    <span class="header-setting">
       <router-link  to="/me">
        <setting-icon  :height='1' :width='1'></setting-icon>
       </router-link>
    </span>
  </header>
</template>

<script>
  import SettingIcon from './Icon/SettingIcon'
  export default {
    name: 'top-header',
    components: {
      SettingIcon
    },
    data() {
      return {
        searchImg: require('../../assets/img/searchBtn.png'),
        logoImg: require('../../assets/img/logo.jpg')
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
    width: 100%;
    padding: 0.25rem 0;
    position: relative;
    background-image: -webkit-linear-gradient(270deg, #31c27c, #20bc22);
    background-image: linear-gradient(270deg, #31c27c, #20bc22);
    display: flex
  }


  #header .searchBtn {
    flex: 0 0 2.5rem;
    align-self: center;
  }

  .searchBtn img {
    height: 1.5rem;
  }

  .logo {
    height: 2rem;
    padding-left: 0.25rem
  }

  .header-seat {
    flex: 1 1 1rem
  }

  .header-setting {
    flex: 0 0 1.8rem;
    align-self: center;
  }
</style>