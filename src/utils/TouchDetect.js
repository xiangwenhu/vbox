/**
 * 获得角度,http://www.cnblogs.com/beiz/p/5817192.html
 * @param {Number} angx x方向移动的长度 区分正负
 * @param {Number} angy y方向移动的长度 区分正负
 */
function getAngle(angx, angy) {
  return Math.atan2(angy, angx) * 180 / Math.PI
}

/**
 * 根据起点终点返回方向 1向上 2向下 3向左 4向右 0未滑动 ,http://www.cnblogs.com/beiz/p/5817192.html
 * @param {Number} startx 起始的x
 * @param {Number} starty 起始的y
 * @param {Number} endx   结束的x
 * @param {Number} endy   结束的y 
 * @param {Number} dx     x方向滑动最小距离
 * @param {Number} dy     y方向滑动最小距离
 */
function getDirection(startx, starty, endx, endy, dx = 20, dy = 20) {
  let angx = endx - startx
  let angy = endy - starty
  let result = 0

  // 如果滑动距离太短
  if (Math.abs(angx) < dx && Math.abs(angy) < dy) {
    return result
  }

  var angle = getAngle(angx, angy)
  if (angle >= -135 && angle <= -45) {
    result = 1
  } else if (angle > 45 && angle < 135) {
    result = 2
  } else if ((angle >= 160 && angle <= 180) || (angle >= -180 && angle < -160)) {
    result = 3
  } else if (angle >= -20 && angle <= 20) {
    result = 4
  }
  return result
}

export const detect = function (startPoint, endPoint, options = {}) {
  return getDirection(startPoint.pageX, startPoint.pageY, endPoint.pageX, endPoint.pageY, options.dx, options.dy)
}

