var tableAllData = null;
var newPage = 1;
var size = 15;
var serchKey = null;
function init() {
    bindViewEvent();
    $('.active').eq(0).trigger('click');

}
function bindViewEvent() {
    var timer = '';
    $('.nav-btn').on('click', 'dd', function () {
        clearTimeout(timer);
        $('.nav-btn > dd').removeClass('active');
        $(this).addClass('active');
        var dataClass = $(this).attr('data-class');
        $('.rcontent').fadeOut(500);
         timer = setTimeout(function () {
            $('.' + dataClass).fadeIn();
        }, 500)
       

        getData(newPage);

    });
    $('.editForm').on('click', function (e) {
        e.stopPropagation();
    });
    $('.submitBtn').on('click', function (e) {
        e.preventDefault();
        var formData = $('.edit-form').serialize();
        ajaxData('http://api.duyiedu.com/api/student/updateStudent', formData, function (data) {
            alert('修改成功');
            $('.active').eq(0).trigger('click');
        });
        $('.mask').slideUp();
    });
    $('.newAddBtn').on('click', function (e) {
        e.preventDefault();
        var newData = $('.newAddForm').serialize();
        ajaxData('http://api.duyiedu.com/api/student/addStudent', newData, function () {
            alert('添加成功');
            $('.newAddForm')[0].reset();
            $('.nav-btn>dd').eq(0).trigger('click');
        })


    })
    $('.serch-btn').on('click', function () {
        serchKey = $('.serch-input').val();
        if (!serchKey) {
            getData(newPage);
            return false;
        }
        searchKey(newPage);
    })
};
function searchKey(page) {

    ajaxData('http://api.duyiedu.com/api/student/searchStudent', { sex: -1, search: serchKey, page: page, size: size }, function (data) {
        $('.turn-page').paging({
            curPage: page,
            allPage: Math.ceil(data.data.cont / size),
            callback: function (newPage) {
                newPage = newPage;
                searchKey(newPage);
            }
        });
        rendTable(data.data.searchList);

    })

}
function getData(page) {
    ajaxData('http://api.duyiedu.com/api/student/findByPage', { page: page, size: size }, function (data) {
        $('.turn-page').paging({
            curPage: page,
            allPage: Math.ceil(data.data.cont / size),
            callback: function (newPage) {
                newPage = newPage;
                getData(newPage);
            }
        });
        rendTable(data.data.findByPage);

    })


}
function rendTable(data) {
    var tableData = data;
    tableAllData = data;
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
    $('.studentInfo').html(str);
    bindBtnEvent();
}

function bindBtnEvent() {
    $('.add').on('click', function () {
        var editIndex = $(this).index();
        initEditForm(tableAllData[editIndex]);
        $('.mask').slideDown();
    });
    $('.mask').on('click', function () {
        $(this).slideUp();
    });
    $('.del').on('click', function () {
        var delIndex = $(this).data('index');
        var delData = { sNo: tableAllData[delIndex].sNo };
        var isDel = confirm('确认删除');
        if (isDel) {
            ajaxData('http://api.duyiedu.com/api/student/delBySno', delData, function () {
                alert('删除成功');
                $('.active').eq(0).trigger('click');
            })
        }
    })

}
function initEditForm(data) {
    var editForm = document.getElementsByClassName('edit-form')[0];
    for (var prop in data) {
        if (editForm[prop]) {
            editForm[prop].value = data[prop];

        }
    }
}
function ajaxData(url, data, callback) {
    if ($.type(data) != "string") {
        data.appkey = 'dongmeiqi_1547441744650';
    } else {
        data += '&appkey=dongmeiqi_1547441744650'
    }
    $.ajax({
        type: 'get',
        url: url,
        data: data,
        dataType: 'json',
        success: function (req) {
            if (req.status == 'success') {
                callback(req);
            } else {
                alert(req.msg);
            }
        }

    })

}
init();

