
const api = require("../util/api.js")


Page({
    // 页面的初始数据
    data: {
        toView: 'jr',
        industryList: []
    },
    //快速定位到某一类型考试
    clickScroll: function (e) {
        var name = e.currentTarget.dataset.name
        this.setData({
            toView: name
        })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },
    // 页面的生命周期函数 – 监听页面加载
    onLoad(res) {
       

        this.getSub(); 
    },
    //获取所有的考试类型
    getSub() {
        var that = this;
        var url = "/exam/findExamByCategory";
        var params = {
            sessionid: '',
            uid: ''
        }
        api.sendPosts(params, url, cb);
        function cb(res) {
            console.log(res.industryList);
            that.setData('industryList', res.industryList);
        }
    },
    //选择考试后，跳转到首页    
    gotoindex: function (e) {
        var that = this;
        var id = e.currentTarget.dataset.id;
        var title = e.currentTarget.dataset.name;
        var img=e.currentTarget.dataset.img;
        var examinationinfo = { id: id, title: title,img:img }
        
        console.log(examinationinfo);
        swan.setStorageSync("examinationinfo", examinationinfo);
        swan.reLaunch({
            url: '../index/index'
        });
    },
    // 页面的生命周期函数 – 监听页面初次渲染完成
    onReady(res) {

    },

    // 页面的生命周期函数 – 监听页面显示
    onShow(res) {

    },

    // 页面的生命周期函数 – 监听页面隐藏
    onHide(res) {

    },

    // 页面的生命周期函数 – 监听页面卸载
    onUnload(res) {

    },

    // 页面的生命周期函数 – 监听页面重启，单击重启按钮时触发
    onForceReLaunch(res) {

    },

    // 页面的事件处理函数 – 监听用户下拉动作
    onPullDownRefresh(res) {

    },

    // 页面的事件处理函数 – 上拉触底事件的处理函数
    onReachBottom(res) {

    },

    // 页面的事件处理函数 – 用户点击右上角转发
    onShareAppMessage(res) {

    },

    // 页面的事件处理函数 – 页面滚动触发事件的处理函数
    onPageScroll(res) {

    },

    // 页面的事件处理函数 – 当前是 tab 页时，点击 tab 时触发
    onTabItemTap(res) {

    }
});