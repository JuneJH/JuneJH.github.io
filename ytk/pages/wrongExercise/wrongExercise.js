const api = require("../util/api.js");

Page({
    data: {
        // currentData: 0,
        flag: '',
    },
    // tab切换
    changeTab: function (e) {
        const that = this;
        that.setData({
            flag: e.currentTarget.dataset.current
        });
    },

    onLoad: function (option) {
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
        //获取首页传递过来的错题0或收藏的标识1        
        this.setData({
            'flag': option.flag
        });

    },
    onShow() {
        this.wrong();
        this.collection();
    },
    //错题列表
    wrong: function () {
        var userinfo = swan.getStorageSync("userinfo");
        var courseinfo = swan.getStorageSync("courseinfo");
        var examinationinfo = swan.getStorageSync("examinationinfo");
        var sessionid = userinfo.sessionid;
        var uid = userinfo.uid;
        var courseIds = courseinfo.id;
        var categoryId = examinationinfo.id;
        var params = {
            "sessionid": sessionid,
            "uid": uid,
            "categoryId": categoryId,
            "courseIds": courseIds,
            "market": "baiduapp_ytk"
        };
        var url = "/myStudyCenter/findWrongQuestionList";
        var that = this;
        api.sendPosts(params, url, function (res) {
            that.setData({
                "wrongList": res.wrongList
            });
            //遍历错题列表数组
            for (var i in that.data.wrongList) {
                var courseId = that.data.wrongList[i].courseId;
            }
            that.data.courseId = courseId;
            that.wrongchapter();
        });
    },
    //错题课程章节列表
    wrongchapter: function () {
        var userinfo = swan.getStorageSync("userinfo");
        var sessionid = userinfo.sessionid;
        var uid = userinfo.uid;
        var params = {
            "sessionid": sessionid,
            "uid": uid,
            "courseId": this.data.courseId,
            "market": "baiduapp_ytk"
        };
        var url = "/myStudyCenter/findWrongUnitList";
        var that = this;
        api.sendPosts(params, url, function (res) {
            that.data.list = res.list;
            that.setData({
                "wrongchapterlist": res
            });
        });
    },
    //收藏列表
    collection: function () {
        var userinfo = swan.getStorageSync("userinfo");
        var courseinfo = swan.getStorageSync("courseinfo");
        var examinationinfo = swan.getStorageSync("examinationinfo");
        var sessionid = userinfo.sessionid;
        var uid = userinfo.uid;
        var courseIds = courseinfo.id;
        var categoryId = examinationinfo.id;
        var params = {
            "sessionid": sessionid,
            "uid": uid,
            "categoryId": categoryId,
            "courseIds": courseIds,
            "market": "baiduapp_ytk"
        };
        var url = "/myStudyCenter/findCollectList";
        var that = this;
        api.sendPosts(params, url, function (res) {
            that.setData({
                "collectList": res.collectList
            });
            //遍历收藏列表数组
            for (var i in that.data.collectList) {
                var courseId = that.data.collectList[i].courseId;
            }
            that.data.courseId = courseId;
            that.collectionchapter();
        });
    },
    //收藏课程章节列表
    collectionchapter: function () {
        var userinfo = swan.getStorageSync("userinfo");
        var sessionid = userinfo.sessionid;
        var uid = userinfo.uid;
        var params = {
            "sessionid": sessionid,
            "uid": uid,
            "courseId": this.data.courseId,
            "market": "baiduapp_ytk"
        };
        var url = "/myStudyCenter/findCollectUnitList";
        var that = this;
        api.sendPosts(params, url, function (res) {
            that.data.clist = res.list;
            that.setData({
                "collectionchapterlist": res
            });
        });
    },
    //请求错题试卷
    getwrongpaper: function (e) {
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
        var index = e.currentTarget.dataset.index;
        var unitid = this.data.list[index].id;
        var userinfo = swan.getStorageSync("userinfo");
        var sessionid = userinfo.sessionid;
        var uid = userinfo.uid;
        var params = {
            "sessionid": sessionid,
            "uid": uid,
            "courseid": this.data.courseId,
            "type": 7,
            "unitid": unitid,
            "market": "baiduapp_ytk"
        };
        var url = "/study/loadnewpaper";
        var that = this;
        api.sendPosts(params, url, function (res) {
            if (res.errcode == 0) {
                var list = JSON.stringify(res.list)
                params = JSON.stringify(params)
                swan.navigateTo({
                    url: '/pages/answerKey/answerKey?' + "list=" + list + '&parameter=' + params
                });
            }
        });
    },
    //请求收藏试卷
    getcollectionpaper: function (e) {
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
        var index = e.currentTarget.dataset.index;
        var unitid = this.data.clist[index].id;
        var userinfo = swan.getStorageSync("userinfo");
        var sessionid = userinfo.sessionid;
        var uid = userinfo.uid;
        var params = {
            "sessionid": sessionid,
            "uid": uid,
            "courseid": this.data.courseId,
            "type": 12,
            "unitid": unitid,
            "market": "baiduapp_ytk"
        };
        var url = "/study/loadnewpaper";
        var that = this;
        api.sendPosts(params, url, function (res) {
            if (res.errcode == 0) {
                var list = JSON.stringify(res.list)
                params = JSON.stringify(params)
                swan.navigateTo({
                    url: '/pages/answerKey/answerKey?' + "list=" + list + '&parameter=' + params
                });
            }
        });
    },
    //错题做题
    getWpaper: function (e) {
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
        var index = e.currentTarget.dataset.index;
        var unitid = this.data.list[index].id;
        swan.navigateTo({
            url: '/pages/doExam/doExam?' + "unitid=" + unitid + '&type=' + 7 + "&courseid=" + this.data.courseId + '&doExamName=' + "错题回顾"
        });
    },
    //收藏做题
    getCpaper: function (e) {
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
        var index = e.currentTarget.dataset.index;
        var unitid = this.data.clist[index].id;
        swan.navigateTo({
            url: '/pages/doExam/doExam?' + "unitid=" + unitid + '&type=' + 12 + "&courseid=" + this.data.courseId + '&doExamName=' + "收藏练习"
        });
    }
});
