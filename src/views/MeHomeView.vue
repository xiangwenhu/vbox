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
      async clearCache() {
        // 复原localStorage
        this.$store.dispatch('reset')
        if (navigator.serviceWorker) {
          // 卸载 service worker
          let r = await navigator.serviceWorker.getRegistrations().then(function (registrations) {
            for (let registration of registrations) {
              registration.unregister()
            }
          })
          let fs = window.LocalFileSystem.getInstance()
          if (fs && typeof fs.clear === 'function') {
            r = await fs.clear()
          }
          alert('清除成功')
        }
      },
      checkUpdate() {
        this.$store.commit('checkUpdate')
      }
    }
  }

</script>

<style scoped>

</style>