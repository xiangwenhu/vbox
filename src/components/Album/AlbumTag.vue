<template>
  <div>{{JSON.stringify(tag)}}</div>
</template>

<script>
  export default {
    name: 'album-tag',
    props: ['tag']
  }

</script>