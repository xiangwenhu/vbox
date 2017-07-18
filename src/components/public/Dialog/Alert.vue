<template>
  <div>
    <div>
      <p class="dg-title">{{title}}</p>
    </div>
    <div>
      <p class="dg-content">{{content}}}</p>
    </div>
  </div>
</template>


<script>
  export default {
    props: {
      title: {
        type: String
      },
      content: {
        type: String
      }
    }   
  }

</script>