const api = require("../util/api.js");

Page({
    data: {

    },
    onShow: function () {
        // console.log("onshow执行");
        var userinfo = swan.getStorageSync("userinfo");
        var sessionid = userinfo.sessionid;
        var uid = userinfo.uid;
        var params = {
            "sessionid":sessionid,
            "uid":uid,
            'orderguid': this.data.orderguid
            };
            
        var url = "/order/getOrderDetail";
        var that = this;
        api.sendPosts(params,url,function(res){
            that.data.detail = res;
            that.checktype();
       });
    },
    
     onLoad: function (options) {
        //获取订单列表页面传递过来的orderguid
        this.data.orderguid = options.orderguid;
        this.setData({
            'finishtime':options.finishtime,
            "validTime":options.validTime
        });
    },
       //判断初始数据是否没有图片,若没有，加上
    checktype() {
        //处理数据，两位小数
        var totalprice = parseFloat(this.data.detail.totalprice);
        this.data.detail.totalprice = totalprice.toFixed(2);
        var realprice = parseFloat(this.data.detail.realprice);
        this.data.detail.realprice = realprice.toFixed(2);
        
        for (var i = 0; i < this.data.detail.courselist.length; i++) {
            //处理数据，两位小数
            var price = parseFloat(this.data.detail.courselist[i].price);
            this.data.detail.courselist[i].price = price.toFixed(2);
            
            //增加图片
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
