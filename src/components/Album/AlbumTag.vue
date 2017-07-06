<template>
  <div class="tag-select">
    <div class="tag-operation">
      <span @click.stop='confirm(true)'>确认</span>
      <span @click.stop='confirm(false)'>关闭</span>
    </div>
    <div v-if='!!tag'>
      <tag-grid :list='tag.language' :name='"语种"' :type='"language"' @onselect='onselect'></tag-grid>
      <tag-grid :list='tag.genre' :name='"流派"' :type='"genre"' @onselect='onselect'></tag-grid>
      <tag-grid :list='tag.type' :name='"类别"' :type='"type"' @onselect='onselect'></tag-grid>
      <tag-grid :list='tag.year' :name='"年代"' :type='"year"' @onselect='onselect'></tag-grid>
      <tag-grid :list='tag.company' :name='"发行公司"' :type='"company"' @onselect='onselect'></tag-grid>
    </div>
  </div>
</template>

<script>
  import TagGrid from '../public/TagGrid'
  export default {
    name: 'album-tag',
    components: {
      TagGrid
    },
    props: ['tag'],
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
            language: this.language || this.tag.language[0].id,
            genre: this.genre || this.tag.genre[0].id,
            type: this.type || this.tag.type[0].id,
            year: this.year || this.tag.year[0].id,
            company: this.company || this.tag.company[0].id
          }
        })
      }
    }
  }

</script>

<style scoped>
  .tag-operation {
    text-align: center;
    margin-top:  1rem;
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
    color: #535353
  }
</style>