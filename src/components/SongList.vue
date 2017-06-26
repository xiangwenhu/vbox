<template>
  <ul class="mod_song_list border_t c_bor1 songlist">
    <li v-for="(song,index) in songs" class="song_list__item  js_playsong" :data-id="song.songid" :data-songmid="song.songmid"
      :data-type="song.type">
      <a class="song_list__box" href="javascript:;">
        <div class="song_list__body border_b c_bor1">
          <h3 class="song_list__tit c_txt1">{{song.songname}}</h3>
          <p class="song_list__desc c_txt2">{{song.singer.map(s=>s.name).join('/')}} · {{song.albumname}}
            <span style="position:absolute;right:0.2rem">
              <input @click='add(song)' type="button" value="添加">
              <input @click='play(song)' type="button" value="播放">
            </span></p>
        </div>
      </a>
    </li>
  </ul>
</template>

<script>
  export default {
    name: 'song-list',
    props: ['songs'],
    methods: {
      add(song) {
        this.$store.commit('playing/addSong', song)
      },
      play(song) {
        this.$store.commit('playing/addSong', song)
        this.$store.commit('playing/next', song)
      }
    }
  }

</script>

<style>
  .c_txt1 {
    color: #fff;
  }

  .song_list__tit {
    line-height: 1.5rem;
    font-size: 1rem;
    font-weight: 400;
  }

  .c_txt2 {
    color: rgba(255, 255, 255, .6);
  }

  .song_list__desc {
    display: -webkit-box;
    -webkit-box-align: center;
    font-size: 0.8rem;
  }

  .song_list__box {
    display: -webkit-box;
    height: 4rem;
    padding-left: 0.6rem;
  }
</style>