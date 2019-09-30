(function () {
    function menuEvent() {
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
        $('.chose-course-wrap .close-btn').on('click', function () {
            $('.chose-course-mask').fadeOut();
        })
    }
    menuEvent();
}())
