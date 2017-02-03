//将utils定义为window对象下的一个属性，属性值为对象
window.utils_canvas = {};

//在utils对象上定义捕获坐标的方法
//鼠标事件
window.utils_canvas.captureMouse = function (element) {
    //定义一个名为mouse的对象
    var mouse = {x: 0, y: 0};

    //为元素绑定mousemove事件
    element.addEventListener('mousemove', function (event) {
        var x, y;

        //获取鼠标位于当前屏幕的位置， 并作兼容处理
        if (event.pageX || event.pageY) {
            x = event.pageX;
            y = event.pageY;
        } else {
            x = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            y = event.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }
        //将当前的坐标值减去元素的偏移位置，即为鼠标位于当前canvas的位置
        x -= element.offsetLeft;
        y -= element.offsetTop;

        mouse.x = x;
        mouse.y = y;
    }, false);
    //返回值为mouse对象
    return mouse;
};
// 触摸事件
window.utils_canvas.captureTouch = function (element) {
    var touch = {
        x: null,
        isPressed: false,
        y: null,
        event: null
    };
    var body_scrollLeft = document.body.scrollLeft,
        element_scrollLeft = document.documentElement.scrollLeft,
        body_scrollTop = document.body.scrollTop,
        element_scrollTop = document.documentElement.scrollTop,
        offsetLeft = element.offsetLeft,
        offsetTop = element.offsetTop;

    // 绑定touchstart事件
    element.addEventListener('touchstart', function (event) {
        touch.isPressed = true;
        touch.event = event;
    }, false);

    // 绑定touchend事件
    element.addEventListener('touchend', function (event) {
        touch.isPressed = false;
        touch.x = null;
        touch.y = null;
        touch.event = event;
    }, false);

    //绑定touchmove事件
    element.addEventListener('touchmove', function (event) {
        var x, y,
            touch_event = event.touches[0]; //第一次touch

        if (touch_event.pageX || touch_event.pageY) {
            x = touch_event.pageX;
            y = touch_event.pageY;
        } else {
            x = touch_event.clientX + body_scrollLeft + element_scrollLeft;
            y = touch_event.clientY + body_scrollTop + element_scrollTop;
        }
        //减去偏移量
        x -= offsetLeft;
        y -= offsetTop;

        touch.x = x;
        touch.y = y;
        touch.event = event;
    }, false);
    //返回touch对象
    return touch;
};
//兼容requestAnimationFrame
//动画循环
if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = (window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    function (callback) {
        return window.setTimeout(callback, 1000/60);
    });
}

//动画循环取消
if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = (window.cancelRequestAnimationFrame ||
    window.webkitCancelAnimationFrame || window.webkitCancelRequestAnimationFrame ||
    window.mozCancelAnimationFrame || window.mozCancelRequestAnimationFrame ||
    window.msCancelAnimationFrame || window.msCancelRequestAnimationFrame ||
    window.oCancelAnimationFrame || window.oCancelRequestAnimationFrame ||
    window.clearTimeout);
}
// 颜色解析
utils_canvas.parseColor = function (color, toNumber) {
    if (toNumber === true) {
        if (typeof color === 'number') {
            return (color | 0); //chop off decimal
        }
        if (typeof color === 'string' && color[0] === '#') {
            color = color.slice(1);
        }
        return window.parseInt(color, 16);
    } else {
        if (typeof color === 'number') {
            color = '#' + ('00000' + (color | 0).toString(16)).substr(-6); //pad
        }
        return color;
    }
};
//将16进制颜色转换成rgb
utils_canvas.colorToRGB = function (color, alpha) {
    //如果是字符串格式，转换为数字
    if (typeof color === "string" && color[0] === "#") {

        //parseInt(('#ffffff').slice(1),16) 为 16777215
        color = window.parseInt(color.slice(1), 16);

    }
    alpha = (alpha === undefined) ? 1 : alpha;

    //将color转换成r,g,b值，>>右移  <<左移
    var r = color >> 16 & 0xff; //例如：16777215 >> 16 变成 255， 255 & 0xff为255
    var g = color >> 8 & 0xff;
    var b = color & 0xff;
    a = (alpha < 0) ? 0 : ((alpha > 1) ? 1 : alpha);

    if (a === 1) {
        return "rgb(" + r + "," + g + "," + b + ")";
    } else {
        return "rgb(" + r + "," + g + "," + b + "," + a + ")";
    }
};
//外接矩形判断
utils_canvas.containsPoint = function (rect, x, y) {
    return !(x < rect.x || x > rect.x + rect.width ||
    y < rect.y || y > rect.y + rect.height);
};
// 判断物体碰撞
utils_canvas.intersects = function (rectA, rectB) {
    return !(rectA.x + rectA.width < rectB.x ||
    rectB.x + rectB.width < rectA.x ||
    rectA.y + rectA.height < rectB.y ||
    rectB.y + rectB.height < rectA.y);
};