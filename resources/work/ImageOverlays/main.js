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
var imgAreaEl = $('#img-area'),
    placeHolderEl = $('.placeholder'),
    isMouseDown = false,
    mouseType = 0,
    mouse = {},
    selected = 0,
    moveStep = {},
    labelList = [],
    labelMove = {},
    labelTotal = 0,
    labelName = ['衬衫', '小衫', 'T恤', '背心', '吊带', '打底衫', '西服', '夹克', '马甲', '卫衣', '风雪衣', '毛衣', '披风', '外套', '连衣裙', '连体裤', '半身裙', '裤装'],
    labelData = [],//标签数据name,color
    winScale = imgAreaEl.width() / imgAreaEl.height(),//图片放置区域比例
    imgSrc = '';

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
// 初始化
function initLabel(el) {
    var html = '';
    for (var i in labelName) {
        var color = getRandomColor();
        labelData.push({
            'name': labelName[i],
            'color': color
        });
        //最好class控制color
        html += '<li>' +
            '<input type="radio" class="imgTag tag_' + i + '" name="imgTag" value="' + i + '">' + labelName[i] +
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
// 初始化，moveStep
function initMove() {
    moveStep.y = labelList[selected].y;
    moveStep.x = labelList[selected].x;
    moveStep.w = labelList[selected].w;
    moveStep.h = labelList[selected].h;
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
    // animate();
    return false;
}
function newLabelMouseMove() {
    var difference_x = mouse.x - labelMove.x,
        difference_y = mouse.y - labelMove.y;
    if (difference_x >= 0 && difference_y >= 0) {
        moveStep = {
            x: labelMove.x,
            y: labelMove.y,
            w: Math.max(difference_x, 20),
            h: Math.max(difference_y, 20)
        };
    } else {
        console.log('勿反向操作!')
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
    initMove();
    print('移动标注_' + selected);
    // animate();
    return false;
}
function moveLabelMouseMove() {
    moveStep.y = labelList[selected].y + mouse.y - labelMove.y;
    moveStep.x = labelList[selected].x + mouse.x - labelMove.x;
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
    initMove();
    print('缩放start' + selected);
    // animate();
    return false;
}
function scaleLabelMouseMove() {
    switch (labelMove.resize) {
        case 't':
            moveStep.y = labelList[selected].y + mouse.y - labelMove.y;
            moveStep.h = labelList[selected].h - ( mouse.y - labelMove.y);
            break;
        case 'l':
            moveStep.x = labelList[selected].x + mouse.x - labelMove.x;
            moveStep.w = labelList[selected].w - (mouse.x - labelMove.x);
            break;
        case 'r':
            moveStep.w = labelList[selected].w + mouse.x - labelMove.x;
            break;
        case 'b':
            moveStep.h = labelList[selected].h + mouse.y - labelMove.y;
            break;
        case 'tl':
            moveStep.y = labelList[selected].y + mouse.y - labelMove.y;
            moveStep.x = labelList[selected].x + mouse.x - labelMove.x;
            moveStep.w = labelList[selected].w - ( mouse.x - labelMove.x);
            moveStep.h = labelList[selected].h - ( mouse.y - labelMove.y);
            break;
        case 'tr':
            moveStep.y = labelList[selected].y + mouse.y - labelMove.y;
            moveStep.w = labelList[selected].w + mouse.x - labelMove.x;
            moveStep.h = labelList[selected].h - ( mouse.y - labelMove.y);
            break;
        case 'bl':
            moveStep.x = labelList[selected].x + mouse.x - labelMove.x;
            moveStep.w = labelList[selected].w - ( mouse.x - labelMove.x);
            moveStep.h = labelList[selected].h + mouse.y - labelMove.y;
            break;
        case 'br':
            moveStep.h = labelList[selected].h + mouse.y - labelMove.y;
            moveStep.w = labelList[selected].w + mouse.x - labelMove.x;
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
        labelList[selected].y = moveStep.y;
        labelList[selected].x = moveStep.x;
        labelList[selected].w = moveStep.w;
        labelList[selected].h = moveStep.h;
        clearLabel();
        linkage();
        //操作label添加selected
        $('.label-area').removeClass('selected');
        $('#label_' + selected).addClass('selected');
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
        tagHtml = '<li class="tag-item" style="background:' + labelData[tag].color + '">' + labelData[tag].name + '</li>';
    el.html(tagHtml);
    el.siblings(".ui-resizable-handle").css('background', labelData[tag].color);
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
        consoleTable = [['TOP', 'LEFT', 'WIDTH', 'HEIGHT', '标签']];
    if (labelList.length == 0) {
        getImage();
        return;
    }
    for (var i in labelList) {
        var label = labelList[i];
        if (label.isExist) {
            if (label.tag) {
                consoleTable.push([dealWH('h', label.y), dealWH('w', label.x), dealWH('w', label.w), dealWH('h', label.h), labelData[label.tag].name])
                labelDetail.push({
                    'name': labelData[label.tag].name,
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
animate();
var q = 0;
function animate() {
    window.requestAnimationFrame(animate);
    console.log(q++);
    if (labelTotal > 0 && labelList[selected].isExist) {
        $('#label_' + selected).css({
            top: moveStep.y,
            left: moveStep.x,
            width: moveStep.w,
            height: moveStep.h
        })
    }
}