function init() {
   var img = $('img');
   var len = img.length;
   img.each(function (index,ele) {
       $(ele).css({
           'transform':'rotateY('+ (360 / 12) * index +'deg)'+'  translateZ(300px)',
           'transition':'all 1s '+ (len - index - 1)*0.2 + 's'
       })
   })
   bindEvent();
   
}
function bindEvent() {
    var lastX,lastY,newX,newY,disX,disY,rotX=0,rotY=0;
    
    $('.box').on('mousedown',function(e) {
        var timer;
    clearInterval(timer);

          lastX = e.clientX;
          lastY = e.clientY;
         $('body').on('mousemove',function (e) {
              newX = e.clientX;
              newY = e.clientY;
              disX = newX - lastX;
              disY = newY - lastY;
              rotX -= disY * 0.2;
              rotY += disX * 0.2;
              $('.box').css({
                  'transform':'rotateX('+ rotX +'deg)'+ ' rotateY('+ rotY +'deg)'
              });
              lastX = newX;
              lastY = newY;
         });
         $('body').on('mouseup',function () {
            $('body').off('mousemove');
            timer = setInterval(function () {
                console.log('this is interval')
                console.log(disX)
                disX *= 0.98;
                disY *= 0.98;
                console.log(disX)

                rotX -= disY * 0.5;
                rotY += disX * 0.5;
                $('.box').css({
                    'transform':'rotateX('+ rotX +'deg)'+ ' rotateY('+ rotY +'deg)'
                });
                if(Math.abs(disX) < 0.1 && Math.abs(disY) < 0.1){
                    console.log('clear')
                    clearInterval(timer);
                }
            },20)
         })
         return false;
    })
}
init();