<template>
  <div class="box">
    <div class="left-side">
      {{name}}
    </div>
    <div class="right-side box">
      <div v-for="(item,index) in list" class="box-item" :class='id == item.id ?"selected":""' :data-id='item.id' @click.stop='select(item.id)'>
        {{item.name}}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'tag-grid',
    props: ['name', 'list', 'type'],
    data() {
      return { id: -99 }
    },
    methods: {
      select(id) {
        this.id = id
        this.$emit('onselect', {
          type: this.type,
          id
        })
      }
    },
    mounted() {
      this.id = this.list[0].id
    }
  }

</script>

<style scoped>
  .left-side {
    width: 20%;
    text-align: center;
    margin-top:1rem
  }

  .box {
    margin: 0.5rem auto;
  }

  .right-side {
    width: 80%
  }

  .box-item {
    width: 25%;
    border-right: 2px solid #f2f2f2;
    border-bottom: 2px solid #f2f2f2;
    box-sizing: border-box;
    text-align: center;
    line-height: 1.75rem;
  }

  .selected {
    color: #31c27c
  }
</style>