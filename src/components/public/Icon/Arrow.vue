<template>
  <i class="arrow" :style='style'></i>
</template>

<script>
  export default {
    props: {
      border: {
        type: String,
        default: '0.05rem solid #b2b2b2'
      },
      // 大小
      size: {
        type: Number,
        default: 0.5
      },
      // 1 2 3 4 上 右 下 左
      dir: {
        type: Number,
        default: 2
      }
    },
    data() {
      return {
        style: {
          'border-right': this.border,
          'border-bottom': this.border,
          height: this.size + 'rem',
          width: this.size + 'rem',
          transform: this.getRotate()
        }
      }
    },
    methods: {
      getRotate() {
        switch (this.dir) {
          case 1:
            // 上
            return 'rotate(-135deg)'
          case 2:
            // 左
            return 'rotate(-45deg)'
          // 下
          case 3:
            return 'rotate(45deg)'
          // 下
          case 4:
            return 'rotate(135deg)'
          default:
            return 'rotate(-135deg)'
        }
      }
    }
  }

</script>

<style>
  .arrow {
    display: inline-block;
    top: 50%;
    transform: rotate(-45deg);
  }
</style>