<template>
  <div class="Singer">
    <singer-tag @filterChanged='tagchanged'></singer-tag>
    <singer-list :singers='singers'></singer-list>
    <infinite-loading :on-infinite="onInfinite" ref="infiniteLoading" spinner='bubbles' v-if='enableLoading'>
    </infinite-loading>
    <p slot="no-more" class="no-more" style="font-size:1rem;width:100%;text-align:center" v-if='!enableLoading'>
      没有更多了
    </p>
  </div>
</template>

<script>
  import InfiniteLoading from 'vue-infinite-loading'
  import SingerTag from '../components/singer/SingerTag'
  import SingerList from '../components/singer/SingerList'
  import Search from '../api/search'
  export default {
    name: 'singer-search-view',
    data() {
      return {
        filter: {},
        singers: [],
        pagenum: 0,
        pagesize: 100,
        enableLoading: true
      }
    },
    components: {
      SingerTag,
      SingerList,
      InfiniteLoading
    },
    methods: {
      // 搜索条件变化
      tagchanged: function (filter) {
        this.singers.splice(0)
        this.filter = filter
      },
      async onInfinite() {
        try {
          this.pagenum++
          let res = await Search.singers(this.filter.area, this.filter.letter, this.pagenum, this.pagesize).then(res => res.json())
          this.singers = this.singers.concat(res.data.list)
          if (this.pagenum < res.data.total_page) {
            this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded')
          } else {
            this.enableLoading = false
            this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete')
          }
        } catch (err) {
          console.log(err)
          this.enableLoading = false
          if (this.$refs.infiniteLoading) {
            this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete')
          }
        }
      }
    },
    watch: {
      filter: {
        handler: async function (to) {
          this.pagenum = 0
          // let res = await Search.singers(to.area, to.letter).then(res => res.json())
          // this.singers = res.data.list
          this.enableLoading = true
          this.$refs.infiniteLoading.isLoading = true
          this.onInfinite();
        },
        deep: true
      }
    }
  }

</script>