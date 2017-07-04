<template>
  <div>
    <!--搜索框 -->
    <div class="mod_search_bar">
      <back-icon class="back"> &lt; </back-icon>
      <search-box ref='sbox' :kw='keyWords' @search='search' @smartSearch='smartSearch' @status='searchStatus'></search-box>
      <div @click.stop='goSeach' id="cancel_btn" class="search_bar_tip_text" style="display: block;">取消</div>
    </div>
     <router-view></router-view>


    <!-- 热门关子健 -->
    <hot-keys :hotkeys='hotkeys' v-if='showHotKeys' @selected='search'>
      <h3 class="result_tit">热门搜索</h3>
    </hot-keys>

    <!-- smart search 智能搜索结果 -->
    <smart-search-result :result='SSResult' v-if='showSmart'></smart-search-result>

    <div class="list-wrap">


    </div>

  </div>
</template>

<script>
  import HotKeys from '../components/Search/HotKeys'
  import SearchBox from '../components/Search/SearchBox'
  import SmartSearchResult from '../components/Search/SmartSearchResult'
  import BackIcon from '../components/BackIcon'
  import { mapState, mapMutations } from 'vuex'
  import Search from '../api/search'
  import Other from '../api/other'
  export default {
    components: {
      HotKeys,
      SearchBox,
      SmartSearchResult,
      BackIcon
    },
    data() {
      return {
        ...mapState('searchHistory', {
          searchHistory: state => state.list
        }),
        hotkeys: [],
        // 显示热门关键字
        showHotKeys: true,
        // 展现智能搜索
        showSmart: false,
        // 智能搜素结果
        SSResult: null,
        // 关键字
        keyWords: null,

        // 搜索类型  0 song 1 album 2 mv 3 diss
        catType: 0,
        // 搜索结果
        results: [],
        // 页大小
        pageSize: 30,
        // 页码
        pageIndex: 0
      }
    },
    async beforeRouteUpdate(to, from, next) {
      if (to.params && to.params.keyWords !== '') {
        this.showHotKeys = false
        this.showSmart = false
        this.$refs.sbox.keyWords = to.params.keyWords
        alert()
      } else {
        this.showHotKeys = true
      }
      next()
    },
    methods: {
      ...mapMutations('searchHistory', {
        addH: 'add',
        removeH: 'remove'
      }),
      // 搜索
      search(key) {
        this.addH(key)
        this.showSmart = false
        this.showHotKeys = false
        this.$router.replace({ name: 'SearchViewWithKey', params: { keyWords: key } })
        this.pageIndex = 1
        this.executeSearch(key)
      },
      // 智能搜索
      async smartSearch(key) {
        this.showSmart = true
        let res = await Search.smartBox(key).then(res => res.json())
        this.SSResult = res.data
      },
      // 更新当然搜索的状态
      searchStatus(status) {
        this.showHotKeys = !status
        this.showSmart = true
      },
      // 返回默认搜索页
      goSeach() {
        this.showHotKeys = true
        this.showSmart = false
        this.$refs.sbox.clear()
        this.$router.replace({ name: 'SearchView' })
      },
      changeCatType(catType) {
        this.catType = catType
        // 歌单页码从0开始
        if (catType === 3) {
          this.pageIndex = 0
        }
      },
      async executeSearch(key) {
        let res = await Search.searchSongs(key, this.pageSize, this.pageIndex).then(res => res.json())
        console.log(res)
      }
    },
    async mounted() {
      let res = await Other.hotkey().then(res => res.json())
      res.data.hotkey.unshift({ k: res.data.special_key })
      this.hotkeys = res.data.hotkey
    }
  }

</script>


<style scoped>
  .result_tit {
    color: rgba(0, 0, 0, .6);
    margin-bottom: 0.4rem;
    font-weight: 300;
    font-size: 1.1rem
  }

  .mod_search_bar {
    background: #f4f4f4;
    padding: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .mod_search_bar .search_bar_tip_text {
    padding-right: 0.5rem;
    padding-left: 0.5rem;
    font-size: 0.8rem;
    height: 1.8rem;
    line-height: 1.8rem;
  }

  .back {
    width: 8%
  }
</style>