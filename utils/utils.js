var REAL_IP = 'http://8000.bitcoding.top:8888';
var IP = REAL_IP + '/api/';
var api = {}
var accessToken = "";
var authCode = "";
// 新闻中心
var appKey = "dingch545aqm5h0u3oyi";
var Appsecret = "wspOzjQ6oHDedhJEoY8FLHGQpo32Ixg3nkBUfo9ssCIJKy_3IZrOsE5gWIsmAWih"
// // 龙祁文化
// var appKey = "ding1tbbr1zihdwbuqbi";
// var Appsecret = "yvePlut5sMEnCig_cB5QDSAsXldex0HUCpB3AtVWpPrEk9EeRqqu6cXAZaKRR1Ry"


api.get_types = IP + 'DingTalkNews/GetTypes'
api.get_news = IP + 'DingTalkNews/GetNews'
api.get_new = IP+'DingTalkNews/GetNew?id='
api.add_comment = IP+'DingTalkNews/addComment'
api.get_comment = IP+'DingTalkNews/getComment?newsId='


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
      if(res.errorMessage){
        tips(res.errorMessage)
      }
    },
    complete: function(res) {
      console.log(res)
    }
  });

}

function getUserInfo(callback){
  // 获取access_token
  dd.httpRequest({
    url: 'https://oapi.dingtalk.com/gettoken?appkey='+appKey+'&appsecret='+Appsecret,
    success: function(res) {
      accessToken = res.data.access_token;
      dd.getAuthCode({
        success: function(auth) {
          authCode = auth.authCode
          dd.httpRequest({
            url: 'https://oapi.dingtalk.com/user/getuserinfo?access_token=' + accessToken + '&code=' + authCode,
            success: function(data) {
              callback(data.data)
            }
          })
        }
      })
    },
    fail: function(res) {
      if(res.errorMessage){
        tips(res.errorMessage)
      }
    },
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
  getUserInfo:getUserInfo
}