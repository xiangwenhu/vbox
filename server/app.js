const express = require('express'),
  app = express(),
  proxy = require('http-proxy-middleware'),
  path = require('path'),
  fs = require('fs'),
  https = require('https'),
  compression = require('compression'),
  privateKey = fs.readFileSync(path.resolve(__dirname, './cert/private.pem'), 'utf8'),
  certificate = fs.readFileSync(path.resolve(__dirname, './cert/file.crt'), 'utf8'),
  credentials = { key: privateKey, cert: certificate },
  cookieParser = require('cookie-parser')

const httpsServer = https.createServer(credentials, app)

// compress responses
app.use(cookieParser())
app.use(compression())

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
  onProxyReq: function (proxyReq, req) {
    if (req.headers && req.headers['_referer']) {
      proxyReq.setHeader('referer', req.headers['_referer'])
    }
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
  onProxyReq: function (proxyReq, req) {
    
  }
}))

app.use('/h5vv', proxy({
  target: 'https://h5vv.video.qq.com',
  changeOrigin: true,
  secure: false,
  pathRewrite: {
    '^/h5vv': ''
  }
}))

httpsServer.listen(8084)