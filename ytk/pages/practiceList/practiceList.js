const api = require("../util/api.js")
Page({

    // 页面的初始数据
    data: {
    },
    getDayExamList() {
        var userinfo = swan.getStorageSync("userinfo");
        var courseinfo = swan.getStorageSync("courseinfo");
        //获取7天前 的日期
        var dateTime = new Date();
        dateTime = dateTime.setDate(dateTime.getDate() - 6);
        dateTime = new Date(dateTime);
        var startTimeStr = dateTime.toLocaleDateString().toString();
        startTimeStr = startTimeStr.replace(/\//g, '-');
        var sessionid = userinfo.sessionid;
        var courseid = courseinfo.id;
        var uid = userinfo.uid;
        var params = { "startdate": startTimeStr, "sessionid": sessionid, "uid": uid, "courseid": courseid };
        var url = "/dayExam/getDayExamList";
        var that = this;
        var past = [];
        var today = [];

        api.sendPosts(params, url, function (res) {
            var j = 0;
            var k = 0;
            for (var i = res.list.length - 1; i >= 0; i--) {
                var myDate = new Date(res.list[i].date);
                myDate = myDate.toLocaleDateString();
                var nowDate = new Date();
                nowDate = nowDate.toLocaleDateString();

                if (nowDate == myDate) {
                    today[j++] = res.list[i];
                } else {
                    past[k++] = res.list[i];
                }
            }
            that.setData({ "listlength": res.list.length });
            that.setData({ "today": today });
            that.setData({ "past": past });
        });
    },
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
        //跳转到做题页面
        var paperid = e.currentTarget.dataset.paperid;
        var courseinfo = swan.getStorageSync("courseinfo");
        var courseid = courseinfo.id;
        swan.navigateTo({
            url: '../doExam/doExam?paperid=' + paperid + '&courseid=' + courseid + '&type=' + this.data.type + '&doExamName=每日一练'
        });
    },

    // 页面的生命周期函数 – 监听页面加载
    onLoad(e) {
        this.data.type = e.type;
    },

    // 页面的生命周期函数 – 监听页面显示
    onShow(res) {
        this.getDayExamList();
    },
});