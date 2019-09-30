const api = require("../util/api.js")
Page({

    // 页面的初始数据
    data: {

    },
    goToService() {
        // swan.navigateTo({
        //     url: '../customerService/customerService'
        // });
    },
    onPullDownRefresh() {
        api.refreshSession();
        this.onLoad();
        this.onShow();
        swan.stopPullDownRefresh();
    },
    onclickmenu(e) {
        var module = e.currentTarget.dataset.module;
        var courseinfo = swan.getStorageSync("courseinfo");
        var courseid = courseinfo.id;

        if (module == "133") {
            //1每日一练

            swan.navigateTo({
                url: '../practiceList/practiceList?type=' + module
            });
        } else if (module == "31") {
            //2考点练习
            swan.navigateTo({
                url: '../examPoint/examPoint?type=' + 17
            });
        } else if (module == "7") {
            //3我的错题
            swan.navigateTo({
                url: '../wrongExercise/wrongExercise?flag=0'
            });
        } else if (module == "12") {
            //4收藏
            swan.navigateTo({
                url: '../wrongExercise/wrongExercise?flag=1'
            });
        } else if (module == "20") {
            //5高频题库
            swan.navigateTo({
                url: '../highQuestionBank/highQuestionBank?type=' + module
            });
        } else if (module == "11") {
            //6历年真题
            swan.navigateTo({
                url: '../pastYearsQuestion/pastYearsQuestion?type=' + module
            });
        } else if (module == "5") {
            //7模拟测试
            swan.navigateTo({
                url: '../simulatedTest/simulatedTest?type=' + module
            });
        } else if (module == "6") {
            //8考前押题
            swan.navigateTo({
                url: '../preExamQuestions/preExamQuestions?type=' + module
            });
        }
    },
    //获取首页数据
    getIndexData() {
        //获取首页菜单数据
        var url = "/index/getIndexData";
        var userinfo = swan.getStorageSync("userinfo");
        var examinationinfo = swan.getStorageSync("examinationinfo");
        var courseinfo = swan.getStorageSync("courseinfo");
        var params = {
            sessionid: userinfo.sessionid,
            uid: userinfo.uid,
            market: "baiduapp_ytku",
            courseId: courseinfo.id,
            categoryId: examinationinfo.id
        };
        var that = this;
        api.sendPosts(params, url, function (res) {
            that.setData({
                moduleList: res.moduleList,
                scrollInfoList: res.scrollInfoList,
                examDay: res.examDay,
                adList: res.adList
            });
            swan.setStorageSync("examDay", that.data.examDay);

            //menupages 记录菜单的页数 
            var menupages = [];
            for (var i = 0; i < Math.ceil(res.moduleList.length / 8); i++) {
                menupages[i] = i;

            }
            that.setData({
                "menupages": menupages
            });

        });


        //获取首页热门试卷
        url = "/study/getUnitlist";
        params = { uid: userinfo.uid, sessionid: userinfo.sessionid, type: 7, courseid: courseinfo.id }
        api.sendPosts(params, url, function (res) {
            if (res.errcode != 0) {
                console.log(res.errmsg);
                return;
            }
            that.setData("hot", res.unitlist)
            // console.log(res);
        });
    },

    //热门试卷：导入上次学习记录
    onclickQuestion(e) {
        //未登录，弹出登录框
        var loginsuccess = swan.getStorageSync("loginsuccess");
        // console.log(loginsuccess.data);
        if (!(loginsuccess.data)) {
            this.setData({
                click: loginsuccess.data
            })
            this.setData({
                click: !loginsuccess.data
            })
            return;
        }
        //是否导入上次记录
        var index = e.currentTarget.dataset.index;
        var courseinfo = swan.getStorageSync("courseinfo");
        var courseid = courseinfo.id;
        var oldunitid = swan.getStorageSync("indexs" + index + "unitid" + courseid);
        var newunitid = e.currentTarget.dataset.unitid;
        var params = {
            "type": 294,
            "oldunitid": oldunitid,
            "newunitid": newunitid,
            "name": "indexs" + index,
            "title": "热门试卷"
        }
        api.getLastPaper(params);
    },

    //智能特训：获取上次学习试卷
    getintellect(e) {
        //未登录，弹出登录框
        var loginsuccess = swan.getStorageSync("loginsuccess");
        // console.log(loginsuccess);
        if (!(loginsuccess.data)) {
            this.setData({
                click: loginsuccess.data
            })
            this.setData({
                click: !loginsuccess.data
            })
            return;
        }
        //是否导入上次记录
        var courseinfo = swan.getStorageSync("courseinfo");
        var courseid = courseinfo.id;
        var oldunitid = swan.getStorageSync("intellect" + "unitid" + courseid);
        var newunitid = "-5";
        var params = {
            "type": "30",
            "oldunitid": oldunitid,
            "newunitid": newunitid,
            "name": "intellect",
            "title": "热门试卷"
        }
        api.getLastPaper(params);
    },

    //获取考试课程列表 并保存courseinfo
    findCourceByExamId() {
        var url = "/exam/findCourceByExamId";
        var userinfo = swan.getStorageSync("userinfo");
        var examinationinfo = swan.getStorageSync("examinationinfo");
        var courseinfo = swan.getStorageSync("courseinfo");
        var oldexaminationid = swan.getStorageSync("oldexaminationid");
        var params = { sessionid: userinfo.sessionid, uid: userinfo.uid, examId: examinationinfo.id };
        var that = this;
        api.sendPosts(params, url, function (res) {
            swan.setStorageSync("coursejson", res);
            if (courseinfo == null || courseinfo == "" || courseinfo == {} || oldexaminationid != examinationinfo.id) {
                that.setData({ coursename: res.courseList[0].title });//传向index页面的数据
                swan.setStorageSync("courseinfo", res.courseList[0]);//写入StorageSync
            }
            else {
                that.setData({ coursename: courseinfo.title });//传向index页面的数据
            }
            that.getIndexData();
            swan.setStorageSync("oldexaminationid", examinationinfo.id);
        });
    },

    // 页面的生命周期函数 – 监听页面加载
    onLoad(res) {
        var loginsuccess = swan.getStorageSync("loginsuccess");
        if (loginsuccess.data != true) {
            api.autoLogin();
        }
    },
    // 页面的生命周期函数 – 监听页面初次渲染完成
    onReady(res) {
    },

    // 页面的生命周期函数 – 监听页面显示
    onShow(res) {
        //页面跳转判断
        var examinationinfo = swan.getStorageSync("examinationinfo");
        if (examinationinfo == null || examinationinfo == "") {
            swan.reLaunch({
                url: '../subject/subject'
            });
            return;
        }
        //获取考试科目-------在第一次进入的时候默认选择查出来课程的第一科目
        this.findCourceByExamId();

        //首页标题
        swan.setNavigationBarTitle({
            title: examinationinfo.title
        });

        //exmination name
        var exmination = swan.getStorageSync("exminationinfo");
        this.setData({
            exminationname: exmination.title
        });
    },
    hehe(res){
        console.log(res)
    }
})