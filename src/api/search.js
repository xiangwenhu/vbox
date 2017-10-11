import URLConsts from './URLConsts'
import utils from './utils'

export default {
  /**
   * 歌手搜索
   * @param {String} type 类型 华语男等
   * @param {String} hot 热门 A-Z # all
   * @param {Number} pagenum 页码
   * @param {Number} pagesize 页大小
   */
  singers(type = 'all_all', hot = 'all', pagenum = 1, pagesize = 10) {
    let url = `${URLConsts.URL_SEARCH_SINGER}&key=${type}_${hot}&pagenum=${pagenum}&pagesize=${pagesize}`
    return fetch(url)
  },

  /**
   * 相册媒体id
   * @param {String} albummid 
   * @param {Boolean} extract 是否直接抽取列表数据
   */
  albumInfo(albummid, extract = false) {
    let url = `${URLConsts.URL_ALBUM_INFO}&albummid=${albummid}`
    return extract ? fetch(url).then(res => res.json()).then(res => res.data.list.map(s => ({
      songname: s.songname,
      albummid: s.albummid,
      albumname: s.albumname,
      singer: s.singer,
      songmid: s.songmid,
      interval: s.interval
    }))) : fetch(url)
  },
  /** 歌曲搜索 tested
   * @param {String} w 关键字     
   * @param {Number} p 页码
   * @param {Number} n 页大小
   * 返回结果：zhida.type 2：专辑 0：歌曲 1： 歌手
   *  txt.yqq.mv/txt.yqq.album/txt.yqq.center
   */
  searchSongs(w, p = 1, n = 30) {
    let url = `${URLConsts.URL_SEARCH_CLIENT_SONG}&remoteplace=txt.yqq.center&w=${encodeURIComponent(w)}&p=${p}&n=${n}`
    return fetch(url)
  },
  /**
   * 执行搜索后搜索mv tested
   * @param {String} w 关键字
   * @param {Number} p 页码
   * @param {Number} n 页大小
   */
  searchMVs(w, p = 1, n = 30) {
    let url = `${URLConsts.URL_SEARCH_CLIENT_MV}&w=${encodeURIComponent(w)}&p=${p}&n=${n}`
    return fetch(url)
  },
  /**
   * 执行搜索后搜索专辑 tested
   * @param {String} w 关键字
   * @param {Number} p 页码
   * @param {Number} n 页大小
   */
  searchAlbums(w, p = 1, n = 30) {
    let url = `${URLConsts.URL_SEARCH_CLIENT_ALBUM}&w=${encodeURIComponent(w)}&p=${p}&n=${n}`
    return fetch(url)
  },
  /**
   * 搜索后搜素歌单
   * @param {String} query 关键字
   * @param {Number} page_no 页码
   * @param {Number} num_per_page 页大小 
   * remoteplace = sizer.yqq.playlist_next , remoteplace=txt.yqq.playlist
   */
  searchDiss(query, page_no = 0, num_per_page = 30) {
    let remoteplace = page_no === 0 ? 'txt.yqq.playlist' : 'sizer.yqq.playlist_next '
    let url = `${URLConsts.URL_SEARCH_CLIENT_DISS}&query=${encodeURIComponent(query)}&page_no=${page_no}&num_per_page=${num_per_page}&remoteplace=${remoteplace}`
    return fetch(url)
  },

  /**
   * 执行搜索后的智能搜索 tested
   * @param {String} key 关键字
   */
  smartBox(key) {
    let url = `${URLConsts.URL_SEARCH_SMARTBOX}&key=${encodeURIComponent(key)}`
    return fetch(url)
  },

  /**
   *  查询专辑 tested
   * @param {String} cmd firstpage 返回分类信息 /get_album_info 不返回分类信息
   * @param {Number} page 页码
   * @param {Number} pagesize 页大小 
   * @param {Number} sort   1 最新 / 2 最热
   * @param {Number} language  语种
   * @param {Number} genre  流派
   * @param {Number} year 年代
   * @param {Number} pay  价格  1 免费 / 2 免费
   * @param {Number} type  类别  专辑/演唱会等
   * @param {Number} company  唱片公司 华纳唱片/环球唱片等
   */
  albumLib(cmd = 'firstpage', page = 0, pagesize = 20, sort = 1, language = -1, genre = 0, year = 1, pay = 0, type = -1, company = -1) {
    let url = `${URLConsts.URL_ALBUM_LIBRARY}&cmd=${cmd}&page=${page}&pagesize=${pagesize}&sort=${sort}&language=${language}&genre=${genre}&year=${year}&pay=${pay}&type=${type}&company=${company}`
    return fetch(url)
  },

  /**
   * 通过标签搜索MV  tested
   * @param {Number} area  区域
   * @param {Number} tag   类型 官方版/舞蹈等
   * @param {Number} year  年份
   * @param {Number} type 排序 2最热/1最新
   * @param {Number} taglist  是否带标签， 1带/0不带
   * @param {Number} pageno  页码
   * @param {Number} pagecount  也大小
   */
  mvByTag(area = 0, tag = 0, year = 0, type = 2, taglist = 1, pageno = 0, pagecount = 20) {
    let url = `${URLConsts.URL_MV_BYTAG}&area=${area}&tag=${tag}&year=${year}&type=${type}&taglist=${taglist}&pageno=${pageno}&pagecount=${pagecount}&_=${Math.random().toFixed(16)}`
    return fetch(url)
  },

  /**
   * 获得MV的信息  tested
   * @param {String} vid  mv id
   */
  mvInfo(vid) {
    let url = `${URLConsts.URL_MV_INFO}&vid=${vid}`
    return fetch(url).then(res => res.text()).then(content => {
      return eval(content)
    })
  },

  /**
   * 移动端 获得mv 信息
   * @param {String} vid mv id
   * @param {Number} smvnum 相似mv的数量
   * @param {Number} recnum  推荐 mv 数量（粉丝们也喜欢看）
   * @param {Number} othernum 上传作者的其他mv
   */
  mmvInfo(vid, smvnum = 3, recnum = 3, othernum = 3) {
    let url = `${URLConsts.URL_MV_INFO_M}&vid=${vid}&smvnum=${smvnum}&recnum=${recnum}&othernum=${othernum}&_=${new Date().getTime()}`
    return fetch(url)
  },

  /**
   * 获得mv vkey，播放地址等信息
   * @param {String} vids 
   */
  mvVkey(vids) {
    let url = `${URLConsts.URL_MV_VKEY}&vids=${vids}&_rnd=${~~(new Date().getTime() / 1000)}`
    let QZOutputJson = {}
    return fetch(url).then(res => res.text()).then(content => {
      return eval(content)
    })
  },

  /**
   * 相似MV  tested
   *@param {String} vid  mv id
   */
  mvSimilar(vid) {
    let url = `${URLConsts.URL_MV_SIMILAR}&vid=${vid}`
    return fetch(url)
  },

  /**
   * 获取歌词信息  decodeURIComponent(escape(window.atob('sds==' ))) tested
   * @param {String} songmid  歌曲id
   */
  lyric(songmid) {
    let url = `${URLConsts.URL_SONG_LYR}&songmid=${songmid}&pcachetime=${new Date().getTime()}`
    return fetch(url, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        '_referer': 'https://y.qq.com/portal/player.html'
      }
    }).then(res => res.text()).then(content => eval(content))
  },

  /**
   * 歌曲信息  tested
   * @param {String} songmid 媒体id
   */
  songInfo(songmid) {
    let url = `${URLConsts.URL_SONG_INFO}&songmid=${songmid}`
    return fetch(url)
  },
  /**
   * 歌曲所在的专辑  tested
   * @param {String} songid 
   */
  songAlbums(songid) {
    let url = `${URLConsts.URL_SONG_ALBUM}&songid=${songid}`
    return fetch(url)
  },
  /**
   * 获得媒体的评论
   * @param {String} topid 媒体id
   */
  comments(topid) {
    let params = utils.getParams({
      needmusiccrit: 1,
      pagesize: 5,
      lasthotcommentid: '',
      biztype: 5,
      topid,
      pagenum: 0
    })
    let url = `${URLConsts.URL_COMMENT}?_=${new Date().getTime()}`,
      referer = `https://y.qq.com/w/mv.html?vid=${topid}`
    return fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        '_referer': referer
      },
      body: JSON.stringify(params)
    })
  }

}