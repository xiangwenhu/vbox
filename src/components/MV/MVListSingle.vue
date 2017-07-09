<template>
  <div class="mv-list">
    <slot></slot>
    <div v-for="(mv,index) in mvs" class="box">

      <div class="box-item-l">
        <router-link :to="{name:'MVPlayerView',params:{vid:mv.vid}}">
          <img v-lazy='`https://puui.qpic.cn/qqvideo_ori/0/${mv.vid}_496_280/0?max_age=259200`' width="100%" />
        </router-link>
      </div>
      <div class="box-item-r">
        <router-link :to="{name:'MVPlayerView',params:{vid:mv.vid}}">
          <div class="qui_list__box">
            <h3 class="qui_list__tit tit"><span class="qui_list__txt">{{mv.mvname || mv.name }}</span></h3>
            <p class="desc">{{mv.singers | mp('name') | jn('/') }}</p>
          </div>
        </router-link>
      </div>

      <div class="border_b"></div>

    </div>
  </div>
</template>
<script>
  export default {
    props: {
      mvs: {
        required: true,
        type: Array,
        default: []
      }
    }
  }

</script>

<style scoped>
  .box {
    align-items: center;
    position: relative
  }

  .box-item-l {
    width: 30%;
    align-content: flex-start;
  }

  .box-item-r {
    width: 70%;
    align-content: flex-start;
    -webkit-box-align: center;
    position: relative;
    flex: 1
  }

  .qui_list__tit {
    font-size: 0.8rem;
    font-weight: 300
  }

  .qui_list__box {
    padding-left: 0.5rem;
    color: #000
  }

  .qui_list__desc {
    display: -webkit-box;
    -webkit-box-align: center;
    overflow: hidden;
    font-size: 0.6rem;
    color: grey
  }

  .box:after {
    content: "";
    position: absolute;
    z-index: 1;
    bottom: 0;
    left: 0;
    right: 0;
    -webkit-box-sizing: border-box;
    height: 0;
    pointer-events: none;
    border-bottom: solid 1px rgba(0, 0, 0, .15);
    ;
  }
</style>