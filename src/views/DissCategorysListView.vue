<template>
  <div class="categorysList c_bg2">
    <div class="category_info" id="js_category_tit">
      <h1 class="category_info__tit">{{categoryName}}</h1>
      <div class="category_info__media">
        <img class="category_info__img" src="https://y.gtimg.cn/music/common/upload/t_tag_group_set/49541.jpg?max_age=2592000" alt=""
          onerror="this.src='http://y.gtimg.cn/music/common/upload/category_default_pic/39592.png'">
      </div>
      <a class="category_info__btn js_playallsong" href="javascript:;">随机播放</a>
    </div>
    <div class="main">
      <dissList :dissList='choicenessDissList'>
        <div slot="dissTitle" class="dissTitle">
          <span class="diss-content-t">精选歌单</span>
          <span class="diss-content-t">
            <em class="select" data-sort="5" @click.stop='selectSort'>推荐</em>|<em class="pr0" data-sort="2" @click.stop='selectSort'>最新</em>
          </span>
        </div>
      </dissList>
    </div>
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
  import DissList from '../components/Diss/DissList'

  export default {
    name: 'diss-categorysListView',
    components: {
      DissList,
      InfiniteLoading
    },
    data() {
      return {
        choicenessDissList: [],
        enableLoading: true,
        sortId: 5,
        sin: 0,
        ein: 29,
        pagenum: 0,
        pagesize: 30,
        filter: {sortId: 5}
      }
    },
    computed: {
      categoryId() {
        return this.$route.params.categoryId;
      },
      categoryName() {
        return this.$route.query.categoryName;
      }
    },
    async created() {
      // let diss = await Other.dissByTag(this.$route.params.categoryId).then(res => res.json())
      // if (diss.code === 0) {
      //   this.choicenessSongList = diss.data.list;
      // }
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
          let diss = await Other.dissByTag(this.$route.params.categoryId, this.filter.sortId, startIn, endIn).then(res => res.json());
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
  @import '../assets/category_details_v2.css';

  .categorysList {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .c_bg2 {
    background-color: #fff;
  }
  
  .diss-content-t{
    line-height: 2rem;
    padding-left: 0.2rem
  }
  
</style>