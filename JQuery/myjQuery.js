(function () {
    function jQuery(selector) {
        return new jQuery.prototype.init(selector);
    }
    jQuery.prototype.init = function (selector) {
        // 选出dom 并且包装jquery对象 
        this.myname = 'june';
        this.length = 0;
        if (selector == null) {
            return this;
        }
        if (typeof selector == "string" && selector.indexOf('.') != -1) {
            var dom = document.getElementsByClassName(selector.slice(1));
        } else if (typeof selector == "string" && selector.indexOf('#') != -1) {
            var dom = document.getElementById(selector.slice(1));
        }
        if (selector instanceof Element || dom.length == undefined) {
            this[0] = selector || dom;
            this.length++;
        } else {
            for (var i = 0; i < dom.length; i++) {
                this[i] = dom[i];
                this.length++;
            }
        }
    }
    // 不能通过id来修改出现的bug未修复
    jQuery.prototype.css = function (cssobj) {
        for (var i = 0; i < this.length; i++) {
            for (var attr in cssobj) {
                this[i].style[attr] = cssobj[attr];
            }

        }
        return this;//链式调用精髓
    }
    //[].slice目前还不会

    jQuery.prototype.get = function (num) {
        return num == undefined ? [].slice.call(this, 0) : (num >= 0 ? this[num] : this[this.length + num]);
    }
    jQuery.prototype.eq = function (num) {


        return jQuery(num == undefined ? null : (num >= 0 ? this[num] : this[this.length + num]));
    }
    jQuery.prototype.myQueue = function (type, handle) {
        var self = this;
        var type = arguments[0] || 'fx';
        var handleFun = arguments[1] || null;
        var len = arguments.length;
        if (len == 1) {
            return self[0][type];
        }
        self[0][type] == undefined ? self[0][type] = [handleFun] : self[0][type].push(handleFun);
        return this;
    }
    jQuery.prototype.myDequeue = function (type) {
        var self = this;
        var type = arguments[0] || 'fx';
        var queueArry = this.myQueue(type);
        var currFunc = queueArry.shift();
        if (currFunc == undefined) {
            return;
        }
        var next = function () {
            self.myDequeue(type);
        }
        currFunc(next);
        return this;
    }


    //实现callbacks
    jQuery.myCallback = function () {
        //记录参数 once memory unique
        var para = arguments[0] || '';
        //记录执行方法列表
        var list = [];
        //记录执行状态
        var args = [];
        var clok = false;
        var funcIndex = 0;
        var fire = function () {
            for (; funcIndex < list.length; funcIndex++) {
                clok = true;
                list[funcIndex].apply(window, args);
            }
            if (para.indexOf('once') != -1) {
                list = [];
                funcIndex = 0;
            }
        }
        return {
            add: function () {
                list.push(arguments[0]);
                if (para.indexOf('memory') != -1 && clok) {
                    fire();
                }
                return this;
            },
            fire: function () {
                funcIndex = 0;
                args = arguments;
                clok = true;
                fire();

            }
        }
    }

    //实现deferred
    jQuery.myDeferred = function () {
        //存放deferred的状态
        var arr = [
            [
                jQuery.myCallback('once memory'), 'resolve', 'done'
            ],
            [
                jQuery.myCallback('once memory'), 'reject', 'fail'
            ],
            [
                jQuery.myCallback('memory'), 'progress', 'notify'
            ]
        ];

        

    }






    jQuery.prototype.init.prototype = jQuery.prototype;
    window.$ = window.jQuery = jQuery;
})();













// jQuery使用-精髓
//     选择元素
//     循环操作
//     链式调用
// jQuery库  封闭作用域    闭包