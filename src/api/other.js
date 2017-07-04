import URLConsts from './URLConsts'

export default {
  // 热搜关键字 tested
  hotkey() {
    let url = `${URLConsts.URL_HOT_KEY}`
    return fetch(url)
  },
  /**
   * 排行分类 tested
   */
  topList() {
    let url = URLConsts.URL_TOPLIST_OPT

    return fetch(url).then(res => {
      return res.text()
    }).then(content => {
      function jsonCallback(data) {
        return data
      }
      return eval(content)
    })
  },
  /**
   * 排行榜详细数据  tested
   * @param {*} topid id  
   * @param {*} song_begin 开始 
   * @param {*} song_num 结束
   */
  topListList(topid = 4, song_begin = 0, song_num = 30) {
    // 更新时间：每天上午10点
    let today = new Date(), yes = new Date(today.getTime() - 1000 * 60 * 60 * 24),
      year = yes.getFullYear(),
      month = ((yes.getMonth() + 1) + '').padStart(2, '0'),
      date = (yes.getHours() > 10 ? yes.getDate() + '' : new Date(today.getTime() - 2 * 1000 * 60 * 60 * 24).getDate() + '').padStart(2, '0'),
      dateStr = year + '-' + month + '-' + date,
      // url = `${URLConsts.URL_TOPLIST_LIST}&topid=${topid}&date=${dateStr}&song_begin=${song_begin}&song_num=${song_num}`
      url = `${URLConsts.URL_TOPLIST_LIST}&topid=${topid}&song_begin=${song_begin}&song_num=${song_num}`
    return fetch(url)
  },

  /**
   * 歌曲的vkey  tested
   * @param {*} songmid 歌曲id
   */
  vkey(songmid) {
    let url = `${URLConsts.URL_VKEY}&songmid=${songmid}&filename=C400${songmid}.m4a`
    return fetch(url)
  },
  /**
   * 歌单的分类 tested
   */
  dissTagConf() {
    return fetch(URLConsts.URL_DISS_TAG_CONF)
  },

  /**
   * 按照分类查询歌单 tested
   * @param {*} categoryId  
   * @param {*} sortId  排序 5 推荐 / 2 最新
   * @param {*} sin 起始行
   * @param {*} ein 结束行
   * 返回结果 dissid 为歌单编号
   */
  dissByTag(categoryId = 10000000, sortId = 5, sin = 0, ein = 29) {
    let url = `${URLConsts.URL_DISS_BYTAG}&categoryId=${categoryId}&sortId=${sortId}&sin=${sin}&ein=${ein}&rnd=${Math.random().toFixed(16)}`
    return fetch(url, {
      headers: {
        'Accept': 'application/json',
        'referer': 'https://y.qq.com/portal/playlist.html',
        'Content-Type': 'application/json'
      }
    })
  },
  /**
   * 按照分类查询歌单 tested
   * @param {*} categoryId  
   * @param {*} sort  排序 hot 最热 / time 最新
   * 返回结果 dissid 为歌单编号
   */
  dissByTag3G(categoryId = 71, sort = 'hot') {
    let url = `${URLConsts.URL_DISS_BYTAG_3G}&categoryId=${categoryId}&sort=${sort}&rnd=${Math.random().toFixed(16)}`
    return fetch(url, {
      headers: {
        'Accept': 'application/json',
        'referer': 'https://y.qq.com/m/client/categoryzone/detail.html',
        'Content-Type': 'application/json'
      }
    })
  },
  /**
   * 按照id获取歌单信息 tested
   * @param {*} disstid 歌单id
   */
  dissInfo(disstid) {
    let url = `${URLConsts.URL_DISS_INFO}&disstid=${disstid}`
    return fetch(url)
  },

  /**
   * 相似歌单  tested
   * @param {*} dissid 歌单id
   * @param {*} maxnum 最大返回条数
   */
  dissSimilar(dissid, maxnum = 6) {
    let url = `${URLConsts.URL_DISS_SIMILAR}&dissid=${dissid}&maxnum=${maxnum}&_=${new Date().getTime()}`
    return fetch(url)
  },

  // 首页推荐 tested
  recomList() {
    let url = `${URLConsts.URL_RRCOM}&rnd=${(Math.random() * Math.pow(10, 16)).toFixed(0)}`
    return fetch(url)
  }

}