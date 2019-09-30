const api = require("../util/api.js")
Page({
    data: {
        show: []
    },
    onLoad: function (e) {
        //获取列表
        this.data.type = e.type;
        var that = this;
        var courseinfo = swan.getStorageSync("courseinfo");
        var userinfo = swan.getStorageSync("userinfo");
        var params = {
            "sessionid": userinfo.sessionid,
            "uid": userinfo.uid,
            "courseid": courseinfo.id,
            "type": 1
        };
        var url = "/study/getUnitlist";

        api.sendPosts(params, url, function (res) {
            that.setData({
                unitlist: res.unitlist
            })

        });
    },
    onReady: function () {
        // 监听页面初次渲染完成的生命周期函数
    },
    onShow: function () {
        var courseinfo = swan.getStorageSync("courseinfo");
        var courseid = courseinfo.id;
        //判断继续学习框是否显示
        var idname = swan.getStorageSync("idnamepoint");
        this.setData({ "idname": idname });
        var pointtitle = swan.getStorageSync("point" + idname + "title" + courseid);
        var pointkpid = swan.getStorageSync("point" + idname + "kpid" + courseid);
        var pointunitid = swan.getStorageSync("point" + idname + "unitid" + courseid);
        if ((pointunitid != "" && pointunitid != null) ||
            (pointtitle != "" && pointtitle != null) ||
            (pointkpid != "" && pointkpid != null)) {
            this.setData({ goonshow: true });

            var newpointtitle = swan.getStorageSync("newpoint" + idname + "title" + courseid);
            var newpointkpid = swan.getStorageSync("newpoint" + idname + "kpid" + courseid);
            var newpointunitid = swan.getStorageSync("newpoint" + idname + "unitid" + courseid);
            this.setData({ "pointtitle": newpointtitle });
            this.setData({ "pointkpid": newpointkpid });
            this.setData({ "pointunitid": newpointunitid });
        } else {
            this.setData({ goonshow: false });
        }
    },
    onHide: function () {
        // 监听页面隐藏的生命周期函数
    },
    onUnload: function () {
        // 监听页面卸载的生命周期函数
    },
    onPullDownRefresh: function () {
        // 监听用户下拉动作
    },
    onReachBottom: function () {
        // 页面上拉触底事件的处理函数
    },
    onShareAppMessage: function () {
        // 用户点击右上角转发
    },
    changeShow: function (e) {
        var id = e.currentTarget.dataset.index;
        show = this.data.show;
        if (show[id]) {
            show[id] = false;
            this.setData({ "show": show })
        } else {
            var show = [];
            show[id] = true;
            this.setData({ "show": show });
        }
    },
    getTopicHandle: function (e) {


        var loginsuccess = swan.getStorageSync("loginsuccess");
        if (!(loginsuccess.data)) {
            this.setData({
                click: loginsuccess.data
            });
            this.setData({
                click: !loginsuccess.data
            });

            return;
        }

        var idname = e.currentTarget.dataset.idname;
        swan.setStorageSync("idnamepoint", idname)
        // 请求是否有做题记录
        var courseinfo = swan.getStorageSync("courseinfo");
        var courseid = courseinfo.id;
        var oldunitid = swan.getStorageSync("point" + idname + "unitid" + courseid);
        var newunitid = e.currentTarget.dataset.unitid;
        var oldkpid = swan.getStorageSync("point" + idname + "kpid" + courseid);
        var newkpid = e.currentTarget.dataset.kpid;


        if (e.currentTarget.dataset.flag == 1) {
            var pointtitle = swan.getStorageSync("point" + idname + "title" + courseid);
        } else {
            var pointtitle = e.currentTarget.dataset.title;
        }


        var params = {
            "type": this.data.type,
            "oldunitid": oldunitid,
            "oldkpid": oldkpid,
            "newunitid": newunitid,
            "newkpid": newkpid,
            "titlename": pointtitle,
            "name": "point" + idname,
            "title": "考点练习"
        };
        console.log("getLast", params);
        api.getLastPaper(params);
    }
});