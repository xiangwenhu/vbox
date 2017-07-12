<template>
  <div>
    <div>
      <p class="bar-item"> 设置</p>
      <ul class="setting-list">
        <li class="item" @click.stop='clearCache'>清除缓存</li>
        <li class="item" @click.stop='checkUpdate'>检查更新</li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      clearCache() {
        this.$store.dispatch('reset')
        alert('清除完毕')
      },
      checkUpdate() {
        this.$store.commit('checkUpdate')
      }
    }
  }

</script>

<style scoped>

</style>