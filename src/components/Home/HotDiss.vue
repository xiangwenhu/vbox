<template>
  <div>
    <slot></slot>
    <div class="mod_playlist mod_slide">

      <div v-for="(dissItem,index) in hotdiss">
        <div v-if='index%2 == 0' class="box">
          <figure class="box-item align-center" v-for="(diss,i) in [dissItem,hotdiss[index+1]]">
            <div style="position:relative">
              <router-link :to='"/pages/diss/detail" + diss.dissid'>
                <img :src="(diss.imgurl||'').replace('300\?n=1','150\?n=1')" alt="diss.dissname" />
              </router-link>
              <span class="diss-play-icon" @click.stop='addToPlaying(diss.dissid)'> <play-icon height='2'></play-icon></span>
            </div>
            <figcaption>
              <h2 class="diss-name tit">{{diss.dissname}}</h2>
              <div>
                <p class="tit2">播放量：{{ diss.listennum | tt}}万</p>
              </div>
            </figcaption>
          </figure>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import PlayIcon from '../public/Icon/PlayIcon'
  export default {
    name: 'hot-diss',
    props: ['hotdiss'],
    components: {
      PlayIcon
    },
    methods: {
      addToPlaying(dissid) {
        this.$emit('addDissToPlaying', dissid)
      }
    }
  }

</script>

<style scoped>

  figure img {
    width: 90%
  }

  .box-item {  
    justify-content: center;
    flex: 1;
    margin-top: .3rem
  }

  figcaption {
    color: #FFF;
    text-align: left;
    padding: 0 5%
  }

  figcaption h2 {
    font-weight: 400;
  }

  .diss-play-icon {
    position: absolute;
    bottom: 2%;
    right: 7%
  }
 
</style>