var REAL_IP = 'http://8000.bitcoding.top:8888';
var IP = REAL_IP + '/api/';
var api = {}

api.get_types = IP + 'DingTalkNews/GetTypes'
api.get_news = IP + 'DingTalkNews/GetNews'
api.get_new = IP+'DingTalkNews/GetNew?id='
console.log(api.get_types)
//ajax
function callAPI(url,method, data, calback, noshow) {
  if (!noshow) {
    dd.showLoading({
      content: '加载中',
    })
  }
  dd.httpRequest({
    headers: {
      "Content-Type": "application/json"
    },
    url: url,
    method: method,
    data: JSON.stringify(data),
    dataType: 'json',
    success: function(res) {
      if (!noshow) {
        dd.hideLoading()
      }
      if (res.data.code == 200) {
        calback && calback(res.data);
      } else {
        tips(res.data.msg)
      }
    },
    fail: function(res) {
      tips(res.data.msg)
    },
    complete: function(res) {
      tips(res.data.msg)
    }
  });

}

// 提示
function tips(content){
  dd.showToast({
    type: 'none',
    content: content,
    duration: 3000
  });
}

module.exports = {
  api: api,
  callAPI: callAPI,
  tips: tips,
}