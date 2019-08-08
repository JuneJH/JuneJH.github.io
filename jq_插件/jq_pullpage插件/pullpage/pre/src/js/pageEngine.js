var pageEngine = {
    init: function (selector, colorArry) {
        this.Isslide = false;
        this.$W = $(selector);
        this.colorArry = colorArry;
        return this;
    },
    addSection: function (className,config) {
        this.Isslide = false;
        this.$page = $('<div class="section"></div>').addClass(className);
        config && this.$page.css(config);
        this.$page.appendTo(this.$W);
        

        return this;
    },
    addSlide: function (className) {
        this.Isslide = true;
        this.$S = $('<div class="slide"></div>').addClass(className);
        this.$page.append(this.$S);
        return this;
    },
    addComponent: function (config,createDom) {
        var component = componentfactoy(config,createDom);
        this.Isslide ? this.$S.append(component) : this.$page.append(component);
        return this;

    },
    bindEvent: function () {
        $('.section').on({
            sectionLeave: function () {
                $(this).find('.component').trigger('cpleave');
            },
            sectionLoad:function () {

                $(this).find('.component').trigger('cpload')
            }
        });
        $('.slide').on({
            slideLeave: function () {

                $(this).find('.component').trigger('levelLeave');
            },
            slideonLoad:function () {

                $(this).find('.component').trigger('levelLoad');
            }
        })
    },
    load:function() {
        this.bindEvent();
        var self = this;
        this.$W.pullpage({
            color: this.colorArry,
            leave: function (index) {
              self.$W.find('.section').eq(index).trigger('sectionLeave');

            },
            afterload:function (index) {
                self.$W.find('.section').eq(index).trigger('sectionLoad');
            },
            levelgo:function (index) {
                if(index == 0){
                  self.$W.find('.section').eq(self.$W.find('.section.active').index()).trigger('sectionLeave');
                }else{
                self.$W.find('.section').find('.slideWrap').find('.innerActive').trigger('slideLeave');
            }
            },
            levelcome:function (index) {
                if(index == 0){
                self.$W.find('.section').eq(self.$W.find('.section.active').index()).trigger('sectionLoad');

                }else{

                self.$W.find('.section').find('.slideWrap').find('.innerActive').trigger('slideonLoad');

            }}

        });
        self.$W.find('.section').eq(0).trigger('sectionLoad');

    }
}