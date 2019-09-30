(function () {
    function slide() {
        // 弹窗
        $('.close-btn').on('click',function (){
            $('.done-pay-mask').fadeOut();
        })
        // 选择支付方式
        $('.pay-way-ul').on('click','li',function(){
            $('.pay-way-ul li').removeClass('select')
            $(this).addClass('select');
        })
        $('.use-benefit>.benefit').on('click', function () {
            if (!$(this).hasClass('shangla')) {
                $(this).addClass('shangla').removeClass('xiala')
                $('.benefit-type').slideDown();
            } else {
                $(this).removeClass('shangla').addClass('xiala')
                $('.benefit-type').slideUp();
            }
        })
        $('.use-balance>.balance').on('click', function () {
            if (!$(this).hasClass('shangla')) {
                $(this).addClass('shangla').removeClass('xiala')
                $('.balance-type').slideDown();
            } else {
                $(this).removeClass('shangla').addClass('xiala')
                $('.balance-type').slideUp();
            }
        })
    }
   
    slide();
})()