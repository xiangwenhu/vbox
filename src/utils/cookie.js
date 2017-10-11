export default {
  get: function (name) {
    var m = document.cookie.match(new RegExp(`(^| )${name}=([^;]*)(;|$)`))
    return !m ? '' : unescape(m[2])
  }
}