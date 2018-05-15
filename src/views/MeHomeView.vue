<template>
  <div>
    <div>
      <p class="bar-item"> 设置</p>
      <ul class="setting-list">
        <li class="item" @click.stop='clearCache'>清除缓存</li>
        <li class="item" @click.stop='checkUpdate'>检查更新</li>
      </ul>
      <hr>
      <p class="bar-item"> 扩展功能</p>
      <ul class="setting-list">
        <router-link to="/me/recorder">
          <li class="item">录制音乐</li>
        </router-link>
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
          let fs = await window.FileSystem.getInstance()
          if (fs && typeof fs.root.remove === 'function') {
            r = await fs.remove()
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