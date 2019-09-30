(function (){
    function init(){
        switchTab ();
        autoTeacher()
    }
    // tab切换
    function switchTab (){
        $('.main-left-nav>span').on('click',function(){
              $('.main-left-content>div').removeClass('select')
              .eq($(this).index()).addClass('select');
              $('.main-left-nav>span').removeClass('select')
              $(this).addClass('select');
        })
    }
    //老师信息展示
    function autoTeacher(){
        bindEvent();
        var index = 0;
       var timer = setInterval(function (){
              index ++;
              index = index % 3;
              move(index);
              changeStyle(index);

        },1500)
        function bindEvent(){
            $('.banner-tab>span').on('mouseenter',function(){
                clearInterval(timer);
            }).on('mouseleave',function (){
                autoTeacher();
            })
            $('.banner-tab>span').on('click',function() {
               var i = $(this).index();
               changeStyle(i);
               move(i);
            })
        }
        function changeStyle(i){
            $('.banner-tab>span').removeClass('select')
            .eq(i).addClass('select');   
        }
        function move(i){
            $('.teacher-info').removeClass('select')
            .eq(i).addClass('select');   
        }
    }
    init();
})()