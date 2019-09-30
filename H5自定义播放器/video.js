(function () {
    function init() {
        //初始值
        var menu = document.getElementsByClassName('menu')[0];
        var menuWidth = menu.clientWidth;
        bindEvent();
        getFile(menuWidth);
        playList();
        menuEvent();
        isCursorShow();
        keyEvent();
    }
    function menuEvent() {
        //控制栏
        var menuBox = document.getElementsByClassName('menu-box')[0];
        menuBox.onmouseenter = function (e) {
            if (e.offsetX > 250) {
                this.style.transformOrigin = 'right';
            } else if (e.offsetX < 200) {
                this.style.transformOrigin = 'left';
            } else {
                this.style.transformOrigin = 'center';

            }

        }
        menuBox.onmouseleave = function () {
            this.style.transformOrigin = 'center';

        }
    }
    //绑定事件
    function bindEvent() {
        var play = document.getElementsByClassName('play')[0];
        var video = document.getElementsByTagName('video')[0];
        var menu = document.getElementsByClassName('menu')[0];
        var timer = null;
        play.onmouseenter = function () {
            clearTimeout(timer);
            menu.style.bottom = '0px';
        }
        play.onmouseleave = function () {
            timer = setTimeout(function () {
                menu.style.bottom = '-50px';
            }, 1000)
        }
        //进度条
        var bar = document.getElementsByClassName('bar')[0];
        var colorBar = bar.getElementsByTagName('div')[0];
        var ii = bar.getElementsByTagName('i')[0];
        var barTimer1 = '';
        var barTimer2 = '';
        var barTimer3 = '';
        menu.onmouseenter = function () {
            bar.style.height = '16px';
            bar.style.top = '-16px';
            colorBar.style.height = '16px';
            ii.style.height = '20px';
            ii.style.width = '20px';

            barTimer1 = setTimeout(function () {
                bar.style.height = '2px';
                bar.style.top = '-2px';
                colorBar.style.height = '2px';
                ii.style.height = '6px';
                ii.style.width = '6px';

            }, 2000)
        }
        bar.onmouseenter = function () {
            bar.style.height = '16px';
            bar.style.top = '-16px';
            colorBar.style.height = '16px';
            ii.style.height = '20px';
            ii.style.width = '20px';

            barTimer3 = setTimeout(function () {
                bar.style.height = '2px';
                bar.style.top = '-2px';
                colorBar.style.height = '2px';
                ii.style.height = '6px';
                ii.style.width = '6px';

            }, 2000)
        }
        bar.onmouseenter = function () {
            clearTimeout(barTimer1);
            clearTimeout(barTimer2);
            clearTimeout(barTimer3);

        }
        bar.onmouseleave = function () {
            barTimer2 = setTimeout(function () {
                bar.style.height = '2px';
                bar.style.top = '-2px';
                colorBar.style.height = '2px';
                ii.style.height = '6px';
                ii.style.width = '6px';

            }, 2000)
        }
        bar.onclick = function (e) {
            var allwidth = menu.clientWidth;
            var allTime = video.duration;
            var currlocation = e.layerX;
            video.currentTime = currlocation / allwidth * allTime;
        }
        //倍速
        var speed = document.getElementsByClassName('speed')[0];
        var speedDiv = speed.getElementsByTagName('ul')[0];
        var ss = speed.getElementsByTagName('span')[0];
        var speedTimer;
        speed.onclick = function () {
            speedDiv.style.display = 'block';
            speedTimer = setTimeout(function () {
                speedDiv.style.display = 'none';
            }, 2000)
        }
        speedDiv.onmouseenter = function () {
            clearTimeout(speedTimer);
        }
        speedDiv.onmouseleave = function () {
            this.style.display = 'none';
        }
        var li = speedDiv.getElementsByTagName('li');
        for (var i = 0; i < li.length; i++) {
            li[i].index = i;
            li[i].onclick = function () {
                if (this.index == 0) {
                    video.playbackRate = 1;
                    ss.innerText = 'X1';

                } else if (this.index == 1) {
                    video.playbackRate = 1.25;
                    ss.innerText = 'X1.25';

                } else if (this.index == 2) {
                    video.playbackRate = 1.5;
                    ss.innerText = 'X1.5';



                } else if (this.index == 3) {
                    video.playbackRate = 2;
                    ss.innerText = 'X2';

                }

            }
        }
        //list
        var backPlay = document.getElementsByClassName('back-play')[0];
        var listBtn = document.getElementsByClassName('playlist-btn')[0];
        listBtn.onclick = function () {
            playList(true, 180);
        }
        backPlay.onclick = function () {
            playList(false, 360);

        }
        // 音量
        var vol = document.getElementsByClassName('vol')[0];
        var volBar = document.getElementsByClassName('vol-bar')[0];
        var vheade = document.getElementsByClassName('vheade')[0];
        var volNum = document.getElementsByClassName('vol-num')[0];
        var cbar = document.getElementsByClassName('cbar')[0];
        var volTimer;
        cbar.style.height = 100 * video.volume + 'px'
        vheade.style.top = 100 - (100 * video.volume) + 'px';

        vol.onclick = function () {
            volBar.style.display = 'block';
            volTimer = setTimeout(function () {
                volBar.style.display = 'none';

            }, 2000)
        }
        volBar.onmouseenter = function () {
            clearTimeout(volTimer);

        }
        volBar.onmouseleave = function () {
            this.style.display = 'none';
        }
        vheade.onmousedown = function (e) {
            e.preventDefault();

            var topY = e.clientY;
            var c = topY - this.offsetTop;
            document.onmousemove = function (e) {

                var newY = e.clientY - c;
                if (newY <= 100 && newY >= 0) {
                    volNum.innerText = 100 - newY;
                    video.volume = (100 - newY) / 100;
                    cbar.style.height = 100 - newY + 'px'
                    vheade.style.top = newY + 'px';
                }
            }
        }
        volBar.onmouseup = function () {
            document.onmousemove = null;
        }

        //全屏

        var full = document.getElementsByClassName('full')[0];
        full.onclick = function () {
            if (!document.webkitIsFullScreen) {
                play.requestFullscreen();
                play.style.width = window.screen.width + 'px';
                play.style.height = window.screen.height + 'px';
                video.style.width = window.screen.width + 'px';
                video.style.height = window.screen.height + 'px';
            } else {
                document.exitFullscreen();
                play.style.width = '900px';
                play.style.height = '600px';
                video.style.width = '900px';
                video.style.height = '600px';
            }

        }
        document.onfullscreenchange = function () {
            if (!document.webkitIsFullScreen) {
                play.style.width = '900px';
                play.style.height = '600px';
                video.style.width = '900px';
                video.style.height = '600px';
            }
        }
        video.ondblclick = function () {
            if (!document.webkitIsFullScreen) {
                play.requestFullscreen();
                play.style.width = window.screen.width + 'px';
                play.style.height = window.screen.height + 'px';
                video.style.width = window.screen.width + 'px';
                video.style.height = window.screen.height + 'px';
            } else {
                document.exitFullscreen();
                play.style.width = '900px';
                play.style.height = '600px';
                video.style.width = '900px';
                video.style.height = '600px';
            }
        }


    }
    function cursorEvent(flag, timer) {
        var play = document.getElementsByClassName('play')[0];
        var menu = document.getElementsByClassName('menu')[0];
        var menuTimer = null;
        if (!flag) {
            play.className = 'play play-cursor';
            menuTimer = setTimeout(function () {
                menu.style.bottom = '-50px';
            }, 1000)

        } else {
            clearTimeout(timer);
            play.className = 'play';
            clearTimeout(menuTimer);
            menu.style.bottom = '0px';
        }

    }
    function palyBtnChange(menuWidth) {
        var playBtn = document.getElementsByClassName('play-btn')[0];
        var video = document.getElementsByTagName('video')[0];
        var time = document.getElementsByClassName('time')[0];
        var bar = document.getElementsByClassName('bar')[0];
        var colorBar = bar.getElementsByTagName('div')[0];
        var ii = bar.getElementsByTagName('i')[0];
        var inTimer = null;
        playBtn.onclick = function () {
            if (video.paused) {
                video.play();
                inTimer = palyBar(video, time, colorBar, ii, menuWidth);
                playBtn.className = 'play-btn pause';
            } else {
                clearInterval(inTimer);
                video.pause();
                playBtn.className = 'play-btn playing';
            }
        }
        keyEvent(playBtn, video, time, colorBar, ii, menuWidth);
        if (video.paused) {
            inTimer = palyBar(video, time, colorBar, ii, menuWidth);
            playList(false, 360);
            playBtn.className = 'play-btn pause';
        } else {
            clearInterval(inTimer);
            playBtn.className = 'play-btn playing';
        }
    }
    function addPreZero(num) {
        return ('00' + num).slice(-2);
    }
    function palyBar(video, time, colorBar, ii, menuWidth) {
       video.oncanplay = function () {
        var allwidth = menuWidth;
        var hour = 0;
        var currHour = 0;
        var inTimer = setInterval(function () {
            var currtime = video.currentTime;
            var allTime = video.duration;
            if(parseInt(allTime / 60) > 60){
               hour = parseInt(allTime / 3600)
            }
            if(parseInt(currtime / 60) > 60){
                currHour = parseInt(currtime / 3600)
             }
            time.innerHTML = addPreZero(parseInt(currtime / 3600)) + ':'+ addPreZero(parseInt(currtime / 60) - currHour * 60) + ':' + addPreZero(parseInt(currtime % 60)) + '/' + addPreZero(parseInt(allTime / 3600))+ ':' + addPreZero(parseInt(allTime / 60) - hour * 60) + ':' + addPreZero(parseInt(allTime % 60));
            colorBar.style.width = currtime / allTime * allwidth + 'px';
            ii.style.left = currtime / allTime * allwidth - 5 + 'px';
        }, 1000)
        return inTimer;
       }

    }
    function getFile(menuWidth) {
        var ii = document.getElementById('ii');
        ii.addEventListener('change', function () {
            var fil = ii.files;
            rendList(fil,menuWidth)
        })

    }
    function rendList(data,menuWidth) {
        var str = '';
        var oul = document.getElementsByClassName('video-list')[0];
        for (var i = 0; i < data.length; i++) {
            str += '<li data-src = "' + 'E:' + data[i].webkitRelativePath + '">' + data[i].name + '</li>';
        }
        oul.innerHTML = str;
        rendBind(menuWidth);


    }
    function rendBind(menuWidth) {
        var oul = document.getElementsByClassName('video-list')[0];
        var oli = oul.getElementsByTagName('li');
        var play = document.getElementsByClassName('play')[0];
        var playList = document.getElementsByClassName('playlist')[0];

        var video = document.getElementsByTagName('video')[0];
        for (var i = 0; i < oli.length; i++) {
            oli[i].onclick = function () {
                for (var j = 0; j < oli.length; j++) {
                    oli[j].className = '';
                }
                this.className = 'liing';

                video.src = this.getAttribute('data-src');
                palyBtnChange(menuWidth);
                

            }
        }
        oul.onmousemove = function (e) {
            var oranginY = e.clientY - this.offsetTop - play.offsetTop
            var oranginX = e.clientX - this.offsetLeft - playList.offsetLeft;
            this.style.perspectiveOrigin = oranginX + 'px ' + oranginY + 'px';
        }
    }
    function playList(isShow, deg) {
        var playList = document.getElementsByClassName('playlist')[0];
        var play = document.getElementsByClassName('play')[0];
        var menu = document.getElementsByClassName('menu')[0];
        if (isShow) {
            play.style.transform = 'rotateY(' + deg + 'deg)';
            menu.style.display = 'none';
            playList.style.zIndex = 1;
            setTimeout(function () {
                playList.style.opacity = 1;
            }, 200)
        } else {
            play.style.transform = 'rotateY(' + deg + 'deg)';
            menu.style.display = 'block';
            setTimeout(function () {
                playList.style.zIndex = -1;
            }, 300)
            setTimeout(function () {
                playList.style.opacity = 0;
            }, 200)
        }
    }
    function isCursorShow() {
        var play = document.getElementsByClassName('play')[0];
        var newX, newY, initX, initY;
        var timer = null;
        play.onmouseenter = function (e) {
            initX = e.clientX;
            initY = e.clientY;
        }
        play.onmousemove = function (e) {
            newX = e.clientX;
            newY = e.clientY;
            if (Math.abs(newX - initX) > 1 || Math.abs(newY - initY) > 1) {
                initX = newX;
                initY = newY;
                cursorEvent(1, timer);
                timer = setTimeout(function () {
                    if (Math.abs(newX - initX) < 1 && Math.abs(newY - initY) < 1) {
                        cursorEvent(0);
                    }
                }, 2000)
            }
        }



    }
    function keyEvent(playBtn, video, time, colorBar, ii, menuWidth) {
        var inTimer = null;
        var vheade = document.getElementsByClassName('vheade')[0];
        var cbar = document.getElementsByClassName('cbar')[0];
        var volTip = document.getElementsByClassName('vol-tip')[0];
        var volTipContent = volTip.getElementsByTagName('span')[0];
        document.onkeydown = function (e) {
            if (e.keyCode == 32) {
                //空格
                if (video.paused) {
                    video.play();
                    inTimer = palyBar(video, time, colorBar, ii, menuWidth);
                    playBtn.className = 'play-btn pause';
                } else {
                    clearInterval(inTimer);
                    video.pause();
                    playBtn.className = 'play-btn playing';
                }
            } else if (e.keyCode == 38 || e.keyCode == 40) {
                //音量
                var volFlag = 0.05;
                var keyTimer = null;
                clearTimeout(keyTimer);
                if (e.keyCode == 38) {
                    video.volume = video.volume >= 1 - volFlag ? 1 : video.volume + volFlag;
                } else {
                    video.volume = video.volume <= volFlag ? 0 : video.volume - volFlag;
                }
                cbar.style.height = 100 * video.volume + 'px'
                vheade.style.top = 100 - (100 * video.volume) + 'px';
                volTip.style.opacity = 1;
                keyTimer = setTimeout(function () {
                    volTip.style.opacity = 0;

                }, 2000)
                volTipContent.innerText = parseInt(100 * video.volume);
            } else if (e.keyCode == 37 || e.keyCode == 39) {
                //快进
                var sppedFlag = 5;
                var allTime = video.duration;
                if (e.keyCode == 37) {
                    video.currentTime = video.currentTime <= sppedFlag ? 0 : video.currentTime - sppedFlag;
                } else {
                    video.currentTime = video.currentTime >= (allTime - sppedFlag) ? allTime : video.currentTime + sppedFlag;
                }
            }

        }
    }
    init();
})();