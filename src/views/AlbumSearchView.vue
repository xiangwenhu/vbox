<template>
  <div>
    <div class="tag-hd">
      <div class="tag-sort">
        <span :class='["sort-type", sortType == 1 ? "tag-select":""]' @click.stop='changeSortType(1)'>最新</span>
        <span :class='["sort-type", sortType == 2 ? "tag-select":""]' @click.stop='changeSortType(2)'>最热</span>
        <span class="more_filter">三</span>
      </div>
    </div>

    <album-list :albums='albums' @addAlbumToPlaying='addAlbumToPlaying'></album-list>

    <infinite-loading :on-infinite="onInfinite" ref="infiniteLoading" spinner='bubbles'>
      <span slot="no-more" class="no-more">
        没有更多了
     </span>
    </infinite-loading>
  </div>
</template>

<script>
  import InfiniteLoading from 'vue-infinite-loading'
  import AlbumList from '../components/Album/AlbumList'
  import Search from '../api/search'
  export default {
    name: 'album-search-view',
    data() {
      return {
        // 从0开始
        page: 0,
        pagesize: 30,
        sortType: 1,
        tag: {
          // 语种
          language: -1,
          // 流派
          genre: 0,
          // 年代
          year: 1,
          // 1 免费  2 免费
          pay: 0,
          // 专辑/演唱会等
          type: -1,
          // 唱片公司 华纳唱片/环球唱片等
          company: -1
        },
        sum: 100,
        albums: []
      }
    },
    components: {
      InfiniteLoading,
      AlbumList
    },
    methods: {
      async onInfinite() {
        try {
          let res = await Search.albumLib(this.page === 0 ? 'firstpage' : 'get_album_info', this.page, this.pagesize, this.sortType, this.language,
            this.genre, this.year, 0, this.type, this.company).then(res => res.json());
          this.albums = this.albums.concat(res.data.albumlist.map(album => {
            album.albumMID = album.album_mid
            album.albumName = album.album_name
            return album
          }))
          this.num = res.data.sum
          if (this.albums.length < this.sum) {
            this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded')
          } else {
            this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete')
          }
          this.page++
        } catch (err) {
          alert(err);
          this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete')
        }
      },
      changeSortType(sortType) {
        this.sortType = sortType
      },
      resetInfiniteLoading() {
        this.page = 0
        this.enableLoading = true
        this.albums = []
        this.$refs.infiniteLoading.isLoading = true
        this.onInfinite();
      },
      async addAlbumToPlaying(albumMID) {
        console.log('addAlbumToPlaying')
        let res = await Search.albumInfo(albumMID).then(res => res.json())
        this.$store.commit('playing/addSongs', res.data.list)
        this.$store.commit('playing/next', res.data.list[0])
      }
    },
    watch: {
      tag: {
        handler: async function (to) {
          this.resetInfiniteLoading();
        },
        deep: true
      },
      sortType() {
        this.resetInfiniteLoading()
      }
    }

  }

</script>


<style scoped>
  .tag-hd {
    position: relative;
    height: 2rem;
  }

  .tag-sort {
    position: absolute;
    right: 0
  }

  .sort-type {
    display: inline-block;
    padding: 0.2rem 0.4rem;
    height: 1.2rem;
    position: relative;
    font-size: 0.8rem;
    border-width: 1px;
    border-style: solid;
    border-color: #c9c9c9;
  }

  .tag-select {
    background-color: #31c27c;
    color: #fff;
    border-color: #31c27c;
    z-index: 2;
  }

  .more_filter {
    padding: 0.2rem 0.4rem;
    height: 1.2rem;
  }
</style>