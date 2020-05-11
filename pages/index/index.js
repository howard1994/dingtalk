
var common = require('../../utils/utils.js')

Page({
  data: {
    cateList: [],
    newsList: [],
    catePage: 1,
    cateTotal: 1,
    newsPage: 1,
    newsTotal: 1,
    activeId: 0,
  },
  onShow() {
    // 页面显示
    this.typeData()
    this.loadData()
  },
  loadData() {
    let _this = this;
    let o = {
      "pageNum": _this.newsPage,
      "pageSize": 10,
      "order": {
        "columnName": "createTime",
        "reverse": true
      }
    };
    common.callAPI(common.api.get_news, "POST", o, function (res) {
      _this.setData({
        newsList: res.data,
        newsTotal: res.totalCount
      })
    })
  },
  typeData() {
    let _this = this;
    let o = {};
    common.callAPI(common.api.get_types, "POST", o, function (res) {
      _this.setData({
        cateList: res.data,
        cateTotal: res.totalCount
      })
    })
  },
  onHide() {
    // 页面隐藏
  },
  onUnload() {
    // 页面被关闭
  },
  onTitleClick() {
    // 标题被点击
    console.log("标题被点击")

  },
  onPullDownRefresh() {
    // 页面被下拉
    let _this = this;
    _this.setData({
      newsPage: 1,
    })
    const o = this.requestParamter(_this.data.newsPage, 10, _this.data.activeId);

    common.callAPI(o.url, "POST", o.para, function (res) {
      _this.setData({
        newsList: res.data,
        newsTotal: res.totalCount
      })
    })
  },
  onReachBottom() {
    // 页面被拉到底部
    let allPage = Math.ceil(this.data.newsTotal / 10)
    console.log(allPage)
    console.log(this.data.newsPage)

    if (allPage < this.data.newsPage) {
      //已经加载完成

    }
    else {
      let _this = this;
      _this.setData({
        newsPage: _this.data.newsPage + 1,
      })
      const o = this.requestParamter(_this.data.newsPage, 10, _this.data.activeId);
      common.callAPI(o.url, "POST", o.para, function (res) {
        console.log(res.data);
        _this.setData({
          newsList: Object.assign(res.data, _this.data.newsList),
          newsTotal: res.totalCount
        })
        console.log(_this.data.newsList);

      })

    }
  },
  switchTap(e) {
    let _this = this;
    const index = e.currentTarget.id;
    _this.setData({
      activeId: index,
    })
    const o = this.requestParamter(1, 10, index);
    common.callAPI(o.url, "POST", o.para, function (res) {
      _this.setData({
        newsList: res.data,
        newsTotal: res.totalCount
      })
    })
  },
  onShareAppMessage() {
    // 返回自定义分享信息
    return {
      title: '龙祁文化',
      desc: '新闻中心',
      path: 'pages/index/index',
    };
  },
  imageError: function (e) {
    //console.log('image3 发生错误', e.detail.errMsg)
  },
  imageLoad: function (e) {
    //console.log('image 加载成功', e);
  },
  newsDetail() {
    console.log("查看详情")
  },
  //请求参数封装
  requestParamter(page, pageSize, id) {
    let url = common.api.get_news;
    let o = {
      "pageNum": page,
      "pageSize": pageSize,
      "order": {
        "columnName": "createTime",
        "reverse": true
      }
    }
    if (id && id != 0) {
      url += '?id=' + id;
    }
    return { 'para': o, 'url': url };
  }
});
