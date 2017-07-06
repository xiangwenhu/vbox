<template>
  <span class="icon_close" :style='style'></span>
</template>

<script>
  export default {
    props: {
      size: {
        type: Number,
        default: 1
      }
    },
    data() {
      return {
        style: {
          'font-size': this.size + 'rem'
        }
      }
    }
  }

</script>


<style scoped>
  .icon_close {
    position: relative
  }

  .icon_close:before {
    width: 1em;
    height: 0.05em;
    top: 0.5em;
  }

  .icon_close:before,
  .icon_close:after {
    position: absolute;
    content: "";
    transform: rotate(45deg);
    background: rgba(0, 0, 0, .6)
  }

  .icon_close:after {
    width: 0.05em;
    height: 1em;
    left: 0.5em;
  }
</style>