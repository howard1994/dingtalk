var common = require('../../utils/utils.js')
var AParse = require('../../component/aParse/aParse.js');

Page({
  data: {
    id: '',
    html: '',
    title:'',
    subTitle:'',
    createTime:'',
    editer:'',
    userInfo:{},
    modalVisible:false,
    commentContent:"",
    commentList:[],
    commentTotal:1,
    commentPage:1
  },
  onShow() {
    // 页面显示
  },
  onReady() {
    this.loadUser();
    this.loadComment()
  },
  loadUser(){
    let _this = this;
    common.getUserInfo(function(res){
      _this.setData({
        userInfo:res
      })
    })
  },
  loadComment(){
    let _this = this;
    let url = common.api.get_comment+ _this.data.id;
    let o ={
      pageNum:_this.data.commentPage
    }
    common.callAPI(url, "POST", o, function (res) {
      _this.setData({
        commentList :res.data,
        commentTotal : res.totalCount
      })
    })
  },
  onLoad(query) {
    let _this = this;
    _this.setData({
      id: query.id,
    })
    let o = {};
    let url = common.api.get_new+ _this.data.id;
    common.callAPI(url, "POST", o, function (res) {
      _this.setData({
        html: res.data.htmlContent,
        title:res.data.title,
        subTitle: res.data.subTitle,
        createTime: res.data.createTime,
        editer: res.data.editer,
      })
          AParse.aParse('new', 'html', _this.data.html, _this, 2);
    });
  },
  commentNews(e){
    this.setData({
        modalVisible: true,
      })
  },
  ModalCancel(e){
    this.setData({
        modalVisible: false,
      })

  },
  // 添加评论
  ModalSubmit(){
    const _this = this;
    let o = {
      newsId : _this.data.id,
      name:_this.data.userInfo.name,
      userId:_this.data.userInfo.userid,
      content:_this.data.commentContent
    };
    common.callAPI(common.api.add_comment, "POST", o, function (res) {
      common.tips(res.msg)
      _this.setData({
          modalVisible: false,
          commentPage:1
        })
      });
    setTimeout(() => {
      _this.loadComment()
    }, 2000);
       
  },
  bindTextAreaInput(e){
    let _this = this;
    this.setData({
      commentContent:e.detail.value
    })
  },
  // 加载评论的下一页
  onReachBottom() {
    // 页面被拉到底部
    let allPage = Math.ceil(this.data.commentTotal / 50)
    console.log(allPage)
    if (allPage <= this.data.commentPage) {
      //已经加载完成
      common.tips('没有更多了')
    }
    else {
      let _this = this;
      _this.setData({
        commentPage: _this.data.commentPage + 1,
      })
      const o = {
        pageNum:_this.data.commentPage
      }
    let url = common.api.get_new+ _this.data.id;
      common.callAPI(url, "POST", o, function (res) {
        _this.setData({
          commentList: [..._this.data.commentList, ...res.data],
          commentTotal: res.totalCount
        })
      })

    }
  },
});
