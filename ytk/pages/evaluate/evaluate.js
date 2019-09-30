const api = require("../util/api.js");
Page({
    data: {
        starUrl: [
            '../../images/grade-icon.png',
            '../../images/grade-icon.png',
            '../../images/grade-icon.png',
            '../../images/grade-icon.png',
            '../../images/grade-icon.png'
        ],
        imgs: [{
            id: 1
        }, {
            id: 2
        }, {
            id: 3
        }, {
            id: 4
        }, {
            id: 5
        }],
        starId: 5,
        src1: '/images/grade-icon.png',
        src2: '/images/grade-icon-black.png',
        text: '推荐，课程非常棒',

        cursor: 0,
        flag: 5,
        value: '',
        tips: '请发表下心得~',
        tipsShow: true
    },
    onLoad: function () {
        // 监听页面加载的生命周期函数

    },
    onReady: function () {
        // 监听页面初次渲染完成的生命周期函数
    },
    onShow: function () {
        // 监听页面显示的生命周期函数
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
    starNum(event) {
        const dataset = event.target.dataset;
        this.setData({ flag: dataset.index + 1 });
        if (dataset.index == 0) {
            this.setData({
                text: '极差，课程很糟糕，我要吐槽'
            })
        } else if (dataset.index == 1) {
            this.setData({
                text: '差，我对课程不满意'
            })
        } else if (dataset.index == 2) {
            this.setData({
                text: '中评，课程很一般'
            })
        } else if (dataset.index == 3) {
            this.setData({
                text: '良好，课程还可以'
            })
        } else if (dataset.index == 4) {
            this.setData({
                text: '推荐，课程非常棒'
            })
        }


    },
    inputValue(event) {
        this.setData({
            cursor: event.detail.cursor
        })
        this.data.value = event.detail.value
    },

    submit() {
        if (!this.data.value) {
            this.setData({
                tipsShow: false
            });

        } else {
            let vid = swan.getStorageSync('vid');
            let type = swan.getStorageSync('type');
             let courseinfo = swan.getStorageSync("courseinfo");
            courseid = courseinfo.id;
            let userinfo = swan.getStorageSync("userinfo");
            let value=this.data.value;
            let flag=this.data.flag;
            let params = { sessionid: userinfo.sessionid, uid: userinfo.uid, courseid: courseid, vod_id: vid,module: type ,xing:flag,advise:value};
            let url = "/knowPoint/evaluationKnowPointVideo";
            let that = this;
             api.sendPosts(params, url, function (result) {
                console.log(result);
                if(result.errmsg=='ok' || result.errmsg=='OK'){
                      swan.switchTab({
                          url: '../chapter/chapter'
                      }) 
                }
            });
        }
        const timer = setTimeout(() => {
            this.setData({
                tipsShow: true
            })
        }, 2000);

    }
});