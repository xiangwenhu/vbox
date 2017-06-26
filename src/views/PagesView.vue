<template>
  <div class="pages-view" @touchstart.stop='touchstart' @touchend.stop='touchend'>
    <header-bar :cat="cat"></header-bar>
    <transition :name="transitionName">
      <router-view class="child-view"></router-view>
    </transition>
    <min-player></min-player>
  </div>
</template>

<script>
  import HeaderBar from '../components/HeaderBar'
  import FooterBar from '../components/FooterBar'
  import MinPlayer from '../components/MinPlayer'
  export default {
    name: 'pages-view',
    components: { HeaderBar, FooterBar, MinPlayer },
    data() {
      return {
        transitionName: 'slide-left',
        slideCats: ['home', 'singer', 'album', 'toplist', 'diss', 'mv'],
        // 0 点击， 1 滑动触发
        slideType: 0,
        touchStartPoint: null,
        touchEndPoint: null,
        cat: 'home'
      }
    },
    watch: {
      '$route'(to, from) {
        const toDepth = to.path.split('/').length
        const fromDepth = from.path.split('/').length
        if (this.slideType !== 1) {
          this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
        }
        let cat = this.getCate(to.path)
        if (cat) {
          this.cat = cat
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
        if (Math.abs(angx) < 2 && Math.abs(angy) < 2) {
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
        if (path.startsWith('/pages')) {
          return path.split('/')[2]
        }
      }
    }
  }

</script>

<style scoped>
  .pages-view {
    margin-top: 2.5rem;
    height: 100%;
  }
</style>