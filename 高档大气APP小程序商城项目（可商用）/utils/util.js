// 防抖函数
export function debounce (fn, delay = 500) {
  var timer
  return function() {
    var args = arguments
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.apply(this, args)   // this 指向vue
    }, delay)
  }
}

/**
 * 处理富文本里的图片宽度自适应
 * 1.去掉img标签里的style、width、height属性
 * 2.修改所有style里的width属性为max-width:100%
 * 3.img标签添加style属性：max-width:100%;height:auto
 * 4.去掉<br/>标签
 * @param html
 * @return string
 */
export function formatRichText (html) {
// 去掉img标签里的style、width、height属性
  let newContent = html.replace(/<img[^>]*>/gi, function(match, capture) {
    match = match.replace(/style="[^"]+"/gi, '').replace(/style='[^']+'/gi, '')
    match = match.replace(/width="[^"]+"/gi, '').replace(/width='[^']+'/gi, '')
    match = match.replace(/height="[^"]+"/gi, '').replace(/height='[^']+'/gi, '')
    return match
  })
  // 修改所有style里的width属性为max-width:100%
  newContent = newContent.replace(/style="[^"]+"/gi, function(match, capture) {
    match = match.replace(/width:[^;]+;/gi, 'max-width:100%;').replace(/width:[^;]+;/gi, 'max-width:100%;')
    return match
  })
  // 去掉<br/>标签
  newContent = newContent.replace(/<br[^>]*\/>/gi, '')
  // img标签添加style属性：max-width:100%;height:auto
  newContent = newContent.replace(/\<img/gi, '<img style="max-width:100%;height:auto;display:block;margin:0px auto;"')
  return newContent
}

// 身份证正则验证
export function checkIdCard (val) {
  var p = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
  var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
  var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2]
  var code = val.substring(17)
  if (p.test(val)) {
    var sum = 0
    for (var i = 0; i < 17; i++) {
      sum += val[i] * factor[i]
    }
    if (parity[sum % 11] == code.toUpperCase()) {
      return true
    }
  }
  return false
}

// 倒计时
export function countDownUtil (endData, startData = Number(String(new Date().getTime()).substring(0, 10))) {
  try {
    if (startData) {
      if (Date.parse(startData.replace(/-/g, '/'))) {
        // 如果有开始时间 如果是YY-dd-MM格式的，转化为时间戳
        startData = Date.parse(startData.replace(/-/g, '/')) / 1000
      }
    }
  }catch (e) {
  }
  try {
    if (Date.parse(endData.replace(/-/g, '/'))) {
      // 如果是YY-dd-MM格式的，转化为时间戳
      endData = Date.parse(endData.replace(/-/g, '/')) / 1000
    }
  }catch (e) {
  }

  let timeObj = {
    hou: '',
    min: '',
    sec: ''
  }
  let surplusTime = endData - startData
  if (surplusTime > 0) {
    timeObj.hou =
      parseInt((surplusTime % (60 * 60 * 24)) / 3600) < 10
        ? '0' + parseInt((surplusTime % (60 * 60 * 24)) / 3600)
        : parseInt((surplusTime % (60 * 60 * 24)) / 3600)
    timeObj.min =
      parseInt(((surplusTime % (60 * 60 * 24)) % 3600) / 60) < 10
        ? '0' + parseInt(((surplusTime % (60 * 60 * 24)) % 3600) / 60)
        : parseInt(((surplusTime % (60 * 60 * 24)) % 3600) / 60)
    timeObj.sec =
      parseInt(((surplusTime % (60 * 60 * 24)) % 3600) % 60) < 10
        ? '0' + parseInt(((surplusTime % (60 * 60 * 24)) % 3600) % 60)
        : parseInt(((surplusTime % (60 * 60 * 24)) % 3600) % 60)

    let timer = setInterval(() => {
      --timeObj.sec
      if (timeObj.sec < 0) {
        timeObj.sec = 59
        --timeObj.min
        if (timeObj.min < 0) {
          timeObj.min = 59
          --timeObj.hou
          if (timeObj.hou < 0) {
            // 如果秒杀结束，清除倒计时，重新获取秒杀接口
            clearInterval(timer)
          } else if (timeObj.hou < 10) {
            // 小于10在前面追加0
            timeObj.hou = '0' + timeObj.hou
          }
        } else if (timeObj.min < 10) {
          // 小于10在前面追加0
          timeObj.min = '0' + timeObj.min
        }
      } else if (timeObj.sec < 10) {
        // 小于10在前面追加0
        timeObj.sec = '0' + timeObj.sec
      }
    }, 1000)
  }
  return timeObj
}

// 检查登录状态
export function checkLogin(){
  if (!uni.getStorageSync('token')) {
    uni.showToast({
      title: '请先登录，2秒后将跳转到登录页面',
      icon: 'none',
      duration: 3000
    })
    setTimeout(() => {
      uni.navigateTo({
        url: '/pages/public/login'
      })
    }, 2000)
    return false
  }
  return true
}

export function getYMDHMS (timestamp) {
  let time = new Date(timestamp * 1000)
  console.log(time)
  let year = time.getFullYear()
  const month = (time.getMonth() + 1).toString().padStart(2, '0')
  const date = (time.getDate()).toString().padStart(2, '0')
  const hours = (time.getHours()).toString().padStart(2, '0')
  const minute = (time.getMinutes()).toString().padStart(2, '0')
  const second = (time.getSeconds()).toString().padStart(2, '0')
  return month + '-' + date + ' ' + hours + ':' + minute + ':' + second
}


