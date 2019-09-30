(function () {
    function Paging(parameter) {
        this.warp = parameter.warp;
        this.curPage = parameter.curPage || 1;
        this.allPage = parameter.allPage || 1;
        this.callback = parameter.callback || function (){};
        this.cretePageIndex();
    }
    Paging.prototype.cretePageIndex = function () {
        $(this.warp).empty();
        if (this.curPage != 1) {
            $('<li class="prev-page">上一页</li>').appendTo(this.warp);
        }else{
            $('.prev-page').remove();
        }
        if (this.curPage - 2 >= 2) {
            $('<li class="tab-page">1</li>').appendTo(this.warp);
        }
        if (this.curPage - 2 > 2) {
            $('<span>...</span>').appendTo(this.warp);
        }
        for (var i = this.curPage - 2; i <= this.curPage + 2; i++) {
            if (i > 0 && i <= this.allPage) {
                var $li = $('<li class="tab-page">' + i + '</li>')
                if (i == this.curPage) {
                    $li.addClass('cur-page');
                }
                $li.appendTo(this.warp);
            }

        }
        if(this.curPage + 3 < this.allPage){
            $('<span>...</span>').appendTo(this.warp);
        }
        if(this.curPage + 2 < this.allPage){
            $('<li class="tab-page">'+this.allPage+'</li>').appendTo(this.warp);
        }
        if (this.curPage != this.allPage) {
            $('<li class="next-page">下一页</li>').appendTo(this.warp);
        }else{
            $('.next-page').remove();
        };
        this.bindEvent();


    };
    Paging.prototype.bindEvent = function () {
        var self = this;
        $('.prev-page').click(function () {
            self.curPage --;
            self.callback(self.curPage);
            self.cretePageIndex();
        });
        $('.next-page').click(function () {
            self.curPage ++;
            self.callback(self.curPage);

            self.cretePageIndex();
        });
        $('.tab-page').click(function () {
            var curpage = parseInt($(this).text());
            self.curPage = curpage;
            self.callback(self.curPage);

            self.cretePageIndex();
        })

    }



    $.fn.extend({
        paging: function (parameter) {
            parameter.warp = this;
            new Paging(parameter);
            return this;
        }
    })
})()