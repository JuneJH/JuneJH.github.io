const api = require("../util/api.js");

Page({
    data: {
        currentData: 0,
        flag: []
    },
    onPullDownRefresh() {

        this.onShow();
        swan.stopPullDownRefresh();
    },
    // tab切换
    changeTab: function (e) {
        const that = this;
        that.setData({
            currentData: e.currentTarget.dataset.current
        });
    },
    onShow: function () {
        var userinfo = swan.getStorageSync("userinfo");
        var sessionid = userinfo.sessionid;
        var uid = userinfo.uid;
        var params = {
            "sessionid": sessionid,
            "uid": uid,
            "pagesize": 15,
            "pagecurrent": 1,
            "state": -1
        };
        var url = "/order/myOrderList";
        var that = this;
        api.sendPosts(params, url, function (res) {
            that.data.orderda = res;
            var nopay = 0;
            var yespay = 0;
            for (var i = 0; i < res.data.length; i++) {
                if (res.data[i].state == 2 || res.data[i].state == 0) {
                    nopay++;
                }
                else if (res.data[i].state == 1) {
                    yespay++;
                }
            }
            
            that.setData({
                "nopay": nopay,
                "yespay": yespay
            });
            that.checktype();

        });
    },
    //点击立即支付
    pay(e) {
        var index = e.currentTarget.dataset.index;
        var userinfo = swan.getStorageSync("userinfo");
        var sessionid = userinfo.sessionid;
        var uid = userinfo.uid;
        var orderguid = this.data.orderda.data[index].orderguid;//订单guid
        var orderid = this.data.orderda.data[index].orderid;//订单id
        var orderprice = this.data.orderda.data[index].realPrice;//金额
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
        for (var i = 0; i < this.data.orderda.data.length; i++) {
            if (this.data.orderda.data[i].cover == "") {
                if (this.data.orderda.data[i].CommodityTitle.includes("章节课")) {
                    this.data.orderda.data[i].cover = "/images/chapter_banner.png";
                }
                else if (this.data.orderda.data[i].CommodityTitle.includes("考前押题")) {
                    this.data.orderda.data[i].cover = "/images/preexam_banner.png";
                }
                else if (this.data.orderda.data[i].CommodityTitle.includes("升级题库")) {
                    this.data.orderda.data[i].cover = "/images/upgrade_banner.png";
                }
                else if (this.data.orderda.data[i].CommodityTitle.includes("高频题库")) {
                    this.data.orderda.data[i].cover = "/images/high_banner.png";
                }
                else if (this.data.orderda.data[i].CommodityTitle.includes("高频易错")) {
                    this.data.orderda.data[i].cover = "/images/high_banner.png";
                }
                else if (this.data.orderda.data[i].CommodityTitle.includes("高频考点")) {
                    this.data.orderda.data[i].cover = "/images/high_banner.png";
                }
            } else {
                this.data.orderda.data[i].cover = this.data.orderda.data[i].cover;
            }
        }
        this.setData({
            "orderda": this.data.orderda
        });
    }

});
