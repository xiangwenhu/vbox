(function (win) {
  let nav = win.navigator, doc = win.document
  win.support = {
    // 网络状态
    get networkInformation() {
      let con = !!(nav.connection && nav.connection.type)
      return {
        status: !!con,
        ref: nav.connection
      }
    },
    // indexedDB
    get indexedDB() {
      let _IDB_ = win.indexedDB || win.mozIndexedDB || win.webkitIndexedDB || win.msIndexedDB
      win.IDBTransaction = win.IDBTransaction || win.webkitIDBTransaction || win.msIDBTransaction
      win.IDBKeyRange = win.IDBKeyRange || win.webkitIDBKeyRange || win.msIDBKeyRange
      return {
        status: !!(_IDB_ && win.IDBTransaction && win.IDBKeyRange),
        ref: _IDB_
      }
    },
    // 窗口可见
    get pageVisibility() {
      let hiddenKey = null
      if (typeof document.hidden !== 'undefined') {
        hiddenKey = 'hidden'
      } else if (typeof document.mozHidden !== 'undefined') {
        hiddenKey = 'mozHidden'
      } else if (typeof document.msHidden !== 'undefined') {
        hiddenKey = 'msHidden'
      } else if (typeof document.webkitHidden !== 'undefined') {
        hiddenKey = 'webkitHidden'
      }
      return {
        status: !!hiddenKey,
        ref: hiddenKey
      }
    },
    // Service Worker
    get serviceWorker() {
      return {
        status: 'serviceWorker' in nav,
        ref: nav.serviceWorker
      }
    },
    // Web Worker
    get webWorker() {
      return {
        status: typeof (Worker) !== 'undefined',
        ref: win.Worker
      }
    },
    // 媒体录制
    get mediaRecorder() {
      return {
        status: typeof (MediaRecorder) !== 'undefined',
        ref: win.MediaRecorder
      }
    },
    // 震动
    get vibration() {
      return {
        status: typeof (nav.vibrate) !== 'undefined',
        ref: nav.vibrate
      }
    },
    // geolocation
    get geolocation() {
      return {
        status: !!navigator.geolocation,
        ref: nav.geolocation
      }
    }
  }
})(window)