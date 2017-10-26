@formatStr String 'yy-MM-dd hh:mm:ss'
@params Object {date: Date, localize: Boolean}
function formatDate(formatStr, opt) {
  let date = opt.date
  // 初始化一个最后返回的变量
  let str = formatStr 
  let localize = opt.localize
  // 因为年份可能需要截取，所以单独拎出来替换，根据格式化字符串的长度来确定到底需要留几个字符串
  if (/(y+)/.test(formatStr)) {
    if(localize) {
      let veryYear = date.getFullYear().toString()
    	str = str.replace(RegExp.$1 + '-', veryYear.substr(veryYear.length - RegExp.$1.length) + '年')
    }else {
      let veryYear = date.getFullYear().toString()
    	str = str.replace(RegExp.$1, veryYear.substr(veryYear.length - RegExp.$1.length))
    }
  }
	
  
  const createPattern = (isLocalize, date) => {
    let o = {}
    if(isLocalize) {
        o = {
        'M+-': date.getMonth() + 1 + '月',
        'd+\s?': date.getDate() + '日',
        'h+:': date.getHours() + '时',
        'm+:': date.getMinutes() + '分',
        's+': date.getSeconds() + '秒'
      }
    } else {
      o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
      }
    }
    return o
  }
  
  let pattern = createPattern(true, date)
  
  // 循环匹配，直到匹配完所有格式化字符串为止
  for (let i in pattern) {
    // 正则表达式中RegExp.$1要先进行test，exec等匹配方法之后才能获取
    if (new RegExp(`(${i})`, 'g').test(formatStr)) {
      // 因为单月前面一般都要补0，所以得要对o[i] 进行一些处理,如MM则补0
      str = str.replace(RegExp.$1, RegExp.$1.length > 1 ? addZreo(pattern[i]) : pattern[i])
    }
  }
  return str

  // 补0函数，需要保留多少位，就加多少个0在前面
  function addZreo(num) {
    let getStr = num.toString().replace(/\d+/, '')
    let str = parseInt(num).toString()
    return ('00' + str).substr(str.length) + getStr
  }
}
