<template>
  <div class="mv-list box">
    <div v-for="(mv,index) in mvs" class="box-item box-item-mv">
      <figure class="album">
        <div>
          <router-link :to="{name:'MVPlayerView',params:{vid:mv.vid}}">
            <img class="mv_pic" v-lazy='mv.pic' alt="" />
          </router-link>
        </div>
        <figcaption>
          <p class="tit">{{mv.title}}</p>
          <p class="desc" v-if='!mv.type || mv.type == 2'>{{ mv.listenCount | tt}}万</p>
          <p v-else class="desc">{{ mv.listenCount }}</p>
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

  .album {
    padding: 0 0.2rem
  }

  .album_title {
    font-size: 0.8rem
  }

  .album_listen {
    font-size: 0.7rem;
    color: #999
  }
</style>