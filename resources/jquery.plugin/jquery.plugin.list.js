/**
 * Created by gewangjie on 2017/2/7.
 */
(function ($, window, document, undefined) {
    // 预定义
    var bannerName, mask, list, sidebar, venbox;
    //===== 头部banner =====
    var _bannerName = function () {
        this.$dom = $('<span id="bannerName" data-name="" data-num=""></span>');
        $('.banner').append(this.$dom);
        return this;
    };
    // 设置头部内容
    _bannerName.prototype.setDate = function (name, num) {
        var t = this.$dom,
            // 保存name字段
            _name = (name || t.data('name')) || '全部',
            _num = num || '0';
        t.html(_name + '(' + _num + ')');
        t.data('name', _name);
    };


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


    //===== list =====
    var _list = function (options) {
        this.init(options);
        return this;
    };
    _list.prototype = {
        // 初始化
        init: function (options) {
            var t = this,
                // 默认模版
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
            // list配置信息
            t.options = $.extend({}, defaults, options);
            // list $dom
            t.$dom = $('<div id="item-list"></div>');
            t.$ul = $('<ul></ul>');
            // 加载进度
            t.loading = false;
            // 内容完全加载
            t.end = false;
            var el = t.$ul;
            this.getData();
            $(t.$dom).html(el).scroll(function () {
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
        // 下拉加载
        onload: function () {
            this.loading = true;
            this.$ul.append('<div class="item_info" id="J_item_info">......</div>')
        },
        // 下拉加载结束
        finishload: function () {
            this.loading = false;
            $('.item_info').remove();
        },
        // 内容全部加载
        endload: function () {
            this.end = true;
            this.$ul.append('<div class="item_info" id="J_item_info">所有内容已加载完毕</div>')
        },
        // 获取数据
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
                    t.data.length == 0 ? t.endload() : t.render(type);
                },
                error: function () {
                    alert('获取数据失败！');
                }
            });
        },
        // 渲染视图
        render: function (type) {
            var html = '';
            for (var i in this.data) {
                var tpl = this.options.template;
                this.options.dealData && this.options.dealData(this.data[i]);
                html += tpl.format(this.data[i]);
            }
            type ? this.$ul.append(html) : this.$ul.html(html);
        },
        // 重置视图
        reset: function () {
            this.end = false;
            this.$ul.html('');
            $('#item-list').html(this.$ul);
            this.getData();
        },
        // 重置参数
        resetParams: function (param, val) {
            var _param = param;
            // 重置互斥参数
            if (this.options.mutexParams && $.inArray(_param, this.options.mutexParams) !== -1) {
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
        },
        // 搜索
        search:function (text) {
            
        }
    };


    //===== sidebar =====
    // 侧边栏开启按钮
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
        var t = this,
            options = parentNode.options.data;
        parentNode.index = 0;
        t.$dom = $('<ul class="sidebar-tab navtop_box"></ul>');
        if (options.length !== 1) {
            for (var i in options) {
                var tab_item = '<li class="navT" data-index="{3}" data-url="{0}" data-param="{1}">{2}</li>'
                    .format(options[i].url, options[i].param, options[i].text, i);
                t.$dom.append(tab_item);
            }
            t.$dom.on('click', 'li', function () {
                var $this = $(this),
                    index = $this.data('index'),
                    load = parentNode.listData[index] == undefined,
                    param = $this.data('param'),
                    url = $this.data('url');
                parentNode.index = index;
                load ? parentNode.list.getData(url, parentNode) : parentNode.list.changeTab(index);
                $this.siblings().removeClass('current').end().addClass('current');
                return false;
            });
            parentNode.$dom.append(t.$dom);
            t.$dom.find('li').eq(0).addClass('current');
        }
        // 搜索
        // if (parentNode.options.search) {
        //     t.$search = $('<input class="sidebar-search" type="search">');
        //     parentNode.$dom.append(t.$search);
        //     document.addEventListener('keydown', function (e) {
        //         if (e.which == 13) {
        //
        //         }
        //     })
        // }
    };
    // 侧边栏内容
    var sidebar_list = function (parentNode) {
        var options = parentNode.options.data;
        this.$dom = $('<ul class="sidebar-list"></ul>');
        if (options.length == 1) {
            parentNode.tab.$dom.hide();
        }
        this.init(options[0].url, parentNode);
        parentNode.$sidebar.append(this.$dom);
        return this;
    };
    sidebar_list.prototype = {
        // 初始化
        init: function (url, parentNode) {
            this.getData(url, parentNode);
            this.$dom.on('click', 'li', function () {
                var $this = $(this);
                //header内信息修改
                bannerName && bannerName.setDate($this.data('name'));
                //list重置
                list && (list.resetParams($this.parent().data('param'), $this.data('idx')));
                //venbox重置
                venbox && venbox.getData();
                //遮罩层hide
                mask && mask.hide();
                return false;
            });
        },
        // 渲染
        render: function (parentNode) {
            var html = '',
                index = parentNode.index;
            for (var i in parentNode.listData[index]) {
                var item = parentNode.options.template;
                parentNode.listData[index][i].index = parentNode.index;
                !parentNode.listData[index][i].hide && (html += item.format(parentNode.listData[index][i]));
            }
            this.$dom.append(html).data('param', parentNode.options.data[index].param);
            this.showContent(index);
        },
        // 切换
        changeTab: function (index) {
            this.hideContent().showContent(index)
        },
        hideContent: function () {
            this.onload();
            this.$dom.find('li').addClass('hide');
            return this;
        },
        showContent: function (index) {
            this.$dom.find('.tab_content_' + index).removeClass('hide');
            this.endload();
            return this;
        },
        // 获取数据
        getData: function (url, parentNode) {
            var t = this,
                index = parentNode.index;
            this.hideContent();
            $.ajax({
                type: "GET",
                url: url,
                success: function (data) {
                    parentNode.listData[index] = data;
                    t.render(parentNode);
                },
                error: function () {
                    alert('获取品牌列表失败！');
                }
            });
        },
        // 加载动画
        onload: function () {
            this.$el = $('<div class="spinner"><div class="rect1"></div><div class="rect2"></div><div class="rect3"></div><div class="rect4"></div><div class="rect5"></div></div>');
            this.$dom.append(this.$el);
        },
        // 加载结束
        endload: function () {
            this.$el.remove();
        },
        // 搜索（暂未启用）
        search: function (text, parentNode) {
            var index = parentNode.index,
                param = parentNode.options.search;
            for (var i in parentNode.listData[index]) {
                var _item = parentNode.listData[index][i],
                    _param = _item[param],
                    _regExp = new RegExp(text);
                _item.hide = !_regExp.test(_param);
            }
            this.render(parentNode);
        }
    };
    var _sidebar = function (options) {
        var t = this,
            // 默认模版
            defaults = {
                template: '<li class="box J_brand_designer clear tab_content_{index} hide" data-idx="{id}" data-name="{chName}">' +
                '<div class="headpic"><img src="{picUrl}"></div>' +
                '<div class="namebox">' +
                '<div class="name">{chName}</div>' +
                '<div class="nameen">{name}</div>' +
                '</div></li>'
            };
        // 配置参数
        t.options = $.extend({}, defaults, options);
        // DOM
        t.$dom = $('<div id="sidebar" class="pop-panel"></div>');
        // 侧边栏
        t.$sidebar = $('<div class="sidebar-content"></div>');
        // tab
        t.tab = new sidebar_tab(t);
        t.$dom.append(t.$sidebar);
        // list内容
        t.list = new sidebar_list(t);
        // list数据
        t.listData = [];
        var $nav = new nav(t.$dom);
        $('.banner').append($nav);
        return this;
    };


    //===== popTop =====
    // venbox启动按钮
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
    // venbox下拉框
    var _venbox = function (options) {
        // 默认模版
        var defaults = {
            template: '<li data-idx="{0}" data-count="{1}" data-text="{2}"><div class="count">{1}</div><div class="text">{2}</div></li>'
        };
        // 配置参数
        this.options = $.extend({}, defaults, options);
        // DOM
        this.$dom = $('<ul class="ven_box pop-panel"></ul>');
        this.init();
        return this;
    };
    _venbox.prototype = {
        // 初始化
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
        // 渲染按钮
        createVan: function () {
            this.ven = new ven(this);
        },
        // 渲染内容
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
            $initEl = $('.ven_box [data-idx="' + initParam + '"]');
            t.changeVan($initEl)
        },
        // 获取数据
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
        // 修改按钮内容
        changeVan: function (el) {
            el.siblings().removeClass('checked').end().addClass('checked');
            this.ven.setDate(el.data('idx'), el.data('count'), el.data('text'));
        },
        // 点击事件
        eventClick: function (e, t) {
            t.changeVan($(this));
            list && (list.resetParams(t.ven.$dom.data('name'), $(this).data('idx')));
            mask && mask.hide();
        }
    };
    $.fn.LClist = function (options) {
        this.append('<div class="banner"></div>');
        bannerName = new _bannerName();
        mask = new _mask();
        for (var i in options) {
            switch (options[i].type) {
                case 'sidebar':
                    sidebar = new _sidebar(options[i]);
                    this.append(sidebar.$dom);
                    break;
                case 'list':
                    list = new _list(options[i]);
                    this.append(list.$dom);
                    break;
                case 'venbox':
                    venbox = new _venbox(options[i]);
                    this.append(venbox.$dom);
                    break;
                default:
                    console.log('配置参数type无效');
                    break;
            }
        }
    };
})($, window, document);


//===== 字符串操作 =====
String.prototype.format = function (args) {
    //非数组或对象
    var obj = (typeof args !== "object") ? arguments : args;
    return this.replace(/\{(.+?)\}/g, function (match, number) {
        return typeof obj[number] != 'undefined' ? obj[number] : match;
    });
};