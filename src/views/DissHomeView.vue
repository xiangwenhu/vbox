<template>
  <div class="diss">
    <diss-categorys :hotCategorys='hotCategorys'></diss-categorys>
    <songsList :songsList='choicenessSongList' module="choiceness" @filterChanged='tagchanged'></songsList>
    <infinite-loading :on-infinite="onInfinite" ref="infiniteLoading" spinner='bubbles' v-if='enableLoading'>
      <span slot="no-more" class="no-more">没有更多了</span>
    </infinite-loading>
    <p slot="no-more" class="no-more" style="font-size:0.7rem;width:100%;text-align:center" v-if='!enableLoading'>
      没有更多了
    </p>
  </div>
</template>

<script>
  import InfiniteLoading from 'vue-infinite-loading'
  import Other from '../api/other'
  import DissCategorys from '../components/Diss/DissCategorys'
  import SongsList from '../components/Diss/SongsList'

  export default {
    name: 'diss-home-view',
    components: {
      DissCategorys,
      SongsList,
      InfiniteLoading
    },
    data() {
      return {
        filter: {},
        hotCategorys: [
          { 'categoryId': 39, 'categoryName': 'ACG' },
          { 'categoryId': 148, 'categoryName': '情歌' },
          { 'categoryId': 199, 'categoryName': '背景音乐' },
          { 'categoryId': 133, 'categoryName': '影视' },
          { 'categoryId': 52, 'categoryName': '伤感' },
          { 'categoryId': 15, 'categoryName': '轻音乐' },
          { 'categoryId': 167, 'categoryName': '英语' },
          { 'categoryId': 24, 'categoryName': '电子' },
          { 'categoryId': 194, 'categoryName': '古风' },
          { 'categoryId': 141, 'categoryName': 'KTV热歌' },
          { 'categoryId': 197, 'categoryName': '现场音乐' }
        ],
        choicenessSongList: [],
        enableLoading: true,
        categoryId: 10000000,
        sortId: 5,
        sin: 0,
        ein: 29,
        pagenum: 0,
        pagesize: 30
      }
    },
    methods: {
      // 搜索条件变化
      tagchanged: function (filter) {
        this.choicenessSongList.splice(0);
        this.filter = filter;
      },
      async onInfinite() {
        try {
          let startIn = this.sin + this.pagesize * this.pagenum;
          let endIn = this.ein + this.pagesize * this.pagenum;
          let diss = await Other.dissByTag(this.categoryId, this.filter.sortId, startIn, endIn).then(res => res.json());
          this.pagenum++;
          /** 结束条数大于最大条数时停止下拉加载 */
          if (diss.code === 0 && endIn < diss.data.sum) {
            this.choicenessSongList = this.choicenessSongList.concat(diss.data.list);
            this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded')
          } else {
            this.enableLoading = false
            this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete')
          }
        } catch (err) {
          this.enableLoading = false
          if (this.$refs.infiniteLoading) {
            this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete')
          }
        }
      },
      addToPlaying() {
        this.$emit('addAlbumToPlaying', '')
      }
    },
    watch: {
      filter: {
        handler: async function (to) {
          this.pagenum = 0;
          this.enableLoading = true;
          this.$refs.infiniteLoading.isLoading = true;
          this.onInfinite();
        },
        deep: true
      }
    }
  }

</script>

<style scoped>
  .diss {
    font-size: 14px;
    height: 100%;
  }
</style>