const COMMON_PARAMS = 'g_tk=5381&loginUin=0&hostUin=0&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0'
const COMMON_PARAMS_3G = 'g_tk=5381&loginUin=0&hostUin=0&inCharset=utf8&outCharset=utf-8&notice=0&platform=h5&needNewCode=0&isParent=0&showType=2&groupId=1&index=0'
// const C_Y_QQ_COM = 'https://c.y.qq.com'
const C_Y_QQ_COM = '/cyqq'
const H5VV_VIDEO_QQ_COM = '/h5vv'

/* 歌手 */
// 搜索歌手
const URL_SEARCH_SINGER = `${C_Y_QQ_COM}/v8/fcg-bin/v8.fcg?channel=singer&page=list&format=json&${COMMON_PARAMS}`
// 相似歌手
const URL_SINGER_SIM = `${C_Y_QQ_COM}/v8/fcg-bin/fcg_v8_simsinger.fcg?utf8=1&format=jsonp&${COMMON_PARAMS}`
// 歌手的歌曲
const URL_SINGER_SONGS = `${C_Y_QQ_COM}/v8/fcg-bin/fcg_v8_singer_track_cp.fcg?format=json&order=listen&songstatus=1&${COMMON_PARAMS}`
// 歌手的专辑
const URL_SINGER_ALBUM = `${C_Y_QQ_COM}/v8/fcg-bin/fcg_v8_singer_album.fcg?format=json&order=time&${COMMON_PARAMS}`
// 歌手描述
const URL_SINGER_DESC = `${C_Y_QQ_COM}/splcloud/fcgi-bin/fcg_get_singer_desc.fcg?utf8=1&outCharset=utf-8&format=xml`
// 歌手的粉丝
const URL_SINGER_FANS = `${C_Y_QQ_COM}/rsc/fcgi-bin/fcg_order_singer_getnum.fcg?utf8=1&format=json&${COMMON_PARAMS}`
// 歌手的MV
const URL_SINGER_MVS = `${C_Y_QQ_COM}/mv/fcgi-bin/fcg_singer_mv.fcg?cid=205360581&${COMMON_PARAMS}`

/* 专辑 */
// 专辑的分类信息和默认首页
const URL_ALBUM_LIBRARY = `${C_Y_QQ_COM}/v8/fcg-bin/album_library?${COMMON_PARAMS}&format=json`
// 专辑信息
const URL_ALBUM_INFO = `${C_Y_QQ_COM}/v8/fcg-bin/fcg_v8_album_info_cp.fcg?${COMMON_PARAMS}`

/* 搜索 */
// 热门搜索关键字
const URL_HOT_KEY = `${C_Y_QQ_COM}/splcloud/fcgi-bin/gethotkey.fcg?${COMMON_PARAMS}`
// 搜索结果-单曲
const URL_SEARCH_CLIENT_SONG = `${C_Y_QQ_COM}/soso/fcgi-bin/client_search_cp?format=json&ct=24&qqmusic_ver=1298&new_json=1&t=0&aggr=1&cr=1&catZhida=1&lossless=0&flag_qc=0&${COMMON_PARAMS}`
// 搜索结果-mv
const URL_SEARCH_CLIENT_MV = `${C_Y_QQ_COM}/soso/fcgi-bin/client_search_cp?ct=24&format=json&qqmusic_ver=1298&remoteplace=txt.yqq.mv&aggr=0&catZhida=1&lossless=0&sem=1&t=12&${COMMON_PARAMS}`
// 搜素专辑
const URL_SEARCH_CLIENT_ALBUM = `${C_Y_QQ_COM}/soso/fcgi-bin/client_search_cp?ct=24&format=json&qqmusic_ver=1298&remoteplace=txt.yqq.album&aggr=0&catZhida=1&lossless=0&sem=10&t=8&${COMMON_PARAMS}`
// 搜索后的智能搜索
const URL_SEARCH_SMARTBOX = `${C_Y_QQ_COM}/splcloud/fcgi-bin/smartbox_new.fcg?is_xml=0&format=json&${COMMON_PARAMS}`
// 搜索后歌单搜素
const URL_SEARCH_CLIENT_DISS = `${C_Y_QQ_COM}//soso/fcgi-bin/client_music_search_songlist?flag_qc=0&format=json&${COMMON_PARAMS}`

/* 排行 */
// 排行榜分类
const URL_TOPLIST_OPT = `${C_Y_QQ_COM}/v8/fcg-bin/fcg_v8_toplist_opt.fcg?page=index&format=html&tpl=macv4&v8debug=1`
// 某个排行的列表
const URL_TOPLIST_LIST = `${C_Y_QQ_COM}/v8/fcg-bin/fcg_v8_toplist_cp.fcg?tpl=3&page=detail&type=top&${COMMON_PARAMS}`

// 节目的vkey
const URL_VKEY = `${C_Y_QQ_COM}/base/fcgi-bin/fcg_music_express_mobile3.fcg?cid=205361747&uin=0&guid=488797456&${COMMON_PARAMS}`

/* 歌单 */
// 歌单的分类
const URL_DISS_TAG_CONF = `${C_Y_QQ_COM}/splcloud/fcgi-bin/fcg_get_diss_tag_conf.fcg?format=json&${COMMON_PARAMS}`
// 按照分类查询歌单
const URL_DISS_BYTAG = `${C_Y_QQ_COM}/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg?format=json&${COMMON_PARAMS}`
// 获取某个歌单的内容
const URL_DISS_INFO = `${C_Y_QQ_COM}/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg?type=1&json=1&utf8=1&onlysong=0&format=json&${COMMON_PARAMS}`
// 相似歌单
const URL_DISS_SIMILAR = `${C_Y_QQ_COM}/musichall/fcgi-bin/fcg_similar_recomm.fcg?recomtype=2&format=json`
// 移动按照分类查询歌单
const URL_DISS_BYTAG_3G = `${C_Y_QQ_COM}/musichall/fcgi-bin/3g_gedan_category_detail?format=json&${COMMON_PARAMS_3G}`

/* MV */
// MV查询 taglist=1 有标签
const URL_MV_BYTAG = `${C_Y_QQ_COM}/v8/fcg-bin/getmv_by_tag?utf8=1&otype=json&format=json&${COMMON_PARAMS}`
// MV信息
const URL_MV_INFO = `${C_Y_QQ_COM}/mv/fcgi-bin/fcg_getmvinfo.fcg?format=json&${COMMON_PARAMS}`
// MV信息
const URL_MV_INFO_M = `${C_Y_QQ_COM}/mv/fcgi-bin/fcg_get_mvinfo.fcg?&vidlist=&&simnum=&cid=205361939`
// 相似MV
const URL_MV_SIMILAR = `${C_Y_QQ_COM}/mv/fcgi-bin/fcg_getmvlist.fcg?reqtype=1&cid=205360328&format=json&${COMMON_PARAMS}`
// 获取MV的vkey等信息 
const URL_MV_VKEY = `${H5VV_VIDEO_QQ_COM}/getinfo?platform=11001&charge=0&otype=json&ehost=https%3A%2F%2Fy.qq.com&sphls=0&sb=1&nocache=0&guid=decf14f023c6b25049fdedf639d195ff&appVer=V2.0Build9397&defaultfmt=auto&sdtfrom=v3010`

// 首页推荐
const URL_RRCOM = `${C_Y_QQ_COM}/v8/fcg-bin/fcg_first_yqq.fcg?format=json&tpl=v12&page=other&${COMMON_PARAMS}`

/* 歌曲 */
// 歌曲歌词
const URL_SONG_LYR = `${C_Y_QQ_COM}/lyric/fcgi-bin/fcg_query_lyric_new.fcg?${COMMON_PARAMS}&format=json`
// 歌曲信息TO::
const URL_SONG_INFO = `${C_Y_QQ_COM}/v8/fcg-bin/fcg_play_single_song.fcg?songmid=0016IcYd27ZJWw&tpl=yqq_song_detail&format=json&g_tk=1885845528&${COMMON_PARAMS}`
// 歌曲所在的专辑
const URL_SONG_ALBUM = `${C_Y_QQ_COM}/rcmusic/fcgi-bin/fcg_iphone_music_rec_songlist?cid=338&ct=20&uin=10000&&g_tk=1885845528&${COMMON_PARAMS}`
// 评论
const URL_COMMENT = `${C_Y_QQ_COM}/base/fcgi-bin/fcg_global_comment_h5.fcg`

const MusicJsonCallback = function (data) {
  return data
}

global.MusicJsonCallback = MusicJsonCallback

export default {
  URL_SEARCH_SINGER,

  URL_SINGER_SIM,
  URL_SINGER_SONGS,
  URL_SINGER_ALBUM,
  URL_SINGER_MVS,
  URL_SINGER_DESC,
  URL_SINGER_FANS,

  URL_ALBUM_LIBRARY,
  URL_ALBUM_INFO,

  URL_HOT_KEY,
  URL_SEARCH_CLIENT_SONG,
  URL_SEARCH_CLIENT_MV,
  URL_SEARCH_CLIENT_ALBUM,
  URL_SEARCH_SMARTBOX,
  URL_TOPLIST_OPT,
  URL_TOPLIST_LIST,
  URL_VKEY,
  URL_SEARCH_CLIENT_DISS,

  URL_DISS_TAG_CONF,
  URL_DISS_BYTAG,
  URL_DISS_INFO,
  URL_DISS_SIMILAR,
  URL_DISS_BYTAG_3G,

  URL_MV_BYTAG,
  URL_MV_INFO,
  URL_MV_INFO_M,
  URL_MV_SIMILAR,
  URL_MV_VKEY,

  URL_RRCOM,

  URL_SONG_LYR,
  URL_SONG_INFO,
  URL_SONG_ALBUM,

  URL_COMMENT
}
