/**
 * Created by gewangjie on 2017/1/18.
 */
// jq与原生js混写，需移除jq
var isMouseDown = false,
    mouseType = 0,
    mouse = {},
    newLabel = {},
    selected = 0,
    labelList = [],
    labelMove = {},
    labelTotal = 0,
    labelData = {
        'shoes': {
            'name': '鞋子',
            'color': 'red'
        },
        'pants': {
            'name': '裤子',
            'color': 'blue'
        },
        'Jacket': {
            'name': '上衣',
            'color': 'green'
        }
    };
initLabel('.label-list');

function initLabel(el) {
    var html = '';
    for (var i in labelData) {
        html += '<li>' +
            '<input type="checkbox" class="imgTag tag_' + i + '" name="imgTag" value="' + i + '">' + labelData[i].name +
            '<div class="color-block" style="background: ' + labelData[i].color + '"></div>' +
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
function clearLabel() {
    newLabel = {};
    labelMove = {};
}
function removeLabel() {

}
// 创建label
function bindNewLabel() {
    $('#img-area').on('mousedown', newLabelMouseDown);
}
function newLabelMouseDown(event) {
    mouse = captureMouse(event);
    isMouseDown = true;
    mouseType = 1;
    newLabel.x = mouse.x;
    newLabel.y = mouse.y;
    newLabel.el = $($('#tpl-area').html());
    newLabel.isExist = false;
    print('创建标注开始');
    return false;
}
function newLabelMouseMove() {
    var difference_x = mouse.x - newLabel.x,
        difference_y = mouse.y - newLabel.y;
    if (!newLabel.isExist) {
        newLabel.el.attr('id', 'label_' + (labelTotal++)).css({
            top: newLabel.y,
            left: newLabel.x,
            width: Math.max(difference_x, 20),
            height: Math.max(difference_y, 20)
        });
        $('#img-area').append(newLabel.el);
        newLabel.isExist = true;
    }
    if (difference_x > 0 && difference_y > 0) {
        newLabel.el.css({
            top: newLabel.y,
            left: newLabel.x,
            width: Math.max(difference_x, 20),
            height: Math.max(difference_y, 20)
        })
    } else {
        console.log('勿反向操作!')
    }
}
function newLabelMouseup() {
    newLabel.w = Math.abs(mouse.x - newLabel.x);
    newLabel.h = Math.abs(mouse.y - newLabel.y);
    labelList.push(newLabel);
    print('创建标注' + (labelTotal - 1));
    bindMoveLabel();
    bindScaleLabel();
}
// 移动area
function bindMoveLabel() {
    $('.label-area').on('mousedown', moveLabelMouseDown);
}
function moveLabelMouseDown(event) {
    mouse = captureMouse(event);
    isMouseDown = true;
    mouseType = 2;
    labelMove = {
        id: $(this).attr('id').replace('label_', ''),
        x: mouse.x,
        y: mouse.y
    };
    print('移动标注_' + labelMove.id);
    return false;
}
function moveLabelMouseMove() {
    var id = labelMove.id;
    $('#label_' + id).css({
        top: labelList[id].y + mouse.y - labelMove.y,
        left: labelList[id].x + mouse.x - labelMove.x
    })
}
function moveLabelMouseup() {
    var id = labelMove.id,
        el = document.getElementById('label_' + id);
    labelList[id].x = el.offsetLeft;
    labelList[id].y = el.offsetTop;
    print('移动结束并选中标注_' + id);
}
// 缩放area
function bindScaleLabel() {
    $('.ui-resizable-handle').on('mousedown', scaleLabelMouseDown);
}
function scaleLabelMouseDown(event) {
    mouse = captureMouse(event);
    isMouseDown = true;
    mouseType = 3;
    labelMove = {
        id: $(this).parents('.label-area').attr('id').replace('label_', ''),
        resize: $(this).data('resize'),
        x: mouse.x,
        y: mouse.y
    };
    print('缩放start' + labelMove.id);
    return false;
}
function scaleLabelMouseMove() {
    var id = labelMove.id,
        el = $('#label_' + id);
    switch (labelMove.resize) {
        case 't':
            el.css({
                top: labelList[id].y + mouse.y - labelMove.y,
                height: labelList[id].h - ( mouse.y - labelMove.y)
            });
            break;
        case 'l':
            el.css({
                left: labelList[id].x + mouse.x - labelMove.x,
                width: labelList[id].w - (mouse.x - labelMove.x)
            });
            break;
        case 'r':
            el.css({
                width: labelList[id].w + mouse.x - labelMove.x
            });
            break;
        case 'b':
            el.css({
                height: labelList[id].h + mouse.y - labelMove.y
            });
            break;
        case 'tl':
            el.css({
                top: labelList[id].y + mouse.y - labelMove.y,
                left: labelList[id].x + mouse.x - labelMove.x,
                width: labelList[id].w - ( mouse.x - labelMove.x),
                height: labelList[id].h - ( mouse.y - labelMove.y)
            });
            break;
        case 'tr':
            el.css({
                top: labelList[id].y + mouse.y - labelMove.y,
                width: labelList[id].w + mouse.x - labelMove.x,
                height: labelList[id].h - ( mouse.y - labelMove.y)
            });
            break;
        case 'bl':
            el.css({
                left: labelList[id].x + mouse.x - labelMove.x,
                width: labelList[id].w - ( mouse.x - labelMove.x),
                height: labelList[id].h + mouse.y - labelMove.y
            });
            break;
        case 'br':
            el.css({
                height: labelList[id].h + mouse.y - labelMove.y,
                width: labelList[id].w + mouse.x - labelMove.x
            });
            break;
    }
}
function scaleLabelMouseup() {
    var id = labelMove.id,
        el = document.getElementById('label_' + id);
    labelList[id].x = el.offsetLeft;
    labelList[id].y = el.offsetTop;
    labelList[id].w = el.offsetWidth;
    labelList[id].h = el.offsetHeight;
    print('缩放结束并选中标注_' + id);
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
        selected = labelMove.id ? labelMove.id : labelTotal - 1;
        clearLabel();
        linkage();
    }
    isMouseDown = false;
    mouseType = 0;
    return false;
}
function print(txt) {
    $('.operate').append('<li>' + txt + '</li>')
}
// 修改标签
function changeTag() {
    var tagList = [];
    $('.imgTag:checked').each(function () {
        tagList.push($(this).val());
    });
    labelList[selected].tagList = tagList;
    drawTag();
}
// 绘制标签
function drawTag() {
    var el = $('#label_' + selected + ' .tag-list'),
        tagHtml = '';
    for (var i in labelList[selected].tagList) {
        var tag = labelList[selected].tagList[i];
        tagHtml += '<li class="tag-item" style="background:' + labelData[tag].color + '">' + labelData[tag].name + '</li>';
    }
    el.html(tagHtml);

}
// tag,checkbox联动
function linkage() {
    $('.imgTag').each(function () {
        $(this)[0].checked = false;
    });
    for (var i in labelList[selected].tagList) {
        var tag = labelList[selected].tagList[i];
        $('.tag_' + tag)[0].checked = true;
    }
}
// 打印数据
$('#printData').click(function () {
    var consoleTable = ['TOP','LEFT','WIDTH','HEIGHT','标签'];
    for (var i in labelList) {
        var label = labelList[i];
        if (label.isExist) {
            consoleTable.push([label.y, label.x, label.w, label.h, label.tagList.join(',')])
        }
    }
    console.table(consoleTable);
});
