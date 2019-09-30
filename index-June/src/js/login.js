(function () {
    function init() {
        switchMenu();
        // clickLogin();
    }
    function switchMenu() {
        // $('.lr-mask').on('mouseenter',function (e) {
        //    return false;
        // })
        // 清除滑动位置与起样式
        function clearDrag() {
            $('.drag-btn').css({
                left: 0,
                borderColor: '#999',
                color: '#999'
            }).removeAttr('disabled')
                .css({
                    backgroundPosition: '-1px -23px'
                });
            $('.drag-wrap>i').css({
                width: '38px'
            }).text("");
            $('.disable-btn').attr('disabled', ' true')
        }
        // 以下为切换功能
        $('.password-form .password-login').on('click', function () {
            clearDrag();
            $('.password-form .wx-login').removeClass('select');
            $(this).addClass('select');
            $('.password-form .wechat-login').css({
                display: 'none',
            });
            $('.wechat-ewm>img').css({
                opacity: 0
            })
            $('.login').fadeIn();
        })
        $('.password-form .wx-login').on('click', function () {
            $('.password-login').removeClass('select');
            $(this).addClass('select');
            $('.login').fadeOut();
            $('.password-form .wechat-login').fadeIn(function () {
                $('.wechat-ewm>img').css({
                    opacity: 1
                })
            });
        })
        $('.message-form .mes-login').on('click', function () {
            clearDrag();
            $('.message-form .wx-login').removeClass('select');
            $(this).addClass('select');
            $('.message-form .wechat-login').css({
                display: 'none'
            });
            $('.wechat-ewm>img').css({
                opacity: 0
            });
            $('.message-login').fadeIn();
        })
        $('.message-form .wx-login').on('click', function () {
            $('.message-form .mes-login').removeClass('select');
            $(this).addClass('select');
            $('.message-login').fadeOut();
            $('.message-form .wechat-login').fadeIn(function () {
                $('.wechat-ewm>img').css({
                    opacity: 1
                })
            });
        })
        $('.message-btn').on('click', function (e) {
            clearDrag();
            e.preventDefault();
            $('.password-form').fadeOut();
            $('.message-form').fadeIn();
        })
        $('.pw-btn').on('click', function (e) {
            clearDrag();
            e.preventDefault();
            $('.message-form').fadeOut();
            $('.password-form').fadeIn();

        })
        $('.forget-btn').on('click', function (e) {
            clearDrag();
            e.preventDefault();
            $('.password-form').fadeOut();
            $('.retrieve-form').fadeIn();

        })
        $('.login-btn').on('click', function (e) {
            clearDrag();
            e.preventDefault();
            $('.retrieve-form').fadeOut();
            $('.register-form').fadeOut();
            $('.password-form').fadeIn();

        })
        $('.register-btn').on('click', function (e) {
            clearDrag();
            e.preventDefault();
            $('.message-form').fadeOut();
            $('.password-form').fadeOut();
            $('.register-form').fadeIn();

        })
        // 当输入框聚焦时，产生的动作
        $('input.clear-msg').on('focus', function () {
            clearMsg(this);
        })
        $('input[type=password]').on('focus', function () {
            $(this).prev().css('display', 'block')
        })
        $('input[type=password]').on('blur', function () {
            $(this).attr('type', 'password');
        })
        // 绑定拖拽
        $('.drag-btn').on('mousedown', function (e) {
            e.preventDefault();
            var selfX = $(this).width();
            var disX = e.clientX - this.offsetLeft;
            var self = this;
            $(document).on('mousemove', function (e) {
                e.preventDefault();
                var newLeft = e.clientX - disX;
                var dragX = parseInt($('.drag-wrap').width()) - selfX;
                if (newLeft > 0 && newLeft < dragX) {
                    $(self).css({
                        left: newLeft + 'px'
                    })
                    $('.drag-wrap>i').css({
                        width: newLeft + selfX + 'px'
                    })
                } else {
                    $(document).unbind('mousemove');
                    $(document).unbind('mouseup')
                    checkDrag($(self).data('handle'));
                }
            })
            $(document).on('mouseup', function () {
                $('.drag-wrap').unbind('mousemove');;
                $(this).unbind('mouseup')
            })
        })
        // 检查滑动，监听滑动位置，调用解禁的按钮 验证不通过需不需呀换图标
        function checkDrag(handle) {
            var nowLeft = parseInt($('.drag-wrap>i').css('width'));
            if (nowLeft > 280) {
                $('.drag-wrap>i').css({
                    width: '295px'
                }).text('验证不通过')
                $('.drag-btn').css({
                    left: '260px',
                    borderColor: '#f85c5b',
                    color: '#f85c5b'
                }).attr('disabled', "true")
                if (handle == 'message') {
                    if (checkPhone(handle)) {
                        activationState(handle, 'cancel')
                        $('.drag-wrap>i').text('验证通过')
                        $('.drag-btn').css({
                            backgroundPosition: '-42px -23px'
                        })
                    }
                } else {
                    if (checkPhone(handle) && checkPassword(handle)) {
                        $('.drag-wrap>i').text('验证通过')
                        activationState(handle)
                        $('.drag-btn').css({
                            backgroundPosition: '-42px -23px'
                        })
                    }
                }
            }

        }
        // 验证手机号码  /s/.test()
        // 提示信息的msg类为'.' + handle +'-phone-msg' 命名为 XX-phone-msg
        function checkPhone(handle) {
            var phone = document.getElementById(handle + '-phone').value;
            if (!(/^1[3456789]\d{9}$/.test(phone))) {
                $('.' + handle + '-phone-msg').text('请输入正确的手机号码');
            } else {
                console.log(('.' + handle + '-form' + ' .getyzm'))
                $('.' + handle + '-form' + ' .getyzm').removeAttr('disabled');
                return true;
            }
            return false;
        }
        // 验证密码长短与是否包含空格login-password
        function checkPassword(handle) {
            var password = document.getElementById(handle + '-password').value;
            if (password.length >= 6 && password.length <= 16 && !(password.indexOf(' ') >= 0)) {
                return true;
            } else {
                $('.' + handle + '-password-msg').text('请输入6-16位密码，区分大小写，不能输入空格');
            }
            return false;
        }
        // 激活状态
        function activationState(handle) {
            $('#' + handle + '-btn').removeAttr('disabled')
            if (arguments[1] == 'cancel') {
                $('.' + handle + '-drag-msg').text("");
            }

        }
        // 聚焦清除相应的msg 
        // 不能改变msg在所提示的存在问题的input位置
        function clearMsg(dom) {
            $(dom).next().text("");
            clearDrag();
        }
        // 验证码 后台请求调用函数
        $('.getyzm').on('click', function () {
            // 调用后台可以利用data属性标记
            var self = this;
            var i = 60;
            var timer = setInterval(function () {
                i--;
                $(self).text("重新发送" + "(" + i + ")").attr('disabled', 'true');;
                if (!i) {
                    clearInterval(timer);
                    $(self).text("重新发送").removeAttr('disabled');
                }
            }, 1000)

        })

        // 重置密码成功5s自动收回等待调用,重置密码成功调用
        function resetPw() {
            var i = 6;
            var timer = setInterval(function () {
                i--;
                $('#resetPw').text("完成" + "(" + i + ")");
                if (!i) {
                    clearInterval(timer);
                    $('#resetPw').text("完成");
                    $('.lr-mask').fadeOut();

                }
            }, 1000)
        }
        // 密码可见
        // 改变结构可能会失效
        $('.show-password').on('click', function () {
            if ($(this).next().attr('type') == 'password') {
                $(this).next().attr('type', 'text');
                $(this).css({
                    backgroundPosition: "-74px 0"
                })
            } else {
                $(this).next().attr('type', 'password');
                $(this).css({
                    backgroundPosition: "-56px 0"
                })
            }
        })
        // close 按钮
        $('.close').on('click', function () {
            clearDrag();
            // clearMsg();
            $('.password-form').fadeOut();
            $('.register-form').fadeOut();
            $('.login-area', parent.document).css({
                display: 'none'
            });
        })
    }
    init();
})()