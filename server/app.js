const express = require('express')
const app = express()
const proxy = require('http-proxy-middleware')
const path = require('path')

// 静态资源
console.log(path.resolve(__dirname, '../dist'))
app.use(express.static(path.resolve(__dirname, '../dist')))

// c.y.qq.com
app.use('/cyqq', proxy({
  target: 'https://c.y.qq.com',
  changeOrigin: true,
  secure: false,
  pathRewrite: {
    '^/cyqq': ''
  },
  headers: {
    Referer: 'https://c.y.qq.com'
  }
}))

// dl.stream.qqmusic.qq.com
app.use('/stream', proxy({
  target: 'http://dl.stream.qqmusic.qq.com',
  changeOrigin: true,
  secure: false,
  pathRewrite: {
    '^/stream': ''
  },
  headers: {
    Referer: 'https://c.y.qq.com'
  }
}))

app.use('/h5vv', proxy({
  target: 'https://h5vv.video.qq.com',
  changeOrigin: true,
  secure: false,
  pathRewrite: {
    '^/h5vv': ''
  },
  headers: {
    Referer: 'https://y.qq.com'
  }
}))

app.listen(8084)