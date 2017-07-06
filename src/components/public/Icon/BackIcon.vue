<template>
  <div @click.stop='back'>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    methods: {
      back() {
        this.$router.go(-1)
      }
    }
  }

</script>