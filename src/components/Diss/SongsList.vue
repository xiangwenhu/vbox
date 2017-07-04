<template>
  <div class="songsList">
    <div class="songsTitle">
      <span class="fl" :class="[ module == 'choiceness' ? 'songsFont' : '']">精选歌单</span>
      <span class="fr">
        <em class="select" data-sort="5" @click.stop='selectSort'>推荐</em>|<em class="pr0" data-sort="2" @click.stop='selectSort'>最新</em>
      </span>
    </div>
    
    <div class="songsContent">
      <ul class="ulbox">
        <li v-for="(songs,index) in songsList" :data-dissid="songs.dissid" class="songsLi">
          <figure>
            <div class="playlist__item_box" :class="[(index + 1) % 2 == 0 ? 'mr0' : '']">
              <div class="playlist__cover mod_cover">
                <router-link :to="{name:'AlbumDetailView',params:{albummid:'songs.dissid'}}" class="" :title="songs.dissname" :data-disstid="songs.dissid" >
                  <img class="playlist__pic" :src='songs.imgurl' onerror="this.src='//y.gtimg.cn/mediastyle/global/img/cover_playlist.png?max_age=31536000';this.onerror=null;" :alt="songs.dissname" />
                  <span class="play-count" @click.stop='playCount(songs.dissid)'><a href="javascript:void(0);"><img src='../../assets/img/headset.png'/><span class="listennum">{{(songs.listennum / 10000).toFixed(1)}}万</span></a></span>
                  <span class="play-icon" @click.stop='addToPlaying(songs.dissid)'><play-icon height='1'></play-icon></span>
                </router-link>
              </div>
              <figcaption>
                <h4 class="playlist__title">
                  <span class="playlist__title_txt">
                    <a :href='"https://y.qq.com/n/yqq/playlist/"+ songs.dissid +".html#stat=y_new.playlist.dissname"' class="a" :data-disstid="songs.dissid" :title="songs.dissname"><span v-html="songs.dissname" /></a>
                  </span>
                </h4>
                <div class="playlist__author"><span v-html="songs.creator.name" /></div>
              </figcaption>
            </div>
          </figure>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import PlayIcon from '../PlayIcon'
  export default {
    name: 'songsList',
    props: ['songsList', 'module'],
    components: {
      PlayIcon
    },
    data() {
      return {
        sortId : 5
      }
    },
    methods: {
      playCount(dissid) {
        console.log(dissid);
      },
      selectSort(ev) {
        if (ev.target.tagName === 'EM') {
          this.sortId = ev.target.getAttribute('data-sort')
          this.$emit('filterChanged', this._data)
        }
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

  .pr0 {
    padding-right: 0; 
  }

  .ulbox{
    width: 20rem;
  }
  
  /*精选歌单start*/
  .songsList{
  }

  .songsTitle{
    margin: 0.5rem 1rem;
    height: 1rem;
    width: 18rem;
  }

  .select {
    color: #34C17C;
  }

  .songsFont{
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

  .songsLi {
    float: left;
  }
</style>