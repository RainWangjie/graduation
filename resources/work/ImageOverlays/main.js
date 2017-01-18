/**
 * Created by gewangjie on 2017/1/18.
 */
var labelData = {
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
function initLabel() {
    var html = '';
    for (var i in labelData) {
        html += '<li>' +
            '<input type="checkbox" class="imgLabel" name="imgLabel" value="' + i + '">' + labelData[i].name +
            '<div class="color-block" style="background: ' + labelData[i].color + '"></div>' +
            '</li>';
    }
    $('.label-list').append(html);
    print('列表初始化');
}
initLabel();

var isMouseDown = false,
    mouse = captureMouse(document.getElementById('img-self')),
    newLabel = {},
    selectLabel = {},
    labelList = [],
    labelTotal = 0,
    labelMove = {};

function clearNewLabel() {
    newLabel = {};
}
// 创建label
$('#img-area').mousedown(function (event) {
    isMouseDown = true;
    newLabel.x = mouse.x;
    newLabel.y = mouse.y;
    newLabel.el = $($('#tpl-area').html());
    newLabel.isExist = false;
    print('创建标注start');
    return false;
}).mousemove(function (event) {
    var difference_x = mouse.x - newLabel.x,
        difference_y = mouse.y - newLabel.y;
    // 鼠标点击，操作距离大于20px
    if (isMouseDown) {
        if (!newLabel.isExist) {
            newLabel.el.attr('id', 'label_' + (labelTotal++));
            $(this).append(newLabel.el);
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
}).mouseup(function () {
    isMouseDown = false;
    newLabel.width = Math.abs(mouse.x - newLabel.x);
    newLabel.height = Math.abs(mouse.y - newLabel.y);
    labelList.push(newLabel);
    clearNewLabel();
    print('创建标注end');
        return false;
}).mouseleave(function (event) {
    if (isMouseDown) {
        isMouseDown = false;
        newLabel.width = Math.abs(mouse.x - newLabel.x);
        newLabel.height = Math.abs(mouse.y - newLabel.y);
        labelList.push(newLabel);
        clearNewLabel();
        console.log('mouseleave');
    }
    return false;
});

// 移动area
$('.label-area').mousedown(function (event) {
    isMouseDown = true;
    labelMove = {
        x: mouse.x,
        y: mouse.y
    };
    print('移动start');
    return false;
}).mousemove(function (event) {
    if (isMouseDown) {
        var id = $(this).attr('id').replace('label_', '');
        $(this).css({
            top: labelList[id].y + (labelMove.y - mouse.y),
            left: labelList[id].x + (labelMove.x - mouse.x)
        })
    }
    return false;
}).mouseup(function (event) {
    print('移动end');
    isMouseDown = false;
    return false;
});

function print(txt) {
    $('.opreate').append('<li>'+txt+'</li>')
}