<template>
  <a href="javascript:;" class="focus__add c_ico" :style='styleouter'>
    <span  class="focus__add_h" :style='styleinner_h'></span>
    <span  class="focus__add_v" :style='styleinner_v'></span>
  </a>
</template>


<script>
  export default {
    name: 'add-icon',
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
        styleinner_h: {
          top: (this.height * 0.48).toFixed(2) + 'rem',
          left: (this.height * 0.1).toFixed(2) + 'rem',
          width: (this.height * 0.8).toFixed(2) + 'rem',
          height: (this.height * 0.05).toFixed(2) + 'rem'
        },
        styleinner_v: {
          top: (this.height * 0.1).toFixed(2) + 'rem',
          left: (this.height * 0.48).toFixed(2) + 'rem',
          width: (this.height * 0.05).toFixed(2) + 'rem',
          height: (this.height * 0.8).toFixed(2) + 'rem'
        }
      }
    }
  }

</script>


<style>
  .c_ico {
    color: #FFF
  }

  .focus__add {
    position: relative;
    display: inline-block;
    border-radius: 999px;
  }

  .focus__add_h,
  .focus__add_v {
    position: absolute;
    background-color: #FFF
  }
</style>