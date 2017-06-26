<template>
  <div>
    <div>
      <h3 class="diss_title align-center">热门歌单</h3>
    </div>
    <div class="mod_playlist mod_slide">

      <!-- <div class="box">
        <div class="box-item">1</div>
        <div class="box-item">2</div>
      </div> -->

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
              <h2 class = "diss-name">{{diss.dissname}}</h2>
              <div>
                <p>播放量：{{ (diss.listennum/10000).toFixed(2)}}万</p>
              </div>
            </figcaption>
          </figure>
        </div>
      </div>



    </div>
  </div>
</template>

<script>
  import PlayIcon from '../PlayIcon'
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
  .diss_title {
    color: #FFF;
    padding: 0.2rem 0;
    background-color: #345
  }

  figure img {
    width: 90%
  }

  .box {
    display: -webkit-flex;
    display: flex;
    flex-wrap:wrap;
    justify-content: center;
    align-content: space-between;
    flex:1;
  }

  .box-item {
    flex-basis: 100%;
    justify-content: center;
    flex: 1;
    background-color: #414141
  }

  figcaption {
    color: #FFF
  }

  figcaption h2 {
    font-weight: 400;
    font-size: 0.9rem
  }

  figcaption p {
    color: #999;
    font-size: 0.8rem
  }

  .diss-play-icon {
    position: absolute;
    top: 40%;
    left: 40%
  }
  .diss-name{
    padding: 0 0.1rem;
  }
</style>