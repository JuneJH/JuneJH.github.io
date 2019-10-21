

// 请求后端数据  参数: 请求方式， 请求的地址， 请求参数， 是否异步， 回调函数
function ajax(method, url, data, flag, cb) {
    var xhr = null;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }
    if (method = 'GET') {
        xhr.open(method,url + '?' + data, flag);
        xhr.send();
    } else {
        xhr.open(method, url, flag);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.send(data);
    }
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                cb(xhr.responseText);
            }
        }
    }
}
