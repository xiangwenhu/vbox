<template>

  <div class="search_bar_cont">
    <input @focus='changeState(true)' @keypress.stop='search' @input.stop='smartSearch' id="search_input" class="search_input"
      type="search" autocomplete="off" autocorrect="off" placeholder="搜索歌曲、歌单、专辑" :value="keyWords">
    <span class="icon icon_search">搜索</span>
  </div>

</template>

<script>
  export default {
    data() {
      return {
        keyWords: '',
        status: null
      }
    },
    methods: {
      search(ev) {
        if (ev.keyCode === 13) {
          this.$emit('search', this.keyWords)
        }
      },
      smartSearch(ev) {
        this.keyWords = ev.target.value
        this.$emit('smartSearch', this.keyWords)
      },
      changeState(val) {
        this.$emit('status', val)
      },
      clear() {
        this.keyWords = ''
      }
    }
  }

</script>

<style scoped>
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
</style>