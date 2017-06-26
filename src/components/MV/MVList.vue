<template>
  <div class="mv-list box">
    <div v-for="(mv,index) in mvs" class="box-item box-item-mv">
      <figure class="album">
        <div>
          <img class="mv_pic" :src='mv.pic' alt="" />
        </div>
        <figcaption>
          <p class="album_title">{{mv.title}}</p>
          <p class="album_listen">{{(mv.listenCount/10000).toFixed(2)}}万</p>
        </figcaption>
      </figure>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'mv-list',
    props: ['mvs']
  }

</script>

<style scoped>
  .box-item-mv {
    flex-basis: 50%;
    flex-direction: row;
  }

  .mv_pic {
    width: 100%
  }
  .album{
    padding: 0 0.2rem
  }

  .album_title{
    font-size: 0.8rem
  }

  .album_listen{
    font-size: 0.7rem;
    color: #999
  }
</style>