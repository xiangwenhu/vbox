<template>
  <div class="diss">
    <div class="categorys_zone">
      <ul>
        <li v-for="(category,index) in hotCategorys" data-id="category.categoryId" class="categorysli categoryLi" :class='[index == 0 ? "specialLI" : ""]'>
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
        </ul>
      </div>
    </div>
  </div>
</template>
 
<script> 
  import Other from '../api/other'

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
        ]
      }
    },
    methods: {

    }
  }

</script>

<style scoped>
  em {
    font-style: normal;
  }

  .fl {
    float: left;
  }

  .fr {
    float: right;
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

</style>

