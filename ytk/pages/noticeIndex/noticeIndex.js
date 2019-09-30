const api = require("../util/api.js");
Page({
    data: {
         noticeImgSrc:"/images/notice_node.png",
        //  isRead:true

    },
    goNoticeDetails:function(e){
        var noticeId = e.currentTarget.dataset["index"];//绑定获取通知下标
        // var isRead=this.data.noticeList[noticeId].isRead;
        swan.navigateTo({
            url: '/pages/noticeDetails/noticeDetails?noticeId='+noticeId
        });
        if(this.data.noticeList[noticeId].isRead==true){
        this.setData({
            isRead:false,   
            noticeImgSrc:" "     
        })
        }
       
    },

    onLoad: function () {
        // 监听页面加载的生命周期函数

    },
    onReady: function () {
        // 监听页面初次渲染完成的生命周期函数
    },
    onShow: function () {
        // 监听页面显示的生命周期函数
        console.log("获取通知列表");
        var userinfo = swan.getStorageSync("userinfo");
        var examinationinfo = swan.getStorageSync("examinationinfo");
        var params = {
            sessionid: userinfo.sessionid,
            uid: userinfo.uid,
            masterId: parseInt(examinationinfo.id)
        };
        var url = "/notice/getNoticeList";
        var that = this;
        api.sendPosts(params, url, function (res) {
            console.log(params);
            console.log(res);
            that.setData({
                noticeList: res.noticeList
            });
            console.log("noticeList:" + res.noticeList);
        });

    },
    onHide: function () {
        // 监听页面隐藏的生命周期函数
    },
    onUnload: function () {
        // 监听页面卸载的生命周期函数
    },
    // onPullDownRefresh: function() {
    //     // 监听用户下拉动作
    // },
    onReachBottom: function () {
        // 页面上拉触底事件的处理函数
    },
    onShareAppMessage: function () {
        // 用户点击右上角转发
    },
});