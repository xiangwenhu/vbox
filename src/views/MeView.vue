<template>
  <div>
    <mode-bar></mode-bar>
    <transition name="slide-right" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import ModeBar from '../components/public/ModeBar'
  export default {
    components: {
      ModeBar
    }
  }

</script>