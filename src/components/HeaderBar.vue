<template>
  <ul class="header-bar mod_nav" @click.stop='changeTab'>
    <li v-for="(nav,index) in navs" :data-mod="nav.mod" :class='[cat == nav.mod ? "current":""]'>
      <router-link :to="nav.to" :data-mod="nav.mod">{{nav.title}}</router-link>
    </li>
  </ul>
</template>

<script>
  export default {
    'name': 'header-bar',
    props: {
      cat: {
        default: 'home'
      }
    },
    data() {
      return {
        navs: [{
          to: '/pages/home',
          title: '首页',
          mod: 'home'
        }, {
          to: '/pages/singer',
          title: '歌手',
          mod: 'singer'
        },
        {
          to: '/pages/album',
          title: '专辑',
          mod: 'album'
        }, {
          to: '/pages/toplist',
          title: '排行',
          mod: 'toplist'
        }, {
          to: '/pages/diss',
          title: '歌单',
          mod: 'diss'
        }, {
          to: '/pages/mv',
          title: 'MV',
          mod: 'mv'
        }]
      }
    },
    methods: {
      changeTab(ev) {
        if (ev.target.tagName === 'A') {
          this.mod = ev.target.getAttribute('data-mod')
        }
      }
    }

  }

</script>


<style scoped>
  .header-bar {
    display: inline-block;
    width: 100%;
    text-align: center;
  }

  .header-bar li {
    display: inline-block;
    width: 3rem;
    text-align: center;
    padding: 0.3rem 0.1rem
  }

  .mod_nav li.current a {
    color: #31c27c;
  }

  .mod_nav a {
    -webkit-box-flex: 1;
    position: relative;
    display: block;
    overflow: hidden;
    text-align: center;
    color: rgba(0, 0, 0, .6);
    -webkit-box-sizing: border-box;
  }

  .mod_nav li.current {
    border-bottom: 0.1rem solid #31c27c;
  }
</style>