(function () {
    function init() {
        // 开始记时
        var manageTimer = UseTime();
        manageTimer.sartTime();
        bindEvent(manageTimer);
        // 测试数据 进度条
        QSpeed(20, 30);

    }
    // 需要标记这是哪个题
    function bindEvent(manageTimer) {
        // 选项事件
        $('.question-option .radio li').on('click', function () {
            $(this).siblings().removeClass('select');
            $(this).addClass('select');
        })
        $('.question-option .checkbox li').on('click', function () {
            if ($(this).hasClass('select')) {
                $(this).removeClass('select');
            } else {
                $(this).addClass('select');
            }
        })

        // 解题思路
        $('.question-think>button').on('click', function () {
            if ($(this).hasClass('up')) {
                $(this).prevAll('.think-detail').slideDown();
                $(this).attr('class', 'down')
                    .text('收起');

            } else if ($(this).hasClass('down')) {
                $(this).prevAll('.think-detail').slideUp();
                $(this).attr('class', 'up')
                    .text('解题思路');
            }

        })
        // 切换题目
        $('.prev').on('click',function(){
            if($('.current-item').prev().length == 0){
                return false;
            }
            $('.current-item').removeClass('current-item').css('display','none').prev('.question-item').addClass('current-item').css('display','block');
        })
        $('.next').on('click',function(){
            if($('.current-item').next().length == 0){
                return false;
            }
            $('.current-item').css('display','none').removeClass('current-item').next('.question-item').addClass('current-item').css('display','block');
        })
        // 暂停
        $('.question-time .time-out').on('click', function () {
            $('.time-out-mask').fadeIn();
            manageTimer.stopTime();
        })
        $('.time-out-mask .goOn-btn').on('click', function () {
            $('.time-out-mask').fadeOut();
            manageTimer.sartTime();
        })
        $('.time-out-mask .close-btn').on('click', function () {
            $('.time-out-mask').fadeOut();
            manageTimer.sartTime();
        })
        // 保存
        $('.question-time .save').on('click', function () {
            $('.save-mask').fadeIn();
            manageTimer.stopTime();
        })
        $('.save-mask .cancel-btn').on('click', function () {
            $('.save-mask').fadeOut();
            manageTimer.sartTime();
        })
        $('.save-mask .close-btn').on('click', function () {
            $('.save-mask').fadeOut();
            manageTimer.sartTime();
        })
        // 交卷
        $('.question-time .submit-btn').on('click', function () {
            var isDone = (function () {
                var $allLi = $('.main-right .answer-card li');
                for (var i = 0; i < $allLi.length; i++) {
                    if (!$($allLi[i]).hasClass('done')) {
                        return false;
                    }
                }
                return true;
            }())
            if (isDone) {
                $('.submit-paper>p').text('确认提交试卷？');
                $('.sub-btn-wrap >button').attr('class', 'check-btn').text('检查');
                $('.sub-btn-wrap a button').attr('class', 'sub-btn bg-red');
            } else {
                $('.submit-paper>p').text('您还有试题未做完');
                $('.sub-btn-wrap>button').attr('class', 'continue  bg-red').text('继续');
                $('.sub-btn-wrap a button').attr('class', 'sub-btn');
            }
            $('.submit-paper-mask').fadeIn();
            manageTimer.stopTime();
        })
        function hiddeMask() {
            $('.submit-paper-mask').fadeOut();
            manageTimer.sartTime();
        }
        $('.submit-paper-mask .check-btn').on('click', function () {
            hiddeMask();
        })
        $('.submit-paper-mask .continue').on('click', function () {
            hiddeMask();
        })
        $('.submit-paper-mask .close-btn').on('click', function () {
            $('.submit-paper-mask').fadeOut();
            manageTimer.sartTime();
        })
        $('.submit-paper-mask .sub-btn').on('click', function () {
            console.log('click sub-btn')
        })
    }


    // 测试进度条，参数为当前已做题目数，总题目数
    function QSpeed(done, titleAll) {
        var wrapWidth = parseInt($('.speed-wrap').css('width'));
        var doneWidth = done / titleAll * wrapWidth;
        $('.now-done').css({
            width: doneWidth + 'px'
        })
    }

    // 记时
    function UseTime() {
        var TimeAll = 0,
            timer;
        var sst = {
            sartTime: function () {
                timer = setInterval(function () {
                    TimeAll++;
                    renderTime(TimeAll)
                }, 1000)
            },
            stopTime: function () {
                clearInterval(timer);
            }
        }
        return sst;
    }
    function renderTime(TimeAll) {
        var hour = parseInt(TimeAll / 3600);
        var min = parseInt((TimeAll - hour * 3600) / 60);
        var sec = TimeAll - hour * 3600 - min * 60;
        var str = bL(hour) + ':' + bL(min) + ':' + bL(sec)
        $('.time-area').text(str);
    }
    function bL(n) {
        return n >= 10 ? n : n = '0' + n;
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

    init();
}())