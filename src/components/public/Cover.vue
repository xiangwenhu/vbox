<template>
  <div class="mod-focus">

    <div class="focus-body">
      <div class="focus-info">
        <slot></slot>
      </div>
    </div>

    <div class="focus-bg" :style="bgStyle"></div>
    <div class="focus-gradient" :style="{color: color}"></div>
  </div>
</template>


<script>
  export default {
    props: {
      color: {
        type: String,
        default: '#000'
      },
      bgImage: {
        type: String,
        default: null
      }
    },
    computed: {
      bgStyle() {
        return {
          'background-image': this.bgImage ? `url("${this.bgImage}?max_age=2592000")` : ''
        }
      }
    }
  }

</script>

<style scoped>
  .mod-focus {
    position: relative;
    overflow: hidden;
  }

  .focus-gradient {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 2;
    width: 100%;
    background-image: -webkit-linear-gradient(top, transparent, currentColor 80%);
    background-image: linear-gradient(top, transparent, currentColor 80%);
  }

  .focus-gradient::after {
    content: "";
    display: block;
    padding-top: 60%;
  }

  .focus-bg {
    background-repeat: no-repeat;
    background-position: top center;
    background-size: cover;
  }

  .focus-bg::after {
    content: "";
    display: block;
    padding-top: 100%;
  }

  .focus-body {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 3;
  }

  .focus-info {
    display: flex;
    margin: 0 15px 25px;
  }
</style>