<template>
  <div v-if='result'>
    <!-- 单曲 -->
    <div class="search_result__sort" v-if='result.song && result.song.itemlist.length > 0'>
      <h4 class="search_result__tit tit_h4"><i class="search_result__icon_song"></i>单曲</h4>
      <ul class="search_result__list ellipsis">
        <li v-for="(song,index) in result.song.itemlist" class="ellipsis">
          <a href="javascript:;" class="search_result__link js_smartbox_song" :data-mid="song.mid" :data-name="song.name">
           <span class="search_result__name">{{song.name}}</span>-<span class="search_result__singer">{{song.singer}}</span>
          </a>
        </li>
      </ul>
    </div>

    <!-- 歌手 -->
    <div class="search_result__sort" v-if='result.singer && result.singer.itemlist.length > 0'>
      <h4 class="search_result__tit tit_h4"><i class="search_result__icon_singer"></i>歌手</h4>
      <ul class="search_result__list ellipsis">
        <li v-for="(singer,index) in result.singer.itemlist" class="ellipsis">
          <router-link :to="{name:'SingerDetailView',params:{singermid:singer.mid}}" href="javascript:;" class="search_result__link js_smartbox_singer"
            :data-mid="singer.mid">
            <span class="search_result__name">{{singer.singer}}</span>
          </router-link>
        </li>
      </ul>
    </div>

    <!-- 专辑 -->
    <div class="search_result__sort" v-if='result.album && result.album.itemlist.length > 0'>
      <h4 class="search_result__tit tit_h4"><i class="search_result__icon_album"></i>专辑</h4>
      <ul class="search_result__list ellipsis">
        <li v-for="(album,index) in result.album.itemlist" class="ellipsis">
          <router-link :to="{name:'AlbumDetailView',params:{albummid:album.mid}}" class="search_result__link js_smartbox_album" :data-mid="album.mid"
            :data-name="album.name">
            <span class="search_result__name">{{album.name}}</span>
            <span class="search_result__singer">{{album.singer}}</span>
          </router-link>
        </li>
      </ul>
    </div>
    <!-- MV -->
    <div class="search_result__sort" v-if='result.mv && result.mv.itemlist.length > 0'>
      <h4 class="search_result__tit tit_h4"><i class="search_result__icon_mv"></i>MV</h4>
      <ul class="search_result__list ellipsis">
        <li v-for="(mv,index) in result.mv.itemlist" class="ellipsis">
          <router-link :to="{name:'MVPlayerView',params:{vid:mv.vid}}" class="search_result__link js_smartbox_mv" :data-mid="mv.vid"
            :data-name="mv.name">
            <span class="search_result__name">{{mv.name}}</span>-
            <span class="search_result__singer">{{mv.singer}}</span>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['result']
  }

</script>


<style scoped>
  .search_result__sort {
    display: flex;
  }

  .search_result__list {
    flex: 0 0 70%;
  }

  .search_result__list li {
    padding-left: 0.3rem
  }

  .search_result__link,
  .search_result__tit {
    padding: 0 0.6rem 0 0;
    line-height: 1.8rem;
    color: #999;
    font-size: 0.9rem
  }

  .search_result__name {
    color: #333;
    cursor: pointer;
  }


  .search_result__tit {
    flex: 0 0 20%;
    align-self: center;
    text-align: center
  }

  .search_result__list {
    border-left: 1px solid #d4d4d4;
    border-top: 1px solid #f2f2f2;
    padding: 5px 0;
  }
</style>