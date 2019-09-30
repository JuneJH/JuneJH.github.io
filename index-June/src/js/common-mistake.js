(function (){
    //重新绑定事件，清空items，按照模板渲染
    $('.detail-nav button').on('click',function (){
        $('.detail-nav button').removeClass('select');
        $(this).addClass('select')
    })
}())