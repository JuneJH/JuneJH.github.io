
function init() {
   bindEvent();
}
function bindEvent(){
    $('.inp').keyup(function (e){
       if(e.keyCode == 13){
           $('.btn').trigger('click')
       }
    });
    $('.btn').on('click',function () {
        var val = $('.inp').val();
        addDom('mine',val);
        $('.inp').val('');
        getMsg(val);
    })  
}
function addDom(who,val){
    $(' <div class="'+ who +'">\
    <div class="headeImg"></div>\
    <div class="text">'+ val +'</div>\
     </div>').appendTo($('.contents-box'));
     $('.contents-box').scrollTop($('.contents-box')[0].scrollHeight)
} 
function getMsg(val) {
    $.ajax({
        url:'http://api.duyiedu.com/api/chat/sendMsg',
        method:'GET',
        dataType:'json',
        data:{
            appkey: 'dongmeiqi_1547441744650',
            msg: val
        },
        success:function (res) {
           console.log(res);
           if(res.status == 'success'){
               addDom('robot',res.data.text)
           }
        }

    })
}

init();