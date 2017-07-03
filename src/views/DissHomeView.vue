<template>
  <div class="diss">
    <diss-categorys :hotCategorys='hotCategorys' ></diss-categorys>
    <choiceness-songList :choicenessSongList='choicenessSongList'></choiceness-songList>
  </div>
</template>
 
<script> 
  import Other from '../api/other'
  import DissCategorys from '../components/Diss/DissCategorys'
  import ChoicenessSongList from '../components/Diss/ChoicenessSongList'

  export default {
    name: 'diss-home-view',
    components: {
      DissCategorys,
      ChoicenessSongList
    },
    data() {
      return {
        hotCategorys : [
          {'categoryId': 39, 'categoryName': 'ACG'},
          {'categoryId': 148, 'categoryName': '情歌'},
          {'categoryId': 199, 'categoryName': '背景音乐'},
          {'categoryId': 133, 'categoryName': '影视'},
          {'categoryId': 52, 'categoryName': '伤感'},
          {'categoryId': 15, 'categoryName': '轻音乐'},
          {'categoryId': 167, 'categoryName': '英语'},
          {'categoryId': 24, 'categoryName': '电子'},
          {'categoryId': 194, 'categoryName': '古风'},
          {'categoryId': 141, 'categoryName': 'KTV热歌'},
          {'categoryId': 197, 'categoryName': '现场音乐'}
        ],
        choicenessSongList : []
      }
    },
    async created() {
      let diss = await Other.dissByTag().then(res => res.json())
      if (diss.code === 0) {
        this.choicenessSongList = diss.data.list;
      }
    },
    methods: {
      addToPlaying() {
        this.$emit('addAlbumToPlaying', '')
      }
    }
  }

</script>

<style scoped>
  
  .diss {
    font-size: 14px;
    height: 100%;
  }


</style>