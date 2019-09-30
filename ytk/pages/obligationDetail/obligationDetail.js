const api = require("../util/api.js");

Page({
    data: {

    },
    onShow: function () {
        console.log("onshow执行");
        var userinfo = swan.getStorageSync("userinfo");
        var sessionid = userinfo.sessionid;
        var uid = userinfo.uid;
        var params = {
            "sessionid": sessionid,
            "uid": uid,
            'orderguid': this.data.orderguid
        };

        var url = "/order/getOrderDetail";
        var that = this;
        api.sendPosts(params, url, function (res) {
            that.data.detail = res;
            that.checktype();

        });
    },

    onLoad: function (options) {
        //获取订单列表页面传递过来的orderguid
        this.data.orderguid = options.orderguid;
        console.log(this.data.orderguid);

    },
    //点击立即支付
    pay() {
        var userinfo = swan.getStorageSync("userinfo");
        var sessionid = userinfo.sessionid;
        var uid = userinfo.uid;
        var orderguid = this.data.orderguid;//订单guid
        var orderid = this.data.detail.orderid;//订单id
        var orderprice = this.data.detail.amountdue;//金额
        params = {
            "uid": uid,
            "sessionid": sessionid,
            "orderguid": orderguid,
            "orderid": orderid,
            "totalprice": orderprice,
            "amountdue": orderprice
        }
        url = "/order/checkorder";
        //2.检查订单
        api.sendPosts(params, url, function (result) {
            if (result.errcode == 0) {
                var step = result.step;
                var orderguid = result.orderguid;//订单guid
                var orderid = result.orderid;//订单id
                var orderprice = result.orderprice;//订单价格
                //3.生成支付订单
                params = {
                    "uid": uid,
                    "sessionid": sessionid,
                    "orderguid": orderguid,
                    "orderid": orderid,
                    "orderprice": orderprice,
                    "gateway": "baidupay",//支付网关
                    "market": "baiduapp_ytk"
                }
                var url = "/order/createpayorder";
                api.sendPosts(params, url, function (resultO) {
                    //掉起百度支付
                    console.log(resultO.total_fee);
                    console.log(parseFloat(resultO.total_fee));
                    console.log(parseFloat(resultO.total_fee) * 100);
                    console.log(Math.floor((parseFloat(resultO.total_fee) + 0.005) * 100) / 100);
                    swan.requestPolymerPayment({
                        orderInfo: {
                            "dealId": "3657827162",
                            "appKey": "MMUnyn",
                            "totalAmount": Math.floor((parseFloat(resultO.total_fee) + 0.005) * 100),
                            "tpOrderId": resultO.out_trade_no,
                            "dealTitle": resultO.body,
                            "signFieldsRange": "1",
                            "rsaSign": resultO.baidu_rsaSign,
                            "bizInfo": resultO.bizInfo
                        },
                        success: function (res) {
                            swan.showToast({
                                title: '支付成功',
                                icon: 'success'
                            });
                        },
                        fail: function (err) {
                            swan.showToast({
                                title: "取消支付",
                                icon: "none"
                            });

                        }
                    });
                });
            }
        })
    },
    //判断初始数据是否没有图片,若没有，加上
    checktype() {
        //处理数据，两位小数
        var totalprice = parseFloat(this.data.detail.totalprice);
        this.data.detail.totalprice = totalprice.toFixed(2);
        var amountdue = parseFloat(this.data.detail.amountdue);
        this.data.detail.amountdue = amountdue.toFixed(2);

        for (var i = 0; i < this.data.detail.courselist.length; i++) {
            //处理数据，两位小数
            var price = parseFloat(this.data.detail.courselist[i].price);
            this.data.detail.courselist[i].price = price.toFixed(2);
            var memberSystemPrice = parseFloat(this.data.detail.courselist[i].memberSystemPrice);
            this.data.detail.courselist[i].memberSystemPrice = memberSystemPrice.toFixed(2);
            

            if (this.data.detail.courselist[i].memberSystemCover == "") {
                if (this.data.detail.courselist[i].memberSystemTitle.includes("章节课")) {
                    this.data.detail.courselist[i].memberSystemCover = "/images/chapter_banner.png";
                }
                else if (this.data.detail.courselist[i].memberSystemTitle.includes("考前押题")) {
                    this.data.detail.courselist[i].memberSystemCover = "/images/preexam_banner.png";
                }
                else if (this.data.detail.courselist[i].memberSystemTitle.includes("升级题库")) {
                    this.data.detail.courselist[i].memberSystemCover = "/images/upgrade_banner.png";
                }
                else if (this.data.detail.courselist[i].memberSystemTitle.includes("高频题库")) {
                    this.data.detail.courselist[i].memberSystemCover = "/images/high_banner.png";
                }
                else if (this.data.detail.courselist[i].memberSystemTitle.includes("高频易错")) {
                    this.data.detail.courselist[i].memberSystemCover = "/images/high_banner.png";
                }
                else if (this.data.detail.courselist[i].memberSystemTitle.includes("高频考点")) {
                    this.data.detail.courselist[i].memberSystemCover = "/images/high_banner.png";
                }
            } else {
                this.data.detail.courselist[i].memberSystemCover = this.data.detail.courselist[i].memberSystemCover;
            }
        }
        this.setData({
            "data": this.data.detail
        });
    }


});
