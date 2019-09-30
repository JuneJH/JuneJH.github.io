const api = require("../util/api.js");
Page({
    data: {
        hiddenModal: false,
    },
    // 退出登录弹框的显示与隐藏
    listenerButton: function () {
        this.setData({
            hiddenModal: true,
        })
    },
    //  单击确认清楚缓存信息，回到选择课程页面
    cofirm: function () { 
        swan.removeStorageSync("userinfo");
        swan.setStorageSync("loginsuccess",{data:false} );
        swan.reLaunch({
            url: '/pages/login/login'
        });
        
    },
    //  单击取消，回到个人信息主界面
    cancel: function () {
        this.setData({
            hiddenModal: false,
        })
        swan.switchTab({
            url: '/pages/myInfo/myInfo'
        });
    },

    //   获取用户资料
    onLoad: function (options) {
        // 监听页面加载的生命周期函数
        console.log("获取个人资料开始");
        var userinfo = swan.getStorageSync("userinfo");
        var params = { sessionid: userinfo.sessionid, uid: userinfo.uid, market: 'baiduapp_ytk' };
        var url = "/userInfo/findUserInfo";
        var that = this;
        api.sendPosts(params, url, function (res) {
            that.setData({ userInfo: res.userInfo });
            console.log("userinfo:" + res.userInfo);
        });

    },
    // 页面的生命周期函数 – 监听页面显示
    onShow(res) {
        var that = this;
        const uuid = that.getUUID();
        that.globalData.uuid = uuid;
    },
    //获取uuid
    getUUID() {
        let uuid = swan.getStorageSync('uuid');
        if (uuid && uuid.length === 36) {
            return uuid;
        }
        uuid = ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
            (c ^ this.unit8() & 15 >> c / 4).toString(16)
        );
        swan.setStorageSync('uuid', uuid);
        return uuid;
    },
    // 兼容crypto.getRandomValues的callBack。
    unit8() {
        const unitCode = ((typeof crypto !== 'undefined') && crypto.getRandomValues)
            ? crypto.getRandomValues(new Uint8Array(1))[0]
            : Math.floor(Math.random() * 0xff);
        return unitCode;
    },
    globalData: {
        uuid: ''
    }

});

