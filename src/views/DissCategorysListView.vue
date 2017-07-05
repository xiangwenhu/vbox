<template>
  <div class="categorysList c_bg2">
    <div class="category_info" id="js_category_tit">
      <h1 class="top_tit">{{categoryName}}</h1>
      <h1 class="category_info__tit">{{categoryName}}</h1>
      <div class="category_info__media">
        <img class="category_info__img" src="https://y.gtimg.cn/music/common/upload/t_tag_group_set/49541.jpg?max_age=2592000" alt=""
          onerror="this.src='http://y.gtimg.cn/music/common/upload/category_default_pic/39592.png'">
      </div>
      <a class="category_info__btn js_playallsong" href="javascript:;">随机播放</a>
    </div>
    <div class="main">
      <songsList :songsList='choicenessSongList'></songsList>
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
  import SongsList from '../components/Diss/SongsList'

  export default {
    name: 'diss-categorysListView',
    components: {
      SongsList,
      InfiniteLoading
    },
    data() {
      return {
        choicenessSongList: [],
        enableLoading: true,
        sortId: 5,
        sin: 0,
        ein: 29,
        pagenum: 0,
        pagesize: 30
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
      async onInfinite() {
        try {
          let startIn = this.sin + this.pagesize * this.pagenum;
          let endIn = this.ein + this.pagesize * this.pagenum;
          let diss = await Other.dissByTag(this.$route.params.categoryId, this.sortId, startIn, endIn).then(res => res.json());
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
      }
    }
  }

</script>


<style scoped>
  @import '../assets/category_details_v2.css';

  .categorysList {
    font-size: 14px;
    height: 100%;
  }

  .c_bg2 {
    background-color: #fff;
  }

  .wrap {
    overflow: hidden;
    padding-bottom: 50px;
  }
</style>