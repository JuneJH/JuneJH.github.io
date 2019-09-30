const api = require("../util/api.js");

Page({

    // 页面的初始数据
    data: {
        hidden: true,
        buy_button: "购买",
        renew: "购买",
        b:''
    },
    //高频考点，控制是否可以跳转到考点练习
    goExamPoint1: function (e) {
        //未登录，弹出登录框
        var loginsuccess = swan.getStorageSync("loginsuccess");
        if (!(loginsuccess.data)) {
            this.setData({
                click: loginsuccess.data
            })
            this.setData({
                click: !loginsuccess.data
            })
            return;
        }
        //导入记录
        var index = 1;
        var courseinfo = swan.getStorageSync("courseinfo");
        var courseid = courseinfo.id;
        var oldunitid = swan.getStorageSync("highques" + index + "unitid" + courseid);
        var newunitid = e.currentTarget.dataset.unitid;

        var params = {
            "type": this.data.type,
            "oldunitid": oldunitid,
            "newunitid": newunitid,
            "name": "highques" + index,
            "title":"高频题库"
        }
        if (this.data.isbuyKnowPointList == 1) {
            api.getLastPaper(params);
        }else{
            this.goPurchase();
        }
    },
    //高频易错，控制是否可以跳转到考点练习
    goExamPoint: function (e) {
        //未登录，弹出登录框
        var loginsuccess = swan.getStorageSync("loginsuccess");
        if (!(loginsuccess.data)) {
            this.setData({
                click: loginsuccess.data
            })
            this.setData({
                click: !loginsuccess.data
            })
            return;
        }
        //导入记录
        var index = 2;
        var courseinfo = swan.getStorageSync("courseinfo");
        var courseid = courseinfo.id;
        var oldunitid = swan.getStorageSync("highques" + index + "unitid" + courseid);
        var newunitid = e.currentTarget.dataset.unitid;

        var params = {
            "type": this.data.type,
            "oldunitid": oldunitid,
            "newunitid": newunitid,
            "name": "highques" + index,
            "title":"高频题库"
        }
        if (this.data.isbuyErrList == 1) {
            api.getLastPaper(params);
        }else{
            this.goWrong();
        }
    },
    onLoad: function (e) {
        this.data.type = e.type;
        var userinfo = swan.getStorageSync("userinfo");
        var courseinfo = swan.getStorageSync("courseinfo");
        var params = {
            sessionid: userinfo.sessionid,
            uid: userinfo.uid,
            courseid: courseinfo.id,
            type: 5,
            isPageing: 0,
        }
        var url = "/study/getUnitlist";
        var that = this;
        api.sendPosts(params, url, function (res) {
            that.setData({
                KnowPointList1: res.isbuyKnowPointList,
                KnowPointListValidity: res.KnowPointListValidity,
                KnowPointList: res.KnowPointList,
                isbuyErrList: res.isbuyErrList,
                errListValidity: res.errListValidity,
                errList: res.errList,
            });
            // 判断高频考点按钮显示购买还是续费
            var KnowPointListValidity = res.KnowPointListValidity;//获取课程有效期
            var KnowPointListValidityDate = new Date(KnowPointListValidity);//转换为日期格式
            KnowPointListValidityDate = KnowPointListValidityDate.setDate(KnowPointListValidityDate.getDate());
            var nowDate = new Date();//获取当前日期
            var a = KnowPointListValidityDate - nowDate;
            that.data.a=a;
            // 判断高频易错按钮显示购买还是续费
            var errListValidity = res.errListValidity;//获取课程有效期
            var errListValidityDate = new Date(errListValidity);//转换为日期格式
            errListValidityDate = errListValidityDate.setDate(errListValidityDate.getDate());
            var nowDate = new Date();//获取当前日期
            var b = errListValidityDate - nowDate;
            that.data.b=b;
        });
    },
    onReady:function(){
        //根据操作系统版本显示购买/领资料按钮
        var result = swan.getSystemInfoSync();
        var devsystem = result.system;
        var subsys = devsystem.substring(0, 3);
        if (subsys == "iOS") {
            this.setData({
                "buy_button": "领资料",
                "renew": "领资料",
            });
        } else {
            if(this.data.a<0){
                this.data.buy_button="续费";
            }else{
                this.data.buy_button="购买";
            }
            if(this.data.b<0){
                this.data.renew="续费";
            }else{
                this.data.renew="购买";
            }
            this.setData({
                "buy_button":this.data.buy_button,
                "renew": this.data.renew,
            });
        }
    },
    //高频考点的购买/续费按钮，判断高频易错是否已经购买
    goPurchase: function () {
        //未登录，弹出登录框
        var loginsuccess = swan.getStorageSync("loginsuccess");
        if (!(loginsuccess.data)) {
            this.setData({
                click: loginsuccess.data
            })
            this.setData({
                click: !loginsuccess.data
            })
            return;
        }
        if(this.data.buy_button=="领资料") {
            swan.navigateTo({
                url: '/pages/receiveData/receiveData'
            });
        }else{
                if (((this.data.isbuyErrList!=1) && (this.data.renew == "购买")) || ((this.data.isbuyErrList!=1) &&(this.data.renew == "续费"))) {
                var flag = 1;
            } else {
                var flag = 0;
            }
            swan.navigateTo({
                url: '/pages/purchase/purchase?module=20&flagClass=1' + '&flag=' + flag
            });
        }
    
    },
    //高频易错的购买/续费按钮，判断高频考点是否已经购买
    goWrong: function () {
        //未登录，弹出登录框
        var loginsuccess = swan.getStorageSync("loginsuccess");
        if (!(loginsuccess.data)) {
            this.setData({
                click: loginsuccess.data
            })
            this.setData({
                click: !loginsuccess.data
            })
            return;
        }
        if(this.data.renew=="领资料") {
            swan.navigateTo({
                url: '/pages/receiveData/receiveData'
            });
        }else{
                if (((this.data.isbuyKnowPointList!=1) && (this.data.renew == "购买")) || ((this.data.isbuyKnowPointList!=1) &&(this.data.renew == "续费"))) {
                var flag = 1;
            } else {
                var flag = 0;
            }
            swan.navigateTo({
                url: '/pages/purchase/purchase?module=20&flagClass=1' + '&flag=' + flag
            });
        }
    },

});