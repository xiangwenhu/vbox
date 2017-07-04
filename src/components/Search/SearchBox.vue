<template>
  <div class="mod_search_bar">
    <div class="search_bar_cont">
      <input @focus='changeState' @keypress.stop='search' @input.stop='smartSearch' v-model="keywords" id="search_input" class="search_input"
        type="search" autocomplete="off" autocorrect="off" placeholder="搜索歌曲、歌单、专辑">
      <span class="icon icon_search">搜索</span>
    </div>
    <div @click.stop='changeState(null)' id="cancel_btn" class="search_bar_tip_text" style="display: block;">取消</div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        keywords: '',
        status: null
      }
    },
    methods: {
      search(ev) {
        if (ev.keyCode === 13) {
          this.$emit('search', this.keywords)
        }
      },
      smartSearch() {
        this.$emit('smartSearch', this.keywords)
      },
      changeState(val) {
        let cv = val !== null ? val : null
        this.status = cv
        this.$emit('status', cv)
      }
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
    height: 2rem;
    flex: 1
  }

  .mod_search_bar .search_input {
    height: 2rem;
    line-height: 2rem;
    width: 100%;
    color: rgba(0, 0, 0, .3);
    border: none;
    -webkit-appearance: none;
    font-size: 0.7rem;
    padding-left: 2rem;
  }

  .mod_search_bar .icon_search {
    position: absolute;
    top: 9px;
    left: 10px;
    width: 18px;
    height: 18px;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAJlSURBVFhH7ZfRShRRHMb3Jkqzm7wJSrqIIDBxX6C0a62H6C7oqq4ixYreQMmMHkXbjLQeIYgyQuqiyIuotKDt923fyLCszv/MzF5EDnzs2T3/7zffOXNm5myjcXDUOAOtVquJ7qOn6AP6ZamtQ33NGk/ZG8VJJtEaagf1XJ7agwEdRI9zIT7RnkdT6Iz7VaO2flPf51z9I9oDtQQDNIxeGv6Nz9voaBFcNa79bu8LsYp8+/Z75FmYN3w/nwqUB204lFiDqYzd+txlek37RFkQ3pNIjDZaKsXBeMkATfloKUjOBGMMifUbXUzmYVp3oFvJ5j0M8GbNXEtiYtJzRtOru6lwAUfhsIZQdveNR30NTPccaD5sChbCXTD7btDSUCAdmqGpsClYCHPa7CdBSyeQXgEKNBI2BQthnjX7Y9DSCfTTpkNhU7AQ7jGzd4KWvgc67EDbKYH6eclOO9BmSqBsUU+HTcFCwJcdaCVo6Vyy7LZfCJuChbAfONCdoKUTKHsw6iE2FDYWFIqFthxoLImLSZsr3fqzScZ9isUyczWZiXEC6UWoF2LaaHqcDcY4+mHmheRAMmBe8oje8nmqFOQvZwS9N2uxLEcgbUuzDdpGmZnyzLxzGG3yqm1lARxH2VZEUz6DChc6NXoia83I087pRukZyozAjqCHvv6Cf0GL6Ao655MrgNr6TX1bDqF1qO/Xcv7qobymJoA+6xpxfvTd7VVqdxcw7au1h3IwbUfn0DJ6hb6ibbSJVtzX8w9B30JVWQf/QqibVQZYm7drpg5C7TmzuZnSI6JZ2yWoAnKo61UY/5f3Dy7dC4CdAEhQAAAAAElFTkSuQmCC);
    background-repeat: no-repeat;
    background-size: cover;
    text-indent: -999px;
  }

  .mod_search_bar .search_bar_tip_text {
    padding-right: 10px;
    padding-left: 10px;
    font-size: 14px;
    height: 36px;
    line-height: 36px;
  }
</style>