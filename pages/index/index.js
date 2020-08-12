
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
    // 大分类id 1为龙祁新闻 2为龙祁文化
    cateId:1,
  },
  onReady() {
    this.typeData()
    this.loadData()
  },
  onShow() {
    // 页面显示
  },
  loadData() {
    let _this = this;
    _this.setData({
      newsPage: 1,
    })
    const o = this.requestParamter(_this.data.newsPage, 10,_this.data.cateId , _this.data.activeId);
    common.callAPI(o.url, "POST", o.para, function (res) {
      _this.setData({
        newsList: res.data,
        newsTotal: res.totalCount
      })
    })
  },
  typeData() {
    let _this = this;
    let o = {};
    let url = common.api.get_types+'?classId='+_this.data.cateId;
    common.callAPI(url, "POST", o, function (res) {
      _this.setData({
        cateList: res.data,
        cateTotal: res.totalCount
      })
    })
  },
  onPullDownRefresh() {
    // 页面被下拉
    let _this = this;
    _this.setData({
      newsPage: 1,
    })
    const o = this.requestParamter(_this.data.newsPage, 10,_this.data.cateId , _this.data.activeId);
    common.callAPI(o.url, "POST", o.para, function (res) {
      dd.stopPullDownRefresh();
      _this.setData({
        newsList: res.data,
        newsTotal: res.totalCount
      })
    })
  },
  onReachBottom() {
    // 页面被拉到底部
    let allPage = Math.ceil(this.data.newsTotal / 10)
    if (allPage <= this.data.newsPage) {
      //已经加载完成
      common.tips('没有更多了')
    }
    else {
      let _this = this;
      _this.setData({
        newsPage: _this.data.newsPage + 1,
      })
      const o = this.requestParamter(_this.data.newsPage, 10,_this.data.cateId , _this.data.activeId);
      common.callAPI(o.url, "POST", o.para, function (res) {
        _this.setData({
          newsList: [..._this.data.newsList, ...res.data],
          newsTotal: res.totalCount
        })
      })

    }
  },
  switchTap(e) {
    let _this = this;
    const index = e.currentTarget.id;
    _this.setData({
      activeId: index,
      newsPage: 1,
    })
    const o = this.requestParamter(1, 10,_this.data.cateId , index);
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
      desc: '龙祁文化',
      path: 'pages/index/index',
    };
  },
  imageError: function (e) {
    //console.log('image3 发生错误', e.detail.errMsg)
  },
  imageLoad: function (e) {
    //console.log('image 加载成功', e);
  },
  newsDetail(e) {
    dd.navigateTo({           // 关闭当前页面，跳转到应用内的某个指定页面。
      url: '/pages/detail/index?id=' + e.currentTarget.dataset.id
    })
  },
  //请求参数封装
  requestParamter(page, pageSize, classId,classifyid) {
    // classId为大分类id
    // classifyid 为小分类id
    let url = common.api.get_news + '?classId=' +classId ;
    let o = {
      "pageNum": page,
      "pageSize": pageSize,
      "order": {
        "columnName": "createTime",
        "reverse": true
      },
      "query": [
        {
          "key": "Status",
          "binaryop": "eq",
          "value": 1,
          "andorop": "and"
        }
      ]
    }
    if (classifyid && classifyid != 0) {
      url += '&classifyid=' + classifyid;
    }
    console.log(url)
    return { 'para': o, 'url': url };
  }
});
