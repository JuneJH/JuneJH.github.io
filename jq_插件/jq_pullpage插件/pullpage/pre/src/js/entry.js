pageEngine.init('.box', [])
    .addSection('oneSection', {
        backgroundImage:'url(./src/img/bg_3.jpg)',
        backgroundSize: '100% 100%',
    })
    .addComponent({
        text: '这，告诉你一个秘密',
        css: {
            position: 'absolute',
            opacity: 0,
            top: '10%',
            color: '#fff',
            textAlign: 'justify',
            fontSize: '60px',
            fontWeight: '100',
            transform: "translateX(-50%)"
        },
        animateIn: {
            opacity: 1,
            top: '10%',
            left: '50%'
        },
        animateOut: {
            opacity: 0,
            right: 0
        },
        delay: 1000,
    })
    .addComponent({
        text: '但，秘密是每个心中的喜怒',
        css: {
            position: 'absolute',
            opacity: 0,
            top: '25%',
            color: '#fff',
            textAlign: 'justify',
            fontSize: '60px',
            fontWeight: '100',
            transform: "translateX(-50%)"
        },
        animateIn: {
            opacity: 1,
            top: '25%',
            left: '50%'
        },
        animateOut: {
            opacity: 0,
            top: 0
        },
        delay: 1500,
    })
    .addComponent({
        text: '从何说起才是个头',
        css: {
            position: 'absolute',
            opacity: 0,
            top: '40%',
            color: '#fff',
            textAlign: 'justify',
            fontSize: '60px',
            fontWeight: '100',
            transform: "translateX(-50%)"
        },
        animateIn: {
            opacity: 1,
            top: '40%',
            left: '50%'
        },
        animateOut: {
            opacity: 0,
            top: 0
        },
        delay: 2000,
    })
    .addComponent({
        text: '未知何时是开始，咋谈结束',
        css: {
            position: 'absolute',
            opacity: 0,
            top: '55%',
            color: '#fff',
            textAlign: 'justify',
            fontSize: '60px',
            fontWeight: '100',
            transform: "translateX(-50%)"
        },
        animateIn: {
            opacity: 1,
            top: '55%',
            left: '50%'
        },
        animateOut: {
            opacity: 0,
            top: 0
        },
        delay: 2500,
    })
    .addComponent({
        text: '还是捡重点说起吧',
        css: {
            position: 'absolute',
            opacity: 0,
            top: '70%',
            color: '#fff',
            textAlign: 'justify',
            fontSize: '60px',
            fontWeight: '100',
            transform: "translateX(-50%)"
        },
        animateIn: {
            opacity: 1,
            top: '70%',
            left: '50%'
        },
        animateOut: {
            opacity: 0,
            top: 0
        },
        delay: 3000,
    })
    .addComponent({
        text: '我爱你，慢慢到白头',
        css: {
            position: 'absolute',
            opacity: 0,
            top: '70%',
            color: '#fff',
            textAlign: 'justify',
            fontSize: '60px',
            fontWeight: '100',
            transform: "translateX(-50%)"
        },
        animateIn: {
            opacity: 1,
            top: '85%',
            left: '50%'
        },
        animateOut: {
            opacity: 0,
            right: 0
        },
        delay: 3500,
    })
    .addSection('twoSection')
    .addSlide('oneslide')
    .addComponent({
        //第一页水平
        width: '100%',
        height: '100%',
        css: {
            position: 'absolute',
            opacity: 0.6,
            top: '0',
            left:0,
            backgroundImage: 'url(./src/img/bg_2.jpg)',
            backgroundSize: '100% 100%'
        },
    })
    .addComponent({
        text: '这，这么胖，还吃蛋糕，简直欠揍，练过的。还是感谢不嫌弃这么丑的衣服',
        css: {
            width:'300px',
            height:'auto',
            position: 'absolute',
            opacity: 0,
            top: '70%',
            color: '#fff',
            textAlign: 'justify',
            fontSize: '30px',
            fontWeight: '100',
            transform: "translateX(-50%)"
        },
        animateIn: {
            opacity: 1,
            top: '15%',
            left: '50%'
        },
        animateOut: {
            opacity: 0,
            right: 0
        },
        delay: 3500,
    })
    .addComponent({
        //第一页水平
        width: '400px',
        height: '600px',
        css: {
            position: 'absolute',
            opacity: 0,
            top: '10%',
            backgroundImage: 'url(./src/img/22.jpg)',
            backgroundSize: '100% 100%'
        },
        animateIn: {
            opacity: 1,
            top: '10%',
            left: '10%'
        },
        animateOut: {
            opacity: 0,
            left: -400
        },
        delay: 1000,
        event: {
        }
    })
    .addComponent({
        width: '400px',
        height: '600px',
        css: {
            position: 'absolute',
            opacity: 0,
            top: '10%',
            backgroundImage: 'url(./src/img/23.jpg)',
            backgroundSize: '100% 100%'
        },
        animateIn: {
            opacity: 1,
            top: '10%',
            right: '10%'
        },
        animateOut: {
            opacity: 0,
            right: -400
        },
        delay: 2000,
        event: {
        }
    })
    .addComponent({
        //方向
        width: '100px',
        height: '100px',
        css: {
            position: 'absolute',
            opacity: 0,
            top: '50%',
            right:0,
            backgroundImage: 'url(./src/img/right-two.jpg)',
            backgroundSize: '100% 100%'
        },
        animateIn: {
            opacity: 1,
            top: '50%',
            marginTop:'-50px',
            right: 0
        },
        animateOut: {
            opacity: 0,
            right: -100
        },
    })
    .addSlide('twoslide')
    .addComponent({
        //第一页水平
        width: '100%',
        height: '100%',
        css: {
            position: 'absolute',
            opacity: 0.6,
            top: '0',
            left:0,
            backgroundImage: 'url(./src/img/bg_4.jpg)',
            backgroundSize: '100% 100%'
        },
    })
    .addComponent({
        isLevel:true,
        width: '400px',
        height: '600px',
        css: {
            position: 'absolute',
            opacity: 0,
            top: '10%',
            backgroundImage: 'url(./src/img/right-two.jpg)',
            backgroundSize: '100% 100%'
        },
        animateIn: {
            opacity: 1,
            top: '10%',
            left: '10%'
        },
        animateOut: {
            opacity: 0,
            left: -400
        },
        delay: 1000,
        event: {
        }
    })
    .addComponent({
        isLevel:true,
        width: '400px',
        height: '600px',
        css: {
            position: 'absolute',
            opacity: 0,
            top: '10%',
            backgroundImage: 'url(./src/img/left-two.jpg)',
            backgroundSize: '100% 100%'
        },
        animateIn: {
            opacity: 0.7,
            top: '10%',
            right: '10%'
        },
        animateOut: {
            opacity: 0,
            right: -400
        },
        delay: 2000,
        event: {
        }
    })
     .addComponent({
        isLevel:true,
        //方向
        width: '100px',
        height: '100px',
        css: {
            position: 'absolute',
            opacity: 0,
            top: '50%',
            left:0,
            backgroundImage: 'url(./src/img/right-two.jpg)',
            backgroundSize: '100% 100%'
        },
        animateIn: {
            opacity: 1,
            top: '50%',
            marginTop:'-50px',
            left: 0
        },
        animateOut: {
            opacity: 0,
            right: -100
        },
    })


    .addSection('onesSection', {
        backgroundImage: 'url(./src/img/bg_6.jpg)', backgroundSize: '100% 100%'
    })
    .addComponent({
        width: '300px',
        height: '400px',
        css: {
            position: 'absolute',
            opacity: 0,
            top: '25%',
            // left:'10%',
            backgroundImage: 'url(./src/img/2.jpeg)',
            backgroundSize: '100% 100%',
            padding: '10px 15px 10px 15px',
            textAlign: 'justify',
            fontSize: '18px',
            fontWeight: '900',
            lineHeight: '25px'
        },
        animateIn: {
            opacity: 1,
            top: '25%',
            left: '10%'
        },
        animateOut: {
            opacity: 0,
            top: 0
        },
        delay: 1000,
        event: {
            hover: [function () {
                $(this).find('.mas').css({
                    display: 'block'
                })
            },
            function () {
                $(this).find('.mas').css({
                    display: 'none'
                })
            }]
        }


    }, function () {
        var $odom = $('<div class="mas"></div>').css({
            text: 'happy brithday',
            position: 'absolute',
            opacity: 0.5,
            width: '100%',
            height: '100%',
            left: 0,
            top: 0,
            backgroundColor: '#ddd',
            display: 'none',
            lineHeight: '400px',
            textAlign: 'center'
        });
        var $text = $('<span>今天你非同</span>').css({
            color: '#000',
            opacity: 1,
            fontWeight: 400

        })
        $odom.append($text);

        return $odom;

    })
    .addComponent({
        width: '300px',
        height: '400px',
        css: {
            position: 'absolute',
            opacity: 0,
            top: '25%',
            backgroundImage: 'url(./src/img/2.jpeg)',
            backgroundSize: '100% 100%',
            padding: '10px 15px 10px 15px',
            textAlign: 'justify',
            fontSize: '18px',
            fontWeight: '900',
            lineHeight: '25px'
        },
        animateIn: {
            opacity: 1,
            top: '25%',
            left: '40%'
        },
        animateOut: {
            opacity: 0,
            top: 0
        },
        delay: 1500,
        event: {
            hover: [function () {
                $(this).find('.mas').css({
                    display: 'block'
                })
            },
            function () {
                $(this).find('.mas').css({
                    display: 'none'
                })
            }]
        }


    }, function () {
        var $odom = $('<div class="mas"></div>').css({
            text: 'happy brithday',
            position: 'absolute',
            opacity: 0.5,
            width: '100%',
            height: '100%',
            left: 0,
            top: 0,
            backgroundColor: '#ddd',
            display: 'none',
            lineHeight: '400px',
            textAlign: 'center'
        });
        var $text = $('<span>今天你非同</span>').css({
            color: '#000',
            opacity: 1,
            fontWeight: 400

        })
        $odom.append($text);

        return $odom;

    })
    .addComponent({
        width: '300px',
        height: '400px',
        css: {
            position: 'absolute',
            opacity: 0,
            top: '25%',
            // left:'10%',
            backgroundImage: 'url(./src/img/2.jpeg)',
            backgroundSize: '100% 100%',
            padding: '10px 15px 10px 15px',
            textAlign: 'justify',
            fontSize: '18px',
            fontWeight: '900',
            lineHeight: '25px'
        },
        animateIn: {
            opacity: 1,
            top: '25%',
            left: '70%'
        },
        animateOut: {
            opacity: 0,
            top: 0
        },
        delay: 2000,
        event: {
            hover: [function () {
                $(this).find('.mas').css({
                    display: 'block'
                })
            },
            function () {
                $(this).find('.mas').css({
                    display: 'none'
                })
            }]
        }


    }, function () {
        var $odom = $('<div class="mas"></div>').css({
            text: 'happy brithday',
            position: 'absolute',
            opacity: 0.5,
            width: '100%',
            height: '100%',
            left: 0,
            top: 0,
            backgroundColor: '#ddd',
            display: 'none',
            lineHeight: '400px',
            textAlign: 'center'
        });
        var $text = $('<span>今天你非同</span>').css({
            color: '#000',
            opacity: 1,
            fontWeight: 400

        })
        $odom.append($text);

        return $odom;

    })
    .addComponent({
        width: 'auto',
        height: 'auto',
        text: '今天是我的大宝贝的生日',
        css: {
            position: 'absolute',
            opacity: 0,
            top: '2%',
            paddingLeft:'390px',
            color: '#fff',
            textAlign: 'justify',
            fontWeight: '200',
            fontSize:'50px'
        },
        animateIn: {
            opacity: 1,
            fontSize: '70px',
            top: '7%',
        },
        animateOut: {
          opacity:0
        },
        delay: 2500,


    })
    .addSection('twoSection')
    .addSlide()
    .addComponent({
        width: "100%",
        height: '100%',
        css: {
            backgroundImage: 'url(./src/img/bg_8.jpg)',
            backgroundSize: '100% 100%',
            opacity: 0.5
        }
    })
    .addComponent({
        width: '150px',
        height: '200px',
        css: {
            position: 'absolute',
            opacity: 1,
            bottom:'25px',
            left:'50%',
            marginLeft:'-75px',
            backgroundImage: 'url(./src/img/5.jpeg)',
            backgroundSize: '100% 100%'
        },
    })
    .addComponent({
        width: '150px',
        height: '200px',
        css: {
            position: 'absolute',
            opacity: 1,
            bottom:'25px',
            left:'50%',
            marginLeft:'-75px',
            backgroundImage: 'url(./src/img/11.jpeg)',
            backgroundSize: '100% 100%',
        },
        animateIn: {
            opacity: 1,
            top: '2%',
            left: '10%'
        },
        animateOut: {
            opacity: 0,
            bottom:'25px',
            left:'50%',
            marginLeft:'-75px',
        },
        delay: 1000,
        event: {
            hover: [function () {
                $(this).find('.mas').css({
                    display: 'block'
                })
            },
            function () {
                $(this).find('.mas').css({
                    display: 'none'
                })
            }]
        }


    }, function () {
        var $odom = $('<div class="mas"></div>').css({
            position: 'absolute',
            width: '300px',
            height: '400px',
            right: '-150px',
            bottom: '-400px',
            backgroundImage: 'url(./src/img/11.jpeg)',
            backgroundSize: '100% 100%',
            display: 'none',
            zIndex:999
        });
        return $odom;
    })
    .addComponent({
        width: '150px',
        height: '200px',
        css: {
            position: 'absolute',
            opacity: 1,
            bottom:'25px',
            left:'50%',
            marginLeft:'-75px',
            backgroundImage: 'url(./src/img/3.jpeg)',
            backgroundSize: '100% 100%',
        },
        animateIn: {
            opacity: 1,
            top: '2%',
            left: '20%'
        },
        animateOut: {
            opacity: 0,
            bottom:'25px',
            left:'50%',
            marginLeft:'-75px',
        },
        delay: 1200,
        event: {
            hover: [function () {
                $(this).find('.mas').css({
                    display: 'block'
                })
            },
            function () {
                $(this).find('.mas').css({
                    display: 'none'
                })
            }]
        }


    }, function () {
        var $odom = $('<div class="mas"></div>').css({
            position: 'absolute',
            width: '300px',
            height: '400px',
            right: '-150px',
            bottom: '-400px',
            backgroundImage: 'url(./src/img/3.jpeg)',
            backgroundSize: '100% 100%',
            display: 'none',
            zIndex:999
        });
        return $odom;
    })
    .addComponent({
        width: '150px',
        height: '200px',
        css: {
            position: 'absolute',
            opacity: 1,
            bottom:'25px',
            left:'50%',
            marginLeft:'-75px',
            backgroundImage: 'url(./src/img/4.jpeg)',
            backgroundSize: '100% 100%',
        },
        animateIn: {
            opacity: 1,
            top: '2%',
            left: '30%'
        },
        animateOut: {
            opacity: 0,
            bottom:'25px',
            left:'50%',
            marginLeft:'-75px',
        },
        delay: 1400,
        event: {
            hover: [function () {
                $(this).find('.mas').css({
                    display: 'block'
                })
            },
            function () {
                $(this).find('.mas').css({
                    display: 'none'
                })
            }]
        }


    }, function () {
        var $odom = $('<div class="mas"></div>').css({
            position: 'absolute',
            width: '300px',
            height: '400px',
            right: '-150px',
            bottom: '-400px',
            backgroundImage: 'url(./src/img/4.jpeg)',
            backgroundSize: '100% 100%',
            display: 'none',
            zIndex:999
        });
        return $odom;
    })
    .addComponent({
        width: '150px',
        height: '200px',
        css: {
            position: 'absolute',
            opacity: 1,
            bottom:'25px',
            left:'50%',
            marginLeft:'-75px',
            backgroundImage: 'url(./src/img/5.jpeg)',
            backgroundSize: '100% 100%',
        },
        animateIn: {
            opacity: 1,
            top: '2%',
            left: '40%'
        },
        animateOut: {
            opacity: 0,
            bottom:'25px',
            left:'50%',
            marginLeft:'-75px',
        },
        delay: 1600,
        event: {
            hover: [function () {
                $(this).find('.mas').css({
                    display: 'block'
                })
            },
            function () {
                $(this).find('.mas').css({
                    display: 'none'
                })
            }]
        }


    }, function () {
        var $odom = $('<div class="mas"></div>').css({
            position: 'absolute',
            width: '300px',
            height: '400px',
            right: '-150px',
            bottom: '-400px',
            backgroundImage: 'url(./src/img/5.jpeg)',
            backgroundSize: '100% 100%',
            display: 'none',
            zIndex:999
        });
        return $odom;
    })
    .addComponent({
        width: '150px',
        height: '200px',
        css: {
            position: 'absolute',
            opacity: 1,
            bottom:'25px',
            left:'50%',
            marginLeft:'-75px',
            backgroundImage: 'url(./src/img/6.jpeg)',
            backgroundSize: '100% 100%',
        },
        animateIn: {
            opacity: 1,
            top: '2%',
            left: '50%'
        },
        animateOut: {
            opacity: 0,
            bottom:'25px',
            left:'50%',
            marginLeft:'-75px',
        },
        delay: 1800,
        event: {
            hover: [function () {
                $(this).find('.mas').css({
                    display: 'block'
                })
            },
            function () {
                $(this).find('.mas').css({
                    display: 'none'
                })
            }]
        }


    }, function () {
        var $odom = $('<div class="mas"></div>').css({
            position: 'absolute',
            width: '300px',
            height: '400px',
            right: '-150px',
            bottom: '-400px',
            backgroundImage: 'url(./src/img/6.jpeg)',
            backgroundSize: '100% 100%',
            display: 'none',
            zIndex:999
        });
        return $odom;
    })
    .addComponent({
        width: '150px',
        height: '200px',
        css: {
            position: 'absolute',
            opacity: 1,
            bottom:'25px',
            left:'50%',
            marginLeft:'-75px',
            backgroundImage: 'url(./src/img/7.jpeg)',
            backgroundSize: '100% 100%',
        },
        animateIn: {
            opacity: 1,
            top: '2%',
            left: '60%'
        },
        animateOut: {
            opacity: 0,
            bottom:'25px',
            left:'50%',
            marginLeft:'-75px',
        },
        delay: 2000,
        event: {
            hover: [function () {
                $(this).find('.mas').css({
                    display: 'block'
                })
            },
            function () {
                $(this).find('.mas').css({
                    display: 'none'
                })
            }]
        }


    }, function () {
        var $odom = $('<div class="mas"></div>').css({
            position: 'absolute',
            width: '300px',
            height: '400px',
            left: '-150px',
            bottom: '-400px',
            backgroundImage: 'url(./src/img/7.jpeg)',
            backgroundSize: '100% 100%',
            display: 'none',
            zIndex:999
        });
        return $odom;
    })
    .addComponent({
        width: '150px',
        height: '200px',
        css: {
            position: 'absolute',
            opacity: 1,
            bottom:'25px',
            left:'50%',
            marginLeft:'-75px',
            backgroundImage: 'url(./src/img/8.jpeg)',
            backgroundSize: '100% 100%',
        },
        animateIn: {
            opacity: 1,
            top: '2%',
            left: '70%'
        },
        animateOut: {
            opacity: 0,
            bottom:'25px',
            left:'50%',
            marginLeft:'-75px',
        },
        delay: 2200,
        event: {
            hover: [function () {
                $(this).find('.mas').css({
                    display: 'block'
                })
            },
            function () {
                $(this).find('.mas').css({
                    display: 'none'
                })
            }]
        }


    }, function () {
        var $odom = $('<div class="mas"></div>').css({
            position: 'absolute',
            width: '300px',
            height: '400px',
            left: '-150px',
            bottom: '-400px',
            backgroundImage: 'url(./src/img/8.jpeg)',
            backgroundSize: '100% 100%',
            display: 'none',
            zIndex:999
        });
        return $odom;
    })
    .addComponent({
        width: '150px',
        height: '200px',
        css: {
            position: 'absolute',
            opacity: 1,
            bottom:'25px',
            left:'50%',
            marginLeft:'-75px',
            backgroundImage: 'url(./src/img/9.jpeg)',
            backgroundSize: '100% 100%',
        },
        animateIn: {
            opacity: 1,
            top: '2%',
            left: '80%'
        },
        animateOut: {
            opacity: 0,
            bottom:'25px',
            left:'50%',
            marginLeft:'-75px',
        },
        delay: 2400,
        event: {
            hover: [function () {
                $(this).find('.mas').css({
                    display: 'block'
                })
            },
            function () {
                $(this).find('.mas').css({
                    display: 'none'
                })
            }]
        }


    }, function () {
        var $odom = $('<div class="mas"></div>').css({
            position: 'absolute',
            width: '300px',
            height: '400px',
            left: '-150px',
            bottom: '-400px',
            backgroundImage: 'url(./src/img/9.jpeg)',
            backgroundSize: '100% 100%',
            display: 'none',
            zIndex:999
        });
        return $odom;
    })
    .addComponent({
        width: '150px',
        height: '200px',
        css: {
            position: 'absolute',
            opacity: 1,
            bottom:'25px',
            left:'50%',
            marginLeft:'-75px',
            backgroundImage: 'url(./src/img/10.jpeg)',
            backgroundSize: '100% 100%',
        },
        animateIn: {
            opacity: 1,
            top: '2%',
            left: '90%'
        },
        animateOut: {
            opacity: 0,
            bottom:'25px',
            left:'50%',
            marginLeft:'-75px',
        },
        delay: 2600,
        event: {
            hover: [function () {
                $(this).find('.mas').css({
                    display: 'block'
                })
            },
            function () {
                $(this).find('.mas').css({
                    display: 'none'
                })
            }]
        }


    }, function () {
        var $odom = $('<div class="mas"></div>').css({
            position: 'absolute',
            width: '300px',
            height: '400px',
            left: '-150px',
            bottom: '-400px',
            backgroundImage: 'url(./src/img/10.jpeg)',
            backgroundSize: '100% 100%',
            display: 'none',
            zIndex:999
        });
        return $odom;
    })
 
    
      
 
    









    .addComponent({
        width: '150px',
        height: '200px',
        css: {
            position: 'absolute',
            opacity: 1,
            bottom:'25px',
            left:'50%',
            marginLeft:'-75px',
            backgroundImage: 'url(./src/img/12.jpeg)',
            backgroundSize: '100% 100%',
        },
        animateIn: {
            opacity: 1,
            top: '30%',
            left: '10%'
        },
        animateOut: {
            opacity: 0,
            bottom:'25px',
            left:'50%',
            marginLeft:'-75px',
        },
        delay: 2800,
        event: {
            hover: [function () {
                $(this).find('.mas').css({
                    display: 'block'
                })
            },
            function () {
                $(this).find('.mas').css({
                    display: 'none'
                })
            }]
        }


    }, function () {
        var $odom = $('<div class="mas"></div>').css({
            position: 'absolute',
            width: '300px',
            height: '400px',
            right: '-150px',
            bottom: '-400px',
            backgroundImage: 'url(./src/img/12.jpeg)',
            backgroundSize: '100% 100%',
            display: 'none',
            zIndex:999
        });
        return $odom;
    })
    .addComponent({
        width: '150px',
        height: '200px',
        css: {
            position: 'absolute',
            opacity: 1,
            bottom:'25px',
            left:'50%',
            marginLeft:'-75px',
            backgroundImage: 'url(./src/img/13.jpeg)',
            backgroundSize: '100% 100%',
        },
        animateIn: {
            opacity: 1,
            top: '30%',
            left: '20%'
        },
        animateOut: {
            opacity: 0,
            bottom:'25px',
            left:'50%',
            marginLeft:'-75px',
        },
        delay: 3000,
        event: {
            hover: [function () {
                $(this).find('.mas').css({
                    display: 'block'
                })
            },
            function () {
                $(this).find('.mas').css({
                    display: 'none'
                })
            }]
        }


    }, function () {
        var $odom = $('<div class="mas"></div>').css({
            position: 'absolute',
            width: '300px',
            height: '400px',
            right: '-150px',
            bottom: '-400px',
            backgroundImage: 'url(./src/img/13.jpeg)',
            backgroundSize: '100% 100%',
            display: 'none',
            zIndex:999
        });
        return $odom;
    })
    .addComponent({
        width: '150px',
        height: '200px',
        css: {
            position: 'absolute',
            opacity: 1,
            bottom:'25px',
            left:'50%',
            marginLeft:'-75px',
            backgroundImage: 'url(./src/img/14.jpeg)',
            backgroundSize: '100% 100%',
        },
        animateIn: {
            opacity: 1,
            top: '30%',
            left: '30%'
        },
        animateOut: {
            opacity: 0,
            bottom:'25px',
            left:'50%',
            marginLeft:'-75px',
        },
        delay: 3200,
        event: {
            hover: [function () {
                $(this).find('.mas').css({
                    display: 'block'
                })
            },
            function () {
                $(this).find('.mas').css({
                    display: 'none'
                })
            }]
        }


    }, function () {
        var $odom = $('<div class="mas"></div>').css({
            position: 'absolute',
            width: '300px',
            height: '400px',
            right: '-150px',
            bottom: '-400px',
            backgroundImage: 'url(./src/img/14.jpeg)',
            backgroundSize: '100% 100%',
            display: 'none',
            zIndex:999
        });
        return $odom;
    })
    .addComponent({
        width: '150px',
        height: '200px',
        css: {
            position: 'absolute',
            opacity: 1,
            bottom:'25px',
            left:'50%',
            marginLeft:'-75px',
            backgroundImage: 'url(./src/img/15.jpeg)',
            backgroundSize: '100% 100%',
        },
        animateIn: {
            opacity: 1,
            top: '30%',
            left: '40%'
        },
        animateOut: {
            opacity: 0,
            bottom:'25px',
            left:'50%',
            marginLeft:'-75px',
        },
        delay: 3400,
        event: {
            hover: [function () {
                $(this).find('.mas').css({
                    display: 'block'
                })
            },
            function () {
                $(this).find('.mas').css({
                    display: 'none'
                })
            }]
        }


    }, function () {
        var $odom = $('<div class="mas"></div>').css({
            position: 'absolute',
            width: '300px',
            height: '400px',
            right: '-150px',
            bottom: '-400px',
            backgroundImage: 'url(./src/img/15.jpeg)',
            backgroundSize: '100% 100%',
            display: 'none',
            zIndex:999
        });
        return $odom;
    })
    .addComponent({
        width: '150px',
        height: '200px',
        css: {
            position: 'absolute',
            opacity: 1,
            bottom:'25px',
            left:'50%',
            marginLeft:'-75px',
            backgroundImage: 'url(./src/img/16.jpg)',
            backgroundSize: '100% 100%',
        },
        animateIn: {
            opacity: 1,
            top: '30%',
            left: '50%'
        },
        animateOut: {
            opacity: 0,
            bottom:'25px',
            left:'50%',
            marginLeft:'-75px',
        },
        delay: 3600,
        event: {
            hover: [function () {
                $(this).find('.mas').css({
                    display: 'block'
                })
            },
            function () {
                $(this).find('.mas').css({
                    display: 'none'
                })
            }]
        }


    }, function () {
        var $odom = $('<div class="mas"></div>').css({
            position: 'absolute',
            width: '300px',
            height: '400px',
            right: '-150px',
            bottom: '-400px',
            backgroundImage: 'url(./src/img/16.jpg)',
            backgroundSize: '100% 100%',
            display: 'none',
            zIndex:999
        });
        return $odom;
    })
    .addComponent({
        width: '150px',
        height: '200px',
        css: {
            position: 'absolute',
            opacity: 1,
            bottom:'25px',
            left:'50%',
            marginLeft:'-75px',
            backgroundImage: 'url(./src/img/17.jpg)',
            backgroundSize: '100% 100%',
        },
        animateIn: {
            opacity: 1,
            top: '30%',
            left: '60%'
        },
        animateOut: {
            opacity: 0,
            bottom:'25px',
            left:'50%',
            marginLeft:'-75px',
        },
        delay: 3800,
        event: {
            hover: [function () {
                $(this).find('.mas').css({
                    display: 'block'
                })
            },
            function () {
                $(this).find('.mas').css({
                    display: 'none'
                })
            }]
        }


    }, function () {
        var $odom = $('<div class="mas"></div>').css({
            position: 'absolute',
            width: '300px',
            height: '400px',
            left: '-150px',
            bottom: '-400px',
            backgroundImage: 'url(./src/img/17.jpg)',
            backgroundSize: '100% 100%',
            display: 'none',
            zIndex:999
        });
        return $odom;
    })
    .addComponent({
        width: '150px',
        height: '200px',
        css: {
            position: 'absolute',
            opacity: 1,
            bottom:'25px',
            left:'50%',
            marginLeft:'-75px',
            backgroundImage: 'url(./src/img/18.jpg)',
            backgroundSize: '100% 100%',
        },
        animateIn: {
            opacity: 1,
            top: '30%',
            left: '70%'
        },
        animateOut: {
            opacity: 0,
            bottom:'25px',
            left:'50%',
            marginLeft:'-75px',
        },
        delay: 4000,
        event: {
            hover: [function () {
                $(this).find('.mas').css({
                    display: 'block'
                })
            },
            function () {
                $(this).find('.mas').css({
                    display: 'none'
                })
            }]
        }


    }, function () {
        var $odom = $('<div class="mas"></div>').css({
            position: 'absolute',
            width: '300px',
            height: '400px',
            left: '-150px',
            bottom: '-400px',
            backgroundImage: 'url(./src/img/18.jpg)',
            backgroundSize: '100% 100%',
            display: 'none',
            zIndex:999
        });
        return $odom;
    })
    .addComponent({
        width: '150px',
        height: '200px',
        css: {
            position: 'absolute',
            opacity: 1,
            bottom:'25px',
            left:'50%',
            marginLeft:'-75px',
            backgroundImage: 'url(./src/img/19.jpg)',
            backgroundSize: '100% 100%',
        },
        animateIn: {
            opacity: 1,
            top: '30%',
            left: '80%'
        },
        animateOut: {
            opacity: 0,
            bottom:'25px',
            left:'50%',
            marginLeft:'-75px',
        },
        delay: 4200,
        event: {
            hover: [function () {
                $(this).find('.mas').css({
                    display: 'block'
                })
            },
            function () {
                $(this).find('.mas').css({
                    display: 'none'
                })
            }]
        }


    }, function () {
        var $odom = $('<div class="mas"></div>').css({
            position: 'absolute',
            width: '300px',
            height: '400px',
            left: '-150px',
            bottom: '-400px',
            backgroundImage: 'url(./src/img/19.jpg)',
            backgroundSize: '100% 100%',
            display: 'none',
            zIndex:999
        });
        return $odom;
    })
    .addComponent({
        width: '150px',
        height: '200px',
        css: {
            position: 'absolute',
            opacity: 1,
            bottom:'25px',
            left:'50%',
            marginLeft:'-75px',
            backgroundImage: 'url(./src/img/20.jpg)',
            backgroundSize: '100% 100%',
        },
        animateIn: {
            opacity: 1,
            top: '30%',
            left: '90%'
        },
        animateOut: {
            opacity: 0,
            bottom:'25px',
            left:'50%',
            marginLeft:'-75px',
        },
        delay: 4400,
        event: {
            hover: [function () {
                $(this).find('.mas').css({
                    display: 'block'
                })
            },
            function () {
                $(this).find('.mas').css({
                    display: 'none'
                })
            }]
        }


    }, function () {
        var $odom = $('<div class="mas"></div>').css({
            position: 'absolute',
            width: '300px',
            height: '400px',
            left: '-150px',
            bottom: '-400px',
            backgroundImage: 'url(./src/img/20.jpg)',
            backgroundSize: '100% 100%',
            display: 'none',
            zIndex:999
        });
        return $odom;
    })
 








    .load()

