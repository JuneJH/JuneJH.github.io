/**
 * @file index.js
 * @author swan
 */
const app = getApp()
const api = require("../util/api.js")
Page({

    // 页面的初始数据
    data: {

        id: 1,
        examList: [
        ],
        img: "",
        examname: '会计师'
    },

    //选择考试类别下的科目后进行跳转 
    selectexam: function (e) {
        var ids = e.currentTarget.dataset.id;
        var title = e.currentTarget.dataset.title;
        var courseinfo = { id: ids, title: title }
        this.setData('id', ids);
        swan.setStorageSync('courseinfo', courseinfo);


        
        swan.reLaunch({
            url: '../index/index'
        });
    },
    //跳转到选择考试页面
    gotosubject() {
        swan.navigateTo({
            url: '../subject/subject'
        });
    },
    // 页面的生命周期函数 – 监听页面加载
    onLoad(res) {
        this.getmsg();

    },
    //获取页面数据
    getmsg() {
        var exam = swan.getStorageSync('courseinfo');
        var examlist = swan.getStorageSync('coursejson');
        var id = exam.id;
        var examinationinfo = swan.getStorageSync("examinationinfo");
        console.log(examinationinfo);
        this.setData({
            examList: examlist.courseList,
            id: id,
            examname: examinationinfo.title,
            img: examinationinfo.img
        });
        examinationinfo
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
