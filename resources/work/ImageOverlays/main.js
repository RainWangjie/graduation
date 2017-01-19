/**
 * Created by gewangjie on 2017/1/18.
 */
var isMouseDown = false,
    mouseType = 0,
    mouse = {},
    newLabel = {},
    selectedLabel = {},
    labelList = [],
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
function initLabel(el) {
    var html = '';
    for (var i in labelData) {
        html += '<li>' +
            '<input type="checkbox" class="imgLabel" name="imgLabel" value="' + i + '">' + labelData[i].name +
            '<div class="color-block" style="background: ' + labelData[i].color + '"></div>' +
            '</li>';
    }
    $(el).append(html);
    print('列表初始化');
    // 绑定鼠标事件
    bindNewLabel();
    // move绑定到父元素
    $('#img-area').on('mousemove', move);
}
function clearLabel() {
    newLabel = {};
}

// 创建label
function bindNewLabel() {
    $('#img-area').on('mousedown', newLabelMouseDown)
        .on('mouseup mouseleave', newLabelMouseup);
}
function newLabelMouseDown(event) {
    mouse = captureMouse(event);
    isMouseDown = true;
    mouseType = 1;
    newLabel.x = mouse.x;
    newLabel.y = mouse.y;
    newLabel.el = $($('#tpl-area').html());
    newLabel.isExist = false;
    print('创建标注start');
    return false;
}
function newLabelMouseMove() {
    if (isMouseDown) {
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
    return false;
}
function newLabelMouseup() {
    if (isMouseDown && mouseType == 1) {
        isMouseDown = false;
        mouseType = 0;
        newLabel.w = Math.abs(mouse.x - newLabel.x);
        newLabel.h = Math.abs(mouse.y - newLabel.y);
        labelList.push(newLabel);
        selectedLabel = labelList[labelTotal - 1];
        print('创建标注end');
        bindMoveLabel();
        bindScaleLabel();
        clearLabel();
    }
    return false;
}
// 移动area
function bindMoveLabel() {
    $('.label-area').on('mousedown', moveLabelMouseDown)
        .on('mouseup', moveLabelMouseup);
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
    print('移动start');
    return false;
}
function moveLabelMouseMove() {
    if (isMouseDown) {
        var id = labelMove.id;
        $('#label_' + id).css({
            top: labelList[id].y + mouse.y - labelMove.y,
            left: labelList[id].x + mouse.x - labelMove.x
        })
    }
    return false;
}
function moveLabelMouseup() {
    if (isMouseDown&& mouseType == 2) {
        var id = $(this).attr('id').replace('label_', '');
        labelList[id].y += (mouse.y - labelMove.y);
        labelList[id].x += (mouse.x - labelMove.x);
        print('移动end选中' + id);
        isMouseDown = false;
        mouseType = 0;
    }
    return false;
}
// 缩放area
function bindScaleLabel() {
    $('.ui-resizable-handle').on('mousedown', scaleLabelMouseDown)
        .on('mouseup', scaleLabelMouseup);
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
    if (isMouseDown) {
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
    return false;
}
function scaleLabelMouseup() {
    if (isMouseDown && mouseType == 3) {
        var id = labelMove.id;
        labelList[id].y += mouse.y - labelMove.y;
        labelList[id].x += mouse.x - labelMove.x;
        labelList[id].w -= (mouse.x - labelMove.x);
        labelList[id].h -= (mouse.y - labelMove.y);
        isMouseDown = false;
        mouseType = 0;
    }
    return false;
}

function move(event) {
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
function print(txt) {
    $('.opreate').append('<li>' + txt + '</li>')
}
initLabel('.label-list');


