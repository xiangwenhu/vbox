const Router = require('koa-router')
const request = require('../utils/request')
const orgRequest = require('request')

const router = new Router({
  prefix: '/api/common'
})

router.get('/get', async (ctx) => {
  let body = await request.get(ctx.query.url)
  ctx.body = body
})

router.post('/get', async (ctx) => {
  // ctx.request.fields request 的options参数
  let body = await request.get(ctx.query.url, ctx.request.fields)
  ctx.body = body
})

router.get('/media', async (ctx) => {
  ctx.body = orgRequest({
    url: ctx.query.url
  })
})

module.exports = router
