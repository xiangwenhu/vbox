<template>
  <a href="javascript:;" class="focus__play c_ico1 js_playallsong" :style='styleouter'>
    <span  class="focus__play_inner" :style='styleinner'></span>
  </a>
</template>


<script>
  export default {
    name: 'play-icon',
    props: {
      height: {
        default: 2
      }
    },
    data() {
      return {
        styleouter: {
          width: this.height + 'rem',
          height: this.height + 'rem',
          border: 'solid ' + (this.height / 2) * 0.1 + 'rem'
        },
        styleinner: {
          top: (this.height * 0.25).toFixed(2) + 'rem',
          left: (this.height * 0.375).toFixed(2) + 'rem',
          'border-width': (this.height * 0.25).toFixed(2) + 'rem ' + (this.height * 0.375).toFixed(2) + 'rem'
        }
      }
    }
  }

</script>


<style>
  .c_ico1 {
    color: #FFF
  }

  .focus__play {
    position: relative;
    display: inline-block;
    border-radius: 999px;
  }

  .focus__play_inner {
    content: "";
    position: absolute;
    height: 0;
    border-color: transparent transparent transparent currentColor;
    border-style: solid;
  }
</style>