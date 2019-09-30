const api = require("../util/api.js");
Page({
    data: {
        logvideo: 0,
        systemis: 0,
        isEvaluation: 0,
        ifevato: false,//是否评价过  只弹出一次提醒评价
        videocode: "",  //视频播放地址
        networkType: '未获取',  //网络状态
        confirmation: false,
        currentTab: 0,
        vid: "",  //视频id
        nowqxd: "高清",//默认
        ischoose: false,
        isvediotitle: false,//是否显示视频标题
        teacherid: 0,
        type: 0,    //学习类型  版期
        ifeva: false,//是否有评论
        ifjy: false,//是否有讲义
        definition: "hd",//默认高清
        currentIndex: 0,
        xing: 0,
        avgxing: 0,
        xing5: 0,
        xing4: 0,
        xing3: 0,
        xing2: 0,
        xing1: 0,
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
        src1: '/images/icon_evaluate_star_pre.png',
        src2: '/images/icon_evaluate_star.png',
        pdf: "https://attachment.cnbkw.com/bkwimg/up/201903/中级会计-中级会计实务-第二章-第二节-存货期末计量方法.pdf",
        pdfPath: ''

    },


    //获取从另一个页面传来的参数  初始化页面  获取章节目录
    onLoad: function (option) {
        var vid = option.vid;
        this.setData({ vid: vid });
        swan.setStorageSync('vid', vid);
        var type = option.type;
        this.setData({ type: type });
        swan.setStorageSync('type', type);
        let definition = this.data.definition;
        var courseinfo = swan.getStorageSync("courseinfo");
        var courseid = courseinfo.id;
        var userinfo = swan.getStorageSync("userinfo");
        var params = { sessionid: userinfo.sessionid, uid: userinfo.uid, courseid: courseid, vid: vid, definition: definition, type: type };
        var url = "/video/getvideocode";
        var that = this
        swan.getSystemInfo({
            success: function (res) {
                that.setData({
                    clientHeight: res.screenHeight*(750 / res.windowWidth)
                });
            }
        })
        api.sendPosts(params, url, function (result) {
            //初始化参数
            console.log(result);
            //初始化是否评价过
            let isEvaluation = result.isEvaluation;
            that.data.isEvaluation = isEvaluation;
            //讲义的初始化
            let kejianurl = result.kejianurl;
            console.log("讲义地址：");
            console.log(kejianurl);
            //初始化视频播放地址
            let videocode = result.videocode;
            that.setData({ videocode: videocode });
            console.log(videocode);
            //更新清晰度，以实际拿到清晰度为准
            let dd = videocode.substring(39, 41);
            that.setData({ definition: dd });
            console.log("当前清晰度:" + dd);
            //更新清晰度的显示
            if (dd == 'sd') {
                that.setData({ nowqxd: "标清" });
            } else if (dd == 'ld') {
                that.setData({ nowqxd: "流畅" });
            }

            //视频标题的初始化
            let vediotitle = result.title;
            that.setData({ vediotitle: vediotitle });
            //初始化视频长度计算
            let timelength = result.timelength;
            that.setData({ timelength: timelength });
            //初始化评价页面数据
            //星级的初始化
            let evalua = result.evaluationDetail;
            let eva = evalua.evaluation;
            //计算各个星级所占的百分比
            let xing = eva.xing;
            let xing5 = (eva.xing5 / xing) * 100;
            let xing4 = (eva.xing4 / xing) * 100;
            let xing3 = (eva.xing3 / xing) * 100;
            let xing2 = (eva.xing2 / xing) * 100;
            let xing1 = (eva.xing1 / xing) * 100;

            that.setData({ xing5: xing5, xing4: xing4, xing3: xing3, xing2: xing2, xing1: xing1 });
            that.setData({ xing: eva.xing, avgxing: eva.avgXing });
            //记录老师id
            let teacherid = evalua.teacherid;
            that.setData({ teacherid: teacherid });
            //评价的初始化
            //根据上面获取的teacherid获取评价
            url = "/knowPoint/getEvaluationList";
            params = { sessionid: userinfo.sessionid, uid: userinfo.uid, courseid: courseid, teacherid: teacherid };
            api.sendPosts(params, url, function (res) {
                console.log(res);
                let evaluelsit = res.list;
                let ifeva = false;
                if (evaluelsit.length != 0) {
                    ifeva = true;
                }
                that.setData({ ifeva: ifeva });
                that.setData({ evaluelsit: evaluelsit });
                console.log(evaluelsit);
            });


        });


        //     swan.downloadFile({
        //     url: 'https://smartprogram.baidu.com/docs/img/file-simple.pdf',
        //     header: {
        //         "contentType": 'text/json,charset=utf-8'
        //     },
        //     success: function (res) {
        //         console.log(res.tempFilePath);
        //         swan.openDocument({
        //             filePath: res.tempFilePath,
        //             fileType: 'bin',
        //             success: function (res) {
        //                 console.log('openDocument success', res);
        //             },
        //             fail: function (err) {
        //                 console.log('openDocument fail', err);
        //             }
        //         });
        //     },
        //     fail: function (err) {
        //         console.log('downloadFile fail', err);
        //     }
        // });


        //     swan.downloadFile({
        //     url: '', //仅为示例，并非真实的资源
        //     success:  (res)=> {
        //         //下载成功
        //         if (res.statusCode === 200) {
        //              const a=res.tempFilePath;
        //             console.log("临时文件路径" + res.tempFilePath);

        //             //
        //             this.setData({
        //                 pdfPath:a
        //             });
        //             swan.openDocument({
        //                 filePath: a,
        //                 fileType:'pdf',
        //                 success:function(){
        //                     console.log('haha')
        //                 }
        //             });


        //         }

        //     },
        //     fail: function (err) {
        //         console.log('错误码：' + err.errCode);
        //         console.log('错误信息：' + err.errMsg);
        //     },

        // });







    },
    //视频记录的更新  此函数250MS触发 每15S保存一次记录
    funtimeupdate: function (e) {
        let logvideo = this.data.logvideo;
        logvideo = logvideo + 1;
        this.data.logvideo = logvideo;
        if (logvideo == 40) {
            let vid = this.data.vid;
            let module = this.data.type;
            let courseinfo = swan.getStorageSync("courseinfo");
            courseid = courseinfo.id;
            let userinfo = swan.getStorageSync("userinfo");
            //获取当前时间戳
            var timestamp = Date.parse(new Date());
            timestamp = timestamp / 1000;
            console.log("当前时间戳为：" + timestamp);

            //获取当前时间
            var n = timestamp * 1000;
            var date = new Date(n);
            //年
            var Y = date.getFullYear();
            //月
            var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
            //日
            var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
            //时
            var h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
            //分
            var m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
            //秒
            var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
            console.log(s);
            var addtime = Y + '-' + M + '-' + D + ' ' + h + ':' + m + ':' + s;
            console.log("当前时间：" + addtime);

            var params = {
                "sessionid": userinfo.sessionid,
                "userid": userinfo.uid,
                "courseid": courseid,
                "channelnumber": vid,
                "duration": "10",
                "module": module,
                "pageid": "baiduapp"+timestamp + "",
                "action": "watchvod",
                "from": "baiduapp",
                "addtime": addtime,

            };

            this.data.logvideo = 0;
            console.log("记录提交请求");
            var that = this;
            api.collectLog(params, function (result) {
            });

        }
    },


    //选择清晰度弹窗的显示
    chooseqxd: function (e) {
        let ischoose = this.data.ischoose;
        ischoose = true;
        this.setData({ ischoose: ischoose });
    },

    //视频清晰度的更换
    choose: function (res) {
        let ischoose = this.data.ischoose;
        let newdefinition = res.currentTarget.dataset["definition"];
        //   console.log("选择的清晰度："+newdefinition);
        let definition = this.data.definition;
        //   console.log("原来的清晰度："+definition);
        let now = res.currentTarget.dataset["now"];

        var videocode = this.data.videocode;
        // console.log("原视频地址:"+videocode);
        //发现视频链接格式一样 采取直接替换源地址清晰度
        let code = videocode.replace(definition, newdefinition);
        //更新视频地址
        //  console.log("更新视频地址:"+code);
        this.setData({ videocode: code });
        //更新现在的清晰度
        this.setData({ definition: newdefinition });
        //更新清晰度的显示
        this.setData({ nowqxd: now });
        //选择清晰度完毕，关闭清晰度选择栏
        ischoose = false;
        this.setData({ ischoose: ischoose });


        // //因为缓存问题 尝试直接替换字符

        //     let type = this.data.type;
        //     let vid = this.data.vid;
        //     let courseinfo = swan.getStorageSync("courseinfo");
        //     courseid = courseinfo.id;
        //     let userinfo = swan.getStorageSync("userinfo");
        //      console.log("definition:"+definition);
        //     let params = { sessionid: userinfo.sessionid, uid: userinfo.uid, courseid: courseid, vid: vid, definition: definition, type: type };
        //     let url = "/video/getvideocode";
        //     let that = this;
        //     api.sendPosts(params, url, function (result) {
        //         console.log(result);
        //         //改变视频播放地址
        //         let videocode = result.videocode;
        //          console.log("videocode:"+videocode);
        //         that.setData({ videocode: videocode });
        //             ischoose=false;
        //             that.setData({ ischoose: ischoose });
        //              that.setData({ nowqxd: now});

        //      });

    },
    //点击视频显示标题等
    showvediotitle: function (e) {
        let isvediotitle = this.data.isvediotitle;
        if (!isvediotitle) {
            isvediotitle = true;
            this.setData({ isvediotitle: isvediotitle });
        }

        let that = this;
        let times = 0;
        let i = setInterval(function () {
            times++
            if (times > 3) {


                let isvediotitle = that.data.isvediotitle;
                isvediotitle = false;
                that.setData({ isvediotitle: isvediotitle });
                clearInterval(i);
            }
        }, 1000)

    },
    downloadfile: function (e) {
        var link = e.currentTarget.dataset["downlink"];
        var title = e.currentTarget.dataset["vediotitle"];
        var fileName = new Date().valueOf();
        swan.downloadFile({
            url: link,
            filePath: title + '/' + fileName + '.mp4',
            success: res => {
                console.log(res);
                let filePath = res.filePath;
                swan.saveVideoToPhotosAlbum({
                    filePath,
                    success: file => {
                        $Message({
                            content: '下载成功',
                            type: 'success'
                        })
                        let fileMgr = swan.getFileSystemManager();
                        fileMgr.unlink({
                            filePath: title + '/' + fileName + '.mp4',
                            success: function (r) {

                            },
                        })
                    },
                    fail: err => {
                        console.log(err)
                        if (err.errMsg === 'saveVideoToPhotosAlbum:fail auth deny') {
                            swan.showModal({
                                title: '提示',
                                content: '需要您授权保存相册',
                                showCancel: false,
                                success: data => {
                                    swan.openSetting({
                                        success(settingdata) {
                                            if (settingdata.authSetting['scope.writePhotosAlbum']) {
                                                swan.showModal({
                                                    title: '提示',
                                                    content: '获取权限成功,再次点击下载即可保存',
                                                    showCancel: false,
                                                })
                                            } else {
                                                swan.showModal({
                                                    title: '提示',
                                                    content: '获取权限失败，将无法保存到相册哦~',
                                                    showCancel: false,
                                                })
                                            }
                                        },
                                    })
                                }
                            })
                        }
                    }
                })
            }
        });
    },

    //网络状态的点击刷新
    clickfresh: function (res) {
        console.log("刷新操作");
    },
    //移动网络下的确认播放
    clickensure: function (e) {
        this.setData({ confirmation: true });
    },


    getEvaluationList: function (teacherid) {
        console.log(teacherid);
    },

    select(e) {
        console.log(e)
        this.data.starId = e.currentTarget.dataset.index;
        this.setData({
            starId: this.data.starId
        })
    },
    //第一层折叠面板的控制
    firstonclick: function (e) {
        var id = e.currentTarget.id;
        var first = this.data.first;
        if (first[id]) {
            first[id] = false;
            this.setData({ first: first });
        } else {
            first[id] = true;
            this.setData({ first: first });
        }
    },
    //第二层的控制
    secondonclic: function (e) {
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

    //第三层播放图标的控制
    //以及更换视频来源 评价
    trdclick: function (e) {
        let isfree = e.currentTarget.dataset["isfree"];
        let isbuy = e.currentTarget.dataset["isbuy"];
        let type = this.data.type;
        var id = e.currentTarget.id;
        let vid = e.currentTarget.dataset["vedio"];
        this.setData({ vid: vid });
        swan.setStorageSync('vid', vid);
        if (isfree == 1 || isbuy == 1) {
            let definition = this.data.definition;
            console.log(definition);
            let courseinfo = swan.getStorageSync("courseinfo");
            courseid = courseinfo.id;
            let userinfo = swan.getStorageSync("userinfo");
            let params = { sessionid: userinfo.sessionid, uid: userinfo.uid, courseid: courseid, vid: vid, definition: definition, type: type };
            let url = "/video/getvideocode";
            let that = this;
            api.sendPosts(params, url, function (result) {
                console.log(result);
                //初始化视频播放地址
                let videocode = result.videocode;
                that.setData({ videocode: videocode });
                //初始化是否评价过
                let isEvaluation = result.isEvaluation;
                that.data.isEvaluation = isEvaluation;
                //初始化视频长度计算
                let timelength = result.timelength;
                that.setData({ timelength: timelength });
                //视频标题的更新
                let vediotitle = result.title;

                that.setData({ vediotitle: vediotitle });
                //初始化评价页面数据
                //星级的初始化
                let evalua = result.evaluationDetail;
                let eva = evalua.evaluation;
                //计算各个星级所占的百分比
                let xing = eva.xing;
                let xing5 = (eva.xing5 / xing) * 100;
                let xing4 = (eva.xing4 / xing) * 100;
                let xing3 = (eva.xing3 / xing) * 100;
                let xing2 = (eva.xing2 / xing) * 100;
                let xing1 = (eva.xing1 / xing) * 100;

                that.setData({ xing5: xing5, xing4: xing4, xing3: xing3, xing2: xing2, xing1: xing1 });
                that.setData({ xing: eva.xing, avgxing: eva.avgXing });
                //记录老师id
                let teacherid = evalua.teacherid;
                that.setData({ teacherid: teacherid });
            });
            //定义一个三维数组
            var trd = new Array();
            for (var i = 0; i < 5; i++) {
                trd[i] = new Array();
                for (var j = 0; j < 5; j++) {
                    trd[i][j] = new Array();
                    for (var k = 0; k < 5; k++) {
                        trd[i][j][k] = false;
                    }
                }
            }
            this.data.trd = trd;
            var sndid = e.currentTarget.dataset.sndid;
            var fstid = e.currentTarget.dataset.fstid;
            var trdid = e.currentTarget.dataset.trdid;
            var trd = this.data.trd;
            //增加一维数组长度
            if (trd.length < (sndid + 1)) {
                var length = trd.length;
                for (var j = length; j < sndid + 1; j++) {
                    trd[j] = new Array();
                }
            }
            //增加二维数组长度
            if (trd[fstid].length < (trdid + 1)) {
                var length = trd[fstid].length;

                for (var j = length; j < sndid + 1; j++) {
                    trd[fstid][j] = new Array();
                }
            }
            trd[fstid][sndid][trdid] = true;
            this.setData({ "trd": trd });
            //根据上面获取的teacherid获取评价
            let teacherid = that.data.teacherid;
            url = "/knowPoint/getEvaluationList";
            params = { sessionid: userinfo.sessionid, uid: userinfo.uid, courseid: courseid, teacherid: teacherid };
            api.sendPosts(params, url, function (result) {
                let evaluelsit = result.list;
                let ifeva = false;
                if (evaluelsit.length != 0) {
                    ifeva = true;
                }
                that.setData({ ifeva: ifeva });
                that.setData({ evaluelsit: evaluelsit });
                console.log(evaluelsit);
            });

        } else {
            //视频无购买转去购买页面或者领资料页面
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
                    url: '/pages/purchase/purchase?childId=' + vid + '&module=' + type + '&flagClass=3'
                });
            }
        }



    },
    getvedio: function (e) {
        let type = this.data.type;
        let definition = this.data.definition;
        let courseinfo = swan.getStorageSync("courseinfo");
        courseid = courseinfo.id;
        let userinfo = swan.getStorageSync("userinfo");
        let params = { sessionid: userinfo.sessionid, uid: userinfo.uid, courseid: courseid, type: type };
        let url = "/video/getvideolist";
        let that = this;
        api.sendPosts(params, url, function (e) {
            console.log(e);
        });
    },
    getzhang: function () {
        let courseinfo = swan.getStorageSync("courseinfo");
        courseid = courseinfo.id;
        console.log(courseid);
        let params = { courseid: courseid, market: "baiduapp_ytku" };
        let url = "/video/getKnowPointVideoModuleList";
        let that = this;
        api.sendPosts(params, url, function (e) {
            console.log(e);
        });

    },

    //点击切换
    clickTab: function (e) {

        var that = this;
        if (this.data.currentTab === e.target.dataset.current) {
            return false;
        } else {
            that.setData({
                currentTab: e.target.dataset.current
            })
        }
    },
    swiperTab: function (e) {

        let currentTab = this.data.currentTab;
        let current = e.detail.current;
        if (currentTab != current) {
            this.setData({
                currentTab: current
            })
        }

    },
    /**
     * 按钮点击事件
     */
    changeYL: function () {
        this.setData({
            showModal: true
        })
    },
    /**
     * 隐藏模态对话框
     */
    hideModal: function () {
        this.setData({
            showModal: false
        });
    },

    onReady: function () {

        // 监听页面初次渲染完成的生命周期函数
    },
    onShow: function () {
        //检测手机系统
        let systeminfo = swan.getSystemInfoSync();
        const result = swan.getSystemInfoSync();
        let system = result.system;
        var subsys = system.substring(0, 3);
        if (subsys == "iOS") {
            this.setData({
                systemis: 1
            });
        }

        var self = this;

        //监听网络状态
        swan.getNetworkType({
            success: res => {
                var networkType = res.networkType;
                self.setData({ networkType: networkType });
            },
            fail: err => {
                swan.showToast({
                    title: '获取网络状态失败'
                });
            }
        });
        //网络状态的监视
        swan.onNetworkStatusChange(function (res) {
            let networkType = res.networkType;
            self.setData({ networkType: networkType });

        });

        // 监听页面显示的生命周期函数
        let type = this.data.type;
        let courseinfo = swan.getStorageSync("courseinfo");
        courseid = courseinfo.id;
        let userinfo = swan.getStorageSync("userinfo");
        let params = { sessionid: userinfo.sessionid, uid: userinfo.uid, courseid: courseid, type: type };
        let url = "/video/getvideolist";
        let that = this;
        api.sendPosts(params, url, function (res) {
            console.log(res);
            that.setData({ list: res.list });
            // 监听页面加载的生命周期函数
        });




        //控制显示变量
        //控制显示变量
        var first = [];
        this.data.first = first;

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

        // var snd = [];
        // this.data.snd = snd;
        // var trd = [];
        // this.data.trd = trd;

    },
    onHide: function () {

    },
    onUnload: function () {
        // 监听页面卸载的生命周期函数
        // 监听页面隐藏的生命周期函数
        let isEvaluation = this.data.isEvaluation;
        if (isEvaluation == 0) {
            swan.showModal({
                title: '课程评价',
                content: '您的客观评价可以提高老师授课技能和课程质量',
                confirmText: '立即评价',
                confirmColor: '#FECD31',
                cancelText: '下次再说',
                success: function (res) {
                    if (res.confirm) {

                        swan.navigateTo({
                            url: '../evaluate/evaluate'
                        })
                    } else {
                        console.log("用户点击了取消");
                    }

                },

            });

        }



    },
    onPullDownRefresh: function () {
        // 监听用户下拉动作
    },
    onReachBottom: function () {
        // 页面上拉触底事件的处理函数
    },
    onShareAppMessage: function () {
        // 用户点击右上角转发
    }
});