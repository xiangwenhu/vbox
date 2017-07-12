if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js', { scope: '/' }).then(function (reg) {
    if (reg.installing) {
      console.log('Service worker installing')
    } else if (reg.waiting) {
      console.log('Service worker installed')
    } else if (reg.active) {
      console.log('Service worker active')
    }
  }).catch(function (error) {
    // registration failed
    console.log('Registration failed with ' + error)
  })
}

// 通知事件
self.addEventListener('offline', function () {
  Notification.requestPermission().then(grant => {
    if (grant !== 'granted') {
      return
    }

    const notification = new Notification('Hi，网络不给力哟', {
      body: '您的网络貌似离线了，不过VBox可以继续播放列表里面的歌曲',
      icon: '/static/img/logo.jpg'
    })

    notification.onclick = function () {
      notification.close()
    }
  })
}) 