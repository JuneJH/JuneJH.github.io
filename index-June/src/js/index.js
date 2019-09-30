(function () {
    //共用事件
    // 绑定菜单栏事件
    function bindEvent() {
        //调试用，没有意义
        // $('.nav-menu>li').addClass('select');
        //    $('.sub-menu').css({
        //        display:'block'
        //    });
        var timerOut = null;
        $('.nav-menu>li').eq(0).on('mouseenter', function () {
            clearTimeout(timerOut);
            $(this).addClass('select');
            $('.menu-mask').css({
                display: 'block'
            });
        }).on('mouseleave', function () {
            var that = this;
            timerOut = setTimeout(function () {
                $(that).removeClass('select');
                $('.menu-mask').css({
                    display: 'none'
                });
            }, 500);
            $('.menu-mask').on('mouseenter', function () {
                clearTimeout(timerOut);
            }).on('mouseleave', function () {
                clearTimeout(timerOut);
                timerOut = setTimeout(function () {
                    $(that).removeClass('select');
                    $('.menu-mask').css({
                        display: 'none'
                    });
                }, 500);

            })

        })
        // 学习中心事件
        $('.stydu-center-btn').on('click', function () {
            $('.chose-course-mask').fadeIn();
        })
        $('.close-btn').on('click', function () {
            $('.chose-course-mask').fadeOut();
        })
        //    侧边栏
        $('.point>a').on('click', function () {
            $('.point>a').removeClass('select');
            $(this).addClass('select');
        })

    }
    // 调用按钮
    function clickLogin() {
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
    clickLogin();
    bindEvent();
})()