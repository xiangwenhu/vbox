<template>
  <div>
    <search-box @search='search' @smartSearch='smartSearch' @status='searchStatus'></search-box>
    <hot-keys :hotkeys='hotkeys' v-if='showHotKeys' @selected='search'>
      <h3 class="result_tit">热门搜索</h3>
    </hot-keys>
    <smart-search-result :result='SSResult'></smart-search-result>
  </div>
</template>

<script>
  import HotKeys from '../components/Search/HotKeys'
  import SearchBox from '../components/Search/SearchBox'
  import SmartSearchResult from '../components/Search/SmartSearchResult'
  import { mapState, mapMutations } from 'vuex'
  import Search from '../api/search'
  import Other from '../api/other'
  export default {
    components: {
      HotKeys,
      SearchBox,
      SmartSearchResult
    },
    data() {
      return {
        ...mapState('searchHistory', {
          searchHistory: state => state.list
        }),
        hotkeys: [],
        showHotKeys: true,
        SSResult: null,
        keyWords: null
      }
    },
    methods: {
      ...mapMutations('searchHistory', {
        addH: 'add',
        removeH: 'remove'
      }),
      search(key) {
        this.addH(key)
      },
      async smartSearch(key) {
        let res = await Search.smartBox(key).then(res => res.json())
        this.SSResult = res.data      
      },
      searchStatus(status) {
        this.showHotKeys = !status
      }
    },
    async created() {
      let res = await Other.hotkey().then(res => res.json())
      res.data.hotkey.unshift({ k: res.data.special_key })
      this.hotkeys = res.data.hotkey
    },
    async mounted() {

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
</style>