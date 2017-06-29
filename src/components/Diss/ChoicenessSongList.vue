<template>
  <div class="choicenessSongList">
    <div class="choicenessTitle">
      <span class="fl choicenessFont">精选歌单</span>
      <span class="fr">
        <em class="select">推荐</em>
        <em>|</em>
        <em class="">最新</em>
      </span>
    </div>
    <div class="choicenessContent">
      <ul>
        <li v-for="(songs,index) in choicenessSongList" :data-dissid="songs.dissid" >
          <div class="playlist__item_box" :class="[(index + 1) % 2 == 0 ? 'mr0' : '']">
            <div class="playlist__cover mod_cover">
              <router-link :to="{name:'AlbumDetailView',params:{albummid:''}}" class="" :title="songs.dissname" :data-disstid="songs.dissid" >
                <img class="playlist__pic" :src='songs.imgurl' onerror="this.src='//y.gtimg.cn/mediastyle/global/img/cover_playlist.png?max_age=31536000';this.onerror=null;" :alt="songs.dissname" />
                <span class="play-count" @click.stop='playCount(songs.dissid)'><a href="javascript:void(0);"><img src='../../assets/img/headset.png'/><span class="listennum">{{(songs.listennum / 10000).toFixed(1)}}万</span></a></span>
                <span class="play-icon" @click.stop='addToPlaying(songs.dissid)'><play-icon height='1'></play-icon></span>
              </router-link>
            </div>
            <h4 class="playlist__title">
              <span class="playlist__title_txt">
                <a :href='"https://y.qq.com/n/yqq/playlist/"+ songs.dissid +".html#stat=y_new.playlist.dissname"' class="a" :data-disstid="songs.dissid" :title="songs.dissname"><span v-html="songs.dissname" /></a>
              </span>
            </h4>
            <div class="playlist__author"><span v-html="songs.creator.name" /></div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import PlayIcon from '../PlayIcon'
  export default {
    name: 'choiceness-songList',
    props: ['choicenessSongList'],
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
  * {
    box-sizing:border-box;
  }

  .a {
      color: #333;
      text-decoration: none;
  }
  
  li{
    float: left;
  }
  
  h4 {
    font-size: 100%;
  }

  em {
    font-style: normal;
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
  
  /*精选歌单start*/
  .choicenessSongList{
  }

  .choicenessTitle{
    margin: 0.5rem 1rem;
    height: 1rem;
  }

  .select {
    color: #34C17C;
  }

  .choicenessFont{
    font-size: 16px;
    font-weight: bold;
  }

  .playlist__item_box {
    position: relative;
    margin-right: 2px;
    margin-bottom: 0.5rem;
  }

  .playlist__cover {
    position: relative;
    display: block;
    overflow: hidden;
    width: 9.9rem;
    height: 9.9rem;
    margin-bottom: 5px;
  }

  .mod_cover {
      zoom: 1;
  }

  .playlist__pic {
      position: absolute;
      top: 0;
      left: 0;
      width: 9.9rem;
      height: 9.9rem;
      object-fit: cover;
  }

  .play-count{
    position: absolute;
    top: 85%;
    left: 5%;
  }

  .play-count img{
    vertical-align: middle;
    opacity: 0.9;
  }

  .listennum{
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

  .playlist__author{
    padding-left: 0.2rem;
    color: #999;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 12px;
    line-height: 16px;
  }
</style>