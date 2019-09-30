var allData = [];
function init() {
    var active = document.getElementsByClassName('active')[0];
    initCurShow(active);
    rendTable();
    bindEvent();
 
}
function bindEvent() {
    var menu = document.getElementsByTagName('dl')[0];
    menu.onclick = function (e) {
        var clickName = e.target.tagName;
        if (clickName != 'DD') {
            return false;
        };
        initStyle();
        e.target.classList.add('active');
        initCurShow(e.target);
    };
}
function initStyle() {
    var active = document.getElementsByClassName('active');
    for (var i = 0; i < active.length; i++) {
        active[i].classList.remove('active');
    }
};
function initCurShow(dom) {
    var pageId = dom.getAttribute('data-class');
    var page = document.getElementsByClassName(pageId)[0];
    var content = document.getElementsByClassName('rcontent');
    for (var i = 0; i < content.length; i++) {
        content[i].style.display = 'none';
    }
    page.style.display = 'block';
};

// 向后端存储数据
function changeData(url, param) {
    var result = null;
    var xhr = null;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }
    if (typeof param == 'string') {
        xhr.open('GET', url + '?' + param, false);
    } else if (typeof param == 'object') {
        var str = "";
        for (var prop in param) {
            str += prop + '=' + param[prop] + '&';
        }
        xhr.open('GET', url + '?' + str, false);
    } else {
        xhr.open('GET', url + '?' + param.toString(), false);
    }
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                result = JSON.parse(xhr.responseText);
            }
        }
    }
    xhr.send();
    return result;
}
function rendTable() {
    var data = changeData('http://api.duyiedu.com/api/student/findAll', "appkey=dongmeiqi_1547441744650");
    if (data.status == 'fail') {
        console.log(data.mag);
        return false;
    }
    var tableData = data.data;
    allData = data.data;
    var str = "";
    for (var i = 0; i < tableData.length; i++) {
        str += '<tr>\
        <td>'+ tableData[i].name + '</td>\
        <td>'+ (tableData[i].sex ? '女' : '男') + '</td>\
        <td>'+ tableData[i].sNo + '</td>\
        <td>'+ tableData[i].email + '</td>\
        <td>'+ tableData[i].address + '</td>\
        <td>'+ tableData[i].phone + '</td>\
        <td>'+ (new Date().getFullYear() - tableData[i].birth) + '</td>\
        <td>\
            <button class="btn add" data-index='+ i + '>编辑</button>\
            <button class="btn del" data-index='+ i + '>删除</button>\
        </td>\
    </tr>'
    };
    var studentInfo = document.getElementsByClassName('studentInfo')[0];
    studentInfo.innerHTML = str;
    addBindEvent();
};
function addBindEvent() {
    var addBtn = document.getElementsByClassName('add');
    var mask = document.getElementsByClassName('mask')[0];
    var delBtn = document.getElementsByClassName('del');
    for (var i = 0; i < addBtn.length; i++) {
        addBtn[i].onclick = function () {
            mask.classList.add('maskActive');
            var index = this.getAttribute('data-index');
            initEditForm(allData[index]);
        }
        delBtn[i].onclick = function () {
            var index = this.getAttribute('data-index');
            var IsDel = window.confirm('是否删除');
            if(!IsDel){
                return false;
            }
             var result = changeData('http://api.duyiedu.com/api/student/delBySno',{
                 appkey:'dongmeiqi_1547441744650',
                 sNo:allData[index].sNo
             });
             if(result.status === 'success'){
                alert('删除成功');
                rendTable();
             }else{
                 alert(result.mag);
             }
        } 
    }

    var editForm = document.getElementsByClassName('editForm')[0];
    editForm.onclick = function (e) {
        e.stopPropagation();
    }
    mask.onclick = function () {
        mask.classList.remove('maskActive');
    }
    var submitBtn = document.getElementsByClassName('submitBtn')[0];
    submitBtn.onclick = function (e) {
        e.preventDefault();
        var editForm = document.getElementsByClassName('edit-form')[0];
        var obj = Object.assign({
            appkey: 'dongmeiqi_1547441744650'
        }, getFormInfo(editForm));
        console.log(getFormInfo(editForm));
        // 保存数据
        var result = changeData('http://api.duyiedu.com/api/student/updateStudent', obj);
        if(result.status == 'success'){
            rendTable();
            alert('修改成功');
            editForm.reset();
            mask.classList.remove('maskActive');
        }else{
            alert(result.mag);
        }
    }
    //新增学生
    var newAdd = document.getElementsByClassName('newAddBtn')[0];
    var newAddForm = document.getElementsByClassName('newAddForm')[0];
    newAdd.onclick = function (e) {
        e.preventDefault();
        var addStudentInfo = getFormInfo(newAddForm);
        var jumpList = document.getElementsByTagName('dd')[0];
        addStudentInfo.appkey = 'dongmeiqi_1547441744650';
        var result = changeData('http://api.duyiedu.com/api/student/addStudent',addStudentInfo);
        console.log(result);
        if(result.status === 'success'){
            alert('添加成功june');
            jumpList.click();
            rendTable();
        }else{
            alert(result.msg);
        }

    }
}
function initEditForm(data) {
    var editForm = document.getElementsByClassName('edit-form')[0];
    for (var prop in data) {
        if (editForm[prop]) {
            editForm[prop].value = data[prop];

        }
    }
}
function getFormInfo(form) {
    var student = {};
    student.name = form.name.value;
    student.sex = form.sex.value;
    student.sNo = form.sNo.value;
    student.email = form.email.value;
    student.birth = form.birth.value;
    student.phone = form.phone.value;
    student.address = form.address.value;
    return student;
}




init();
