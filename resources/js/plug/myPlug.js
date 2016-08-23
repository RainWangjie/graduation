/**
 * Created by gewangjie on 16/8/18.
 */
function wj_plug(el, options) {
    var t = this;
    t.wrapper = typeof el == 'string' ? document.querySelector(el) : el;
    t.options = {};
    t.prePage = 0;
    t.currentPage = 0;
    t.currentPosition = 0;
    t.totalPage = 0;
    t.screenWidth = window.innerWidth;

    t.options = {
        indicator: true,
        autoplay: false,
        interval: 5000
    };

    for (var i in options) {
        t.options[i] = options[i];
    }
    // tab
    if (t.options.role == 'tab') {
        t.totalPage = document.querySelectorAll('.tab-nav li').length;
        t.nav = document.querySelectorAll('.tab-nav li');

        t.chooseNav = function () {
            t.nav.forEach(function (el) {
                el.classList.remove('current');
            });
            t.nav[t.currentPage].classList.add('current');
            console.log('from ' + t.prePage + ' to ' + t.currentPage);
        };

        t.chooseContent = function () {
            var content = document.getElementsByClassName('tab-content')[0];
            var translateX = 'translate3d(' + t.currentPage * -t.screenWidth + 'px,0,0)';
            content.style.transform = translateX;
            content.style.webkitTransform = translateX;
        };

        //click nav
        t.nav.forEach(function (el, index) {
            el.onclick = function () {
                t.prePage = t.currentPage;
                t.currentPage = index;
                t.currentPosition = -1 * index * t.screenWidth;
                t.chooseNav();
                t.chooseContent();
            }
        });

        t.init = function () {
            t.chooseNav();
            t.chooseContent();
        };

        t.init();

        //swipe body
        bindTouchEvent('.tab-content', function () {
            t.chooseNav();
            t.chooseContent();
        });
    }
    // slider
    if (t.options.role == 'slider') {
        var content = document.getElementsByClassName('slider-content')[0];

        t.totalPage = document.querySelectorAll('.slider-content li').length;

        if (t.options.indicator) {
            var ulNode = document.createElement('ul');
            ulNode.className = 'slider-indicators';

            for (var i = 1; i <= t.totalPage; i++) {
                var liNode = document.createElement('li');
                liNode.innerHTML = i;
                i == 1 && liNode.className == 'current';
                ulNode.appendChild(liNode);
            }
            document.querySelector('.slider').appendChild(ulNode);
        }
        t.indicator = document.querySelectorAll('.slider-indicators li');

        t.chooseIndicator = function () {
            if (t.indicator) {
                t.indicator.forEach(function (el) {
                    el.classList.remove('current');
                });
                t.indicator[t.currentPage].classList.add('current');
            }
        };
        t.chooseContent = function () {
            var translateX = 'translate3d(' + t.currentPage * -(100 / t.totalPage) + '%,0,0)';
            content.style.transform = translateX;
            content.style.webkitTransform = translateX;
            console.log('from ' + t.prePage + ' to ' + t.currentPage);
        };

        t.init = function () {
            t.chooseIndicator();
            t.chooseContent();
        };

        t.init();

        var autoplayTimer = setInterval(function () {
            if (t.options.autoplay) {
                t.prePage = t.currentPage;
                t.currentPage == t.totalPage - 1 ? t.currentPage = 0 : t.currentPage++;
                setTimeout(function () {
                    //设置页码，DOM操作需要放到子线程中，否则会出现卡顿
                    t.chooseIndicator();
                    t.chooseContent();
                }.bind(this), 100);
            } else {
                clearInterval(autoplayTimer);
            }
        }, t.options.interval);

        //swipe body
        bindTouchEvent('.slider-content', function () {
            t.chooseIndicator();
            t.chooseContent();
        });
    }

    function transform(el, translate) {
        el.style.webkitTransform = "translate3d(" + translate + "px,0,0)";
        t.currentPosition = translate;

    }

    function bindTouchEvent(ele, callback) {
        var viewport = document.querySelector(ele);
        var pageWidth = t.screenWidth; //页面宽度
        var maxWidth = -pageWidth * (t.totalPage - 1); //页面滑动最后一页的位置
        var startX, startY;
        var initialPos = 0;  // 手指按下的屏幕位置
        var moveLength = 0;  // 手指当前滑动的距离
        var direction = "left"; //滑动的方向
        var isMove = false; //是否发生左右滑动
        var startT = 0; //记录手指按下去的时间

        /*手指放在屏幕上*/
        viewport.addEventListener("touchstart", function (e) {
            e.preventDefault();
            var touch = e.touches[0];
            startX = touch.pageX;
            startY = touch.pageY;
            initialPos = t.currentPosition;   //本次滑动前的初始位置
            viewport.style.webkitTransition = ""; //取消动画效果
            startT = new Date().getTime(); //记录手指按下的开始时间
            isMove = false; //是否产生滑动
        }.bind(this), false);

        /*手指在屏幕上滑动，页面跟随手指移动*/
        viewport.addEventListener("touchmove", function (e) {
            e.preventDefault();
            var touch = e.touches[0];
            var deltaX = touch.pageX - startX;
            var deltaY = touch.pageY - startY;
            //如果X方向上的位移大于Y方向，则认为是左右滑动
            if (Math.abs(deltaX) > Math.abs(deltaY)) {
                moveLength = deltaX;
                var translate = initialPos + deltaX; //当前需要移动到的位置
                //如果translate>0 或 < maxWidth,则表示页面超出边界
                if (translate <= 0 && translate >= maxWidth) {
                    transform(viewport, translate);
                    isMove = true;
                }
                direction = deltaX > 0 ? "right" : "left"; //判断手指滑动的方向
            }
        }.bind(this), false);

        /*手指离开屏幕时，计算最终需要停留在哪一页*/
        viewport.addEventListener("touchend", function (e) {
            e.preventDefault();
            var translate = 0;
            //计算手指在屏幕上停留的时间
            var deltaT = new Date().getTime() - startT;
            if (isMove) { //发生了左右滑动
                //使用动画过渡让页面滑动到最终的位置
                viewport.style.webkitTransition = "0.3s ease -webkit-transform";
                if (deltaT < 300) { //如果停留时间小于300ms,则认为是快速滑动，无论滑动距离是多少，都停留到下一页
                    translate = direction == 'left' ?
                    t.currentPosition - (pageWidth + moveLength) : t.currentPosition + pageWidth - moveLength;
                    //如果最终位置超过边界位置，则停留在边界位置
                    translate = translate > 0 ? 0 : translate; //左边界
                    translate = translate < maxWidth ? maxWidth : translate; //右边界
                } else {
                    //如果滑动距离小于屏幕的50%，则退回到上一页
                    if (Math.abs(moveLength) / pageWidth < 0.5) {
                        translate = t.currentPosition - moveLength;
                    } else {
                        //如果滑动距离大于屏幕的50%，则滑动到下一页
                        translate = direction == 'left' ?
                        t.currentPosition - (pageWidth + moveLength) : t.currentPosition + pageWidth - moveLength;
                        translate = translate > 0 ? 0 : translate;
                        translate = translate < maxWidth ? maxWidth : translate;
                    }
                }
                //执行滑动，让页面完整的显示到屏幕上
                transform(viewport, translate);

                //计算当前的页码
                t.prePage = t.currentPage;
                t.currentPage = Math.round(Math.abs(translate) / pageWidth);
                setTimeout(function () {
                    //设置页码，DOM操作需要放到子线程中，否则会出现卡顿
                    // this.setPageNow();
                    callback();
                }.bind(this), 100);
            }
        }.bind(this), false);
    }

}
