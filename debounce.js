/*
此函数用于ajax实时搜索的优化

@@ 关键点，使用setTimeout延迟执行ajax请求，在执行延迟函数之前先清除setTimeout定时器
@@ 因为这个id初始化为null,清除延迟函数在先,所以执行延迟函数，清除延迟函数必然不同步
@@ 那么最后一个延时函数必然不会被清除，所以在一阵狂按之后，真正执行的延时函数只有最后一个
@@ 如果清除延时函数在执行之后，那么每执行一次，请求还开始，就已经被清除了，所以就什么都不做了

*/
let id = null

// ajax延时函数
function debounce (func, wait) {
  return function () {
    // 设置默认延迟时间
    wait = wait || 1000
    // 清除延时器id
    clearTimeout(id)
    // 执行延时器
    id = setTimeout(func, wait)
  }
}

// 一个请求函数，请求数据
function request () {
  var ajax = new XMLHttpRequest()
  ajax.onreadystatechange = function () {
    if (ajax.readyState === 4 && ajax.status === 200) {
      // var response = ajax.responseText;
    }
  }
  ajax.open('GET', 'https://api.github.com/search/repositories?q=javascript&sort=star', true)
  ajax.setRequestHeader('Content-type', 'application/json')
}

// 绑定input事件，进行请求
document.getElementById('#ipt').oninput = debounce(request, 500)
