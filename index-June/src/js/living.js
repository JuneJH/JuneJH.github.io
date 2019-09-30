(function (){
    function init(){
        clickLogin();
    }
    function clickLogin() {
        // 立即登录
        $('.now-login-btn').on('click', function () {
            $(".login-area").contents().find(".lr-mask").fadeIn();
            $(".login-area").contents().find('.password-form').fadeIn();
            $('.login-area').css({
                display: 'block'
            });
        })
        $('.index-login-btn').on('click', function () {
            $(".login-area").contents().find(".lr-mask").fadeIn();
            $(".login-area").contents().find('.password-form').fadeIn();
            $('.login-area').css({
                display: 'block'
            });
        })
        $('.index-register-btn').on('click', function () {
            $(".login-area").contents().find(".lr-mask").fadeIn();
            $(".login-area").contents().find(".register-form").fadeIn();
            $('.login-area').css({
                display: 'block'
            });

        })
    }
    init();
}())