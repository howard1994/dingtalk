App({
  onLaunch(options) {
    // 第一次打开
    // options.query == {number:1}
    console.info(options);
  },
  onShow(options) {
    // 从后台被 scheme 重新打开
    console.info(options);
  },
});
