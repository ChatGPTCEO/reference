// 消息时间差转化
export const getDateDiff = (dateTimeStamp: number) => {
  dateTimeStamp = dateTimeStamp * 1000
  const minute = 1000 * 60; //把分，时，天，周，半个月，一个月用毫秒表示
  const hour = minute * 60;
  const day = hour * 24;
  const week = day * 7;
  const month = day * 30;
  const now = new Date().getTime(); //获取当前时间毫秒
  const diffValue = now - dateTimeStamp; //时间差

  if (diffValue < 0) {
    console.log("diffValue<0", dateTimeStamp, dateTimeStamp, now, diffValue);
    return '刚刚';
  }
  const minC = diffValue / minute; //计算时间差的分，时，天，周，月
  const hourC = diffValue / hour;
  const dayC = diffValue / day;
  const weekC = diffValue / week;
  const monthC = diffValue / month;
  let result = "2";
  if (monthC >= 1 && monthC <= 3) {
    result = " " + parseInt(String(monthC)) + "月前"
  } else if (weekC >= 1 && weekC <= 3) {
    result = " " + parseInt(String(weekC)) + "周前"
  } else if (dayC >= 1 && dayC <= 6) {
    result = " " + parseInt(String(dayC)) + "天前"
  } else if (hourC >= 1 && hourC <= 23) {
    result = " " + parseInt(String(hourC)) + "小时前"
  } else if (minC >= 1 && minC <= 59) {
    result = " " + parseInt(String(minC)) + "分钟前"
  } else if (diffValue >= 0 && diffValue <= minute) {
    result = "刚刚"
  } else {
    const datetime = new Date();
    datetime.setTime(dateTimeStamp);
    const Nyear = datetime.getFullYear();
    const Nmonth = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
    const Ndate = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
    const Nhour = datetime.getHours() < 10 ? "0" + datetime.getHours() : datetime.getHours();
    const Nminute = datetime.getMinutes() < 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
    const Nsecond = datetime.getSeconds() < 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
    result = Nyear + "-" + Nmonth + "-" + Ndate
  }
  return result;
}

export const formatData = (dateTimeStamp: number) => {
  dateTimeStamp = dateTimeStamp * 1000
  const datetime = new Date(dateTimeStamp)
  const Nyear = datetime.getFullYear();
  const Nmonth = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
  const Ndate = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
  const Nhour = datetime.getHours() < 10 ? "0" + datetime.getHours() : datetime.getHours();
  const Nminute = datetime.getMinutes() < 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
  const Nsecond = datetime.getSeconds() < 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
  return Nyear + "-" + Nmonth + "-" + Ndate + ' ' + Nhour + ":" + Nminute + ':' + Nsecond
}

export function formatSimpleDateTime(unixStamp: number) {
  unixStamp *= 1000
  const _today_obj = new Date()
  const _today_date = {
    y: _today_obj.getFullYear(),
    m: (_today_obj.getMonth() + 1 < 10 ? '0' + (_today_obj.getMonth() - -1) : (_today_obj.getMonth() - -1)),
    d: (_today_obj.getDate() < 10 ? '0' + _today_obj.getDate() : _today_obj.getDate())
  }

  const _today_stamp = Date.parse(_today_date.y + '/' + _today_date.m + '/' + _today_date.d + ' 00:00:00')

  const stamp = []
  stamp[0] = _today_stamp + 86400000
  stamp[1] = _today_stamp
  stamp[2] = _today_stamp - 86400000
  stamp[3] = _today_stamp - 172800000

  stamp[4] = _today_stamp - 518400000 // 7天

  stamp[5] = _today_stamp - 31536000000 // 365天

  const _compare_obj = new Date()
  _compare_obj.setTime(unixStamp)

  let return_str

  if (unixStamp >= stamp[1] && unixStamp < stamp[0]) {
    return_str = _compare_obj.getHours() + ':' + (_compare_obj.getMinutes() < 10 ? '0' + _compare_obj.getMinutes() : _compare_obj.getMinutes())
  } else if (unixStamp >= stamp[2] && unixStamp < stamp[1]) {
    const yesterdayText = '昨天'
    return_str = yesterdayText + ' ' + _compare_obj.getHours() + ':' +
      (_compare_obj.getMinutes() < 10 ? '0' + _compare_obj.getMinutes() : _compare_obj.getMinutes())
  } else if (unixStamp >= stamp[3] && unixStamp < stamp[2]) {
    const theDayBeforeYesterdayText = '前天'
    return_str = theDayBeforeYesterdayText + ' ' + _compare_obj.getHours() + ':' +
      (_compare_obj.getMinutes() < 10 ? '0' + _compare_obj.getMinutes() : _compare_obj.getMinutes())
  } else if (unixStamp >= stamp[4] && unixStamp < stamp[3]) { // 7天内
    const daynames = ['天', '一', '二', '三', '四', '五', '六']
    const dathStr = '星期' + daynames[_compare_obj.getDay()]

    const SundayText = '星期天'
    const MondayText = '星期一'
    const TuesdayText = '星期二'
    const WednesdayText = '星期三'
    const ThursdayText = '星期四'
    const FridayText = '星期五'
    const SaturdayText = '星期六'

    let dathStr2

    switch (dathStr) {
      case '星期天':
        dathStr2 = SundayText
        break
      case '星期一':
        dathStr2 = MondayText
        break
      case '星期二':
        dathStr2 = TuesdayText
        break
      case '星期三':
        dathStr2 = WednesdayText
        break
      case '星期四':
        dathStr2 = ThursdayText
        break
      case '星期五':
        dathStr2 = FridayText
        break
      case '星期六':
        dathStr2 = SaturdayText
        break
      default:
        dathStr2 = dathStr
        break
    }

    return_str = dathStr2 + ' ' + _compare_obj.getHours() + ':' +
      (_compare_obj.getMinutes() < 10 ? '0' + _compare_obj.getMinutes() : _compare_obj.getMinutes())
  } else if (unixStamp >= stamp[5] && unixStamp < stamp[4]) { // 365天内
    const monthText = '月'
    const dayText = '日'
    // eslint-disable-next-line camelcase
    return_str = (_compare_obj.getMonth() - (-1)) + monthText + _compare_obj.getDate() + dayText + ' ' +
      _compare_obj.getHours() + ':' + (_compare_obj.getMinutes() < 10 ? '0' + _compare_obj.getMinutes() : _compare_obj.getMinutes())
  } else {
    const yearText = '年'
    const monthText = '月'
    const dayText = '日'
    return_str = _compare_obj.getFullYear() + yearText + (_compare_obj.getMonth() - (-1)) +
      monthText + _compare_obj.getDate() + dayText + ' ' + _compare_obj.getHours() + ':' +
      (_compare_obj.getMinutes() < 10 ? '0' + _compare_obj.getMinutes() : _compare_obj.getMinutes())
  }
  return return_str
}

export function sizeTostr(limit:number){
  let size = "";
  if(limit < 0.1 * 1024){                            //小于0.1KB，则转化成B
    size = limit.toFixed(2) + "B"
  }else if(limit < 0.1 * 1024 * 1024){            //小于0.1MB，则转化成KB
    size = (limit/1024).toFixed(2) + "KB"
  }else if(limit < 0.1 * 1024 * 1024 * 1024){        //小于0.1GB，则转化成MB
    size = (limit/(1024 * 1024)).toFixed(2) + "MB"
  }else{                                            //其他转化成GB
    size = (limit/(1024 * 1024 * 1024)).toFixed(2) + "GB"
  }

  let sizeStr = size + "";                        //转成字符串
  let index = sizeStr.indexOf(".");                    //获取小数点处的索引
  let dou = sizeStr.substr(index + 1 ,2)            //获取小数点后两位的值
  if(dou == "00"){                                //判断后两位是否为00，如果是则删除00
    return sizeStr.substring(0, index) + sizeStr.substr(index + 3, 2)
  }
  return size;
}