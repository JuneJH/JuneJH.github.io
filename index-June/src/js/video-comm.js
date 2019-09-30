var videoController = (function () {
    // 视频
    $('.vedio-box').on('click', function () {
        $('.video-mask').fadeIn();
    })
    $('.video-mask .close-btn').on('click', function () {
        $('.video-mask').fadeOut();
        $('.myVideo')[0].pause();
    })

    var Ovideo = $('.myVideo')[0];
    Ovideo.ondurationchange = function () {
        $('.all-time').text(initTime(Ovideo.duration));
    }
    //控制器出现
    var switchController = (function () {
        var controllerTimer;
        function show() {
            clearTimeout(controllerTimer);
            $('.video-controller').css({ bottom: '0px' });
            $('.p-bar-head').css({ display: 'none' })
            $('.p-bar-head').css({ display: 'block' })
        }
        function hide() {
            $('.p-bar-head').css({ display: 'none' })
            $('.video-controller').css({ bottom: '-50px' });
        }
        return [show, hide]
    }())
    //初始化
    vol();
    playingTime();
    Ovideo.volume = 0.5;
    function playingTime() {
        setInterval(function () {
            $('.curr-time').text(initTime(Ovideo.currentTime))
        }, 1000)
    }
    $('.play-btn').on('click', function () {
        // $('.all-time').text(initTime(Ovideo.duration));
        if ($(this).hasClass('pause')) {
            Ovideo.play();
            $(this).removeClass('pause').addClass('play')
        } else {
            Ovideo.pause();
            $(this).removeClass('play').addClass('pause')
        }
    })
    // 进度条
    playingBar()
    bindDrag($('.p-bar-head')[0], $('.p-bar')[0], 'progress-bar', function (curr, Maxbar) {
        Ovideo.currentTime = curr / Maxbar * Ovideo.duration
    });
    function playingBar() {
        var curr = 0;
        setInterval(function () {
            var MaxBar = parseInt($('.progress-bar').width()) - parseInt($('.p-bar-head').width());
            curr = MaxBar * (Ovideo.currentTime / Ovideo.duration)
            $('.p-bar-head')[0].style.left = curr + 'px';
            $('.p-bar')[0].style.width = curr + 'px';
        }, 30)
    }
    //音量
    function vol() {
        var currVol = 0.5;
        $('.vol-btn').on('click', function () {
            if (Ovideo.volume > 0) {
                console.log('close')
                Ovideo.volume = 0;
                $(this).addClass('mute')
            } else {
                console.log('open')
                Ovideo.volume = currVol
                $(this).removeClass('mute')
            }
        })
        function volCb(newX, maxVol) {
            if (Math.abs(newX / maxVol) == 0) {
                $('.vol-btn').addClass('mute')
            } else {
                $('.vol-btn').removeClass('mute')
            }
            Ovideo.volume = Math.abs(newX / maxVol);
            currVol = Ovideo.volume;
        }
        bindDrag($('.bar-head')[0], $('.bar')[0], 'vol-bar', volCb);
    }
    //    倍速
    $('.speed-btn').on('click', function () {
        if ($('.speed-opention').hasClass('show')) {
            $('.speed-opention').slideUp().removeClass('show');
        } else {
            $('.speed-opention').slideDown().addClass('show');
        }
    })
    $('.speed-opention>ul').on('click', 'li', function () {
        var speedValue = $(this).text();
        Ovideo.playbackRate = speedValue == '正常' ? 1 : parseFloat(speedValue)
        $(this).addClass('select').siblings().removeClass('select')
        $('.speed-btn').text(speedValue)
        $('.speed-opention').slideUp().removeClass('show');

    })
    // 选择高清
    $('.definition-choes>ul').on('click', 'li', function () {
        $(this).addClass('select').siblings().removeClass('select')
        $('.definition-btn').text($(this).text())
        $('.definition-choes').slideUp().removeClass('show');
    })
    $('.definition-btn').on('click', function () {
        if ($('.definition-choes').hasClass('show')) {
            $('.definition-choes').slideUp().removeClass('show');
        } else {
            $('.definition-choes').slideDown().addClass('show');
        }
    })

    // 全屏
    function FullScreen(ele) {
        $(ele).addClass('full')
        if (ele.requestFullscreen) {
            ele.requestFullscreen();
        } else if (ele.mozRequestFullScreen) {
            ele.mozRequestFullScreen();
        } else if (ele.webkitRequestFullScreen) {
            ele.webkitRequestFullScreen();
        }
    }
    //退出全屏
    function exitFullscreen(ele) {
        var de = document;
        if (de.exitFullscreen) {
            de.exitFullscreen();
        } else if (de.mozCancelFullScreen) {
            de.mozCancelFullScreen();
        } else if (de.webkitCancelFullScreen) {
            de.webkitCancelFullScreen();
        }
    }
    $('.video-full-btn').on('click', function () {
        if ($('.video-area').hasClass('full')) {
            exitFullscreen($('.video-area')[0])
        } else {
            FullScreen($('.video-area')[0])
        }
    })
    Ovideo.ondblclick = function () {
        if ($('.video-area').hasClass('full')) {
            exitFullscreen($('.video-area')[0])
        } else {
            FullScreen($('.video-area')[0])
        }
    }
    var isFull = false;
    $(document).on('fullscreenchange', function () {
        isFull = isFull === true ? false : true;
        if (!isFull) {
            $('.video-area').removeClass('full');
        }
    })

    function initTime(time) {
        if (isNaN(time)) {
            return "00:00:00"
        }
        var h, m, s;
        h = parseInt(time / 3600);
        m = parseInt((time - h * 3600) / 60);
        s = parseInt(time - h * 3600 - m * 60);
        return bl(h) + ':' + bl(m) + ':' + bl(s)
    }
    function bl(data) {
        return data > 9 ? '' + data : '0' + data;
    }
    function bindDrag(dom, bar, range, cb) {
        var dix, rangeValue;
        // $('.' + range).on('click', function (e) {
        //     rangeValue = parseInt($('.' + range).width());
        //     var event = e || window.event;
        //     var newX = event.clientX - $(this)[0].offsetLeft - $(dom).width();
        //     if (newX >= -1 && newX < rangeValue) {
        //         dom.style.left = newX + 'px';
        //         bar.style.width = newX + parseInt($(dom).width()) / 2 + 'px';
        //         cb(newX, rangeValue)
        //     }
        // })
        dom.onmousedown = function (e) {
            rangeValue = parseInt($('.' + range).width()) - parseInt($(dom).width());
            console.log(rangeValue)
            var event = e || window.event;
            dix = event.clientX - dom.offsetLeft;
            document.onmousemove = function (e) {
                var event = e || window.event;
                var newX = event.clientX - dix;
                console.log(newX)
                if (newX >= -1 && newX < rangeValue) {
                    dom.style.left = newX + 'px';
                    bar.style.width = newX + parseInt($(dom).width()) / 2 + 'px';
                    cb(newX, rangeValue)
                } else {
                    document.onmousemove = null;
                }
            }
            document.onmouseup = function (e) {
                document.onmousemove = null;
            }
        }
    }
    // 键盘事件
    $(document).keydown(function (e) {
        e = e || window.event;
        if (e.keyCode == 32) {

        } else if (e.keyCode == 38 || e.keyCode == 40) {
            if (e.keyCode == 38) {
                Ovideo.volume < 0.9 ? Ovideo.volume = Ovideo.volume + 0.1 : Ovideo.volume = 1;
            } else {
                Ovideo.volume > 0.1 ? Ovideo.volume -= 0.1 : Ovideo.volume = 0;
            }
            var newX = Ovideo.volume / 1 * parseInt($('.vol-bar').width()) - parseInt($('.bar-head').width()) / 2
            $('.bar-head').css({
                left: newX + 'px'
            })
            $('.bar').css({
                width: newX + 2 + 'px'
            })
            if (Ovideo.volume == 0) {
                $('.vol-btn').addClass('mute')
            } else {
                $('.vol-btn').removeClass('mute')
            }
        } else if (e.keyCode == 37 || e.keyCode == 39) {
            if (e.keyCode == 37) {
                Ovideo.currentTime > 1 ? Ovideo.currentTime = Ovideo.currentTime - 1 : Ovideo.currentTime = 0;
            } else {
                Ovideo.currentTime <= Ovideo.duration ? Ovideo.currentTime = Ovideo.currentTime + 1 : Ovideo.currentTime = Ovideo.duration;
            }
        }
    })
    //监听鼠标
    var cuosor = (function () {
        var isMove = false,
            timer = null;
        Ovideo.onmousemove = function () {
            clearTimeout(timer)
            ismove = false;
            $('.video-area').css({
                cursor: 'default'
            })
            switchController[0]();
            $('.video-controller').on('mouseenter', function () {
                clearTimeout(timer)
            })
            timer = setTimeout(function () {
                isMove = true;
                $('.video-area').css({
                    cursor: 'none'
                })
                switchController[1]();
            }, 2000)
        }
    }())
}())