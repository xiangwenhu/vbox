<template>
  <div class="tag-select">
    <div class="tag-operation">
      <span @click.stop='confirm(true)'>确认</span>
      <span @click.stop='confirm(false)'>关闭</span>
    </div>
    <div v-if='!!tags'>
      <tag-grid :list='tags.area' :name='"地区"' :type='"area"' @onselect='onselect'></tag-grid>
      <tag-grid :list='tags.tag' :name='"类型"' :type='"tag"' @onselect='onselect'></tag-grid>
      <tag-grid :list='tags.year' :name='"年份"' :type='"year"' @onselect='onselect'></tag-grid>
    </div>

  </div>
</template>

<script>
  import TagGrid from '../public/TagGrid'
  export default {
    name: 'mv-tag',
    components: {
      TagGrid
    },
    props: ['tags'],
    data() {
      return {
        area: undefined,
        tag: undefined,
        year: undefined
      }
    },
    methods: {
      // 子组件选择了某个分类别
      onselect(data) {
        this[data.type] = data.id
      },
      // 向父组件提交所有的分类别
      confirm(confirmed = true) {
        this.$emit('confirmed', {
          confirmed,
          tag: {
            area: this.area || this.tags.area[0].id,
            tag: this.tag || this.tags.tag[0].id,
            year: this.year || this.tags.year[0].id
          }
        })
      }
    }
  }

</script>

<style scoped>
  .tag-operation {
    text-align: center;
    margin-top: 1rem;
  }
  .tag-operation span {
    /* line-height: 1.6rem; */
    font-size: 1rem;
    letter-spacing: 0.2rem;
    /* margin: 1.1rem; */
    height: 1.6rem;
    display: inline-block;
    padding: 0.1rem 0.2rem;
    border-bottom: 2px solid #f2f2f2;
  }  

  .tag-select {
    font-size: 0.8rem;
    color: #535353;
  }
</style>