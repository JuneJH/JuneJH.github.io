var paser = require('../../lib/xmldom/dom-parser.js');
const api = require("../../components/api.js");
var WxParse = require('../../wxParse/wxParse.js');
var userinfo = swan.getStorageSync("userinfo");
Page({
    data: {
        windowHeight: 0,
        topHeight: 0,
        bottomHeight: 0,
        top: 0,
        proportion: .5,
        proportion2: .5,
        // 切换文字解析
        showWord: true,
        showVideo: false,
        // 轮播索引
        curr: 0,
        // 上一次页码prevCurr
        prevCurr: 1,
        textValue: 'test',
        //  当前题号，应该与索引一致
        // index: 0,
        //是否显示输入框
        Isdisabled: false,
        subIndex: 0,
        subCurr: 0,
        prevSubCurr: 0,
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



    },
    // 初始化操作
    onLoad: function (options) {
        swan.getSystemInfo({
            success: res => {
                this.data.proportion = 750 / res.windowWidth;
                this.data.windowHeight = res.windowHeight;
                this.data.proportion2 = res.windowWidth / 750;
            }
        });
        var globalIndex = 0;
        // console.log(list, parameter);
        var list = JSON.parse(options.list);
        var parameter = JSON.parse(options.parameter);
        console.log(list, parameter);
        var that = this;
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
        var newlist = listHandle(list)
        this.setData({
            RequestParameters: parameter,
            globalIndex: globalIndex,
            oldlist: list,
            list: newlist
        })

        console.log(this.data)
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

    },
    // 请求题目的函数
    // indexQuestion 为需要请求的题目索引
    getQuestion: function (indexQuestion, cb) {
        cb || (cb = function () { });
        console.log('come in getQuestion')
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
                            strCollectstate = 'mainque[' + indexQuestion + '].collectstate',
                            strQid = 'mainque[' + indexQuestion + '].qid',
                            strOptionList = 'mainque[' + indexQuestion + '].optionlist',
                            strOptionId = 'mainque[' + indexQuestion + '].OptionId',
                            strEnginemode = 'mainque[' + indexQuestion + '].subTopic[0].enginemode',
                            strSubTitle = 'mainque[' + indexQuestion + '].subTopic[0].title',
                            strSubQuetypename = 'mainque[' + indexQuestion + '].subTopic[0].quetypename',

                            strKnowpoint = 'mainque[' + indexQuestion + '].subTopic[0].knowpoint',
                            strVideocode = 'mainque[' + indexQuestion + '].subTopic[0].videocode',
                            strKnowpointcode = 'mainque[' + indexQuestion + '].subTopic[0].knowpointcode',
                            strOptionExplanation = 'mainque[' + indexQuestion + '].subTopic[0].Explanation',
                            strOptionExtent = 'mainque[' + indexQuestion + '].subTopic[0].Extent',

                            strSubOptions = 'mainque[' + indexQuestion + '].subTopic[0].options';
                        that.parseHtml(strContent, topicXml.Stem);
                        that.parseHtml(strSubTitle, topicXml.Title);
                        that.parseHtml(strOptionExplanation, topicXml.Explanation);
                        topicXml.Option && that.parseHtmlOption(strSubOptions, topicXml.Option)
                        that.setData({
                            [strOptionList]: topicXml.OptionList,
                            [strOptionId]: topicXml.OptionId,
                            [strQuetypename]: res.mainque[0].quetypename,
                            [strCollectstate]: res.mainque[0].collectstate,
                            [strQid]: res.mainque[0].qid,
                            [strEnginemode]: res.mainque[0].enginemode,
                            [strSubQuetypename]: res.mainque[0].quetypename,
                            // [strOptionExplanation]: topicXml.Explanation,
                            [strOptionExtent]: topicXml.Extent,
                            [strKnowpoint]: res.mainque[0].zhishidian[0].knowpoint,
                            [strVideocode]: res.mainque[0].zhishidian[0].videocode,
                            [strKnowpointcode]: res.mainque[0].zhishidian[0].knowpointcode,
                        })
                        // that.changeDataStatus(indexQuestion);
                        // that.changeSubTopic(indexQuestion, indexQuestion);
                        //获取子题 
                        if (that.data.list[indexQuestion].qids.length >= 2) {
                            that.getSubTopic(indexQuestion, 1);
                        }
                        that.userAnswerToA(indexQuestion)

                        // getsecTopic(++indexQuestion);
                        cb.call(that);
                    }
                });
            } else {
                // that.changeDataStatus(indexQuestion)
                // that.changeSubTopic(indexQuestion, indexQuestion);
                // that.showData('请求函数得到的');
                cb.call(that);
            }
        } else {
            if (!that.data.mainque[indexQuestion] && indexQuestion < that.data.list.length) {
                that.data.RequestParameters.qid = that.data.list[indexQuestion].qid;
                api.sendPosts(that.data.RequestParameters, '/question/loadQuestion', function (res) {
                    if (res.errcode == 0) {
                        if (res.mainque[0].enginemode == 1 || res.mainque[0].enginemode == 2 || res.mainque[0].enginemode == 3) {
                            var topicXml = that.getXML(res.mainque[0].content);
                            topicXml.Option = topicXml.Option.split('|b#k*w|');
                            var strcontent = 'mainque[' + indexQuestion + '].content',
                                stroption = 'mainque[' + indexQuestion + '].option',
                                strquetypename = 'mainque[' + indexQuestion + '].quetypename',
                                strcollectstate = 'mainque[' + indexQuestion + '].collectstate',
                                strqid = 'mainque[' + indexQuestion + '].qid',
                                strOptionList = 'mainque[' + indexQuestion + '].optionlist',
                                strOptionId = 'mainque[' + indexQuestion + '].OptionId',
                                strKnowpoint = 'mainque[' + indexQuestion + '].knowpoint',
                                strVideocode = 'mainque[' + indexQuestion + '].videocode',
                                strKnowpointcode = 'mainque[' + indexQuestion + '].knowpointcode',
                                strOptionExplanation = 'mainque[' + indexQuestion + '].Explanation',
                                strOptionExtent = 'mainque[' + indexQuestion + '].Extent',
                                strenginemode = 'mainque[' + indexQuestion + '].enginemode';
                            that.parseHtml(strcontent, topicXml.Title);
                            that.parseHtmlOption(stroption, topicXml.Option);
                            that.parseHtml(strOptionExplanation, topicXml.Explanation);
                            that.setData({
                                [strOptionList]: topicXml.OptionList,
                                // [strOptionExplanation]: topicXml.Explanation,
                                [strOptionExtent]: topicXml.Extent,
                                [strOptionId]: topicXml.OptionId,
                                [strquetypename]: res.mainque[0].quetypename,
                                [strcollectstate]: res.mainque[0].collectstate,
                                [strqid]: res.mainque[0].qid,
                                [strKnowpoint]: res.mainque[0].zhishidian[0].knowpoint,
                                [strVideocode]: res.mainque[0].zhishidian[0].videocode,
                                [strKnowpointcode]: res.mainque[0].zhishidian[0].knowpointcode,
                                [strenginemode]: res.mainque[0].enginemode,
                            })
                            that.showData('请求函数得到的');
                            that.userAnswerToA(indexQuestion)
                            cb.call(that);
                        } else {
                            console.log('单题', res)
                            var topicXml = that.getXML(res.mainque[0].content);
                            console.log('解析好的的题', topicXml)
                            var strcontent = 'mainque[' + indexQuestion + '].content',
                                strtitle = 'mainque[' + indexQuestion + '].title',
                                strquetypename = 'mainque[' + indexQuestion + '].quetypename',
                                strcollectstate = 'mainque[' + indexQuestion + '].collectstate',
                                strqid = 'mainque[' + indexQuestion + '].qid',
                                strOptionList = 'mainque[' + indexQuestion + '].optionlist',
                                strOptionId = 'mainque[' + indexQuestion + '].OptionId',
                                strKnowpoint = 'mainque[' + indexQuestion + '].knowpoint',
                                strVideocode = 'mainque[' + indexQuestion + '].videocode',
                                strKnowpointcode = 'mainque[' + indexQuestion + '].knowpointcode',
                                strOptionExplanation = 'mainque[' + indexQuestion + '].Explanation',
                                strOptionExtent = 'mainque[' + indexQuestion + '].Extent',
                                strenginemode = 'mainque[' + indexQuestion + '].enginemode';
                           that.parseHtml(strcontent, topicXml.Stem);
                            that.parseHtml(strtitle, topicXml.Title);
                            that.parseHtml(strOptionExplanation, topicXml.Explanation);
                            that.setData({
                                [strOptionList]: topicXml.OptionList,
                                // [strOptionExplanation]: topicXml.Explanation,
                                [strOptionExtent]: topicXml.Extent,
                                [strOptionId]: topicXml.OptionId,
                                [strquetypename]: res.mainque[0].quetypename,
                                [strcollectstate]: res.mainque[0].collectstate,
                                [strqid]: res.mainque[0].qid,
                                [strKnowpoint]: res.mainque[0].zhishidian[0].knowpoint,
                                [strVideocode]: res.mainque[0].zhishidian[0].videocode,
                                [strKnowpointcode]: res.mainque[0].zhishidian[0].knowpointcode,
                                [strenginemode]: res.mainque[0].enginemode,
                            })
                            that.showData('请求函数得到的');
                            that.userAnswerToA(indexQuestion)
                            cb.call(that);
                        }
                    }
                });

            } else {
                // that.changeDataStatus(indexQuestion)
                // that.showData('请求函数得到的');
                cb.call(that);
            }
        }
    },
    // 处理html
    parseHtml(positionSave, parseValue) {
        // console.log('处理html', positionSave, parseValue)
        WxParse.wxParse(positionSave, 'html', parseValue, this, 5)
    },
    // 处理选多个html
    parseHtmlOption(positionSave, parseValue) {
        var len = parseValue.length;
        var i = 0;
        for (i = 0; i < len; i++) {
            var postionSaveNew = positionSave + '[' + i + ']';
            WxParse.wxParse(postionSaveNew, 'html', parseValue[i], this, 5)
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
        topic.Explanation = doc.getElementsByTagName('Explanation')[0].firstChild && doc.getElementsByTagName('Explanation')[0].firstChild.data;
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
        var that = this;
        var oldglobalIndex = this.data.globalIndex;
        var curr = parseInt(e.detail.current);
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
        // if(this.data.list[curr].struct == 2){
        //     this.setData({
        //         mainqueCurr:this.data.mainque[curr]
        //     })
        // }

        this.clearStyle();


    },
    // 子页面滑动
    slideSubHandle(e) {
        var curr = parseInt(e.detail.current);
        this.setData({
            // textareaVlue: '',
            subIndex: curr
        })
        if (curr < this.data.list[this.data.globalIndex].qids.length - 1) {
            this.getSubTopic(this.data.globalIndex, curr + 1)
        }

        if (e.detail.source != "touch") {
            return false;
        }
    },
    // 封装请求子题  第二次请求
    getSubTopic: function (globalIndex, subIndex, cb) {
        cb || (cb = function () { });
        var that = this;
        this.data.RequestParameters.qid = this.data.list[globalIndex].qids[subIndex];
        api.sendPosts(this.data.RequestParameters, '/question/loadQuestion', function (res) {
            var topicXml = that.getXML(res.mainque[0].content);
            var strContent = 'mainque[' + globalIndex + '].content',
                strQuetypename = 'mainque[' + globalIndex + '].quetypename',
                strCollectstate = 'mainque[' + globalIndex + '].collectstate',
                strQid = 'mainque[' + globalIndex + '].qid',
                strEnginemode = 'mainque[' + globalIndex + '].subTopic[' + subIndex + '].enginemode',
                strSubTitle = 'mainque[' + globalIndex + '].subTopic[' + subIndex + '].title',
                strSubQuetypename = 'mainque[' + globalIndex + '].subTopic[' + subIndex + '].quetypename',
                strOptionList = 'mainque[' + globalIndex + '].optionlist',
                strOptionId = 'mainque[' + globalIndex + '].OptionId',
                strKnowpoint = 'mainque[' + globalIndex + '].subTopic[' + subIndex + '].knowpoint',
                strVideocode = 'mainque[' + globalIndex + '].subTopic[' + subIndex + '].videocode',
                strKnowpointcode = 'mainque[' + globalIndex + '].subTopic[' + subIndex + '].knowpointcode',
                strOptionExplanation = 'mainque[' + globalIndex + '].subTopic[' + subIndex + '].Explanation',
                strOptionExtent = 'mainque[' + globalIndex + '].subTopic[' + subIndex + '].Extent',
                strSubOptions = 'mainque[' + globalIndex + '].subTopic[' + subIndex + '].options';
            that.parseHtml(strContent, topicXml.Stem);
            that.parseHtml(strSubTitle, topicXml.Title)
            topicXml.Option && that.parseHtmlOption(strSubOptions, topicXml.Option);
            that.parseHtml(strOptionExplanation, topicXml.Explanation);
            that.setData({
                // [strContent]: topicXml.Stem,
                // [strSubTitle]: topicXml.Title,
                // [strSubOptions]: topicXml.Option,
                [strOptionList]: topicXml.OptionList,
                [strOptionId]: topicXml.OptionId,
                [strQuetypename]: res.mainque[0].quetypename,
                [strCollectstate]: res.mainque[0].collectstate,
                [strQid]: res.mainque[0].qid,
                [strEnginemode]: res.mainque[0].enginemode,
                [strSubQuetypename]: res.mainque[0].quetypename,
                // [strOptionExplanation]: topicXml.Explanation,
                [strOptionExtent]: topicXml.Extent,
                [strKnowpoint]: res.mainque[0].zhishidian[0].knowpoint,
                [strVideocode]: res.mainque[0].zhishidian[0].videocode,
                [strKnowpointcode]: res.mainque[0].zhishidian[0].knowpointcode,
            })
            // cb.call(that, globalIndex)
        });
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
            SubIndex = this.data.SubIndex,
            str;
        RequestParameters = this.data.RequestParameters
        // 判断是否为组合题
        if (list[index].struct == 2) {
            RequestParameters.qid = list[index].qids[SubIndex];
            RequestParameters.state = (mainque[index].subTopic[SubIndex].collectstate == 0 ? 1 : 0);
            str = 'mainque[' + index + '].subTopic[' + SubIndex + '].collectstate';
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
                    that.changeSubTopic(index, SubIndex);
                }
                that.toastDialog.showDialog(toastStr);
            } else {
                that.toastDialog.showDialog('请重试');
            }
        });
    },

    bindDragHandle(e) {
        var dix = this.data.recordInitTop - parseInt(e.touches[0].clientY);
        var bottom = 0;
        var flag = true;
        if (dix > 50) {
            bottom = 102;
        } else if (dix < -50) {
            bottom = -300;
        }
        if (bottom >= 102) {
            flag = true;
        } else if (bottom <= -300) {
            flag = false;
        }
        if (bottom != 0) {
            this.setData({
                structWrapBottom: bottom,
                Isdisabled: flag
            })
        }
    },
    dragStartHandle(e) {
        this.setData({
            recordInitTop: parseInt(e.touches[0].clientY)
        })
    },
    // 得到正确答案
    getTrueAnswer(globalIndex) {
        var list = this.data.list;
        var trueAnswer,
            myAnswer,
            trueAnswerArry = [],
            myAnswerArry;
        var optionId = this.data.mainque[globalIndex].OptionId.split('|');
        var answer = this.data.list[globalIndex].answer.split(',');
        console.log('正确答案', answer)
        var useranswer = this.data.list[globalIndex].useranswer.split('|');
        if (this.data.mainque[globalIndex].enginemode == 2) {

            console.log('多选题存放')
            for (var i = 0; i < optionId.length; i++) {
                var index = optionId.indexOf(answer[i]);
                if (index == -1) {
                    continue
                }
                trueAnswerArry[index] = this.data.optionCase[index];
            }


        } else if (this.data.mainque[globalIndex].enginemode == 1 || this.data.mainque[globalIndex].enginemode == 3) {
            var index = optionId.indexOf(this.data.mainque[globalIndex].optionlist);
            trueAnswerArry[0] = this.data.optionCase[index]
        }
        var tureStr = 'tureAnswerArry[' + globalIndex + ']'
        var tureAnswerString = 'tureAnswerString[' + globalIndex + ']'
        this.setData({
            [tureStr]: trueAnswerArry,
            [tureAnswerString]: trueAnswerArry.join(" ")
        })
    },
    // 将用户答案放进userAnswer   userAnswerToA
    userAnswerToA(globalIndex) {
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
                myAnswerArry = [];
            var optionId = this.data.mainque[globalIndex].OptionId.split('|');
            var answer = this.data.list[globalIndex].answer.split(',');
            var useranswer = this.data.list[globalIndex].useranswer.split('|')
            if (this.data.mainque[globalIndex].enginemode == "2") {
                for (var i = 0; i < optionId.length; i++) {
                    var index = optionId.indexOf(useranswer[i]);
                    if (index == -1) {
                        continue
                    }
                    myAnswerArry[index] = this.data.optionCase[index];
                }

                this.setData({
                    [str]: myAnswerArry,
                    [userAnswerString]: myAnswerArry.join(" ")
                })
            } else if (this.data.mainque[globalIndex].enginemode == "1" || this.data.mainque[globalIndex].enginemode == "3") {
                var myindex = optionId.indexOf(this.data.list[globalIndex].useranswer);
                myAnswerArry[0] = this.data.optionCase[myindex]
                this.setData({
                    [str]: myAnswerArry,
                    [userAnswerString]: myAnswerArry.join(" ")
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
        this.getTrueAnswer(globalIndex)
    },
    clickWordHandle() {
        this.setData({
            showWord: true,
            showVideo: false
        })
    },
    clickVideoHandle() {
        this.setData({
            showWord: false,
            showVideo: true
        })
    },
    // 拖拽
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
});