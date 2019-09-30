const api = require("../util/api.js")
Page({
    getWxNum(e) {
        var wxNum = e.detail.value;
        this.data.wxNum = wxNum;
    },
    goToNext() {
        if (this.data.wxNum == "" || this.data.wxNum == null) {
            swan.showToast({
                title: "请输入微信号",
                icon: "none"
            })
            return;
        }
        swan.navigateTo({
          url:"../receiveDataNext/receiveDataNext"  
        });
    }
})