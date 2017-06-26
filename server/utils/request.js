const request = require('request')
const TIME_OUT = 30000

let baseRequest = request.defaults({
  timeout: TIME_OUT
})

module.exports = {
  get get () {
    return (url, options = {}) => {
      return new Promise((resolve, reject) => {
        baseRequest.get(url, options, (error, response, body) => {
          if (error) {
            reject(error)
          }
          resolve(body)
        })
      })
    }
  },
  get post () {
    return (options, useResponse = false) => {
      return new Promise((resolve, reject) => {
        baseRequest.post(options, (error, response, body) => {
          if (error) {
            reject(error)
          }
          if (!useResponse) {
            resolve(body)
          }
          resolve({
            body,
            response
          })
        })
      })
    }
  }
}
