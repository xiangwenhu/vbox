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


export default 的name可别和import进来的Component简写重复了，不然意象不到的效果
import AbCd from '../AbCd'
export default {
  name:'ab-cd',
  components:{
    AbCd
  }
}

合理利用 filter,分全局和组件级别的，如果用的比较多的，比如转换成万，文本转换，全局注入


hot load 时常有实效的时候，如果你开始怀疑更改没有生效，重新启动你的工程

vue-cli创建的工程，代码检查相当严格，你检查到错误或者警告，根据信息，你可以去 .eslintrc.js修改规则，不建议关闭


ios vedio播放全屏问题 
<code><video webkit-playsinline="true" playsinline="true"/></code> webkit-playsinline is for ios 10-, and playsinline is for iOS 10+




