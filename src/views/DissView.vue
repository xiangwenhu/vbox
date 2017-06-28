<template>
  <div class="diss">
    <div class="categorys_zone">
      <ul>
        <li v-for="(category,index) in hotCategorys" :data-id="category.categoryId" class="categorysli categoryLi" :class='[index == 0 ? "specialLI" : ""]'>
          {{category.categoryName}}
        </li>
        <li class="categorysli allCategory">查看全部分类 ></li>
      </ul>
    </div>
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
                  <span class="play-icon" @click.stop='addToPlaying(song.dissid)'><play-icon height='2'></play-icon></span>
                </router-link>
              </div>
              <h4 class="playlist__title">
                <span class="playlist__title_txt">
                  <a href="https://y.qq.com/n/yqq/playlist/1168315325.html#stat=y_new.playlist.dissname" class="" :data-disstid="songs.dissid" :title="songs.dissname"><span v-html="songs.dissname" /></a>
                </span>
              </h4>
              <div class="playlist__author"><span v-html="songs.creator.name" /></div>
			      </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
 
<script> 
  import Other from '../api/other'
  import PlayIcon from '../components/PlayIcon'

  export default {
    name: 'diss-view',
    data() {
      return {
        hotCategorys : [
          {'categoryId': 39, 'categoryName': 'ACG'},
          {'categoryId': 148, 'categoryName': '情歌'},
          {'categoryId': 199, 'categoryName': '背景音乐'},
          {'categoryId': 133, 'categoryName': '影视'},
          {'categoryId': 52, 'categoryName': '伤感'},
          {'categoryId': 15, 'categoryName': '轻音乐'},
          {'categoryId': 167, 'categoryName': '英语'},
          {'categoryId': 24, 'categoryName': '电子'},
          {'categoryId': 194, 'categoryName': '古风'},
          {'categoryId': 141, 'categoryName': 'KTV热歌'},
          {'categoryId': 197, 'categoryName': '现场音乐'}
        ],
        choicenessSongList : []
      }
    },
    async created() {
      let diss = await Other.dissByTag().then(res => res.json())
      if (diss.code === 0) {
        this.choicenessSongList = diss.data.list;
      }
    },
    methods: {
      addToPlaying(albumMID) {
        this.$emit('addAlbumToPlaying', albumMID)
      }
    }
  }

</script>

<style scoped>

  a {
      color: #333;
      text-decoration: none;
  }
  a:hover {
    color: #31c27c;
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

  .diss {
    font-size: 14px;
    height: 100%;
  }

  /*歌单类别start*/
  .categorys_zone {
    margin: 0.5rem;
    height: 11.5rem;
  }

  .categorysli{
    float: left;
    height: 2rem;
    line-height: 2rem;
    text-align: center;
    background: #F7F7F7;
    margin: 0.1rem;
    border-radius: 0.1rem;
  }

  .categoryLi {
    width: 6.1rem;
  }

  .specialLI {
    height: 4.15rem;
    line-height: 4.15rem;
  }

  .allCategory {
    width: 18.7rem;
  }
  /*歌单类别end*/

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

  .play-icon {
    position: absolute;
    top: 33%;
    left: 33%
  }

  .playlist__title {
      overflow: hidden;
  }

  .playlist__title_txt {
    float: left;
    max-width: 9.9rem;
    font-weight: 400;
    white-space: normal;
    overflow: hidden;
    font-size: 12px;
    line-height: 16px;
    height: 32px;
  }

  .playlist__author{
    color: #999;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 12px;
    line-height: 16px;
  }
</style>

