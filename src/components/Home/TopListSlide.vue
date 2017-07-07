<template>
  <div id="toplist_box">
    <div v-for="(top,i) in toplist" class="topitem">
      <div class="box">
        <div class="box-item box-item-1">
          <router-link :to='{name:"TopListDetailView",params:{topid:top.topID}}' class="songlist__cover album_name" :data-id="top.topID"
            style="position:relative">
            <img onerror="this.src='//y.gtimg.cn/mediastyle/global/img/album_300.png?max_age=31536000';this.onerror=null;" :src="top.pic_v12"
              alt="" class="songlist__pic" style="display: inline; visibility: visible;">
            <span class="small-play-icon" @click.stop='addToPlaying(top.topID)'>
                <play-icon height='1.5'></play-icon>
              </span>
          </router-link>
        </div>
        <div class="box-item box-item-2 ellipsis">
          <router-link :to='{name:"TopListDetailView",params:{topid:top.topID}}' class="songlist__cover album_name" :data-id="top.topID"
            style="position:relative">
            <div style="position:relative;display:flex">
              <ul class='t-song-list ellipsis'>
                <li v-for="(song,index) in top.songlist" class="songitem ellipsis">
                  <span class="tit">{{index+1}} {{song.songname}}</span> <span class="tit2">-{{song.singername}}</span>
                </li>
              </ul>
              <div class="arrow-more">
                <arrow-icon></arrow-icon>
              </div>
            </div>
          </router-link>
        </div>
      </div>

    </div>
    <!--
      <swiper :options="swiperOption" class="swiper-box">
        <swiper-slide v-for="(top,index) in toplist" class="swiper-item">
          <div :style='{"background-color":bgColors[index]}'>
            <h3 class="align-center">
              <div class="toplist__tit_pop">{{top.ListName.split('\·').reverse()[0].substr(0,2)}}</div>
            </h3>
            <ul>
              <li v-for="(song,i) in top.songlist">
                <p>{{i + 1}} {{song.songname}}</p>
                <p>{{song.singername}}</p>
              </li>
            </ul>
          </div>
        </swiper-slide>
        
      </swiper> -->

  </div>
  </div>
</template>

<script>
  import PlayIcon from '../public/Icon/PlayIcon'
  import Arrow from '../public/Icon/Arrow'
  export default {
    name: 'top-list-slide',
    components: {
      PlayIcon,
      'arrow-icon': Arrow
    },
    data() {
      return {
        bgColors: ['rgb(2,171,114)', 'rgb(0,106,163)', 'rgb(233,163,63)', 'rgb(1,172,144)'],
        swiperOption: {
          pagination: '.swiper-pagination',
          direction: 'horizontal',
          slidesPerView: 1,
          paginationClickable: true,
          spaceBetween: 30,
          mousewheelControl: true
        }
      }
    },
    props: ['toplist'],
    methods: {
      addToPlaying(topID) {
        this.$emit('addToPlaying', topID)
      }
    }
  }

</script>

<style scoped>
  #toplist_box {
    color: #FFF;
  }

  .songitem {
    line-height: 1.5rem;
    max-width: 85%;
  }

  .box-item-1 {
    flex: 0 0 7rem;
    display: flex
  }

  .box-item-2,
  .t-song-list {
    flex: 1
  }

  .t-song-list {
    color: #666
  }

  .songlist__pic {
    width: 6rem
  }

  .small-play-icon {
    position: absolute;
    bottom: 0.2rem;
    right: 0.2rem;
  }

  .arrow-more {
    flex: 0 0 2rem;
    align-self: center;
  }
</style>