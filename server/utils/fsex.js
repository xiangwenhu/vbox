const fs = require('fs')

module.exports = {
  readdir: dir => {
    return new Promise((resolve, reject) => {
      fs.readdir(dir, (err, files) => {
        if (err) {
          return reject(err)
        }
        console.log(files)
        return resolve(files)
      })
    })
  },
  readFile: path => {
    return new Promise(function (resolve, reject) {
      fs.readFile(path, function (err, data) {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      })
    }).then(function (data) {
      console.log(data)
      return data
    }, function (err) {
      console.log(err)
      return err
    })
  }
}
