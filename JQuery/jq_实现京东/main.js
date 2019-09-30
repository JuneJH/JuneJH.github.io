$('#myJd').Dropdown({
    title: '我的京东',
    width: 126,
    menuList: [{
        title: '',

        itemList: [{
            href: '#',
            name: '待处理订单'
        }, {
            href: '#',
            name: '消息'
        }, {
            href: '#',
            name: '返修退换货'
        }, {
            href: '#',
            name: '我的问答'
        }, {
            href: '#',
            name: '降价商品'
        }, {
            href: '#',
            name: '我的关注'
        }]
    }, {
        title: '',
        itemList: [{
            href: '#',
            name: '我的京豆'
        }, {
            href: '#',
            name: '我的白条'
        }, {
            href: '#',
            name: '我的优惠卷'
        }, {
            href: '#',
            name: '我的理财'
        }]
    }]
});
$('#myPu').Dropdown({
    title: '企业采购',
    width: 126,
    menuList: [{
        title: '客户',
        itemList: [{
            href: '#',
            name: '待处理订单'
        }, {
            href: '#',
            name: '消息'
        }, {
            href: '#',
            name: '返修退换货'
        }, {
            href: '#',
            name: '我的问答'
        }, {
            href: '#',
            name: '降价商品'
        }, {
            href: '#',
            name: '我的关注'
        }]
    }, {
        title: '商户',
        itemList: [{
            href: '#',
            name: '我的京豆'
        }, {
            href: '#',
            name: '我的白条'
        }, {
            href: '#',
            name: '我的优惠卷'
        }, {
            href: '#',
            name: '我的理财'
        }]
    }]
});
$('#myNav').Dropdown({
    title: '网站导航',
    direction: 'x',
    menuList: [{
        title: '客户',
        width: 330,
        itemwidth: 100,
        itemList: [{
            href: '#',
            name: '待处理订单'
        }, {
            href: '#',
            name: '消息'
        }, {
            href: '#',
            name: '返修退换货'
        }, {
            href: '#',
            name: '我的问答'
        }, {
            href: '#',
            name: '降价商品'
        }, {
            href: '#',
            name: '我的关注'
        }]
    }, {
        title: '商户',
        itemList: [{
            href: '#',
            name: '我的京豆'
        }, {
            href: '#',
            name: '我的白条'
        }, {
            href: '#',
            name: '我的优惠卷'
        }, {
            href: '#',
            name: '我的理财'
        }]
    }],
    menuList: [{
        title: '客户',
        width: 300,
        itemwidth: 90,
        itemList: [{
            href: '#',
            name: '待处理订单'
        }, {
            href: '#',
            name: '消息'
        }, {
            href: '#',
            name: '返修退换货'
        }, {
            href: '#',
            name: '我的问答'
        }, {
            href: '#',
            name: '降价商品'
        }, {
            href: '#',
            name: '我的关注'
        }]
    }, {
        title: '商户',
        itemList: [{
            href: '#',
            name: '我的京豆'
        }, {
            href: '#',
            name: '我的白条'
        }, {
            href: '#',
            name: '我的优惠卷'
        }, {
            href: '#',
            name: '我的理财'
        }]
    }],
});

$('.craoussel').carousel({
    imgList: ['https://m.360buyimg.com/babel/jfs/t1/31601/2/6462/97824/5c8f38b5Eaf576308/0067f5da6a50b368.jpg', 'https://img1.360buyimg.com/da/jfs/t1/11774/26/12560/99923/5c920ad1Ea103bdf3/a27bef36cadca96a.jpg', 'https://img1.360buyimg.com/pop/jfs/t1/17808/19/12601/51246/5c98b789E861aa5e3/6c8fa637e0063dde.jpg'],
    carouselType: 'gradual'

})

var menuData = [{
    title: ['家用电器'],
    content: {
        tabs: ['家电馆', '乡镇专卖店', '家电服务', '企业采购', '商用电器'],
        subs: {
            title: '电视',
            content: ['超薄电视', '全面屏电视', '智能电视', 'OLED电视', '曲面电视', '4K超清电视', '55英寸', '65英寸电视', '配件']
        }
    }
},
{
    title: ['手机', '运营商', '数码'],
    content: {
        tabs: ['玩3C', '手机频道', '网上营业厅', '配件选购中心', '智能数码', '影像Club'],
        subs: {
            title: '手机',
            content: ['合约机', '选号码', '固话', '宽带办套餐充话费', '流量', '中国电信', '中国移动', '中国联通', '京东通信', '170选号', '上网卡', '合约机', '选号码', '固话', '宽带办套餐充话费', '流量', '中国电信', '中国移动', '中国联通', '京东通信', '170选号', '上网卡']
        }
    }
},
]

function createMenu(menuData) {
    menuData.forEach(function (ele) {
        var $li = $('<li></li>');
        for (var i = 0; i < ele.title.length; i++) {
            $('<a href="#">' + ele.title[i] + '</a>').appendTo($li);
            if (i != ele.title.length - 1) {
                $('<span>/</span>').appendTo($li);
            }
        }
        $('#menuMian-list').append($li);
    })
};
var outTimer = null;
function bindMenuEvent() {
    $('#menuMian-list').on('mouseenter', 'li', function () {
        clearTimeout(outTimer);
        $(this).css({
            backgroundColor: '#eee'
        });
        var index = $(this).index();
        rendMenuList(menuData[index].content);
        $('.menu-list').show();
    }).on('mouseleave', 'li', function () {
        $(this).css({
            backgroundColor: '#fff'
        });
        outTimer = setTimeout(function () {
            $('.menu-list').hide();

        }, 300);
    });
    $('.menu-list').on('mouseenter', function () {
        clearTimeout(outTimer);
    }).on('mouseleave', function () {
        $(this).hide();
    })
};
function rendMenuList(content) {
    $menuList = $('.menu-list').css({
        zIndex: 100
    });
    $menuList.html('');
    var $menuNav = $('<ul class="clearF" id="menuNav"></ul>').appendTo($menuList);
    content.tabs.forEach(function (ele) {

        $('<li><a href="#">' + ele + '</a></li>').appendTo($menuNav);
    });
    var $dl = $('<dl class="item-detail"></dl>').appendTo($menuList);
    $('<dt>' + content.subs.title + '</dt>').appendTo($dl);
    var $dd = $('<dd></dd>').appendTo($dl);
    content.subs.content.forEach(function (ele) {
        $('<a href="#">' + ele + '</a>').appendTo($dd);

    })


};
function bindServiceEvent() {
    $('.head-item').on('mouseenter', function () {
        $('.jd-service').addClass('service-s');
        $(this).find('a').css({
            borderBottom: '2px solid red'
        })
    }).on('mouseleave', function () {
        $(this).find('a').css({
            borderBottom: 'none'
        })
    });
    $('.close-btn').on('click', function () {
        $('.jd-service').removeClass('service-s');
    })
};
function getData(data) {
    rendFromTip(data.result);
}
function rendFromTip(data) {
    $('#tip > ul').html('');
    data.forEach(function (ele,index) {
        var $li = $('<li></li>');
        $('<div class="serch-item">'+ ele[0] +'</div>').appendTo($li);
        $('<div class="serch-count">'+'约'+ ele[1] +'件商品'+'</div>').appendTo($li);
        $('#tip > ul').append($li);
    })
}
function bindSerchEvent () {
   $('.search-input').on('keyup',function () {
    $('#tip').show();
       var val = $(this).val();
       $.ajax({
           url:'https://suggest.taobao.com/sug',
           type:'GET',
           data:{
               q:val,
               callback:'getData',
               code:'utf-8'
           },
           dataType:'jsonp'
       })
   });
   $('.searchForm').on('mouseleave',function () {
       $('#tip').hide();
   })
};
createMenu(menuData);
bindMenuEvent();
bindServiceEvent();
bindSerchEvent ()