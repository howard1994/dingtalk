var common = require('../../utils/utils.js')
var AParse = require('../../component/aParse/aParse.js');

Page({
  data: {
    id: '',
    html: '',

  },
  onShow() {
    // 页面显示
  },
  onLoad(query) {
    console.log(query.id)
    let _this = this;
    _this.setData({
      id: query.id,
    })
    let o = {};
    let url = common.api.get_new + _this.data.id;
    common.callAPI(url, "POST", o, function (res) {
      _this.setData({
        html: res.data.htmlContent,
      })
          AParse.aParse('new', 'html', _this.data.html, _this, 2);
    });
  }
});
