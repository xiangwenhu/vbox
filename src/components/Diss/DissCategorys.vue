<template>
  <div class="categorys_zone">
    <ul class="ulbox">
      <li v-for="(category,index) in hotCategorys" :data-id="category.categoryId" class="categorysli categoryLi" :class='[index == 0 ? "specialLI" : ""]'>
        <router-link :to="{name:'DissCategorysListView',params:{categoryId:category.categoryId}, query:{categoryName:category.categoryName}}" >{{category.categoryName}}</router-link>
      </li>
      <li class="categorysli allCategory">查看全部分类 ></li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'diss-categorys',
    props: ['hotCategorys'],
    methods: {
    }
  }

</script>


<style scoped>
  a {
      color: #333;
      text-decoration: none;
  }

  .ulbox{
    width: 20rem;
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
</style>