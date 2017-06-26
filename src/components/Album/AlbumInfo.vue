<template>
  <div class="mod_focus">
    <div class="focus__body" id="header_block">
      <div class="focus__info">
        <div class="focus__text">
          <h1 class="focus__tit c_txt1" id="album_name">
            <div class="js_marquee" style="float: left; white-space: nowrap; text-overflow: ellipsis;">{{album.albumName}}</div>
          </h1>
          <p class="focus__desc c_txt1"><span class="focus__gap js_opensinger" id="album_singername">洛天依</span><span class="focus__gap" id="album_pubtime">2017-06-15</span>
            <span
              class="focus__gap" id="album_genre">Pop 流行</span>
          </p>
        </div>
        <a class="focus__play c_ico1 js_playallsong" href="javascript:;"><span class="focus__play_text">播放</span></a>
      </div>
    </div>
    <div class="focus__bg" id="album_bgimg" style="background-image: url(&quot;https://y.gtimg.cn/music/photo/mid_album_500/N/H/004WJ7Yo421SNH.jpg&quot;);"></div>
    <div class="focus__gradient c_gradient" style="color: rgb(0, 0, 32);"></div>
  </div>
</template>

<script>
  export default {
    name: 'album-info',
    props: ['album']
  }

</script>


<style scoped>

</style>