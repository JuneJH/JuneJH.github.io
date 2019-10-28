(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
module.exports = {
    name:'m1',
    foo:function(){
        return this.name
    }
}
},{}],2:[function(require,module,exports){
module.exports = function () {
        return 'm2'
}
},{}],3:[function(require,module,exports){
exports.foo = function () {
    return 'm3'
}
},{}],4:[function(require,module,exports){
let m1 = require('./commonJS/m1')
let m2 = require('./commonJS/m2')
let m3 = require('./commonJS/m3')

console.log(m1.foo(),m2(),m3.foo())    
},{"./commonJS/m1":1,"./commonJS/m2":2,"./commonJS/m3":3}]},{},[4]);
