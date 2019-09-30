(function () {
    function init(){
        openCourseSlide();
        banner();
        switchTab();
        menuEvent()

    }
    function menuEvent(){
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
    }
    // 公开课轮播
    function openCourseSlide() {
        var len = $('.oc-ul>li').width();
        var ulLen = $('.oc-ul').width();
        var ocLen = $('.oc-content').width();
        var allLen = 0;
        $('.oc-diraction>.left').on('click', function () {
            move('left');
        })
        $('.oc-diraction>.right').on('click', function () {
            move('right')
        })
        function move(diraction) {
            if (diraction == 'left' && (-allLen + ocLen) < ulLen) {
                allLen -= len;
                $('.oc-ul>.select').next().addClass('select').end().removeClass('select');
            } else if (diraction == 'right' && allLen < 0) {
                allLen += len;
                $('.oc-ul>.select').prev().addClass('select').end().removeClass('select');
            }
            $('.oc-ul').animate({
                left: allLen
            })
        }
    }
    // 调用轮播图
    function banner(){
        $('.wrapper').carousel({
            imgList:['./src/img/banber-1.png','./src/img/banber-1.png','./src/img/banber-1.png'],
            carouselType: 'slide'//'gradual'

        })
    }
    // 切换tab
    function switchTab(){
        $('.topic-tab>span').on('click',function(){
            $('.topic-tab>span').removeClass('select');
            $(this).addClass('select');
            $('.tw-content').fadeOut();
            $('.'+ $(this).attr('data')).fadeIn();
        })
    }
    init();
})()