(function (){
    function bindEvent() {
        $('.ts-nav>span').on('click',function () {
            // 切换渲染的时候，判断是否购买
            var IsBuy = $(this).attr('data-isBuy');
            if(IsBuy != "buyout"){
                $('.no-buy-tip').css({
                    display:"block"
                })
            }else{
                $('.no-buy-tip').css({
                    display:"none"
                })
            }
            $('.ts-nav>span').removeClass('select');
            $(this).addClass('select');
            $('.ts-tab>.ts-do').removeClass('select').fadeOut().eq($(this).index()).addClass('select').fadeIn();
        })
          
        $('.to-nav>span').on('click',function(){
            $('.to-nav>span').removeClass('select');
            $(this).addClass('select');
            $('.tc-content').css({
                display:'none'
            });
            $('.' + $(this).attr('data-object')).css({
                display:'block'
            });
        })
        // 点击登录按钮
        $('.login-btn').on('click',function () {
            $(".login-area").contents().find('.password-form').fadeIn();
            $('.login-area').css({
                display: 'block'
            });
        })
        // 马上登录事件
        // 特别注意！！！！！！！！！！！！！ 如果已登录请更改此事件此事件
        $('.now-do').on('click',function () {
            // $('.do-topic').css({
            //     display:'block'
            // })
            //已登录请执行此事件
            $('.brush-type-mask').css({
                display:'block'
            })
        })
        // 关闭
        $('.now-login-btn').on('click',function () {
            $('.do-topic').css({
                display:'none'
            })
            $(".login-area").contents().find('.password-form').fadeIn();
            $('.login-area').css({
                display: 'block'
            });
        })
        $('.do-topic .no-login-tip .close-btn').on('click',function () {
            $('.do-topic').css({
                display:'none'
            })
        })
        $('.brush-type-mask .brush-type .close-btn').on('click',function () {
            $('.brush-type-mask').css({
                display:'none'
            })
        })
    }
    bindEvent();
})()