(function (){
    QSpeed(16, 30);
     // 解题思路
     $('.question-think>button').on('click', function () {
        if ($(this).hasClass('up')) {
            $(this).prevAll('button').fadeOut();
            $(this).prevAll('.think-detail').slideDown();
            $(this).attr('class', 'down')
                .text('收起');

        } else if ($(this).hasClass('down')) {
            $(this).prevAll('button').fadeIn();
            $(this).prevAll('.think-detail').slideUp();
            $(this).attr('class', 'up')
                .text('解题思路');
        }

    })
    // 测试进度条，参数为当前已做题目数，总题目数
    function QSpeed(done, titleAll) {
        var wrapWidth = parseInt($('.speed-wrap').css('width'));
        var doneWidth = done / titleAll * wrapWidth;
        $('.now-done').css({
            width: doneWidth + 'px'
        })
    }

    // 纠错
    $('.error-btn').on('click',function(){
        $('.corrected-mask').fadeIn();
    })
    $('.select-area').on('click', function () {
        if ($('.select-option').hasClass('show')) {
            $('.select-option').slideUp().removeClass('show');
        } else {
            $('.select-option').slideDown('bottom').addClass('show');
        }
    })
    $('.select-option').on('click','li',function(){
        $('.select-value').text( $(this).text() )
    })
    $('.cancel-btn').on('click',function(){
        $('.corrected-mask').fadeOut();
    })

}())