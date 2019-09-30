const api = require("../util/api.js");

Page({
    data: {
        currentData: 0,
        show: [[], [], []]
    },
    onPullDownRefresh() {
        this.onShow();
        swan.stopPullDownRefresh();
    },
    canvas() {
        var canvaswidth = this.data.canvaswidth;

        // 初始化
        const ctx = this.createCanvasContext('Canvas');
        // 设置圆点 x  y   中心点
        let number = {
            x: canvaswidth / 2,
            y: canvaswidth / 2
        };
        // 获取数据 各类项的个数
        let term = this.data.messarr;
        let termarr = [];
        for (let t = 0; t < term.length; t++) {
            // flownum
            let thisterm = Number(term[t].flownum)
            let thiscolor = term[t].color
            termarr.push({
                data: thisterm,
                color: thiscolor
            })
        }
        // console.log(termarr);
        // 设置总数
        let sign = 0;
        for (var s = 0; s < termarr.length; s++) {
            sign += termarr[s].data
        }
        //设置半径 
        let radius = canvaswidth / 2;
        for (var i = 0; i < termarr.length; i++) {
            var start = 0;
            // 开始绘制
            ctx.beginPath()
            if (i > 0) {
                for (var j = 0; j < i; j++) {
                    start += termarr[j].data / sign * 2 * Math.PI
                }
            }
            var end = start + termarr[i].data / sign * 2 * Math.PI
            ctx.arc(number.x, number.y, radius, start, end);
            // ctx.setLineWidth(1);
            ctx.lineTo(number.x, number.y);
            ctx.setStrokeStyle('#fff');
            ctx.setFillStyle(termarr[i].color);
            ctx.fill();
            ctx.closePath();
            ctx.stroke();
        }
        ctx.draw();
        const ctx1 = this.createCanvasContext('whitecanvas');
        ctx1.setFillStyle('#fff');
        ctx1.arc(canvaswidth / 2, canvaswidth / 2, canvaswidth / 4, 0, 2 * Math.PI);
        ctx1.fill();
        ctx.closePath();
        ctx.stroke();
        ctx1.draw();

    },

    onShow: function () {
        console.log("onshow执行");
        var userinfo = swan.getStorageSync("userinfo");
        var sessionid = userinfo.sessionid;
        var uid = userinfo.uid;
        var params = {
            "sessionid": sessionid,
            "uid": uid,
            'courseId': this.data.courseId
        };

        var url = "/myStudyCenter/findLearningReport";
        var that = this;
        api.sendPosts(params, url, function (res) {
            that.setData({ "reportList": res });
            //统计未掌握，薄弱，已掌握考点个数
            var master = 0;
            var weak = 0;
            var unMaster = 0;
            for (var i = 0; i < res.unMasterList.length; i++) {
                for (var j = 0; j < res.unMasterList[i].knowPointList.length; j++) {
                    unMaster = unMaster + 1;
                }
            }
            for (var i = 0; i < res.weakList.length; i++) {
                for (var j = 0; j < res.weakList[i].knowPointList.length; j++) {
                    weak = weak + 1;
                }
            }
            for (var i = 0; i < res.masterList.length; i++) {
                for (var j = 0; j < res.masterList[i].knowPointList.length; j++) {
                    master = master + 1;
                }
            }
            that.setData({
                "unMaster": unMaster,
                "weak": weak,
                "master": master
            });

            //画布开始
            var unMasteredPercent = parseFloat(that.data.reportList.unMasteredPercent);//未掌握
            var masteredPecent = parseFloat(that.data.reportList.masteredPecent);//掌握
            var weakPecent = parseFloat(that.data.reportList.weakPecent);//薄弱

            that.setData({
                messarr: [{
                    color: '#EDF1F5',
                    flownum: unMasteredPercent,
                },
                {
                    color: '#FF8212',
                    flownum: masteredPecent,
                },
                {
                    color: '#FECC34',
                    flownum: weakPecent,
                }
                ]
            });

            that.canvas();

        });

    },
    // 生命周期函数--监听页面初次渲染完成	 
    onReady: function () {
        //根据屏幕宽度设置圆半径
        var result = 375;
        try {
            result = swan.getSystemInfoSync();
        } catch (e) {
            result = 375;
        }
        var canvaswidth = result.windowWidth * 130 / 375;
        this.data.canvaswidth = canvaswidth;
    },
    // tab切换
    changeTab: function (e) {
        const that = this;
        that.setData({
            currentData: e.currentTarget.dataset.current
        });
    },
    //点击知识点
    changeShow: function (e) {
        var sndid = e.currentTarget.dataset.index;
        var fstid = e.currentTarget.dataset.fstid;
        var show = this.data.show;
        if (show[fstid][sndid]) {
            show[fstid][sndid] = false;
        } else {
            show[fstid] = [];
            show[fstid][sndid] = true;
        }
        this.setData({ "show": show });
    },
    //监听页面滚动
    onPageScroll: function (e) {
        this.setData({
            scrollTop: e.scrollTop
        });
    },
    // 监听页面加载的生命周期函数
    onLoad: function (options) {
        //获取学习报告页面传递过来的科目名称和科目id
        this.setData({
            'coursetitle': options.coursetitle,
            'courseId': options.courseId
        });
    }

});