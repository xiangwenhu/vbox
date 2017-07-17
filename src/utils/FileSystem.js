/**
 * 转为promise，主要是把 a.b(param1,param2,successCallback,errorCall) 转为promise
 * @param {*期待的是函数} obj 
 * @param {*上下文} ctx 
 * @param {*参数} args 
 */
function toPromise(obj, ctx = window, ...args) {
  if (!obj) return obj

  // 如果已经是Promise对象
  if (typeof obj.then === 'function') return obj

  // 若obj是函数直接转换
  if (typeof obj === 'function') return _toPromise(obj)

  return obj

  // 函数转成 promise
  function _toPromise(fn) {
    return new Promise((resolve, reject) => {
      fn.call(ctx, ...args, (...ags) => {
        // 多个参数返回数组，单个直接返回对象
        resolve(ags && ags.length > 1 ? ags : ags[0] || null)
      }, (err) => {
        reject(err)
      })
    })
  }
}

/**
 * https://segmentfault.com/q/1010000007499416
 * Promise for forEach
 * @param {*数组} arr 
 * @param {*回调} cb(val)返回的应该是Promise 
 * @param {*是否需要执行结果集} needResults
 */
function promiseForEach(arr, cb, needResults) {
  // lastResult参数暂无用
  let realResult = [], lastResult
  let result = Promise.resolve()
  Array.from(arr).forEach((val, index) => {
    result = result.then(() => {
      return cb(val, index).then((res) => {
        lastResult = res
        needResults && realResult.push(res)
      })
    })
  })

  return needResults ? result.then(() => realResult) : result
}

let support = {
  get FileSystem() {
    // 文件系统请求标识 
    window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem
    // 根据URL取得文件的读取权限 
    window.resolveLocalFileSystemURL = window.resolveLocalFileSystemURL || window.webkitResolveLocalFileSystemURL

    return window.requestFileSystem && window.resolveLocalFileSystemURL
  },
  get IndexedDB() {
    let idb = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB
    window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction
    window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange
    return idb && window.IDBTransaction && window.IDBKeyRange
  }
}

/*
export {  
  toPromise,
  promiseForEach
} */
/**
 * 参考的API:
 * http://w3c.github.io/quota-api/
 * 
 */
/* import { toPromise, promiseForEach } from './utils' */

if (!location.origin) {
  location.origin = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '')
}
// 文件系统请求标识 
window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem
// 根据URL取得文件的读取权限 
window.resolveLocalFileSystemURL = window.resolveLocalFileSystemURL || window.webkitResolveLocalFileSystemURL

// 临时储存和永久存储
navigator.temporaryStorage = navigator.temporaryStorage || navigator.webkitTemporaryStorage
navigator.persistentStorage = navigator.persistentStorage || navigator.webkitPersistentStorage

// 常量
const _TEMPORARY = 'temporary',
  _PERSISTENT = 'persistent',
  FS_SCHEME = 'filesystem:'

/**
 * 查询和申请定额
 * 测试脚本：
 * 使用情况： FileStorageQuota.instance.queryInfo().then(data=>console.log(data))
 * 申请空间： FileStorageQuota.instance.requestPersistentQuota().then(data=>console.log(data))
 */
class FileStorageQuota {

  constructor() {
    let supportedTypes = [_TEMPORARY, _PERSISTENT]

    this.storageQuota = navigator.storageQuota || {
      storages: { [_TEMPORARY]: navigator.webkitTemporaryStorage, [_PERSISTENT]: navigator.webkitPersistentStorage },
      queryInfo: function (type) {
        return toPromise(this.storages[type].queryUsageAndQuota, this.storages[type]).then(arr => {
          return { usage: arr[0], quota: arr[1] }
        })
      },
      requestPersistentQuota: function (requestQuota) {
        return toPromise(this.storages[_PERSISTENT].requestQuota, this.storages[_PERSISTENT], requestQuota * 1024 * 1024).then(quota => {
          return { quota }
        })
      },
      supportedTypes
    }
    this.supportedTypes = supportedTypes
    this._instance = null
  }

  /**
   * 获得实例
   */
  static get instance() {
    return this._instance ? this._instance : this._instance = new FileStorageQuota()
  }

  /**
   * 已经分配的额度和适用查询
   * @param {*类型  window.TEMPORAR(0) |window.PERSISTENT(1) }  type
   */
  queryInfo(type = window.TEMPORARY) {
    return new Promise((resolve, reject) => {
      this.storageQuota.queryInfo(this.supportedTypes[type])
        .then(storageInfo => resolve({ quota: this.tansferBytes(storageInfo.quota), usage: this.tansferBytes(storageInfo.usage) }))
        .catch(this.errorHandler(reject))
    })
  }

  /**
   * 请求配额，只有PERSISTENT才需要用户允许，
   * 返回值是你请求的和已经分配的大值   
   * @param {* 请求的配额大小} requestQuota  
   */
  async requestPersistentQuota(requestQuota = 5) {
    let { quota: quotaM, usage } = await this.queryInfo(window.PERSISTENT)
    if (requestQuota > quotaM) {
      return new Promise((resolve, reject) =>
        this.storageQuota.requestPersistentQuota(requestQuota * 1024 * 1024)
          .then(storageInfo => {
            return resolve({ quota: this.tansferBytes(storageInfo.quota), usage: this.tansferBytes(storageInfo.usage || usage) })
          })
          .catch(this.errorHandler(reject)))
    }
    return { quota: Math.max(requestQuota, quotaM), usage }
  }

  /**
   * 把bytes换算成KB,M,G等
   * @param {* bytes的长度}  bytesLength
   * @param {* 转为目标的单位} target
   */
  tansferBytes(bytesLength, target = 'M') {
    let m = {
      'Byte': 0,
      'KB': 1,
      'M': 2,
      'G': 3
    }
    return bytesLength / Math.pow(1024, m[target] || 0)
  }

  /**
   * Promise里面的错误处理
   * @param {*}  reject
   */
  errorHandler(reject) {
    return error => {
      reject(error)
    }
  }
}

class FSProvider {

  constructor(fs) {
    // 文件系统
    this._fs = fs
    // 文件系统的根Entry   
    this._root = fs.root
    // 实例对象
    this._instance = null
    // 类型，window.TEMPORAR| window.PERSISTENT
    this._type = null
    // 文件系统的基础地址
    this._fsBaseUrl = null
  }

  /**
     * 
     * @param {* window.TEMPORAR(0) |window.PERSISTENT(1)} type
     * @param {* 申请空间大小，单位为M } size
     */
  static getInstance(type = window.TEMPORARY, size = 1) {
    if (this._instance) {
      return Promise.resolve(this._instance)
    }
    // 类型
    try {
      if (!window.requestFileSystem) {
        return Promise.resolve(null)
      }

      let typeValue = type, that = this,
        // 文件系统基础地址
        fsBaseUrl = FS_SCHEME + location.origin + '/' + (type === 1 ? _PERSISTENT : _TEMPORARY) + '/'
      return new Promise((resolve, reject) => {
        window.requestFileSystem(type, size * 1024 * 1024, fs => {
          that._instance = new FSProvider(fs)
          that._instance._type = typeValue
          that._instance._fsBaseUrl = fsBaseUrl
          return resolve(that._instance)
        }, () => resolve(null))
      })
    } catch (err) {
      return Promise.resolve(null)
    }
  }

  /**
   * 获得FileEntry
   * @param {*文件路径} path  
   */
  _getFileEntry(path, create = false) {
    return toPromise(this._root.getFile, this._root, path, { create, exclusive: false })
  }

  /**
   * 获取目录
   * @param {*路径} path 
   * @param {*不存在的时候是否创建} create 
   */
  _getDirectory(path = '', create = false) {
    return toPromise(this._root.getDirectory, this._root, path, { create, exclusive: false })
  }

  /**
   * 递归查询目录和文件
   * @param {*根Entry} rootEntry 
   * @param {*保存结果的数组} refResults 
   */
  async _readEntriesRecursively(rootEntry, refResults) {
    if (rootEntry.isFile) {
      return Promise.resolve(rootEntry)
    }
    let reader = rootEntry.createReader()
    let entries = await toPromise(reader.readEntries, reader)
    refResults.push(...entries)
    let psEntries = entries.map(entry => this._readEntriesRecursively(entry, refResults))
    return Promise.all(psEntries)
  }

  /**
   * 获得Entry
   * @param {*路径} path 
   */
  resolveLocalFileSystemURL(path) {
    return new Promise((resolve) => {
      toPromise(window.resolveLocalFileSystemURL, window, `${this._fsBaseUrl}${path.startsWith('\\/') ? path.substr(1) : path}`).then(entry => resolve(entry)).catch(() => {
        resolve(null)
      })
    })
  }

  /**
   * 获得文件
   * @param {*文件路径} path 
   */
  async getFile(path) {
    try {
      let fe = await this._getFileEntry(path)
      return toPromise(fe.file, fe)
    } catch (err) {
      return Promise.resolve(null)
    }
  }

  /**
   * 往文件写入内容
   * @param {*文件路径} path 
   * @param {*写入的内容} content 
   * @param {*数据类型} type 
   * @param {*是否是append} append 
   */
  async writeToFile(path, content, type = 'text/plain', append = false) {
    if (!path) {
      Promise.reject(new Error('path参数为空'))
    }

    let dir = path.substring(0, path.lastIndexOf('/'))
    let dirEntry = await this.resolveLocalFileSystemURL(dir)
    if (!dirEntry) {
      dirEntry = await this.ensureDirectory(dir)
    }

    let fe = await this._getFileEntry(path, true)
    let writer = await toPromise(fe.createWriter, fe)
    let data = content

    // 不是blob，转为blob
    if (content instanceof ArrayBuffer) {
      data = new Blob([new Uint8Array(content)], { type })
    } else if (typeof content === 'string') {
      data = new Blob([content], { type: 'text/plain' })
    } else {
      data = new Blob([content])
    }

    if (append) {
      writer.seek(writer.length)
    }

    return new Promise((resolve, reject) => {
      // 写入成功
      writer.onwriteend = () => {
        resolve(data)
      }

      // 写入失败
      writer.onerror = (err) => {
        reject(err)
      }

      writer.write(data)
    })
  }

  /**
   * 获取指定目录下的文件和文件夹
   * @param {*路径} path 
   */
  async readEntries(path = '') {
    let entry = null
    if (!path) {
      entry = this._root
    } else {
      entry = await this.resolveLocalFileSystemURL(path)
    }

    // let reader = entry.createReader()
    // return toPromise(reader.readEntries, reader).then
    let refResults = []
    let entries = await this._readEntriesRecursively(entry, refResults)
    refResults.push(entry)
    refResults.sort((a, b) => a.fullPath > b.fullPath)
    return refResults.map(entry => entry.fullPath)
  }

  /**
   * 获取所有的文件和文件夹，按照路径排序
   */
  async readAllEntries() {
    let refResults = []
    let entries = await this._readEntriesRecursively(this._root, refResults)
    refResults.sort((a, b) => a.fullPath > b.fullPath)
    return refResults.map(entry => entry.fullPath)
  }

  /**
   * 确认目录存在，递归检查，没有会自动创建
   * 
   * @param {*} directory 
   */
  async ensureDirectory(directory = '') {
    // 过滤空的目录，比如 '/music/' => ['','music','']
    let _dirs = directory.split('/').filter(v => !!v)

    if (!_dirs || _dirs.length === 0) {
      return Promise.resolve(true)
    }

    return promiseForEach(_dirs, (dir, index) => {
      return this._getDirectory(_dirs.slice(0, index + 1).join('/'), true)
    }, true).then((dirEntes) => {
      return (dirEntes && dirEntes[dirEntes.length - 1]).fullPath
    })
  }

  /**
   * 清除所有的文件和文件夹
   */
  async clear() {
    let entries = await this.readEntries()
    let ps_entries = entries.map(e => e.isFile ? toPromise(e.remove, e) : toPromise(e.removeRecursively, e))
    return Promise.all(ps_entries).then(r => true)
  }

  /**
  * Promise里面的错误处理
  * @param {*reject}  
  */
  errorHandler(reject) {
    return (error) => {
      reject(error)
    }
  }

}

// 测试语句
// 读取某个目录的子目录和文件：  FSProvider.getInstance().then(fs=>fs.readEntries()).then(f=>console.log(f))
// 写文件         FSProvider.getInstance().then(fs=>fs.writeToFile('music/txt.txt','爱死你')).then(f=>console.log(f))
// 获取文件：     FSProvider.getInstance().then(fs=>fs.getFile('music/txt.txt')).then(f=>console.log(f))
// 递归创建目录：  FSProvider.getInstance().then(fs=>fs.ensureDirectory('music/vbox')).then(r=>console.log( r))
// 递归获取：     FSProvider.getInstance().then(fs=>fs.readAllEntries()).then(f=>console.log(f))
// 删除所有：     FSProvider.getInstance().then(fs=>fs.clear()).then(f=>console.log(f)).catch(err=>console.log(err)) 

let _IDB_ = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange

class IDBProvider {

  constructor() {
    // DB
    this._db = null
    // 实例
    this._instance = null
    // store Name
    this._storeName = IDBProvider._storeName
  }

  get transaction() {
    return this._db.transaction([this._storeName], IDBTransaction.READ_WRITE || 'readwrite')
  }

  _toPromise(method, ...args) {
    try {
      return new Promise((resolve, reject) => {
        // 获得事务
        let trans = this.transaction
        // 获得请求
        let req = trans.objectStore(this._storeName)[method](...args)
        // 请求成功
        req.onsuccess = event => resolve(event.target.result)
        // 请求失败
        req.onerror = event => reject(req.error)
        // 事务失败
        trans.onerror = event => reject(trans.error)
      })
    } catch (err) {
      Promise.reject(err)
    }
  }

  static getInstance(dbVersion = 1.0) {
    if (this._instance) {
      Promise.resolve(this._instance)
    }
    return new Promise((resolve, reject) => {
      let request = _IDB_.open(IDBProvider._dbName, dbVersion)
      request.onerror = event => {
        return reject(null)
      }
      request.onsuccess = event => {
        let db = request.result
        // 老版本，新版本是onupgradeneeded
        if (db.setVersion && db.version !== dbVersion) {
          var setVersion = db.setVersion(dbVersion)
          setVersion.onsuccess = function () {
            db.createObjectStore(this._storeName)
            this._instance = new IDBProvider()
            this._instance._db = request.result
            return resolve(this._instance)
          }
        } else {
          this._instance = new IDBProvider()
          this._instance._db = request.result
          return resolve(this._instance)
        }
      }
      request.onupgradeneeded = event => {
        event.target.result.createObjectStore(this._storeName)
      }
    })
  }

  /**
   * 获取文件 
   * @param {*String} path 
   */
  getFile(path) {
    return this._toPromise('get', path)
  }

  /**
   * 写入文件
   * @param {*String} path 路径
   * @param {*String|Blob} content 内容 
   * @param {*String} type 
   * @param {*String} append 暂无用
   */
  async writeToFile(path, content, type = null, append = false) {
    let data = content
    // 不是blob，转为blob
    if (content instanceof ArrayBuffer) {
      data = new Blob([new Uint8Array(content)], { type })
    } else if (typeof content === 'string') {
      data = new Blob([content], { type: 'text/plain' })
    } else {
      data = new Blob([content])
    }
    await this._toPromise('put', data, path)
    return this.getFile(path)

    /*
    return new Promise((resolve, reject) => {
        let data = content
        // 不是blob，转为blob
        if (content instanceof ArrayBuffer) {
            data = new Blob([new Uint8Array(content)], { type })
        } else if (typeof content === 'string') {
            data = new Blob([content])
        }
 
        // 存入数据
        let trans = this.transaction
        trans.objectStore(this._storeName).put(data, path)
 
        trans.objectStore(this._storeName).get(path).onsuccess = event => {
            resolve(event.target.result)
        }
 
        trans.onerror = event => {
            reject(trans.error)
        }
    }) */
  }

  readEntries(path = '') {
    if (!path) {
      return this.readAllEntries()
    }
    return this._toPromise('getAllKeys', IDBKeyRange.lowerBound(path)).then(r => r.filter(p => {
      // 以当前路径开头 && （截断当前为空字符串，或者截断后以/开头）
      return p.indexOf(path) === 0 && (p.substring(path.length) === '' || p.substring(path.length).indexOf('/') === 0)
    }))
  }

  readAllEntries() {
    return this._toPromise('getAllKeys')
  }

  ensureDirectory(directory = '') {
    return Promise.resolve(directory)
  }

  clear() {
    return this._toPromise('clear').then(r => true)
  }

  /**
   * 加工处理path，比如特殊字符，比如以/开头等等
   * @param {*String} path 
   */
  _handlePath(path) {
    return path
  }
}

IDBProvider._dbName = '_fs_db_'
IDBProvider._storeName = '_fs_store'

// 测试语句
// 读取某个目录的子目录和文件：  IDBProvider.getInstance().then(fs=>fs.readEntries()).then(f=>console.log(f))
// 写文件         IDBProvider.getInstance().then(fs=>fs.writeToFile('music/txt.txt','爱死你')).then(f=>console.log(f))
// 获取文件：     IDBProvider.getInstance().then(fs=>fs.getFile('music/txt.txt')).then(f=>console.log(f))
// 递归创建目录：  IDBProvider.getInstance().then(fs=>fs.ensureDirectory('music/vbox')).then(r=>console.log( r))
// 递归获取：     IDBProvider.getInstance().then(fs=>fs.readAllEntries()).then(f=>console.log(f))
// 删除所有：     IDBProvider.getInstance().then(fs=>fs.clear()).then(f=>console.log(f)).catch(err=>console.log(err)) 

if (support.FileSystem) {
  window.FileSystem = FSProvider
} else if (support.IndexedDB) {
  window.FileSystem = IDBProvider
}