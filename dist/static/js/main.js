if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('/sw.js', { scope: '/' }).then(function (reg) {
      if (reg.installing) {
        console.log('Service worker installing')
      } else if (reg.waiting) {
        // firefox
        console.log('Service worker installed')
        window.location.href = '/update.html'
      } else if (reg.active) {
        console.log('Service worker active')
      }

      reg.addEventListener('updatefound', function () {
        // A wild service worker has appeared in reg.installing!
        const newWorker = reg.installing

        // newWorker.state;
        // "installing" - the install event has fired, but not yet complete
        // "installed"  - install complete
        // "activating" - the activate event has fired, but not yet complete
        // "activated"  - fully active
        // "redundant"  - discarded. Either failed install, or it's been
        //                replaced by a newer version

        newWorker.addEventListener('statechange', () => {
          // chrome 
          console.log('newWorker.state:', newWorker.state)
          if (newWorker.state && newWorker.state === 'installed') {
            window.location.href = '/update.html'
          }
        })
      })

      navigator.serviceWorker.addEventListener('controllerchange', function () {
        console.log('service worker controlling this page changes')
      })
    }).catch(function (error) {
      // registration failed
      console.log('Registration failed with ' + error)
    })
  })
}

// 通知事件
self.addEventListener('offline', function () {
  Notification.requestPermission().then(grant => {
    if (grant !== 'granted') {
      return
    }

    const notification = new Notification('Hi，网络不给力哟', {
      body: '您的网络貌似离线了CCC，不过VBox可以继续播放列表里面的歌曲',
      icon: '/static/img/logo.jpg'
    })

    notification.onclick = function () {
      notification.close()
    }
  })
})
