<template>
  <div @click.stop='back'>
    <arrow-icon :dir='4' border='0.1rem solid #FFF'></arrow-icon>
  </div>
</template>

<script>
  import Arrow from './Icon/Arrow'
  export default {
    components: {
      'arrow-icon': Arrow
    },
    methods: {
      back() {
        this.$router.go(-1)
      }
    }
  }

</script>