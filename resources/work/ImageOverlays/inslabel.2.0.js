/**
 * Created by gewangjie on 2017/2/14.
 */
(function ($) {
    var tagData = [],//标签数据name,color
        winScale = imgAreaEl.width() / imgAreaEl.height(),//图片放置区域比例
        imgSrc = '';//当前图片链接
    // 图片区域
    var _imgArea = function (options) {
        this.init(options);
        return this;
    };
    _imgArea.prototype = {
        init: function (options) {
            this.$dom = $(options.el);
            this.mouseType = 0;//鼠标操作内容，1：创建，2：移动，3：缩放
            this.isMouseDown = false;//鼠标点击动作
            this.mouse = {};//mouse属性(x,y)
            this.labelMove = {};//记录标注初始坐标等相关参数(x,y,resize)
            this.operateData = {};//标注操作参数(x,y,w,h)，animate方法使用(渲染)
            this.image = new _image(this.$dom);
        },
        _bindEvent: function () {
            var t = this;
            $('#img-area').on('mousedown', newLabelMouseDown);
            this.$dom.on('mousedown', function () {
                t.downEvent.call(t);
            }).on('mousemove', function () {
                t.moveEvent.call(t);
            }).on('mouseup', function () {
                t.upEvent.call(t);
            });
        },
        downEvent: function (event) {
            var t = this;
            t.mouse = util.captureMouse(event);
            t.isMouseDown = true;
            t.mouseType = 1;
            t.image.tempSelected = t.image.selected;
            t.images.selected = t.image.labelTotal;
            var newLabel = new _labelArea(t);
            t.labelMove = {
                x: t.mouse.x,
                y: t.mouse.y
            };
            t.image.labelList.push(newLabel);
            t.image.labelTotal++;
            util.animate(t);
            return false;
        },
        moveEvent: function (event) {
            if (this.isMouseDown) {
                var _image = this.image;
                this.mouse = util.captureMouse(event);
                switch (this.mouseType) {
                    case 1:
                        _image.labelList[_image.selected].moveEvent(this);
                        break;
                    case 2:
                        moveLabelMouseMove();
                        break;
                    case 3:
                        scaleLabelMouseMove();
                        break;
                }
            }
            return false;
        },
        upEvent: function () {
            if (this.isMouseDown) {
                switch (this.mouseType) {
                    case 1:
                        newLabelMouseup();
                        break;
                    case 2:
                        moveLabelMouseup();
                        break;
                    case 3:
                        scaleLabelMouseup();
                        break;
                }
                var _image = this.image;
                if (_image.labelList[_image.selected]) {//鼠标点击引起的错误
                    _image.labelList[_image.selected].y = this.operateData.y;
                    _image.labelList[_image.selected].x = this.operateData.x;
                    _image.labelList[_image.selected].w = this.operateData.w;
                    _image.labelList[_image.selected].h = this.operateData.h;
                    clearLabel();
                    linkage();
                    //操作label添加selected
                    $('.label-area').removeClass('selected');
                    $('#label_' + _image.selected).addClass('selected');
                }
            }
            // window.cancelAnimationFrame(animate);
            this.isMouseDown = false;
            this.mouseType = 0;
            return false;
        },
        reset: function () {

        }
    };
    // 标注
    var _labelArea = function (parentNode) {
        this.init(parentNode);
        return this;
    };
    _labelArea.prototype = {
        init: function (parentNode) {
            var _mouse = parentNode.mouse;
            this.$dom = $($('#tpl-area').html());
            this.position = {
                x: _mouse.x,
                y: _mouse.y,
                w: 0,
                h: 0
            };
            this.isExist = false;
        },
        moveEvent: function (parentNode) {
            var _mouse = parentNode.mouse,
                _image = parentNode.image;
            var difference_x = _mouse.x - parentNode.labelMove.x,
                difference_y = _mouse.y - parentNodelabelMove.y;
            if (difference_x >= 0 && difference_y >= 0) {
                // 左上角向右下角
                parentNode.operateData = {
                    x: parentNode.labelMove.x,
                    y: parentNode.labelMove.y,
                    w: Math.max(difference_x, 20),
                    h: Math.max(difference_y, 20)
                };
            } else if (difference_x >= 0 && difference_y < 0) {
                // 左下角向右上角
                parentNode.operateData = {
                    x: parentNode.labelMove.x,
                    y: parentNode.labelMove.y + difference_y,
                    w: Math.max(difference_x, 20),
                    h: Math.max(-1 * difference_y, 20)
                };
            } else if (difference_x < 0 && difference_y >= 0) {
                // 右上角向左下角
                parentNode.operateData = {
                    x: parentNode.labelMove.x + difference_x,
                    y: parentNode.labelMove.y,
                    w: Math.max(-1 * difference_x, 20),
                    h: Math.max(difference_y, 20)
                };
            } else {
                // 右下角向左上角
                parentNode.operateData = {
                    x: parentNode.labelMove.x + difference_x,
                    y: parentNode.labelMove.y + difference_y,
                    w: Math.max(-1 * difference_x, 20),
                    h: Math.max(-1 * difference_y, 20)
                };
            }
            if (!_image.labelList[_image.selected].isExist) {
                parentNode.$dom.append(_image.labelList[_image.selected].$dom);
                _image.labelList[_image.selected].isExist = true;
            }
        }
    };
    //图片
    var _image = function (parentNode) {
        this.init(parentNode);
        return this;
    };
    _image.prototype = {
        init: function (parentNode) {
            this.$dom = $('<img id="img-self" draggable="false">');
            parentNode.append(this.$dom);
            this.selected = 0;//操作标注索引
            this.tempSelected = 0;//暂存选择项
            this.labelList = [];//标注列表
            this.labelTotal = 0;//标注总数
            this.getImage();
        },
        getImage: function () {
            var t = this;
            placeHolderEl.setText('新图片加载中......');
            $.ajax({
                url: 'https://test.teegether.cn/deep_fashion/ins_label/img',
                type: 'GET',
                success: function (d) {
                    d = JSON.parse(d);
                    if (d.status.code == '1000') {
                        var url = d.result,
                            img = new Image();
                        clearAll();
                        img.onload = function () {
                            var imgScale = img.naturalWidth / img.naturalHeight;
                            placeHolderEl.hide();
                            if (imgScale > winScale) {
                                t.$dom.attr({
                                    'src': url,
                                    'data-scale': imgScale,
                                    'width': '100%',
                                    'height': 'auto'
                                });
                            } else {
                                t.$dom.attr({
                                    'src': url,
                                    'data-scale': imgScale,
                                    'width': 'auto',
                                    'height': '100%'
                                });
                            }
                        };
                        t.src = url;
                        imgSrc = url;
                    } else {
                        alert(d.message);
                    }
                },
                error: function (d) {
                    alert('网络错误')
                }
            });
        }
    };
    // 标签
    var _tag = function () {
        return this;
    };
    // 全局提示框
    var _placeHolderEl = function () {
        this.init();
        return this;
    };
    _placeHolderEl.prototype = {
        init: function () {
            this.$dom = $('<div class="placeholder"></div>');
            $('body').append(this.$dom);
        },
        setText: function (text) {
            this.$dom.html(text).show();
        },
        hide: function () {
            this.$dom.hide();
        }
    };
    var placeHolderEl = new _placeHolderEl();
    // util公共方法
    var util = {
        captureMouse: function (event) {
            var element = document.getElementById('img-self');
            //定义一个名为mouse的对象
            var mouse = {x: 0, y: 0};
            var x, y;

            //获取鼠标位于当前屏幕的位置， 并作兼容处理
            if (event.pageX || event.pageY) {
                x = event.pageX;
                y = event.pageY;
            } else {
                x = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
                y = event.clientY + document.body.scrollTop + document.documentElement.scrollTop;
            }
            //将当前的坐标值减去元素的偏移位置，即为鼠标位于当前element的位置
            x -= element.offsetLeft;
            y -= element.offsetTop;

            mouse.x = x;
            mouse.y = y;
            // console.log(x, y);
            //返回值为mouse对象
            return mouse;
        },
        animate: function (img_area) {
            var _image = img_area.image;
            img_area.isMouseDown && window.requestAnimationFrame(animate(img_area));
            if (_image.image.labelTotal > 0 && _image.labelList[_image.selected] && _image.labelList[_image.selected].isExist) {
                _image.labelList[_image.selected].$dom.css({
                    top: _image.operateData.y,
                    left: _image.operateData.x,
                    width: _image.operateData.w,
                    height: _image.operateData.h
                })
            }
        },
        dealWH: function (type, num) {
            var t = $('#img-self'),
                w = t.width(),
                h = t.height();
            if (type == 'w') {
                return (num / w).toFixed(4);
            } else if (type == 'h') {
                return (num / h).toFixed(4);
            }
        }
    };
})(jQuery);