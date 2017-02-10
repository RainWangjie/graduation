/**
 * Created by gewangjie on 2017/1/18.
 */
// jq与原生js混写，需移除jq
// 随机生成颜色
function getRandomColor() {
    return '#' +
        (function (color) {
            return (color += '0123456789abcdef'[Math.floor(Math.random() * 16)])
            && (color.length == 6) ? color : arguments.callee(color);
        })('');
}
/*
 tag：框选对应标签
 label：标注（框选）
 */

var imgAreaEl = $('#img-area'),//图片放置元素
    placeHolderEl = $('.placeholder'),//提示元素
    isMouseDown = false,//鼠标点击动作
    mouseType = 0,//鼠标操作内容，1：创建，2：移动，3：缩放
    mouse = {},//mouse属性(x,y)
    selected = 0,//操作标注索引
    operateData = {},//标注操作参数(x,y,w,h)，animate方法使用(渲染)
    labelList = [],//标注列表
    labelMove = {},//记录标注初始坐标等相关参数(x,y,resize)
    labelTotal = 0,//标注总数
    tagName = ['衬衫', '上衣', 'T恤', '西服', '夹克', '卫衣', '针织衫', '大衣', '棉衣', '风衣', '连衣裙', '半身裙', '裤装'],
    tagData = [],//标签数据name,color
    winScale = imgAreaEl.width() / imgAreaEl.height(),//图片放置区域比例
    imgSrc = '';//当前图片链接

initLabel('.label-list');
getImage();
// 获取图片
function getImage() {
    placeHolderEl.html('新图片加载中......').show();
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
                        $('#img-self').attr({
                            'src': url,
                            'data-scale': imgScale,
                            'width': '100%',
                            'height': 'auto'
                        });
                    } else {
                        $('#img-self').attr({
                            'src': url,
                            'data-scale': imgScale,
                            'width': 'auto',
                            'height': '100%'
                        });
                    }
                };
                img.src = url;
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
// 初始化标签
function initLabel(el) {
    var html = '';
    for (var i in tagName) {
        var color = getRandomColor();
        tagData.push({
            'name': tagName[i],
            'color': color
        });
        //最好class控制color
        html += '<li>' +
            '<input type="radio" class="imgTag tag_' + i + '" name="imgTag" value="' + i + '">' + tagName[i] +
            '<div class="color-block" style="background: ' + color + '"></div>' +
            '</li>';
    }
    $(el).append(html);
    $('.imgTag').on('change', changeTag);
    print('列表初始化');
    // 绑定鼠标事件
    bindNewLabel();
    // move绑定到父元素
    $('#img-area').on('mousemove', move)
        .on('mouseup', up);
}
// 初始化移动
function initOperate() {
    operateData.y = labelList[selected].y;
    operateData.x = labelList[selected].x;
    operateData.w = labelList[selected].w;
    operateData.h = labelList[selected].h;
}
// 清除
function clearLabel() {
    labelMove = {};
}
function clearAll() {
    clearLabel();
    selected = 0;
    labelList = [];
    labelTotal = 0;
    $('.label-area').remove();
    $('#img-self').attr('src', '')
}
// 创建label
function bindNewLabel() {
    $('#img-area').on('mousedown', newLabelMouseDown);
}
function newLabelMouseDown(event) {
    mouse = captureMouse(event);
    isMouseDown = true;
    mouseType = 1;
    selected = labelTotal;
    var newLabel = {
        x: mouse.x,
        y: mouse.y,
        el: $($('#tpl-area').html()),
        isExist: false,
        w: 0,
        h: 0
    };
    newLabel.el.attr('id', 'label_' + selected);
    labelMove = {
        x: mouse.x,
        y: mouse.y
    };
    labelList.push(newLabel);
    labelTotal++;
    print('创建标注开始');
    animate();
    return false;
}
function newLabelMouseMove() {
    var difference_x = mouse.x - labelMove.x,
        difference_y = mouse.y - labelMove.y;
    if (difference_x >= 0 && difference_y >= 0) {
        // 左上角向右下角
        operateData = {
            x: labelMove.x,
            y: labelMove.y,
            w: Math.max(difference_x, 20),
            h: Math.max(difference_y, 20)
        };
    } else if (difference_x >= 0 && difference_y < 0) {
        // 左下角向右上角
        operateData = {
            x: labelMove.x,
            y: labelMove.y + difference_y,
            w: Math.max(difference_x, 20),
            h: Math.max(-1 * difference_y, 20)
        };
    } else if (difference_x < 0 && difference_y >= 0) {
        // 右上角向左下角
        operateData = {
            x: labelMove.x + difference_x,
            y: labelMove.y,
            w: Math.max(-1 * difference_x, 20),
            h: Math.max(difference_y, 20)
        };
    } else {
        // 右下角向左上角
        operateData = {
            x: labelMove.x + difference_x,
            y: labelMove.y + difference_y,
            w: Math.max(-1 * difference_x, 20),
            h: Math.max(-1 * difference_y, 20)
        };
    }
    if (!labelList[selected].isExist) {
        $('#img-area').append(labelList[selected].el);
        labelList[selected].isExist = true;
    }
}
function newLabelMouseup() {
    if (labelList[selected].isExist) {
        print('创建标注' + (labelTotal - 1));
        bindMoveLabel();
        bindScaleLabel();
    } else {
        labelList.pop();
        labelTotal--;
        print('创建标注失败or撤销');
        return;
    }
}
// 移动area
function bindMoveLabel() {
    $('.label-area').on('mousedown', moveLabelMouseDown);
}
function moveLabelMouseDown(event) {
    mouse = captureMouse(event);
    isMouseDown = true;
    mouseType = 2;
    selected = $(this).attr('id').replace('label_', '');
    labelMove = {
        x: mouse.x,
        y: mouse.y
    };
    initOperate();
    print('移动标注_' + selected);
    animate();
    return false;
}
function moveLabelMouseMove() {
    operateData.y = labelList[selected].y + mouse.y - labelMove.y;
    operateData.x = labelList[selected].x + mouse.x - labelMove.x;
}
function moveLabelMouseup() {
    print('移动结束并选中标注_' + selected);
}
// 缩放area
function bindScaleLabel() {
    $('.ui-resizable-handle').on('mousedown', scaleLabelMouseDown);
}
function scaleLabelMouseDown(event) {
    mouse = captureMouse(event);
    isMouseDown = true;
    mouseType = 3;
    selected = $(this).parents('.label-area').attr('id').replace('label_', '');
    labelMove = {
        resize: $(this).data('resize'),
        x: mouse.x,
        y: mouse.y
    };
    initOperate();
    print('缩放start' + selected);
    animate();
    return false;
}
function scaleLabelMouseMove() {
    switch (labelMove.resize) {
        case 't':
            operateData.y = labelList[selected].y + mouse.y - labelMove.y;
            operateData.h = labelList[selected].h - (mouse.y - labelMove.y);
            break;
        case 'l':
            operateData.x = labelList[selected].x + mouse.x - labelMove.x;
            operateData.w = labelList[selected].w - (mouse.x - labelMove.x);
            break;
        case 'r':
            operateData.w = labelList[selected].w + mouse.x - labelMove.x;
            break;
        case 'b':
            operateData.h = labelList[selected].h + mouse.y - labelMove.y;
            break;
        case 'tl':
            operateData.y = labelList[selected].y + mouse.y - labelMove.y;
            operateData.x = labelList[selected].x + mouse.x - labelMove.x;
            operateData.w = labelList[selected].w - (mouse.x - labelMove.x);
            operateData.h = labelList[selected].h - (mouse.y - labelMove.y);
            break;
        case 'tr':
            operateData.y = labelList[selected].y + mouse.y - labelMove.y;
            operateData.w = labelList[selected].w + mouse.x - labelMove.x;
            operateData.h = labelList[selected].h - (mouse.y - labelMove.y);
            break;
        case 'bl':
            operateData.x = labelList[selected].x + mouse.x - labelMove.x;
            operateData.w = labelList[selected].w - (mouse.x - labelMove.x);
            operateData.h = labelList[selected].h + mouse.y - labelMove.y;
            break;
        case 'br':
            operateData.h = labelList[selected].h + mouse.y - labelMove.y;
            operateData.w = labelList[selected].w + mouse.x - labelMove.x;
            break;
    }
}
function scaleLabelMouseup() {
    print('缩放结束并选中标注_' + selected);
}
// 公共方法
function move(event) {
    if (isMouseDown) {
        mouse = captureMouse(event);
        switch (mouseType) {
            case 1:
                newLabelMouseMove();
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
}
function up() {
    if (isMouseDown) {
        switch (mouseType) {
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
        if (labelList[selected]) {//鼠标点击引起的错误
            labelList[selected].y = operateData.y;
            labelList[selected].x = operateData.x;
            labelList[selected].w = operateData.w;
            labelList[selected].h = operateData.h;
            clearLabel();
            linkage();
            //操作label添加selected
            $('.label-area').removeClass('selected');
            $('#label_' + selected).addClass('selected');
        }
    }
    // window.cancelAnimationFrame(animate);
    isMouseDown = false;
    mouseType = 0;
    return false;
}
function print(txt) {
    console.log(txt)
}
// 删除标注
$('body').on('click', '.remove-label', function () {
    if (confirm('删除该标注?')) {
        var id = $(this).parent().attr('id').replace('label_', '');
        $(this).parent().remove();
        labelList[id].isExist = false;
    }
    return false;
});
// 修改标签
function changeTag() {
    labelList[selected].tag = $('.imgTag:checked').val();
    drawTag();
}
// 绘制标签
function drawTag() {
    var el = $('#label_' + selected + ' .tag-list'),
        tag = labelList[selected].tag,
        tagHtml = '<li class="tag-item" style="background:' + tagData[tag].color + '">' + tagData[tag].name + '</li>';
    el.html(tagHtml);
    el.siblings(".ui-resizable-handle").css('background', tagData[tag].color);
}
// tag,checkbox联动
function linkage() {
    if (labelList[selected].tag) {
        $('.imgTag').eq(labelList[selected].tag).click();
    } else {
        $('.imgTag').each(function () {
            $(this).removeAttr('checked');
        });
    }
}
// 获取新图
$('#next-picture').click(function () {
    placeHolderEl.html('数据打包......').show();
    var labelDetail = [],
        isError = false,
        consoleTable = [['TOP', 'LEFT', 'WIDTH', 'HEIGHT', '标签']];//控制台打印表格数据
    if (labelList.length == 0) {
        getImage();
        return;
    }
    for (var i in labelList) {
        var label = labelList[i];
        if (label.isExist) {
            if (label.tag) {
                consoleTable.push([dealWH('h', label.y), dealWH('w', label.x), dealWH('w', label.w), dealWH('h', label.h), tagData[label.tag].name])
                labelDetail.push({
                    'name': tagData[label.tag].name,
                    'pos': [dealWH('h', label.y), dealWH('w', label.x), dealWH('w', label.w), dealWH('h', label.h)]
                })
            } else {
                consoleTable.push([dealWH('h', label.y), dealWH('w', label.x), dealWH('w', label.w), dealWH('h', label.h), '空']);
                label.el.addClass('error');
                placeHolderEl.hide();
                setTimeout(function () {
                    $('.label-area').removeClass('error');
                }, 1000);
                isError = true;
            }
        }
    }
    console.table(consoleTable);
    if (!isError) {
        var postData = {
            'pic': imgSrc,
            'labelDetail': JSON.stringify(labelDetail)
        };
        // 提交数据
        placeHolderEl.html('数据上传......');
        $.ajax({
            url: 'https://test.teegether.cn/deep_fashion/ins_label/labels',
            type: 'POST',
            data: postData,
            success: function (d) {
                d = JSON.parse(d);
                if (d.status.code == '1000') {
                    getImage();
                    linkage();
                } else {
                    alert(d.message);
                }
                placeHolderEl.hide();
            },
            error: function (d) {
                placeHolderEl.hide();
                alert('网络错误')
            }
        });

    }
});
// 处理宽高比例
function dealWH(type, num) {
    var t = $('#img-self'),
        w = t.width(),
        h = t.height();
    if (type == 'w') {
        return (num / w).toFixed(4);
    } else if (type == 'h') {
        return (num / h).toFixed(4);
    }
}
// 按浏览器刷新率渲染标注
function animate() {
    isMouseDown && window.requestAnimationFrame(animate);
    // console.log('1');
    if (labelTotal > 0 && labelList[selected] && labelList[selected].isExist) {
        $('#label_' + selected).css({
            top: operateData.y,
            left: operateData.x,
            width: operateData.w,
            height: operateData.h
        })
    }
}