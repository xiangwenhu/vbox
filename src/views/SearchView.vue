<template>
  <div>
    <div class="mod_search_bar">
      <div class="search_bar_cont">
        <input id="search_input" class="search_input" type="search" autocomplete="off" autocorrect="off" placeholder="搜索歌曲、歌单、专辑">
        <span class="icon icon_search">搜索</span>
      </div>
    </div>
    <hot-keys :hotkeys='hotkeys' v-if='showHotKeys' @selected='search'>
      <h3 class="result_tit">热门搜索</h3>
    </hot-keys>
  </div>
</template>

<script>
  import HotKeys from '../components/Search/HotKeys'
  import Search from '../api/search'
  import Other from '../api/other'
  export default {
    components: {
      HotKeys
    },
    data() {
      return {
        hotkeys: [],
        showHotKeys: true
      }
    },
    methods: {
      search(key) {

      }
    },
    async created() {
      let res = await Other.hotkey().then(res => res.json())
      this.hotkeys = res.data.hotkey
    }
  }

</script>


<style scoped>
  .mod_search_bar {
    background: #f4f4f4;
    padding: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1
  }

  .mod_search_bar .search_bar_cont {
    position: relative;
    border-radius: 3px;
    background: #fff;
    height: 1.2rem;
    flex: 1
  }

  .mod_search_bar .search_input {
    height: 1rem;
    line-height: 1rem;
    width: 100%;
    color: rgba(0, 0, 0, .3);
    border: none;
    -webkit-appearance: none;
    font-size: 0.7rem;
  }

  .mod_search_bar .icon_search {
    position: absolute;
    top: 9px;
    left: 10px;
    width: 18px;
    height: 18px;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAAXNSR…f/QqibVQZYm7drpg5C7TmzuZnSI6JZ2yWoAnKo61UY/5f3Dy7dC4CdAEhQAAAAAElFTkSuQmCC);
    background-repeat: no-repeat;
    background-size: cover;
    text-indent: -999px;
  }

  .result_tit {
    color: rgba(0, 0, 0, .6);
    margin-bottom: 0.4rem;
    font-weight: 300;
    font-size: 1.1rem
  }
</style>