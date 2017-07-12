if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('/sw.js', { scope: '/' }).then(function (reg) {
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
          if (newWorker.state === 'installed') {
            window.location.href = '/'
          }
        })
      })
    }).catch(function (error) {
      // registration failed
      console.log('Registration failed with ' + error)
    })
  })
}

setTimeout(function () {
  window.location.href = '/'
}, 8000)

setInterval(function () {
  document.querySelector('#messageEl').innerHTML += '<p>check Updating.....</p>'
}, 1000)