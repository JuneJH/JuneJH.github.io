const api = require("../util/api.js")
Page({
    goToCustomerService() {
        this.closeOpen();
        swan.navigateTo({
            url: "../customerService/customerService"
        })
    },
    data: {
        hidden: true
    },
    closeOpen() {
        this.setData({
            hidden: !this.data.hidden
        })
    },
    goBack() {
        swan.navigateBack({
            success: function () {
                 swan.navigateBack();
            },
            fail: function (err) {
                console.log('navigateBack fail', err);
            }
        });
    }
})