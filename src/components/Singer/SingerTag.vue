<template>
  <div class="mod_singer_tag">
    <div class="singer_tag__list js_area" @click.stop='selectArea'>
      <a v-for="(item,index) in areas" :data-key="item.key" :class='["singer_tag__item",area == item.key ? "singer_tag__item--select" : ""]'>{{item.value}}</a>
    </div>
    <div class="singer_tag__list js_letter" @click.stop='selectLetter'>
      <a v-for="(item,index) in letters" :data-key="item.key" :class='["singer_tag__item","singer_tag-letter",letter == item.key ? "singer_tag__item--select" : ""]'>{{item.value}}</a>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'singer-tag',
    data() {
      return {
        // [...document.querySelectorAll('.js_area .singer_tag__item')].map(d=>{return {key:d.getAttribute('data-key'),value:d.innerText}})
        areas: [
          { 'key': "all_all", "value": "全部" },
          { 'key': "cn_man", "value": "华语男" },
          { "key": "cn_woman", "value": "华语女" },
          { "key": "cn_team", "value": "华语组合" },
          { "key": "k_man", "value": "韩国男" },
          { "key": "k_woman", "value": "韩国女" },
          { "key": "k_team", "value": "韩国组合" },
          { "key": "j_man", "value": "日本男" },
          { "key": "j_woman", "value": "日本女" },
          { "key": "j_team", "value": "日本组合" },
          { "key": "eu_man", "value": "欧美男" },
          { "key": "eu_woman", "value": "欧美女" },
          { "key": "eu_team", "value": "欧美组合" },
          { "key": "c_orchestra", "value": "乐团" },
          { "key": "c_performer", "value": "演奏家" },
          { "key": "c_composer", "value": "作曲家" },
          { "key": "c_cantor", "value": "指挥家" },
          { "key": "other_other", "value": "其他" }
        ],
        // [...document.querySelectorAll('.js_letter .singer_tag__item')].map(d=>{return {key:d.getAttribute('data-key'),value:d.innerText}})
        letters: [
          { "key": "all", "value": "热门" },
          { "key": "A", "value": "A" },
          { "key": "B", "value": "B" },
          { "key": "C", "value": "C" },
          { "key": "D", "value": "D" },
          { "key": "E", "value": "E" },
          { "key": "F", "value": "F" },
          { "key": "G", "value": "G" },
          { "key": "H", "value": "H" },
          { "key": "I", "value": "I" },
          { "key": "J", "value": "J" },
          { "key": "K", "value": "K" },
          { "key": "L", "value": "L" },
          { "key": "M", "value": "M" },
          { "key": "N", "value": "N" },
          { "key": "O", "value": "O" },
          { "key": "P", "value": "P" },
          { "key": "Q", "value": "Q" },
          { "key": "R", "value": "R" },
          { "key": "S", "value": "S" },
          { "key": "T", "value": "T" },
          { "key": "U", "value": "U" },
          { "key": "V", "value": "V" },
          { "key": "W", "value": "W" },
          { "key": "X", "value": "X" },
          { "key": "Y", "value": "Y" },
          { "key": "Z", "value": "Z" },
          { "key": "9", "value": "#" }
        ],
        area: 'all_all',
        letter: 'all'
      }
    },
    methods: {
      selectArea: function (ev) {
        if (ev.target.tagName === 'A') {
          this.area = ev.target.getAttribute('data-key')
          this.$emit('filterChanged', this._data)
        }
      },
      selectLetter: function (ev) {
        if (ev.target.tagName === 'A') {
          this.letter = ev.target.getAttribute('data-key')
          this.$emit('filterChanged', this._data)
        }
      }
    }
  }

</script>

<style scoped>
  .mod_singer_tag {
    background-color: #fbfbfd;
    margin: 0.2rem
  }

  .singer_tag__item--select {
    background-color: #31c27c;
    color: #fff;
  }

  .singer_tag__item {
    float: left;
    line-height: 1.3rem;   
    margin: 0 0.1rem 0.1rem 0.5rem;
    width: 3.2rem;
    font-size: 0.8rem
  }

  .singer_tag__list {
    padding-bottom: 3px;
    height: auto;
    zoom: 1;
    clear: both;
    overflow: hidden;
  }

  .js_letter a:first-child {
    width: 2rem;
  }

  .singer_tag-letter {
    width: 1.1rem;
    text-align: center;
    margin-left: 0.1rem
  }
</style>