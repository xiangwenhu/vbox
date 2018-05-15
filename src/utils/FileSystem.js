(function () {
  const FILE_ERROR = {
    INITIALIZE_FAILED: '文件系统初始化失败',
    FILE_EXISTED: '文件已存在',
    Directory_EXISTED: '目录已存在',
    ONLY_FILE_WRITE: '只有文件才能写入',
    NOT_ENTRY: '不是有效的Entry对象',
    INVALID_PATH: '文件或者目录不能包含\\/:*?"<>|'
  }
  const DIR_SEPARATOR = '/'
  const DIR_OPEN_BOUND = String.fromCharCode(DIR_SEPARATOR.charCodeAt(0) + 1)

  /**
   * https://segmentfault.com/q/1010000007499416
   * Promise for forEach
   * @param {*数组} arr 
   * @param {*回调} cb(val)返回的应该是Promise 
   * @param {*是否需要执行结果集} needResults
   */
  const promiseForEach = function promiseForEach(arr, cb, needResults) {
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

  const URLUtil = {
    _pathBlackList: /[\\:*?"<>|]/,
    // from https://github.com/ebidel/idb.filesystem.js/blob/master/src/idb.filesystem.js
    // When saving an entry, the fullPath should always lead with a slash and never
    // end with one (e.g. a directory). Also, resolve '.' and '..' to an absolute
    // one. This method ensures path is legit!
    resolveToFullPath(cwdFullPath, path) {
      var fullPath = path

      var relativePath = path[0] !== DIR_SEPARATOR
      if (relativePath) {
        fullPath = cwdFullPath + DIR_SEPARATOR + path
      }

      // Normalize '.'s,  '..'s and '//'s.
      var parts = fullPath.split(DIR_SEPARATOR)
      var finalParts = []
      for (var i = 0; i < parts.length; ++i) {
        var part = parts[i]
        if (part === '..') {
          // Go up one level.
          if (!finalParts.length) {
            throw Error('Invalid path')
          }
          finalParts.pop()
        } else if (part === '.') {
          // Skip over the current directory.
        } else if (part !== '') {
          // Eliminate sequences of '/'s as well as possible leading/trailing '/'s.
          finalParts.push(part)
        }
      }

      fullPath = DIR_SEPARATOR + finalParts.join(DIR_SEPARATOR)

      // fullPath is guaranteed to be normalized by construction at this point:
      // '.'s, '..'s, '//'s will never appear in it.

      return fullPath
    },

    isValidatedPath(path) {
      return !this._pathBlackList.test(path)
    }
  }

  class FileError {
    constructor({ code = 999, message = '未知错误' } = { code: 999, message: '未知错误' }) {
      this.code = code
      this.message = message
    }
  }
  class Metadata {
    constructor(modificationTime, size) {
      this.modificationTime = modificationTime
      this.size = size
    }
  }
  class FSFile {
    constructor(name, size, type, lastModifiedDate, blob) {
      this.name = name
      this.size = size
      this.type = type
      this.lastModifiedDate = lastModifiedDate
      this.blob = blob
    }
  }
  const ReaderUtil = {
    read(blob, method) {
      return new Promise((resolve, reject) => {
        var reader = new FileReader()
        var ps = [].slice.call(arguments, 2)
        ps.unshift(blob)
        reader[method].apply(reader, ps)
        reader.onload = function () {
          return resolve(reader.result)
        }
        reader.onerror = function (err) {
          return reject(err)
        }
        reader.onabort = function () {
          return reject(new Error('读取被中断'))
        }
      })
    },
    readAsArrayBuffer(blob) {
      return this.read(blob, 'readAsArrayBuffer')
    },
    readAsBinaryString(blob) {
      return this.read(blob, 'readAsBinaryString')
    },
    readAsDataURL(blob) {
      return this.read(blob, 'readAsDataURL')
    },
    readAsText(blob, encoding = 'gb2312') {
      return this.read(blob, 'readAsText', encoding)
    }
  }

  const NOT_IMPLEMENTED_ERROR = new FileError({
      code: 1000,
      message: '方法未实现'
    }),
    NOT_FOUND_ERROR = new FileError({
      code: 404,
      message: '未找到'
    }),
    NOT_SUPPORTED = new Error('So Low , So Young')

  class Entry {
    constructor(isFile = true, isDirectory = false, name, fullPath) {
      this.isFile = isFile
      this.isDirectory = isDirectory
      this.name = name
      this.fullPath = fullPath
      this.metadata = {
        lastModifiedDate: new Date(),
        size: 0
      }
    }

    /**
     * 获取元数据 done
     */
    getMetadata() {
      return this._dispatch('getMetadata')
    }

    moveTo() {
      throw NOT_IMPLEMENTED_ERROR
      // this._dispatch('moveTo', [...arguments])
    }

    copyTo() {
      throw NOT_IMPLEMENTED_ERROR
      // this._dispatch('copyTo', [...arguments])
    }

    toURL() {
      return this._dispatch('toURL')
    }

    /**
     * 删除  done
     */
    remove() {
      return this._dispatch('remove')
    }

    /**
     * 获得父目录 done
     */
    getParent() {
      return this._dispatch('getParent')
    }
  }

  Entry.prototype._dispatch = function (method, ...args) {
    return new Promise(resolve => {
      if (FileSystem._instance) {
        return resolve(FileSystem._instance[method](this, ...args))
      }
      return FileSystem.getInstance().then(fs => {
        FileSystem._instance = fs
        return resolve(FileSystem._instance[method](this, ...args))
      })
    })
  }
  Entry.copyFrom = function (entry) {
    var en = entry.isFile ? new FileEntry(entry.name, entry.fullPath, entry.file)
      : new DirectoryEntry(entry.name, entry.fullPath)
    en.metadata = entry.metadata
    return en
  }

  class FileEntry extends Entry {
    constructor(name, fullPath, file) {
      super(true, false, name, fullPath)
      this.file = file
    }
    /**
     * FileEntry写入数据 done
     * @param {Blob|String|BufferArray} content 
     * @param {String} type 
     * @param {Boolean} append 
     */
    write(content, type = 'text/plain', append = false) {
      return this._dispatch('write', content, type, append)
    }

    getBlob() {
      return this._dispatch('getBlob')
    }

    readAsArrayBuffer() {
      return this._dispatch('readFile', 'readAsArrayBuffer')
    }

    readAsBinaryString() {
      return this._dispatch('readFile', 'readAsBinaryString')
    }

    readAsDataURL() {
      return this._dispatch('readFile', 'readAsDataURL')
    }

    readAsText(encoding = 'utf-8') {
      return this._dispatch('readFile', 'readAsText', encoding)
    }
  }

  class DirectoryEntry extends Entry {
    constructor(name, fullPath) {
      super(false, true, name, fullPath)
    }

    /**
     * 获取文件 done
     * @param {String} path 路径
     * @param {Object} options  create:是否创建 ， exclusive 排他
     */
    getFile(path, options = { create: true, exclusive: false }) {
      if (!URLUtil.isValidatedPath(path)) {
        return Promise.reject(FILE_ERROR.INVALID_PATH)
      }
      return this._dispatch('getFile', path, options)
    }

    /**
     * 获取目录 done
     * @param {String} path 
     * @param {Object} options 
     */
    getDirectory(path, options = { create: true, exclusive: false }) {
      if (!URLUtil.isValidatedPath(path)) {
        return Promise.reject(FILE_ERROR.INVALID_PATH)
      }
      return this._dispatch('getDirectory', path, options)
    }

    /**
     * 递归删除 done
     */
    remove() {
      return this._dispatch('removeRecursively')
    }

    /**
     * 获取目录下的目录和文件
     */
    getEntries() {
      return this._dispatch('getEntries')
    }

    ensureDirectory(path) {
      return this._dispatch('ensureDirectory', path)
    }
  }

  class FileSystem {
    constructor() {
      // DB
      this._db = null
      // 实例
      this._instance = null
      // store Name
      this._storeName = FileSystem._storeName
      // root
      this.root = null
      // 0 未初始化， 1初始化中
      this._state = 0
    }

    static getInstance(dbVersion = 1.0) {
      if (!FileSystem.isSupported) {
        throw NOT_SUPPORTED
      }
      if (this._instance) {
        Promise.resolve(this._instance)
      }
      // 确保同一实例
      if (this._state === 1) {
        return new Promise((resolve, reject) => {
          let times = 0
          let ticket = setInterval(() => {
            if (this._instance && this._state === 2) {
              times++
              clearInterval(ticket)
              return resolve(this._instance)
            }
            if (times > 10) {
              return reject(FILE_ERROR.INITIALIZE_FAILED)
            }
          }, 5)
        })
      }
      // 标记在初始化中
      this._state = 1
      return new Promise((resolve, reject) => {
        let request = self.indexedDB.open(FileSystem._dbName, dbVersion)
        request.onerror = () => {
          this._state = 0
          return reject(null)
        }
        request.onsuccess = () => {
          let db = request.result
          // 老版本，新版本是onupgradeneeded
          if (db.setVersion && db.version !== dbVersion) {
            var setVersion = db.setVersion(dbVersion)
            setVersion.onsuccess = function () {
              db.createObjectStore(this._storeName)
              this._instance = new FileSystem()
              this._instance._db = request.result
              this._instance.root = new DirectoryEntry('/', '/')
              this._state = 2
              return resolve(this._instance)
            }
          } else {
            this._instance = new FileSystem()
            this._instance._db = request.result
            this._instance.root = new DirectoryEntry('/', '/')
            this._state = 2
            return resolve(this._instance)
          }
          return null
        }
        request.onupgradeneeded = event => {
          event.target.result.createObjectStore(this._storeName)
        }
      })
    }

    get transaction() {
      return this._db.transaction([this._storeName], IDBTransaction.READ_WRITE || 'readwrite')
    }

    _toPromise(method, ...args) {
      try {
        let suc
        if (args.length >= 1 && typeof args[args.length - 1] === 'function') {
          suc = args[args.length - 1]
          args = args.slice(0, args.length - 1)
        }

        return new Promise((resolve, reject) => {
          // 获得事务
          let trans = this.transaction
          // 获得请求
          let req = trans.objectStore(this._storeName)[method](...args)
          // 游标
          if (['openCursor', 'openKeyCursor'].indexOf(method) >= 0 && suc) {
            req.onsuccess = function (event) {
              suc(event)
            }
            trans.oncomplete = function () {
              return resolve()
            }
            trans.onsuccess = function () {
              return resolve()
            }
          } else {
            // 如果是onsuccess 就返回，只表示请求成功，当大文件存储的时候，并不是已经写入完毕才返回
            // req.onsuccess = event => resolve(event.target.result)
            trans.oncomplete = function () {
              return resolve(req.result)
            }
            trans.onsuccess = function () {
              return resolve(req.result)
            }
          }
          // 请求失败
          req.onerror = () => reject(req.error)
          // 事务失败
          trans.onerror = () => reject(trans.error)
        })
      } catch (err) {
        return Promise.reject(err)
      }
    }

    /**
     * 
     * @param {Entry} entry 
     * @param {写入的内容} content 
     * @param {blob类型} type 
     * @param {是否是append模式} append 
     */
    write(entry, content, type = 'text/plain', append = false) {
      this._checkEntry(entry)
      if (entry.isFile !== true) {
        throw new FileError({ message: FILE_ERROR.ONLY_FILE_WRITE })
      }
      let data = content
      // 不是blob，转为blob
      if (content instanceof ArrayBuffer) {
        data = new Blob([new Uint8Array(content)], { type })
      } else if (typeof content === 'string') {
        data = new Blob([content], { type: 'text/plain' })
      } else if (typeof content.type === 'string') {
        data = new Blob([content], { type: content.type })
      } else {
        data = new Blob([content], { type })
      }
      let file = entry.file
      if (!file) {
        // 不存在创建
        file = new FSFile(entry.fullPath.split(DIR_SEPARATOR).pop(), data.size, type, new Date(), data)
        entry.metadata.lastModifiedDate = file.lastModifiedDate
        entry.metadata.size = data.size
        entry.file = file
      } else {
        // 存在更新
        file.lastModifiedDate = new Date()
        file.type = type
        file.size = data.size
        file.blob = data
        entry.metadata.lastModifiedDate = file.lastModifiedDate
        entry.metadata.size = data.size
      }

      return this._toPromise('put', entry, entry.fullPath).then(() => entry)
    }

    /**
     * 
     * @param {Entry} entry 
     * @param {String} path 
     * @param {Object} create 是否创建  exclusive排他
     */
    getFile(entry, path, { create, exclusive }) {
      return this.getEntry(...arguments, true)
    }

    getDirectory(entry, path, { create, exclusive }) {
      return this.getEntry(...arguments, false)
    }

    remove(entry) {
      this._checkEntry(entry)
      return this._toPromise('delete', entry.fullPath).then(() => true)
    }

    removeRecursively(entry) {
      this._checkEntry(entry)
      var range = IDBKeyRange.bound(entry.fullPath, entry.fullPath + DIR_OPEN_BOUND, false, true)
      return this._toPromise('delete', range).then(() => true)
    }

    /**
     * 获得元数据
     * @param {Entry} entry 
     */
    getMetadata(entry) {
      let f = entry.file || {}
      return new Metadata(f && f.lastModifiedDate || null, f && f.size || 0)
    }

    /**
     * 获取文件或者目录
     * @param {Entry} entry 
     * @param {String} path 
     * @param {String} param2 
     * @param {Boolean} getFile true获取文件 false 获取目录
     */
    getEntry(entry, path, { create, exclusive = false }, getFile = true) {
      this._checkEntry(entry)
      if (path === DIR_SEPARATOR) {
        // 如果获取'/'直接返回当前目录
        return entry
      }
      path = URLUtil.resolveToFullPath(entry.fullPath, path)
      return this._toPromise('get', path).then(fe => {
        if (create === true && exclusive === true && fe) {
          // 创建 && 排他 && 存在
          throw new FileError({
            message: getFile ? FILE_ERROR.FILE_EXISTED : FILE_ERROR.Directory_EXISTED
          })
        } else if (create === true && !fe) {
          // 创建 && 文件不存在
          let name = path.split(DIR_SEPARATOR).pop(),
            newEntry = getFile ? new FileEntry(name, path) : new DirectoryEntry(name, path),
            fileE = getFile ? new FSFile(name, 0, null, new Date(), null) : null
          if (getFile) newEntry.file = fileE
          return this._toPromise('put', newEntry, newEntry.fullPath).then(() => {
            return Entry.copyFrom(newEntry)
          })
        } else if (!create && !fe) {
          // 不创建 && 文件不存在
          // throw NOT_FOUND_ERROR
          return null
        } else if (fe && fe.isDirectory && getFile || fe && fe.isFile && !getFile) {
          // 不创建 && entry存在 && 是目录 && 获取文件 || 不创建 && entry存在 && 是文件 && 获取目录
          throw new FileError({
            code: 1001,
            message: getFile ? FILE_ERROR.Directory_EXISTED : FILE_ERROR.FILE_EXISTED
          })
        } else {
          return Entry.copyFrom(fe)
        }
      })
    }

    /**
     * 获得父目录
     * @param {Entry} entry 
     */
    getParent(entry) {
      this._checkEntry(entry)
      // 已经是根目录
      if (entry.fullPath === DIR_SEPARATOR) {
        return entry
      }
      let parentFullPath = entry.fullPath.substring(0, entry.fullPath.lastIndexOf(DIR_SEPARATOR))
      // 上级目录为根目录的情况
      if (parentFullPath === '') {
        return this.root
      }
      return this.getDirectory(this.root, parentFullPath, { create: false }, false)
    }

    /**
     * 获得目录下的目录和文件
     * @param {Entry} entry 
     */
    getEntries(entry) {
      let range = null,
        results = []
      if (entry.fullPath !== DIR_SEPARATOR && entry.fullPath !== '') {
        // console.log(fullPath + '/', fullPath + DIR_OPEN_BOUND)
        range = IDBKeyRange.bound(
          entry.fullPath + DIR_SEPARATOR, entry.fullPath + DIR_OPEN_BOUND, false, true)
      }

      let valPartsLen, fullPathPartsLen
      return this._toPromise('openCursor', range, function (event) {
        var cursor = event.target.result
        if (cursor) {
          var val = cursor.value
          valPartsLen = val.fullPath.split(DIR_SEPARATOR).length
          fullPathPartsLen = entry.fullPath.split(DIR_SEPARATOR).length
          if (val.fullPath !== DIR_SEPARATOR) {
            // 区分根目录和非根目录
            if (entry.fullPath === DIR_SEPARATOR && valPartsLen < fullPathPartsLen + 1 ||
              entry.fullPath !== DIR_SEPARATOR && valPartsLen === fullPathPartsLen + 1) {
              results.push(val.isFile ? new FileEntry(val.name, val.fullPath, val.file) : new DirectoryEntry(val.name, val.fullPath))
            }
          }
          cursor['continue']()
        }
      }).then(() => results)
    }

    toURL(entry) {
      this._checkEntry(entry)
      if (entry.file && entry.file.blob) {
        return URL.createObjectURL(entry.file.blob)
      }
      return null
    }

    readFile(entry, method, ...args) {
      this._checkEntry(entry)
      if (entry.file && entry.file.blob) {
        return ReaderUtil.read(entry.file.blob, method, ...args)
      }
      throw NOT_FOUND_ERROR
    }

    getBlob(entry) {
      this._checkEntry(entry)
      if (entry.file && entry.file.blob) {
        return entry.file.blob
      }
      throw NOT_FOUND_ERROR
    }

    /**
     * 检查Entry
     * @param {*Entry} entry 
     */
    _checkEntry(entry) {
      if (!entry || !(entry instanceof Entry)) {
        throw new FileError({ message: FILE_ERROR.NOT_ENTRY })
      }
    }

    /**
     * 
     * @param {Entry} entry 
     * @param {path} path 
     */
    ensureDirectory(entry, path) {
      this._checkEntry(entry)
      if (path === DIR_SEPARATOR) {
        // 如果获取'/'直接返回当前目录
        return entry
      }
      let rPath = URLUtil.resolveToFullPath(entry.fullPath, path)
      if (rPath.length < path.length) {
        return entry
      }
      path = rPath.substring(entry.fullPath.length)
      let dirs = path.split(DIR_SEPARATOR)
      return promiseForEach(dirs, (dir, index) => {
        return entry.getDirectory(dirs.slice(0, index + 1).join('/'), { create: true })
      }, true).then((dirEntes) => {
        return dirEntes && dirEntes[dirEntes.length - 1]
      }).catch(err => { throw err })
    }
  }

  FileSystem.isSupported = () => {
    self.indexedDB_ = self.indexedDB || self.mozIndexedDB || self.webkitIndexedDB || self.msIndexedDB
    self.IDBTransaction = self.IDBTransaction || self.webkitIDBTransaction || self.msIDBTransaction
    self.IDBKeyRange = self.IDBKeyRange || self.webkitIDBKeyRange || self.msIDBKeyRange
    return !!(self.indexedDB && self.IDBTransaction && self.IDBKeyRange)
  }

  FileSystem._dbName = '_fs_db_'
  FileSystem._storeName = '_fs_store'

  self.FILE_ERROR = FILE_ERROR
  self.URLUtil = URLUtil
  self.ReaderUtil = ReaderUtil
  self.Entry = Entry
  self.FileEntry = FileEntry
  self.DirectoryEntry = DirectoryEntry
  self.FileSystem = FileSystem
})(self)

