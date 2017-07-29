function formatDate(formatStr,date) {
  // 此转换器的核心是，将时间对象格式化为yyyy-MM-dd hh:mm:ss这样的形式
  // 使用正则表达式进行匹配替换

  // 初始化一个最后返回的变量
  let str = ''
  // 因为年份可能需要截取，所以单独拎出来替换，根据格式化字符串的长度来确定到底需要留几个字符串
  if(/(y+)/.test(formatStr)){
    let veryYear = date.getFullYear().toString()
    str = formatStr.replace(RegExp.$1, veryYear.substr(veryYear.length - RegExp.$1.length))
  }

  let o = {
    'M+' : date.getMonth() + 1,
    'd+' : date.getDate(),
    'h+' : date.getHours(),
    'm+' : date.getMinutes(),
    's+' : date.getSeconds()
  }

  // 循环匹配，直到匹配完所有格式化字符串为止
  for(i in o) {
    // 正则表达式中RegExp.$1要先进行test，exec等匹配方法之后才能获取
    if(new RegExp(`(${i})`,'g').test(formatStr)){
      // 因为单月前面一般都要补0，所以得要对o[i] 进行一些处理,如MM则补0
      str = str.replace(RegExp.$1,RegExp.$1.length > 1 ? addZreo(o[i]) : o[i])
    }
  }
  return str

  // 补0函数，需要保留多少位，就加多少个0在前面
  function addZreo(num){
    let str = num.toString()
    return ('00' + str).substr(str.length)
  }
  
}
