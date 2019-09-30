const api = require("../../components/api.js");
Page({
    data: {

    },
    onLoad: function (options) {
        console.log('得到的参数',options)
        this.setData({
            parameter: options.testResult
        })
        var that = this;
        var testResult = JSON.parse(options.testResult)
        console.log('请求参数', testResult)
        if (testResult.type == 5 || testResult.type == 11) {
            this.setData({
                btnText: "重新练习"
            })
        } else {
            this.setData({
                btnText: "继续练习"
            })
        }
        var url = '/study/loadrecordpaper';
        if(testResult.type == 133){
            url = '/dayExam/getDayExamPaper';
        }
        api.sendPosts(testResult, url, function (res) {
            console.log(res)
            if (res.errcode == 0) {
                var noDo = 0, doRight = 0, doWrong = 0, noScroe = 0;
                var list = res.list;
                for (var i = 0; i < list.length; i++) {
                    switch (list[i].isright) {
                        case '0': noDo++;
                            break;
                        case '1': doRight++;
                            break;
                        case '2': doWrong++;
                            break;
                        case '3': noScroe++;
                            break;
                    }
                }
                // 处理鼓励得话
                var encourageText = ""
                if (parseInt(res.currentaccuracy) > 80) {
                    encourageText = "再接再励，继续努力刷题吧~"
                } else if (parseInt(res.currentaccuracy) > 50) {
                    encourageText = "继续努力，天才出于勤奋哦~"
                } else {
                    encourageText = "继续努力，越努力越幸运哦~"
                }
                //处理是否得分或者正确率
                var getScore = '',
                    unit = '',
                    allScore = '';
                if ((res.currentaccuracy).slice(-1) == '分') {
                    getScore = '得分';
                    unit = '分';
                    allScore = '试卷总分' + 'ss' + '分';
                } else {
                    getScore = '正确率';
                    unit = '%';
                    allScore = '正确率=做对试题量/总试题量';
                }
                // 错题解析试卷
                var wrongList = [];
                for (var j = 0; j < res.list.length; j++) {
                    if (res.list[j].isright != 1) {
                        wrongList.push(res.list[j])
                    }
                }
                // 处理list
                function listHandle(list) {
                    var newlist = [];
                    for (var i = 0; i < list.length; i++) {
                        if (list[i].parentqid == '') {
                            newlist.push(list[i])
                        }
                    }
                    return newlist;
                };
                var newlist = listHandle(res.list)
                that.setData({
                    wrongList: wrongList,
                    currentaccuracy: parseFloat(res.currentaccuracy),
                    getScore: getScore,
                    unit: unit,
                    res: res,
                    allScore: allScore,
                    list: newlist,
                    oldlist: res.list,
                    noDo: noDo,
                    doRight: doRight,
                    doWrong: doWrong,
                    noScroe: noScroe,
                    encourageText: encourageText
                })
                console.log(that.data)
            }
        })
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
    allAnalysisHandle() {
        var that = this;
        var list = JSON.stringify(this.data.oldlist)
        swan.navigateTo({
            url: '/pages/answerKey/answerKey?' + "list=" + list + '&parameter=' + that.data.parameter
        });
    },
    wrongAnalysisHandle() {
        var that = this;
        var list = JSON.stringify(this.data.wrongList)
        swan.navigateTo({
            url: '/pages/answerKey/answerKey?' + "list=" + list + '&parameter=' + that.data.parameter
        });
    },
    submitBtnHandle() {
        var testResult = JSON.parse(this.data.parameter)
        if (testResult.type == 5 || testResult.type == 11) {
            swan.showModal({
                title: '确认重新练习？',
                content: '重新练习将会清空做题记录，确认重新练习？',
                confirmText: '确认',
                cancelText: '取消',
                success: function (confirm, cancel) {
                    if (confirm.confirm) {

                        
                        swan.redirectTo({
                            url: '/pages/doExam/doExam?' + "courseid=" + testResult.courseid + '&sessionid=' + testResult.sessionid + '&type=' + testResult.type + '&uid=' + testResult.uid + '&unitid=' + testResult.unitid + '&sessionid=' + testResult.sessionid + '&doExamName=' + testResult.doExamName+ '&kpid=' + testResult.kpid
                        });
                    } else {
                        // swan.navigateBack()
                    }
                }
            })
        } else {
            swan.redirectTo({
                url: '/pages/doExam/doExam?' + "courseid=" + testResult.courseid + '&sessionid=' + testResult.sessionid + '&type=' + testResult.type + '&uid=' + testResult.uid + '&unitid=' + testResult.unitid + '&sessionid=' + testResult.sessionid+ '&paperid=' + testResult.paperid + '&doExamName=' + testResult.doExamName+ '&kpid=' + testResult.kpid
            });
        }
    }
});