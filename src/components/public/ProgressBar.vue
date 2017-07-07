<template>
  <div :class="['innercontainer',container]">
    <div :class="['innerinner',inner]" :style="{width:progress}"></div>
    <slot></slot>
  </div>
</template>


<script>
  export default {
    name: 'progress-bar',
    props: ['container', 'inner', 'progress']
  }

</script>



<style scoped>
  .innercontainer {
    background:rgba(177, 255, 226, 0.51);
    width: 100%;
    border-radius: 999rem
  }

  .innerinner {
    height: 0.15em;   
    background-color: #333
  }
</style>