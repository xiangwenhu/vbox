<template>
  <div class="mv">
    <div class="tag-hd">
      <div class="tag-sort">
        <span :class='["sort-type", sortType == 1 ? "tag-select":""]' @click.stop='changeSortType(1)'>最新</span>
        <span :class='["sort-type", sortType == 2 ? "tag-select":""]' @click.stop='changeSortType(2)'>最热</span>
        <span class="more_filter" @click.stop='toggleTag'>三</span>
      </div>
    </div>
    <transition name="'slide-left'">
      <mv-tag class="mv-tag" :tags='tsTagsOpt' @confirmed='tagsChanged' v-show='showTag'></mv-tag>
    </transition>
    <mv-list :mvs='mvs' v-show='!showTag'></mv-list>

    <infinite-loading :on-infinite="onInfinite" ref="infiniteLoading" spinner='bubbles'>
      <span slot="no-more" class="no-more">
        没有更多了
     </span>
    </infinite-loading>

  </div>
</template>

<script>
  import InfiniteLoading from 'vue-infinite-loading'
  import MVTag from '../components/MV/MVTag'
  import MVList from '../components/MV/MVList'
  import Search from '../api/search'

  export default {
    name: 'mv-view',
    components: {
      'mv-tag': MVTag,
      'mv-list': MVList,
      InfiniteLoading
    },
    data() {
      return {
        showTag: false,
        tagOpt: undefined,
        sortType: 2,
        mvs: [],
        pageno: 0,
        pagecount: 30,
        sum: 0,
        tag: {
          area: 0,
          tag: 0,
          year: 0
        }
      }
    },
    methods: {
      changeSortType(sortType) {
        this.sortType = sortType
      },
      toggleTag() {
        this.showTag = !this.showTag
      },
      tagsChanged(tag) {
        if (tag.confirmed) {
          this.tag = tag.tag
        }
        this.showTag = false
      },
      async onInfinite() {
        try {
          let res = await Search.mvByTag(this.tag.area, this.tag.tag, this.tag.year, this.sortType, !this.tagOpt ? 1 : 0, this.pageno, this.pagecount).then(res => res.json())

          if (!this.tagOpt) {
            this.tagOpt = res.data.taglist
          }
          this.sum = res.data.sum
          if (!res.data || !res.data.mvlist || res.data.mvlist.length === 0 || this.mvs.length >= this.sum) {
            this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete')
            return
          } else {
            // splice 不产生新数组
            this.mvs = this.mvs.concat(res.data.mvlist.map(m => {
              m.pic = m.picurl
              m.title = m.mvtitle
              m.listenCount = m.listennum
              m.type = this.sortType
              return m
            }))
            this.pageno++
            this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded')
          }
        } catch (err) {
          alert(err);
          this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete')
        }
      },
      resetInfiniteLoading() {
        this.pageno = 0
        this.enableLoading = true
        this.mvs = []
        this.$refs.infiniteLoading.isLoading = true
        this.onInfinite();
      }
    },
    watch: {
      tag: {
        handler: async function (to) {
          this.resetInfiniteLoading();
        },
        deep: true
      },
      sortType() {
        this.resetInfiniteLoading()
      }
    },
    computed: {
      tsTagsOpt() {
        if (!this.tagOpt) {
          return this.tagOpt
        }
        for (var p in this.tagOpt) {
          this.tagOpt[p].forEach(it => it.name = it.title);
        }
        return this.tagOpt
      }
    }
  }

</script>

<style scoped>
  .more_filter {
    padding: 0.2rem 0.4rem;
    height: 1.2rem;
  }

  .mv-tag {
    position: absolute;
    top: 0;
    background: #FFF;
    z-index: 999;
    width: 100%;
  }
</style>