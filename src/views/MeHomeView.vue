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
        // 复原localStorage
        this.$store.dispatch('reset')
        if (navigator.serviceWorker) {
          // 卸载 service worker
          navigator.serviceWorker.getRegistrations().then(function (registrations) {
            for (let registration of registrations) {
              registration.unregister()
            }
          }).then(() => {
            // 清空文件系统
            return window.LocalFileSystem.getInstance().then(fs => fs.clear())
          }).then(() => {
            alert('清除完毕')
          })
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