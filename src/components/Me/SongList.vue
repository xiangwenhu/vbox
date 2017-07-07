<template>
  <div class="box-col">
    <div v-for="(item,index) in llist" class="item">
      <span class="i-name">{{item}}</span>
      <span class="i-singer">{{item}}</span>
      <span class="i-op">{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['list'],
    data() {
      return {
        llist: [1, 2, 3, 4]
      }
    }
  }

</script>


<style scoped>
  .item {
    width: 100%;
    display: flex
  }
</style>