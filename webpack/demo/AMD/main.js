(function () {
    // 依赖前置
    require.config({
        paths: {
            m2: './module/m2',
            m1: './module/m1',
            jquery: './jquery'
        }
    })
    // jquery必须用这个字段，源码中
    /*
            if ( typeof define === "function" && define.amd ) {
                define( "jquery", [], function() {
                    return jQuery;
                 });
            }
    */
    require(['m1', 'm2', 'jquery'], function (m1, m2, $) {
        console.log(m1, m2, $)
    })
})()