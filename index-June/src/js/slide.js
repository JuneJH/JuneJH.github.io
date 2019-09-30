(function () {
    function init(){
        autoMove();
        bindEvent();
    }
    function bindEvent(){
         // 下拉锚点
    $(document).scroll(function () {
        var sTop =1 + $(this).scrollTop();
        if(sTop < ($('#subject').offset().top - 1) +($('#subject').height() - 1) ){
            $('.point>a').removeClass('select')
            .eq(0).addClass('select');
        }else if(sTop < ($('#method').offset().top - 1) + ($('#method').height() - 1)){
            $('.point>a').removeClass('select')
            .eq(1).addClass('select');
        }else if(sTop < ($('#honor').offset().top - 1) + ($('#honor').height() - 1)){
            $('.point>a').removeClass('select')
            .eq(2).addClass('select');
        }else if(sTop < ($('#bkw').offset().top - 1) + ($('#bkw').height() - 1)){
            $('.point>a').removeClass('select')
            .eq(3).addClass('select');
        }
    })
    }
    function move(index){
        $('.play-ul>li').fadeOut().eq(index).fadeIn();
    }
    function autoMove(index){
        var index = 0;
        setTimer(index);
        var timer;
        $('.slide-index>span').on('click',function () {
            index = $(this).index();
             move(index);
             update(index)
         }).on('mouseenter',function () {
            clearInterval(timer);
        }).on('mouseleave',function () {
            setTimer(index);   
        })
        function setTimer(){
            timer = setInterval(function() {
                index ++;
                index = index % 4;
                move(index);
                update(index);
            },2000)
        }
      
      
        
    }
    function update(index){
        $('.slide-index>span').removeClass('select').eq(index).addClass('select');
    }
    init();
})()