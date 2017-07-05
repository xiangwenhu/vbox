<template>
  <div class="pages-view" @touchstart.stop='touchstart' @touchend.stop='touchend'>
    <div class="header">
      <top-header></top-header>
      <header-bar :cat="cat"></header-bar>
    </div>
    <transition :name="transitionName" mode="out-in">
      <router-view class="child-view main"></router-view>
    </transition>
    <min-player></min-player>
  </div>
</template>

<script>
  import TopHeader from '../components/TopHeader'
  import HeaderBar from '../components/HeaderBar'
  import FooterBar from '../components/FooterBar'
  import MinPlayer from '../components/MinPlayer'
  export default {
    name: 'pages-view',
    components: { HeaderBar, FooterBar, MinPlayer, TopHeader },
    data() {
      return {
        transitionName: 'slide-left',
        slideCats: ['home', 'singer', 'album', 'toplist', 'diss', 'mv'],
        // 0 点击， 1 滑动触发
        slideType: 0,
        touchStartPoint: null,
        touchEndPoint: null,
        cat: this.getCate(this.$route.path)
      }
    },
    watch: {
      '$route'(to, from) {
        try {
          const toDepth = to.path.split('/').length
          const fromDepth = from.path.split('/').length
          if (this.slideType !== 1) {
            this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
          }
          let cat = this.getCate(to.path)
          if (cat) {
            this.cat = cat
          }
        } catch (err) {
          alert('err' + err)
        }
      }
    },
    methods: {
      touchstart(ev) {
        this.touchStartPoint = ev.touches[0]
      },
      touchend(ev) {
        if (this.touchStartPoint === null) {
          return;
        }
        this.touchEndPoint = ev.changedTouches[0]
        let direction = this.getDirection(this.touchStartPoint.pageX, this.touchStartPoint.pageX, this.touchEndPoint.pageX, this.touchEndPoint.pageY);
        let index = this.slideCats.findIndex(s => s === this.cat)
        if (index >= 0) {
          switch (direction) {
            // 左
            case 3:
              if (index < this.slideCats.length - 1) {
                this.$router.push({ path: '/pages/' + this.slideCats[index + 1] })
                this.slideType = 1
                this.transitionName = 'slide-left'
              }
              break;
            case 4:
              // 右
              if (index > 0) {
                this.$router.push({ path: '/pages/' + this.slideCats[index - 1] })
                this.slideType = 1
                this.transitionName = 'slide-right'
              }
              break;
            default:
              break;
          }
        }
        this.touchStartPoint = null;
        this.touchEndPoint = null
      },
      // 获得角度,http://www.cnblogs.com/beiz/p/5817192.html
      getAngle(angx, angy) {
        return Math.atan2(angy, angx) * 180 / Math.PI;
      },
      // 根据起点终点返回方向 1向上 2向下 3向左 4向右 0未滑动 ,http://www.cnblogs.com/beiz/p/5817192.html
      getDirection(startx, starty, endx, endy) {
        let angx = endx - startx;
        let angy = endy - starty;
        let result = 0;

        // 如果滑动距离太短
        if (Math.abs(angx) < 20 && Math.abs(angy) < 20) {
          return result;
        }

        var angle = this.getAngle(angx, angy);
        if (angle >= -135 && angle <= -45) {
          result = 1;
        } else if (angle > 45 && angle < 135) {
          result = 2;
        } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
          result = 3;
        } else if (angle >= -45 && angle <= 45) {
          result = 4;
        }

        return result;
      },
      getCate(path) {
        // if (path.startsWith('/pages')) {
        if (path.indexOf('/pages') === 0) {
          return path.split('/')[2]
        }
      }
    }
  }

</script>

<style scoped>
  .pages-view {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  .header {
    width: 100%;
    flex: 0 0 4.8rem;
  }

  .child-view {
    /* position: absolute; */
    transition: all .5s cubic-bezier(.55, 0, .1, 1);
    width: 100%;
    flex: 1
  }

  .main {
    overflow: auto;
    vertical-align: baseline;
  }

  .footer {
    flex: 0 0 3rem;
  }
</style>