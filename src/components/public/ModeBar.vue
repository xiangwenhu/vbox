<template>
  <div class="mod-bar">
    <back-link class="back"> </back-link>
    <div class="flex-flex"> </div>
    <slot></slot>
  </div>
</template>

<script>
  import BackLink from './BackLink'
  export default {
    components: {
      BackLink
    }
  }

</script>

<style scoped>
  .mod-bar {
    padding: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    background-image: linear-gradient(270deg, #31c27c, #20bc22);
    min-height: 1.4rem;
  }

  .back {
    width: 8%;
    display: flex;
    justify-content: center;
  }
</style>