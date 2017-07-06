<template>
  <a class="box" :style='bStyle'>
    <i class="icon" :style='iStyle'></i>
    <i class="icon" :style='iStyle'></i>
    <i class="icon" :style='iStyle'></i>
  </a>
</template>


<script>
  export default {
    props: {
      height: {
        type: Number,
        default: 1
      },
      width: {
        type: Number,
        default: 1
      },
      lineHeight: {
        type: Number,
        default: 0.1
      },
      color: {
        type: String,
        default: '#FFF'
      }
    },
    data() {
      return {
        bStyle: {
          height: this.height + 'rem',
          width: this.width + 'rem'
        },
        iStyle: {
          background: this.color,
          height : this.lineHeight + 'rem'
        }
      }
    }
  }

</script>


<style scoped>
  .box {
    flex-direction: column;
    justify-content: space-between
  }

  .icon {   
    width: 100%;    
  }
</style>