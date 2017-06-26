<template>
  <div class="box">
    <div v-for="(top,index) in toplist" class="box-item align-center">
      <router-link :to='{name:"TopListDetailView",params:{topid:top.topID}}'>
        <figure>
          <div style="position:relative">
            <img class="top_pic" :src="top.pic_v12">
            <span class="play_icon" @click.stop='addToPlaying(top.topID)'>
            <play-icon height="1"></play-icon>
          </span>
          </div>
          <figcaption class="top_name">
            {{top.ListName}}
          </figcaption>
        </figure>
      </router-link>
    </div>
  </div>
</template>



<script>
  import PlayIcon from '../PlayIcon'
  export default {
    name: 'global-top-list',
    components: {
      PlayIcon
    },
    props: ['toplist'],
    methods: {
      addToPlaying: function (topID) {
        this.$emit('addToPlaying', topID)
      }
    }
  }

</script>

<style scoped>
  .box {
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    flex-wrap: wrap;
    align-content: space-between;
  }

  .box-item {
    width: 33.3%;
    justify-content: flex-start;
    text-align: left;
  }

  .top_pic {
    width: 95%
  }

  .top_name {
    font-size: 0.8rem;
  }

  .play_icon {
    position: absolute;
    bottom: 0.2rem;
    right: 0.5rem;
  }
</style>