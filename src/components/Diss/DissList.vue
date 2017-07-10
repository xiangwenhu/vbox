<template>
  <div class="dissList">
    <slot name="dissTitle">
    </slot>

    <div class="dissContent">
      <ul class="ulbox">
        <li v-for="(diss,index) in dissList" :data-dissid="diss.dissid" class="dissLi">
          <figure>
            <div class="playlist__item_box" :class="[(index + 1) % 2 == 0 ? 'mr0 ml1' : '']">
              <div class="playlist__cover mod_cover">
                <router-link :to="{name:'AlbumDetailView',params:{albummid:'diss.dissid'}}" class="" :title="diss.dissname" :data-disstid="diss.dissid">
                  <img class="playlist__pic" v-lazy='diss.imgurl' onerror="this.src='//y.gtimg.cn/mediastyle/global/img/cover_playlist.png?max_age=31536000';this.onerror=null;"
                    :alt="diss.dissname" />
                  <span class="play-count" @click.stop='playCount(diss.dissid)'><a href="javascript:void(0);"><img src='../../assets/img/headset.png'/><span class="listennum">{{(diss.listennum / 10000).toFixed(1)}}万</span></a>
                  </span>
                  <span class="play-icon" @click.stop='addToPlaying(diss.dissid)'><play-icon height='1'></play-icon></span>
                </router-link>
              </div>
              <figcaption>
                <h4 class="playlist__title">
                  <span class="playlist__title_txt">
                    <a :href='"https://y.qq.com/n/yqq/playlist/"+ diss.dissid +".html#stat=y_new.playlist.dissname"' class="a" :data-disstid="diss.dissid" :title="diss.dissname"><span v-html="diss.dissname" /></a>
                  </span>
                </h4>
                <div class="playlist__author"><span v-html="diss.creator.name" /></div>
              </figcaption>
            </div>
          </figure>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import PlayIcon from '../public/Icon/PlayIcon'
  export default {
    name: 'dissList',
    props: ['dissList', 'module'],
    components: {
      PlayIcon
    },
    methods: {
      playCount(dissid) {
        console.log(dissid);
      }
    }
  }

</script>


<style scoped>
  .a {
    color: #333;
  }

  h4 {
    font-size: 100%;
  }

  em {
    font-style: normal;
    height: 14px;
    line-height: 14px;
    padding: 0 10px;
  }

  .fl {
    float: left;
  }

  .fr {
    float: right;
  }

  .mr0 {
    margin-right: 0 !important;
  }

  .ml1 {
    margin-left: 1px !important;
  }

  .pr0 {
    padding-right: 0;
  }

  .ulbox {
    width: 100%;
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
  }
  /*精选歌单start*/ 

  .dissTitle {   
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
  }

  .select {
    color: #34C17C;
  }

  .dissFont {
    font-size: 16px;
    font-weight: bold;
  }

  .playlist__item_box {
    position: relative;
    margin-right: 1px;
    margin-bottom: 0.5rem;
  }

  .playlist__cover {
    position: relative;
    display: block;
    overflow: hidden;
    margin-bottom: 5px;
  }

  .mod_cover {
    zoom: 1;
  }

  .playlist__pic {
    position: relative;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .play-count {
    position: absolute;
    top: 85%;
    left: 5%;
  }

  .play-count img {
    vertical-align: middle;
    opacity: 0.9;
  }

  .listennum {
    vertical-align: middle;
    display: inline-block;
    height: 16px;
    line-height: 16px;
    color: #fff;
    font-size: 12px;
    padding-left: 5px;
  }

  .play-icon {
    position: absolute;
    top: 85%;
    left: 85%;
  }

  .playlist__title {
    overflow: hidden;
  }

  .playlist__title_txt {
    float: left;
    padding-left: 0.2rem;
    max-width: 9.9rem;
    font-weight: 400;
    white-space: normal;
    overflow: hidden;
    font-size: 12px;
    line-height: 16px;
    height: 32px;
  }

  .playlist__author {
    padding-left: 0.2rem;
    color: #999;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 12px;
    line-height: 16px;
  }

  .dissLi {
    width: 50%;
    flex-grow: 1;
  }

  .dissLi figure {
    margin: 0 0.2rem
  }

  .diss-content-t {
    line-height: 2rem;
    padding: 0 0.2rem
  }
</style>