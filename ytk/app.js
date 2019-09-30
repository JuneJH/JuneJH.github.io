/**
 * @file app.js
 * @author swan
 */

/* globals swan */

App({
    globalData: {
        timerName: ""
    },
    onLaunch(options) {
        if (swan.canIUse('showFavoriteGuide')) {
            swan.showFavoriteGuide({
                type: 'bar',
                content: '一键添加到我的小程序',
                success(res) {
                    console.log('添加成功：', res);
                },
                fail(err) {
                    console.log('添加失败：', err);
                }
            });
        }

        var userinfo = swan.getStorageSync("userinfo");
        var loginsuccess = swan.getStorageSync("loginsuccess");
        if (loginsuccess) {

            var url = "/userInfo/refreshSession";
            params = { "sessionid": userinfo.sessionid, "from": "baiduapp" };

            sendPosts(params, url, function () {
            });
            getApp().globalData.timerName = setInterval(function () {
                var url = "/userInfo/refreshSession";
                params = { "sessionid": userinfo.sessionid, "from": "baiduapp" };
                sendPosts(params, url, function () {
                })
            }, 2.5 * 1000 * 60 * 60);
        }

        function sendPosts(params, url, cb) {
            console.log("请求路径和数据");
            console.log(url);
            console.log(params);
            getNetworkType(); //获取网络状态
            url = "https://ytkapi.cnbkw.com" + url;
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
                        swan.reLaunch({
                            url: '../networkAnomaly/networkAnomaly'
                        });
                        return;
                    }
                }
            });
        }

    },

});
