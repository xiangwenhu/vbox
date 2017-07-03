<template>
  <div class="mod_search_result">
    <slot></slot>
    <div class="result_tags">
      <a v-for="(hot,index) in hotkeys" class="js_keyword tag_s" @click.stop='selected(hot.k)'>{{hot.k}}</a>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      hotkeys: {
        type: Array,
        default: []
      }
    },
    methods: {
      search(key) {
        this.$emit('selected', key)
      }
    }
  }

</script>

<style scoped>
  .mod_search_result {
    background: #fff;
    padding: 15px 15px 10px 15px;
  }

  .result_tags {
    margin-top: 0.2rem
  }

  .tag_hot {
    color: #fc4524;
    border-color: #fc4524;
  }

  .tag_s {
    display: inline-block;
    font-size: 0.8rem;
    padding: 0 0.5rem;
    height: 1.5rem;
    line-height: 1.5rem;
    color: #000;
    border: 1px solid rgba(0, 0, 0, .6);
    border-radius: 99px;
    word-break: keep-all;
    margin-bottom: 0.5rem;
    margin-right: 0.7rem;
  }
</style>