(function () {
    // 强制阅读
    function read(time) {
        var timer,
            i = time;
        timer = setInterval(function () {
            $('.agreement-btn').text('已阅读并同意签署此协议(' + i + ')');
            i--;
            if (!i) {
                clearInterval(timer);
                $('.agreement-btn').removeAttr("disabled").text('已阅读并同意签署此协议');
            }
        }, 1000)

        // 绑定表单
        $('.test-time').on('click', function () {
            if ($(this).hasClass('shangla')) {
                $('.test-time-ul').slideUp();
                $(this).attr('class', 'xiala test-time')

            }else{
                $('.test-time-ul').slideDown();
                $(this).attr('class', 'shangla test-time')
            }
           
        })
        $('.test-time-ul').on('click', 'li', function () {
            $('.test-time-ul').slideUp();
            $('.test-time').attr('class', 'xiala test-time')
            $('.test-time>input')[0].value = $(this).text();
            return false;
        })
    }
    read(10)
}())