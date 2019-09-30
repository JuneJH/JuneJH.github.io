(function () {

    function CarouselObj(parameter) {
        this.carouselType = parameter.carouselType;
        this.wrapper = parameter.self;
        this.width = parameter.width || this.wrapper.width();
        this.height = parameter.height || this.wrapper.height();
        this.imgSrc = parameter.imgList;
        this.imgLength = parameter.imgList.length;
        this.ulLength = this.carouselType == 'slide' ? (this.imgLength + 1) : this.imgLength;
        this.lock = false;
        this.imgIndex = 0;
        this.createDom();
        this.initStyle();
        this.bindEvent();
        this.autoMove();

    }
    CarouselObj.prototype.createDom = function () {
        var $box = $('<div class="box"></div>');
        var $ul = $('<ul class="caUl"></ul>');
        var $dotDiv = $('<div class="dot"></div>');
        for (var i = 0; i < this.imgLength; i++) {
            $('<li><img src="' + this.imgSrc[i] + '" /></li>')
                .appendTo($ul);
            if (this.carouselType == 'slide' && i == (this.imgLength - 1)) {
                $('<li><img src="' + this.imgSrc[0] + '" />')
                    .appendTo($ul);
            }
            $('<span></span>').appendTo($dotDiv);
        };
        $box.append($ul).append($dotDiv).append($('<div class="left iconfont icon-left"></div><div class="right iconfont icon-20151209tubiaolianxizhuanhuan091"></div>'));
        $(this.wrapper).append($box)
    };
    CarouselObj.prototype.initStyle = function () {
        var self = this;
        $('.box').css({
            width: self.width,
            height: self.height,
            overflow: 'hidden',
            textAlign: 'center',
            position: 'relative',
        })
        if (self.carouselType == 'slide') {
            $('.box > .caUl').css({
                listStyle: 'none',
                margin: 0,
                padding: 0,
                width: self.width * self.ulLength,
                height: '100%',
                position: 'absolute',
                top: 0,
                left: 0,
            }).find('li').css({
                float: 'left',
                width: self.width,
                height: '100%',
                // display: 'none'
            }).find('img').css({
                width: '100%',
                height: '100%'
            });

        } else if (this.carouselType == 'gradual') {
            $('.box > .caUl').css({
                listStyle: 'none',
                margin: 0,
                padding: 0,
                width: '100%',
                height: '100%',
                position: 'relative'
            })
                .find('li').css({
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    display: 'none'
                }).eq(0).css({
                    display: 'block'
                }).end().find('img').css({
                    width: '100%',
                    height: '100%'
                });
        };
        $('.dot').css({
            display: 'inline-block',
            position: 'absolute',
            bottom: '20px',
            marginLeft: '-22px'


        })
        .find('span')
        // .css({
        //     display: 'inline-block',
        //     width: '8px',
        //     height: '8px',
        //     borderRadius: '50%',
        //     backgroundColor: '#fff',
        //     margin: '5px',
        //     cursor: 'pointer'

        // })
        .eq(this.imgIndex).css({
            backgroundColor: '#fff'
        })
        // $('.left,.right').css({
        //     width: 30,
        //     height: 40,
        //     backgroundColor: 'rgba(0,0,0,0.5',
        //     fontSize: '20px',
        //     color: '#fff',
        //     position: 'absolute',
        //     top: '50%',
        //     marginTop: '-20px',
        //     lineHeight: '40px',
        //     cursor: 'pointer'
        // });
        $('.left').css({
            left: '10px'
        })
        $('.right').css({
            right: '10px'
        })


    }

    CarouselObj.prototype.bindEvent = function () {
        var self = this;
        $(window).on('resize', function () {
            self.width = parseInt($(self.wrapper).css('width'));
            self.height = parseInt($(self.wrapper).css('height'));
            $('.box').css({
                width: self.width,
                height: self.height,
            });
            if (self.carouselType == 'slide') {
                $('.box > .caUl').css({
                    width: self.width * self.ulLength,
                    height: '100%',

                }).find('li').css({
                    width: self.width,
                    height: '100%',
                })
                $('.caUl').css({
                    left: -self.imgIndex * self.width + 'px',
                })
            }
        })






        $('.left').on('click', function () {
            if (self.imgIndex == 0) {
                self.imgIndex = self.imgLength;
                console.log(self.imgIndex)
                $('.caUl').css({
                    left: -self.imgIndex * self.width + 'px',
                })
            };
            self.move('prev')
        });
        $('.right').on('click', function () {
            self.move('next')
        });
        $('.dot').find('span').on('click', function () {
            self.move($(this).index());
        });
        // $('.box').hover(function (){
        //     clearInterval(self.timer);
        // },function () {
        //     self.autoMove();
        // })
    };
    CarouselObj.prototype.move = function (diraction) {
        if (this.lock) {
            return false;
        };
        this.lock = true;
        var self = this;
        if (self.carouselType == 'slide') {
            switch (diraction) {
                case 'prev':
                    // if (this.imgIndex == 1) {
                    //     this.imgIndex = this.imgLength - 1;
                    // } else {
                    this.imgIndex--;
                    // };
                    break;
                case 'next':
                    // if (this.imgIndex == this.imgLength - 1) {
                    //     this.imgIndex = 0;
                    // } else {
                    this.imgIndex++;
                    // };

                    break;
                default: this.imgIndex = diraction;


            };
            $('.caUl').animate({
                left: - self.imgIndex * self.width + 'px'
            }, 600, 'swing', function () {
                if (self.imgIndex == self.imgLength) {
                    self.imgIndex = 0;
                    $('.caUl').css({
                        left: 0
                    });
                }
                self.autoMove();
                changeSpan(self.imgIndex);
                self.lock = false;
            })
        } else {
            switch (diraction) {
                case 'prev':
                    if (this.imgIndex == 0) {
                        this.imgIndex = this.imgLength - 1;
                    } else {
                        this.imgIndex--;
                    };
                    break;
                case 'next':
                    if (this.imgIndex == this.imgLength - 1) {
                        this.imgIndex = 0;
                    } else {
                        this.imgIndex++;
                    };

                    break;
                default: this.imgIndex = diraction;


            };
            $('.caUl > li').fadeOut();
            $('.caUl > li').eq(this.imgIndex).fadeIn(function () {
                self.autoMove();
                self.lock = false;
            });
            changeSpan(self.imgIndex);

        }

    };
    function changeSpan(index) {
        $('.dot').find('span').css({
            backgroundColor: 'transparent'
        });
        $('.dot').find('span').eq(index).css({
            backgroundColor: '#fff'
        })
    }
    CarouselObj.prototype.autoMove = function () {
        var self = this;
        clearTimeout(self.timer);
        self.timer = setTimeout(function () {
            self.move('next');
        }, 1500)
    };

    $.fn.extend({
        carousel: function (parameter) {
            parameter.self = this;
            var carouselObj = new CarouselObj(parameter);
        }
    })




})()