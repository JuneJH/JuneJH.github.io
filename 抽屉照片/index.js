$('.item').on('click',function(){
    $('.wrapper').addClass('wrapper-active');
    $('.item').removeClass('active');
    $(this).addClass('active');
})
$('.close').on('click',function() {
    $('.wrapper').removeClass('wrapper-active');
    $('.item').removeClass('active');
    return false;
    

})