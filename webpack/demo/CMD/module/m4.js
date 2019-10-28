define(function(require,exports,module){
    let msg = 'this is m4';
    //同步加载
    let m2  = require('./m2');
    console.log(m2)
    // 异步加载
    require.async('./m3',function(m3){
        console.log(m3.msg)
    })
    // 异步加载
    require.async('./m1',function(m1){
        console.log(m1)
    })
    return msg
})