const api = require("../util/api.js");

Page({
    data: {

    },
    onPullDownRefresh() {
        this.onShow();
        swan.stopPullDownRefresh();
    },
    onShow: function () {
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
        };
        var url = "/myStudyCenter/findLearningReportList";
        var that = this;
        api.sendPosts(params, url, function (res) {
            // console.log(res);
            that.setData({ "courseList": res.interestExam.courseList });
            // console.log(that.data.courseList)
        });


    }
});
