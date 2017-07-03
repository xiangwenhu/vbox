<template>
  <div class="categorysList wrap c_bg2">
    <div class="category_info" id="js_category_tit">
      <h1 class="top_tit">情歌</h1>         
      <h1 class="category_info__tit">情歌</h1>
      <div class="category_info__media">
        <img class="category_info__img" src="https://y.gtimg.cn/music/common/upload/t_tag_group_set/49541.jpg?max_age=2592000" alt="" onerror="this.src='http://y.gtimg.cn/music/common/upload/category_default_pic/39592.png'">
      </div>
      <a class="category_info__btn js_playallsong" href="javascript:;">随机播放</a>
    </div>
    <div class="main">
      <div class="category_desc" id="js_category_desc">
      </div>
      <div class="box_justify js_category_tags">
        <h2 class="list_tit c_txt1 js_category_subtitle">情歌 (291)</h2>
        <ul class="sort c_bor1">
          <li class="sort__item c_txt3 js_category_sort" data-sort="hot">最热</li>
          <li class="sort__item c_txt1 js_category_sort" data-sort="time">最新</li>
        </ul>
      </div>
      <div class="js_category_list">
      </div>
    </div>
  </div>
</template>

<script>
  import Other from '../api/other'

  export default {
    name: 'diss-categorysListView',
    methods: {
    }
  }

</script>


<style scoped>
  @import '../assets/category_details_v2.css';

  .categorysList {
    font-size: 14px;
    height: 100%;
  }

  .c_bg2 {
    background-color: #fff;
  }

  .wrap {
    overflow: hidden;
    padding-bottom: 50px;
  }
  
</style>