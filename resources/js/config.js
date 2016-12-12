var config = {
    style: {
        '5': {'name': '卫衣', 'val': 'sweater'},
        '4': {'name': '帆布包', 'val': 'bag'},
        '3': {'name': '抱枕', 'val': 'pillow'},
        '2': {'name': '长袖Tee', 'val': 'longT'},
        '1': {'name': '圆领短袖Tee', 'val': 'tee'},
        '0': {'name': '不限品类', val: 'all'}
    },
    sex: {
        '1': {'val': "man", 'name': '男款'},
        '2': {'val': "woman", 'name': '女款'},
        '3': {'val': "children", 'name': '童装'},
        '4': {'val': "square", 'name': '方枕(带芯)'},
        '5': {'val': "canvas", 'name': '帆布包'},
        '7': {'val': "manAndWomen", 'name': '成人款'},
        '8': {'val': "canvasUp", 'name': '帆布包'},
    },
    color: {
        '3': {name: '灰', val: 'grey', hex: '#808080'},
        '2': {name: '黑', val: 'black', hex: '#000000'},
        '1': {name: '白', val: 'white', hex: '#ffffff'}
    },
    size: {
        //T恤
        '1': {'val': "S", 'name': 'S'},
        '2': {'val': "M", 'name': 'M'},
        '3': {'val': "L", 'name': 'L'},
        '4': {'val': "XL", 'name': 'XL'},
        '5': {'val': "110", 'name': '110'},
        '6': {'val': "120", 'name': '120'},
        '7': {'val': "130", 'name': '130'},
        '8': {'val': "140", 'name': '140'},
        //抱枕
        '9': {'val': "45", 'name': '45*45'},
        //帆布包
        '13': {'val': "S", 'name': '小号'},
        '14': {'val': "M", 'name': '中号'},
        '15': {'val': "L", 'name': '大号'},
        //长T
        '16': {'val': "110", 'name': '110'},
        '17': {'val': "130", 'name': '130'},
        '18': {'val': "140", 'name': '140'},
        '19': {'val': "150", 'name': '150'},
        '20': {'val': "S", 'name': 'S'},
        '21': {'val': "M", 'name': 'M'},
        '22': {'val': "L", 'name': 'L'},
        '23': {'val': "XL", 'name': 'XL'},
        //卫衣
        '24': {'val': "110", 'name': '110'},
        '25': {'val': "130", 'name': '130'},
        '26': {'val': "150", 'name': '150'},
        '27': {'val': "WM", 'name': 'WM'},
        '28': {'val': "S", 'name': 'S'},
        '29': {'val': "M", 'name': 'M'},
        '30': {'val': "L", 'name': 'L'},
        '31': {'val': "XL", 'name': 'XL'},
        '32': {'val': "XXL", 'name': 'XXL'},
    },
    status: {
        '1': {'name': '等待付款', 'val': '#DF7756'},
        '2': {'name': '已过期', 'val': '#DF7756'},
        '6': {'name': '等待生产', 'val': '#DF7756'},
        '7': {'name': '工厂处理中', 'val': '#E5AA48'},
        '8': {'name': '工厂印刷中', 'val': '#E5AA48'},
        '9': {'name': '已发货', 'val': '#5BA8DB'},
        '10': {'name': '处理中', 'val': '#5BA8DB'},
        '11': {'name': '退款处理中', 'val': '#E5AA48'},
        '12': {'name': '退款处理中', 'val': '#E5AA48'},
        '13': {'name': '已退款', 'val': '#5BA8DB'},
    },
    getClass: function () {
        var args = arguments,
            style, sex, color, size;
        //style, sex, color, size
        if (typeof args[0] == "object") {
            style = args[0].style;
            sex = args[0].sex;
            color = args[0].color;
            size = args[0].size;
        } else {
            style = args[0];
            sex = args[1];
            color = args[2];
            size = args[3];
        }
        try {
            var t = this;
            if (style == 2 && sex == 1) {
                sex = 1
            }
            if (style == 2 && sex == 7) {
                sex = 1
            }
            if (style == 2 && color == 1) {
                color = 1
            }
            if (style == 2 && size == 1) {
                size = 16
            }

            if (style == 3 && sex == 1) {
                sex = 4
            }
            if (style == 3 && color == 1) {
                color = 1
            }
            if (style == 3 && size == 1) {
                size = 9
            }

            if (style == 4 && sex == 1) {
                sex = 8
            }
            if (style == 4 && color == 1) {
                color = 1
            }
            if (style == 4 && size == 1) {
                size = 14
            }


            if (style == 5 && sex == 7) {
                sex = 1
            }
            if (style == 5 && size == 1) {
                size = 24
            }
            var className = 'Tee-' + t.style[style]['val'] + '-' + t.sex[sex]['val'] + '-' + t.color[color]['val'] + '-' + t.size[size]['val'];
            return className;
        } catch (e) {
            console.log('getClass参数错误')
        }
    },
    //sizeSex: function(sex,size){
    //        return this.size[size]['name'];
    //}
};


