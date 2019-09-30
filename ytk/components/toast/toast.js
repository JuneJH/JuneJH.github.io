Component({
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    innerText: {
      type: String,
      value: 'default value',
    }
  },
  data: {
    dataText: '',
    isShow:false
  },
  methods: {
    //隐藏弹框
    hideDialog() {
      this.setData({
        isShow: !this.data.isShow
      })
    },
    //展示弹框
    showDialog(data) {
      this.setData({
        isShow: !this.data.isShow,
        dataText: data
      })
      var _this = this
      // 定时器关闭  
      setTimeout(function () {
        _this.hideDialog()
      }, 1000);
    }
  }
})