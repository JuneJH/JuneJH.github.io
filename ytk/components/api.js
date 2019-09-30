function sendGets(params, url, cb) {
    console.log('开始执行请求', params)
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

        },
        fail: function (err) {
            console.log("POST请求失败,错误原因" + err);
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
                    url: '../pages/networkAnomaly/networkAnomaly'
                });
                return;
            }
        }
    });
}



function getTrueString(str) {
    str = str.replace(/<o:p>/img, "");
    str = str.replace(/<span.*?>/img, "");
    return str;
}
module.exports.getTrueString = getTrueString;
module.exports.sendGets = sendGets;
module.exports.sendPosts = sendPosts;
module.exports.getNetworkType = getNetworkType;
