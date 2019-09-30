function componentfactoy(config, cerateDom) {
    var $odom = $('<div class= "component"><span></span></div>');
    config.className && $odom.addClass(config.className);
    config.width && $odom.css({ width: config.width });
    config.height && $odom.css({ height: config.height });
    config.text && $odom.find('span').eq(0).text(config.text);
    config.center && $odom.css({ position: 'absolute', left: '50%', marginLeft: - config.width / 2 });
    config.css && $odom.css(config.css);
    if (config.event) {
        for (var prop in config.event) {
            if (prop == 'hover') {
                $odom[prop](config.event[prop][0], config.event[prop][1]);
            } else {
                $odom.on(prop, config.event[prop]);
            }
        }
    }
    $odom.on('levelLeave', function () {
        console.log('levelLeave');
        var self = this;
        config.isLevel && config.animateOut && $(this).animate(config.animateOut);

    });
    $odom.on('levelLoad', function () {
        console.log('levelLoad');

        var self = this;
        setTimeout(function () {
            config.isLevel && config.animateIn && $(self).animate(config.animateIn);

        }, config.delay || 0)
    });

    $odom.on('cpleave', function () {
        var self = this;
        config.isLevel || config.animateOut && $(self).animate(config.animateOut);

    });
    $odom.on('cpload', function () {
        var self = this;
        setTimeout(function () {
            config.isLevel || config.animateIn && $(self).animate(config.animateIn);

        }, config.delay || 0)
    });


    cerateDom && $odom.append(cerateDom());

    return $odom;
}