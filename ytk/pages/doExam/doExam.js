var paser = require('../../lib/xmldom/dom-parser.js');
const api = require("../../components/api.js");
var WxParse = require('../../wxParse/wxParse.js');
var userinfo = swan.getStorageSync("userinfo");
Page({
    // 5 和 11
    data: {
        isSlide: true,
        // 判断是否到最后一页
        slide: {
            touchDotX: 0,
            touchDotY: 0,
            interval: '',
            time: 0
        },
        showStop: false,
        windowHeight: 0,
        topHeight: 0,
        bottomHeight: 0,
        top: 0,
        proportion: .5,
        proportion2: .5,
        // 轮播索引
        curr: 0,
        // 上一次页码prevCurr
        prevCurr: 1,
        textValue: 'test',
        //  当前题号，应该与索引一致
        index: 0,
        //是否显示输入框
        Isdisabled: false,
        subIndex: 0,
        subCurr: 0,
        prevSubCurr: 1,
        answerMask: false,
        answerWrap: false,
        // topicType: '',
        mainque: [],
        optionCase: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M'],
        userAnswer: [],
        totalwastetime: 0,
        prevTime: 0,
        wrongnum: 0,
        rightnum: 0,
        submitInfo: [],
        isNoFirstEnterDoExam: false
    },
    // 初始化操作
    onLoad: function (options) {

        var topName = options.name;
        this.data.topName = topName;
        console.log('得到的参数', options)
        // 修改title
        swan.setNavigationBarTitle({
            title: options.doExamName
        });
        swan.getSystemInfo({
            success: res => {
                this.data.proportion = 750 / res.windowWidth;
                this.data.windowHeight = res.windowHeight;
                this.data.proportion2 = res.windowWidth / 750;
            }
        });
        //可扩展，该index为全局的索引
        var globalIndex = parseInt(options.examNum) || 0;
        this.setData({
            curr: globalIndex
        })
        this.data.intervalTimer = setInterval(function () {
            that.data.totalwastetime++;
            that.setData({
                totalwastetime: that.data.totalwastetime
            })
        }, 1000)
        var that = this;

        var userinfo = swan.getStorageSync("userinfo");

        options.sessionid = userinfo.sessionid;
        options.uid = userinfo.uid;
        this.setData({
            RequestParameters: options,
            globalIndex: globalIndex,
            storageExamName: options.storageExamName
        })
        this.showData();
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
        // 获取新试卷
        if (options.type == 133) {
            api.sendPosts(options, '/dayExam/getDayExamPaper', function (res) {
                console.log(res)
                var newlist = listHandle(res.list)
                that.setData({
                    paperid: res.paperid,
                    timing: res.timing,
                    suff: res.suff,
                    list: newlist,
                    lastwastetime: res.wastetime,
                    oldlist: res.list,
                    kaoqi: res.kaoqi,
                    currTopicSum: newlist.length,
                    mainqueQuetypename: res.list[globalIndex].quetypename,
                })
                console.log('获取的试卷', that.data.list);
                // 请求三次题
                var listLen = that.data.list.length;
                if (globalIndex > 0 && globalIndex < listLen - 1) {
                    that.getQuestion(globalIndex - 1)
                    that.getQuestion(globalIndex)
                    that.getQuestion(globalIndex + 1)
                } else if (globalIndex == 0) {
                    that.getQuestion(globalIndex)
                    that.getQuestion(globalIndex + 1)
                } else if (globalIndex == listLen - 1) {
                    that.getQuestion(globalIndex - 1)
                    that.getQuestion(globalIndex)
                }
                if (that.data.list[globalIndex].struct == 2) {

                    that.setData({
                        textareaVlue: that.data.list[globalIndex].useranswer
                    })

                } else if (that.data.list[globalIndex].answer == "") {
                    that.setData({
                        textareaVlue: that.data.list[globalIndex].useranswer
                    })

                }
            });
        } else if (options.CurState == 2) {
            api.sendPosts(options, '/study/loadrecordpaper', function (res) {
                if (res.errcode == 0) {
                    var isNoFirstEnterDoExam = swan.getStorageSync('isNoFirstEnterDoExam');
                    console.log(isNoFirstEnterDoExam)
                    if (!isNoFirstEnterDoExam) {
                        console.log('jinru')
                        swan.setStorageSync('isNoFirstEnterDoExam', 'true');
                        this.setData({
                            isNoFirstEnterDoExam: true
                        })
                    }
                    console.log(res)
                    var newlist = listHandle(res.list)
                    that.setData({
                        paperid: res.paperid,
                        timing: res.timing,
                        suff: res.suff,
                        list: newlist,
                        lastwastetime: res.wastetime,
                        oldlist: res.list,
                        kaoqi: res.kaoqi,
                        currTopicSum: newlist.length,
                        mainqueQuetypename: res.list[globalIndex].quetypename,

                    })

                    // ========
                    if (options.type == 5 || options.type == 11) {
                        that.setData({
                            showTime: true,
                            doTimer: '00:00:00',
                            manageTimer: UseTime()
                        })
                        that.data.manageTimer.sartTime();
                    }
                    // var that = this;
                    // 记时
                    function UseTime() {
                        console.log(that.data.timing, that.data.lastwastetime)
                        var TimeAll = parseInt(that.data.timing) - parseInt(that.data.lastwastetime),
                            TimeOne = 0,
                            timer;
                        console.log(TimeAll)
                        var sst = {
                            sartTime: function () {
                                timer = setInterval(function () {
                                    if (TimeAll == 0) {
                                        that.data.manageTimer.stopTime();
                                        timeOver();
                                        return false;
                                    }
                                    TimeOne++;
                                    TimeAll--;
                                    that.setData({
                                        doTimer: renderTime(TimeAll)
                                    })

                                }, 1000)
                            },
                            stopTime: function () {
                                that.setData({
                                    TimeOne: renderTime(TimeOne)
                                })
                                clearInterval(timer);
                            }
                        }
                        return sst;
                    }
                    function timeOver() {
                        swan.showToast({
                            title: '已超过答题时间',
                            icon: 'none',
                            mask: true,
                            success: function () {
                                // 保存当前题
                                if (that.data.list[that.data.globalIndex].struct == 1) {
                                    that.submitParameter(that.data.globalIndex);
                                } else {
                                    that.submitSubParameter(that.data.globalIndex, that.data.subIndex)
                                }
                                formalSubmint();
                                // 正式提交
                                function formalSubmint() {
                                    var rp = that.data.RequestParameters;
                                    var data = that.data;
                                    //  提交试卷参数对象
                                    var subInfo = {
                                        sessionid: rp.sessionid,
                                        uid: rp.uid,
                                        state: 1,
                                        accuracy: parseInt(data.rightnum) / parseInt((data.rightnum + data.wrongnum)),
                                        paperid: data.paperid,
                                        lastqid: data.index,
                                        type: rp.type,
                                        wastetime: data.totalwastetime
                                    };
                                    var testResult = {
                                        uid: that.data.RequestParameters.uid,
                                        sessionid: that.data.RequestParameters.sessionid,
                                        courseid: that.data.RequestParameters.courseid,
                                        unitid: that.data.RequestParameters.unitid,
                                        type: that.data.RequestParameters.type,
                                        paperid: that.data.paperid,
                                    }
                                    var testResult = JSON.stringify(testResult)
                                    that.showData('展示');
                                    api.sendPosts(subInfo, '/study/handinpaper', function (res) {
                                        console.log('提交刷题答案', res)
                                        if (res.errcode == 0) {
                                            console.log('提交答案成功')
                                            swan.navigateTo({
                                                url: '/pages/testResult/testResult?' + "testResult=" + testResult
                                            });
                                            console.log('提交答案成功')

                                        }
                                    })

                                }

                            }

                        });
                    }
                    function renderTime(TimeAll) {
                        var hour = parseInt(TimeAll / 3600);
                        var min = parseInt((TimeAll - hour * 3600) / 60);
                        var sec = TimeAll - hour * 3600 - min * 60;
                        var str = bL(hour) + ':' + bL(min) + ':' + bL(sec)
                        return str;

                    }
                    function bL(n) {
                        return n >= 10 ? n : n = '0' + n;
                    }
                    //=====
                    // 请求三次题
                    var listLen = that.data.list.length;
                    if (globalIndex > 0 && globalIndex < listLen - 1) {
                        that.getQuestion(globalIndex - 1)
                        that.getQuestion(globalIndex)
                        that.getQuestion(globalIndex + 1)
                    } else if (globalIndex == 0) {
                        that.getQuestion(globalIndex)
                        that.getQuestion(globalIndex + 1)
                    } else if (globalIndex == listLen - 1) {
                        that.getQuestion(globalIndex - 1)
                        that.getQuestion(globalIndex)
                    }
                    if (that.data.list[globalIndex].struct == 2) {

                        that.setData({
                            textareaVlue: that.data.list[globalIndex].useranswer
                        })

                    } else if (that.data.list[globalIndex].answer == "") {
                        that.setData({
                            textareaVlue: that.data.list[globalIndex].useranswer
                        })

                    }

                } else if (res.errcode == '10004') {
                    swan.showModal({
                        title: '升级题库',
                        content: '同学您的免费学习时间已用完，升级题库可继续答题',
                        confirmText: '升级题库',
                        cancelText: '放弃',
                        success: function (confirm, cancel) {
                            if (confirm.confirm) {
                                swan.navigateTo({
                                    url: '/pages/purchase/purchase?flagClass=4'
                                });
                            } else {
                                swan.navigateBack()
                            }
                        }
                    })
                } else {
                    swan.showModal({
                        // title: '升级题库',
                        content: res.errmsg,
                        confirmText: '返回',
                        // cancelText: '放弃',
                        showCancel: false,
                        success: function (confirm, cancel) {
                            if (confirm.confirm) {
                                swan.navigateBack()
                            } else {
                                swan.navigateBack()
                            }
                        }
                    })
                }
            })

        } else {
            api.sendPosts(options, '/study/loadnewpaper', function (res) {
                console.log(res);
                if (res.errcode == 0) {
                    var newlist = listHandle(res.list)
                    that.setData({
                        paperid: res.paperid,
                        timing: res.timing,
                        suff: res.suff,
                        list: newlist,
                        lastwastetime: res.wastetime,
                        oldlist: res.list,
                        kaoqi: res.kaoqi,
                        currTopicSum: newlist.length,
                        mainqueQuetypename: res.list[globalIndex].quetypename,

                    })

                    // ======
                    if (options.type == 5 || options.type == 11) {
                        that.setData({
                            showTime: true,
                            doTimer: '00:00:00',
                            manageTimer: UseTime()
                        })
                        that.data.manageTimer.sartTime();
                    }
                    // var that = this;
                    // 记时
                    function UseTime() {
                        console.log(that.data.timing, that.data.lastwastetime)
                        var TimeAll = parseInt(that.data.timing) - parseInt(that.data.lastwastetime),
                            TimeOne = 0,
                            timer;
                        console.log(TimeAll)
                        var sst = {
                            sartTime: function () {
                                timer = setInterval(function () {
                                    if (TimeAll == 0) {
                                        that.data.manageTimer.stopTime();
                                        timeOver();
                                        return false;
                                    }
                                    TimeOne++;
                                    TimeAll--;
                                    that.setData({
                                        doTimer: renderTime(TimeAll)
                                    })

                                }, 1000)
                            },
                            stopTime: function () {
                                that.setData({
                                    TimeOne: renderTime(TimeOne)
                                })
                                clearInterval(timer);
                            }
                        }
                        return sst;
                    }
                    function timeOver() {
                        swan.showToast({
                            title: '已超过答题时间',
                            icon: 'none',
                            mask: true,
                            success: function () {
                                // 保存当前题
                                if (that.data.list[that.data.globalIndex].struct == 1) {
                                    that.submitParameter(that.data.globalIndex);
                                } else {
                                    that.submitSubParameter(that.data.globalIndex, that.data.subIndex)
                                }
                                formalSubmint();
                                // 正式提交
                                function formalSubmint() {
                                    var rp = that.data.RequestParameters;
                                    var data = that.data;
                                    //  提交试卷参数对象
                                    var subInfo = {
                                        sessionid: rp.sessionid,
                                        uid: rp.uid,
                                        state: 1,
                                        accuracy: parseInt(data.rightnum) / parseInt((data.rightnum + data.wrongnum)),
                                        paperid: data.paperid,
                                        lastqid: data.index,
                                        type: rp.type,
                                        wastetime: data.totalwastetime
                                    };
                                    var testResult = {
                                        uid: that.data.RequestParameters.uid,
                                        sessionid: that.data.RequestParameters.sessionid,
                                        courseid: that.data.RequestParameters.courseid,
                                        unitid: that.data.RequestParameters.unitid,
                                        type: that.data.RequestParameters.type,
                                        paperid: that.data.paperid,
                                    }
                                    var testResult = JSON.stringify(testResult)
                                    that.showData('展示');
                                    api.sendPosts(subInfo, '/study/handinpaper', function (res) {
                                        console.log('提交刷题答案', res)
                                        if (res.errcode == 0) {
                                            console.log('提交答案成功')
                                            swan.navigateTo({
                                                url: '/pages/testResult/testResult?' + "testResult=" + testResult
                                            });
                                            console.log('提交答案成功')

                                        }
                                    })

                                }

                            }

                        });
                    }
                    function renderTime(TimeAll) {
                        var hour = parseInt(TimeAll / 3600);
                        var min = parseInt((TimeAll - hour * 3600) / 60);
                        var sec = TimeAll - hour * 3600 - min * 60;
                        var str = bL(hour) + ':' + bL(min) + ':' + bL(sec)
                        return str;

                    }
                    function bL(n) {
                        return n >= 10 ? n : n = '0' + n;
                    }

                    // =====
                    // 请求三次题
                    var listLen = that.data.list.length;
                    if (globalIndex > 0 && globalIndex < listLen - 1) {
                        that.getQuestion(globalIndex - 1)
                        that.getQuestion(globalIndex)
                        that.getQuestion(globalIndex + 1)
                    } else if (globalIndex == 0) {
                        that.getQuestion(globalIndex)
                        that.getQuestion(globalIndex + 1)
                    } else if (globalIndex == listLen - 1) {
                        that.getQuestion(globalIndex - 1)
                        that.getQuestion(globalIndex)
                    }
                    if (that.data.list[globalIndex].struct == 2) {

                        that.setData({
                            textareaVlue: that.data.list[globalIndex].useranswer
                        })

                    } else if (that.data.list[globalIndex].answer == "") {
                        that.setData({
                            textareaVlue: that.data.list[globalIndex].useranswer
                        })

                    }
                } else if (res.errcode == '10004') {
                    swan.showModal({
                        title: '升级题库',
                        content: '同学您的免费学习时间已用完，升级题库可继续答题',
                        confirmText: '升级题库',
                        cancelText: '放弃',
                        success: function (confirm, cancel) {
                            if (confirm.confirm) {
                                swan.navigateTo({
                                    url: '/pages/purchase/purchase?flagClass=4'
                                });
                            } else {
                                swan.navigateBack()
                            }
                        }
                    })
                } else {

                    var courseinfo = swan.getStorageSync("courseinfo");
                    var courseid = courseinfo.id;
                    console.log(courseid, that.data.topName);


                    try {
                        swan.removeStorageSync(that.data.topName + "unitid" + courseid);
                        swan.removeStorageSync(that.data.topName + "kpid" + courseid);
                        swan.removeStorageSync(that.data.topName + "paperid" + courseid);
                        console.log('removeStorageSync success');
                    } catch (err) {
                        console.log('removeStorageSync fail', err);
                    }
                    swan.showModal({
                        // title: '升级题库',
                        content: res.errmsg,
                        confirmText: '返回',
                        // cancelText: '放弃',
                        showCancel: false,
                        success: function (confirm, cancel) {
                            if (confirm.confirm) {
                                swan.navigateBack()
                            } else {
                                swan.navigateBack()
                            }
                        }
                    })
                }
            });
        }

        // 计时结束




    },
    onHide(e) {
        var that = this;
        console.log('保存的题号', that.data.storageExamName, that.data.globalIndex)
        swan.setStorageSync(that.data.storageExamName, that.data.globalIndex);


        if (that.data.list[that.data.globalIndex].struct == 1) {
            that.submitParameter(that.data.globalIndex);
        } else {
            that.submitSubParameter(that.data.globalIndex, that.data.subIndex)
        }
        formalSubmint()
        function formalSubmint() {
            var rp = that.data.RequestParameters;
            var data = that.data;
            //  提交试卷参数对象
            var subInfo = {
                sessionid: rp.sessionid,
                uid: rp.uid,
                state: 2,
                accuracy: parseInt(data.rightnum) / parseInt((data.rightnum + data.wrongnum)),
                paperid: data.paperid,
                lastqid: data.index,
                type: rp.type,
                wastetime: data.totalwastetime
            };
            api.sendPosts(subInfo, '/study/handinpaper', function (res) {
                console.log('提交刷题答案', res)
                if (res.errcode == 0) {
                    console.log('提交答案成功')

                }
            })

        }

    },
    // 请求题目的函数
    // indexQuestion 为需要请求的题目索引
    getQuestion: function (indexQuestion, cb) {
        cb || (cb = function () { });
        var that = this;
        // 判断第一题为组合题
        if (that.data.list[indexQuestion].struct == 2) {
            var strList = "list[" + indexQuestion + "].qids"
            var qids = that.getStructQid(that.data.list[indexQuestion].qid);
            that.setData({
                struct: that.data.list[indexQuestion].struct,
                [strList]: qids
            })
            //判断是否存在下一题
            if (!that.data.mainque[indexQuestion] && indexQuestion < that.data.list.length) {
                that.data.RequestParameters.qid = that.data.list[indexQuestion].qids[0];
                console.log('组合题请求')
                api.sendPosts(that.data.RequestParameters, '/question/loadQuestion', function (res) {
                    if (res.errcode == 0) {
                        console.log(res, '组合题')
                        var topicXml = that.getXML(res.mainque[0].content);
                        var subTopic = 'mainque[' + indexQuestion + '].subTopic';
                        that.setData({
                            [subTopic]: []
                        })
                        var strContent = 'mainque[' + indexQuestion + '].content',
                            strQuetypename = 'mainque[' + indexQuestion + '].quetypename',
                            strCollectstate = 'mainque[' + indexQuestion + '].subTopic[0].collectstate',
                            strQid = 'mainque[' + indexQuestion + '].qid',
                            strOptionList = 'mainque[' + indexQuestion + '].optionlist',
                            strOptionId = 'mainque[' + indexQuestion + '].OptionId',
                            strEnginemode = 'mainque[' + indexQuestion + '].enginemode',
                            strEnginemode = 'mainque[' + indexQuestion + '].subTopic[0].enginemode',
                            strSubTitle = 'mainque[' + indexQuestion + '].subTopic[0].title',
                            strSubQuetypename = 'mainque[' + indexQuestion + '].subTopic[0].quetypename',
                            strSubOptions = 'mainque[' + indexQuestion + '].subTopic[0].options';
                        strSubQid = 'mainque[' + indexQuestion + '].subTopic[0].qid',

                            that.parseHtml(strContent, topicXml.Stem);
                        that.parseHtml(strSubTitle, topicXml.Title);
                        topicXml.Option && that.parseHtmlOption(strSubOptions, topicXml.Option)
                        that.setData({
                            [strOptionList]: topicXml.OptionList,
                            [strOptionId]: topicXml.OptionId,
                            [strQuetypename]: res.mainque[0].quetypename,
                            [strCollectstate]: res.mainque[0].collectstate,
                            [strQid]: res.mainque[0].qid,
                            [strSubQid]: res.mainque[0].qid,
                            [strEnginemode]: res.mainque[0].enginemode,
                            [strSubQuetypename]: res.mainque[0].quetypename,
                        })
                        // that.changeDataStatus(indexQuestion);
                        // that.changeSubTopic(indexQuestion, indexQuestion);
                        that.useranswerTomy(indexQuestion)
                        //获取子题 
                        if (that.data.list[indexQuestion].qids.length >= 2) {
                            that.getSubTopic(indexQuestion, 1);
                        }
                        cb.call(that);
                        that.useranswerTomy(indexQuestion)
                    }
                });
            } else {
                cb.call(that);
            }
        } else {
            if (!that.data.mainque[indexQuestion] && indexQuestion < that.data.list.length) {
                that.data.RequestParameters.qid = that.data.list[indexQuestion].qid;
                api.sendPosts(that.data.RequestParameters, '/question/loadQuestion', function (res) {
                    if (res.errcode == 0) {
                        if (res.mainque[0].enginemode == 1 || res.mainque[0].enginemode == 2 || res.mainque[0].enginemode == 3) {
                            var topicXml = that.getXML(res.mainque[0].content);
                            topicXml.Option && (topicXml.Option = topicXml.Option.split('|b#k*w|'));
                            var strcontent = 'mainque[' + indexQuestion + '].content',
                                stroption = 'mainque[' + indexQuestion + '].option',
                                strquetypename = 'mainque[' + indexQuestion + '].quetypename',
                                strcollectstate = 'mainque[' + indexQuestion + '].collectstate',
                                strqid = 'mainque[' + indexQuestion + '].qid',
                                strOptionList = 'mainque[' + indexQuestion + '].optionlist',
                                strOptionId = 'mainque[' + indexQuestion + '].OptionId',
                                strenginemode = 'mainque[' + indexQuestion + '].enginemode';
                            that.parseHtml(strcontent, topicXml.Title);
                            topicXml.Option && that.parseHtmlOption(stroption, topicXml.Option)
                            that.setData({
                                [strOptionList]: topicXml.OptionList,
                                [strOptionId]: topicXml.OptionId,
                                [strquetypename]: res.mainque[0].quetypename,
                                [strcollectstate]: res.mainque[0].collectstate,
                                [strqid]: res.mainque[0].qid,
                                [strenginemode]: res.mainque[0].enginemode,
                            })
                            that.showData('请求函数得到的');
                            that.useranswerTomy(indexQuestion)
                            cb.call(that);
                        } else {
                            console.log('单题', res)
                            var topicXml = that.getXML(res.mainque[0].content);
                            console.log('解析好的的题', topicXml)
                            var strcontent = 'mainque[' + indexQuestion + '].content',
                                strtitle = 'mainque[' + indexQuestion + '].title',
                                stroption = 'mainque[' + indexQuestion + '].option',
                                strquetypename = 'mainque[' + indexQuestion + '].quetypename',
                                strcollectstate = 'mainque[' + indexQuestion + '].collectstate',
                                strqid = 'mainque[' + indexQuestion + '].qid',
                                strOptionList = 'mainque[' + indexQuestion + '].optionlist',
                                strOptionId = 'mainque[' + indexQuestion + '].OptionId',
                                strenginemode = 'mainque[' + indexQuestion + '].enginemode';
                            that.parseHtml(strcontent, topicXml.Stem);
                            that.parseHtml(strtitle, topicXml.Title);
                            that.setData({
                                [strOptionList]: topicXml.OptionList,
                                [strOptionId]: topicXml.OptionId,
                                [strquetypename]: res.mainque[0].quetypename,
                                [strcollectstate]: res.mainque[0].collectstate,
                                [strqid]: res.mainque[0].qid,
                                [strenginemode]: res.mainque[0].enginemode,
                            })
                            that.showData('请求函数得到的');
                            that.useranswerTomy(indexQuestion)
                            cb.call(that);
                        }
                    }
                });

            } else {
                // that.changeDataStatus(indexQuestion)
                // that.showData('请求函数得到的');
                cb.call(that);
                that.useranswerTomy(indexQuestion)

            }
        }
    },
    // 处理html
    parseHtml(positionSave, parseValue) {
        console.log('处理html', positionSave, parseValue)
        parseValue = parseValue.replace(/<o:p>/img, "");
        parseValue = parseValue.replace(/<\/o:p>/img, "");
        parseValue = parseValue.replace(/<span.*?>/img, "");
        WxParse.wxParse(positionSave, 'html', parseValue, this, 10)
    },
    // 处理选多个html
    parseHtmlOption(positionSave, parseValue) {
        console.log('处理多个html', parseValue)
        // parseValue = parseValue.replace(/<o:p>/img, "");
        var len = parseValue.length;
        var i = 0;
        for (i = 0; i < len; i++) {
            parseValue[i] = parseValue[i].replace(/<o:p>/img, "");
            parseValue[i] = parseValue[i].replace(/<\/o:p>/img, "");
            parseValue[i] = parseValue[i].replace(/<span.*?>/img, "");
            var postionSaveNew = positionSave + '[' + i + ']';
            WxParse.wxParse(postionSaveNew, 'html', parseValue[i], this, 10)
        }
    },
    //改变上下状态
    changeDataStatus: function (index) {
        console.log('当前题', index)
        this.setData({
            mainqueQuetypename: this.data.list[index].quetypename,
            mainqueCollectstate: this.data.mainque[index].collectstate
        })
    },
    // 改变子题状态
    changeSubTopic: function (index, subIndex) {
        this.setData({
            SubmainqueQuetypename: this.data.mainque[index].subTopic[subIndex].quetypename,
            SubTopicSum: this.data.list[index].qids.length,
            mainqueCollectstate: this.data.mainque[index].subTopic[subIndex].collectstate
        })
    },
    // 解析xml 参数xml
    getXML: function (str) {
        var XMLParser = new paser.DOMParser()
        var doc = XMLParser.parseFromString(str);
        var topic = {};
        topic.UnitId = doc.getElementsByTagName('UnitId')[0].firstChild && doc.getElementsByTagName('UnitId')[0].firstChild.data;
        topic.QId = doc.getElementsByTagName('QId')[0].firstChild && doc.getElementsByTagName('QId')[0].firstChild.data;
        topic.Type = doc.getElementsByTagName('Type')[0].firstChild && doc.getElementsByTagName('Type')[0].firstChild.data;
        topic.Stem = doc.getElementsByTagName('Stem')[0].firstChild && doc.getElementsByTagName('Stem')[0].firstChild.data;
        topic.Title = doc.getElementsByTagName('Title')[0].firstChild && doc.getElementsByTagName('Title')[0].firstChild.data;
        topic.OptionList = doc.getElementsByTagName('OptionList')[0].firstChild && doc.getElementsByTagName('OptionList')[0].firstChild.data;
        topic.Extent = doc.getElementsByTagName('Extent')[0].firstChild && doc.getElementsByTagName('Extent')[0].firstChild.data;
        topic.PageCode = doc.getElementsByTagName('PageCode')[0].firstChild && doc.getElementsByTagName('PageCode')[0].firstChild.data;
        topic.Explanation = doc.getElementsByTagName('Explanation')[0].firstChild && doc.getElementsByTagName('Explanation')[0].data;
        topic.Option = doc.getElementsByTagName('Option')[0].firstChild && doc.getElementsByTagName('Option')[0].firstChild.data;
        topic.OptionId = doc.getElementsByTagName('Option')[0].getAttribute("ID");
        return topic;
    },
    // 获取组合题的qid
    getStructQid: function (qid) {
        var qidList = this.data.oldlist;
        var qids = [qid];
        for (var i = 1; i < qidList.length; i++) {
            if (qid == qidList[i].parentqid) {
                qids.push(qidList[i].qid)
            }
        }
        if (qids.length == 0) {
            qids.push(qid)
        }
        console.log('保存的qids数组', qids)
        return qids;
    },
    // 展示数据
    showData: function (info) {
        console.log(info, this.data)
    },
    onReady: function () {
        this.toastDialog = this.selectComponent("#collection-toast");
        this.setData({
            top: this.data.windowHeight * this.data.proportion - 208,
            topHeight: this.data.windowHeight * this.data.proportion / 2 + 23,
            bottomHeight: this.data.windowHeight * this.data.proportion / 2 - 23 - 72 - 100
        })

    },
    // 清空全局的
    clearStyle() {
        this.setData({
            subIndex: 0,
            subCurr: 0,
            top: this.data.windowHeight * this.data.proportion - 208,
            textareaVlue: ''
        })

    },
    // 主干滑动
    slideHandle(e) {
        console.log('执行主干滑动===================================')
        var that = this;
        this.setData();
        var oldglobalIndex = this.data.globalIndex;
        var curr = parseInt(e.detail.current);
        //处理当前题
        if (that.data.list[curr].struct == 2) {
            if (this.data.userAnswer[curr]) {
                console.log('333333333333333333333333333333333333333333333')
                console.log(curr, this.data.userAnswer[curr].subAnswer[this.data.subIndex])
                this.setData({
                    textareaVlue: this.data.userAnswer[curr].subAnswer[this.data.subIndex]
                })
            }
        } else if (that.data.mainque[curr].enginemode != 1 && that.data.mainque[curr].enginemode != 2 && that.data.mainque[curr].enginemode != 3) {
            this.setData({
                textareaVlue: this.data.userAnswer[curr]
            })

        }
        if (e.detail.source != "touch") {
            console.log('退出')
            return false;
        };
        if (curr > oldglobalIndex) {
            console.log('向右')
            if (curr + 1 <= this.data.list.length - 1) {
                that.getQuestion(curr + 1)
            }
        } else {
            if (curr - 1 >= 0) {
                that.getQuestion(curr - 1)
            }
        }
        this.setData({
            globalIndex: curr
        })
        var listLen = that.data.list.length;
        // 处理上一题
        if (that.data.list[oldglobalIndex].struct == 1) {
            that.submitParameter(oldglobalIndex);
        } else {
            // if (that.data.list[oldglobalIndex].struct == 2) {
            //     if (!this.data.userAnswer[oldglobalIndex]) {
            //         var struserAnswer = 'userAnswer[' + oldglobalIndex + '].subAnswer'
            //         that.setData({
            //             [struserAnswer]: ['处理下一题']
            //         })

            //     }
            // }
            that.submitSubParameter(oldglobalIndex, that.data.subIndex)
        }
        // this.clearStyle();
        var globalIndex = this.data.globalIndex;
        // 展示答题已答
        //处理当前题
        // if (that.data.list[curr].struct == 2) {
        //     if (this.data.userAnswer[curr]) {
        //         this.setData({
        //             textareaVlue: this.data.userAnswer[curr].subAnswer[this.data.subIndex]
        //         })
        //     }
        // } else if (that.data.mainque[curr].enginemode != 1 && that.data.mainque[curr].enginemode != 2 && that.data.mainque[curr].enginemode != 3) {
        //     this.setData({
        //         textareaVlue: this.data.userAnswer[curr]
        //     })

        // }
        // if (that.data.list[globalIndex].struct == 2) {
        //     if (!this.data.userAnswer[globalIndex]) {
        //         var struserAnswer = 'userAnswer[' + globalIndex + '].subAnswer'
        //         that.setData({
        //             [struserAnswer]: ['主干滑动']
        //         })
        //     }
        // }
        this.showData('滑动展示的数据')
    },
    // 子页面滑动
    slideSubHandle(e) {
        // if (!this.data.userAnswer[this.data.globalIndex]) {
        //     var struserAnswer = 'userAnswer[' + this.data.globalIndex + '].subAnswer'
        //     this.setData({
        //         [struserAnswer]: ['子页面滑动']
        //     })
        // }
        this.submitSubParameter(this.data.globalIndex, this.data.subIndex)
        var curr = parseInt(e.detail.current);
        this.setData({
            textareaVlue: '',
            subIndex: curr
        })
        if (curr < this.data.list[this.data.globalIndex].qids.length - 1) {
            this.getSubTopic(this.data.globalIndex, curr + 1)
        }

        if (e.detail.source != "touch") {
            return false;
        }
        //赋值给文本框
        if (this.data.userAnswer[this.data.globalIndex]) {
            this.setData({
                textareaVlue: this.data.userAnswer[this.data.globalIndex].subAnswer[this.data.subIndex]
            })
        }
    },
    // 封装请求子题  第二次请求
    getSubTopic: function (globalIndex, subIndex, cb) {
        cb || (cb = function () { });
        var that = this;
        this.data.RequestParameters.qid = this.data.list[globalIndex].qids[subIndex];
        api.sendPosts(this.data.RequestParameters, '/question/loadQuestion', function (res) {
            var topicXml = that.getXML(res.mainque[0].content);
            console.log('xml节点返回', topicXml)
            console.log('子题请求回来的数据', res)
            var strContent = 'mainque[' + globalIndex + '].content',
                strQuetypename = 'mainque[' + globalIndex + '].quetypename',
                strCollectstate = 'mainque[' + globalIndex + '].subTopic[' + subIndex + '].collectstate',
                strSubQid = 'mainque[' + globalIndex + '].subTopic[' + subIndex + '].qid',
                strEnginemode = 'mainque[' + globalIndex + '].subTopic[' + subIndex + '].enginemode',
                strSubTitle = 'mainque[' + globalIndex + '].subTopic[' + subIndex + '].title',
                strSubQuetypename = 'mainque[' + globalIndex + '].subTopic[' + subIndex + '].quetypename',
                strOptionList = 'mainque[' + globalIndex + '].optionlist',
                strOptionId = 'mainque[' + globalIndex + '].OptionId',
                strSubOptions = 'mainque[' + globalIndex + '].subTopic[' + subIndex + '].options';
            that.parseHtml(strContent, topicXml.Stem);
            that.parseHtml(strSubTitle, topicXml.Title)
            topicXml.Option && that.parseHtmlOption(strSubOptions, topicXml.Option)
            that.setData({
                // [strContent]: topicXml.Stem,
                // [strSubTitle]: topicXml.Title,
                // [strSubOptions]: topicXml.Option,
                [strOptionList]: topicXml.OptionList,
                [strOptionId]: topicXml.OptionId,
                [strQuetypename]: res.mainque[0].quetypename,
                [strCollectstate]: res.mainque[0].collectstate,
                [strSubQid]: res.mainque[0].qid,
                [strEnginemode]: res.mainque[0].enginemode,
                [strSubQuetypename]: res.mainque[0].quetypename,
            })
            that.showData('子题放回');
            console.log('执行渲染数据')
            cb.call(that, that.data.globalIndex)
        });
    },
    // 处理选项
    optionhandle(e) {
        var topicInfo = e.currentTarget.dataset.topicInfo;
        var optionCase = parseInt(topicInfo);
        var index = this.data.globalIndex;
        console.log(index)

        var struserAnswer = 'userAnswer[' + index + ']'
        var answer = this.data.userAnswer[index] ? this.data.userAnswer[index] : []
        if (this.data.mainque[index].enginemode == '2') {
            if (answer[optionCase]) {
                answer[optionCase] = 0
            } else {
                answer[optionCase] = this.data.optionCase[optionCase]
            }
            this.setData({
                [struserAnswer]: answer
            })
        } else if (this.data.mainque[index].enginemode === '1' || this.data.mainque[index].enginemode == '3') {
            answer = answer == this.data.optionCase[optionCase] ? 0 : this.data.optionCase[optionCase];
            this.setData({
                [struserAnswer]: answer
            })
            if (index + 1 <= this.data.list.length - 1) {
                if (this.data.list[index].struct == 1) {
                    this.submitParameter(index);
                } else {
                    if (this.data.list[index].struct == 2) {
                        if (!this.data.userAnswer[index]) {
                            var struserAnswer = 'userAnswer[' + index + '].subAnswer'
                            this.setData({
                                [struserAnswer]: ['处理选项']
                            })

                        }
                    }

                    this.submitSubParameter(index, this.data.subIndex)
                }

                // index++;
                (index + 2 <= this.data.list.length - 1) && this.getQuestion(index + 2)
                this.setData({
                    globalIndex: index + 1,
                    curr: index + 1
                })
            }
        }
        // this.setData({
        //     [struserAnswer]: answer
        // })
    },
    optionSubhandle(e) {
        var topicInfo = e.currentTarget.dataset.topicInfo;
        var optionCase = parseInt(topicInfo);
        var index = this.data.globalIndex;
        var subIndex = this.data.subIndex;
        var struserAnswer = 'userAnswer[' + index + '].subAnswer[' + subIndex + ']'
        var answer = this.data.userAnswer[index].subAnswer[subIndex] ? this.data.userAnswer[index].subAnswer[subIndex] : []
        if (this.data.mainque[index].subTopic[subIndex].quetypename === '多选题') {
            if (answer[optionCase]) {
                answer[optionCase] = 0
            } else {
                answer[optionCase] = this.data.optionCase[optionCase]
            }
        } else if (this.data.list[index].quetypename === '单选题' || this.data.list[index].quetypename === '判断题') {
            answer = answer == this.data.optionCase[optionCase] ? 0 : this.data.optionCase[optionCase]
        }
        this.setData({
            [struserAnswer]: answer
        });

    },
    //获取文本框答案
    anwertext(e) {
        var index = this.data.globalIndex;
        var subIndex = this.data.subIndex;
        if (this.data.list[index].struct == 2) {
            var struserAnswer = 'userAnswer[' + index + '].subAnswer[' + subIndex + ']'
            this.setData({
                textareaVlue: e.detail,
                [struserAnswer]: e.detail
            })
        } else {
            var struserAnswer = 'userAnswer[' + index + ']'
            this.setData({
                textareaVlue: e.detail,
                [struserAnswer]: e.detail
            })
        }

    }
    ,
    getTextValue(e) {
        this.setData({
            "isanwertext": false
        })
        this.setData({
            "isanwertext": true
        })


    },
    // 答题卡
    answerCaseHandle(e) {
        var that = this;
        // 答题卡事件
        var index = parseInt(e.currentTarget.dataset.topicIndex)
        this.setData({
            globalIndex: index,
            answerMask: !this.data.answerMask,
            curr: index
        })
        that.clearStyle();
        // if (that.data.list[that.data.globalIndex].struct == 2) {
        //     var struserAnswer = 'userAnswer[' + that.data.globalIndex + '].subAnswer[0]'
        //     that.setData({
        //         [struserAnswer]: '答题卡暂未'
        //     })
        // }
        // 请求三次题
        var listLen = that.data.list.length;
        // console.log(globalIndex)
        var globalIndex = that.data.globalIndex;
        console.log('=============', globalIndex, listLen)

        if (globalIndex > 0 && globalIndex < listLen - 1) {
            console.log('正常')
            that.getQuestion(globalIndex - 1)
            that.getQuestion(globalIndex)
            that.getQuestion(globalIndex + 1)
        } else if (globalIndex == 0) {
            that.getQuestion(globalIndex)
            that.getQuestion(globalIndex + 1)
        } else if (globalIndex == listLen - 1) {
            that.getQuestion(globalIndex - 1)
            that.getQuestion(globalIndex)
        }
    },
    answerCardBtnHandle(e) {
        //  click answer btn
        this.setData({
            answerMask: !this.data.answerMask
        })
    },
    // 点击提交并查看结果
    submitHandle() {
        //submit click
        if (this.data.answerWrap || this.data.list.length < 10) {
            var that = this;
            // 保存当前题
            if (that.data.list[that.data.globalIndex].struct == 1) {
                that.submitParameter(that.data.globalIndex);
            } else {
                that.submitSubParameter(that.data.globalIndex, that.data.subIndex)
            }
            // 判断是否做完了
            var isDone = true;
            var list = this.data.list;
            for (var i = 0; i < list.length; i++) {
                if (list[i].isright != 0) {
                    continue;
                } else {
                    isDone = false;
                    break;
                }
            }

            if (!isDone) {
                unFinished();
            } else {
                // 做完了提交
                formalSubmint();
            }
            //检测到有未做完
            function unFinished() {
                swan.showModal({
                    title: '确认提交',
                    content: '检测到您有未答的题目，确认提交？',
                    confirmText: '确定',
                    cancelText: '取消',
                    success: function (confirm, cancel) {
                        if (confirm.confirm) {
                            console.log('点击了确定')
                            formalSubmint()
                        } else {
                            console.log('点击了取消')
                        }
                    }
                })
            }
            // 正式提交
            function formalSubmint() {
                var rp = that.data.RequestParameters;
                var data = that.data;
                //  提交试卷参数对象
                var subInfo = {
                    sessionid: rp.sessionid,
                    uid: rp.uid,
                    state: 1,
                    accuracy: parseInt(data.rightnum) / parseInt((data.rightnum + data.wrongnum)),
                    paperid: data.paperid,
                    lastqid: data.index,
                    type: rp.type,
                    wastetime: data.totalwastetime
                };
                var testResult = {
                    uid: that.data.RequestParameters.uid,
                    sessionid: that.data.RequestParameters.sessionid,
                    courseid: that.data.RequestParameters.courseid,
                    unitid: that.data.RequestParameters.unitid,
                    type: that.data.RequestParameters.type,
                    paperid: that.data.paperid,
                    doExamName: that.data.RequestParameters.doExamName
                }
                var testResult = JSON.stringify(testResult)
                that.showData('展示');
                api.sendPosts(subInfo, '/study/handinpaper', function (res) {
                    console.log('提交刷题答案', res)
                    if (res.errcode == 0) {
                        console.log('提交答案成功')
                        swan.redirectTo({
                            url: '/pages/testResult/testResult?' + "testResult=" + testResult
                        });
                        console.log('提交答案成功')

                    }
                })

            }
        }
        if (this.data.list.length > 10) {
            if (!this.data.answerWrap) {
                this.setData({
                    answerWrap: !this.data.answerWrap
                })
            }
        }
    },
    answerMaskHandle() {
        this.setData({
            answerMask: !this.data.answerMask
        })
    },
    closeBtnHandle() {
        this.setData({
            answerMask: !this.data.answerMask
        })
    },
    tvar: {
        touchDotX: 0,
        touchDotY: 0,
        time: 0,
    },
    touchStart: function (e) {
        var that = this;
        this.tvar.touchDotX = e.touches[0].pageX; // 获取触摸时的原点
        this.tvar.touchDotY = e.touches[0].pageY;
        // 使用js计时器记录时间    
        this.tvar.interval = setInterval(function () {
            that.time++;
        }, 100);
    },
    touchEnd: function (e) {
        let touchMoveX = e.changedTouches[0].pageX;
        let touchMoveY = e.changedTouches[0].pageY;
        let tmX = touchMoveX - this.tvar.touchDotX;
        let tmY = touchMoveY - this.tvar.touchDotY;
        if (this.tvar.time < 20) {
            let absX = Math.abs(tmX);
            let absY = Math.abs(tmY);
            if (absX > 2 * absY) {
                if (tmX < 0) {
                    console.log("左滑=====")
                } else {
                    console.log("右滑=====")
                }
            }
            if (absY > absX * 2 && tmY < 0) {
                if (!this.data.answerWrap) {
                    this.setData({
                        answerWrap: !this.data.answerWrap
                    })
                }
            } else if (absY > absX * 2 && tmY > 0) {
                if (this.data.answerWrap) {
                    this.setData({
                        answerWrap: !this.data.answerWrap
                    })
                } else {
                    this.setData({
                        answerMask: !this.data.answerMask
                    })
                }
            }
        }
        clearInterval(this.tvar.interval); // 清除setInterval
        this.tvar.time = 0;
    },
    // 收藏事件
    collectionHandle() {
        var that = this;
        // 保存一些基本数据
        var list = this.data.list,
            index = this.data.globalIndex,
            mainque = this.data.mainque,
            subIndex = this.data.subIndex,
            str;
        RequestParameters = this.data.RequestParameters
        // 判断是否为组合题
        if (list[index].struct == 2) {
            RequestParameters.qid = list[index].qids[subIndex];
            RequestParameters.state = (mainque[index].subTopic[subIndex].collectstate == 0 ? 1 : 0);
            str = 'mainque[' + index + '].subTopic[' + subIndex + '].collectstate';
        } else {
            RequestParameters.qid = list[index].qid;
            RequestParameters.state = (mainque[index].collectstate) == 0 ? 1 : 0;
            str = 'mainque[' + index + '].collectstate';
        }

        api.sendPosts(that.data.RequestParameters, '/study/collectQuestion', function (res) {
            if (res.errcode == 0) {
                that.setData({
                    [str]: RequestParameters.state
                })
                var toastStr = (RequestParameters.state == 0 ? '取消收藏成功' : '收藏成功')
                if (list[index].struct != 2) {
                    that.changeDataStatus(index)
                } else {
                    that.changeSubTopic(index, subIndex);
                }
                that.toastDialog.showDialog(toastStr);
            } else {
                that.toastDialog.showDialog('请重试');
            }
        });
    },

    // 处理提交参数
    submitParameter(index) {
        var submitInfo = {};
        // 单题答题时间
        submitInfo.wastetime = this.data.totalwastetime - this.data.prevTime;
        this.setData({
            prevTime: this.data.totalwastetime
        });
        //  用户答案
        var userAnswer = this.data.userAnswer[index];
        console.log(this.data.userAnswer[index])
        if (this.data.mainque[index].enginemode == "1" || this.data.mainque[index].enginemode == "3") {
            submitInfo.useranswer = this.data.mainque[index].OptionId.split('|')[this.data.optionCase.indexOf(userAnswer)];
            if (submitInfo.useranswer == this.data.list[index].answer) {
                this.data.rightnum++;
                this.setData({
                    rightnum: this.data.rightnum
                })
            } else {
                this.data.wrongnum++;
                this.setData({
                    wrongnum: this.data.wrongnum
                })
            }
        } else if (this.data.mainque[index].enginemode == "2") {
            submitInfo.useranswer = '';
            userAnswer || (userAnswer = [])
            for (var i = 0; i < userAnswer.length; i++) {
                if (userAnswer[i]) {
                    submitInfo.useranswer += this.data.mainque[index].OptionId.split('|')[i] + '|';
                }
            }
            submitInfo.useranswer = submitInfo.useranswer.slice(0, -1);
            if (submitInfo.useranswer == this.data.list[index].answer.replace(/,/g, '|')) {
                this.data.rightnum++;
                this.setData({
                    rightnum: this.data.rightnum
                })
            } else {
                this.data.wrongnum++;
                this.setData({
                    wrongnum: this.data.wrongnum
                })
            }

        } else {
            submitInfo.useranswer = this.data.userAnswer[index]
            console.log(submitInfo.useranswer)
        }
        this.data.submitInfo[index] = submitInfo;
        // 处理多选题选项
        var transformAnswer = '';
        if (typeof (this.data.userAnswer[index]) == "string") {
            transformAnswer = this.data.userAnswer[index]
        } else {
            this.data.userAnswer[index] || (this.data.userAnswer[index] = [])
            transformAnswer = this.data.userAnswer[index].join("")
        }
        this.data.list[index].useranswer = this.data.submitInfo[index].useranswer;
        var listIsright = 'list[' + index + '].isright'
        if (this.data.list[index].useranswer != "" && this.data.list[index].useranswer != undefined) {
            this.setData({
                [listIsright]: 5
            })
        } else {
            this.setData({
                [listIsright]: 0
            })
        }
        var parameter = {
            wastetime: this.data.submitInfo[index].wastetime,
            useranswer: this.data.submitInfo[index].useranswer || "",
            rightnum: this.data.rightnum,
            wrongnum: this.data.wrongnum,
            totalwastetime: this.data.totalwastetime,
            type: this.data.RequestParameters.type,
            suffll: this.data.suff,
            letter: transformAnswer,
            unitid: this.data.RequestParameters.unitid,
            lastqid: this.data.globalIndex,
            courseid: this.data.RequestParameters.courseid,
            qid: this.data.list[index].qid,
            sessionid: this.data.RequestParameters.sessionid,
            uid: this.data.RequestParameters.uid,
            paperid: this.data.paperid
        }
        if (parameter.useranswer != "") {
            api.sendPosts(parameter, '/study/saveanswerinfo', function (res) {
                console.log('保存刷题答案', res)
            })
        }

    },
    // 处理子题提交参数
    submitSubParameter(index, subIndex) {
        var submitInfo = {};
        // 单题答题时间
        submitInfo.wastetime = this.data.totalwastetime - this.data.prevTime;
        this.setData({
            prevTime: this.data.totalwastetime
        });
        this.showData('处理子题答案')
        //  用户答案
        console.log('======================', index, subIndex)
        var userAnswer = this.data.userAnswer[index].subAnswer[subIndex];
        if (this.data.mainque[index].enginemode == "1" || this.data.mainque[index].enginemode == "3") {
            submitInfo.useranswer = this.data.mainque[index].OptionId.split('|')[this.data.optionCase.indexOf(userAnswer)];
            if (submitInfo.useranswer == this.data.mainque[index].subTopic[subIndex].optionlist) {
                this.data.rightnum++;
                this.setData({
                    rightnum: this.data.rightnum
                })
            } else {
                this.data.wrongnum++;
                this.setData({
                    wrongnum: this.data.wrongnum
                })
            }
        } else if (this.data.mainque[index].enginemode == "2") {
            submitInfo.useranswer = '';
            userAnswer || (userAnswer = [])
            for (var i = 0; i < userAnswer.length; i++) {
                if (userAnswer[i]) {
                    submitInfo.useranswer += this.data.mainque[index].OptionId.split('|')[i] + '|';
                }
            }
            submitInfo.useranswer = submitInfo.useranswer.slice(0, -1);
            if (submitInfo.useranswer == this.mainque[index].subTopic[subIndex].optionlist.replace(/,/g, '|')) {
                this.data.rightnum++;
                this.setData({
                    rightnum: this.data.rightnum
                })
            } else {
                this.data.wrongnum++;
                this.setData({
                    wrongnum: this.data.wrongnum
                })
            }

        } else {
            submitInfo.useranswer = userAnswer;
        }
        // this.data.submitInfo[index].subAnswer = [];
        // submitInfo = submitInfo;
        // 处理多选题选项
        var transformAnswer = '';
        if (this.data.mainque[index].enginemode == "1" || this.data.mainque[index].enginemode == "2" || this.data.mainque[index].enginemode == "3") {
            transformAnswer = submitInfo.useranswer
        } else {
            // console.log(1050, this.data.userAnswer[index])
            if (typeof (this.data.userAnswer[index]) == "string") {
                transformAnswer = this.data.userAnswer[index].subAnswer[subIndex]
            } else {
                this.data.userAnswer[index] || (this.data.userAnswer[index] = [])
                transformAnswer = this.data.userAnswer[index].subAnswer[subIndex]
            }
        }
        // this.data.list[index].useranswer = this.data.submitInfo[index].useranswer;
        if (this.data.mainque[index].enginemode == "1" || this.data.mainque[index].enginemode == "2" || this.data.mainque[index].enginemode == "3") {
            var parameter = {
                wastetime: submitInfo.wastetime,
                useranswer: submitInfo.useranswer || "",
                rightnum: this.data.rightnum,
                wrongnum: this.data.wrongnum,
                totalwastetime: this.data.totalwastetime,
                type: this.data.RequestParameters.type,
                suffll: this.data.suff,
                letter: transformAnswer,
                unitid: this.data.RequestParameters.unitid,
                lastqid: this.data.index,
                courseid: this.data.RequestParameters.courseid,
                qid: this.data.list[index].qids[subIndex],
                sessionid: this.data.RequestParameters.sessionid,
                uid: this.data.RequestParameters.uid,
                paperid: this.data.paperid
            }
        } else {

            var parameter = {
                wastetime: submitInfo.wastetime,
                useranswer: submitInfo.useranswer || "",
                rightnum: this.data.rightnum,
                wrongnum: this.data.wrongnum,
                totalwastetime: this.data.totalwastetime,
                type: this.data.RequestParameters.type,
                suffll: this.data.suff,
                isright: 3,
                accuracy: 0,
                kaoqi: this.data.kaoqi,
                // letter: transformAnswer,
                unitid: this.data.RequestParameters.unitid,
                lastqid: this.data.globalIndex,
                courseid: this.data.RequestParameters.courseid,
                qid: this.data.list[index].qids[subIndex],
                sessionid: this.data.RequestParameters.sessionid,
                uid: this.data.RequestParameters.uid,
                paperid: this.data.paperid
            }
        }
        if (parameter.useranswer != "") {
            api.sendPosts(parameter, '/study/saveanswerinfo', function (res) {
                console.log('保存刷题答案', res)
            })
        }
    },
    // 提交按钮
    submitBtnHandle(e) {
        var that = this;
        // 保存当前题
        if (that.data.list[that.data.globalIndex].struct == 1) {
            that.submitParameter(that.data.globalIndex);
        } else {
            that.submitSubParameter(that.data.globalIndex, that.data.subIndex)
        }
        // 判断是否做完了
        var isDone = true;
        var userAnswer = this.data.userAnswer;
        var list = this.data.list;
        for (var i = 0; i < list.length; i++) {
            if (list[i].isright != 0) {
                continue;
            } else {
                isDone = false;
                break;
            }
        }

        if (!isDone) {
            unFinished();
        } else {
            // 做完了提交
            formalSubmint();
        }
        //检测到有未做完
        function unFinished() {
            swan.showModal({
                title: '确认提交',
                content: '检测到您有未答的题目，确认提交？',
                confirmText: '确定',
                cancelText: '取消',
                success: function (confirm, cancel) {
                    if (confirm.confirm) {
                        console.log('点击了确定')
                        formalSubmint()
                    } else {
                        console.log('点击了取消')
                    }
                }
            })
        }
        // 正式提交
        function formalSubmint() {
            var rp = that.data.RequestParameters;
            var data = that.data;
            //  提交试卷参数对象
            var subInfo = {
                sessionid: rp.sessionid,
                uid: rp.uid,
                state: 1,
                accuracy: parseInt(data.rightnum) / parseInt((data.rightnum + data.wrongnum)),
                paperid: data.paperid,
                lastqid: data.index,
                type: rp.type,
                wastetime: data.totalwastetime
            };
            var testResult = {
                uid: that.data.RequestParameters.uid,
                sessionid: that.data.RequestParameters.sessionid,
                courseid: that.data.RequestParameters.courseid,
                unitid: that.data.RequestParameters.unitid,
                type: that.data.RequestParameters.type,
                kpid: that.data.RequestParameters.kpid,
                paperid: that.data.paperid,

                doExamName: that.data.RequestParameters.doExamName
            }
            var testResult = JSON.stringify(testResult)
            that.showData('展示');
            api.sendPosts(subInfo, '/study/handinpaper', function (res) {
                console.log('提交刷题答案', res)
                if (res.errcode == 0) {
                    console.log('提交答案成功')
                    swan.redirectTo({
                        url: '/pages/testResult/testResult?' + "testResult=" + testResult
                    });
                    console.log('提交答案成功')

                }
            })

        }

    },
    // 将用户答案放进userAnswer
    useranswerTomy(globalIndex) {
        console.log('=====================执行用户答案转义=================')
        if (this.data.list[globalIndex].struct == 2) {
            if (!this.data.userAnswer[globalIndex]) {
                var struserAnswer = 'userAnswer[' + globalIndex + '].subAnswer'
                console.log('抹掉数据，globalIndex', globalIndex)
                this.setData({
                    [struserAnswer]: []
                })
            }
        }
        var userAnswer = this.data.userAnswer;
        var str = 'userAnswer[' + globalIndex + ']';
        var userAnswerString = 'userAnswerString[' + globalIndex + ']'
        if (this.data.list[globalIndex].struct == 1 && this.data.list[globalIndex].useranswer != "" && this.data.list[globalIndex].useranswer != undefined) {
            var trueAnswer,
                myAnswer,
                trueAnswerArry,
                userAnswer = [];
            var optionId = this.data.mainque[globalIndex].OptionId.split('|');
            var answer = this.data.list[globalIndex].answer.split(',');
            var useranswer = this.data.list[globalIndex].useranswer.split('|')
            if (this.data.mainque[globalIndex].enginemode == "2") {
                for (var i = 0; i < optionId.length; i++) {
                    var index = optionId.indexOf(useranswer[i]);
                    if (index == -1) {
                        continue
                    }
                    userAnswer[index] = this.data.optionCase[index];
                }

                this.setData({
                    [str]: userAnswer,
                    // [userAnswerString]: userAnswer.join(" ")
                })
            } else if (this.data.mainque[globalIndex].enginemode == "1" || this.data.mainque[globalIndex].enginemode == "3") {
                var myindex = optionId.indexOf(this.data.list[globalIndex].useranswer);
                userAnswer[0] = this.data.optionCase[myindex]
                this.setData({
                    [str]: userAnswer,
                    // [userAnswerString]: userAnswer.join(" ")
                })
            } else {
                this.data.userAnswer[globalIndex] = this.data.list[globalIndex].useranswer
            }

        } else if (this.data.list[globalIndex].struct == 2) {
            var qids = this.data.list[globalIndex].qids;
            var oldlist = this.data.oldlist;
            for (var i = 0; i < qids.length; i++) {
                for (var j = 0; j < oldlist.length; j++) {
                    // console.log('=================赋值===========')
                    if (qids[i] == oldlist[j].qid) {
                        console.log('=============正式赋值===========', oldlist[j].useranswer)
                        var savaStr = 'userAnswer[' + globalIndex + '].subAnswer[' + i + ']'
                        this.setData({
                            [savaStr]: oldlist[j].useranswer
                        })
                    }
                }
            }
        }
    },
    //==========
    drag(event) {
        if (event.touches[0].pageY > 120 * this.data.proportion2 && event.touches[0].pageY < this.data.windowHeight - 105) {
            this.setData({
                top: event.touches[0].pageY * this.data.proportion,
                topHeight: event.touches[0].pageY * this.data.proportion + 23 - 100,
                bottomHeight: this.data.windowHeight * this.data.proportion - this.data.topHeight - 72 - 100
            })
        }
    },

    leave(event) {
        this.setData({
            bottomHeight: this.data.windowHeight * this.data.proportion - this.data.topHeight - 72 - 100
        })
    },
    goOnDoHandle() {
        this.setData({
            showStop: !this.data.showStop
        })
        this.data.manageTimer.sartTime();
    },
    stopTimeHandle() {
        this.setData({
            showStop: !this.data.showStop
        })
        this.data.manageTimer.stopTime();
    },
});