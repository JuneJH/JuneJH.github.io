const api = require("../util/api.js");

Page({
    data: {
        courseid: ""
    },
    getInitData: function () {
        var userinfo = swan.getStorageSync("userinfo");
        var courseinfo = swan.getStorageSync("courseinfo");
        var sessionid = userinfo.sessionid;
        var uid = userinfo.uid;
        var courseid = courseinfo.id;

        this.setData({
            "courseid": courseid
        });
        var params = {
            "sessionid": sessionid,
            "uid": uid,
            "courseid": courseid,
            "market": "baiduapp_ytk",
            "type": 4
        };
        var url = "/study/getUnitlist";
        var that = this;
        api.sendPosts(params, url, function (res) {
            //  console.log(res);
            that.setData({
                "unitlist": res.unitlist
            });
        });
    },
    onLoad: function (option) {
        this.data.type = option.type;

    },
    onShow() {
        this.getInitData();
    },
    //导入上次学习记录
    onclick(e) {

        //未登录，弹出登录框
        var loginsuccess = swan.getStorageSync("loginsuccess");
        if (!(loginsuccess.data)) {
            this.setData({
                "click": loginsuccess.data
            })
            this.setData({
                "click": !loginsuccess.data
            })
            return;
        }
        //导入上次记录
        var index = e.currentTarget.dataset.index;
        var courseinfo = swan.getStorageSync("courseinfo");
        var courseid = courseinfo.id;
        var oldunitid = swan.getStorageSync("pastyears" + index + "unitid" + courseid);
        var newunitid = e.currentTarget.dataset.unitid;
        var params = {
            "type": this.data.type,
            "oldunitid": oldunitid,
            "newunitid": newunitid,
            "name": "pastyears" + index,
            "title": "历年真题"
        }
        api.getLastPaper(params);
    }

});
