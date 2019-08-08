$.fn.extend({
    pullpage: function (config) {
        //初始化变量
        var initStyle = {
            width: '100%',
            height: '100%'
        };
        var colorArry = config.color;
        var $W = $(this),
            $S = $W.find('.section');
            //相差17不了解
        var clinetW = $(window).outerWidth(),
            clinetH = $(window).outerHeight();
            var clientHeight = $(window).outerHeight();
            // console.log(clientHeight);
            // console.log($(window).outerHeight());
        var lock = true;
        // var curShow = 0;
        var pageIndex = 0;


        //初始化样式
        $('html')
            .add('body')
            .css({
                padding: '0px',
                margin: '0px',
                position: 'relative',
                overflow: 'hidden',
            })
            .add($W)
            .add($S)
            .css(initStyle);
        $W.css({
            position: 'absolute',
            top: '0px',
            left: '0px'
        })
            .find('.section').each(function (index, ele) {
                $(ele).css({
                    backgroundColor: colorArry[index],
                    position: 'relative'
                })
                    .find('.slide')
                    .css({
                        float: 'left',
                        width: clinetW,
                        height: clinetH,
                        position: 'relative'
                    })
                    .wrapAll('<div class="slideWrap"></div>')

            });
        $S.find('.slideWrap').each(function (index, ele) {
            $(ele).css({
                width: $(ele).find('.slide').size() * clinetW,
                height: clinetH,
                position: 'absolute',
                top: '0px',
                left: '0px',

            })
        });

        //控制移动
        var newTop = 0,
            newLeft = 0;
        $S.eq(0).addClass('active')
            .end()
            .find('.slideWrap')
            .each(function (index, ele) {
                $(ele).find('.slide').eq(0).addClass('innerActive');
            });
        $(document).on('keydown', function (e) {


            if (e.which == 38 || e.which == 40) {
                if (lock) {

                    lock = false;
                    var diration = null;

                    //垂直移动   $W
                    if (e.which == 38 && pageIndex) {
                        diration = 'top';
                        config.leave(pageIndex, diration)
                        pageIndex--;
                        newTop += clinetH;
                    } else if (e.which == 40 && pageIndex != $W.find('.section').size() - 1) {
                        diration = 'down';
                        config.leave(pageIndex, diration)
                        pageIndex++;
                        newTop -= clinetH;
                    };

                    $W.animate({
                        top: newTop
                    }, 300, 'swing', function () {
                        lock = true;
                        $W.find('.section').eq(pageIndex).addClass('active');
                        if (diration == 'top') {
                            config.afterload(pageIndex, diration);
                            $W.find('.section').eq(pageIndex + 1).removeClass('active');
                        } else {
                            config.afterload(pageIndex, diration);

                            $W.find('.section').eq(pageIndex - 1).removeClass('active');
                        }
                    });
                }
            }


            if (e.which == 39 || e.which == 37) {
                if (lock) {
                    lock = false;
                    //$S ----> slideWrap n----->innerActive
                    var $SS = $('.active').find('.slideWrap');
                    if ($SS.length < 1) {
                        lock = true;
                        console.log('meiyou');
                        return;
                    }
                    var $curshow = $SS.find('.innerActive');
                    var diration = null;
                    newLeft = $SS.offset().left;
                    if (e.which == 37 && $curshow.index()) {
                        diration = 'left';
                        newLeft += clinetW;
                        config.levelgo($curshow.index());
                    } else if (e.which == 39 && $curshow.index() != $SS.find('.slide').size() - 1) {
                        diration = 'right';
                        newLeft -= clinetW;
                        config.levelgo($curshow.index());
                    }
                    $SS.animate({
                        left: newLeft
                    }, 500, 'swing', function () {
                        lock = true;
                        diration != null ? $curshow.removeClass('innerActive') : '';
                        if (diration == 'left') {
                            $curshow.prev().addClass('innerActive');
                            config.levelcome($SS.find('.innerActive').index());
                        } else {
                            $curshow.next().addClass('innerActive');
                            config.levelcome($SS.find('.innerActive').index());

                        }
                    })

                }
            }










        })

    },
})
