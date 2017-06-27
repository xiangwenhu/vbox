vue-infinite-loading 处理完毕数据后再 emit，不然会触发多次

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