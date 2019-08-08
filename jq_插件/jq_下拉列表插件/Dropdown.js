((function () {
    function Dropdown(parameter) {
        this.warp = parameter.warp;
        this.title = parameter.title;
        this.menuList = parameter.menuList || [];
        this.width = parameter.width;
        this.direction = parameter.direction || 'y';
        console.log(this.direction)
        this.createDom();
        this.initStyle();
        this.bindEvent();
    }
    Dropdown.prototype.createDom = function () {
        $('<a class="dropdown-btn" href="#">' + this.title + '</a>').appendTo(this.warp);
        var $dropdown = $('<div class="dropdown-box"></div>');
        for (var i = 0; i < this.menuList.length; i++) {
            var item = this.menuList[i];
            var $dl = $('<dl></dl>');
            if (item.title) {
                $('<dt>' + item.title + '</dt>').appendTo($dl);
            };
            item.itemList.forEach(function (ele) {
                $('<dd><a href="' + ele.href + '">' + ele.name + '</a></dd>').appendTo($dl);
            });
            $dropdown.append($dl);
        }


        $(this.warp).append($dropdown);


    };
    Dropdown.prototype.initStyle = function () {
        $(this.warp).css({
            position: 'relative'
        }).find('.dropdown-box').css({
            backgroundColor: '#fff',
            position: 'absolute',
            border: '1px solid #eee',
            display: 'none',
            zIndex:200

        }).find('dl').css({
            width: this.width * 2,
            paddingLeft: '10px',
            borderBottom: '1px solid #eee'


        }).find('dt').css({
            fontWeight: 700
        }).end().find('dd').css({
            width: this.width,
            display: 'inline-block',
            textAlign: 'left',
            overflow: 'hidde'
        });
        var self = this;
        if (this.direction == 'x') {
            $(this.warp).find('.dropdown-box').css({
                width: '1190px',
                right: -73,
                zIndex:200
            }).find('dl').each(function (i) {
                $(this).css({
                    width: self.menuList[i].width,
                    display: 'inline-block',
                    verticalAlign: 'top',
                    border:'none'

                }).find('dd').css({
                    width: self.menuList[i].itemwidth,
                })
            })

        }
    };
    Dropdown.prototype.bindEvent = function () {
        $(this.warp).hover(function () {
            $(this).find('.dropdown-box').show();
            $(this).css({
                backgroundColor: '#fff',
                borderColor: '#eee',
                borderBottomColor: 'red',
                paddingBottom: 2
            })
        }, function () {
            $(this).find('.dropdown-box').hide();
            $(this).css({
                backgroundColor: '#e3e4e5',
                borderColor: 'none',
                borderBottomColor: 'none',
                paddingBottom: 0
            })
        });
        $(this.warp).find('.dropdown-btn').hover(function () {
            $(this).css({
                color: 'red',

            })
        }, function () {
            $(this).css({
                color: '#999'
            })
        });
        $(this.warp).find('dd').find('a').hover(function () {
            $(this).css({
                color: 'red'
            })
        }, function () {
            $(this).css({
                color: '#999'
            })
        })
    }







    $.fn.extend({
        Dropdown: function (parameter) {
            parameter.warp = this || $('body');
            new Dropdown(parameter);
            return this;
        }
    })




})())