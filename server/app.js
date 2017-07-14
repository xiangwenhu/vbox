const express = require('express'),
  app = express(),
  proxy = require('http-proxy-middleware'),
  path = require('path'),
  fs = require('fs'),
  https = require('https'),
  privateKey = fs.readFileSync(path.resolve(__dirname, './cert/private.pem'), 'utf8'),
  certificate = fs.readFileSync(path.resolve(__dirname, './cert/file.crt'), 'utf8'),
  credentials = { key: privateKey, cert: certificate }

const httpsServer = https.createServer(credentials, app)

// 静态资源
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

httpsServer.listen(8084)