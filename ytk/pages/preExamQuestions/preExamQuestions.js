const api = require("../util/api.js");

Page({
    // 页面的初始数据
    data: {
        hidden: true,
        buy_button: "",
    },
    // 页面的生命周期函数 – 监听页面加载
    onLoad: function (option) {
        //请求考前押题页面数据
        var examDay = swan.getStorageSync("examDay");
        this.data.examDay=examDay;
        this.data.type = option.type;
        var userinfo = swan.getStorageSync("userinfo");
        var courseinfo = swan.getStorageSync("courseinfo");
        var sessionid = userinfo.sessionid;
        var uid = userinfo.uid;
        var courseid = courseinfo.id;
        var params = {
            "sessionid": sessionid,
            "uid": uid,
            "courseid": courseid,
            "market": "baiduapp_ytk",
            "type": 6
        };
        var url = "/study/getUnitlist";
        var that = this;
        api.sendPosts(params, url, function (res) {
            that.setData({
                "unitlist": res,
                "isbuy": res.unitlist[0].isbuy,
                "endtime": res.unitlist[0].endtime
            })

        });
        if (this.data.examDay > 20) {
            this.purchase();
        }
    },

    // 页面的生命周期函数 – 监听页面初次渲染完成
    onReady(res) {
        //根据操作系统版本显示购买/领资料按钮
        var result = swan.getSystemInfoSync();
        var devsystem = result.system;
        var subsys = devsystem.substring(0, 3);
        if (subsys == "iOS") {
            this.setData({
                "buy_button": "领资料"
            });
        } else {
            this.setData({
                "buy_button": "购买"
            });
        }
    },
    //点击列表做题：弹出导入
    onclick(e) {
        //未登录，弹出登录框
        var loginsuccess = swan.getStorageSync("loginsuccess");
        if (!(loginsuccess.data)) {
            this.setData({
                click: loginsuccess.data
            })
            this.setData({
                click: !loginsuccess.data
            })
            return;
        }
        //导入记录
        if (this.data.examDay > 20) {
            this.purchase();
        }else {
            var courseinfo = swan.getStorageSync("courseinfo");
            var courseid = courseinfo.id;
            var oldunitid = swan.getStorageSync("preexam" + id + "unitid" + courseid);
            var newunitid = e.currentTarget.dataset.unitid;
            var params = {
                "type": 293,
                "oldunitid": oldunitid,
                "newunitid": newunitid,
                "name": "preexam" + id,
                "title": "考前押题"
            }
            api.getLastPaper(params);
        }
        
    },

    //未开放:提示考前押题在考前20天开放
    purchase() {
        swan.showModal({
            title: '考前押题在考前20天推出,及时关注哦',
            content: '',
            showCancel: false,
            confirmText: "我知道了",
            confirmColor: "#FECD31",
        });
    },
    //点击购买按钮，跳转到购买页面
    buy() {
        //未登录，弹出登录框
        var loginsuccess = swan.getStorageSync("loginsuccess");
        var that = this;
        if (!(loginsuccess.data)) {
            this.setData({
                click: loginsuccess.data
            })
            this.setData({
                click: !loginsuccess.data
            })
            return;
        }
        if (that.data.buy_button == "购买") {
            swan.showModal({
                title: '是否现在购买押题',
                content: '考前押题在考前20天推出',
                cancelText: "以后购买",
                confirmText: "立即购买",
                confirmColor: "#FECD31",
                success: function (res) {
                    if (res.confirm) {
                        swan.navigateTo({
                            url: '/pages/purchase/purchase?module=' + that.data.type + '&flagClass=2'
                        });
                    }
                }
            });
        } else {
            swan.navigateTo({
                url: '/pages/receiveData/receiveData'
            });
        }
    }

});