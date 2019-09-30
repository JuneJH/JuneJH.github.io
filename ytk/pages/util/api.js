
function sendGets(params, url, cb) {
    getNetworkType(); //获取网络状态
    url = "https://ytkapi.cnbkw.com" + url;
    swan.request({
        url: url,
        method: 'GET',
        dataType: 'json',
        data: params,
        header: {
            'content-type': 'application/json',
            "Nonce": (Math.round(Math.random() * 0x7fffffff)).valueOf(),
            "Timestamp": (new Date()).valueOf(),
            "SecretId": "AKIDz8krbsJ5yKBZQpn74WFkmLPx3EXAMPLE",
            "SignatureMethod": "HmacSHA256"
        },
        success: function (res) {
            cb(res.data);
        },
        fail: function (err) {
            console.log("GET请求失败,错误原因" + err);
        }
    });
}
//POST请求服务器接口方法  params为json对象  url为接口地址 cb为回调函数 
function sendPosts(params, url, cb) {
    url = "https://ytkapi.cnbkw.com" + url;
    console.log("请求路径和数据 ");
    console.log(url);
    console.log(params);
    getNetworkType(); //获取网络状态
    swan.request({
        url: url,
        method: 'POST',
        dataType: 'json',
        data: params,
        data: params,
        header: {
            'content-type': 'application/json',
            "Nonce": (Math.round(Math.random() * 0x7fffffff)).valueOf(),
            "Timestamp": (new Date()).valueOf(),
            "SecretId": "AKIDz8krbsJ5yKBZQpn74WFkmLPx3EXAMPLE",
            "SignatureMethod": "HmacSHA256",
            'content-type': 'application/x-www-form-urlencoded'
        },

        success: function (res) {
            console.log("返回数据");
            console.log(res.data);
            cb(res.data);
        }

    });
}

function getNetworkType() {
    swan.getNetworkType({
        complete: function (res) {
            if (res.isConnected == false || res.networkType == "none") {
                swan.showToast({
                    title: '当前网络不可用',
                    icon: 'none',
                    showCancel: false,
                    duration: 1500
                });
                swan.navigateTo({
                    url: '../networkAnomaly/networkAnomaly'
                });
                return;
            }
        }
    });
}

/**
 * 传递参数：   
 * type        //module
 * oldunitid  //swan.getStorageSync(key);
 * newunitid  //当前点击的unitid
 * title      //如果需要章节名字则传
 * name      //名字章节  例如"name":"point"
 * 返回参数：
 * paperid	String	试卷id（0：未学习）
 * CurState	String	1：已交卷 2：未交卷
 * 
 * 页面逻辑：把该方法写到前端需要的页面
 */
function getLastPaper(params) {
    var userinfo = swan.getStorageSync("userinfo");
    var courseinfo = swan.getStorageSync("courseinfo");

    var sessionid = userinfo.sessionid;
    var uid = userinfo.uid;
    var courseid = courseinfo.id;

    params["uid"] = uid;
    params["sessionid"] = sessionid;
    params["courseid"] = courseid;
    params["market"] = "baiduapp_ytk";

    //规范params 中未定义的值
    if (params.oldkpid == null) {
        params.oldkpid = "";
    }
    if (params.newkpid == null) {
        params.newkpid = "";
    }

    if (params.oldunitid == null) {
        params.oldunitid = "";
    }
    if (params.newunitid == null) {
        params.newunitid = "";
    }
    if (params.oldpaperid == null) {
        params.oldpaperid = "";
    }
    if (params.newpaperid == null) {
        params.newpaperid = "";
    }
    console.log(params);

    if ((params.oldunitid != null && params.oldunitid != "") || (params.oldkpid != null && params.oldkpid != "") || (params.oldpaperid != null && params.oldpaperid != "")) {
        //不是第一次点开课程
        var param = {
            uid: params.uid,
            sessionid: params.sessionid,
            courseid: params.courseid,
            type: params.type,
            unitid: params.oldunitid,
            market: params.market,
            kpid: params.oldkpid
        }
        var url = "/study/getLastPaper";
        //请求历史试卷
        sendPosts(param, url, function (res) {
            //试卷paperid（0：未学习）
            if (res.paperid != "0") {
                //CurState 1：已交卷 2：未交卷
                if (res.CurState == 2) {
                    swan.showModal({
                        title: '温馨提示',
                        content: '是否导入最近一次刷题记录？',
                        showCancel: true,
                        confirmText: "导入",
                        confirmColor: "#FECC34",
                        success: function (result) {
                            //是否导入最近一次试卷
                            if (result.confirm) {
                                //导入最近一次试卷  
                                //获取题号
                                var examNum = swan.getStorageSync(params.name + "storage" + courseid);
                                //未交卷
                                //转发doexam  做题页面
                                swan.navigateTo({
                                    url: '/pages/doExam/doExam?' +
                                        "unitid=" + params.oldunitid +
                                        "&courseid=" + courseid +
                                        "&type=" + params.type +
                                        "&paperid=" + res.paperid +
                                        "&kpid=" + params.oldkpid +
                                        "&CurState=" + res.CurState +
                                        "&storageExamName=" + params.name + "storage" + courseid +
                                        "&doExamName=" + params.title +
                                        "&examNum=" + examNum +
                                        "&name=" + params.name
                                });
                            }
                            //不导入
                            else {
                                //第一次点开课程  当doexam的返回值为题库正在更新时会被都exam清理
                                swan.setStorageSync(params.name + "unitid" + courseid, params.newunitid);
                                swan.setStorageSync(params.name + "kpid" + courseid, params.newkpid);
                                swan.setStorageSync(params.name + "title" + courseid, params.titlename);
                                swan.setStorageSync(params.name + "paperid" + courseid, params.newpaperid);
                                //在被清理是 把此处的值给 考点练习按钮
                                swan.setStorageSync("new" + params.name + "unitid" + courseid, params.newunitid);
                                swan.setStorageSync("new" + params.name + "kpid" + courseid, params.newkpid);
                                swan.setStorageSync("new" + params.name + "title" + courseid, params.titlename);
                                swan.setStorageSync("new" + params.name + "paperid" + courseid, params.newpaperid);
                                //转发doexam  做题页面
                                swan.navigateTo({
                                    url: '/pages/doExam/doExam?' +
                                        "unitid=" + params.newunitid +
                                        "&courseid=" + courseid +
                                        "&type=" + params.type +
                                        "&kpid=" + params.newkpid +
                                        "&storageExamName=" + params.name + "storage" + courseid +
                                        "&doExamName=" + params.title +
                                        "&name=" + params.name
                                });
                            }
                        }
                    });
                } else {
                    //已交卷  到结果页面
                    var testResult = {
                        uid: params.uid,
                        sessionid: params.sessionid,
                        "courseid": params.courseid,
                        "unitid": params.oldunitid,
                        type: params.type,
                        paperid: res.paperid,
                        "doExamName": params.title
                    }
                    var testResult = JSON.stringify(testResult)
                    swan.navigateTo({
                        url: '/pages/testResult/testResult?' + "testResult=" + testResult
                    });
                }
            }
        });
    }
    else {
        //第一次点开课程  当doexam的返回值为题库正在更新时会被都exam清理
        swan.setStorageSync(params.name + "unitid" + courseid, params.newunitid);
        swan.setStorageSync(params.name + "kpid" + courseid, params.newkpid);
        swan.setStorageSync(params.name + "title" + courseid, params.titlename);
        swan.setStorageSync(params.name + "paperid" + courseid, params.newpaperid);
        //在被清理時 把此处的值给 考点练习按钮
        swan.setStorageSync("new" + params.name + "unitid" + courseid, params.newunitid);
        swan.setStorageSync("new" + params.name + "kpid" + courseid, params.newkpid);
        swan.setStorageSync("new" + params.name + "title" + courseid, params.titlename);
        swan.setStorageSync("new" + params.name + "paperid" + courseid, params.newpaperid);
        //转发doexam  做题页面
        swan.navigateTo({
            url: '/pages/doExam/doExam?' +
                "unitid=" + params.newunitid +
                "&courseid=" + courseid +
                "&type=" + params.type +
                "&kpid=" + params.newkpid +
                "&storageExamName=" + params.name + "storage" + courseid +
                "&doExamName=" + params.title +
                "&name=" + params.name
        });
    }


}
function autoLogin() {

    params = {
        "from": "baiduapp"
    }
    url = "/userInfo/tryUsing";
    sendPosts(params, url, function (result1) {
        if (result1.errcode == 0) {
            swan.setStorageSync("userinfo", result1);
            swan.setStorageSync("loginsuccess", { data: false });
        }
    })

}

function getPric(params, cb) {
    var url = "/commodity/getMembersByModule";
    var courseifo = swan.getStorageSync("courseinfo");
    var userinfo = swan.getStorageSync("userinfo");
    var courseid = courseifo.id;
    var uid = userinfo.uid;
    params["uid"] = uid;
    params["courseid"] = courseid;
    params["market"] = "baiduapp_ytk";
    console.log("params", params);
    sendPosts(params, url, cb);
}

function collectLog(params, cb) {
    console.log("请求参数");
    console.log(params);
    getNetworkType(); //获取网络状态
    url = "https://studylog.cnbkw.com/CollectLog";
    swan.request({
        url: url,
        method: 'POST',
        dataType: 'jsonp',
        data: "content=" + JSON.stringify(params),
        header: {
            'content-type': 'application/json',
            'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
            console.log("返回数据");
            console.log(res.data);
            cb(res.data);
        },
        fail: function (err) {
            console.log("POST请求失败,错误原因", err);
        }

    });
}

//刷新session
function refreshSession() {
    var userinfo = swan.getStorageSync("userinfo");
    var loginsuccess = swan.getStorageSync("loginsuccess");
    if (loginsuccess) {
        var url = "/userInfo/refreshSession";
        params = { "sessionid": userinfo.sessionid, "from": "baiduapp" };
        sendPosts(params, url, function () {
        });
    }
}

module.exports.getLastPaper = getLastPaper;
module.exports.sendGets = sendGets;
module.exports.sendPosts = sendPosts;
module.exports.getNetworkType = getNetworkType;
module.exports.autoLogin = autoLogin;
module.exports.getPric = getPric;
module.exports.collectLog = collectLog;
module.exports.refreshSession = refreshSession;