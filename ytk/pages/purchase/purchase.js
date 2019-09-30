const api = require("../util/api.js")
Page({
    data: {
        flag: 1,
        list: [],
        ids: 1,//月份选择第二个 默认值
        selectIt: false
    },
    //选择月份
    choose: function (e) {
        //存入选择下标
        var ids = e.currentTarget.dataset.index;
        this.data.ids = ids;
        if (this.data.flagClass == 1) {
            if (this.data.selectIt) {
                var costPrice = parseFloat(this.data.listC[ids].CostPrice);
                costPrice = costPrice.toFixed(2);
                var price = parseFloat(this.data.listC[ids].Price);
                price = price.toFixed(2);
            } else {
                var costPrice = parseFloat(this.data.list[ids].CostPrice);
                costPrice = costPrice.toFixed(2);
                var price = parseFloat(this.data.list[ids].Price);
                price = price.toFixed(2);
            }
        } else if (this.data.flagClass == 3) {
            if (this.data.selectIt) {
                var costPrice = parseFloat(this.data.list[ids].notBuyPrice) / parseFloat(this.data.list[ids].buyAllDiscount);
                costPrice = costPrice.toFixed(2);
                var price = parseFloat(this.data.list[ids].notBuyPrice);
                price = price.toFixed(2);
                this.data.expirationDate = this.data.list[ids].ExpirationDate;
                console.log(this.data.expirationDate);
            } else {
                var costPrice = parseFloat(this.data.list[ids].CostPrice);
                costPrice = costPrice.toFixed(2);
                var price = parseFloat(this.data.list[ids].Price);
                price = price.toFixed(2);
            }
        }
        this.setData({
            "ids": ids,
            "endtime": this.data.list[ids].endtime,
            "costPrice": costPrice,
            "price": price,
            "notBuyCount": this.data.list[ids].notBuyCount,
            "buyAllDiscount": parseFloat(this.data.list[ids].buyAllDiscount) * 10,
        });
    },

    //获取购买页面初始数据
    getPayData() {
        var courseinfo = swan.getStorageSync("courseinfo");
        //高频题库
        if (this.data.flagClass == "1") {
            //判断标题
            if (this.data.module == 20) {
                this.setData({
                    "flagtitle": "高频易错"
                });
            } else if (this.data.module == 21) {
                this.setData({
                    "flagtitle": "高频考点"
                });
            }
            //显示同时购买 和 其他月份板块
            this.setData({
                "classShow": true,
            });

            //获取购买页面的初始化数据 （默认数据）
            var param = { "module": this.data.module };
            var that = this;
            api.getPric(param, function (result) {
                var costPrice = parseFloat(result.list[1].CostPrice);
                costPrice = costPrice.toFixed(2);
                var price = parseFloat(result.list[1].Price);
                price = price.toFixed(2);
                that.setData({
                    "ids": 1,
                    "list": result.list,
                    "endtime": result.list[1].endtime,
                    "title": result.list[0].Title + "-" + courseinfo.title,
                    "costPrice": costPrice,
                    "price": price,
                });
            });

            //同时购买 高频
            var params = { "module": "20,21" };
            var that = this;
            api.getPric(params, function (res) {
                that.data.listC = res.list;
                that.setData({
                    listC: res.list
                })
            });
        }
        //考前押题 
        else if (this.data.flagClass == "2") {
            this.setData({
                "classShow": false
            });
            //获取购买页面数据
            var param = { "module": this.data.module };
            var that = this;
            api.getPric(param, function (result) {
                var costPrice = parseFloat(result.list[0].CostPrice);
                costPrice = costPrice.toFixed(2);
                var price = parseFloat(result.list[0].Price);
                price = price.toFixed(2);
                var title = result.list[0].Title;
                var endtime = result.list[0].endtime;
                that.setData({
                    "ids": 0,
                    "list": result.list,
                    "costPrice": costPrice,
                    "price": price,
                    "title": title + "-" + courseinfo.title,
                    "endtime": endtime
                });
            });
        }
        //章节课
        else if (this.data.flagClass == "3") {
            this.setData({
                "classShow": true
            });


            var userinfo = swan.getStorageSync("userinfo");
            var url = "/commodity/getMembersByChildid";
            var params = {
                "courseid": courseinfo.id,
                "module": this.data.module,
                "childId": this.data.childId,
                "market": "baiduapp_ytk",
                "uid": userinfo.uid
            };
            var that = this;
            api.sendPosts(params, url, function (res) {

                var costPrice = parseFloat(res.list[1].CostPrice);
                costPrice = costPrice.toFixed(2);
                var price = parseFloat(res.list[1].Price);
                price = price.toFixed(2);
                that.setData({
                    "ids": 1,
                    "title": res.list[1].Title,
                    "list": res.list,
                    "endtime": res.list[1].endtime,
                    "costPrice": costPrice,
                    "price": price,
                    "notBuyCount": res.list[1].notBuyCount,
                    "buyAllDiscount": parseFloat(res.list[1].buyAllDiscount) * 10,
                    "expirationDate": res.list[1].ExpirationDate
                });
            });


        }
        //考点练习买课
        else if (this.data.flagClass == "4") {
            this.setData({
                "classShow": false
            });
            var userinfo = swan.getStorageSync("userinfo");
            var url = "/commodity/getUpgradeMembersByCourse";
            var params = {
                "courseid": courseinfo.id,
                "market": "baiduapp_ytk",
                "uid": userinfo.uid
            };
            var that = this;
            api.sendPosts(params, url, function (res) {
                var costPrice = parseFloat(res.list[0].CostPrice);
                costPrice = costPrice.toFixed(2);
                var price = parseFloat(res.list[0].Price);
                price = price.toFixed(2);

                that.setData({
                    "ids": 0,
                    "title": res.list[0].Title,
                    "list": res.list,
                    "endtime": res.list[0].endtime,
                    "costPrice": costPrice,
                    "price": price
                });
            });
        }
    },

    //是否同时购买高频考点/易错
    together(e) {
        var courseinfo = swan.getStorageSync("courseinfo");
        console.log(courseinfo)
        var selectIt = this.data.selectIt;
        selectIt = !selectIt;
        this.data.selectIt = selectIt;
        this.setData({ "selectIt": selectIt });
        if (this.data.flagClass == 1) {
            if (this.data.selectIt) {
                if (this.data.listC.length != 0) {
                    var costPrice = parseFloat(this.data.listC[this.data.ids].CostPrice);
                    costPrice = costPrice.toFixed(2);
                    var price = parseFloat(this.data.listC[this.data.ids].Price);
                    price = price.toFixed(2);
                    this.setData({
                        "title": this.data.listC[this.data.ids].Title + "-" + courseinfo.title,
                    })
                } else {
                    var costPrice = 0;
                    costPrice = costPrice.toFixed(2);
                    var price = 0;
                    price = price.toFixed(2);
                }
            } else {
                this.setData({
                    "title": this.data.list[this.data.ids].Title + "-" + courseinfo.title,
                })
                var costPrice = parseFloat(this.data.list[this.data.ids].CostPrice);
                costPrice = costPrice.toFixed(2);
                var price = parseFloat(this.data.list[this.data.ids].Price);
                price = price.toFixed(2);
            }

        } else if (this.data.flagClass == 3) {
            if (this.data.selectIt) {
                var costPrice = parseFloat(this.data.list[this.data.ids].notBuyPrice) / parseFloat(this.data.list[this.data.ids].buyAllDiscount);
                costPrice = costPrice.toFixed(2);
                var price = parseFloat(this.data.list[this.data.ids].notBuyPrice);
                price = price.toFixed(2);
            } else {
                var costPrice = parseFloat(this.data.list[this.data.ids].CostPrice);
                costPrice = costPrice.toFixed(2);
                var price = parseFloat(this.data.list[this.data.ids].Price);
                price = price.toFixed(2);
            }
        }
        this.setData({
            "costPrice": costPrice,
            "price": price,

        });
    },
    //兼容 章节课支付
    purchaseA() {
        if (this.data.flagClass == 3) {
            if (this.data.selectIt) {
                var userinfo = swan.getStorageSync("userinfo");
                var courseinfo = swan.getStorageSync("courseinfo");
                var courseid = courseinfo.id;
                var sessionid = userinfo.sessionid;
                var uid = userinfo.uid;
                var module = this.data.module;
                var expirationDate = this.data.expirationDate
                var params = {
                    "uid": uid,
                    "sessionid": sessionid,
                    "courseid": courseid,
                    "module": module,
                    "market": "baiduapp_ytk",
                    "ExpirationDate": expirationDate
                }
                var url = "/order/buyAllNotBuy";
                var that = this;

                //1.生成会员制课程模块订单
                api.sendPosts(params, url, function (res) {
                    if (res.errcode == 0) {
                        var orderguid = res.orderguid;//订单guid
                        var orderid = res.orderid;//订单id
                        var orderprice = res.orderprice;//金额
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
                                            console.log('pay fail', err);
                                        }
                                    });
                                });
                            }
                        })


                    }
                })
            } else {
                this.purchase();
            }

        } else {
            this.purchase();
        }
    },
    //支付工具
    purchase() {
        var ids = this.data.ids;
        if (this.data.flagClass == 1 && this.data.selectIt) {
            if (this.data.listC.length == 0) {
                swan.showToast({
                    title: '请选择购买科目',
                    "icon": "none"
                });
                return;
            }
            var memberSystemid = this.data.listC[ids].memberSystemid;
        } else {
            var memberSystemid = this.data.list[ids].memberSystemid;
        }
        var userinfo = swan.getStorageSync("userinfo");
        var sessionid = userinfo.sessionid;
        var uid = userinfo.uid;
        var params = {
            "uid": uid,
            "sessionid": sessionid,
            "memberSystemid": memberSystemid
        }
        var url = "/order/buymember";
        var that = this;

        //1.生成会员制课程模块订单
        api.sendPosts(params, url, function (res) {
            if (res.errcode == 0) {
                var orderguid = res.orderguid;//订单guid
                var orderid = res.orderid;//订单id
                var orderprice = res.orderprice;//金额
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


            }
        })
    },
    onLoad: function (e) {
        //购买页面
        this.data.flagClass = e.flagClass;
        this.data.flag = e.flag;

        //章节课和高频课的文字标签显示区分
        if (e.flagClass == 3) {
            this.setData({
                "flagB": true
            });
            this.data.module = e.module;
        } else {
            this.setData({
                "flagB": false
            })
        }

        this.data.module = e.module;
        if (e.childId != null && e.childId != "") {
            this.data.childId = e.childId;
        }
    },
    onShow: function (e) {
        this.getPayData();
    }
});