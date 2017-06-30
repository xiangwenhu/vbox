const getParams = function (params) {
  return Object.assign({}, {
    g_tk: 5381,
    uin: 0,
    format: 'json',
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'h5',
    needNewCode: 1,
    cid: 205360772,
    reqtype: 1,   
    qq: 0
  }, params)
}

export default {
  getParams
}
