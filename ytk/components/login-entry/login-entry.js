Component({
    properties: {
        modal: {
            type: Boolean,
            value: false
        },

    },

    methods: {
        onTap: function () {

        },
        loginEntry() {
            this.triggerEvent("sendEvent", this.data.modal); 
            this.setData({
                modal: !this.data.modal
            });
            
        },
        turnJump() {
            this.setData({
                modal: !this.data.modal
            });
            swan.switchTab({
                url: '/pages/login/login'
            });
        }
    }
});