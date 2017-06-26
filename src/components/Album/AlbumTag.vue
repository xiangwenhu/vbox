<template>
  <div class="tag-select">
    <div class="tag-operation">
      <span @click.stop='confirm(true)'>确认</span>
      <span @click.stop='confirm(false)'>关闭</span>
    </div>
    <div v-if='!!tag'>
      <album-tag-grid :list='tag.language' :name='"语种"' :type='"language"' @onselect='onselect'></album-tag-grid>
      <album-tag-grid :list='tag.genre' :name='"流派"' :type='"genre"' @onselect='onselect'></album-tag-grid>
      <album-tag-grid :list='tag.type' :name='"类别"' :type='"type"' @onselect='onselect'></album-tag-grid>
      <album-tag-grid :list='tag.year' :name='"年代"' :type='"year"' @onselect='onselect'></album-tag-grid>
      <album-tag-grid :list='tag.company' :name='"发行公司"' :type='"company"' @onselect='onselect'></album-tag-grid>
    </div>
  </div>
</template>

<script>
  import AlbumTagGrid from './AlbumTagGrid'
  export default {
    name: 'album-tag',
    components: {
      AlbumTagGrid
    },
    props: ['tag', 'class'],
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
    text-align: center
  }

  .tag-operation span {
    line-height: 1.4rem;
    font-size: 1rem
  }

  .tag-select {
    font-size: 0.8rem;
    color: #535353
  }
</style>