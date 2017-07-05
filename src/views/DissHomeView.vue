<template>
  <div class="diss">
    <diss-categorys :hotCategorys='hotCategorys'></diss-categorys>
    <dissList :dissList='choicenessDissList' module="choiceness" @filterChanged='tagchanged'>
      <div slot="dissTitle" class="dissTitle">
        <span class="" :class="[ module == 'choiceness' ? 'dissFont' : '']">精选歌单</span>
        <span class="">
          <em class="select" data-sort="5" @click.stop='selectSort'>推荐</em>|<em class="pr0" data-sort="2" @click.stop='selectSort'>最新</em>
        </span>
      </div>
    </dissList>
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
  import DissList from '../components/Diss/DissList'

  export default {
    name: 'diss-home-view',
    components: {
      DissCategorys,
      DissList,
      InfiniteLoading
    },
    data() {
      return {
        filter: {sortId: 5},
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
        choicenessDissList: [],
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
        this.choicenessDissList.splice(0);
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
            this.choicenessDissList = this.choicenessDissList.concat(diss.data.list);
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
      selectSort(ev) {
        if (ev.target.tagName === 'EM') {
          let sortData = {sortId : ev.target.getAttribute('data-sort')};
          this.tagchanged(sortData);
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