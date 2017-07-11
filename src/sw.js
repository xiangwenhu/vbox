const version = 'v1',
  cacheWhitelist = [version],
  cacheList = [
    '/',
    '/index.html',
    '/static/css/app.61f40a4aa4e9787e18afad853eb98474.css',
    '/static/js/manifest.8503ff0a7fd0ee40a685.js',
    '/static/js/vendor.ecca61ffd6c59d2b2495.js',
    '/static/js/app.1f6678976d6c51198043.js',
    '/static/img/loading.gif',
    '/static/img/logo.jpg',
    '/static/d.mp3'
  ]

this.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(version).then(function (cache) {
      return cache.addAll(cacheList)
    }).then(function () {
      // `skipWaiting()` forces the waiting ServiceWorker to become the
      // active ServiceWorker, triggering the `onactivate` event.
      // Together with `Clients.claim()` this allows a worker to take effect
      // immediately in the client(s).
      return self.skipWaiting()
    }).catch(err => console.log(err))
  )
})

this.addEventListener('fetch', function (event) {
  event.respondWith(caches.match(event.request)
    .then(r => {
      if (r) {
        return { response: r, cached: true }
      }
      throw new Error('404')
    }).catch(function () {
      return fetch(event.request).then(r => { return { response: r, cached: false } })
    }).then(function (r) {
      let { response, cached } = r
      return response
    }).catch(function () {
      // return caches.match('/sw-test/gallery/myLittleVader.jpg');
    }))
})

this.addEventListener('message', function (event) {
  console.log('sw:' + event.data)

  /* 
   caches.open(version).then(function (cache) {
     cache.keys().then(keys => {
       event.ports[0].postMessage(keys.map(k => k.url))
     })
   }) */
})

self.addEventListener('activate', function (event) {
  // event.waitUntil(self.clients.claim())  
  console.log(version + ' activated')
  event.waitUntil(
    caches.keys().then(function (keyList) {
      return Promise.all(keyList.map(key => {
        if (cacheWhitelist.indexOf(key) === -1) {
          return caches.delete(key)
        }
      }))
    })
  )
})