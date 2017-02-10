/**
 * Created by gewangjie on 2017/2/7.
 */
//===== 头部banner =====
var _bannerName = function () {
    this.$dom = $('<span id="bannerName" data-name="" data-num=""></span>');
    $('.banner').append(this.$dom);
    return this;
};
_bannerName.prototype.setDate = function (name, num) {
    var t = this.$dom,
        // 保存name字段
        _name = (name || t.data('name')) || '全部',
        _num = num || '0';
    t.html(_name + '(' + _num + ')');
    t.data('name', _name);
};
var bannerName = new _bannerName();


//===== 遮罩层mask =====
var _mask = function () {
    var _this = this;
    _this.$dom = $('<div class="mask"></div>');
    $('body').append(_this.$dom);
    _this.$dom.on('click', function () {
        _this.hide();
    });
    return _this;
};
_mask.prototype = {
    show: function (classname) {
        this.$dom.addClass('show').addClass(classname);
    },
    hide: function () {
        $('.pop-panel').removeClass('show');
        this.$dom.attr('class', 'mask');
    },
    toggle: function () {
        this.$dom.hasClass('show') ? this.hide() : this.show();
    }
};
var mask = new _mask();


//===== list =====
var _list = function (options) {
    this.init(options);
    return this;
};
_list.prototype = {
    init: function (options) {
        var t = this,
            defaults = {
                template: '<li class="item notChecked" data-idx="{code}">' +
                '<div class="pic_box J_show_pic">' +
                '<img width="100%" height="100%" ' +
                'data-maxpic="http://www.liblin.com.cn/media/media/getImgUrlForAll?id={code}&amp;type=2&amp;px=1000"' +
                ' src="http://www.liblin.com.cn/media/media/getImgUrlForAll?id={code}&amp;type=2&amp;px=100"></div>' +
                '<div class="content">' +
                '<div class="row"><span>{code}</span></div>' +
                '<div class="row"><span>{statusName}</span><span>{wearDate}</span></div>' +
                '<div class="row"><span class="user">{brandName}</span><span class="user">{shejishiName}</span></div>' +
                '</div>' +
                '<div class="next tran"></div>' +
                '</li>'
            };
        t.options = $.extend({}, defaults, options);
        t.$dom = $('<ul></ul>');
        t.loading = false;
        t.end = false;
        var el = t.$dom;
        this.getData();
        $('#item-list').html(el).scroll(function () {
            var $this = $(this),
                isRange = $this.scrollTop() + $(window).height() > el.height() - $(window).height();
            if (isRange) {
                if (!t.loading && !t.end) {
                    ++t.options.params.pageNo;
                    t.getData(true);
                }
            }
        });
        el.click(function () {
            console.log('弹出层');
        });
    },
    onload: function () {
        this.loading = true;
        this.$dom.append('<div class="item_info" id="J_item_info">......</div>')
    },
    finishload: function () {
        this.loading = false;
        $('.item_info').remove();
    },
    endload: function () {
        this.$dom.append('<div class="item_info" id="J_item_info">所有内容已加载完毕</div>')
    },
    getData: function (type) {
        var t = this;
        t.onload();
        $.ajax({
            type: "GET",
            url: t.options.url,
            data: t.options.params,
            success: function (data) {
                t.finishload();
                t.options.params.page = data[0][0];
                t.data = data[1];
                t.data.length == 0 && (t.end = true, t.endload());
                t.render(type)
            },
            error: function () {
                alert('获取数据失败！');
            }
        });
    },
    render: function (type) {
        var html = '';
        for (var i in this.data) {
            var tpl = this.options.template;
            html += tpl.format(this.data[i]);
        }
        type ? this.$dom.append(html) : this.$dom.html(html);
    },
    reset: function () {
        this.end = false;
        this.$dom.html('');
        $('#item-list').html(this.$dom);
        this.getData();
    },
    resetParams: function (param, val) {
        var _param = param;
        // 重置互斥参数
        if ($.inArray(_param, this.options.mutexParams) !== -1) {
            for (var i in this.options.mutexParams) {
                var p = this.options.mutexParams[i];
                this.options.params[p] = -1;
            }
        }
        // 重新赋值
        this.options.params[param] = val;
        this.options.params.page = 0;
        this.options.params.pageNo = 1;
        this.reset();
        // this.init(this.options);
    }
};


//===== sidebar =====
var nav = function ($sidebar) {
    this.$dom = $('<div class="nav"></div>');
    this.$dom.on('click', function () {
        mask && mask.hide();
        $sidebar.addClass('show');
        mask && mask.show('show_side');
    });
    return this.$dom;
};
// 侧边栏TAB
var sidebar_tab = function (parentNode) {
    var options = parentNode.options.data;
    this.$dom = $('<ul class="sidebar-tab"></ul>');
    if (options.length !== 1) {
        for (var i in options) {
            var tab_item = '<li data-index="{3}" data-url="{0}" data-param="{1}">{2}</li>'
                .format(options[i].url, options[i].param, options[i].text, i);
            this.$dom.append(tab_item);
        }
        this.$dom.on('click', 'li', function () {
            var t = $(this),
                index = t.data('index'),
                load = parentNode.listData[index] == undefined,
                param = t.data('param'),
                url = t.data('url');
            parentNode.list.onload();
            load ? parentNode.list.getData(url, index, parentNode) : parentNode.list.init(parentNode, index);
            t.siblings().removeClass('current').end().addClass('current');
            return false;
        });
        parentNode.$dom.append(this.$dom);
        this.$dom.find('li').eq(0).addClass('current');
    }
};
// 侧边栏内容
var sidebar_list = function (parentNode) {
    var options = parentNode.options.data;
    this.$dom = $('<ul class="sidebar-list"></ul>');
    if (options.length == 1) {
        parentNode.tab.$dom.hide();
        this.$dom.css('padding', '0px');
    }
    this.getData(options[0].url, 0, parentNode);
    parentNode.$sidebar.append(this.$dom);
    return this;
};
sidebar_list.prototype = {
    init: function (parentNode, index) {
        var html = '';
        for (var i in parentNode.listData[index]) {
            var item = parentNode.options.template;
            html += item.format(parentNode.listData[index][i]);
        }
        this.$dom.data('param', parentNode.options.data[index].param).on('click', 'li', function () {
            var t = $(this);
            //header内信息修改
            bannerName && bannerName.setDate(t.data('name'));
            //list重置
            list && (list.resetParams(t.parent().data('param'), t.data('idx')));
            //venbox重置
            venbox && venbox.getData();
            //遮罩层hide
            mask && mask.hide();
            return false;
        });
        this.$dom.html(html);
    },
    getData: function (url, index, parentNode) {
        var t = this;
        $.ajax({
            type: "GET",
            url: url,
            success: function (data) {
                parentNode.listData[index] = data;
                t.init(parentNode, index);
            },
            error: function () {
                alert('获取品牌列表失败！');
            }
        });
    },
    onload: function () {
        // 加载动画
        this.$dom.html('<div class="spinner"><div class="rect1"></div><div class="rect2"></div><div class="rect3"></div><div class="rect4"></div><div class="rect5"></div></div>');
    }
};
var _sidebar = function (options) {
    var t = this,
        defaults = {
            template: '<li class="box J_brand_designer clear" data-idx="{id}" data-name="{chName}">' +
            '<div class="headpic"><img src="{picUrl}"></div>' +
            '<div class="namebox">' +
            '<div class="name">{chName}</div>' +
            '<div class="nameen">{name}</div>' +
            '</div></li>'
        };
    t.options = $.extend({}, defaults, options);
    t.$dom = $(options.el);
    t.$sidebar = $('<div class="sidebar-content"></div>');
    t.$dom.append(t.$sidebar);
    t.tab = new sidebar_tab(t);
    t.list = new sidebar_list(t);
    t.listData = [];
    t.$dom.on('click', function () {
        t.$dom.removeClass('show');
        mask && mask.hide();
    });
    var $nav = new nav(t.$dom);
    $('.banner').append($nav);
    return this;
};


//===== popTop =====
var ven = function (parent) {
    var param = parent.options.param || '';
    this.$dom = $('<div class="ven" data-name="' + param + '"></div>');
    $('.banner').append(this.$dom);
    this.$dom.click(function () {
        venbox && venbox.$dom.toggleClass('show');
        mask && mask.toggle();
    });
    return this;
};
ven.prototype.setDate = function (idx, num, text) {
    this.$dom.html(text + '(' + num + ')').data('idx', idx);
};
var _venbox = function (options) {
    var defaults = {
        template: '<li data-idx="{0}" data-count="{1}" data-text="{2}"><div class="count">{1}</div><div class="text">{2}</div></li>'
    };
    this.options = $.extend({}, defaults, options);
    this.$dom = $(options.el);
    this.init();
    return this;
};
_venbox.prototype = {
    init: function () {
        var t = this;
        t.getData();
        t.createVan();
        t.$dom.on('click', 'li', function () {
            t.changeVan($(this));
            list && (list.resetParams(t.ven.$dom.data('name'), $(this).data('idx')));
            mask && mask.hide();
        });
    },
    createVan: function () {
        this.ven = new ven(this);
    },
    createVenBox: function () {
        var t = this,
            html = '';
        t.sum = 0;
        for (var i in t.data) {
            var key = t.data[i].key,
                count = t.data[i].value.split(',')[0],
                text = t.data[i].value.split(',')[1];
            var item = '<li data-idx="{0}" data-count="{1}" data-text="{2}"><div class="count">{1}</div><div class="text">{2}</div></li>';
            html += item.format(key, count, text);
            t.sum += Number(count);
        }
        bannerName && bannerName.setDate('', t.sum);
        t.$dom.html(html);
        //默认值，初始化点击
        var initParam = (list && list.options.params[t.options.param]) || '1';
        console.log(initParam);
        $initEl = $('.ven_box [data-idx="' + initParam + '"]');
        t.changeVan($initEl)
    },
    getData: function () {
        var t = this,
            options = t.options,
            params = {};
        for (var i in t.options.query) {
            var param = t.options.query[i];
            params[param] = list.options.params[param];
        }
        $.ajax({
            type: "GET",
            url: options.url,
            data: params,
            success: function (data) {
                t.data = (data);
                t.createVenBox();
            },
            error: function () {
                alert('获取数据失败！');
            }
        });
    },
    changeVan: function (el) {
        el.siblings().removeClass('checked').end().addClass('checked');
        console.log(el);
        this.ven.setDate(el.data('idx'), el.data('count'), el.data('text'));
    },
};


//===== 字符串操作 =====
String.prototype.format = function (args) {
    //非数组或对象
    var obj = (typeof args !== "object") ? arguments : args;
    return this.replace(/\{(.+?)\}/g, function (match, number) {
        return typeof obj[number] != 'undefined' ? obj[number] : match;
    });
};