const api = require("../util/api.js");
Page({
    data: {
        modelheight: 1024,
        timer: '1',
        percent: 68,
        totlemin: 0,
        totlehour: 0,
        studymin: 0,
        studyhour: 0,
        isversion2: false,//是否有往期版本 
        type: 0,
        systemis: 0,
        radarImg: '',
        show:false,
        coefficient:.5

    },

    onPullDownRefresh() {
        this.onLoad();
        this.onShow();
        this.data.refresh = true;
        swan.stopPullDownRefresh();
    },
    onLoad: function () {
        swan.getSystemInfo({
            success: res => {
                this.setData({
                    coefficient:res.windowWidth/750
                })
            }
        });
    },

    showScoreAnimation: function (rightItems, totalItems) {
        /*
        cxt_arc.arc(x, y, r, sAngle, eAngle, counterclockwise);
        x	                    Number	  圆的x坐标
        y	                    Number	  圆的y坐标
        r	                    Number	  圆的半径
        sAngle	            Number	  起始弧度，单位弧度（在3点钟方向）
        eAngle	            Number	  终止弧度
        counterclockwise	    Boolean	  可选。指定弧度的方向是逆时针还是顺时针。默认是false，即顺时针。
        */
        let that = this;
        let copyRightItems = 0;

        var result = 375;
        try {
            result = swan.getSystemInfoSync();
            console.log(result);
        } catch (e) {
            result = 375;
        }
        var canvaswidth = result.windowWidth * 84.5 / 375;
        that.setData({
            timer: setInterval(function () {

                // 页面渲染完成
                // 这部分是灰色底层
                let cxt_arc = swan.createCanvasContext('canvasArc');//创建并返回绘图上下文context对象。
                cxt_arc.setLineWidth(5);//绘线的宽度
                cxt_arc.setStrokeStyle('#d2d2d2');//绘线的颜色
                cxt_arc.setLineCap('round');//线条端点样式
                cxt_arc.beginPath();//开始一个新的路径
                cxt_arc.arc(canvaswidth / 2, canvaswidth / 2, canvaswidth / 2.2, 0, 2 * Math.PI, false);//设置一个原点(53,53)，半径为50的圆的路径到当前路径
                cxt_arc.stroke();//对当前路径进行描边
                //这部分是蓝色部分
                if (rightItems != 0) {
                    cxt_arc.setLineWidth(5);
                    cxt_arc.setStrokeStyle('#F8A82F');
                    cxt_arc.setLineCap('round')
                    cxt_arc.beginPath();//开始一个新的路径
                    cxt_arc.arc(canvaswidth / 2, canvaswidth / 2, canvaswidth / 2.2, -Math.PI * 1 / 2,
                        2 * Math.PI * (copyRightItems / totalItems) - Math.PI * 1 / 2, false);
                    cxt_arc.stroke();//对当前路径进行描边
                }
                cxt_arc.draw();
                if (copyRightItems == rightItems) {
                    clearInterval(that.data.timer)
                }
                copyRightItems++;
            }, 27)
        })
    },

    getResultComment: function (completePercent) {
        let that = this;

        that.setData({
            resultComment: completePercent + "%"
        })

    },
    gotovideo: function (e) {
        var that = this;
        var loginsuccess = swan.getStorageSync("loginsuccess");
        var islogin = this.data.islogin;
        if (!(loginsuccess.data)) {
            this.setData({
                click: loginsuccess.data
            })
            this.setData({
                click: !loginsuccess.data
            })

            swan.canvasToTempFilePath({
                x: 0,
                y: 0,
                width: 169*this.data.coefficient,
                height: 169*this.data.coefficient,
                canvasId: 'canvasArc',
                success:(res) =>{
                    this.setData({
                        radarImg: res.tempFilePath
                    });
                   
                },
                
            });
             this.setData({
            show:!this.data.show
            })
            return;

        }
        var id = e.currentTarget.dataset["vedio"];
        var isfree = e.currentTarget.dataset["isfree"];
        var isbuy = e.currentTarget.dataset["isbuy"];
        //已经登录后的操作
        if ((loginsuccess.data)) {
            if (isfree == 1 || isbuy == 1) {
                let type = this.data.type;
                swan.navigateTo({
                    url: '../chapterVedio/chapterVedio?vid=' + id + "&type=" + type
                })
            } else {
                const result = swan.getSystemInfoSync();
                let system = result.system;
                var subsys = system.substring(0, 3);
                if (subsys == "iOS") {
                    //    ios前往领资料页面 
                    swan.navigateTo({
                        url: '/pages/receiveData/receiveData'
                    });
                } else {

                    let module = this.data.type;
                    //    未购买条往购买页面  传递类型  视频id    
                    swan.navigateTo({
                        url: '/pages/purchase/purchase?childId=' + id + '&module=' + module + '&flagClass=3'
                    });
                }


            }


        }
    },
    sonData(res){
        
        this.setData({
            show:!this.data.show
        })
        console.log(this.data.show)
    },
    //转向登录页面
    gotologin: function (e) {

        this.setData({
            showModal: false
        })
        swan.navigateTo({
            url: '../login/login'
        })

    },
    hideModal: function (e) {
        this.setData({
            showModal: false
        })
    },

    onclickpin(e) {
        var id = e.currentTarget.dataset.fstid;
        pinarr = this.data.pinarr;
        if (pinarr[id]) {
            pinarr[id] = false;
            this.setData({ "pinarr": pinarr })
        } else {
            pinarr[id] = true;
            this.setData({ "pinarr": pinarr });
        }

    },

    onclickzhang(e) {
        var sndid = e.currentTarget.dataset.sndid;
        var fstid = e.currentTarget.dataset.fstid;
        var snd = this.data.snd;
        //增加一维数组长度 
        if (snd.length < (fstid + 1)) {
            var length = snd.length;
            for (var j = length; j < fstid + 1; j++) {
                snd[j] = new Array();
            }
        }
        if (snd[fstid][sndid]) {
            snd[fstid][sndid] = false;
        } else {
            snd[fstid][sndid] = true;
        }
        this.setData({ "snd": snd });
    },
    onShow: function () {
        let systeminfo = swan.getSystemInfoSync();
        const result = swan.getSystemInfoSync();
        let system = result.system;
        var subsys = system.substring(0, 3);
        if (subsys == "iOS") {
            this.setData({
                systemis: 1
            });
        }
        var courseinfo = swan.getStorageSync("courseinfo");
        courseid = courseinfo.id;
        e = { currentTarget: { dataset: { version: 1, "courseid": courseid } } }
        this.getdatalist(e);

    },
    getdatalist(e) {

        if ((e.currentTarget.dataset.version != this.data.version) || (e.currentTarget.dataset.courseid != this.data.courseid) || this.data.refresh) {
            this.data.refresh = false;
            this.data.version = e.currentTarget.dataset.version;
            this.data.courseid = e.currentTarget.dataset.courseid;
            this.setData({
                version: e.currentTarget.dataset.version
            });
            //获取当期章节课
            var courseinfo = swan.getStorageSync("courseinfo");
            courseid = courseinfo.id;
            var userinfo = swan.getStorageSync("userinfo");
            var params = { courseid: courseid, market: "baiduapp_ytku" };
            var url = "/video/getKnowPointVideoModuleList";
            var type = this.data.type;
            var that = this;
            api.sendPosts(params, url, function (result) {
                console.log(result);
                let version = that.data.version;
                let list = result.list;
                for (i = 0; i < list.length; i++) {
                    if (list[i].term == 2) {
                        that.dataset({ isversion2: true });
                    }

                    if (list[i].term == version) {
                        type = list[i].module;
                        that.data.type = type;
                    }
                }
                //根据获取到的type获取目录
                url = "/video/getvideolist";
                console.log("type:" + type);
                params = { sessionid: userinfo.sessionid, uid: userinfo.uid, courseid: courseid, type: type };
                api.sendPosts(params, url, function (res) {
                    console.log(res);
                    //学习的时长和总时长化为小时分钟
                    var totalTimeLength = (res.totalTimeLength / 60).toFixed();
                    var totlehour = parseInt(totalTimeLength / 60);
                    that.setData({ totlehour: totlehour });
                    var totlemin = totalTimeLength % 60;
                    that.setData({ totlemin: totlemin });
                    var totalWatchTimeLength = (res.totalWatchTimeLength / 60).toFixed();
                    var studyhour = parseInt(totalWatchTimeLength / 60);
                    that.setData({ studyhour: studyhour });
                    var studymin = totalWatchTimeLength % 60;
                    that.setData({ studymin: studymin });
                    var totle = ((totalWatchTimeLength / totalTimeLength) * 100).toFixed();
                    that.setData({ list: res.list });
                    // 监听页面加载的生命周期函数
                    // 以下两个是测试数据
                    let totalItems = 100;
                    if (totle == 'NaN' || totle == null) {
                        totle = 0;
                    }
                    let rightItems = totle;
                    that.getResultComment(rightItems);
                    let completePercent = parseInt((rightItems / totalItems) * 100);
                    that.showScoreAnimation(rightItems, totalItems);

                });




            });


            //控制显示变量
            var pinarr = [];
            this.data.pinarr = pinarr;

            //定义一个5*5的二维数组
            var snd = new Array();
            for (var i = 0; i < 5; i++) {
                snd[i] = new Array();
                for (var j = 0; j < 5; j++) {
                    snd[i][j] = false;
                }
            }
            this.data.snd = snd;

            //更改标题
            let examinationinfo = swan.getStorageSync("examinationinfo");
            let title = examinationinfo.title;
            swan.setNavigationBarTitle({
                title: title
            });

        }

    }


});