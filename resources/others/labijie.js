/**
 * Created by gewangjie on 2016/9/19.
 */
function appendCanvas() {
    var t = "/images/designer/";
    if ("undefined" == typeof d) {
        var e = {
            connerControlSettings: {
                tr: {action: "scale", cursor: "se-resize"},
                tr: {action: "rotate", cursor: "pointer"},
                br: {action: "scale", cursor: "se-resize"},
                bl: {action: "remove", cursor: "pointer"},
                mt: {action: "moveUp", cursor: "pointer"},
                mb: {action: "moveDown", cursor: "pointer"}
            },
            appearances: {
                light: {
                    elementBorderColor: "#000",
                    regionBorderColor: "#5b5b5b",
                    regionBorderColor: "#003E3E",
                    elementWarningBorderColor: "red",
                    cornerIconSettings: {
                        settings: {
                            cornerBorderColor: "#000",
                            cornerSize: 24,
                            cornerShape: "circle",
                            cornerBackgroundColor: "#fff",
                            cornerPadding: 0
                        },
                        tl: {icon: t + "control-resize-black.svg"},
                        tr: {icon: t + "control-rotate-black.svg"},
                        bl: {icon: t + "control-remove-black.svg"},
                        br: {icon: t + "control-resize-black.svg"},
                        mb: {icon: t + "control-layer-down-black.svg"},
                        mt: {icon: t + "control-layer-up-black.svg"}
                    }
                },
                dark: {
                    elementBorderColor: "#fff",
                    elementWarningBorderColor: "#FF5151",
                    regionBorderColor: "#D9FFFF",
                    cornerIconSettings: {
                        settings: {
                            cornerBorderColor: "#fff",
                            cornerSize: 24,
                            cornerShape: "circle",
                            cornerBackgroundColor: "#000",
                            cornerPadding: 0
                        },
                        tl: {icon: t + "control-resize-white.svg"},
                        tr: {icon: t + "control-rotate-white.svg"},
                        bl: {icon: t + "control-remove-white.svg"},
                        br: {icon: t + "control-resize-white.svg"},
                        mb: {icon: t + "control-layer-down-white.svg"},
                        mt: {icon: t + "control-layer-up-white.svg"}
                    }
                }
            }
        }, i = document.getElementById("design-canvas");
        null != i && (d = new Labijie.Designer(i, e), d.setUI(DesignerUI), d.events.printDpiChanged.on(function () {
            $("#ppi").text("打印分辨率：" + Math.round(d.getActivedPart().PrintDpi) + "DPI")
        }), d.events.designRegionChanged.on(function () {
            var t = ($('.arrow-mobile[data="right"]'), $(".col-right")), e = $("#dg-help-functions");
            if (!$.browser.mobile)var e = e.show();
            var i = (e.find(".btn-group-vertical").first(), this.getDesignRegion()), n = e.children(".btn-group-vertical").first().width() > 100 ? (t.closest(".container-fluid").width() - e.width()) / 2 : i.left + i.width + 120;
            e.css("top", ""), e.css("bottom", $("#product-thumbs").outerHeight() + 5 + "px"), e.css("right", ""), e.css("left", n + "px"), desinger.isSmallWindow() || $(".arrow-mobile").hide(), jQuery("#outline-color").popover("hide"), jQuery("#txt-color").popover("hide")
        }), d.events.elementsLayerChanged.on(function () {
            desinger.refreshLayers()
        }), d.elementEvents.actived.on(function () {
            setPopoverValue(this);
            var t = this.getModel();
            "Text" == t.ItemType && jQuery(".btn-mobile-edit").show(), desinger.activeLayer()
        }), d.elementEvents.deactived.on(function () {
            jQuery("#outline-color").popover("hide"), jQuery("#txt-color").popover("hide"), jQuery("#dg-popover").hide(), jQuery(".btn-mobile-edit").hide(), desinger.activeLayer()
        }), d.elementEvents.added.on(function () {
            $(".btn-mobile-layers").show(), desinger.refreshLayers(), desinger.getPrice()
        }), d.elementEvents.removed.on(function () {
            $(".mobile-menu").is(":visible") && 0 == d.getActivedPart().Elements.length && ($(".btn-mobile-layers").hide(), $(".dg-layers").closest(".dg-box").hide(), $(".col-left .arrow-mobile").hide()), desinger.refreshLayers(), desinger.getPrice()
        }), d.elementEvents.rotating.on(function () {
            setPopoverValue(this)
        }), d.elementEvents.scaling.on(function () {
            setPopoverValue(this)
        }))
    }
}
function setPopoverValue(t) {
    var e = t.getObject(), i = t.getModel();
    switch (i.ItemType) {
        case"Artwork":
            desinger.isSmallWindow() || popover("#options-art"), jQuery("#clipart-width").val(e.getWidth()), jQuery("#clipart-height").val(e.getHeight()), jQuery("#clipart-rotate-value").val(e.angle);
            break;
        case"Text":
            desinger.isSmallWindow() || popover("#options-text"), jQuery("#enter-text").val(i.Text);
            var n = jQuery("#txt-color");
            "transparent" == (i.TextColor || "transparent") ? (n.css("background-color", ""), n.addClass("graph-paper-sm")) : (n.css("background-color", i.TextColor), n.removeClass("graph-paper-sm"));
            var r = jQuery("#outline-color");
            "transparent" == (i.OutlineColor || "transparent") ? (r.css("background-color", ""), r.addClass("graph-paper-sm")) : (r.css("background-color", i.OutlineColor), r.removeClass("graph-paper-sm")), jQuery("#text-width").val(e.getWidth()), jQuery("#text-height").val(e.getHeight()), jQuery("#text-rotate-value").val(e.angle), jQuery("input.outline-value").val(i.OutlineWidth), jQuery("input.outline-value").triggerHandler("change"), jQuery("#txt-fontfamily").text(i.FontFamily), jQuery("#text-style").find("a").removeClass("active"), (i.TextStyle & Labijie.Models.TextStyle.italic) == Labijie.Models.TextStyle.italic && jQuery("#text-style-i").addClass("active"), (i.TextStyle & Labijie.Models.TextStyle.bold) == Labijie.Models.TextStyle.bold && jQuery("#text-style-b").addClass("active"), $("#dg-fonts").find("a.box-font.active").removeClass("active"), $("#dg-fonts").find('a[class="box-font"][data-font-family="' + i.FontFamily + '"]:first').addClass("active")
    }
}
function popover(t, e) {
    var i = $("#dg-popover");
    if (e = e || !1, i.is(":visible"))e && (jQuery("#outline-color").popover("hide"), jQuery("#txt-color").popover("hide"), jQuery(".dg-options").hide(), i.hide()); else {
        jQuery(".dg-options").hide(), jQuery(t).show();
        var n = $("#dg-left"), r = $(".col-left").position(), o = n.outerHeight() - n.height();
        i.css({
            top: r.top + o + "px",
            left: r.left + 40 + "px",
            bottom: "",
            display: "block"
        }), jQuery(".arrow", i).css("top", "55px")
    }
}
function setDefaultCount() {
    setTimeout(function () {
        var t = 1, e = jQuery(".list-number input.size-number");
        e.length > 0 && (jQuery(e[0]).val(t), jQuery(e[0]).trigger("change"))
    }, 1e3)
}
function compareThemeVersion(t, e) {
    var i = t.ProductThemeId, n = t.ProductThemeVersion, r = !1;
    return jQuery(e.Themes).each(function (t, e) {
        e.Id == i && e.Version != n && (r = !0)
    }), r
}
function changeProductColorBox(t) {
    var e = [];
    e.push({Appearances: t.Appearances});
    var i = jQuery("#product-colors"), n = jQuery("#product-theme-colors-tmpl").render(e);
    i.html(n);
    var r = jQuery(".mobile-themes");
    jQuery("#mobile-product-theme-colors-tmpl").render(e);
    r.html(n), r.find(".color-switch").first().addClass("active")
}
function CalculateThemeColors(t) {
    return jQuery(t.Themes).each(function (t, e) {
        var i = e.Appearances.split(";"), n = (i.length, []);
        2 == i.length ? (n.push({Appearances: i[0], Width: 60}), n.push({
            Appearances: i[1],
            Width: 40
        })) : 3 == i.length ? (n.push({Appearances: i[0], Width: 50}), n.push({
            Appearances: i[1],
            Width: 25
        }), n.push({Appearances: i[2], Width: 25})) : n.push({Appearances: i[0], Width: 100}), e.Colors = n
    }), t
}
!function (t, e, i, n) {
    function r(t, e) {
        var i = Math.max(0, t[0] - e[0], e[0] - t[1]), n = Math.max(0, t[2] - e[1], e[1] - t[3]);
        return i + n
    }

    function o(e, i, n, r) {
        var o = e.length, s = r ? "offset" : "position";
        for (n = n || 0; o--;) {
            var a = e[o].el ? e[o].el : t(e[o]), c = a[s]();
            c.left += parseInt(a.css("margin-left"), 10), c.top += parseInt(a.css("margin-top"), 10), i[o] = [c.left - n, c.left + a.outerWidth() + n, c.top - n, c.top + a.outerHeight() + n]
        }
    }

    function s(t, e) {
        var i = e.offset();
        return {left: t.left - i.left, top: t.top - i.top}
    }

    function a(t, e, i) {
        e = [e.left, e.top], i = i && [i.left, i.top];
        for (var n, o = t.length, s = []; o--;)n = t[o], s[o] = [o, r(n, e), i && r(n, i)];
        return s = s.sort(function (t, e) {
            return e[1] - t[1] || e[2] - t[2] || e[0] - t[0]
        })
    }

    function c(e) {
        this.options = t.extend({}, f, e), this.containers = [], this.options.rootGroup || (this.scrollProxy = t.proxy(this.scroll, this), this.dragProxy = t.proxy(this.drag, this), this.dropProxy = t.proxy(this.drop, this), this.placeholder = t(this.options.placeholder), e.isValidTarget || (this.options.isValidTarget = n))
    }

    function l(e, i) {
        this.el = e, this.options = t.extend({}, u, i), this.group = c.get(this.options), this.rootGroup = this.options.rootGroup || this.group, this.handle = this.rootGroup.options.handle || this.rootGroup.options.itemSelector;
        var n = this.rootGroup.options.itemPath;
        this.target = n ? this.el.find(n) : this.el, this.target.on(h.start, this.handle, t.proxy(this.dragInit, this)), this.options.drop && this.group.containers.push(this)
    }

    var h, u = {drag: !0, drop: !0, exclude: "", nested: !0, vertical: !0}, f = {
        afterMove: function (t, e, i) {
        },
        containerPath: "",
        containerSelector: "ol, ul",
        distance: 0,
        delay: 0,
        handle: "",
        itemPath: "",
        itemSelector: "li",
        bodyClass: "dragging",
        draggedClass: "dragged",
        isValidTarget: function (t, e) {
            return !0
        },
        onCancel: function (t, e, i, n) {
        },
        onDrag: function (t, e, i, n) {
            t.css(e)
        },
        onDragStart: function (e, i, n, r) {
            e.css({
                height: e.outerHeight(),
                width: e.outerWidth()
            }), e.addClass(i.group.options.draggedClass), t("body").addClass(i.group.options.bodyClass)
        },
        onDrop: function (e, i, n, r) {
            e.removeClass(i.group.options.draggedClass).removeAttr("style"), t("body").removeClass(i.group.options.bodyClass)
        },
        onMousedown: function (t, e, i) {
            return i.target.nodeName.match(/^(input|select|textarea)$/i) ? void 0 : (i.preventDefault(), !0)
        },
        placeholderClass: "placeholder",
        placeholder: '<li class="placeholder"></li>',
        pullPlaceholder: !0,
        serialize: function (e, i, n) {
            var r = t.extend({}, e.data());
            return n ? [i] : (i[0] && (r.children = i), delete r.subContainers, delete r.sortable, r)
        },
        tolerance: 0
    }, d = {}, g = 0, p = {left: 0, top: 0, bottom: 0, right: 0}, h = {
        start: "touchstart.sortable mousedown.sortable",
        drop: "touchend.sortable touchcancel.sortable mouseup.sortable",
        drag: "touchmove.sortable mousemove.sortable",
        scroll: "scroll.sortable"
    }, v = "subContainers";
    c.get = function (t) {
        return d[t.group] || (t.group === n && (t.group = g++), d[t.group] = new c(t)), d[t.group]
    }, c.prototype = {
        dragInit: function (e, i) {
            this.$document = t(i.el[0].ownerDocument);
            var n = t(e.target).closest(this.options.itemSelector);
            if (n.length) {
                if (this.item = n, this.itemContainer = i, this.item.is(this.options.exclude) || !this.options.onMousedown(this.item, f.onMousedown, e))return;
                this.setPointer(e), this.toggleListeners("on"), this.setupDelayTimer(), this.dragInitDone = !0
            }
        }, drag: function (t) {
            if (!this.dragging) {
                if (!this.distanceMet(t) || !this.delayMet)return;
                this.options.onDragStart(this.item, this.itemContainer, f.onDragStart, t), this.item.before(this.placeholder), this.dragging = !0
            }
            this.setPointer(t), this.options.onDrag(this.item, s(this.pointer, this.item.offsetParent()), f.onDrag, t);
            var e = this.getPointer(t), i = this.sameResultBox, r = this.options.tolerance;
            (!i || i.top - r > e.top || i.bottom + r < e.top || i.left - r > e.left || i.right + r < e.left) && (this.searchValidTarget() || (this.placeholder.detach(), this.lastAppendedItem = n))
        }, drop: function (t) {
            this.toggleListeners("off"), this.dragInitDone = !1, this.dragging && (this.placeholder.closest("html")[0] ? this.placeholder.before(this.item).detach() : this.options.onCancel(this.item, this.itemContainer, f.onCancel, t), this.options.onDrop(this.item, this.getContainer(this.item), f.onDrop, t), this.clearDimensions(), this.clearOffsetParent(), this.lastAppendedItem = this.sameResultBox = n, this.dragging = !1)
        }, searchValidTarget: function (t, e) {
            t || (t = this.relativePointer || this.pointer, e = this.lastRelativePointer || this.lastPointer);
            for (var i = a(this.getContainerDimensions(), t, e), r = i.length; r--;) {
                var o = i[r][0], c = i[r][1];
                if (!c || this.options.pullPlaceholder) {
                    var l = this.containers[o];
                    if (!l.disabled) {
                        if (!this.$getOffsetParent()) {
                            var h = l.getItemOffsetParent();
                            t = s(t, h), e = s(e, h)
                        }
                        if (l.searchValidTarget(t, e))return !0
                    }
                }
            }
            this.sameResultBox && (this.sameResultBox = n)
        }, movePlaceholder: function (t, e, i, n) {
            var r = this.lastAppendedItem;
            (n || !r || r[0] !== e[0]) && (e[i](this.placeholder), this.lastAppendedItem = e, this.sameResultBox = n, this.options.afterMove(this.placeholder, t, e))
        }, getContainerDimensions: function () {
            return this.containerDimensions || o(this.containers, this.containerDimensions = [], this.options.tolerance, !this.$getOffsetParent()), this.containerDimensions
        }, getContainer: function (t) {
            return t.closest(this.options.containerSelector).data(i)
        }, $getOffsetParent: function () {
            if (this.offsetParent === n) {
                var t = this.containers.length - 1, e = this.containers[t].getItemOffsetParent();
                if (!this.options.rootGroup)for (; t--;)if (e[0] != this.containers[t].getItemOffsetParent()[0]) {
                    e = !1;
                    break
                }
                this.offsetParent = e
            }
            return this.offsetParent
        }, setPointer: function (t) {
            var e = this.getPointer(t);
            if (this.$getOffsetParent()) {
                var i = s(e, this.$getOffsetParent());
                this.lastRelativePointer = this.relativePointer, this.relativePointer = i
            }
            this.lastPointer = this.pointer, this.pointer = e
        }, distanceMet: function (t) {
            var e = this.getPointer(t);
            return Math.max(Math.abs(this.pointer.left - e.left), Math.abs(this.pointer.top - e.top)) >= this.options.distance
        }, getPointer: function (t) {
            var e = t.originalEvent || t.originalEvent.touches && t.originalEvent.touches[0];
            return {left: t.pageX || e.pageX, top: t.pageY || e.pageY}
        }, setupDelayTimer: function () {
            var t = this;
            this.delayMet = !this.options.delay, this.delayMet || (clearTimeout(this._mouseDelayTimer), this._mouseDelayTimer = setTimeout(function () {
                t.delayMet = !0
            }, this.options.delay))
        }, scroll: function (t) {
            this.clearDimensions(), this.clearOffsetParent()
        }, toggleListeners: function (e) {
            var i = this, n = ["drag", "drop", "scroll"];
            t.each(n, function (t, n) {
                i.$document[e](h[n], i[n + "Proxy"])
            })
        }, clearOffsetParent: function () {
            this.offsetParent = n
        }, clearDimensions: function () {
            this.traverse(function (t) {
                t._clearDimensions()
            })
        }, traverse: function (t) {
            t(this);
            for (var e = this.containers.length; e--;)this.containers[e].traverse(t)
        }, _clearDimensions: function () {
            this.containerDimensions = n
        }, _destroy: function () {
            d[this.options.group] = n
        }
    }, l.prototype = {
        dragInit: function (t) {
            var e = this.rootGroup;
            !this.disabled && !e.dragInitDone && this.options.drag && this.isValidDrag(t) && e.dragInit(t, this)
        }, isValidDrag: function (t) {
            return 1 == t.which || "touchstart" == t.type && 1 == t.originalEvent.touches.length
        }, searchValidTarget: function (t, e) {
            var i = a(this.getItemDimensions(), t, e), n = i.length, r = this.rootGroup, o = !r.options.isValidTarget || r.options.isValidTarget(r.item, this);
            if (!n && o)return r.movePlaceholder(this, this.target, "append"), !0;
            for (; n--;) {
                var s = i[n][0], c = i[n][1];
                if (!c && this.hasChildGroup(s)) {
                    var l = this.getContainerGroup(s).searchValidTarget(t, e);
                    if (l)return !0
                } else if (o)return this.movePlaceholder(s, t), !0
            }
        }, movePlaceholder: function (e, i) {
            var n = t(this.items[e]), r = this.itemDimensions[e], o = "after", s = n.outerWidth(), a = n.outerHeight(), c = n.offset(), l = {
                left: c.left,
                right: c.left + s,
                top: c.top,
                bottom: c.top + a
            };
            if (this.options.vertical) {
                var h = (r[2] + r[3]) / 2, u = i.top <= h;
                u ? (o = "before", l.bottom -= a / 2) : l.top += a / 2
            } else {
                var f = (r[0] + r[1]) / 2, d = i.left <= f;
                d ? (o = "before", l.right -= s / 2) : l.left += s / 2
            }
            this.hasChildGroup(e) && (l = p), this.rootGroup.movePlaceholder(this, n, o, l)
        }, getItemDimensions: function () {
            return this.itemDimensions || (this.items = this.$getChildren(this.el, "item").filter(":not(." + this.group.options.placeholderClass + ", ." + this.group.options.draggedClass + ")").get(), o(this.items, this.itemDimensions = [], this.options.tolerance)), this.itemDimensions
        }, getItemOffsetParent: function () {
            var t, e = this.el;
            return t = "relative" === e.css("position") || "absolute" === e.css("position") || "fixed" === e.css("position") ? e : e.offsetParent()
        }, hasChildGroup: function (t) {
            return this.options.nested && this.getContainerGroup(t)
        }, getContainerGroup: function (e) {
            var r = t.data(this.items[e], v);
            if (r === n) {
                var o = this.$getChildren(this.items[e], "container");
                if (r = !1, o[0]) {
                    var s = t.extend({}, this.options, {rootGroup: this.rootGroup, group: g++});
                    r = o[i](s).data(i).group
                }
                t.data(this.items[e], v, r)
            }
            return r
        }, $getChildren: function (e, i) {
            var n = this.rootGroup.options, r = n[i + "Path"], o = n[i + "Selector"];
            return e = t(e), r && (e = e.find(r)), e.children(o)
        }, _serialize: function (e, i) {
            var n = this, r = i ? "item" : "container", o = this.$getChildren(e, r).not(this.options.exclude).map(function () {
                return n._serialize(t(this), !i)
            }).get();
            return this.rootGroup.options.serialize(e, o, i)
        }, traverse: function (e) {
            t.each(this.items || [], function (i) {
                var n = t.data(this, v);
                n && n.traverse(e)
            }), e(this)
        }, _clearDimensions: function () {
            this.itemDimensions = n
        }, _destroy: function () {
            var e = this;
            this.target.off(h.start, this.handle), this.el.removeData(i), this.options.drop && (this.group.containers = t.grep(this.group.containers, function (t) {
                return t != e
            })), t.each(this.items || [], function () {
                t.removeData(this, v)
            })
        }
    };
    var m = {
        enable: function () {
            this.traverse(function (t) {
                t.disabled = !1
            })
        }, disable: function () {
            this.traverse(function (t) {
                t.disabled = !0
            })
        }, serialize: function () {
            return this._serialize(this.el, !0)
        }, refresh: function () {
            this.traverse(function (t) {
                t._clearDimensions()
            })
        }, destroy: function () {
            this.traverse(function (t) {
                t._destroy()
            })
        }
    };
    t.extend(l.prototype, m), t.fn[i] = function (e) {
        var r = Array.prototype.slice.call(arguments, 1);
        return this.map(function () {
            var o = t(this), s = o.data(i);
            return s && m[e] ? m[e].apply(s, r) || this : (s || e !== n && "object" != typeof e || o.data(i, new l(o, e)), this)
        })
    }
}(jQuery, window, "sortable");
var fabric = fabric || {version: "1.5.0"};
if ("undefined" != typeof exports && (exports.fabric = fabric), "undefined" != typeof document && "undefined" != typeof window ? (fabric.document = document, fabric.window = window, window.fabric = fabric) : (fabric.document = require("jsdom").jsdom("<!DOCTYPE html><html><head></head><body></body></html>"), fabric.document.createWindow ? fabric.window = fabric.document.createWindow() : fabric.window = fabric.document.parentWindow), fabric.isTouchSupported = "ontouchstart" in fabric.document.documentElement, fabric.isLikelyNode = "undefined" != typeof Buffer && "undefined" == typeof window, fabric.SHARED_ATTRIBUTES = ["display", "transform", "fill", "fill-opacity", "fill-rule", "opacity", "stroke", "stroke-dasharray", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke-width"], fabric.DPI = 96, fabric.reNum = "(?:[-+]?(?:\\d+|\\d*\\.\\d+)(?:e[-+]?\\d+)?)", "undefined" == typeof eventjs)var eventjs = {};
if (function (t) {
        "use strict";
        t.modifyEventListener = !1, t.modifySelectors = !1, t.configure = function (e) {
            isFinite(e.modifyEventListener) && (t.modifyEventListener = e.modifyEventListener), isFinite(e.modifySelectors) && (t.modifySelectors = e.modifySelectors), d === !1 && t.modifyEventListener && g(), p === !1 && t.modifySelectors && v()
        }, t.add = function (t, e, n, r) {
            return i(t, e, n, r, "add")
        }, t.remove = function (t, e, n, r) {
            return i(t, e, n, r, "remove")
        }, t.returnFalse = function (t) {
            return !1
        }, t.stop = function (t) {
            t && (t.stopPropagation && t.stopPropagation(), t.cancelBubble = !0, t.cancelBubbleCount = 0)
        }, t.prevent = function (t) {
            t && (t.preventDefault ? t.preventDefault() : t.preventManipulation ? t.preventManipulation() : t.returnValue = !1)
        }, t.cancel = function (e) {
            t.stop(e), t.prevent(e)
        }, t.blur = function () {
            var t = document.activeElement;
            if (t) {
                var e = document.activeElement.nodeName;
                ("INPUT" === e || "TEXTAREA" === e || "true" === t.contentEditable) && t.blur && t.blur()
            }
        }, t.getEventSupport = function (t, e) {
            if ("string" == typeof t && (e = t, t = window), e = "on" + e, e in t)return !0;
            if (t.setAttribute || (t = document.createElement("div")), t.setAttribute && t.removeAttribute) {
                t.setAttribute(e, "");
                var i = "function" == typeof t[e];
                return "undefined" != typeof t[e] && (t[e] = null), t.removeAttribute(e), i
            }
        };
        var e = function (t) {
            if (!t || "object" != typeof t)return t;
            var i = new t.constructor;
            for (var n in t)t[n] && "object" == typeof t[n] ? i[n] = e(t[n]) : i[n] = t[n];
            return i
        }, i = function (o, s, l, d, g, p) {
            if (d = d || {}, "[object Object]" === String(o)) {
                var v = o;
                if (o = v.target, delete v.target, !v.type || !v.listener) {
                    for (var m in v) {
                        var y = v[m];
                        "function" != typeof y && (d[m] = y)
                    }
                    var b = {};
                    for (var _ in v) {
                        var m = _.split(","), x = v[_], C = {};
                        for (var w in d)C[w] = d[w];
                        if ("function" == typeof x)var l = x; else {
                            if ("function" != typeof x.listener)continue;
                            var l = x.listener;
                            for (var w in x)"function" != typeof x[w] && (C[w] = x[w])
                        }
                        for (var j = 0; j < m.length; j++)b[_] = eventjs.add(o, m[j], l, C, g)
                    }
                    return b
                }
                s = v.type, delete v.type, l = v.listener, delete v.listener;
                for (var _ in v)d[_] = v[_]
            }
            if (o && s && l) {
                if ("string" == typeof o && "ready" === s) {
                    if (!window.eventjs_stallOnReady) {
                        var T = (new Date).getTime(), S = d.timeout, P = d.interval || 1e3 / 60, O = window.setInterval(function () {
                            (new Date).getTime() - T > S && window.clearInterval(O), document.querySelector(o) && (window.clearInterval(O), setTimeout(l, 1))
                        }, P);
                        return
                    }
                    s = "load", o = window
                }
                if ("string" == typeof o) {
                    if (o = document.querySelectorAll(o), 0 === o.length)return r("Missing target on listener!", arguments);
                    1 === o.length && (o = o[0])
                }
                var A, E = {};
                if (o.length > 0 && o !== window) {
                    for (var k = 0, D = o.length; D > k; k++)A = i(o[k], s, l, e(d), g), A && (E[k] = A);
                    return n(E)
                }
                if ("string" == typeof s && (s = s.toLowerCase(), -1 !== s.indexOf(" ") ? s = s.split(" ") : -1 !== s.indexOf(",") && (s = s.split(","))), "string" != typeof s) {
                    if ("number" == typeof s.length)for (var M = 0, L = s.length; L > M; M++)A = i(o, s[M], l, e(d), g), A && (E[s[M]] = A); else for (var _ in s)A = "function" == typeof s[_] ? i(o, _, s[_], e(d), g) : i(o, _, s[_].listener, e(s[_]), g), A && (E[_] = A);
                    return n(E)
                }
                if (0 === s.indexOf("on") && (s = s.substr(2)), "object" != typeof o)return r("Target is not defined!", arguments);
                if ("function" != typeof l)return r("Listener is not a function!", arguments);
                var I = d.useCapture || !1, R = h(o) + "." + h(l) + "." + (I ? 1 : 0);
                if (t.Gesture && t.Gesture._gestureHandlers[s]) {
                    if (R = s + R, "remove" === g) {
                        if (!c[R])return;
                        c[R].remove(), delete c[R]
                    } else if ("add" === g) {
                        if (c[R])return c[R].add(), c[R];
                        if (d.useCall && !t.modifyEventListener) {
                            var F = l;
                            l = function (t, e) {
                                for (var i in e)t[i] = e[i];
                                return F.call(o, t)
                            }
                        }
                        d.gesture = s, d.target = o, d.listener = l, d.fromOverwrite = p, c[R] = t.proxy[s](d)
                    }
                    return c[R]
                }
                for (var G, W = a(s), j = 0; j < W.length; j++)if (s = W[j], G = s + "." + R, "remove" === g) {
                    if (!c[G])continue;
                    o[f](s, l, I), delete c[G]
                } else if ("add" === g) {
                    if (c[G])return c[G];
                    o[u](s, l, I), c[G] = {
                        id: G, type: s, target: o, listener: l, remove: function () {
                            for (var e = 0; e < W.length; e++)t.remove(o, W[e], l, d)
                        }
                    }
                }
                return c[G]
            }
        }, n = function (t) {
            return {
                remove: function () {
                    for (var e in t)t[e].remove()
                }, add: function () {
                    for (var e in t)t[e].add()
                }
            }
        }, r = function (t, e) {
            "undefined" != typeof console && "undefined" != typeof console.error && console.error(t, e)
        }, o = {
            msPointer: ["MSPointerDown", "MSPointerMove", "MSPointerUp"],
            touch: ["touchstart", "touchmove", "touchend"],
            mouse: ["mousedown", "mousemove", "mouseup"]
        }, s = {
            MSPointerDown: 0,
            MSPointerMove: 1,
            MSPointerUp: 2,
            touchstart: 0,
            touchmove: 1,
            touchend: 2,
            mousedown: 0,
            mousemove: 1,
            mouseup: 2
        }, a = (function () {
            t.supports = {}, window.navigator.msPointerEnabled && (t.supports.msPointer = !0), t.getEventSupport("touchstart") && (t.supports.touch = !0), t.getEventSupport("mousedown") && (t.supports.mouse = !0)
        }(), function () {
            return function (e) {
                var i = document.addEventListener ? "" : "on", n = s[e];
                if (isFinite(n)) {
                    var r = [];
                    for (var a in t.supports)r.push(i + o[a][n]);
                    return r
                }
                return [i + e]
            }
        }()), c = {}, l = 0, h = function (t) {
            return t === window ? "#window" : t === document ? "#document" : (t.uniqueID || (t.uniqueID = "e" + l++), t.uniqueID)
        }, u = document.addEventListener ? "addEventListener" : "attachEvent", f = document.removeEventListener ? "removeEventListener" : "detachEvent";
        t.createPointerEvent = function (e, i, n) {
            var r = i.gesture, o = i.target, s = e.changedTouches || t.proxy.getCoords(e);
            if (s.length) {
                var a = s[0];
                i.pointers = n ? [] : s, i.pageX = a.pageX, i.pageY = a.pageY, i.x = i.pageX, i.y = i.pageY
            }
            var c = document.createEvent("Event");
            c.initEvent(r, !0, !0), c.originalEvent = e;
            for (var l in i)"target" !== l && (c[l] = i[l]);
            var h = c.type;
            t.Gesture && t.Gesture._gestureHandlers[h] && i.oldListener.call(o, c, i, !1)
        };
        var d = !1, g = function () {
            if (window.HTMLElement) {
                var e = function (e) {
                    var n = function (n) {
                        var r = n + "EventListener", o = e[r];
                        e[r] = function (e, r, s) {
                            if (t.Gesture && t.Gesture._gestureHandlers[e]) {
                                var c = s;
                                "object" == typeof s ? c.useCall = !0 : c = {
                                    useCall: !0,
                                    useCapture: s
                                }, i(this, e, r, c, n, !0)
                            } else for (var l = a(e), h = 0; h < l.length; h++)o.call(this, l[h], r, s)
                        }
                    };
                    n("add"), n("remove")
                };
                navigator.userAgent.match(/Firefox/) ? (e(HTMLDivElement.prototype), e(HTMLCanvasElement.prototype)) : e(HTMLElement.prototype), e(document), e(window)
            }
        }, p = !1, v = function () {
            var t = NodeList.prototype;
            t.removeEventListener = function (t, e, i) {
                for (var n = 0, r = this.length; r > n; n++)this[n].removeEventListener(t, e, i)
            }, t.addEventListener = function (t, e, i) {
                for (var n = 0, r = this.length; r > n; n++)this[n].addEventListener(t, e, i)
            }
        };
        return t
    }(eventjs), "undefined" == typeof eventjs)var eventjs = {};
if ("undefined" == typeof eventjs.proxy && (eventjs.proxy = {}), eventjs.proxy = function (t) {
        "use strict";
        t.pointerSetup = function (t, e) {
            t.target = t.target || window, t.doc = t.target.ownerDocument || t.target, t.minFingers = t.minFingers || t.fingers || 1, t.maxFingers = t.maxFingers || t.fingers || 1 / 0, t.position = t.position || "relative", delete t.fingers, e = e || {}, e.enabled = !0, e.gesture = t.gesture, e.target = t.target, e.env = t.env, eventjs.modifyEventListener && t.fromOverwrite && (t.oldListener = t.listener, t.listener = eventjs.createPointerEvent);
            var i = 0, n = 0 === e.gesture.indexOf("pointer") && eventjs.modifyEventListener ? "pointer" : "mouse";
            return t.oldListener && (e.oldListener = t.oldListener), e.listener = t.listener, e.proxy = function (i) {
                e.defaultListener = t.listener, t.listener = i, i(t.event, e)
            }, e.add = function () {
                e.enabled !== !0 && (t.onPointerDown && eventjs.add(t.target, n + "down", t.onPointerDown), t.onPointerMove && eventjs.add(t.doc, n + "move", t.onPointerMove), t.onPointerUp && eventjs.add(t.doc, n + "up", t.onPointerUp), e.enabled = !0)
            }, e.remove = function () {
                e.enabled !== !1 && (t.onPointerDown && eventjs.remove(t.target, n + "down", t.onPointerDown), t.onPointerMove && eventjs.remove(t.doc, n + "move", t.onPointerMove), t.onPointerUp && eventjs.remove(t.doc, n + "up", t.onPointerUp), e.reset(), e.enabled = !1)
            }, e.pause = function (e) {
                !t.onPointerMove || e && !e.move || eventjs.remove(t.doc, n + "move", t.onPointerMove), !t.onPointerUp || e && !e.up || eventjs.remove(t.doc, n + "up", t.onPointerUp), i = t.fingers, t.fingers = 0
            }, e.resume = function (e) {
                !t.onPointerMove || e && !e.move || eventjs.add(t.doc, n + "move", t.onPointerMove), !t.onPointerUp || e && !e.up || eventjs.add(t.doc, n + "up", t.onPointerUp), t.fingers = i
            }, e.reset = function () {
                t.tracker = {}, t.fingers = 0
            }, e
        };
        var e = eventjs.supports;
        eventjs.isMouse = !!e.mouse, eventjs.isMSPointer = !!e.touch, eventjs.isTouch = !!e.msPointer, t.pointerStart = function (e, i, n) {
            var r = (e.type || "mousedown").toUpperCase();
            0 === r.indexOf("MOUSE") ? (eventjs.isMouse = !0, eventjs.isTouch = !1, eventjs.isMSPointer = !1) : 0 === r.indexOf("TOUCH") ? (eventjs.isMouse = !1, eventjs.isTouch = !0, eventjs.isMSPointer = !1) : 0 === r.indexOf("MSPOINTER") && (eventjs.isMouse = !1, eventjs.isTouch = !1, eventjs.isMSPointer = !0);
            var o = function (t, e) {
                var i = n.bbox, r = a[e] = {};
                switch (n.position) {
                    case"absolute":
                        r.offsetX = 0, r.offsetY = 0;
                        break;
                    case"differenceFromLast":
                        r.offsetX = t.pageX, r.offsetY = t.pageY;
                        break;
                    case"difference":
                        r.offsetX = t.pageX, r.offsetY = t.pageY;
                        break;
                    case"move":
                        r.offsetX = t.pageX - i.x1, r.offsetY = t.pageY - i.y1;
                        break;
                    default:
                        r.offsetX = i.x1 - i.scrollLeft, r.offsetY = i.y1 - i.scrollTop
                }
                var o = t.pageX - r.offsetX, s = t.pageY - r.offsetY;
                r.rotation = 0, r.scale = 1, r.startTime = r.moveTime = (new Date).getTime(), r.move = {
                    x: o,
                    y: s
                }, r.start = {x: o, y: s}, n.fingers++
            };
            n.event = e, i.defaultListener && (n.listener = i.defaultListener, delete i.defaultListener);
            for (var s = !n.fingers, a = n.tracker, c = e.changedTouches || t.getCoords(e), l = c.length, h = 0; l > h; h++) {
                var u = c[h], f = u.identifier || 1 / 0;
                if (n.fingers) {
                    if (n.fingers >= n.maxFingers) {
                        var d = [];
                        for (var f in n.tracker)d.push(f);
                        return i.identifier = d.join(","), s
                    }
                    var g = 0;
                    for (var p in a) {
                        if (a[p].up) {
                            delete a[p], o(u, f), n.cancel = !0;
                            break
                        }
                        g++
                    }
                    if (a[f])continue;
                    o(u, f)
                } else a = n.tracker = {}, i.bbox = n.bbox = t.getBoundingBox(n.target), n.fingers = 0, n.cancel = !1, o(u, f)
            }
            var d = [];
            for (var f in n.tracker)d.push(f);
            return i.identifier = d.join(","), s
        }, t.pointerEnd = function (t, e, i, n) {
            for (var r = t.touches || [], o = r.length, s = {}, a = 0; o > a; a++) {
                var c = r[a], l = c.identifier;
                s[l || 1 / 0] = !0
            }
            for (var l in i.tracker) {
                var h = i.tracker[l];
                s[l] || h.up || (n && n({
                    pageX: h.pageX,
                    pageY: h.pageY,
                    changedTouches: [{pageX: h.pageX, pageY: h.pageY, identifier: "Infinity" === l ? 1 / 0 : l}]
                }, "up"), h.up = !0, i.fingers--)
            }
            if (0 !== i.fingers)return !1;
            var u = [];
            i.gestureFingers = 0;
            for (var l in i.tracker)i.gestureFingers++, u.push(l);
            return e.identifier = u.join(","), !0
        }, t.getCoords = function (e) {
            return "undefined" != typeof e.pageX ? t.getCoords = function (t) {
                return Array({
                    type: "mouse",
                    x: t.pageX,
                    y: t.pageY,
                    pageX: t.pageX,
                    pageY: t.pageY,
                    identifier: t.pointerId || 1 / 0
                })
            } : t.getCoords = function (t) {
                var e = document.documentElement;
                return t = t || window.event, Array({
                    type: "mouse",
                    x: t.clientX + e.scrollLeft,
                    y: t.clientY + e.scrollTop,
                    pageX: t.clientX + e.scrollLeft,
                    pageY: t.clientY + e.scrollTop,
                    identifier: 1 / 0
                })
            }, t.getCoords(e)
        }, t.getCoord = function (e) {
            if ("ontouchstart" in window) {
                var i = 0, n = 0;
                t.getCoord = function (t) {
                    var e = t.changedTouches;
                    return e && e.length ? {x: i = e[0].pageX, y: n = e[0].pageY} : {x: i, y: n}
                }
            } else"undefined" != typeof e.pageX && "undefined" != typeof e.pageY ? t.getCoord = function (t) {
                return {x: t.pageX, y: t.pageY}
            } : t.getCoord = function (t) {
                var e = document.documentElement;
                return t = t || window.event, {x: t.clientX + e.scrollLeft, y: t.clientY + e.scrollTop}
            };
            return t.getCoord(e)
        };
        var i = function (t, e) {
            var i = parseFloat(t.getPropertyValue(e), 10);
            return isFinite(i) ? i : 0
        };
        return t.getBoundingBox = function (t) {
            (t === window || t === document) && (t = document.body);
            var e = {}, n = t.getBoundingClientRect();
            e.width = n.width, e.height = n.height, e.x1 = n.left, e.y1 = n.top, e.scaleX = n.width / t.offsetWidth || 1, e.scaleY = n.height / t.offsetHeight || 1, e.scrollLeft = 0, e.scrollTop = 0;
            var r = window.getComputedStyle(t), o = "border-box" === r.getPropertyValue("box-sizing");
            if (o === !1) {
                var s = i(r, "border-left-width"), a = i(r, "border-right-width"), c = i(r, "border-bottom-width"), l = i(r, "border-top-width");
                e.border = [s, a, l, c], e.x1 += s, e.y1 += l, e.width -= a + s, e.height -= c + l
            }
            e.x2 = e.x1 + e.width, e.y2 = e.y1 + e.height;
            for (var h = r.getPropertyValue("position"), u = "fixed" === h ? t : t.parentNode; null !== u && u !== document.body && void 0 !== u.scrollTop;) {
                var r = window.getComputedStyle(u), h = r.getPropertyValue("position");
                if ("absolute" === h); else {
                    if ("fixed" === h) {
                        e.scrollTop -= u.parentNode.scrollTop, e.scrollLeft -= u.parentNode.scrollLeft;
                        break
                    }
                    e.scrollLeft += u.scrollLeft, e.scrollTop += u.scrollTop
                }
                u = u.parentNode
            }
            return e.scrollBodyLeft = void 0 !== window.pageXOffset ? window.pageXOffset : (document.documentElement || document.body.parentNode || document.body).scrollLeft, e.scrollBodyTop = void 0 !== window.pageYOffset ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop, e.scrollLeft -= e.scrollBodyLeft, e.scrollTop -= e.scrollBodyTop, e
        }, function () {
            var e, i = navigator.userAgent.toLowerCase(), n = -1 !== i.indexOf("macintosh");
            e = n && -1 !== i.indexOf("khtml") ? {
                91: !0,
                93: !0
            } : n && -1 !== i.indexOf("firefox") ? {224: !0} : {17: !0}, (t.metaTrackerReset = function () {
                eventjs.fnKey = t.fnKey = !1, eventjs.metaKey = t.metaKey = !1, eventjs.escKey = t.escKey = !1, eventjs.ctrlKey = t.ctrlKey = !1, eventjs.shiftKey = t.shiftKey = !1, eventjs.altKey = t.altKey = !1
            })(), t.metaTracker = function (i) {
                var n = "keydown" === i.type;
                27 === i.keyCode && (eventjs.escKey = t.escKey = n), e[i.keyCode] && (eventjs.metaKey = t.metaKey = n), eventjs.ctrlKey = t.ctrlKey = i.ctrlKey, eventjs.shiftKey = t.shiftKey = i.shiftKey, eventjs.altKey = t.altKey = i.altKey
            }
        }(), t
    }(eventjs.proxy), "undefined" == typeof eventjs)var eventjs = {};
if (eventjs.MutationObserver = function () {
        var t = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver, e = !t && function () {
                var t = document.createElement("p"), e = !1, i = function () {
                    e = !0
                };
                if (t.addEventListener)t.addEventListener("DOMAttrModified", i, !1); else {
                    if (!t.attachEvent)return !1;
                    t.attachEvent("onDOMAttrModified", i)
                }
                return t.setAttribute("id", "target"), e
            }();
        return function (i, n) {
            if (t) {
                var r = {subtree: !1, attributes: !0}, o = new t(function (t) {
                    t.forEach(function (t) {
                        n.call(t.target, t.attributeName)
                    })
                });
                o.observe(i, r)
            } else e ? eventjs.add(i, "DOMAttrModified", function (t) {
                n.call(i, t.attrName)
            }) : "onpropertychange" in document.body && eventjs.add(i, "propertychange", function (t) {
                n.call(i, window.event.propertyName)
            })
        }
    }(), "undefined" == typeof eventjs)var eventjs = {};
if ("undefined" == typeof eventjs.proxy && (eventjs.proxy = {}), eventjs.proxy = function (t) {
        "use strict";
        return t.click = function (e) {
            e.gesture = e.gesture || "click", e.maxFingers = e.maxFingers || e.fingers || 1, e.onPointerDown = function (n) {
                t.pointerStart(n, i, e) && eventjs.add(e.target, "mouseup", e.onPointerUp)
            }, e.onPointerUp = function (n) {
                if (t.pointerEnd(n, i, e)) {
                    eventjs.remove(e.target, "mouseup", e.onPointerUp);
                    var r = n.changedTouches || t.getCoords(n), o = r[0], s = e.bbox, a = t.getBoundingBox(e.target), c = o.pageY - a.scrollBodyTop, l = o.pageX - a.scrollBodyLeft;
                    if (l > s.x1 && c > s.y1 && l < s.x2 && c < s.y2 && s.scrollTop === a.scrollTop) {
                        for (var h in e.tracker)break;
                        var u = e.tracker[h];
                        i.x = u.start.x, i.y = u.start.y, e.listener(n, i)
                    }
                }
            };
            var i = t.pointerSetup(e);
            return i.state = "click", eventjs.add(e.target, "mousedown", e.onPointerDown), i
        }, eventjs.Gesture = eventjs.Gesture || {}, eventjs.Gesture._gestureHandlers = eventjs.Gesture._gestureHandlers || {}, eventjs.Gesture._gestureHandlers.click = t.click, t
    }(eventjs.proxy), "undefined" == typeof eventjs)var eventjs = {};
if ("undefined" == typeof eventjs.proxy && (eventjs.proxy = {}), eventjs.proxy = function (t) {
        "use strict";
        return t.dbltap = t.dblclick = function (e) {
            e.gesture = e.gesture || "dbltap", e.maxFingers = e.maxFingers || e.fingers || 1;
            var i, n, r, o, s, a = 700;
            e.onPointerDown = function (l) {
                var h = l.changedTouches || t.getCoords(l);
                i && !n ? (s = h[0], n = (new Date).getTime() - i) : (o = h[0], i = (new Date).getTime(), n = 0, clearTimeout(r), r = setTimeout(function () {
                    i = 0
                }, a)), t.pointerStart(l, c, e) && (eventjs.add(e.target, "mousemove", e.onPointerMove).listener(l), eventjs.add(e.target, "mouseup", e.onPointerUp))
            }, e.onPointerMove = function (a) {
                if (i && !n) {
                    var c = a.changedTouches || t.getCoords(a);
                    s = c[0]
                }
                var l = e.bbox, h = s.pageX - l.x1, u = s.pageY - l.y1;
                h > 0 && h < l.width && u > 0 && u < l.height && Math.abs(s.pageX - o.pageX) <= 25 && Math.abs(s.pageY - o.pageY) <= 25 || (eventjs.remove(e.target, "mousemove", e.onPointerMove), clearTimeout(r), i = n = 0)
            }, e.onPointerUp = function (o) {
                if (t.pointerEnd(o, c, e) && (eventjs.remove(e.target, "mousemove", e.onPointerMove),
                        eventjs.remove(e.target, "mouseup", e.onPointerUp)), i && n) {
                    if (a >= n) {
                        c.state = e.gesture;
                        for (var s in e.tracker)break;
                        var l = e.tracker[s];
                        c.x = l.start.x, c.y = l.start.y, e.listener(o, c)
                    }
                    clearTimeout(r), i = n = 0
                }
            };
            var c = t.pointerSetup(e);
            return c.state = "dblclick", eventjs.add(e.target, "mousedown", e.onPointerDown), c
        }, eventjs.Gesture = eventjs.Gesture || {}, eventjs.Gesture._gestureHandlers = eventjs.Gesture._gestureHandlers || {}, eventjs.Gesture._gestureHandlers.dbltap = t.dbltap, eventjs.Gesture._gestureHandlers.dblclick = t.dblclick, t
    }(eventjs.proxy), "undefined" == typeof eventjs)var eventjs = {};
if ("undefined" == typeof eventjs.proxy && (eventjs.proxy = {}), eventjs.proxy = function (t) {
        "use strict";
        return t.dragElement = function (e, i) {
            t.drag({
                event: i, target: e, position: "move", listener: function (t, i) {
                    e.style.left = i.x + "px", e.style.top = i.y + "px", eventjs.prevent(t)
                }
            })
        }, t.drag = function (e) {
            e.gesture = "drag", e.onPointerDown = function (n) {
                t.pointerStart(n, i, e) && (e.monitor || (eventjs.add(e.doc, "mousemove", e.onPointerMove), eventjs.add(e.doc, "mouseup", e.onPointerUp))), e.onPointerMove(n, "down")
            }, e.onPointerMove = function (n, r) {
                if (!e.tracker)return e.onPointerDown(n);
                for (var o = (e.bbox, n.changedTouches || t.getCoords(n)), s = o.length, a = 0; s > a; a++) {
                    var c = o[a], l = c.identifier || 1 / 0, h = e.tracker[l];
                    h && (h.pageX = c.pageX, h.pageY = c.pageY, i.state = r || "move", i.identifier = l, i.start = h.start, i.fingers = e.fingers, "differenceFromLast" === e.position ? (i.x = h.pageX - h.offsetX, i.y = h.pageY - h.offsetY, h.offsetX = h.pageX, h.offsetY = h.pageY) : (i.x = h.pageX - h.offsetX, i.y = h.pageY - h.offsetY), e.listener(n, i))
                }
            }, e.onPointerUp = function (n) {
                t.pointerEnd(n, i, e, e.onPointerMove) && (e.monitor || (eventjs.remove(e.doc, "mousemove", e.onPointerMove), eventjs.remove(e.doc, "mouseup", e.onPointerUp)))
            };
            var i = t.pointerSetup(e);
            return e.event ? e.onPointerDown(e.event) : (eventjs.add(e.target, "mousedown", e.onPointerDown), e.monitor && (eventjs.add(e.doc, "mousemove", e.onPointerMove), eventjs.add(e.doc, "mouseup", e.onPointerUp))), i
        }, eventjs.Gesture = eventjs.Gesture || {}, eventjs.Gesture._gestureHandlers = eventjs.Gesture._gestureHandlers || {}, eventjs.Gesture._gestureHandlers.drag = t.drag, t
    }(eventjs.proxy), "undefined" == typeof eventjs)var eventjs = {};
if ("undefined" == typeof eventjs.proxy && (eventjs.proxy = {}), eventjs.proxy = function (t) {
        "use strict";
        var e = Math.PI / 180, i = function (t, e) {
            var i = 0, n = 0, r = 0;
            for (var o in e) {
                var s = e[o];
                s.up || (i += s.move.x, n += s.move.y, r++)
            }
            return t.x = i /= r, t.y = n /= r, t
        };
        return t.gesture = function (n) {
            n.gesture = n.gesture || "gesture", n.minFingers = n.minFingers || n.fingers || 2, n.onPointerDown = function (e) {
                var o = n.fingers;
                if (t.pointerStart(e, r, n) && (eventjs.add(n.doc, "mousemove", n.onPointerMove), eventjs.add(n.doc, "mouseup", n.onPointerUp)), n.fingers === n.minFingers && o !== n.fingers) {
                    r.fingers = n.minFingers, r.scale = 1, r.rotation = 0, r.state = "start";
                    var s = "";
                    for (var a in n.tracker)s += a;
                    r.identifier = parseInt(s), i(r, n.tracker), n.listener(e, r)
                }
            }, n.onPointerMove = function (o, s) {
                for (var a = n.bbox, c = n.tracker, l = o.changedTouches || t.getCoords(o), h = l.length, u = 0; h > u; u++) {
                    var f = l[u], d = f.identifier || 1 / 0, g = c[d];
                    g && (g.move.x = f.pageX - a.x1, g.move.y = f.pageY - a.y1)
                }
                if (!(n.fingers < n.minFingers)) {
                    var l = [], p = 0, v = 0;
                    i(r, c);
                    for (var d in c) {
                        var f = c[d];
                        if (!f.up) {
                            var m = f.start;
                            if (!m.distance) {
                                var y = m.x - r.x, b = m.y - r.y;
                                m.distance = Math.sqrt(y * y + b * b), m.angle = Math.atan2(y, b) / e
                            }
                            var y = f.move.x - r.x, b = f.move.y - r.y, _ = Math.sqrt(y * y + b * b);
                            p += _ / m.distance;
                            var x = Math.atan2(y, b) / e, C = (m.angle - x + 360) % 360 - 180;
                            f.DEG2 = f.DEG1, f.DEG1 = C > 0 ? C : -C, "undefined" != typeof f.DEG2 && (C > 0 ? f.rotation += f.DEG1 - f.DEG2 : f.rotation -= f.DEG1 - f.DEG2, v += f.rotation), l.push(f.move)
                        }
                    }
                    r.touches = l, r.fingers = n.fingers, r.scale = p / n.fingers, r.rotation = v / n.fingers, r.state = "change", n.listener(o, r)
                }
            }, n.onPointerUp = function (e) {
                var i = n.fingers;
                t.pointerEnd(e, r, n) && (eventjs.remove(n.doc, "mousemove", n.onPointerMove), eventjs.remove(n.doc, "mouseup", n.onPointerUp)), i === n.minFingers && n.fingers < n.minFingers && (r.fingers = n.fingers, r.state = "end", n.listener(e, r))
            };
            var r = t.pointerSetup(n);
            return eventjs.add(n.target, "mousedown", n.onPointerDown), r
        }, eventjs.Gesture = eventjs.Gesture || {}, eventjs.Gesture._gestureHandlers = eventjs.Gesture._gestureHandlers || {}, eventjs.Gesture._gestureHandlers.gesture = t.gesture, t
    }(eventjs.proxy), "undefined" == typeof eventjs)var eventjs = {};
if ("undefined" == typeof eventjs.proxy && (eventjs.proxy = {}), eventjs.proxy = function (t) {
        "use strict";
        return t.pointerdown = t.pointermove = t.pointerup = function (e) {
            if (e.gesture = e.gesture || "pointer", !e.target.isPointerEmitter) {
                var i = !0;
                e.onPointerDown = function (t) {
                    i = !1, n.gesture = "pointerdown", e.listener(t, n)
                }, e.onPointerMove = function (t) {
                    n.gesture = "pointermove", e.listener(t, n, i)
                }, e.onPointerUp = function (t) {
                    i = !0, n.gesture = "pointerup", e.listener(t, n, !0)
                };
                var n = t.pointerSetup(e);
                return eventjs.add(e.target, "mousedown", e.onPointerDown), eventjs.add(e.target, "mousemove", e.onPointerMove), eventjs.add(e.doc, "mouseup", e.onPointerUp), e.target.isPointerEmitter = !0, n
            }
        }, eventjs.Gesture = eventjs.Gesture || {}, eventjs.Gesture._gestureHandlers = eventjs.Gesture._gestureHandlers || {}, eventjs.Gesture._gestureHandlers.pointerdown = t.pointerdown, eventjs.Gesture._gestureHandlers.pointermove = t.pointermove, eventjs.Gesture._gestureHandlers.pointerup = t.pointerup, t
    }(eventjs.proxy), "undefined" == typeof eventjs)var eventjs = {};
if ("undefined" == typeof eventjs.proxy && (eventjs.proxy = {}), eventjs.proxy = function (t) {
        "use strict";
        return t.shake = function (t) {
            var e = {
                gesture: "devicemotion",
                acceleration: {},
                accelerationIncludingGravity: {},
                target: t.target,
                listener: t.listener,
                remove: function () {
                    window.removeEventListener("devicemotion", l, !1)
                }
            }, i = 4, n = 1e3, r = 200, o = 3, s = (new Date).getTime(), a = {x: 0, y: 0, z: 0}, c = {
                x: {
                    count: 0,
                    value: 0
                }, y: {count: 0, value: 0}, z: {count: 0, value: 0}
            }, l = function (l) {
                var h = .8, u = l.accelerationIncludingGravity;
                if (a.x = h * a.x + (1 - h) * u.x, a.y = h * a.y + (1 - h) * u.y, a.z = h * a.z + (1 - h) * u.z, e.accelerationIncludingGravity = a, e.acceleration.x = u.x - a.x, e.acceleration.y = u.y - a.y, e.acceleration.z = u.z - a.z, "devicemotion" === t.gesture)return void t.listener(l, e);
                for (var f = "xyz", d = (new Date).getTime(), g = 0, p = f.length; p > g; g++) {
                    var v = f[g], m = e.acceleration[v], y = c[v], b = Math.abs(m);
                    if (!(n > d - s) && b > i) {
                        var _ = d * m / b, x = Math.abs(_ + y.value);
                        y.value && r > x ? (y.value = _, y.count++, y.count === o && (t.listener(l, e), s = d, y.value = 0, y.count = 0)) : (y.value = _, y.count = 1)
                    }
                }
            };
            return window.addEventListener ? (window.addEventListener("devicemotion", l, !1), e) : void 0
        }, eventjs.Gesture = eventjs.Gesture || {}, eventjs.Gesture._gestureHandlers = eventjs.Gesture._gestureHandlers || {}, eventjs.Gesture._gestureHandlers.shake = t.shake, t
    }(eventjs.proxy), "undefined" == typeof eventjs)var eventjs = {};
if ("undefined" == typeof eventjs.proxy && (eventjs.proxy = {}), eventjs.proxy = function (t) {
        "use strict";
        var e = Math.PI / 180;
        return t.swipe = function (i) {
            i.snap = i.snap || 90, i.threshold = i.threshold || 1, i.gesture = i.gesture || "swipe", i.onPointerDown = function (e) {
                t.pointerStart(e, n, i) && (eventjs.add(i.doc, "mousemove", i.onPointerMove).listener(e), eventjs.add(i.doc, "mouseup", i.onPointerUp))
            }, i.onPointerMove = function (e) {
                for (var n = e.changedTouches || t.getCoords(e), r = n.length, o = 0; r > o; o++) {
                    var s = n[o], a = s.identifier || 1 / 0, c = i.tracker[a];
                    c && (c.move.x = s.pageX, c.move.y = s.pageY, c.moveTime = (new Date).getTime())
                }
            }, i.onPointerUp = function (r) {
                if (t.pointerEnd(r, n, i)) {
                    eventjs.remove(i.doc, "mousemove", i.onPointerMove), eventjs.remove(i.doc, "mouseup", i.onPointerUp);
                    var o, s, a, c, l = {x: 0, y: 0}, h = 0, u = 0, f = 0;
                    for (var d in i.tracker) {
                        var g = i.tracker[d], p = g.move.x - g.start.x, v = g.move.y - g.start.y;
                        h += g.move.x, u += g.move.y, l.x += g.start.x, l.y += g.start.y, f++;
                        var m = Math.sqrt(p * p + v * v), y = g.moveTime - g.startTime, c = Math.atan2(p, v) / e + 180, s = y ? m / y : 0;
                        if ("undefined" == typeof a)a = c, o = s; else {
                            if (!(Math.abs(c - a) <= 20))return;
                            a = (a + c) / 2, o = (o + s) / 2
                        }
                    }
                    var b = i.gestureFingers;
                    i.minFingers <= b && i.maxFingers >= b && o > i.threshold && (l.x /= f, l.y /= f, n.start = l, n.x = h / f, n.y = u / f, n.angle = -(((a / i.snap + .5 >> 0) * i.snap || 360) - 360), n.velocity = o, n.fingers = b, n.state = "swipe", i.listener(r, n))
                }
            };
            var n = t.pointerSetup(i);
            return eventjs.add(i.target, "mousedown", i.onPointerDown), n
        }, eventjs.Gesture = eventjs.Gesture || {}, eventjs.Gesture._gestureHandlers = eventjs.Gesture._gestureHandlers || {}, eventjs.Gesture._gestureHandlers.swipe = t.swipe, t
    }(eventjs.proxy), "undefined" == typeof eventjs)var eventjs = {};
if ("undefined" == typeof eventjs.proxy && (eventjs.proxy = {}), eventjs.proxy = function (t) {
        "use strict";
        return t.longpress = function (e) {
            return e.gesture = "longpress", t.tap(e)
        }, t.tap = function (e) {
            e.delay = e.delay || 500, e.timeout = e.timeout || 250, e.driftDeviance = e.driftDeviance || 10, e.gesture = e.gesture || "tap";
            var i, n;
            e.onPointerDown = function (o) {
                if (t.pointerStart(o, r, e)) {
                    if (i = (new Date).getTime(), eventjs.add(e.doc, "mousemove", e.onPointerMove).listener(o), eventjs.add(e.doc, "mouseup", e.onPointerUp), "longpress" !== e.gesture)return;
                    n = setTimeout(function () {
                        if (!(o.cancelBubble && ++o.cancelBubbleCount > 1)) {
                            var t = 0;
                            for (var i in e.tracker) {
                                var n = e.tracker[i];
                                if (n.end === !0)return;
                                if (e.cancel)return;
                                t++
                            }
                            e.minFingers <= t && e.maxFingers >= t && (r.state = "start", r.fingers = t, r.x = n.start.x, r.y = n.start.y, e.listener(o, r))
                        }
                    }, e.delay)
                }
            }, e.onPointerMove = function (i) {
                for (var n = e.bbox, r = i.changedTouches || t.getCoords(i), o = r.length, s = 0; o > s; s++) {
                    var a = r[s], c = a.identifier || 1 / 0, l = e.tracker[c];
                    if (l) {
                        var h = a.pageX - n.x1, u = a.pageY - n.y1, f = h - l.start.x, d = u - l.start.y, g = Math.sqrt(f * f + d * d);
                        if (!(h > 0 && h < n.width && u > 0 && u < n.height && g <= e.driftDeviance))return eventjs.remove(e.doc, "mousemove", e.onPointerMove), void(e.cancel = !0)
                    }
                }
            }, e.onPointerUp = function (o) {
                if (t.pointerEnd(o, r, e)) {
                    if (clearTimeout(n), eventjs.remove(e.doc, "mousemove", e.onPointerMove), eventjs.remove(e.doc, "mouseup", e.onPointerUp), o.cancelBubble && ++o.cancelBubbleCount > 1)return;
                    if ("longpress" === e.gesture)return void("start" === r.state && (r.state = "end", e.listener(o, r)));
                    if (e.cancel)return;
                    if ((new Date).getTime() - i > e.timeout)return;
                    var s = e.gestureFingers;
                    e.minFingers <= s && e.maxFingers >= s && (r.state = "tap", r.fingers = e.gestureFingers, e.listener(o, r))
                }
            };
            var r = t.pointerSetup(e);
            return eventjs.add(e.target, "mousedown", e.onPointerDown), r
        }, eventjs.Gesture = eventjs.Gesture || {}, eventjs.Gesture._gestureHandlers = eventjs.Gesture._gestureHandlers || {}, eventjs.Gesture._gestureHandlers.tap = t.tap, eventjs.Gesture._gestureHandlers.longpress = t.longpress, t
    }(eventjs.proxy), "undefined" == typeof eventjs)var eventjs = {};
if ("undefined" == typeof eventjs.proxy && (eventjs.proxy = {}), eventjs.proxy = function (t) {
        "use strict";
        return t.wheelPreventElasticBounce = function (t) {
            t && ("string" == typeof t && (t = document.querySelector(t)), eventjs.add(t, "wheel", function (t, e) {
                e.preventElasticBounce(), eventjs.stop(t)
            }))
        }, t.wheel = function (t) {
            var e, i = t.timeout || 150, n = 0, r = {
                gesture: "wheel",
                state: "start",
                wheelDelta: 0,
                target: t.target,
                listener: t.listener,
                preventElasticBounce: function (t) {
                    var e = this.target, i = e.scrollTop, n = i + e.offsetHeight, r = e.scrollHeight;
                    n === r && this.wheelDelta <= 0 ? eventjs.cancel(t) : 0 === i && this.wheelDelta >= 0 && eventjs.cancel(t), eventjs.stop(t)
                },
                add: function () {
                    t.target[s](c, o, !1)
                },
                remove: function () {
                    t.target[a](c, o, !1)
                }
            }, o = function (o) {
                o = o || window.event, r.state = n++ ? "change" : "start", r.wheelDelta = o.detail ? -20 * o.detail : o.wheelDelta, t.listener(o, r), clearTimeout(e), e = setTimeout(function () {
                    n = 0, r.state = "end", r.wheelDelta = 0, t.listener(o, r)
                }, i)
            }, s = document.addEventListener ? "addEventListener" : "attachEvent", a = document.removeEventListener ? "removeEventListener" : "detachEvent", c = eventjs.getEventSupport("mousewheel") ? "mousewheel" : "DOMMouseScroll";
            return t.target[s](c, o, !1), r
        }, eventjs.Gesture = eventjs.Gesture || {}, eventjs.Gesture._gestureHandlers = eventjs.Gesture._gestureHandlers || {}, eventjs.Gesture._gestureHandlers.wheel = t.wheel, t
    }(eventjs.proxy), "undefined" == typeof Event)var Event = {};
"undefined" == typeof Event.proxy && (Event.proxy = {}), Event.proxy = function (t) {
    "use strict";
    return t.orientation = function (t) {
        var e = {
            gesture: "orientationchange",
            previous: null,
            current: window.orientation,
            target: t.target,
            listener: t.listener,
            remove: function () {
                window.removeEventListener("orientationchange", i, !1)
            }
        }, i = function (i) {
            return e.previous = e.current, e.current = window.orientation, null !== e.previous && e.previous != e.current ? void t.listener(i, e) : void 0
        };
        return window.DeviceOrientationEvent && window.addEventListener("orientationchange", i, !1), e
    }, Event.Gesture = Event.Gesture || {}, Event.Gesture._gestureHandlers = Event.Gesture._gestureHandlers || {}, Event.Gesture._gestureHandlers.orientation = t.orientation, t
}(Event.proxy), function () {
    function t(t, e) {
        this.__eventListeners[t] && (e ? fabric.util.removeFromArray(this.__eventListeners[t], e) : this.__eventListeners[t].length = 0)
    }

    function e(t, e) {
        if (this.__eventListeners || (this.__eventListeners = {}), 1 === arguments.length)for (var i in t)this.on(i, t[i]); else this.__eventListeners[t] || (this.__eventListeners[t] = []), this.__eventListeners[t].push(e);
        return this
    }

    function i(e, i) {
        if (this.__eventListeners) {
            if (0 === arguments.length)this.__eventListeners = {}; else if (1 === arguments.length && "object" == typeof arguments[0])for (var n in e)t.call(this, n, e[n]); else t.call(this, e, i);
            return this
        }
    }

    function n(t, e) {
        if (this.__eventListeners) {
            var i = this.__eventListeners[t];
            if (i) {
                for (var n = 0, r = i.length; r > n; n++)i[n].call(this, e || {});
                return this
            }
        }
    }

    fabric.Observable = {observe: e, stopObserving: i, fire: n, on: e, off: i, trigger: n}
}(), fabric.Collection = {
    add: function () {
        this._objects.push.apply(this._objects, arguments);
        for (var t = 0, e = arguments.length; e > t; t++)this._onObjectAdded(arguments[t]);
        return this.renderOnAddRemove && this.renderAll(), this
    }, insertAt: function (t, e, i) {
        var n = this.getObjects();
        return i ? n[e] = t : n.splice(e, 0, t), this._onObjectAdded(t), this.renderOnAddRemove && this.renderAll(), this
    }, remove: function () {
        for (var t, e = this.getObjects(), i = 0, n = arguments.length; n > i; i++)t = e.indexOf(arguments[i]), -1 !== t && (e.splice(t, 1), this._onObjectRemoved(arguments[i]));
        return this.renderOnAddRemove && this.renderAll(), this
    }, forEachObject: function (t, e) {
        for (var i = this.getObjects(), n = i.length; n--;)t.call(e, i[n], n, i);
        return this
    }, getObjects: function (t) {
        return "undefined" == typeof t ? this._objects : this._objects.filter(function (e) {
            return e.type === t
        })
    }, item: function (t) {
        return this.getObjects()[t]
    }, isEmpty: function () {
        return 0 === this.getObjects().length
    }, size: function () {
        return this.getObjects().length
    }, contains: function (t) {
        return this.getObjects().indexOf(t) > -1
    }, complexity: function () {
        return this.getObjects().reduce(function (t, e) {
            return t += e.complexity ? e.complexity() : 0
        }, 0)
    }
}, function (t) {
    var e = Math.sqrt, i = Math.atan2, n = Math.PI / 180;
    fabric.util = {
        removeFromArray: function (t, e) {
            var i = t.indexOf(e);
            return -1 !== i && t.splice(i, 1), t
        }, getRandomInt: function (t, e) {
            return Math.floor(Math.random() * (e - t + 1)) + t
        }, degreesToRadians: function (t) {
            return t * n
        }, radiansToDegrees: function (t) {
            return t / n
        }, rotatePoint: function (t, e, i) {
            var n = Math.sin(i), r = Math.cos(i);
            t.subtractEquals(e);
            var o = t.x * r - t.y * n, s = t.x * n + t.y * r;
            return new fabric.Point(o, s).addEquals(e)
        }, transformPoint: function (t, e, i) {
            return i ? new fabric.Point(e[0] * t.x + e[2] * t.y, e[1] * t.x + e[3] * t.y) : new fabric.Point(e[0] * t.x + e[2] * t.y + e[4], e[1] * t.x + e[3] * t.y + e[5])
        }, invertTransform: function (t) {
            var e = t.slice(), i = 1 / (t[0] * t[3] - t[1] * t[2]);
            e = [i * t[3], -i * t[1], -i * t[2], i * t[0], 0, 0];
            var n = fabric.util.transformPoint({x: t[4], y: t[5]}, e);
            return e[4] = -n.x, e[5] = -n.y, e
        }, toFixed: function (t, e) {
            return parseFloat(Number(t).toFixed(e))
        }, parseUnit: function (t, e) {
            var i = /\D{0,2}$/.exec(t), n = parseFloat(t);
            switch (e || (e = fabric.Text.DEFAULT_SVG_FONT_SIZE), i[0]) {
                case"mm":
                    return n * fabric.DPI / 25.4;
                case"cm":
                    return n * fabric.DPI / 2.54;
                case"in":
                    return n * fabric.DPI;
                case"pt":
                    return n * fabric.DPI / 72;
                case"pc":
                    return n * fabric.DPI / 72 * 12;
                case"em":
                    return n * e;
                default:
                    return n
            }
        }, falseFunction: function () {
            return !1
        }, getKlass: function (t, e) {
            return t = fabric.util.string.camelize(t.charAt(0).toUpperCase() + t.slice(1)), fabric.util.resolveNamespace(e)[t]
        }, resolveNamespace: function (e) {
            if (!e)return fabric;
            for (var i = e.split("."), n = i.length, r = t || fabric.window, o = 0; n > o; ++o)r = r[i[o]];
            return r
        }, loadImage: function (t, e, i, n) {
            if (!t)return void(e && e.call(i, t));
            var r = fabric.util.createImage();
            r.onload = function () {
                e && e.call(i, r), r = r.onload = r.onerror = null
            }, r.onerror = function () {
                fabric.log("Error loading " + r.src), e && e.call(i, null, !0), r = r.onload = r.onerror = null
            }, 0 !== t.indexOf("data") && "undefined" != typeof n && (r.crossOrigin = n), r.src = t
        }, enlivenObjects: function (t, e, i, n) {
            function r() {
                ++s === a && e && e(o)
            }

            t = t || [];
            var o = [], s = 0, a = t.length;
            return a ? void t.forEach(function (t, e) {
                if (!t || !t.type)return void r();
                var s = fabric.util.getKlass(t.type, i);
                s.async ? s.fromObject(t, function (i, s) {
                    s || (o[e] = i, n && n(t, o[e])), r()
                }) : (o[e] = s.fromObject(t), n && n(t, o[e]), r())
            }) : void(e && e(o))
        }, groupSVGElements: function (t, e, i) {
            var n;
            return n = new fabric.PathGroup(t, e), "undefined" != typeof i && n.setSourcePath(i), n
        }, populateWithProperties: function (t, e, i) {
            if (i && "[object Array]" === Object.prototype.toString.call(i))for (var n = 0, r = i.length; r > n; n++)i[n] in t && (e[i[n]] = t[i[n]])
        }, drawDashedLine: function (t, n, r, o, s, a) {
            var c = o - n, l = s - r, h = e(c * c + l * l), u = i(l, c), f = a.length, d = 0, g = !0;
            for (t.save(), t.translate(n, r), t.moveTo(0, 0), t.rotate(u), n = 0; h > n;)n += a[d++ % f], n > h && (n = h), t[g ? "lineTo" : "moveTo"](n, 0), g = !g;
            t.restore()
        }, createCanvasElement: function (t) {
            return t || (t = fabric.document.createElement("canvas")), t.getContext || "undefined" == typeof G_vmlCanvasManager || G_vmlCanvasManager.initElement(t), t
        }, createImage: function () {
            return fabric.isLikelyNode ? new (require("canvas").Image) : fabric.document.createElement("img")
        }, createAccessors: function (t) {
            for (var e = t.prototype, i = e.stateProperties.length; i--;) {
                var n = e.stateProperties[i], r = n.charAt(0).toUpperCase() + n.slice(1), o = "set" + r, s = "get" + r;
                e[s] || (e[s] = function (t) {
                    return new Function('return this.get("' + t + '")')
                }(n)), e[o] || (e[o] = function (t) {
                    return new Function("value", 'return this.set("' + t + '", value)')
                }(n))
            }
        }, clipContext: function (t, e) {
            e.save(), e.beginPath(), t.clipTo(e), e.clip()
        }, multiplyTransformMatrices: function (t, e) {
            return [t[0] * e[0] + t[2] * e[1], t[1] * e[0] + t[3] * e[1], t[0] * e[2] + t[2] * e[3], t[1] * e[2] + t[3] * e[3], t[0] * e[4] + t[2] * e[5] + t[4], t[1] * e[4] + t[3] * e[5] + t[5]]
        }, getFunctionBody: function (t) {
            return (String(t).match(/function[^{]*\{([\s\S]*)\}/) || {})[1]
        }, isTransparent: function (t, e, i, n) {
            n > 0 && (e > n ? e -= n : e = 0, i > n ? i -= n : i = 0);
            for (var r = !0, o = t.getImageData(e, i, 2 * n || 1, 2 * n || 1), s = 3, a = o.data.length; a > s; s += 4) {
                var c = o.data[s];
                if (r = 0 >= c, r === !1)break
            }
            return o = null, r
        }
    }
}("undefined" != typeof exports ? exports : this), function () {
    function t(t, n, o, s, c, l, h) {
        var u = a.call(arguments);
        if (r[u])return r[u];
        var f = Math.PI, d = h * f / 180, g = Math.sin(d), p = Math.cos(d), v = 0, m = 0;
        o = Math.abs(o), s = Math.abs(s);
        var y = -p * t * .5 - g * n * .5, b = -p * n * .5 + g * t * .5, _ = o * o, x = s * s, C = b * b, w = y * y, j = _ * x - _ * C - x * w, T = 0;
        if (0 > j) {
            var S = Math.sqrt(1 - j / (_ * x));
            o *= S, s *= S
        } else T = (c === l ? -1 : 1) * Math.sqrt(j / (_ * C + x * w));
        var P = T * o * b / s, O = -T * s * y / o, A = p * P - g * O + .5 * t, E = g * P + p * O + .5 * n, k = i(1, 0, (y - P) / o, (b - O) / s), D = i((y - P) / o, (b - O) / s, (-y - P) / o, (-b - O) / s);
        0 === l && D > 0 ? D -= 2 * f : 1 === l && 0 > D && (D += 2 * f);
        for (var M = Math.ceil(Math.abs(D / f * 2)), L = [], I = D / M, R = 8 / 3 * Math.sin(I / 4) * Math.sin(I / 4) / Math.sin(I / 2), F = k + I, G = 0; M > G; G++)L[G] = e(k, F, p, g, o, s, A, E, R, v, m), v = L[G][4], m = L[G][5], k = F, F += I;
        return r[u] = L, L
    }

    function e(t, e, i, n, r, s, c, l, h, u, f) {
        var d = a.call(arguments);
        if (o[d])return o[d];
        var g = Math.cos(t), p = Math.sin(t), v = Math.cos(e), m = Math.sin(e), y = i * r * v - n * s * m + c, b = n * r * v + i * s * m + l, _ = u + h * (-i * r * p - n * s * g), x = f + h * (-n * r * p + i * s * g), C = y + h * (i * r * m + n * s * v), w = b + h * (n * r * m - i * s * v);
        return o[d] = [_, x, C, w, y, b], o[d]
    }

    function i(t, e, i, n) {
        var r = Math.atan2(e, t), o = Math.atan2(n, i);
        return o >= r ? o - r : 2 * Math.PI - (r - o)
    }

    function n(t, e, i, n, r, o, c, l) {
        var h = a.call(arguments);
        if (s[h])return s[h];
        var u, f, d, g, p, v, m, y, b = Math.sqrt, _ = Math.min, x = Math.max, C = Math.abs, w = [], j = [[], []];
        f = 6 * t - 12 * i + 6 * r, u = -3 * t + 9 * i - 9 * r + 3 * c, d = 3 * i - 3 * t;
        for (var T = 0; 2 > T; ++T)if (T > 0 && (f = 6 * e - 12 * n + 6 * o, u = -3 * e + 9 * n - 9 * o + 3 * l, d = 3 * n - 3 * e), C(u) < 1e-12) {
            if (C(f) < 1e-12)continue;
            g = -d / f, g > 0 && 1 > g && w.push(g)
        } else m = f * f - 4 * d * u, 0 > m || (y = b(m), p = (-f + y) / (2 * u), p > 0 && 1 > p && w.push(p), v = (-f - y) / (2 * u), v > 0 && 1 > v && w.push(v));
        for (var S, P, O, A = w.length, E = A; A--;)g = w[A], O = 1 - g, S = O * O * O * t + 3 * O * O * g * i + 3 * O * g * g * r + g * g * g * c, j[0][A] = S, P = O * O * O * e + 3 * O * O * g * n + 3 * O * g * g * o + g * g * g * l, j[1][A] = P;
        j[0][E] = t, j[1][E] = e, j[0][E + 1] = c, j[1][E + 1] = l;
        var k = [{x: _.apply(null, j[0]), y: _.apply(null, j[1])}, {x: x.apply(null, j[0]), y: x.apply(null, j[1])}];
        return s[h] = k, k
    }

    var r = {}, o = {}, s = {}, a = Array.prototype.join;
    fabric.util.drawArc = function (e, i, n, r) {
        for (var o = r[0], s = r[1], a = r[2], c = r[3], l = r[4], h = r[5], u = r[6], f = [[], [], [], []], d = t(h - i, u - n, o, s, c, l, a), g = 0, p = d.length; p > g; g++)f[g][0] = d[g][0] + i, f[g][1] = d[g][1] + n, f[g][2] = d[g][2] + i, f[g][3] = d[g][3] + n, f[g][4] = d[g][4] + i, f[g][5] = d[g][5] + n, e.bezierCurveTo.apply(e, f[g])
    }, fabric.util.getBoundsOfArc = function (e, i, r, o, s, a, c, l, h) {
        for (var u = 0, f = 0, d = [], g = [], p = t(l - e, h - i, r, o, a, c, s), v = [[], []], m = 0, y = p.length; y > m; m++)d = n(u, f, p[m][0], p[m][1], p[m][2], p[m][3], p[m][4], p[m][5]), v[0].x = d[0].x + e, v[0].y = d[0].y + i, v[1].x = d[1].x + e, v[1].y = d[1].y + i, g.push(v[0]), g.push(v[1]), u = p[m][4], f = p[m][5];
        return g
    }, fabric.util.getBoundsOfCurve = n
}(), function () {
    function t(t, e) {
        for (var i = r.call(arguments, 2), n = [], o = 0, s = t.length; s > o; o++)n[o] = i.length ? t[o][e].apply(t[o], i) : t[o][e].call(t[o]);
        return n
    }

    function e(t, e) {
        return n(t, e, function (t, e) {
            return t >= e
        })
    }

    function i(t, e) {
        return n(t, e, function (t, e) {
            return e > t
        })
    }

    function n(t, e, i) {
        if (t && 0 !== t.length) {
            var n = t.length - 1, r = e ? t[n][e] : t[n];
            if (e)for (; n--;)i(t[n][e], r) && (r = t[n][e]); else for (; n--;)i(t[n], r) && (r = t[n]);
            return r
        }
    }

    var r = Array.prototype.slice;
    Array.prototype.indexOf || (Array.prototype.indexOf = function (t) {
        if (void 0 === this || null === this)throw new TypeError;
        var e = Object(this), i = e.length >>> 0;
        if (0 === i)return -1;
        var n = 0;
        if (arguments.length > 0 && (n = Number(arguments[1]), n !== n ? n = 0 : 0 !== n && n !== Number.POSITIVE_INFINITY && n !== Number.NEGATIVE_INFINITY && (n = (n > 0 || -1) * Math.floor(Math.abs(n)))), n >= i)return -1;
        for (var r = n >= 0 ? n : Math.max(i - Math.abs(n), 0); i > r; r++)if (r in e && e[r] === t)return r;
        return -1
    }), Array.prototype.forEach || (Array.prototype.forEach = function (t, e) {
        for (var i = 0, n = this.length >>> 0; n > i; i++)i in this && t.call(e, this[i], i, this)
    }), Array.prototype.map || (Array.prototype.map = function (t, e) {
        for (var i = [], n = 0, r = this.length >>> 0; r > n; n++)n in this && (i[n] = t.call(e, this[n], n, this));
        return i
    }), Array.prototype.every || (Array.prototype.every = function (t, e) {
        for (var i = 0, n = this.length >>> 0; n > i; i++)if (i in this && !t.call(e, this[i], i, this))return !1;
        return !0
    }), Array.prototype.some || (Array.prototype.some = function (t, e) {
        for (var i = 0, n = this.length >>> 0; n > i; i++)if (i in this && t.call(e, this[i], i, this))return !0;
        return !1
    }), Array.prototype.filter || (Array.prototype.filter = function (t, e) {
        for (var i, n = [], r = 0, o = this.length >>> 0; o > r; r++)r in this && (i = this[r], t.call(e, i, r, this) && n.push(i));
        return n
    }), Array.prototype.reduce || (Array.prototype.reduce = function (t) {
        var e, i = this.length >>> 0, n = 0;
        if (arguments.length > 1)e = arguments[1]; else for (; ;) {
            if (n in this) {
                e = this[n++];
                break
            }
            if (++n >= i)throw new TypeError
        }
        for (; i > n; n++)n in this && (e = t.call(null, e, this[n], n, this));
        return e
    }), fabric.util.array = {invoke: t, min: i, max: e}
}(), function () {
    function t(t, e) {
        for (var i in e)t[i] = e[i];
        return t
    }

    function e(e) {
        return t({}, e)
    }

    fabric.util.object = {extend: t, clone: e}
}(), function () {
    function t(t) {
        return t.replace(/-+(.)?/g, function (t, e) {
            return e ? e.toUpperCase() : ""
        })
    }

    function e(t, e) {
        return t.charAt(0).toUpperCase() + (e ? t.slice(1) : t.slice(1).toLowerCase())
    }

    function i(t) {
        return t.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&apos;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    }

    String.prototype.trim || (String.prototype.trim = function () {
        return this.replace(/^[\s\xA0]+/, "").replace(/[\s\xA0]+$/, "")
    }), fabric.util.string = {camelize: t, capitalize: e, escapeXml: i}
}(), function () {
    var t = Array.prototype.slice, e = Function.prototype.apply, i = function () {
    };
    Function.prototype.bind || (Function.prototype.bind = function (n) {
        var r, o = this, s = t.call(arguments, 1);
        return r = s.length ? function () {
            return e.call(o, this instanceof i ? this : n, s.concat(t.call(arguments)))
        } : function () {
            return e.call(o, this instanceof i ? this : n, arguments)
        }, i.prototype = this.prototype, r.prototype = new i, r
    })
}(), function () {
    function t() {
    }

    function e(t) {
        var e = this.constructor.superclass.prototype[t];
        return arguments.length > 1 ? e.apply(this, n.call(arguments, 1)) : e.call(this)
    }

    function i() {
        function i() {
            this.initialize.apply(this, arguments)
        }

        var o = null, a = n.call(arguments, 0);
        "function" == typeof a[0] && (o = a.shift()), i.superclass = o, i.subclasses = [], o && (t.prototype = o.prototype, i.prototype = new t, o.subclasses.push(i));
        for (var c = 0, l = a.length; l > c; c++)s(i, a[c], o);
        return i.prototype.initialize || (i.prototype.initialize = r), i.prototype.constructor = i, i.prototype.callSuper = e, i
    }

    var n = Array.prototype.slice, r = function () {
    }, o = function () {
        for (var t in{toString: 1})if ("toString" === t)return !1;
        return !0
    }(), s = function (t, e, i) {
        for (var n in e)n in t.prototype && "function" == typeof t.prototype[n] && (e[n] + "").indexOf("callSuper") > -1 ? t.prototype[n] = function (t) {
            return function () {
                var n = this.constructor.superclass;
                this.constructor.superclass = i;
                var r = e[t].apply(this, arguments);
                return this.constructor.superclass = n, "initialize" !== t ? r : void 0
            }
        }(n) : t.prototype[n] = e[n], o && (e.toString !== Object.prototype.toString && (t.prototype.toString = e.toString), e.valueOf !== Object.prototype.valueOf && (t.prototype.valueOf = e.valueOf))
    };
    fabric.util.createClass = i
}(), function () {
    function t(t) {
        var e, i, n = Array.prototype.slice.call(arguments, 1), r = n.length;
        for (i = 0; r > i; i++)if (e = typeof t[n[i]], !/^(?:function|object|unknown)$/.test(e))return !1;
        return !0
    }

    function e(t, e) {
        return {handler: e, wrappedHandler: i(t, e)}
    }

    function i(t, e) {
        return function (i) {
            e.call(s(t), i || fabric.window.event)
        }
    }

    function n(t, e) {
        return function (i) {
            if (p[t] && p[t][e])for (var n = p[t][e], r = 0, o = n.length; o > r; r++)n[r].call(this, i || fabric.window.event)
        }
    }

    function r(t, e) {
        t || (t = fabric.window.event);
        var i = t.target || (typeof t.srcElement !== c ? t.srcElement : null), n = fabric.util.getScrollLeftTop(i, e);
        return {x: v(t) + n.left, y: m(t) + n.top}
    }

    function o(t, e, i) {
        var n = "touchend" === t.type ? "changedTouches" : "touches";
        return t[n] && t[n][0] ? t[n][0][e] - (t[n][0][e] - t[n][0][i]) || t[i] : t[i]
    }

    var s, a, c = "unknown", l = function () {
        var t = 0;
        return function (e) {
            return e.__uniqueID || (e.__uniqueID = "uniqueID__" + t++)
        }
    }();
    !function () {
        var t = {};
        s = function (e) {
            return t[e]
        }, a = function (e, i) {
            t[e] = i
        }
    }();
    var h, u, f = t(fabric.document.documentElement, "addEventListener", "removeEventListener") && t(fabric.window, "addEventListener", "removeEventListener"), d = t(fabric.document.documentElement, "attachEvent", "detachEvent") && t(fabric.window, "attachEvent", "detachEvent"), g = {}, p = {};
    f ? (h = function (t, e, i) {
        t.addEventListener(e, i, !1)
    }, u = function (t, e, i) {
        t.removeEventListener(e, i, !1)
    }) : d ? (h = function (t, i, n) {
        var r = l(t);
        a(r, t), g[r] || (g[r] = {}), g[r][i] || (g[r][i] = []);
        var o = e(r, n);
        g[r][i].push(o), t.attachEvent("on" + i, o.wrappedHandler)
    }, u = function (t, e, i) {
        var n, r = l(t);
        if (g[r] && g[r][e])for (var o = 0, s = g[r][e].length; s > o; o++)n = g[r][e][o], n && n.handler === i && (t.detachEvent("on" + e, n.wrappedHandler), g[r][e][o] = null)
    }) : (h = function (t, e, i) {
        var r = l(t);
        if (p[r] || (p[r] = {}), !p[r][e]) {
            p[r][e] = [];
            var o = t["on" + e];
            o && p[r][e].push(o), t["on" + e] = n(r, e)
        }
        p[r][e].push(i)
    }, u = function (t, e, i) {
        var n = l(t);
        if (p[n] && p[n][e])for (var r = p[n][e], o = 0, s = r.length; s > o; o++)r[o] === i && r.splice(o, 1)
    }), fabric.util.addListener = h, fabric.util.removeListener = u;
    var v = function (t) {
        return typeof t.clientX !== c ? t.clientX : 0
    }, m = function (t) {
        return typeof t.clientY !== c ? t.clientY : 0
    };
    fabric.isTouchSupported && (v = function (t) {
        return o(t, "pageX", "clientX")
    }, m = function (t) {
        return o(t, "pageY", "clientY")
    }), fabric.util.getPointer = r, fabric.util.object.extend(fabric.util, fabric.Observable)
}(), function () {
    function t(t, e) {
        var i = t.style;
        if (!i)return t;
        if ("string" == typeof e)return t.style.cssText += ";" + e, e.indexOf("opacity") > -1 ? o(t, e.match(/opacity:\s*(\d?\.?\d*)/)[1]) : t;
        for (var n in e)if ("opacity" === n)o(t, e[n]); else {
            var r = "float" === n || "cssFloat" === n ? "undefined" == typeof i.styleFloat ? "cssFloat" : "styleFloat" : n;
            i[r] = e[n]
        }
        return t
    }

    var e = fabric.document.createElement("div"), i = "string" == typeof e.style.opacity, n = "string" == typeof e.style.filter, r = /alpha\s*\(\s*opacity\s*=\s*([^\)]+)\)/, o = function (t) {
        return t
    };
    i ? o = function (t, e) {
        return t.style.opacity = e, t
    } : n && (o = function (t, e) {
        var i = t.style;
        return t.currentStyle && !t.currentStyle.hasLayout && (i.zoom = 1), r.test(i.filter) ? (e = e >= .9999 ? "" : "alpha(opacity=" + 100 * e + ")", i.filter = i.filter.replace(r, e)) : i.filter += " alpha(opacity=" + 100 * e + ")", t
    }), fabric.util.setStyle = t
}(), function () {
    function t(t) {
        return "string" == typeof t ? fabric.document.getElementById(t) : t
    }

    function e(t, e) {
        var i = fabric.document.createElement(t);
        for (var n in e)"class" === n ? i.className = e[n] : "for" === n ? i.htmlFor = e[n] : i.setAttribute(n, e[n]);
        return i
    }

    function i(t, e) {
        t && -1 === (" " + t.className + " ").indexOf(" " + e + " ") && (t.className += (t.className ? " " : "") + e)
    }

    function n(t, i, n) {
        return "string" == typeof i && (i = e(i, n)), t.parentNode && t.parentNode.replaceChild(i, t), i.appendChild(t), i
    }

    function r(t, e) {
        var i, n, r = 0, o = 0, s = fabric.document.documentElement, a = fabric.document.body || {
                scrollLeft: 0,
                scrollTop: 0
            };
        for (n = t; t && t.parentNode && !i;)t = t.parentNode, 1 === t.nodeType && "fixed" === fabric.util.getElementStyle(t, "position") && (i = t), 1 === t.nodeType && n !== e && "absolute" === fabric.util.getElementStyle(t, "position") ? (r = 0, o = 0) : t === fabric.document ? (r = a.scrollLeft || s.scrollLeft || 0, o = a.scrollTop || s.scrollTop || 0) : (r += t.scrollLeft || 0, o += t.scrollTop || 0);
        return {left: r, top: o}
    }

    function o(t) {
        var e, i, n = t && t.ownerDocument, r = {left: 0, top: 0}, o = {left: 0, top: 0}, s = {
            borderLeftWidth: "left",
            borderTopWidth: "top",
            paddingLeft: "left",
            paddingTop: "top"
        };
        if (!n)return {left: 0, top: 0};
        for (var a in s)o[s[a]] += parseInt(h(t, a), 10) || 0;
        return e = n.documentElement, "undefined" != typeof t.getBoundingClientRect && (r = t.getBoundingClientRect()), i = fabric.util.getScrollLeftTop(t, null), {
            left: r.left + i.left - (e.clientLeft || 0) + o.left,
            top: r.top + i.top - (e.clientTop || 0) + o.top
        }
    }

    var s, a = Array.prototype.slice, c = function (t) {
        return a.call(t, 0)
    };
    try {
        s = c(fabric.document.childNodes) instanceof Array
    } catch (l) {
    }
    s || (c = function (t) {
        for (var e = new Array(t.length), i = t.length; i--;)e[i] = t[i];
        return e
    });
    var h;
    h = fabric.document.defaultView && fabric.document.defaultView.getComputedStyle ? function (t, e) {
        var i = fabric.document.defaultView.getComputedStyle(t, null);
        return i ? i[e] : void 0
    } : function (t, e) {
        var i = t.style[e];
        return !i && t.currentStyle && (i = t.currentStyle[e]), i
    }, function () {
        function t(t) {
            return "undefined" != typeof t.onselectstart && (t.onselectstart = fabric.util.falseFunction), n ? t.style[n] = "none" : "string" == typeof t.unselectable && (t.unselectable = "on"), t
        }

        function e(t) {
            return "undefined" != typeof t.onselectstart && (t.onselectstart = null), n ? t.style[n] = "" : "string" == typeof t.unselectable && (t.unselectable = ""), t
        }

        var i = fabric.document.documentElement.style, n = "userSelect" in i ? "userSelect" : "MozUserSelect" in i ? "MozUserSelect" : "WebkitUserSelect" in i ? "WebkitUserSelect" : "KhtmlUserSelect" in i ? "KhtmlUserSelect" : "";
        fabric.util.makeElementUnselectable = t, fabric.util.makeElementSelectable = e
    }(), function () {
        function t(t, e) {
            var i = fabric.document.getElementsByTagName("head")[0], n = fabric.document.createElement("script"), r = !0;
            n.onload = n.onreadystatechange = function (t) {
                if (r) {
                    if ("string" == typeof this.readyState && "loaded" !== this.readyState && "complete" !== this.readyState)return;
                    r = !1, e(t || fabric.window.event), n = n.onload = n.onreadystatechange = null
                }
            }, n.src = t, i.appendChild(n)
        }

        fabric.util.getScript = t
    }(), fabric.util.getById = t, fabric.util.toArray = c, fabric.util.makeElement = e, fabric.util.addClass = i, fabric.util.wrapElement = n, fabric.util.getScrollLeftTop = r, fabric.util.getElementOffset = o, fabric.util.getElementStyle = h
}(), function () {
    function t(t, e) {
        return t + (/\?/.test(t) ? "&" : "?") + e
    }

    function e() {
    }

    function i(i, r) {
        r || (r = {});
        var o, s = r.method ? r.method.toUpperCase() : "GET", a = r.onComplete || function () {
            }, c = n();
        return c.onreadystatechange = function () {
            4 === c.readyState && (a(c), c.onreadystatechange = e)
        }, "GET" === s && (o = null, "string" == typeof r.parameters && (i = t(i, r.parameters))), c.open(s, i, !0), ("POST" === s || "PUT" === s) && c.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), c.send(o), c
    }

    var n = function () {
        for (var t = [function () {
            return new ActiveXObject("Microsoft.XMLHTTP")
        }, function () {
            return new ActiveXObject("Msxml2.XMLHTTP")
        }, function () {
            return new ActiveXObject("Msxml2.XMLHTTP.3.0")
        }, function () {
            return new XMLHttpRequest
        }], e = t.length; e--;)try {
            var i = t[e]();
            if (i)return t[e]
        } catch (n) {
        }
    }();
    fabric.util.request = i
}(), fabric.log = function () {
}, fabric.warn = function () {
}, "undefined" != typeof console && ["log", "warn"].forEach(function (t) {
    "undefined" != typeof console[t] && "function" == typeof console[t].apply && (fabric[t] = function () {
        return console[t].apply(console, arguments)
    })
}), function (t) {
    "use strict";
    function e(t, e) {
        this.x = t, this.y = e
    }

    var i = t.fabric || (t.fabric = {});
    return i.Point ? void i.warn("fabric.Point is already defined") : (i.Point = e, void(e.prototype = {
        constructor: e, add: function (t) {
            return new e(this.x + t.x, this.y + t.y)
        }, addEquals: function (t) {
            return this.x += t.x, this.y += t.y, this
        }, scalarAdd: function (t) {
            return new e(this.x + t, this.y + t)
        }, scalarAddEquals: function (t) {
            return this.x += t, this.y += t, this
        }, subtract: function (t) {
            return new e(this.x - t.x, this.y - t.y)
        }, subtractEquals: function (t) {
            return this.x -= t.x, this.y -= t.y, this
        }, scalarSubtract: function (t) {
            return new e(this.x - t, this.y - t)
        }, scalarSubtractEquals: function (t) {
            return this.x -= t, this.y -= t, this
        }, multiply: function (t) {
            return new e(this.x * t, this.y * t)
        }, multiplyEquals: function (t) {
            return this.x *= t, this.y *= t, this
        }, divide: function (t) {
            return new e(this.x / t, this.y / t)
        }, divideEquals: function (t) {
            return this.x /= t, this.y /= t, this
        }, eq: function (t) {
            return this.x === t.x && this.y === t.y
        }, lt: function (t) {
            return this.x < t.x && this.y < t.y
        }, lte: function (t) {
            return this.x <= t.x && this.y <= t.y
        }, gt: function (t) {
            return this.x > t.x && this.y > t.y
        }, gte: function (t) {
            return this.x >= t.x && this.y >= t.y
        }, lerp: function (t, i) {
            return new e(this.x + (t.x - this.x) * i, this.y + (t.y - this.y) * i)
        }, distanceFrom: function (t) {
            var e = this.x - t.x, i = this.y - t.y;
            return Math.sqrt(e * e + i * i)
        }, midPointFrom: function (t) {
            return new e(this.x + (t.x - this.x) / 2, this.y + (t.y - this.y) / 2)
        }, min: function (t) {
            return new e(Math.min(this.x, t.x), Math.min(this.y, t.y))
        }, max: function (t) {
            return new e(Math.max(this.x, t.x), Math.max(this.y, t.y))
        }, toString: function () {
            return this.x + "," + this.y
        }, setXY: function (t, e) {
            this.x = t, this.y = e
        }, setFromPoint: function (t) {
            this.x = t.x, this.y = t.y
        }, swap: function (t) {
            var e = this.x, i = this.y;
            this.x = t.x, this.y = t.y, t.x = e, t.y = i
        }
    }))
}("undefined" != typeof exports ? exports : this), function (t) {
    "use strict";
    function e(t) {
        this.status = t, this.points = []
    }

    var i = t.fabric || (t.fabric = {});
    return i.Intersection ? void i.warn("fabric.Intersection is already defined") : (i.Intersection = e, i.Intersection.prototype = {
        appendPoint: function (t) {
            this.points.push(t)
        }, appendPoints: function (t) {
            this.points = this.points.concat(t)
        }
    }, i.Intersection.intersectLineLine = function (t, n, r, o) {
        var s, a = (o.x - r.x) * (t.y - r.y) - (o.y - r.y) * (t.x - r.x), c = (n.x - t.x) * (t.y - r.y) - (n.y - t.y) * (t.x - r.x), l = (o.y - r.y) * (n.x - t.x) - (o.x - r.x) * (n.y - t.y);
        if (0 !== l) {
            var h = a / l, u = c / l;
            h >= 0 && 1 >= h && u >= 0 && 1 >= u ? (s = new e("Intersection"), s.points.push(new i.Point(t.x + h * (n.x - t.x), t.y + h * (n.y - t.y)))) : s = new e
        } else s = new e(0 === a || 0 === c ? "Coincident" : "Parallel");
        return s
    }, i.Intersection.intersectLinePolygon = function (t, i, n) {
        for (var r = new e, o = n.length, s = 0; o > s; s++) {
            var a = n[s], c = n[(s + 1) % o], l = e.intersectLineLine(t, i, a, c);
            r.appendPoints(l.points)
        }
        return r.points.length > 0 && (r.status = "Intersection"), r
    }, i.Intersection.intersectPolygonPolygon = function (t, i) {
        for (var n = new e, r = t.length, o = 0; r > o; o++) {
            var s = t[o], a = t[(o + 1) % r], c = e.intersectLinePolygon(s, a, i);
            n.appendPoints(c.points)
        }
        return n.points.length > 0 && (n.status = "Intersection"), n
    }, void(i.Intersection.intersectPolygonRectangle = function (t, n, r) {
        var o = n.min(r), s = n.max(r), a = new i.Point(s.x, o.y), c = new i.Point(o.x, s.y), l = e.intersectLinePolygon(o, a, t), h = e.intersectLinePolygon(a, s, t), u = e.intersectLinePolygon(s, c, t), f = e.intersectLinePolygon(c, o, t), d = new e;
        return d.appendPoints(l.points), d.appendPoints(h.points), d.appendPoints(u.points), d.appendPoints(f.points), d.points.length > 0 && (d.status = "Intersection"), d
    }))
}("undefined" != typeof exports ? exports : this), function (t) {
    "use strict";
    function e(t) {
        t ? this._tryParsingColor(t) : this.setSource([0, 0, 0, 1])
    }

    function i(t, e, i) {
        return 0 > i && (i += 1), i > 1 && (i -= 1), 1 / 6 > i ? t + 6 * (e - t) * i : .5 > i ? e : 2 / 3 > i ? t + (e - t) * (2 / 3 - i) * 6 : t
    }

    var n = t.fabric || (t.fabric = {});
    return n.Color ? void n.warn("fabric.Color is already defined.") : (n.Color = e, n.Color.prototype = {
        _tryParsingColor: function (t) {
            var i;
            return t in e.colorNameMap && (t = e.colorNameMap[t]), "transparent" === t ? void this.setSource([255, 255, 255, 0]) : (i = e.sourceFromHex(t), i || (i = e.sourceFromRgb(t)), i || (i = e.sourceFromHsl(t)), void(i && this.setSource(i)))
        }, _rgbToHsl: function (t, e, i) {
            t /= 255, e /= 255, i /= 255;
            var r, o, s, a = n.util.array.max([t, e, i]), c = n.util.array.min([t, e, i]);
            if (s = (a + c) / 2, a === c)r = o = 0; else {
                var l = a - c;
                switch (o = s > .5 ? l / (2 - a - c) : l / (a + c), a) {
                    case t:
                        r = (e - i) / l + (i > e ? 6 : 0);
                        break;
                    case e:
                        r = (i - t) / l + 2;
                        break;
                    case i:
                        r = (t - e) / l + 4
                }
                r /= 6
            }
            return [Math.round(360 * r), Math.round(100 * o), Math.round(100 * s)]
        }, getSource: function () {
            return this._source
        }, setSource: function (t) {
            this._source = t
        }, toRgb: function () {
            var t = this.getSource();
            return "rgb(" + t[0] + "," + t[1] + "," + t[2] + ")"
        }, toRgba: function () {
            var t = this.getSource();
            return "rgba(" + t[0] + "," + t[1] + "," + t[2] + "," + t[3] + ")"
        }, toHsl: function () {
            var t = this.getSource(), e = this._rgbToHsl(t[0], t[1], t[2]);
            return "hsl(" + e[0] + "," + e[1] + "%," + e[2] + "%)"
        }, toHsla: function () {
            var t = this.getSource(), e = this._rgbToHsl(t[0], t[1], t[2]);
            return "hsla(" + e[0] + "," + e[1] + "%," + e[2] + "%," + t[3] + ")"
        }, toHex: function () {
            var t, e, i, n = this.getSource();
            return t = n[0].toString(16), t = 1 === t.length ? "0" + t : t, e = n[1].toString(16), e = 1 === e.length ? "0" + e : e, i = n[2].toString(16), i = 1 === i.length ? "0" + i : i, t.toUpperCase() + e.toUpperCase() + i.toUpperCase()
        }, getAlpha: function () {
            return this.getSource()[3]
        }, setAlpha: function (t) {
            var e = this.getSource();
            return e[3] = t, this.setSource(e), this
        }, toGrayscale: function () {
            var t = this.getSource(), e = parseInt((.3 * t[0] + .59 * t[1] + .11 * t[2]).toFixed(0), 10), i = t[3];
            return this.setSource([e, e, e, i]), this
        }, toBlackWhite: function (t) {
            var e = this.getSource(), i = (.3 * e[0] + .59 * e[1] + .11 * e[2]).toFixed(0), n = e[3];
            return t = t || 127, i = Number(i) < Number(t) ? 0 : 255, this.setSource([i, i, i, n]), this
        }, overlayWith: function (t) {
            t instanceof e || (t = new e(t));
            for (var i = [], n = this.getAlpha(), r = .5, o = this.getSource(), s = t.getSource(), a = 0; 3 > a; a++)i.push(Math.round(o[a] * (1 - r) + s[a] * r));
            return i[3] = n, this.setSource(i), this
        }
    }, n.Color.reRGBa = /^rgba?\(\s*(\d{1,3}(?:\.\d+)?\%?)\s*,\s*(\d{1,3}(?:\.\d+)?\%?)\s*,\s*(\d{1,3}(?:\.\d+)?\%?)\s*(?:\s*,\s*(\d+(?:\.\d+)?)\s*)?\)$/, n.Color.reHSLa = /^hsla?\(\s*(\d{1,3})\s*,\s*(\d{1,3}\%)\s*,\s*(\d{1,3}\%)\s*(?:\s*,\s*(\d+(?:\.\d+)?)\s*)?\)$/, n.Color.reHex = /^#?([0-9a-f]{6}|[0-9a-f]{3})$/i, n.Color.colorNameMap = {
        aqua: "#00FFFF",
        black: "#000000",
        blue: "#0000FF",
        fuchsia: "#FF00FF",
        gray: "#808080",
        green: "#008000",
        lime: "#00FF00",
        maroon: "#800000",
        navy: "#000080",
        olive: "#808000",
        orange: "#FFA500",
        purple: "#800080",
        red: "#FF0000",
        silver: "#C0C0C0",
        teal: "#008080",
        white: "#FFFFFF",
        yellow: "#FFFF00"
    }, n.Color.fromRgb = function (t) {
        return e.fromSource(e.sourceFromRgb(t))
    }, n.Color.sourceFromRgb = function (t) {
        var i = t.match(e.reRGBa);
        if (i) {
            var n = parseInt(i[1], 10) / (/%$/.test(i[1]) ? 100 : 1) * (/%$/.test(i[1]) ? 255 : 1), r = parseInt(i[2], 10) / (/%$/.test(i[2]) ? 100 : 1) * (/%$/.test(i[2]) ? 255 : 1), o = parseInt(i[3], 10) / (/%$/.test(i[3]) ? 100 : 1) * (/%$/.test(i[3]) ? 255 : 1);
            return [parseInt(n, 10), parseInt(r, 10), parseInt(o, 10), i[4] ? parseFloat(i[4]) : 1]
        }
    }, n.Color.fromRgba = e.fromRgb, n.Color.fromHsl = function (t) {
        return e.fromSource(e.sourceFromHsl(t))
    }, n.Color.sourceFromHsl = function (t) {
        var n = t.match(e.reHSLa);
        if (n) {
            var r, o, s, a = (parseFloat(n[1]) % 360 + 360) % 360 / 360, c = parseFloat(n[2]) / (/%$/.test(n[2]) ? 100 : 1), l = parseFloat(n[3]) / (/%$/.test(n[3]) ? 100 : 1);
            if (0 === c)r = o = s = l; else {
                var h = .5 >= l ? l * (c + 1) : l + c - l * c, u = 2 * l - h;
                r = i(u, h, a + 1 / 3), o = i(u, h, a), s = i(u, h, a - 1 / 3)
            }
            return [Math.round(255 * r), Math.round(255 * o), Math.round(255 * s), n[4] ? parseFloat(n[4]) : 1]
        }
    }, n.Color.fromHsla = e.fromHsl, n.Color.fromHex = function (t) {
        return e.fromSource(e.sourceFromHex(t))
    }, n.Color.sourceFromHex = function (t) {
        if (t.match(e.reHex)) {
            var i = t.slice(t.indexOf("#") + 1), n = 3 === i.length, r = n ? i.charAt(0) + i.charAt(0) : i.substring(0, 2), o = n ? i.charAt(1) + i.charAt(1) : i.substring(2, 4), s = n ? i.charAt(2) + i.charAt(2) : i.substring(4, 6);
            return [parseInt(r, 16), parseInt(o, 16), parseInt(s, 16), 1]
        }
    }, void(n.Color.fromSource = function (t) {
        var i = new e;
        return i.setSource(t), i
    }))
}("undefined" != typeof exports ? exports : this), function () {
    "use strict";
    if (fabric.StaticCanvas)return void fabric.warn("fabric.StaticCanvas is already defined.");
    var t = fabric.util.object.extend, e = fabric.util.getElementOffset, i = fabric.util.removeFromArray, n = new Error("Could not initialize `canvas` element");
    fabric.StaticCanvas = fabric.util.createClass({
        initialize: function (t, e) {
            e || (e = {}), this._initStatic(t, e), fabric.StaticCanvas.activeInstance = this
        },
        backgroundColor: "",
        backgroundImage: null,
        overlayColor: "",
        overlayImage: null,
        includeDefaultValues: !0,
        stateful: !0,
        renderOnAddRemove: !0,
        clipTo: null,
        controlsAboveOverlay: !1,
        allowTouchScrolling: !1,
        imageSmoothingEnabled: !0,
        preserveObjectStacking: !1,
        viewportTransform: [1, 0, 0, 1, 0, 0],
        onBeforeScaleRotate: function () {
        },
        _initStatic: function (t, e) {
            this._objects = [], this._createLowerCanvas(t), this._initOptions(e), this._setImageSmoothing(), e.overlayImage && this.setOverlayImage(e.overlayImage, this.renderAll.bind(this)), e.backgroundImage && this.setBackgroundImage(e.backgroundImage, this.renderAll.bind(this)), e.backgroundColor && this.setBackgroundColor(e.backgroundColor, this.renderAll.bind(this)), e.overlayColor && this.setOverlayColor(e.overlayColor, this.renderAll.bind(this)), this.calcOffset()
        },
        calcOffset: function () {
            return this._offset = e(this.lowerCanvasEl), this
        },
        setOverlayImage: function (t, e, i) {
            return this.__setBgOverlayImage("overlayImage", t, e, i)
        },
        setBackgroundImage: function (t, e, i) {
            return this.__setBgOverlayImage("backgroundImage", t, e, i)
        },
        setOverlayColor: function (t, e) {
            return this.__setBgOverlayColor("overlayColor", t, e)
        },
        setBackgroundColor: function (t, e) {
            return this.__setBgOverlayColor("backgroundColor", t, e)
        },
        _setImageSmoothing: function () {
            var t = this.getContext();
            t.imageSmoothingEnabled = this.imageSmoothingEnabled, t.webkitImageSmoothingEnabled = this.imageSmoothingEnabled, t.mozImageSmoothingEnabled = this.imageSmoothingEnabled, t.msImageSmoothingEnabled = this.imageSmoothingEnabled, t.oImageSmoothingEnabled = this.imageSmoothingEnabled
        },
        __setBgOverlayImage: function (t, e, i, n) {
            return "string" == typeof e ? fabric.util.loadImage(e, function (e) {
                this[t] = new fabric.Image(e, n), i && i()
            }, this, n && n.crossOrigin) : (n && e.setOptions(n), this[t] = e, i && i()), this
        },
        __setBgOverlayColor: function (t, e, i) {
            if (e && e.source) {
                var n = this;
                fabric.util.loadImage(e.source, function (r) {
                    n[t] = new fabric.Pattern({
                        source: r,
                        repeat: e.repeat,
                        offsetX: e.offsetX,
                        offsetY: e.offsetY
                    }), i && i()
                })
            } else this[t] = e, i && i();
            return this
        },
        _createCanvasElement: function () {
            var t = fabric.document.createElement("canvas");
            if (t.style || (t.style = {}), !t)throw n;
            return this._initCanvasElement(t), t
        },
        _initCanvasElement: function (t) {
            if (fabric.util.createCanvasElement(t), "undefined" == typeof t.getContext)throw n
        },
        _initOptions: function (t) {
            for (var e in t)this[e] = t[e];
            this.width = this.width || parseInt(this.lowerCanvasEl.width, 10) || 0, this.height = this.height || parseInt(this.lowerCanvasEl.height, 10) || 0, this.lowerCanvasEl.style && (this.lowerCanvasEl.width = this.width, this.lowerCanvasEl.height = this.height, this.lowerCanvasEl.style.width = this.width + "px", this.lowerCanvasEl.style.height = this.height + "px", this.viewportTransform = this.viewportTransform.slice())
        },
        _createLowerCanvas: function (t) {
            this.lowerCanvasEl = fabric.util.getById(t) || this._createCanvasElement(), this._initCanvasElement(this.lowerCanvasEl), fabric.util.addClass(this.lowerCanvasEl, "lower-canvas"), this.interactive && this._applyCanvasStyle(this.lowerCanvasEl), this.contextContainer = this.lowerCanvasEl.getContext("2d")
        },
        getWidth: function () {
            return this.width
        },
        getHeight: function () {
            return this.height
        },
        setWidth: function (t, e) {
            return this.setDimensions({width: t}, e)
        },
        setHeight: function (t, e) {
            return this.setDimensions({height: t}, e)
        },
        setDimensions: function (t, e) {
            var i;
            e = e || {};
            for (var n in t)i = t[n], e.cssOnly || (this._setBackstoreDimension(n, t[n]), i += "px"), e.backstoreOnly || this._setCssDimension(n, i);
            return e.cssOnly || this.renderAll(), this.calcOffset(), this
        },
        _setBackstoreDimension: function (t, e) {
            return this.lowerCanvasEl[t] = e, this.upperCanvasEl && (this.upperCanvasEl[t] = e), this.cacheCanvasEl && (this.cacheCanvasEl[t] = e), this[t] = e, this
        },
        _setCssDimension: function (t, e) {
            return this.lowerCanvasEl.style[t] = e, this.upperCanvasEl && (this.upperCanvasEl.style[t] = e), this.wrapperEl && (this.wrapperEl.style[t] = e), this
        },
        getZoom: function () {
            return Math.sqrt(this.viewportTransform[0] * this.viewportTransform[3])
        },
        setViewportTransform: function (t) {
            var e = this.getActiveGroup();
            this.viewportTransform = t, this.renderAll();
            for (var i = 0, n = this._objects.length; n > i; i++)this._objects[i].setCoords();
            return e && e.setCoords(), this
        },
        zoomToPoint: function (t, e) {
            var i = t;
            t = fabric.util.transformPoint(t, fabric.util.invertTransform(this.viewportTransform)), this.viewportTransform[0] = e, this.viewportTransform[3] = e;
            var n = fabric.util.transformPoint(t, this.viewportTransform);
            this.viewportTransform[4] += i.x - n.x, this.viewportTransform[5] += i.y - n.y, this.renderAll();
            for (var r = 0, o = this._objects.length; o > r; r++)this._objects[r].setCoords();
            return this
        },
        setZoom: function (t) {
            return this.zoomToPoint(new fabric.Point(0, 0), t), this
        },
        absolutePan: function (t) {
            this.viewportTransform[4] = -t.x, this.viewportTransform[5] = -t.y, this.renderAll();
            for (var e = 0, i = this._objects.length; i > e; e++)this._objects[e].setCoords();
            return this
        },
        relativePan: function (t) {
            return this.absolutePan(new fabric.Point(-t.x - this.viewportTransform[4], -t.y - this.viewportTransform[5]))
        },
        getElement: function () {
            return this.lowerCanvasEl
        },
        getActiveObject: function () {
            return null
        },
        getActiveGroup: function () {
            return null
        },
        _draw: function (t, e) {
            if (e) {
                t.save();
                var i = this.viewportTransform;
                t.transform(i[0], i[1], i[2], i[3], i[4], i[5]), this._shouldRenderObject(e) && e.render(t), t.restore(), this.controlsAboveOverlay || e._renderControls(t)
            }
        },
        _shouldRenderObject: function (t) {
            return t ? t !== this.getActiveGroup() || !this.preserveObjectStacking : !1
        },
        _onObjectAdded: function (t) {
            this.stateful && t.setupState(), t.canvas = this, t.setCoords(), this.fire("object:added", {target: t}), t.fire("added")
        },
        _onObjectRemoved: function (t) {
            this.getActiveObject() === t && (this.fire("before:selection:cleared", {target: t}), this._discardActiveObject(), this.fire("selection:cleared")), this.fire("object:removed", {target: t}), t.fire("removed")
        },
        clearContext: function (t) {
            return t.clearRect(0, 0, this.width, this.height), this
        },
        getContext: function () {
            return this.contextContainer
        },
        clear: function () {
            return this._objects.length = 0, this.discardActiveGroup && this.discardActiveGroup(), this.discardActiveObject && this.discardActiveObject(), this.clearContext(this.contextContainer), this.contextTop && this.clearContext(this.contextTop), this.fire("canvas:cleared"), this.renderAll(), this
        },
        renderAll: function (t) {
            var e = this[t === !0 && this.interactive ? "contextTop" : "contextContainer"], i = this.getActiveGroup();
            return this.contextTop && this.selection && !this._groupSelector && this.clearContext(this.contextTop), t || this.clearContext(e), this.fire("before:render"), this.clipTo && fabric.util.clipContext(this, e), this._renderBackground(e), this._renderObjects(e, i), this._renderActiveGroup(e, i), this.clipTo && e.restore(), this._renderOverlay(e), this.controlsAboveOverlay && this.interactive && this.drawControls(e), this.fire("after:render"), this
        },
        _renderObjects: function (t, e) {
            var i, n;
            if (!e || this.preserveObjectStacking)for (i = 0, n = this._objects.length; n > i; ++i)this._draw(t, this._objects[i]); else for (i = 0, n = this._objects.length; n > i; ++i)this._objects[i] && !e.contains(this._objects[i]) && this._draw(t, this._objects[i])
        },
        _renderActiveGroup: function (t, e) {
            if (e) {
                var i = [];
                this.forEachObject(function (t) {
                    e.contains(t) && i.push(t)
                }), e._set("objects", i), this._draw(t, e)
            }
        },
        _renderBackground: function (t) {
            this.backgroundColor && (t.fillStyle = this.backgroundColor.toLive ? this.backgroundColor.toLive(t) : this.backgroundColor, t.fillRect(this.backgroundColor.offsetX || 0, this.backgroundColor.offsetY || 0, this.width, this.height)), this.backgroundImage && this._draw(t, this.backgroundImage)
        },
        _renderOverlay: function (t) {
            this.overlayColor && (t.fillStyle = this.overlayColor.toLive ? this.overlayColor.toLive(t) : this.overlayColor, t.fillRect(this.overlayColor.offsetX || 0, this.overlayColor.offsetY || 0, this.width, this.height)), this.overlayImage && this._draw(t, this.overlayImage)
        },
        renderTop: function () {
            var t = this.contextTop || this.contextContainer;
            this.clearContext(t), this.selection && this._groupSelector && this._drawSelection();
            var e = this.getActiveGroup();
            return e && e.render(t), this._renderOverlay(t), this.fire("after:render"), this
        },
        getCenter: function () {
            return {top: this.getHeight() / 2, left: this.getWidth() / 2}
        },
        centerObjectH: function (t) {
            return this._centerObject(t, new fabric.Point(this.getCenter().left, t.getCenterPoint().y)), this.renderAll(), this
        },
        centerObjectV: function (t) {
            return this._centerObject(t, new fabric.Point(t.getCenterPoint().x, this.getCenter().top)), this.renderAll(), this
        },
        centerObject: function (t) {
            var e = this.getCenter();
            return this._centerObject(t, new fabric.Point(e.left, e.top)), this.renderAll(), this
        },
        _centerObject: function (t, e) {
            return t.setPositionByOrigin(e, "center", "center"), this
        },
        toDatalessJSON: function (t) {
            return this.toDatalessObject(t)
        },
        toObject: function (t) {
            return this._toObjectMethod("toObject", t)
        },
        toDatalessObject: function (t) {
            return this._toObjectMethod("toDatalessObject", t)
        },
        _toObjectMethod: function (e, i) {
            var n = {objects: this._toObjects(e, i)};
            return t(n, this.__serializeBgOverlay()), fabric.util.populateWithProperties(this, n, i), n
        },
        _toObjects: function (t, e) {
            return this.getObjects().map(function (i) {
                return this._toObject(i, t, e)
            }, this)
        },
        _toObject: function (t, e, i) {
            var n;
            this.includeDefaultValues || (n = t.includeDefaultValues, t.includeDefaultValues = !1);
            var r = this._realizeGroupTransformOnObject(t), o = t[e](i);
            return this.includeDefaultValues || (t.includeDefaultValues = n), this._unwindGroupTransformOnObject(t, r), o
        },
        _realizeGroupTransformOnObject: function (t) {
            var e = ["angle", "flipX", "flipY", "height", "left", "scaleX", "scaleY", "top", "width"];
            if (t.group && t.group === this.getActiveGroup()) {
                var i = {};
                return e.forEach(function (e) {
                    i[e] = t[e]
                }), this.getActiveGroup().realizeTransform(t), i
            }
            return null
        },
        _unwindGroupTransformOnObject: function (t, e) {
            e && t.set(e)
        },
        __serializeBgOverlay: function () {
            var t = {background: this.backgroundColor && this.backgroundColor.toObject ? this.backgroundColor.toObject() : this.backgroundColor};
            return this.overlayColor && (t.overlay = this.overlayColor.toObject ? this.overlayColor.toObject() : this.overlayColor), this.backgroundImage && (t.backgroundImage = this.backgroundImage.toObject()), this.overlayImage && (t.overlayImage = this.overlayImage.toObject()), t
        },
        svgViewportTransformation: !0,
        toSVG: function (t, e) {
            t || (t = {});
            var i = [];
            return this._setSVGPreamble(i, t), this._setSVGHeader(i, t), this._setSVGBgOverlayColor(i, "backgroundColor"), this._setSVGBgOverlayImage(i, "backgroundImage"), this._setSVGObjects(i, e), this._setSVGBgOverlayColor(i, "overlayColor"), this._setSVGBgOverlayImage(i, "overlayImage"), i.push("</svg>"), i.join("")
        },
        _setSVGPreamble: function (t, e) {
            e.suppressPreamble || t.push('<?xml version="1.0" encoding="', e.encoding || "UTF-8", '" standalone="no" ?>', '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" ', '"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">\n')
        },
        _setSVGHeader: function (t, e) {
            var i, n, r;
            e.viewBox ? (i = e.viewBox.width, n = e.viewBox.height) : (i = this.width, n = this.height, this.svgViewportTransformation || (r = this.viewportTransform, i /= r[0], n /= r[3])), t.push("<svg ", 'xmlns="http://www.w3.org/2000/svg" ', 'xmlns:xlink="http://www.w3.org/1999/xlink" ', 'version="1.1" ', 'width="', i, '" ', 'height="', n, '" ', this.backgroundColor && !this.backgroundColor.toLive ? 'style="background-color: ' + this.backgroundColor + '" ' : null, e.viewBox ? 'viewBox="' + e.viewBox.x + " " + e.viewBox.y + " " + e.viewBox.width + " " + e.viewBox.height + '" ' : null, 'xml:space="preserve">', "<desc>Created with Fabric.js ", fabric.version, "</desc>", "<defs>", fabric.createSVGFontFacesMarkup(this.getObjects()), fabric.createSVGRefElementsMarkup(this), "</defs>")
        },
        _setSVGObjects: function (t, e) {
            for (var i = 0, n = this.getObjects(), r = n.length; r > i; i++) {
                var o = n[i], s = this._realizeGroupTransformOnObject(o);
                t.push(o.toSVG(e)), this._unwindGroupTransformOnObject(o, s)
            }
        },
        _setSVGBgOverlayImage: function (t, e) {
            this[e] && this[e].toSVG && t.push(this[e].toSVG())
        },
        _setSVGBgOverlayColor: function (t, e) {
            this[e] && this[e].source ? t.push('<rect x="', this[e].offsetX, '" y="', this[e].offsetY, '" ', 'width="', "repeat-y" === this[e].repeat || "no-repeat" === this[e].repeat ? this[e].source.width : this.width, '" height="', "repeat-x" === this[e].repeat || "no-repeat" === this[e].repeat ? this[e].source.height : this.height, '" fill="url(#' + e + 'Pattern)"', "></rect>") : this[e] && "overlayColor" === e && t.push('<rect x="0" y="0" ', 'width="', this.width, '" height="', this.height, '" fill="', this[e], '"', "></rect>")
        },
        sendToBack: function (t) {
            return i(this._objects, t), this._objects.unshift(t), this.renderAll && this.renderAll()
        },
        bringToFront: function (t) {
            return i(this._objects, t), this._objects.push(t), this.renderAll && this.renderAll()
        },
        sendBackwards: function (t, e) {
            var n = this._objects.indexOf(t);
            if (0 !== n) {
                var r = this._findNewLowerIndex(t, n, e);
                i(this._objects, t), this._objects.splice(r, 0, t), this.renderAll && this.renderAll()
            }
            return this
        },
        _findNewLowerIndex: function (t, e, i) {
            var n;
            if (i) {
                n = e;
                for (var r = e - 1; r >= 0; --r) {
                    var o = t.intersectsWithObject(this._objects[r]) || t.isContainedWithinObject(this._objects[r]) || this._objects[r].isContainedWithinObject(t);
                    if (o) {
                        n = r;
                        break
                    }
                }
            } else n = e - 1;
            return n
        },
        bringForward: function (t, e) {
            var n = this._objects.indexOf(t);
            if (n !== this._objects.length - 1) {
                var r = this._findNewUpperIndex(t, n, e);
                i(this._objects, t), this._objects.splice(r, 0, t), this.renderAll && this.renderAll()
            }
            return this
        },
        _findNewUpperIndex: function (t, e, i) {
            var n;
            if (i) {
                n = e;
                for (var r = e + 1; r < this._objects.length; ++r) {
                    var o = t.intersectsWithObject(this._objects[r]) || t.isContainedWithinObject(this._objects[r]) || this._objects[r].isContainedWithinObject(t);
                    if (o) {
                        n = r;
                        break
                    }
                }
            } else n = e + 1;
            return n
        },
        moveTo: function (t, e) {
            return i(this._objects, t), this._objects.splice(e, 0, t), this.renderAll && this.renderAll()
        },
        dispose: function () {
            return this.clear(), this.interactive && this.removeListeners(), this
        },
        toString: function () {
            return "#<fabric.Canvas (" + this.complexity() + "): { objects: " + this.getObjects().length + " }>"
        }
    }), t(fabric.StaticCanvas.prototype, fabric.Observable), t(fabric.StaticCanvas.prototype, fabric.Collection), t(fabric.StaticCanvas.prototype, fabric.DataURLExporter), t(fabric.StaticCanvas, {
        EMPTY_JSON: '{"objects": [], "background": "white"}',
        supports: function (t) {
            var e = fabric.util.createCanvasElement();
            if (!e || !e.getContext)return null;
            var i = e.getContext("2d");
            if (!i)return null;
            switch (t) {
                case"getImageData":
                    return "undefined" != typeof i.getImageData;
                case"setLineDash":
                    return "undefined" != typeof i.setLineDash;
                case"toDataURL":
                    return "undefined" != typeof e.toDataURL;
                case"toDataURLWithQuality":
                    try {
                        return e.toDataURL("image/jpeg", 0), !0
                    } catch (n) {
                    }
                    return !1;
                default:
                    return null
            }
        }
    }), fabric.StaticCanvas.prototype.toJSON = fabric.StaticCanvas.prototype.toObject
}(), function () {
    var t = fabric.util.getPointer, e = fabric.util.degreesToRadians, i = fabric.util.radiansToDegrees, n = Math.atan2, r = Math.abs, o = .5;
    fabric.Canvas = fabric.util.createClass(fabric.StaticCanvas, {
        initialize: function (t, e) {
            e || (e = {}), this._initStatic(t, e), this._initInteractive(), this._createCacheCanvas(), fabric.Canvas.activeInstance = this
        },
        uniScaleTransform: !1,
        centeredScaling: !1,
        centeredRotation: !1,
        interactive: !0,
        selection: !0,
        selectionColor: "rgba(100, 100, 255, 0.3)",
        selectionDashArray: [],
        selectionBorderColor: "rgba(255, 255, 255, 0.3)",
        selectionLineWidth: 1,
        hoverCursor: "move",
        moveCursor: "move",
        defaultCursor: "default",
        freeDrawingCursor: "crosshair",
        rotationCursor: "crosshair",
        containerClass: "canvas-container",
        perPixelTargetFind: !1,
        targetFindTolerance: 0,
        skipTargetFind: !1,
        _initInteractive: function () {
            this._currentTransform = null, this._groupSelector = null, this._initWrapperElement(), this._createUpperCanvas(), this._initEventListeners(), this.freeDrawingBrush = fabric.PencilBrush && new fabric.PencilBrush(this), this.calcOffset()
        },
        _resetCurrentTransform: function (t) {
            var e = this._currentTransform;
            e.target.set({
                scaleX: e.original.scaleX,
                scaleY: e.original.scaleY,
                left: e.original.left,
                top: e.original.top
            }), this._shouldCenterTransform(t, e.target) ? "rotate" === e.action ? this._setOriginToCenter(e.target) : ("center" !== e.originX && ("right" === e.originX ? e.mouseXSign = -1 : e.mouseXSign = 1), "center" !== e.originY && ("bottom" === e.originY ? e.mouseYSign = -1 : e.mouseYSign = 1), e.originX = "center", e.originY = "center") : (e.originX = e.original.originX, e.originY = e.original.originY)
        },
        containsPoint: function (t, e) {
            var i = this.getPointer(t, !0), n = this._normalizePointer(e, i);
            return e.containsPoint(n) || e._findTargetCorner(i)
        },
        _normalizePointer: function (t, e) {
            var i, n = this.getActiveGroup(), r = e.x, o = e.y, s = n && "group" !== t.type && n.contains(t);
            return s && (i = new fabric.Point(n.left, n.top), i = fabric.util.transformPoint(i, this.viewportTransform, !0), r -= i.x, o -= i.y), {
                x: r,
                y: o
            }
        },
        isTargetTransparent: function (t, e, i) {
            var n = t.hasBorders, r = t.transparentCorners;
            t.hasBorders = t.transparentCorners = !1, this._draw(this.contextCache, t), t.hasBorders = n, t.transparentCorners = r;
            var o = fabric.util.isTransparent(this.contextCache, e, i, this.targetFindTolerance);
            return this.clearContext(this.contextCache), o
        },
        _shouldClearSelection: function (t, e) {
            var i = this.getActiveGroup(), n = this.getActiveObject();
            return !e || e && i && !i.contains(e) && i !== e && !t.shiftKey || e && !e.evented || e && !e.selectable && n && n !== e
        },
        _shouldCenterTransform: function (t, e) {
            if (e) {
                var i, n = this._currentTransform;
                return "scale" === n.action || "scaleX" === n.action || "scaleY" === n.action ? i = this.centeredScaling || e.centeredScaling : "rotate" === n.action && (i = this.centeredRotation || e.centeredRotation), i ? !t.altKey : t.altKey
            }
        },
        _getOriginFromCorner: function (t, e) {
            var i = {x: t.originX, y: t.originY};
            return "ml" === e || "tl" === e || "bl" === e ? i.x = "right" : ("mr" === e || "tr" === e || "br" === e) && (i.x = "left"), "tl" === e || "mt" === e || "tr" === e ? i.y = "bottom" : ("bl" === e || "mb" === e || "br" === e) && (i.y = "top"), i
        },
        _getActionFromCorner: function (t, e) {
            var i = "drag";
            return e && (i = "ml" === e || "mr" === e ? "scaleX" : "mt" === e || "mb" === e ? "scaleY" : "mtr" === e ? "rotate" : "scale"), i
        },
        _setupCurrentTransform: function (t, i) {
            if (i) {
                var n = this.getPointer(t), r = i._findTargetCorner(this.getPointer(t, !0)), o = this._getActionFromCorner(i, r), s = this._getOriginFromCorner(i, r);
                this._currentTransform = {
                    target: i,
                    action: o,
                    scaleX: i.scaleX,
                    scaleY: i.scaleY,
                    offsetX: n.x - i.left,
                    offsetY: n.y - i.top,
                    originX: s.x,
                    originY: s.y,
                    ex: n.x,
                    ey: n.y,
                    left: i.left,
                    top: i.top,
                    theta: e(i.angle),
                    width: i.width * i.scaleX,
                    mouseXSign: 1,
                    mouseYSign: 1
                }, this._currentTransform.original = {
                    left: i.left,
                    top: i.top,
                    scaleX: i.scaleX,
                    scaleY: i.scaleY,
                    originX: s.x,
                    originY: s.y
                }, this._resetCurrentTransform(t)
            }
        },
        _translateObject: function (t, e) {
            var i = this._currentTransform.target;
            i.get("lockMovementX") || i.set("left", t - this._currentTransform.offsetX), i.get("lockMovementY") || i.set("top", e - this._currentTransform.offsetY)
        },
        _scaleObject: function (t, e, i) {
            var n = this._currentTransform, r = n.target, o = r.get("lockScalingX"), s = r.get("lockScalingY"), a = r.get("lockScalingFlip");
            if (!o || !s) {
                var c = r.translateToOriginPoint(r.getCenterPoint(), n.originX, n.originY), l = r.toLocalPoint(new fabric.Point(t, e), n.originX, n.originY);
                this._setLocalMouse(l, n), this._setObjectScale(l, n, o, s, i, a), r.setPositionByOrigin(c, n.originX, n.originY)
            }
        },
        _setObjectScale: function (t, e, i, n, r, o) {
            var s = e.target, a = !1, c = !1, l = s.stroke ? s.strokeWidth : 0;
            e.newScaleX = t.x / (s.width + l / 2), e.newScaleY = t.y / (s.height + l / 2), o && e.newScaleX <= 0 && e.newScaleX < s.scaleX && (a = !0), o && e.newScaleY <= 0 && e.newScaleY < s.scaleY && (c = !0), "equally" !== r || i || n ? r ? "x" !== r || s.get("lockUniScaling") ? "y" !== r || s.get("lockUniScaling") || c || n || s.set("scaleY", e.newScaleY) : a || i || s.set("scaleX", e.newScaleX) : (a || i || s.set("scaleX", e.newScaleX), c || n || s.set("scaleY", e.newScaleY)) : a || c || this._scaleObjectEqually(t, s, e), a || c || this._flipObject(e, r)
        },
        _scaleObjectEqually: function (t, e, i) {
            var n = t.y + t.x, r = e.stroke ? e.strokeWidth : 0, o = (e.height + r / 2) * i.original.scaleY + (e.width + r / 2) * i.original.scaleX;
            i.newScaleX = i.original.scaleX * n / o, i.newScaleY = i.original.scaleY * n / o, e.set("scaleX", i.newScaleX), e.set("scaleY", i.newScaleY)
        },
        _flipObject: function (t, e) {
            t.newScaleX < 0 && "y" !== e && ("left" === t.originX ? t.originX = "right" : "right" === t.originX && (t.originX = "left")), t.newScaleY < 0 && "x" !== e && ("top" === t.originY ? t.originY = "bottom" : "bottom" === t.originY && (t.originY = "top"))
        },
        _setLocalMouse: function (t, e) {
            var i = e.target;
            "right" === e.originX ? t.x *= -1 : "center" === e.originX && (t.x *= 2 * e.mouseXSign, t.x < 0 && (e.mouseXSign = -e.mouseXSign)), "bottom" === e.originY ? t.y *= -1 : "center" === e.originY && (t.y *= 2 * e.mouseYSign, t.y < 0 && (e.mouseYSign = -e.mouseYSign)), r(t.x) > i.padding ? t.x < 0 ? t.x += i.padding : t.x -= i.padding : t.x = 0, r(t.y) > i.padding ? t.y < 0 ? t.y += i.padding : t.y -= i.padding : t.y = 0
        },
        _rotateObject: function (t, e) {
            var r = this._currentTransform;
            if (!r.target.get("lockRotation")) {
                var o = n(r.ey - r.top, r.ex - r.left), s = n(e - r.top, t - r.left), a = i(s - o + r.theta);
                0 > a && (a = 360 + a), r.target.angle = a % 360
            }
        },
        setCursor: function (t) {
            this.upperCanvasEl.style.cursor = t
        },
        _resetObjectTransform: function (t) {
            t.scaleX = 1, t.scaleY = 1, t.setAngle(0)
        },
        _drawSelection: function () {
            var t = this.contextTop, e = this._groupSelector, i = e.left, n = e.top, s = r(i), a = r(n);
            if (t.fillStyle = this.selectionColor, t.fillRect(e.ex - (i > 0 ? 0 : -i), e.ey - (n > 0 ? 0 : -n), s, a), t.lineWidth = this.selectionLineWidth, t.strokeStyle = this.selectionBorderColor, this.selectionDashArray.length > 1) {
                var c = e.ex + o - (i > 0 ? 0 : s), l = e.ey + o - (n > 0 ? 0 : a);
                t.beginPath(), fabric.util.drawDashedLine(t, c, l, c + s, l, this.selectionDashArray), fabric.util.drawDashedLine(t, c, l + a - 1, c + s, l + a - 1, this.selectionDashArray), fabric.util.drawDashedLine(t, c, l, c, l + a, this.selectionDashArray), fabric.util.drawDashedLine(t, c + s - 1, l, c + s - 1, l + a, this.selectionDashArray), t.closePath(), t.stroke()
            } else t.strokeRect(e.ex + o - (i > 0 ? 0 : s), e.ey + o - (n > 0 ? 0 : a), s, a)
        },
        _isLastRenderedObject: function (t) {
            return this.controlsAboveOverlay && this.lastRenderedObjectWithControlsAboveOverlay && this.lastRenderedObjectWithControlsAboveOverlay.visible && this.containsPoint(t, this.lastRenderedObjectWithControlsAboveOverlay) && this.lastRenderedObjectWithControlsAboveOverlay._findTargetCorner(this.getPointer(t, !0))
        },
        findTarget: function (t, e) {
            if (!this.skipTargetFind) {
                if (this._isLastRenderedObject(t))return this.lastRenderedObjectWithControlsAboveOverlay;
                var i = this.getActiveGroup();
                if (i && !e && this.containsPoint(t, i))return i;
                var n = this._searchPossibleTargets(t);
                return this._fireOverOutEvents(n), n
            }
        },
        _fireOverOutEvents: function (t) {
            t ? this._hoveredTarget !== t && (this.fire("mouse:over", {target: t}), t.fire("mouseover"), this._hoveredTarget && (this.fire("mouse:out", {target: this._hoveredTarget}), this._hoveredTarget.fire("mouseout")), this._hoveredTarget = t) : this._hoveredTarget && (this.fire("mouse:out", {target: this._hoveredTarget}), this._hoveredTarget.fire("mouseout"), this._hoveredTarget = null)
        },
        _checkTarget: function (t, e, i) {
            if (e && e.visible && e.evented && this.containsPoint(t, e)) {
                if (!this.perPixelTargetFind && !e.perPixelTargetFind || e.isEditing)return !0;
                var n = this.isTargetTransparent(e, i.x, i.y);
                if (!n)return !0
            }
        },
        _searchPossibleTargets: function (t) {
            for (var e, i = this.getPointer(t, !0), n = this._objects.length; n--;)if (!this._objects[n].group && this._checkTarget(t, this._objects[n], i)) {
                this.relatedTarget = this._objects[n], e = this._objects[n];
                break
            }
            return e
        },
        getPointer: function (e, i, n) {
            n || (n = this.upperCanvasEl);
            var r, o = t(e, n), s = n.getBoundingClientRect(), a = s.width || 0, c = s.height || 0;
            return a && c || ("top" in s && "bottom" in s && (c = Math.abs(s.top - s.bottom)), "right" in s && "left" in s && (a = Math.abs(s.right - s.left))), this.calcOffset(), o.x = o.x - this._offset.left, o.y = o.y - this._offset.top, i || (o = fabric.util.transformPoint(o, fabric.util.invertTransform(this.viewportTransform))), r = 0 === a || 0 === c ? {
                width: 1,
                height: 1
            } : {width: n.width / a, height: n.height / c}, {x: o.x * r.width, y: o.y * r.height}
        },
        _createUpperCanvas: function () {
            var t = this.lowerCanvasEl.className.replace(/\s*lower-canvas\s*/, "");
            this.upperCanvasEl = this._createCanvasElement(), fabric.util.addClass(this.upperCanvasEl, "upper-canvas " + t), this.wrapperEl.appendChild(this.upperCanvasEl), this._copyCanvasStyle(this.lowerCanvasEl, this.upperCanvasEl), this._applyCanvasStyle(this.upperCanvasEl), this.contextTop = this.upperCanvasEl.getContext("2d")
        },
        _createCacheCanvas: function () {
            this.cacheCanvasEl = this._createCanvasElement(), this.cacheCanvasEl.setAttribute("width", this.width), this.cacheCanvasEl.setAttribute("height", this.height), this.contextCache = this.cacheCanvasEl.getContext("2d")
        },
        _initWrapperElement: function () {
            this.wrapperEl = fabric.util.wrapElement(this.lowerCanvasEl, "div", {"class": this.containerClass}), fabric.util.setStyle(this.wrapperEl, {
                width: this.getWidth() + "px",
                height: this.getHeight() + "px",
                position: "relative"
            }), fabric.util.makeElementUnselectable(this.wrapperEl)
        },
        _applyCanvasStyle: function (t) {
            var e = this.getWidth() || t.width, i = this.getHeight() || t.height;
            fabric.util.setStyle(t, {
                position: "absolute",
                width: e + "px",
                height: i + "px",
                left: 0,
                top: 0
            }), t.width = e, t.height = i, fabric.util.makeElementUnselectable(t)
        },
        _copyCanvasStyle: function (t, e) {
            e.style.cssText = t.style.cssText
        },
        getSelectionContext: function () {
            return this.contextTop
        },
        getSelectionElement: function () {
            return this.upperCanvasEl
        },
        _setActiveObject: function (t) {
            this._activeObject && this._activeObject.set("active", !1), this._activeObject = t, t.set("active", !0)
        },
        setActiveObject: function (t, e) {
            return this._setActiveObject(t), this.renderAll(), this.fire("object:selected", {
                target: t,
                e: e
            }), t.fire("selected", {e: e}), this
        },
        getActiveObject: function () {
            return this._activeObject
        },
        _discardActiveObject: function () {
            this._activeObject && this._activeObject.set("active", !1), this._activeObject = null
        },
        discardActiveObject: function (t) {
            return this._discardActiveObject(), this.renderAll(), this.fire("selection:cleared", {e: t}), this
        },
        _setActiveGroup: function (t) {
            this._activeGroup = t, t && t.set("active", !0)
        },
        setActiveGroup: function (t, e) {
            return this._setActiveGroup(t), t && (this.fire("object:selected", {
                target: t,
                e: e
            }), t.fire("selected", {e: e})), this
        },
        getActiveGroup: function () {
            return this._activeGroup
        },
        _discardActiveGroup: function () {
            var t = this.getActiveGroup();
            t && t.destroy(), this.setActiveGroup(null)
        },
        discardActiveGroup: function (t) {
            return this._discardActiveGroup(), this.fire("selection:cleared", {e: t}), this
        },
        deactivateAll: function () {
            for (var t = this.getObjects(), e = 0, i = t.length; i > e; e++)t[e].set("active", !1);
            return this._discardActiveGroup(), this._discardActiveObject(), this
        },
        deactivateAllWithDispatch: function (t) {
            var e = this.getActiveGroup() || this.getActiveObject();
            return e && this.fire("before:selection:cleared", {
                target: e,
                e: t
            }), this.deactivateAll(), e && this.fire("selection:cleared", {e: t}), this
        },
        drawControls: function (t) {
            var e = this.getActiveGroup();
            e ? this._drawGroupControls(t, e) : this._drawObjectsControls(t)
        },
        _drawGroupControls: function (t, e) {
            e._renderControls(t)
        },
        _drawObjectsControls: function (t) {
            for (var e = 0, i = this._objects.length; i > e; ++e)this._objects[e] && this._objects[e].active && (this._objects[e]._renderControls(t), this.lastRenderedObjectWithControlsAboveOverlay = this._objects[e])
        }
    });
    for (var s in fabric.StaticCanvas)"prototype" !== s && (fabric.Canvas[s] = fabric.StaticCanvas[s]);
    fabric.isTouchSupported && (fabric.Canvas.prototype._setCursorFromEvent = function () {
    }), fabric.Element = fabric.Canvas
}(), function () {
    var t = {
        mt: 0,
        tr: 1,
        mr: 2,
        br: 3,
        mb: 4,
        bl: 5,
        ml: 6,
        tl: 7
    }, e = fabric.util.addListener, i = fabric.util.removeListener;
    fabric.util.object.extend(fabric.Canvas.prototype, {
        cursorMap: ["n-resize", "ne-resize", "e-resize", "se-resize", "s-resize", "sw-resize", "w-resize", "nw-resize"],
        _initEventListeners: function () {
            this._bindEvents(), e(fabric.window, "resize", this._onResize), e(this.upperCanvasEl, "mousedown", this._onMouseDown), e(this.upperCanvasEl, "mousemove", this._onMouseMove), e(this.upperCanvasEl, "mousewheel", this._onMouseWheel), e(this.upperCanvasEl, "touchstart", this._onMouseDown), e(this.upperCanvasEl, "touchmove", this._onMouseMove), "undefined" != typeof eventjs && "add" in eventjs && (eventjs.add(this.upperCanvasEl, "gesture", this._onGesture), eventjs.add(this.upperCanvasEl, "drag", this._onDrag), eventjs.add(this.upperCanvasEl, "orientation", this._onOrientationChange), eventjs.add(this.upperCanvasEl, "shake", this._onShake), eventjs.add(this.upperCanvasEl, "longpress", this._onLongPress))
        },
        _bindEvents: function () {
            this._onMouseDown = this._onMouseDown.bind(this), this._onMouseMove = this._onMouseMove.bind(this), this._onMouseUp = this._onMouseUp.bind(this), this._onResize = this._onResize.bind(this), this._onGesture = this._onGesture.bind(this), this._onDrag = this._onDrag.bind(this), this._onShake = this._onShake.bind(this), this._onLongPress = this._onLongPress.bind(this), this._onOrientationChange = this._onOrientationChange.bind(this), this._onMouseWheel = this._onMouseWheel.bind(this)
        },
        removeListeners: function () {
            i(fabric.window, "resize", this._onResize), i(this.upperCanvasEl, "mousedown", this._onMouseDown), i(this.upperCanvasEl, "mousemove", this._onMouseMove), i(this.upperCanvasEl, "mousewheel", this._onMouseWheel), i(this.upperCanvasEl, "touchstart", this._onMouseDown), i(this.upperCanvasEl, "touchmove", this._onMouseMove), "undefined" != typeof eventjs && "remove" in eventjs && (eventjs.remove(this.upperCanvasEl, "gesture", this._onGesture), eventjs.remove(this.upperCanvasEl, "drag", this._onDrag), eventjs.remove(this.upperCanvasEl, "orientation", this._onOrientationChange), eventjs.remove(this.upperCanvasEl, "shake", this._onShake), eventjs.remove(this.upperCanvasEl, "longpress", this._onLongPress))
        },
        _onGesture: function (t, e) {
            this.__onTransformGesture && this.__onTransformGesture(t, e)
        },
        _onDrag: function (t, e) {
            this.__onDrag && this.__onDrag(t, e)
        },
        _onMouseWheel: function (t, e) {
            this.__onMouseWheel && this.__onMouseWheel(t, e)
        },
        _onOrientationChange: function (t, e) {
            this.__onOrientationChange && this.__onOrientationChange(t, e)
        },
        _onShake: function (t, e) {
            this.__onShake && this.__onShake(t, e)
        },
        _onLongPress: function (t, e) {
            this.__onLongPress && this.__onLongPress(t, e)
        },
        _onMouseDown: function (t) {
            this.__onMouseDown(t), e(fabric.document, "touchend", this._onMouseUp), e(fabric.document, "touchmove", this._onMouseMove), i(this.upperCanvasEl, "mousemove", this._onMouseMove), i(this.upperCanvasEl, "touchmove", this._onMouseMove), "touchstart" === t.type ? i(this.upperCanvasEl, "mousedown", this._onMouseDown) : (e(fabric.document, "mouseup", this._onMouseUp), e(fabric.document, "mousemove", this._onMouseMove))
        },
        _onMouseUp: function (t) {
            if (this.__onMouseUp(t), i(fabric.document, "mouseup", this._onMouseUp), i(fabric.document, "touchend", this._onMouseUp), i(fabric.document, "mousemove", this._onMouseMove), i(fabric.document, "touchmove", this._onMouseMove), e(this.upperCanvasEl, "mousemove", this._onMouseMove), e(this.upperCanvasEl, "touchmove", this._onMouseMove), "touchend" === t.type) {
                var n = this;
                setTimeout(function () {
                    e(n.upperCanvasEl, "mousedown", n._onMouseDown)
                }, 400)
            }
        },
        _onMouseMove: function (t) {
            !this.allowTouchScrolling && t.preventDefault && t.preventDefault(), this.__onMouseMove(t)
        },
        _onResize: function () {
            this.calcOffset()
        },
        _shouldRender: function (t, e) {
            var i = this.getActiveGroup() || this.getActiveObject();
            return !!(t && (t.isMoving || t !== i) || !t && i || !t && !i && !this._groupSelector || e && this._previousPointer && this.selection && (e.x !== this._previousPointer.x || e.y !== this._previousPointer.y))
        },
        __onMouseUp: function (t) {
            var e;
            if (this.isDrawingMode && this._isCurrentlyDrawing)return void this._onMouseUpInDrawingMode(t);
            this._currentTransform ? (this._finalizeCurrentTransform(), e = this._currentTransform.target) : e = this.findTarget(t, !0);
            var i = this._shouldRender(e, this.getPointer(t));
            this._maybeGroupObjects(t), e && (e.isMoving = !1), i && this.renderAll(), this._handleCursorAndEvent(t, e)
        },
        _handleCursorAndEvent: function (t, e) {
            this._setCursorFromEvent(t, e);
            var i = this;
            setTimeout(function () {
                i._setCursorFromEvent(t, e)
            }, 50), this.fire("mouse:up", {target: e, e: t}), e && e.fire("mouseup", {e: t})
        },
        _finalizeCurrentTransform: function () {
            var t = this._currentTransform, e = t.target;
            e._scaling && (e._scaling = !1), e.setCoords(), this.stateful && e.hasStateChanged() && (this.fire("object:modified", {target: e}), e.fire("modified")), this._restoreOriginXY(e)
        },
        _restoreOriginXY: function (t) {
            if (this._previousOriginX && this._previousOriginY) {
                var e = t.translateToOriginPoint(t.getCenterPoint(), this._previousOriginX, this._previousOriginY);
                t.originX = this._previousOriginX, t.originY = this._previousOriginY, t.left = e.x, t.top = e.y, this._previousOriginX = null, this._previousOriginY = null
            }
        },
        _onMouseDownInDrawingMode: function (t) {
            this._isCurrentlyDrawing = !0, this.discardActiveObject(t).renderAll(), this.clipTo && fabric.util.clipContext(this, this.contextTop);
            var e = fabric.util.invertTransform(this.viewportTransform), i = fabric.util.transformPoint(this.getPointer(t, !0), e);
            this.freeDrawingBrush.onMouseDown(i), this.fire("mouse:down", {e: t});
            var n = this.findTarget(t);
            "undefined" != typeof n && n.fire("mousedown", {e: t, target: n})
        },
        _onMouseMoveInDrawingMode: function (t) {
            if (this._isCurrentlyDrawing) {
                var e = fabric.util.invertTransform(this.viewportTransform), i = fabric.util.transformPoint(this.getPointer(t, !0), e);
                this.freeDrawingBrush.onMouseMove(i)
            }
            this.setCursor(this.freeDrawingCursor), this.fire("mouse:move", {e: t});
            var n = this.findTarget(t);
            "undefined" != typeof n && n.fire("mousemove", {e: t, target: n})
        },
        _onMouseUpInDrawingMode: function (t) {
            this._isCurrentlyDrawing = !1, this.clipTo && this.contextTop.restore(), this.freeDrawingBrush.onMouseUp(), this.fire("mouse:up", {e: t});
            var e = this.findTarget(t);
            "undefined" != typeof e && e.fire("mouseup", {e: t, target: e})
        },
        __onMouseDown: function (t) {
            var e = "which" in t ? 1 === t.which : 1 === t.button;
            if (e || fabric.isTouchSupported) {
                if (this.isDrawingMode)return void this._onMouseDownInDrawingMode(t);
                if (!this._currentTransform) {
                    var i = this.findTarget(t), n = this.getPointer(t, !0);
                    this._previousPointer = n;
                    var r = this._shouldRender(i, n), o = this._shouldGroup(t, i);
                    this._shouldClearSelection(t, i) ? this._clearSelection(t, i, n) : o && (this._handleGrouping(t, i), i = this.getActiveGroup()), i && i.selectable && !o && (this._beforeTransform(t, i), this._setupCurrentTransform(t, i)), r && this.renderAll(), this.fire("mouse:down", {
                        target: i,
                        e: t
                    }), i && i.fire("mousedown", {e: t})
                }
            }
        },
        _beforeTransform: function (t, e) {
            this.stateful && e.saveState(), e._findTargetCorner(this.getPointer(t)) && this.onBeforeScaleRotate(e), e !== this.getActiveGroup() && e !== this.getActiveObject() && (this.deactivateAll(), this.setActiveObject(e, t))
        },
        _clearSelection: function (t, e, i) {
            this.deactivateAllWithDispatch(t), e && e.selectable ? this.setActiveObject(e, t) : this.selection && (this._groupSelector = {
                ex: i.x,
                ey: i.y,
                top: 0,
                left: 0
            })
        },
        _setOriginToCenter: function (t) {
            this._previousOriginX = this._currentTransform.target.originX, this._previousOriginY = this._currentTransform.target.originY;
            var e = t.getCenterPoint();
            t.originX = "center", t.originY = "center", t.left = e.x, t.top = e.y, this._currentTransform.left = t.left, this._currentTransform.top = t.top
        },
        _setCenterToOrigin: function (t) {
            var e = t.translateToOriginPoint(t.getCenterPoint(), this._previousOriginX, this._previousOriginY);
            t.originX = this._previousOriginX, t.originY = this._previousOriginY, t.left = e.x, t.top = e.y, this._previousOriginX = null, this._previousOriginY = null
        },
        __onMouseMove: function (t) {
            var e, i;
            if (this.isDrawingMode)return void this._onMouseMoveInDrawingMode(t);
            if (!("undefined" != typeof t.touches && t.touches.length > 1)) {
                var n = this._groupSelector;
                n ? (i = this.getPointer(t, !0), n.left = i.x - n.ex, n.top = i.y - n.ey, this.renderTop()) : this._currentTransform ? this._transformObject(t) : (e = this.findTarget(t), !e || e && !e.selectable ? this.setCursor(this.defaultCursor) : this._setCursorFromEvent(t, e)), this.fire("mouse:move", {
                    target: e,
                    e: t
                }), e && e.fire("mousemove", {e: t})
            }
        },
        _transformObject: function (t) {
            var e = this.getPointer(t), i = this._currentTransform;
            i.reset = !1, i.target.isMoving = !0, this._beforeScaleTransform(t, i), this._performTransformAction(t, i, e), this.renderAll()
        },
        _performTransformAction: function (t, e, i) {
            var n = i.x, r = i.y, o = e.target, s = e.action;
            "rotate" === s ? (this._rotateObject(n, r), this._fire("rotating", o, t)) : "scale" === s ? (this._onScale(t, e, n, r), this._fire("scaling", o, t)) : "scaleX" === s ? (this._scaleObject(n, r, "x"), this._fire("scaling", o, t)) : "scaleY" === s ? (this._scaleObject(n, r, "y"), this._fire("scaling", o, t)) : (this._translateObject(n, r), this._fire("moving", o, t), this.setCursor(this.moveCursor))
        },
        _fire: function (t, e, i) {
            this.fire("object:" + t, {target: e, e: i}), e.fire(t, {e: i})
        },
        _beforeScaleTransform: function (t, e) {
            if ("scale" === e.action || "scaleX" === e.action || "scaleY" === e.action) {
                var i = this._shouldCenterTransform(t, e.target);
                (i && ("center" !== e.originX || "center" !== e.originY) || !i && "center" === e.originX && "center" === e.originY) && (this._resetCurrentTransform(t), e.reset = !0)
            }
        },
        _onScale: function (t, e, i, n) {
            !t.shiftKey && !this.uniScaleTransform || e.target.get("lockUniScaling") ? (e.reset || "scale" !== e.currentAction || this._resetCurrentTransform(t, e.target), e.currentAction = "scaleEqually", this._scaleObject(i, n, "equally")) : (e.currentAction = "scale", this._scaleObject(i, n))
        },
        _setCursorFromEvent: function (t, e) {
            if (!e || !e.selectable)return this.setCursor(this.defaultCursor), !1;
            var i = this.getActiveGroup(), n = e._findTargetCorner && (!i || !i.contains(e)) && e._findTargetCorner(this.getPointer(t, !0));
            return n ? this._setCornerCursor(n, e) : this.setCursor(e.hoverCursor || this.hoverCursor), !0
        },
        _setCornerCursor: function (e, i) {
            if (e in t)this.setCursor(this._getRotatedCornerCursor(e, i)); else {
                if ("mtr" !== e || !i.hasRotatingPoint)return this.setCursor(this.defaultCursor), !1;
                this.setCursor(this.rotationCursor)
            }
        },
        _getRotatedCornerCursor: function (e, i) {
            var n = Math.round(i.getAngle() % 360 / 45);
            return 0 > n && (n += 8), n += t[e], n %= 8, this.cursorMap[n]
        }
    })
}(), function () {
    var t = Math.min, e = Math.max;
    fabric.util.object.extend(fabric.Canvas.prototype, {
        _shouldGroup: function (t, e) {
            var i = this.getActiveObject();
            return t.shiftKey && (this.getActiveGroup() || i && i !== e) && this.selection
        }, _handleGrouping: function (t, e) {
            (e !== this.getActiveGroup() || (e = this.findTarget(t, !0), e && !e.isType("group"))) && (this.getActiveGroup() ? this._updateActiveGroup(e, t) : this._createActiveGroup(e, t), this._activeGroup && this._activeGroup.saveCoords())
        }, _updateActiveGroup: function (t, e) {
            var i = this.getActiveGroup();
            if (i.contains(t)) {
                if (i.removeWithUpdate(t), this._resetObjectTransform(i), t.set("active", !1), 1 === i.size())return this.discardActiveGroup(e), void this.setActiveObject(i.item(0))
            } else i.addWithUpdate(t), this._resetObjectTransform(i);
            this.fire("selection:created", {target: i, e: e}), i.set("active", !0)
        }, _createActiveGroup: function (t, e) {
            if (this._activeObject && t !== this._activeObject) {
                var i = this._createGroup(t);
                i.addWithUpdate(), this.setActiveGroup(i), this._activeObject = null, this.fire("selection:created", {
                    target: i,
                    e: e
                })
            }
            t.set("active", !0)
        }, _createGroup: function (t) {
            var e = this.getObjects(), i = e.indexOf(this._activeObject) < e.indexOf(t), n = i ? [this._activeObject, t] : [t, this._activeObject];
            return new fabric.Group(n, {canvas: this})
        }, _groupSelectedObjects: function (t) {
            var e = this._collectObjects();
            1 === e.length ? this.setActiveObject(e[0], t) : e.length > 1 && (e = new fabric.Group(e.reverse(), {canvas: this}), e.addWithUpdate(), this.setActiveGroup(e, t), e.saveCoords(), this.fire("selection:created", {target: e}), this.renderAll())
        }, _collectObjects: function () {
            for (var i, n = [], r = this._groupSelector.ex, o = this._groupSelector.ey, s = r + this._groupSelector.left, a = o + this._groupSelector.top, c = new fabric.Point(t(r, s), t(o, a)), l = new fabric.Point(e(r, s), e(o, a)), h = r === s && o === a, u = this._objects.length; u-- && (i = this._objects[u], !(i && i.selectable && i.visible && (i.intersectsWithRect(c, l) || i.isContainedWithinRect(c, l) || i.containsPoint(c) || i.containsPoint(l)) && (i.set("active", !0), n.push(i), h))););
            return n
        }, _maybeGroupObjects: function (t) {
            this.selection && this._groupSelector && this._groupSelectedObjects(t);
            var e = this.getActiveGroup();
            e && (e.setObjectsCoords().setCoords(), e.isMoving = !1, this.setCursor(this.defaultCursor)), this._groupSelector = null, this._currentTransform = null
        }
    })
}(), fabric.util.object.extend(fabric.StaticCanvas.prototype, {
    toDataURL: function (t) {
        t || (t = {});
        var e = t.format || "png", i = t.quality || 1, n = t.multiplier || 1, r = {
            left: t.left,
            top: t.top,
            width: t.width,
            height: t.height
        };
        return 1 !== n ? this.__toDataURLWithMultiplier(e, i, r, n) : this.__toDataURL(e, i, r)
    }, __toDataURL: function (t, e, i) {
        this.renderAll(!0);
        var n = this.upperCanvasEl || this.lowerCanvasEl, r = this.__getCroppedCanvas(n, i);
        "jpg" === t && (t = "jpeg");
        var o = fabric.StaticCanvas.supports("toDataURLWithQuality") ? (r || n).toDataURL("image/" + t, e) : (r || n).toDataURL("image/" + t);
        return this.contextTop && this.clearContext(this.contextTop), this.renderAll(), r && (r = null), o
    }, __getCroppedCanvas: function (t, e) {
        var i, n, r = "left" in e || "top" in e || "width" in e || "height" in e;
        return r && (i = fabric.util.createCanvasElement(), n = i.getContext("2d"), i.width = e.width || this.width, i.height = e.height || this.height, n.drawImage(t, -e.left || 0, -e.top || 0)), i
    }, __toDataURLWithMultiplier: function (t, e, i, n) {
        var r = this.getWidth(), o = this.getHeight(), s = r * n, a = o * n, c = this.getActiveObject(), l = this.getActiveGroup(), h = this.contextTop || this.contextContainer;
        n > 1 && this.setWidth(s).setHeight(a), h.scale(n, n), i.left && (i.left *= n), i.top && (i.top *= n), i.width ? i.width *= n : 1 > n && (i.width = s), i.height ? i.height *= n : 1 > n && (i.height = a), l ? this._tempRemoveBordersControlsFromGroup(l) : c && this.deactivateAll && this.deactivateAll(), this.renderAll(!0);
        var u = this.__toDataURL(t, e, i);
        return this.width = r, this.height = o, h.scale(1 / n, 1 / n), this.setWidth(r).setHeight(o), l ? this._restoreBordersControlsOnGroup(l) : c && this.setActiveObject && this.setActiveObject(c), this.contextTop && this.clearContext(this.contextTop), this.renderAll(), u
    }, toDataURLWithMultiplier: function (t, e, i) {
        return this.toDataURL({format: t, multiplier: e, quality: i})
    }, _tempRemoveBordersControlsFromGroup: function (t) {
        t.origHasControls = t.hasControls, t.origBorderColor = t.borderColor, t.hasControls = !0, t.borderColor = "rgba(0,0,0,0)", t.forEachObject(function (t) {
            t.origBorderColor = t.borderColor, t.borderColor = "rgba(0,0,0,0)"
        })
    }, _restoreBordersControlsOnGroup: function (t) {
        t.hideControls = t.origHideControls, t.borderColor = t.origBorderColor, t.forEachObject(function (t) {
            t.borderColor = t.origBorderColor, delete t.origBorderColor
        })
    }
}), function () {
    var t = fabric.util.degreesToRadians, e = fabric.util.radiansToDegrees;
    fabric.util.object.extend(fabric.Canvas.prototype, {
        __onTransformGesture: function (t, e) {
            if (!this.isDrawingMode && t.touches && 2 === t.touches.length && "gesture" === e.gesture) {
                var i = this.findTarget(t);
                "undefined" != typeof i && (this.__gesturesParams = {
                    e: t,
                    self: e,
                    target: i
                }, this.__gesturesRenderer()), this.fire("touch:gesture", {target: i, e: t, self: e})
            }
        }, __gesturesParams: null, __gesturesRenderer: function () {
            if (null !== this.__gesturesParams && null !== this._currentTransform) {
                var t = this.__gesturesParams.self, e = this._currentTransform;
                e.action = "scale", e.originX = e.originY = "center", this._setOriginToCenter(e.target), this._scaleObjectBy(t.scale), 0 !== t.rotation && (e.action = "rotate", this._rotateObjectByAngle(t.rotation)), this.renderAll(), e.action = "drag"
            }
        }, __onDrag: function (t, e) {
            this.fire("touch:drag", {e: t, self: e})
        }, __onOrientationChange: function (t, e) {
            this.fire("touch:orientation", {e: t, self: e})
        }, __onShake: function (t, e) {
            this.fire("touch:shake", {e: t, self: e})
        }, __onLongPress: function (t, e) {
            this.fire("touch:longpress", {e: t, self: e})
        }, _scaleObjectBy: function (t, e) {
            var i = this._currentTransform, n = i.target, r = n.get("lockScalingX"), o = n.get("lockScalingY");
            if (!r || !o) {
                n._scaling = !0;
                var s = n.translateToOriginPoint(n.getCenterPoint(), i.originX, i.originY);
                e || (i.newScaleX = i.scaleX * t, i.newScaleY = i.scaleY * t, r || n.set("scaleX", i.scaleX * t), o || n.set("scaleY", i.scaleY * t)), n.setPositionByOrigin(s, i.originX, i.originY)
            }
        }, _rotateObjectByAngle: function (i) {
            var n = this._currentTransform;
            n.target.get("lockRotation") || (n.target.angle = e(t(i) + n.theta))
        }
    })
}(), function (t) {
    "use strict";
    var e = t.fabric || (t.fabric = {}), i = e.util.object.extend, n = e.util.toFixed, r = e.util.string.capitalize, o = e.util.degreesToRadians, s = e.StaticCanvas.supports("setLineDash");
    e.Object || (e.Object = e.util.createClass({
        type: "object",
        originX: "left",
        originY: "top",
        top: 0,
        left: 0,
        width: 0,
        height: 0,
        scaleX: 1,
        scaleY: 1,
        flipX: !1,
        flipY: !1,
        opacity: 1,
        angle: 0,
        cornerSize: 12,
        transparentCorners: !0,
        hoverCursor: null,
        padding: 0,
        borderColor: "rgba(102,153,255,0.75)",
        cornerColor: "rgba(102,153,255,0.5)",
        centeredScaling: !1,
        centeredRotation: !0,
        fill: "rgb(0,0,0)",
        fillRule: "nonzero",
        globalCompositeOperation: "source-over",
        backgroundColor: "",
        stroke: null,
        strokeWidth: 1,
        strokeDashArray: null,
        strokeLineCap: "butt",
        strokeLineJoin: "miter",
        strokeMiterLimit: 10,
        shadow: null,
        borderOpacityWhenMoving: .4,
        borderScaleFactor: 1,
        transformMatrix: null,
        minScaleLimit: .01,
        selectable: !0,
        evented: !0,
        visible: !0,
        hasControls: !0,
        hasBorders: !0,
        hasRotatingPoint: !0,
        rotatingPointOffset: 40,
        perPixelTargetFind: !1,
        includeDefaultValues: !0,
        clipTo: null,
        lockMovementX: !1,
        lockMovementY: !1,
        lockRotation: !1,
        lockScalingX: !1,
        lockScalingY: !1,
        lockUniScaling: !1,
        lockScalingFlip: !1,
        stateProperties: "top left width height scaleX scaleY flipX flipY originX originY transformMatrix stroke strokeWidth strokeDashArray strokeLineCap strokeLineJoin strokeMiterLimit angle opacity fill fillRule globalCompositeOperation shadow clipTo visible backgroundColor".split(" "),
        initialize: function (t) {
            t && this.setOptions(t)
        },
        _initGradient: function (t) {
            !t.fill || !t.fill.colorStops || t.fill instanceof e.Gradient || this.set("fill", new e.Gradient(t.fill))
        },
        _initPattern: function (t) {
            !t.fill || !t.fill.source || t.fill instanceof e.Pattern || this.set("fill", new e.Pattern(t.fill)), !t.stroke || !t.stroke.source || t.stroke instanceof e.Pattern || this.set("stroke", new e.Pattern(t.stroke))
        },
        _initClipping: function (t) {
            if (t.clipTo && "string" == typeof t.clipTo) {
                var i = e.util.getFunctionBody(t.clipTo);
                "undefined" != typeof i && (this.clipTo = new Function("ctx", i))
            }
        },
        setOptions: function (t) {
            for (var e in t)this.set(e, t[e]);
            this._initGradient(t), this._initPattern(t), this._initClipping(t)
        },
        transform: function (t, e) {
            var i = e ? this._getLeftTopCoords() : this.getCenterPoint();
            t.translate(i.x, i.y), t.rotate(o(this.angle)), t.scale(this.scaleX * (this.flipX ? -1 : 1), this.scaleY * (this.flipY ? -1 : 1))
        },
        toObject: function (t) {
            var i = e.Object.NUM_FRACTION_DIGITS, r = {
                type: this.type,
                originX: this.originX,
                originY: this.originY,
                left: n(this.left, i),
                top: n(this.top, i),
                width: n(this.width, i),
                height: n(this.height, i),
                fill: this.fill && this.fill.toObject ? this.fill.toObject() : this.fill,
                stroke: this.stroke && this.stroke.toObject ? this.stroke.toObject() : this.stroke,
                strokeWidth: n(this.strokeWidth, i),
                strokeDashArray: this.strokeDashArray,
                strokeLineCap: this.strokeLineCap,
                strokeLineJoin: this.strokeLineJoin,
                strokeMiterLimit: n(this.strokeMiterLimit, i),
                scaleX: n(this.scaleX, i),
                scaleY: n(this.scaleY, i),
                angle: n(this.getAngle(), i),
                flipX: this.flipX,
                flipY: this.flipY,
                opacity: n(this.opacity, i),
                shadow: this.shadow && this.shadow.toObject ? this.shadow.toObject() : this.shadow,
                visible: this.visible,
                clipTo: this.clipTo && String(this.clipTo),
                backgroundColor: this.backgroundColor,
                fillRule: this.fillRule,
                globalCompositeOperation: this.globalCompositeOperation
            };
            return this.includeDefaultValues || (r = this._removeDefaultValues(r)), e.util.populateWithProperties(this, r, t), r
        },
        toDatalessObject: function (t) {
            return this.toObject(t)
        },
        _removeDefaultValues: function (t) {
            var i = e.util.getKlass(t.type).prototype, n = i.stateProperties;
            return n.forEach(function (e) {
                t[e] === i[e] && delete t[e]
            }), t
        },
        toString: function () {
            return "#<fabric." + r(this.type) + ">"
        },
        get: function (t) {
            return this[t]
        },
        _setObject: function (t) {
            for (var e in t)this._set(e, t[e])
        },
        set: function (t, e) {
            return "object" == typeof t ? this._setObject(t) : "function" == typeof e && "clipTo" !== t ? this._set(t, e(this.get(t))) : this._set(t, e), this
        },
        _set: function (t, i) {
            var r = "scaleX" === t || "scaleY" === t;
            return r && (i = this._constrainScale(i)), "scaleX" === t && 0 > i ? (this.flipX = !this.flipX, i *= -1) : "scaleY" === t && 0 > i ? (this.flipY = !this.flipY, i *= -1) : "width" === t || "height" === t ? this.minScaleLimit = n(Math.min(.1, 1 / Math.max(this.width, this.height)), 2) : "shadow" !== t || !i || i instanceof e.Shadow || (i = new e.Shadow(i)), this[t] = i, this
        },
        toggle: function (t) {
            var e = this.get(t);
            return "boolean" == typeof e && this.set(t, !e), this
        },
        setSourcePath: function (t) {
            return this.sourcePath = t, this
        },
        getViewportTransform: function () {
            return this.canvas && this.canvas.viewportTransform ? this.canvas.viewportTransform : [1, 0, 0, 1, 0, 0]
        },
        render: function (t, i) {
            0 === this.width && 0 === this.height || !this.visible || (t.save(), this._setupCompositeOperation(t), i || this.transform(t), this._setStrokeStyles(t), this._setFillStyles(t), this.transformMatrix && t.transform.apply(t, this.transformMatrix), this._setOpacity(t), this._setShadow(t), this.clipTo && e.util.clipContext(this, t), this._render(t, i), this.clipTo && t.restore(), this._removeShadow(t), this._restoreCompositeOperation(t), t.restore())
        },
        _setOpacity: function (t) {
            this.group && this.group._setOpacity(t), t.globalAlpha *= this.opacity
        },
        _setStrokeStyles: function (t) {
            this.stroke && (t.lineWidth = this.strokeWidth, t.lineCap = this.strokeLineCap, t.lineJoin = this.strokeLineJoin, t.miterLimit = this.strokeMiterLimit, t.strokeStyle = this.stroke.toLive ? this.stroke.toLive(t, this) : this.stroke)
        },
        _setFillStyles: function (t) {
            this.fill && (t.fillStyle = this.fill.toLive ? this.fill.toLive(t, this) : this.fill)
        },
        _renderControls: function (t, i) {
            if (this.active && !i) {
                var n = this.getViewportTransform();
                t.save();
                var r;
                this.group && (r = e.util.transformPoint(this.group.getCenterPoint(), n), t.translate(r.x, r.y), t.rotate(o(this.group.angle))), r = e.util.transformPoint(this.getCenterPoint(), n, null != this.group), this.group && (r.x *= this.group.scaleX, r.y *= this.group.scaleY), t.translate(r.x, r.y), t.rotate(o(this.angle)), this.drawBorders(t), this.drawControls(t), t.restore()
            }
        },
        _setShadow: function (t) {
            if (this.shadow) {
                var e = this.canvas && this.canvas.viewportTransform[0] || 1, i = this.canvas && this.canvas.viewportTransform[3] || 1;
                t.shadowColor = this.shadow.color, t.shadowBlur = this.shadow.blur * (e + i) * (this.scaleX + this.scaleY) / 4, t.shadowOffsetX = this.shadow.offsetX * e * this.scaleX, t.shadowOffsetY = this.shadow.offsetY * i * this.scaleY
            }
        },
        _removeShadow: function (t) {
            this.shadow && (t.shadowColor = "", t.shadowBlur = t.shadowOffsetX = t.shadowOffsetY = 0)
        },
        _renderFill: function (t) {
            if (this.fill) {
                if (t.save(), this.fill.gradientTransform) {
                    var e = this.fill.gradientTransform;
                    t.transform.apply(t, e)
                }
                this.fill.toLive && t.translate(-this.width / 2 + this.fill.offsetX || 0, -this.height / 2 + this.fill.offsetY || 0), "evenodd" === this.fillRule ? t.fill("evenodd") : t.fill(), t.restore(), this.shadow && !this.shadow.affectStroke && this._removeShadow(t)
            }
        },
        _renderStroke: function (t) {
            if (this.stroke && 0 !== this.strokeWidth) {
                if (t.save(), this.strokeDashArray)1 & this.strokeDashArray.length && this.strokeDashArray.push.apply(this.strokeDashArray, this.strokeDashArray), s ? (t.setLineDash(this.strokeDashArray), this._stroke && this._stroke(t)) : this._renderDashedStroke && this._renderDashedStroke(t), t.stroke(); else {
                    if (this.stroke.gradientTransform) {
                        var e = this.stroke.gradientTransform;
                        t.transform.apply(t, e)
                    }
                    this._stroke ? this._stroke(t) : t.stroke()
                }
                this._removeShadow(t), t.restore()
            }
        },
        clone: function (t, i) {
            return this.constructor.fromObject ? this.constructor.fromObject(this.toObject(i), t) : new e.Object(this.toObject(i))
        },
        cloneAsImage: function (t) {
            var i = this.toDataURL();
            return e.util.loadImage(i, function (i) {
                t && t(new e.Image(i))
            }), this
        },
        toDataURL: function (t) {
            t || (t = {});
            var i = e.util.createCanvasElement(), n = this.getBoundingRect();
            i.width = n.width, i.height = n.height, e.util.wrapElement(i, "div");
            var r = new e.StaticCanvas(i);
            "jpg" === t.format && (t.format = "jpeg"), "jpeg" === t.format && (r.backgroundColor = "#fff");
            var o = {active: this.get("active"), left: this.getLeft(), top: this.getTop()};
            this.set("active", !1), this.setPositionByOrigin(new e.Point(i.width / 2, i.height / 2), "center", "center");
            var s = this.canvas;
            r.add(this);
            var a = r.toDataURL(t);
            return this.set(o).setCoords(), this.canvas = s, r.dispose(), r = null, a
        },
        isType: function (t) {
            return this.type === t
        },
        complexity: function () {
            return 0
        },
        toJSON: function (t) {
            return this.toObject(t)
        },
        setGradient: function (t, i) {
            i || (i = {});
            var n = {colorStops: []};
            n.type = i.type || (i.r1 || i.r2 ? "radial" : "linear"), n.coords = {
                x1: i.x1,
                y1: i.y1,
                x2: i.x2,
                y2: i.y2
            }, (i.r1 || i.r2) && (n.coords.r1 = i.r1, n.coords.r2 = i.r2);
            for (var r in i.colorStops) {
                var o = new e.Color(i.colorStops[r]);
                n.colorStops.push({offset: r, color: o.toRgb(), opacity: o.getAlpha()})
            }
            return this.set(t, e.Gradient.forObject(this, n))
        },
        setPatternFill: function (t) {
            return this.set("fill", new e.Pattern(t))
        },
        setShadow: function (t) {
            return this.set("shadow", t ? new e.Shadow(t) : null)
        },
        setColor: function (t) {
            return this.set("fill", t), this
        },
        setAngle: function (t) {
            var e = ("center" !== this.originX || "center" !== this.originY) && this.centeredRotation;
            return e && this._setOriginToCenter(), this.set("angle", t), e && this._resetOrigin(), this
        },
        centerH: function () {
            return this.canvas.centerObjectH(this), this
        },
        centerV: function () {
            return this.canvas.centerObjectV(this), this
        },
        center: function () {
            return this.canvas.centerObject(this), this
        },
        remove: function () {
            return this.canvas.remove(this), this
        },
        getLocalPointer: function (t, e) {
            e = e || this.canvas.getPointer(t);
            var i = this.translateToOriginPoint(this.getCenterPoint(), "left", "top");
            return {x: e.x - i.x, y: e.y - i.y}
        },
        _setupCompositeOperation: function (t) {
            this.globalCompositeOperation && (this._prevGlobalCompositeOperation = t.globalCompositeOperation, t.globalCompositeOperation = this.globalCompositeOperation)
        },
        _restoreCompositeOperation: function (t) {
            this.globalCompositeOperation && this._prevGlobalCompositeOperation && (t.globalCompositeOperation = this._prevGlobalCompositeOperation)
        }
    }), e.util.createAccessors(e.Object), e.Object.prototype.rotate = e.Object.prototype.setAngle, i(e.Object.prototype, e.Observable), e.Object.NUM_FRACTION_DIGITS = 2, e.Object.__uid = 0)
}("undefined" != typeof exports ? exports : this), function () {
    var t = fabric.util.degreesToRadians;
    fabric.util.object.extend(fabric.Object.prototype, {
        translateToCenterPoint: function (e, i, n) {
            var r = e.x, o = e.y, s = this.stroke ? this.strokeWidth : 0;
            return "left" === i ? r = e.x + (this.getWidth() + s * this.scaleX) / 2 : "right" === i && (r = e.x - (this.getWidth() + s * this.scaleX) / 2), "top" === n ? o = e.y + (this.getHeight() + s * this.scaleY) / 2 : "bottom" === n && (o = e.y - (this.getHeight() + s * this.scaleY) / 2), fabric.util.rotatePoint(new fabric.Point(r, o), e, t(this.angle))
        }, translateToOriginPoint: function (e, i, n) {
            var r = e.x, o = e.y, s = this.stroke ? this.strokeWidth : 0;
            return "left" === i ? r = e.x - (this.getWidth() + s * this.scaleX) / 2 : "right" === i && (r = e.x + (this.getWidth() + s * this.scaleX) / 2), "top" === n ? o = e.y - (this.getHeight() + s * this.scaleY) / 2 : "bottom" === n && (o = e.y + (this.getHeight() + s * this.scaleY) / 2), fabric.util.rotatePoint(new fabric.Point(r, o), e, t(this.angle))
        }, getCenterPoint: function () {
            var t = new fabric.Point(this.left, this.top);
            return this.translateToCenterPoint(t, this.originX, this.originY)
        }, getPointByOrigin: function (t, e) {
            var i = this.getCenterPoint();
            return this.translateToOriginPoint(i, t, e)
        }, toLocalPoint: function (e, i, n) {
            var r, o, s = this.getCenterPoint(), a = this.stroke ? this.strokeWidth : 0;
            return i && n ? (r = "left" === i ? s.x - (this.getWidth() + a * this.scaleX) / 2 : "right" === i ? s.x + (this.getWidth() + a * this.scaleX) / 2 : s.x, o = "top" === n ? s.y - (this.getHeight() + a * this.scaleY) / 2 : "bottom" === n ? s.y + (this.getHeight() + a * this.scaleY) / 2 : s.y) : (r = this.left, o = this.top), fabric.util.rotatePoint(new fabric.Point(e.x, e.y), s, -t(this.angle)).subtractEquals(new fabric.Point(r, o))
        }, setPositionByOrigin: function (t, e, i) {
            var n = this.translateToCenterPoint(t, e, i), r = this.translateToOriginPoint(n, this.originX, this.originY);
            this.set("left", r.x), this.set("top", r.y)
        }, adjustPosition: function (e) {
            var i = t(this.angle), n = this.getWidth() / 2, r = Math.cos(i) * n, o = Math.sin(i) * n, s = this.getWidth(), a = Math.cos(i) * s, c = Math.sin(i) * s;
            "center" === this.originX && "left" === e || "right" === this.originX && "center" === e ? (this.left -= r, this.top -= o) : "left" === this.originX && "center" === e || "center" === this.originX && "right" === e ? (this.left += r, this.top += o) : "left" === this.originX && "right" === e ? (this.left += a, this.top += c) : "right" === this.originX && "left" === e && (this.left -= a, this.top -= c), this.setCoords(), this.originX = e
        }, _setOriginToCenter: function () {
            this._originalOriginX = this.originX, this._originalOriginY = this.originY;
            var t = this.getCenterPoint();
            this.originX = "center", this.originY = "center", this.left = t.x, this.top = t.y
        }, _resetOrigin: function () {
            var t = this.translateToOriginPoint(this.getCenterPoint(), this._originalOriginX, this._originalOriginY);
            this.originX = this._originalOriginX, this.originY = this._originalOriginY, this.left = t.x, this.top = t.y, this._originalOriginX = null, this._originalOriginY = null
        }, _getLeftTopCoords: function () {
            return this.translateToOriginPoint(this.getCenterPoint(), "left", "center")
        }
    })
}(), function () {
    var t = fabric.util.degreesToRadians;
    fabric.util.object.extend(fabric.Object.prototype, {
        oCoords: null, intersectsWithRect: function (t, e) {
            var i = this.oCoords, n = new fabric.Point(i.tl.x, i.tl.y), r = new fabric.Point(i.tr.x, i.tr.y), o = new fabric.Point(i.bl.x, i.bl.y), s = new fabric.Point(i.br.x, i.br.y), a = fabric.Intersection.intersectPolygonRectangle([n, r, s, o], t, e);
            return "Intersection" === a.status
        }, intersectsWithObject: function (t) {
            function e(t) {
                return {
                    tl: new fabric.Point(t.tl.x, t.tl.y),
                    tr: new fabric.Point(t.tr.x, t.tr.y),
                    bl: new fabric.Point(t.bl.x, t.bl.y),
                    br: new fabric.Point(t.br.x, t.br.y)
                }
            }

            var i = e(this.oCoords), n = e(t.oCoords), r = fabric.Intersection.intersectPolygonPolygon([i.tl, i.tr, i.br, i.bl], [n.tl, n.tr, n.br, n.bl]);
            return "Intersection" === r.status
        }, isContainedWithinObject: function (t) {
            var e = t.getBoundingRect(), i = new fabric.Point(e.left, e.top), n = new fabric.Point(e.left + e.width, e.top + e.height);
            return this.isContainedWithinRect(i, n)
        }, isContainedWithinRect: function (t, e) {
            var i = this.getBoundingRect();
            return i.left >= t.x && i.left + i.width <= e.x && i.top >= t.y && i.top + i.height <= e.y
        }, containsPoint: function (t) {
            var e = this._getImageLines(this.oCoords), i = this._findCrossPoints(t, e);
            return 0 !== i && i % 2 === 1
        }, _getImageLines: function (t) {
            return {
                topline: {o: t.tl, d: t.tr},
                rightline: {o: t.tr, d: t.br},
                bottomline: {o: t.br, d: t.bl},
                leftline: {o: t.bl, d: t.tl}
            }
        }, _findCrossPoints: function (t, e) {
            var i, n, r, o, s, a, c, l = 0;
            for (var h in e)if (c = e[h], !(c.o.y < t.y && c.d.y < t.y || c.o.y >= t.y && c.d.y >= t.y || (c.o.x === c.d.x && c.o.x >= t.x ? (s = c.o.x, a = t.y) : (i = 0, n = (c.d.y - c.o.y) / (c.d.x - c.o.x), r = t.y - i * t.x, o = c.o.y - n * c.o.x, s = -(r - o) / (i - n), a = r + i * s), s >= t.x && (l += 1), 2 !== l)))break;
            return l
        }, getBoundingRectWidth: function () {
            return this.getBoundingRect().width
        }, getBoundingRectHeight: function () {
            return this.getBoundingRect().height
        }, getBoundingRect: function () {
            this.oCoords || this.setCoords();
            var t = [this.oCoords.tl.x, this.oCoords.tr.x, this.oCoords.br.x, this.oCoords.bl.x], e = fabric.util.array.min(t), i = fabric.util.array.max(t), n = Math.abs(e - i), r = [this.oCoords.tl.y, this.oCoords.tr.y, this.oCoords.br.y, this.oCoords.bl.y], o = fabric.util.array.min(r), s = fabric.util.array.max(r), a = Math.abs(o - s);
            return {left: e, top: o, width: n, height: a}
        }, getWidth: function () {
            return this.width * this.scaleX
        }, getHeight: function () {
            return this.height * this.scaleY
        }, _constrainScale: function (t) {
            return Math.abs(t) < this.minScaleLimit ? 0 > t ? -this.minScaleLimit : this.minScaleLimit : t
        }, scale: function (t) {
            return t = this._constrainScale(t), 0 > t && (this.flipX = !this.flipX, this.flipY = !this.flipY, t *= -1), this.scaleX = t, this.scaleY = t, this.setCoords(), this
        }, scaleToWidth: function (t) {
            var e = this.getBoundingRectWidth() / this.getWidth();
            return this.scale(t / this.width / e)
        }, scaleToHeight: function (t) {
            var e = this.getBoundingRectHeight() / this.getHeight();
            return this.scale(t / this.height / e)
        }, setCoords: function () {
            var e = t(this.angle), i = this.getViewportTransform(), n = function (t) {
                return fabric.util.transformPoint(t, i)
            }, r = this._calculateCurrentDimensions(!1), o = r.x, s = r.y;
            0 > o && (o = Math.abs(o));
            var a = Math.sqrt(Math.pow(o / 2, 2) + Math.pow(s / 2, 2)), c = Math.atan(isFinite(s / o) ? s / o : 0), l = Math.cos(c + e) * a, h = Math.sin(c + e) * a, u = Math.sin(e), f = Math.cos(e), d = this.getCenterPoint(), g = new fabric.Point(o, s), p = new fabric.Point(d.x - l, d.y - h), v = new fabric.Point(p.x + g.x * f, p.y + g.x * u), m = n(new fabric.Point(p.x - g.y * u, p.y + g.y * f)), y = n(new fabric.Point(v.x - g.y * u, v.y + g.y * f)), b = n(p), _ = n(v), x = new fabric.Point((b.x + m.x) / 2, (b.y + m.y) / 2), C = new fabric.Point((_.x + b.x) / 2, (_.y + b.y) / 2), w = new fabric.Point((y.x + _.x) / 2, (y.y + _.y) / 2), j = new fabric.Point((y.x + m.x) / 2, (y.y + m.y) / 2), T = new fabric.Point(C.x + u * this.rotatingPointOffset, C.y - f * this.rotatingPointOffset);
            return this.oCoords = {
                tl: b,
                tr: _,
                br: y,
                bl: m,
                ml: x,
                mt: C,
                mr: w,
                mb: j,
                mtr: T
            }, this._setCornerCoords && this._setCornerCoords(), this
        }
    })
}(), fabric.util.object.extend(fabric.Object.prototype, {
    sendToBack: function () {
        return this.group ? fabric.StaticCanvas.prototype.sendToBack.call(this.group, this) : this.canvas.sendToBack(this), this
    }, bringToFront: function () {
        return this.group ? fabric.StaticCanvas.prototype.bringToFront.call(this.group, this) : this.canvas.bringToFront(this), this
    }, sendBackwards: function (t) {
        return this.group ? fabric.StaticCanvas.prototype.sendBackwards.call(this.group, this, t) : this.canvas.sendBackwards(this, t), this
    }, bringForward: function (t) {
        return this.group ? fabric.StaticCanvas.prototype.bringForward.call(this.group, this, t) : this.canvas.bringForward(this, t), this
    }, moveTo: function (t) {
        return this.group ? fabric.StaticCanvas.prototype.moveTo.call(this.group, this, t) : this.canvas.moveTo(this, t), this
    }
}), fabric.util.object.extend(fabric.Object.prototype, {
    getSvgStyles: function () {
        var t = this.fill ? this.fill.toLive ? "url(#SVGID_" + this.fill.id + ")" : this.fill : "none", e = this.fillRule, i = this.stroke ? this.stroke.toLive ? "url(#SVGID_" + this.stroke.id + ")" : this.stroke : "none", n = this.strokeWidth ? this.strokeWidth : "0", r = this.strokeDashArray ? this.strokeDashArray.join(" ") : "", o = this.strokeLineCap ? this.strokeLineCap : "butt", s = this.strokeLineJoin ? this.strokeLineJoin : "miter", a = this.strokeMiterLimit ? this.strokeMiterLimit : "4", c = "undefined" != typeof this.opacity ? this.opacity : "1", l = this.visible ? "" : " visibility: hidden;", h = this.shadow ? "filter: url(#SVGID_" + this.shadow.id + ");" : "";
        return ["stroke: ", i, "; ", "stroke-width: ", n, "; ", "stroke-dasharray: ", r, "; ", "stroke-linecap: ", o, "; ", "stroke-linejoin: ", s, "; ", "stroke-miterlimit: ", a, "; ", "fill: ", t, "; ", "fill-rule: ", e, "; ", "opacity: ", c, ";", h, l].join("")
    }, getSvgTransform: function () {
        if (this.group && "path-group" === this.group.type)return "";
        var t = fabric.util.toFixed, e = this.getAngle(), i = !this.canvas || this.canvas.svgViewportTransformation ? this.getViewportTransform() : [1, 0, 0, 1, 0, 0], n = fabric.util.transformPoint(this.getCenterPoint(), i), r = fabric.Object.NUM_FRACTION_DIGITS, o = "path-group" === this.type ? "" : "translate(" + t(n.x, r) + " " + t(n.y, r) + ")", s = 0 !== e ? " rotate(" + t(e, r) + ")" : "", a = 1 === this.scaleX && 1 === this.scaleY && 1 === i[0] && 1 === i[3] ? "" : " scale(" + t(this.scaleX * i[0], r) + " " + t(this.scaleY * i[3], r) + ")", c = "path-group" === this.type ? this.width * i[0] : 0, l = this.flipX ? " matrix(-1 0 0 1 " + c + " 0) " : "", h = "path-group" === this.type ? this.height * i[3] : 0, u = this.flipY ? " matrix(1 0 0 -1 0 " + h + ")" : "";
        return [o, s, a, l, u].join("")
    }, getSvgTransformMatrix: function () {
        return this.transformMatrix ? " matrix(" + this.transformMatrix.join(" ") + ") " : ""
    }, _createBaseSVGMarkup: function () {
        var t = [];
        return this.fill && this.fill.toLive && t.push(this.fill.toSVG(this, !1)), this.stroke && this.stroke.toLive && t.push(this.stroke.toSVG(this, !1)), this.shadow && t.push(this.shadow.toSVG(this)), t
    }
}), fabric.util.object.extend(fabric.Object.prototype, {
    hasStateChanged: function () {
        return this.stateProperties.some(function (t) {
            return this.get(t) !== this.originalState[t]
        }, this)
    }, saveState: function (t) {
        return this.stateProperties.forEach(function (t) {
            this.originalState[t] = this.get(t)
        }, this), t && t.stateProperties && t.stateProperties.forEach(function (t) {
            this.originalState[t] = this.get(t)
        }, this), this
    }, setupState: function () {
        return this.originalState = {}, this.saveState(), this
    }
}), function () {
    var t = fabric.util.degreesToRadians, e = function () {
        return "undefined" != typeof G_vmlCanvasManager
    };
    fabric.util.object.extend(fabric.Object.prototype, {
        _controlsVisibility: null, _findTargetCorner: function (t) {
            if (!this.hasControls || !this.active)return !1;
            var e, i, n = t.x, r = t.y;
            for (var o in this.oCoords)if (this.isControlVisible(o) && ("mtr" !== o || this.hasRotatingPoint) && (!this.get("lockUniScaling") || "mt" !== o && "mr" !== o && "mb" !== o && "ml" !== o) && (i = this._getImageLines(this.oCoords[o].corner), e = this._findCrossPoints({
                    x: n,
                    y: r
                }, i), 0 !== e && e % 2 === 1))return this.__corner = o, o;
            return !1
        }, _setCornerCoords: function () {
            var e, i, n = this.oCoords, r = t(45 - this.angle), o = Math.sqrt(2 * Math.pow(this.cornerSize, 2)) / 2, s = o * Math.cos(r), a = o * Math.sin(r);
            for (var c in n)e = n[c].x, i = n[c].y, n[c].corner = {
                tl: {x: e - a, y: i - s},
                tr: {x: e + s, y: i - a},
                bl: {x: e - s, y: i + a},
                br: {x: e + a, y: i + s}
            }
        }, _calculateCurrentDimensions: function (t) {
            var e = this.getViewportTransform(), i = this.strokeWidth, n = this.width, r = this.height, o = "round" === this.strokeLineCap || "square" === this.strokeLineCap, s = "line" === this.type && 0 === this.width, a = "line" === this.type && 0 === this.height, c = s || a, l = o && a || !c, h = o && s || !c;
            return s ? n = i : a && (r = i), l && (n += 0 > n ? -i : i), h && (r += 0 > r ? -i : i), n = n * this.scaleX + 2 * this.padding, r = r * this.scaleY + 2 * this.padding, t ? fabric.util.transformPoint(new fabric.Point(n, r), e, !0) : {
                x: n,
                y: r
            }
        }, drawBorders: function (t) {
            if (!this.hasBorders)return this;
            t.save(), t.globalAlpha = this.isMoving ? this.borderOpacityWhenMoving : 1, t.strokeStyle = this.borderColor, t.lineWidth = 1 / this.borderScaleFactor;
            var e = this._calculateCurrentDimensions(!0), i = e.x, n = e.y;
            if (this.group && (i *= this.group.scaleX, n *= this.group.scaleY), t.strokeRect(~~-(i / 2) - .5, ~~-(n / 2) - .5, ~~i + 1, ~~n + 1), this.hasRotatingPoint && this.isControlVisible("mtr") && !this.get("lockRotation") && this.hasControls) {
                var r = -n / 2;
                t.beginPath(), t.moveTo(0, r), t.lineTo(0, r - this.rotatingPointOffset), t.closePath(), t.stroke()
            }
            return t.restore(), this
        }, drawControls: function (t) {
            if (!this.hasControls)return this;
            var e = this._calculateCurrentDimensions(!0), i = e.x, n = e.y, r = -(i / 2), o = -(n / 2), s = this.cornerSize / 2, a = this.transparentCorners ? "strokeRect" : "fillRect";
            return t.save(), t.lineWidth = 1, t.globalAlpha = this.isMoving ? this.borderOpacityWhenMoving : 1, t.strokeStyle = t.fillStyle = this.cornerColor, this._drawControl("tl", t, a, r - s, o - s), this._drawControl("tr", t, a, r + i - s, o - s), this._drawControl("bl", t, a, r - s, o + n - s), this._drawControl("br", t, a, r + i - s, o + n - s), this.get("lockUniScaling") || (this._drawControl("mt", t, a, r + i / 2 - s, o - s), this._drawControl("mb", t, a, r + i / 2 - s, o + n - s), this._drawControl("mr", t, a, r + i - s, o + n / 2 - s), this._drawControl("ml", t, a, r - s, o + n / 2 - s)), this.hasRotatingPoint && this._drawControl("mtr", t, a, r + i / 2 - s, o - this.rotatingPointOffset - s), t.restore(), this
        }, _drawControl: function (t, i, n, r, o) {
            if (this.isControlVisible(t)) {
                var s = this.cornerSize;
                e() || this.transparentCorners || i.clearRect(r, o, s, s), i[n](r, o, s, s)
            }
        }, isControlVisible: function (t) {
            return this._getControlsVisibility()[t]
        }, setControlVisible: function (t, e) {
            return this._getControlsVisibility()[t] = e, this
        }, setControlsVisibility: function (t) {
            t || (t = {});
            for (var e in t)this.setControlVisible(e, t[e]);
            return this
        }, _getControlsVisibility: function () {
            return this._controlsVisibility || (this._controlsVisibility = {
                tl: !0,
                tr: !0,
                br: !0,
                bl: !0,
                ml: !0,
                mt: !0,
                mr: !0,
                mb: !0,
                mtr: !0
            }), this._controlsVisibility
        }
    })
}(), function (t) {
    "use strict";
    function e(t, e) {
        var i = t.origin, n = t.axis1, r = t.axis2, o = t.dimension, s = e.nearest, a = e.center, c = e.farthest;
        return function () {
            switch (this.get(i)) {
                case s:
                    return Math.min(this.get(n), this.get(r));
                case a:
                    return Math.min(this.get(n), this.get(r)) + .5 * this.get(o);
                case c:
                    return Math.max(this.get(n), this.get(r))
            }
        }
    }

    var i = t.fabric || (t.fabric = {}), n = i.util.object.extend, r = {
        x1: 1,
        x2: 1,
        y1: 1,
        y2: 1
    }, o = i.StaticCanvas.supports("setLineDash");
    return i.Line ? void i.warn("fabric.Line is already defined") : (i.Line = i.util.createClass(i.Object, {
        type: "line",
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 0,
        initialize: function (t, e) {
            e = e || {}, t || (t = [0, 0, 0, 0]), this.callSuper("initialize", e), this.set("x1", t[0]), this.set("y1", t[1]), this.set("x2", t[2]), this.set("y2", t[3]), this._setWidthHeight(e)
        },
        _setWidthHeight: function (t) {
            t || (t = {}), this.width = Math.abs(this.x2 - this.x1), this.height = Math.abs(this.y2 - this.y1), this.left = "left" in t ? t.left : this._getLeftToOriginX(), this.top = "top" in t ? t.top : this._getTopToOriginY()
        },
        _set: function (t, e) {
            return this.callSuper("_set", t, e), "undefined" != typeof r[t] && this._setWidthHeight(), this
        },
        _getLeftToOriginX: e({origin: "originX", axis1: "x1", axis2: "x2", dimension: "width"}, {
            nearest: "left",
            center: "center",
            farthest: "right"
        }),
        _getTopToOriginY: e({origin: "originY", axis1: "y1", axis2: "y2", dimension: "height"}, {
            nearest: "top",
            center: "center",
            farthest: "bottom"
        }),
        _render: function (t, e) {
            if (t.beginPath(), e) {
                var i = this.getCenterPoint();
                t.translate(i.x - this.strokeWidth / 2, i.y - this.strokeWidth / 2)
            }
            if (!this.strokeDashArray || this.strokeDashArray && o) {
                var n = this.calcLinePoints();
                t.moveTo(n.x1, n.y1), t.lineTo(n.x2, n.y2)
            }
            t.lineWidth = this.strokeWidth;
            var r = t.strokeStyle;
            t.strokeStyle = this.stroke || t.fillStyle, this.stroke && this._renderStroke(t), t.strokeStyle = r
        },
        _renderDashedStroke: function (t) {
            var e = this.calcLinePoints();
            t.beginPath(), i.util.drawDashedLine(t, e.x1, e.y1, e.x2, e.y2, this.strokeDashArray), t.closePath()
        },
        toObject: function (t) {
            return n(this.callSuper("toObject", t), this.calcLinePoints())
        },
        calcLinePoints: function () {
            var t = this.x1 <= this.x2 ? -1 : 1, e = this.y1 <= this.y2 ? -1 : 1, i = t * this.width * .5, n = e * this.height * .5, r = t * this.width * -.5, o = e * this.height * -.5;
            return {x1: i, x2: r, y1: n, y2: o}
        },
        toSVG: function (t) {
            var e = this._createBaseSVGMarkup(), i = {x1: this.x1, x2: this.x2, y1: this.y1, y2: this.y2};
            return this.group && "path-group" === this.group.type || (i = this.calcLinePoints()), e.push("<line ", 'x1="', i.x1, '" y1="', i.y1, '" x2="', i.x2, '" y2="', i.y2, '" style="', this.getSvgStyles(), '" transform="', this.getSvgTransform(), this.getSvgTransformMatrix(), '"/>\n'), t ? t(e.join("")) : e.join("")
        },
        complexity: function () {
            return 1
        }
    }), i.Line.ATTRIBUTE_NAMES = i.SHARED_ATTRIBUTES.concat("x1 y1 x2 y2".split(" ")), i.Line.fromElement = function (t, e) {
        var r = i.parseAttributes(t, i.Line.ATTRIBUTE_NAMES), o = [r.x1 || 0, r.y1 || 0, r.x2 || 0, r.y2 || 0];
        return new i.Line(o, n(r, e))
    }, void(i.Line.fromObject = function (t) {
        var e = [t.x1, t.y1, t.x2, t.y2];
        return new i.Line(e, t)
    }))
}("undefined" != typeof exports ? exports : this), function (t) {
    "use strict";
    function e(t) {
        return "radius" in t && t.radius >= 0
    }

    var i = t.fabric || (t.fabric = {}), n = Math.PI, r = i.util.object.extend;
    return i.Circle ? void i.warn("fabric.Circle is already defined.") : (i.Circle = i.util.createClass(i.Object, {
        type: "circle",
        radius: 0,
        startAngle: 0,
        endAngle: 2 * n,
        initialize: function (t) {
            t = t || {}, this.callSuper("initialize", t), this.set("radius", t.radius || 0), this.startAngle = t.startAngle || this.startAngle, this.endAngle = t.endAngle || this.endAngle
        },
        _set: function (t, e) {
            return this.callSuper("_set", t, e), "radius" === t && this.setRadius(e), this
        },
        toObject: function (t) {
            return r(this.callSuper("toObject", t), {
                radius: this.get("radius"),
                startAngle: this.startAngle,
                endAngle: this.endAngle
            })
        },
        toSVG: function (t) {
            var e = this._createBaseSVGMarkup(), i = 0, r = 0, o = (this.endAngle - this.startAngle) % (2 * n);
            if (0 === o)this.group && "path-group" === this.group.type && (i = this.left + this.radius, r = this.top + this.radius), e.push("<circle ", 'cx="' + i + '" cy="' + r + '" ', 'r="', this.radius, '" style="', this.getSvgStyles(), '" transform="', this.getSvgTransform(), " ", this.getSvgTransformMatrix(), '"/>\n'); else {
                var s = Math.cos(this.startAngle) * this.radius, a = Math.sin(this.startAngle) * this.radius, c = Math.cos(this.endAngle) * this.radius, l = Math.sin(this.endAngle) * this.radius, h = o > n ? "1" : "0";
                e.push('<path d="M ' + s + " " + a, " A " + this.radius + " " + this.radius, " 0 ", +h + " 1", " " + c + " " + l, '" style="', this.getSvgStyles(), '" transform="', this.getSvgTransform(), " ", this.getSvgTransformMatrix(), '"/>\n')
            }
            return t ? t(e.join("")) : e.join("")
        },
        _render: function (t, e) {
            t.beginPath(), t.arc(e ? this.left + this.radius : 0, e ? this.top + this.radius : 0, this.radius, this.startAngle, this.endAngle, !1), this._renderFill(t), this._renderStroke(t)
        },
        getRadiusX: function () {
            return this.get("radius") * this.get("scaleX")
        },
        getRadiusY: function () {
            return this.get("radius") * this.get("scaleY")
        },
        setRadius: function (t) {
            this.radius = t, this.set("width", 2 * t).set("height", 2 * t)
        },
        complexity: function () {
            return 1
        }
    }), i.Circle.ATTRIBUTE_NAMES = i.SHARED_ATTRIBUTES.concat("cx cy r".split(" ")), i.Circle.fromElement = function (t, n) {
        n || (n = {});
        var o = i.parseAttributes(t, i.Circle.ATTRIBUTE_NAMES);
        if (!e(o))throw new Error("value of `r` attribute is required and can not be negative");
        o.left = o.left || 0, o.top = o.top || 0;
        var s = new i.Circle(r(o, n));
        return s.left -= s.radius, s.top -= s.radius, s
    }, void(i.Circle.fromObject = function (t) {
        return new i.Circle(t)
    }))
}("undefined" != typeof exports ? exports : this), function (t) {
    "use strict";
    var e = t.fabric || (t.fabric = {});
    return e.Triangle ? void e.warn("fabric.Triangle is already defined") : (e.Triangle = e.util.createClass(e.Object, {
        type: "triangle",
        initialize: function (t) {
            t = t || {}, this.callSuper("initialize", t), this.set("width", t.width || 100).set("height", t.height || 100)
        },
        _render: function (t) {
            var e = this.width / 2, i = this.height / 2;
            t.beginPath(), t.moveTo(-e, i), t.lineTo(0, -i), t.lineTo(e, i), t.closePath(), this._renderFill(t), this._renderStroke(t)
        },
        _renderDashedStroke: function (t) {
            var i = this.width / 2, n = this.height / 2;
            t.beginPath(), e.util.drawDashedLine(t, -i, n, 0, -n, this.strokeDashArray), e.util.drawDashedLine(t, 0, -n, i, n, this.strokeDashArray), e.util.drawDashedLine(t, i, n, -i, n, this.strokeDashArray), t.closePath()
        },
        toSVG: function (t) {
            var e = this._createBaseSVGMarkup(), i = this.width / 2, n = this.height / 2, r = [-i + " " + n, "0 " + -n, i + " " + n].join(",");
            return e.push("<polygon ", 'points="', r, '" style="', this.getSvgStyles(), '" transform="', this.getSvgTransform(), '"/>'), t ? t(e.join("")) : e.join("")
        },
        complexity: function () {
            return 1
        }
    }), void(e.Triangle.fromObject = function (t) {
        return new e.Triangle(t)
    }))
}("undefined" != typeof exports ? exports : this), function (t) {
    "use strict";
    var e = t.fabric || (t.fabric = {}), i = 2 * Math.PI, n = e.util.object.extend;
    return e.Ellipse ? void e.warn("fabric.Ellipse is already defined.") : (e.Ellipse = e.util.createClass(e.Object, {
        type: "ellipse",
        rx: 0,
        ry: 0,
        initialize: function (t) {
            t = t || {}, this.callSuper("initialize", t), this.set("rx", t.rx || 0), this.set("ry", t.ry || 0)
        },
        _set: function (t, e) {
            switch (this.callSuper("_set", t, e), t) {
                case"rx":
                    this.rx = e, this.set("width", 2 * e);
                    break;
                case"ry":
                    this.ry = e, this.set("height", 2 * e)
            }
            return this
        },
        getRx: function () {
            return this.get("rx") * this.get("scaleX")
        },
        getRy: function () {
            return this.get("ry") * this.get("scaleY")
        },
        toObject: function (t) {
            return n(this.callSuper("toObject", t), {rx: this.get("rx"), ry: this.get("ry")})
        },
        toSVG: function (t) {
            var e = this._createBaseSVGMarkup(), i = 0, n = 0;
            return this.group && "path-group" === this.group.type && (i = this.left + this.rx, n = this.top + this.ry), e.push("<ellipse ", 'cx="', i, '" cy="', n, '" ', 'rx="', this.rx, '" ry="', this.ry, '" style="', this.getSvgStyles(), '" transform="', this.getSvgTransform(), this.getSvgTransformMatrix(), '"/>\n'), t ? t(e.join("")) : e.join("")
        },
        _render: function (t, e) {
            t.beginPath(), t.save(), t.transform(1, 0, 0, this.ry / this.rx, 0, 0), t.arc(e ? this.left + this.rx : 0, e ? (this.top + this.ry) * this.rx / this.ry : 0, this.rx, 0, i, !1), t.restore(), this._renderFill(t), this._renderStroke(t)
        },
        complexity: function () {
            return 1
        }
    }), e.Ellipse.ATTRIBUTE_NAMES = e.SHARED_ATTRIBUTES.concat("cx cy rx ry".split(" ")), e.Ellipse.fromElement = function (t, i) {
        i || (i = {});
        var r = e.parseAttributes(t, e.Ellipse.ATTRIBUTE_NAMES);
        r.left = r.left || 0, r.top = r.top || 0;
        var o = new e.Ellipse(n(r, i));
        return o.top -= o.ry, o.left -= o.rx, o
    }, void(e.Ellipse.fromObject = function (t) {
        return new e.Ellipse(t)
    }))
}("undefined" != typeof exports ? exports : this), function (t) {
    "use strict";
    var e = t.fabric || (t.fabric = {}), i = e.util.object.extend;
    if (e.Rect)return void console.warn("fabric.Rect is already defined");
    var n = e.Object.prototype.stateProperties.concat();
    n.push("rx", "ry", "x", "y"), e.Rect = e.util.createClass(e.Object, {
        stateProperties: n,
        type: "rect",
        rx: 0,
        ry: 0,
        strokeDashArray: null,
        initialize: function (t) {
            t = t || {}, this.callSuper("initialize", t), this._initRxRy()
        },
        _initRxRy: function () {
            this.rx && !this.ry ? this.ry = this.rx : this.ry && !this.rx && (this.rx = this.ry)
        },
        _render: function (t, e) {
            if (1 === this.width && 1 === this.height)return void t.fillRect(0, 0, 1, 1);
            var i = this.rx ? Math.min(this.rx, this.width / 2) : 0, n = this.ry ? Math.min(this.ry, this.height / 2) : 0, r = this.width, o = this.height, s = e ? this.left : -this.width / 2, a = e ? this.top : -this.height / 2, c = 0 !== i || 0 !== n, l = .4477152502;
            t.beginPath(), t.moveTo(s + i, a), t.lineTo(s + r - i, a), c && t.bezierCurveTo(s + r - l * i, a, s + r, a + l * n, s + r, a + n), t.lineTo(s + r, a + o - n), c && t.bezierCurveTo(s + r, a + o - l * n, s + r - l * i, a + o, s + r - i, a + o), t.lineTo(s + i, a + o), c && t.bezierCurveTo(s + l * i, a + o, s, a + o - l * n, s, a + o - n), t.lineTo(s, a + n), c && t.bezierCurveTo(s, a + l * n, s + l * i, a, s + i, a), t.closePath(), this._renderFill(t), this._renderStroke(t)
        },
        _renderDashedStroke: function (t) {
            var i = -this.width / 2, n = -this.height / 2, r = this.width, o = this.height;
            t.beginPath(), e.util.drawDashedLine(t, i, n, i + r, n, this.strokeDashArray), e.util.drawDashedLine(t, i + r, n, i + r, n + o, this.strokeDashArray), e.util.drawDashedLine(t, i + r, n + o, i, n + o, this.strokeDashArray), e.util.drawDashedLine(t, i, n + o, i, n, this.strokeDashArray), t.closePath()
        },
        toObject: function (t) {
            var e = i(this.callSuper("toObject", t), {rx: this.get("rx") || 0, ry: this.get("ry") || 0});
            return this.includeDefaultValues || this._removeDefaultValues(e), e
        },
        toSVG: function (t) {
            var e = this._createBaseSVGMarkup(), i = this.left, n = this.top;
            return this.group && "path-group" === this.group.type || (i = -this.width / 2, n = -this.height / 2), e.push("<rect ", 'x="', i, '" y="', n, '" rx="', this.get("rx"), '" ry="', this.get("ry"), '" width="', this.width, '" height="', this.height, '" style="', this.getSvgStyles(), '" transform="', this.getSvgTransform(), this.getSvgTransformMatrix(), '"/>\n'), t ? t(e.join("")) : e.join("")
        },
        complexity: function () {
            return 1
        }
    }), e.Rect.ATTRIBUTE_NAMES = e.SHARED_ATTRIBUTES.concat("x y rx ry width height".split(" ")), e.Rect.fromElement = function (t, n) {
        if (!t)return null;
        n = n || {};
        var r = e.parseAttributes(t, e.Rect.ATTRIBUTE_NAMES);
        r.left = r.left || 0, r.top = r.top || 0;
        var o = new e.Rect(i(n ? e.util.object.clone(n) : {}, r));
        return o.visible = o.width > 0 && o.height > 0, o
    }, e.Rect.fromObject = function (t) {
        return new e.Rect(t)
    }
}("undefined" != typeof exports ? exports : this), function (t) {
    "use strict";
    var e = t.fabric || (t.fabric = {});
    return e.Polyline ? void e.warn("fabric.Polyline is already defined") : (e.Polyline = e.util.createClass(e.Object, {
        type: "polyline",
        points: null,
        minX: 0,
        minY: 0,
        initialize: function (t, i) {
            return e.Polygon.prototype.initialize.call(this, t, i)
        },
        _calcDimensions: function () {
            return e.Polygon.prototype._calcDimensions.call(this)
        },
        _applyPointOffset: function () {
            return e.Polygon.prototype._applyPointOffset.call(this)
        },
        toObject: function (t) {
            return e.Polygon.prototype.toObject.call(this, t)
        },
        toSVG: function (t) {
            return e.Polygon.prototype.toSVG.call(this, t)
        },
        _render: function (t) {
            e.Polygon.prototype.commonRender.call(this, t) && (this._renderFill(t), this._renderStroke(t))
        },
        _renderDashedStroke: function (t) {
            var i, n;
            t.beginPath();
            for (var r = 0, o = this.points.length; o > r; r++)i = this.points[r], n = this.points[r + 1] || i, e.util.drawDashedLine(t, i.x, i.y, n.x, n.y, this.strokeDashArray)
        },
        complexity: function () {
            return this.get("points").length
        }
    }), e.Polyline.ATTRIBUTE_NAMES = e.SHARED_ATTRIBUTES.concat(), e.Polyline.fromElement = function (t, i) {
        if (!t)return null;
        i || (i = {});
        var n = e.parsePointsAttribute(t.getAttribute("points")), r = e.parseAttributes(t, e.Polyline.ATTRIBUTE_NAMES);
        return new e.Polyline(n, e.util.object.extend(r, i))
    }, void(e.Polyline.fromObject = function (t) {
        var i = t.points;
        return new e.Polyline(i, t, !0)
    }))
}("undefined" != typeof exports ? exports : this), function (t) {
    "use strict";
    var e = t.fabric || (t.fabric = {}), i = e.util.object.extend, n = e.util.array.min, r = e.util.array.max, o = e.util.toFixed;
    return e.Polygon ? void e.warn("fabric.Polygon is already defined") : (e.Polygon = e.util.createClass(e.Object, {
        type: "polygon",
        points: null,
        minX: 0,
        minY: 0,
        initialize: function (t, e) {
            e = e || {}, this.points = t || [], this.callSuper("initialize", e), this._calcDimensions(), "top" in e || (this.top = this.minY), "left" in e || (this.left = this.minX)
        },
        _calcDimensions: function () {
            var t = this.points, e = n(t, "x"), i = n(t, "y"), o = r(t, "x"), s = r(t, "y");
            this.width = o - e || 0, this.height = s - i || 0, this.minX = e || 0, this.minY = i || 0
        },
        _applyPointOffset: function () {
            this.points.forEach(function (t) {
                t.x -= this.minX + this.width / 2, t.y -= this.minY + this.height / 2
            }, this)
        },
        toObject: function (t) {
            return i(this.callSuper("toObject", t), {points: this.points.concat()})
        },
        toSVG: function (t) {
            for (var e = [], i = this._createBaseSVGMarkup(), n = 0, r = this.points.length; r > n; n++)e.push(o(this.points[n].x, 2), ",", o(this.points[n].y, 2), " ");
            return i.push("<", this.type, " ", 'points="', e.join(""), '" style="', this.getSvgStyles(), '" transform="', this.getSvgTransform(), " ", this.getSvgTransformMatrix(), '"/>\n'), t ? t(i.join("")) : i.join("")
        },
        _render: function (t) {
            this.commonRender(t) && (this._renderFill(t), (this.stroke || this.strokeDashArray) && (t.closePath(), this._renderStroke(t)))
        },
        commonRender: function (t) {
            var e, i = this.points.length;
            if (!i || isNaN(this.points[i - 1].y))return !1;
            t.beginPath(), this._applyPointOffset && (this.group && "path-group" === this.group.type || this._applyPointOffset(), this._applyPointOffset = null), t.moveTo(this.points[0].x, this.points[0].y);
            for (var n = 0; i > n; n++)e = this.points[n], t.lineTo(e.x, e.y);
            return !0
        },
        _renderDashedStroke: function (t) {
            e.Polyline.prototype._renderDashedStroke.call(this, t), t.closePath()
        },
        complexity: function () {
            return this.points.length
        }
    }), e.Polygon.ATTRIBUTE_NAMES = e.SHARED_ATTRIBUTES.concat(), e.Polygon.fromElement = function (t, n) {
        if (!t)return null;
        n || (n = {});
        var r = e.parsePointsAttribute(t.getAttribute("points")), o = e.parseAttributes(t, e.Polygon.ATTRIBUTE_NAMES);
        return new e.Polygon(r, i(o, n))
    }, void(e.Polygon.fromObject = function (t) {
        return new e.Polygon(t.points, t, !0)
    }))
}("undefined" != typeof exports ? exports : this), function (t) {
    "use strict";
    var e = t.fabric || (t.fabric = {}), i = e.util.array.min, n = e.util.array.max, r = e.util.object.extend, o = Object.prototype.toString, s = e.util.drawArc, a = {
        m: 2,
        l: 2,
        h: 1,
        v: 1,
        c: 6,
        s: 4,
        q: 4,
        t: 2,
        a: 7
    }, c = {m: "l", M: "L"};
    return e.Path ? void e.warn("fabric.Path is already defined") : (e.Path = e.util.createClass(e.Object, {
        type: "path",
        path: null,
        minX: 0,
        minY: 0,
        initialize: function (t, e) {
            if (e = e || {}, this.setOptions(e), !t)throw new Error("`path` argument is required");
            var i = "[object Array]" === o.call(t);
            this.path = i ? t : t.match && t.match(/[mzlhvcsqta][^mzlhvcsqta]*/gi), this.path && (i || (this.path = this._parsePath()), this._setPositionDimensions(), e.sourcePath && this.setSourcePath(e.sourcePath))
        },
        _setPositionDimensions: function () {
            var t = this._parseDimensions();
            this.minX = t.left, this.minY = t.top, this.width = t.width, this.height = t.height, t.left += "center" === this.originX ? this.width / 2 : "right" === this.originX ? this.width : 0, t.top += "center" === this.originY ? this.height / 2 : "bottom" === this.originY ? this.height : 0, this.top = this.top || t.top, this.left = this.left || t.left, this.pathOffset = this.pathOffset || {
                    x: this.minX + this.width / 2,
                    y: this.minY + this.height / 2
                }
        },
        _render: function (t) {
            var e, i, n, r = null, o = 0, a = 0, c = 0, l = 0, h = 0, u = 0, f = -this.pathOffset.x, d = -this.pathOffset.y;
            this.group && "path-group" === this.group.type && (f = 0, d = 0), t.beginPath();
            for (var g = 0, p = this.path.length; p > g; ++g) {
                switch (e = this.path[g], e[0]) {
                    case"l":
                        c += e[1], l += e[2], t.lineTo(c + f, l + d);
                        break;
                    case"L":
                        c = e[1], l = e[2], t.lineTo(c + f, l + d);
                        break;
                    case"h":
                        c += e[1], t.lineTo(c + f, l + d);
                        break;
                    case"H":
                        c = e[1], t.lineTo(c + f, l + d);
                        break;
                    case"v":
                        l += e[1], t.lineTo(c + f, l + d);
                        break;
                    case"V":
                        l = e[1], t.lineTo(c + f, l + d);
                        break;
                    case"m":
                        c += e[1], l += e[2], o = c, a = l, t.moveTo(c + f, l + d);
                        break;
                    case"M":
                        c = e[1], l = e[2], o = c, a = l, t.moveTo(c + f, l + d);
                        break;
                    case"c":
                        i = c + e[5], n = l + e[6], h = c + e[3], u = l + e[4], t.bezierCurveTo(c + e[1] + f, l + e[2] + d, h + f, u + d, i + f, n + d), c = i, l = n;
                        break;
                    case"C":
                        c = e[5], l = e[6], h = e[3], u = e[4], t.bezierCurveTo(e[1] + f, e[2] + d, h + f, u + d, c + f, l + d);
                        break;
                    case"s":
                        i = c + e[3], n = l + e[4], null === r[0].match(/[CcSs]/) ? (h = c, u = l) : (h = 2 * c - h, u = 2 * l - u), t.bezierCurveTo(h + f, u + d, c + e[1] + f, l + e[2] + d, i + f, n + d), h = c + e[1], u = l + e[2], c = i, l = n;
                        break;
                    case"S":
                        i = e[3], n = e[4], null === r[0].match(/[CcSs]/) ? (h = c, u = l) : (h = 2 * c - h, u = 2 * l - u), t.bezierCurveTo(h + f, u + d, e[1] + f, e[2] + d, i + f, n + d), c = i, l = n, h = e[1], u = e[2];
                        break;
                    case"q":
                        i = c + e[3], n = l + e[4], h = c + e[1], u = l + e[2], t.quadraticCurveTo(h + f, u + d, i + f, n + d), c = i, l = n;
                        break;
                    case"Q":
                        i = e[3], n = e[4], t.quadraticCurveTo(e[1] + f, e[2] + d, i + f, n + d), c = i, l = n, h = e[1], u = e[2];
                        break;
                    case"t":
                        i = c + e[1], n = l + e[2], null === r[0].match(/[QqTt]/) ? (h = c, u = l) : (h = 2 * c - h, u = 2 * l - u), t.quadraticCurveTo(h + f, u + d, i + f, n + d), c = i, l = n;
                        break;
                    case"T":
                        i = e[1], n = e[2], null === r[0].match(/[QqTt]/) ? (h = c, u = l) : (h = 2 * c - h, u = 2 * l - u), t.quadraticCurveTo(h + f, u + d, i + f, n + d), c = i, l = n;
                        break;
                    case"a":
                        s(t, c + f, l + d, [e[1], e[2], e[3], e[4], e[5], e[6] + c + f, e[7] + l + d]), c += e[6], l += e[7];
                        break;
                    case"A":
                        s(t, c + f, l + d, [e[1], e[2], e[3], e[4], e[5], e[6] + f, e[7] + d]), c = e[6], l = e[7];
                        break;
                    case"z":
                    case"Z":
                        c = o, l = a, t.closePath()
                }
                r = e
            }
            this._renderFill(t), this._renderStroke(t)
        },
        toString: function () {
            return "#<fabric.Path (" + this.complexity() + '): { "top": ' + this.top + ', "left": ' + this.left + " }>"
        },
        toObject: function (t) {
            var e = r(this.callSuper("toObject", t), {
                path: this.path.map(function (t) {
                    return t.slice()
                }), pathOffset: this.pathOffset
            });
            return this.sourcePath && (e.sourcePath = this.sourcePath), this.transformMatrix && (e.transformMatrix = this.transformMatrix), e
        },
        toDatalessObject: function (t) {
            var e = this.toObject(t);
            return this.sourcePath && (e.path = this.sourcePath), delete e.sourcePath, e
        },
        toSVG: function (t) {
            for (var e = [], i = this._createBaseSVGMarkup(), n = "", r = 0, o = this.path.length; o > r; r++)e.push(this.path[r].join(" "));
            var s = e.join(" ");
            return this.group && "path-group" === this.group.type || (n = " translate(" + -this.pathOffset.x + ", " + -this.pathOffset.y + ") "), i.push("<path ", 'd="', s, '" style="', this.getSvgStyles(), '" transform="', this.getSvgTransform(), n, this.getSvgTransformMatrix(), '" stroke-linecap="round" ', "/>\n"), t ? t(i.join("")) : i.join("")
        },
        complexity: function () {
            return this.path.length
        },
        _parsePath: function () {
            for (var t, e, i, n, r, o = [], s = [], l = /([-+]?((\d+\.\d+)|((\d+)|(\.\d+)))(?:e[-+]?\d+)?)/gi, h = 0, u = this.path.length; u > h; h++) {
                for (t = this.path[h], n = t.slice(1).trim(), s.length = 0; i = l.exec(n);)s.push(i[0]);
                r = [t.charAt(0)];
                for (var f = 0, d = s.length; d > f; f++)e = parseFloat(s[f]), isNaN(e) || r.push(e);
                var g = r[0], p = a[g.toLowerCase()], v = c[g] || g;
                if (r.length - 1 > p)for (var m = 1, y = r.length; y > m; m += p)o.push([g].concat(r.slice(m, m + p))), g = v; else o.push(r)
            }
            return o
        },
        _parseDimensions: function () {
            for (var t, r, o, s, a = [], c = [], l = null, h = 0, u = 0, f = 0, d = 0, g = 0, p = 0, v = 0, m = this.path.length; m > v; ++v) {
                switch (t = this.path[v], t[0]) {
                    case"l":
                        f += t[1], d += t[2], s = [];
                        break;
                    case"L":
                        f = t[1], d = t[2], s = [];
                        break;
                    case"h":
                        f += t[1], s = [];
                        break;
                    case"H":
                        f = t[1], s = [];
                        break;
                    case"v":
                        d += t[1], s = [];
                        break;
                    case"V":
                        d = t[1], s = [];
                        break;
                    case"m":
                        f += t[1], d += t[2], h = f, u = d, s = [];
                        break;
                    case"M":
                        f = t[1], d = t[2], h = f, u = d, s = [];
                        break;
                    case"c":
                        r = f + t[5], o = d + t[6], g = f + t[3], p = d + t[4], s = e.util.getBoundsOfCurve(f, d, f + t[1], d + t[2], g, p, r, o), f = r, d = o;
                        break;
                    case"C":
                        f = t[5], d = t[6], g = t[3], p = t[4], s = e.util.getBoundsOfCurve(f, d, t[1], t[2], g, p, f, d);
                        break;
                    case"s":
                        r = f + t[3], o = d + t[4], null === l[0].match(/[CcSs]/) ? (g = f, p = d) : (g = 2 * f - g, p = 2 * d - p), s = e.util.getBoundsOfCurve(f, d, g, p, f + t[1], d + t[2], r, o), g = f + t[1], p = d + t[2], f = r, d = o;
                        break;
                    case"S":
                        r = t[3], o = t[4], null === l[0].match(/[CcSs]/) ? (g = f, p = d) : (g = 2 * f - g, p = 2 * d - p), s = e.util.getBoundsOfCurve(f, d, g, p, t[1], t[2], r, o), f = r, d = o, g = t[1], p = t[2];
                        break;
                    case"q":
                        r = f + t[3], o = d + t[4], g = f + t[1], p = d + t[2], s = e.util.getBoundsOfCurve(f, d, g, p, g, p, r, o), f = r, d = o;
                        break;
                    case"Q":
                        g = t[1], p = t[2], s = e.util.getBoundsOfCurve(f, d, g, p, g, p, t[3], t[4]), f = t[3], d = t[4];
                        break;
                    case"t":
                        r = f + t[1], o = d + t[2], null === l[0].match(/[QqTt]/) ? (g = f, p = d) : (g = 2 * f - g, p = 2 * d - p), s = e.util.getBoundsOfCurve(f, d, g, p, g, p, r, o), f = r, d = o;
                        break;
                    case"T":
                        r = t[1], o = t[2], null === l[0].match(/[QqTt]/) ? (g = f, p = d) : (g = 2 * f - g, p = 2 * d - p), s = e.util.getBoundsOfCurve(f, d, g, p, g, p, r, o), f = r, d = o;
                        break;
                    case"a":
                        s = e.util.getBoundsOfArc(f, d, t[1], t[2], t[3], t[4], t[5], t[6] + f, t[7] + d), f += t[6], d += t[7];
                        break;
                    case"A":
                        s = e.util.getBoundsOfArc(f, d, t[1], t[2], t[3], t[4], t[5], t[6], t[7]), f = t[6], d = t[7];
                        break;
                    case"z":
                    case"Z":
                        f = h, d = u
                }
                l = t, s.forEach(function (t) {
                    a.push(t.x), c.push(t.y)
                }), a.push(f), c.push(d)
            }
            var y = i(a), b = i(c), _ = n(a), x = n(c), C = _ - y, w = x - b, j = {
                left: y,
                top: b,
                width: C,
                height: w
            };
            return j
        }
    }), e.Path.fromObject = function (t, i) {
        "string" == typeof t.path ? e.loadSVGFromURL(t.path, function (n) {
            var r = n[0], o = t.path;
            delete t.path, e.util.object.extend(r, t), r.setSourcePath(o), i(r)
        }) : i(new e.Path(t.path, t))
    }, e.Path.ATTRIBUTE_NAMES = e.SHARED_ATTRIBUTES.concat(["d"]), e.Path.fromElement = function (t, i, n) {
        var o = e.parseAttributes(t, e.Path.ATTRIBUTE_NAMES);
        i && i(new e.Path(o.d, r(o, n)))
    }, void(e.Path.async = !0))
}("undefined" != typeof exports ? exports : this), function (t) {
    "use strict";
    var e = t.fabric || (t.fabric = {}), i = e.util.object.extend, n = e.util.array.invoke, r = e.Object.prototype.toObject;
    return e.PathGroup ? void e.warn("fabric.PathGroup is already defined") : (e.PathGroup = e.util.createClass(e.Path, {
        type: "path-group", fill: "", initialize: function (t, e) {
            e = e || {}, this.paths = t || [];
            for (var i = this.paths.length; i--;)this.paths[i].group = this;
            e.toBeParsed && (this.parseDimensionsFromPaths(e), delete e.toBeParsed), this.setOptions(e), this.setCoords(), e.sourcePath && this.setSourcePath(e.sourcePath)
        }, parseDimensionsFromPaths: function (t) {
            for (var i, n, r, o, s, a = [], c = [], l = this.transformMatrix, h = this.paths.length; h--;) {
                r = this.paths[h], o = r.height + r.strokeWidth, s = r.width + r.strokeWidth, i = [{
                    x: r.left,
                    y: r.top
                }, {x: r.left + s, y: r.top}, {x: r.left, y: r.top + o}, {x: r.left + s, y: r.top + o}];
                for (var u = 0; u < i.length; u++)n = i[u], l && (n = e.util.transformPoint(n, l, !1)), a.push(n.x), c.push(n.y)
            }
            t.width = Math.max.apply(null, a), t.height = Math.max.apply(null, c)
        }, render: function (t) {
            if (this.visible) {
                t.save(), this.transformMatrix && t.transform.apply(t, this.transformMatrix), this.transform(t), this._setShadow(t), this.clipTo && e.util.clipContext(this, t), t.translate(-this.width / 2, -this.height / 2);
                for (var i = 0, n = this.paths.length; n > i; ++i)this.paths[i].render(t, !0);
                this.clipTo && t.restore(), this._removeShadow(t), t.restore()
            }
        }, _set: function (t, e) {
            if ("fill" === t && e && this.isSameColor())for (var i = this.paths.length; i--;)this.paths[i]._set(t, e);
            return this.callSuper("_set", t, e)
        }, toObject: function (t) {
            var e = i(r.call(this, t), {paths: n(this.getObjects(), "toObject", t)});
            return this.sourcePath && (e.sourcePath = this.sourcePath), e
        }, toDatalessObject: function (t) {
            var e = this.toObject(t);
            return this.sourcePath && (e.paths = this.sourcePath), e
        }, toSVG: function (t) {
            for (var e = this.getObjects(), i = this.getPointByOrigin("left", "top"), n = "translate(" + i.x + " " + i.y + ")", r = ["<g ", 'style="', this.getSvgStyles(), '" ', 'transform="', this.getSvgTransformMatrix(), n, this.getSvgTransform(), '" ', ">\n"], o = 0, s = e.length; s > o; o++)r.push(e[o].toSVG(t));
            return r.push("</g>\n"), t ? t(r.join("")) : r.join("")
        }, toString: function () {
            return "#<fabric.PathGroup (" + this.complexity() + "): { top: " + this.top + ", left: " + this.left + " }>"
        }, isSameColor: function () {
            var t = (this.getObjects()[0].get("fill") || "").toLowerCase();
            return this.getObjects().every(function (e) {
                return (e.get("fill") || "").toLowerCase() === t
            })
        }, complexity: function () {
            return this.paths.reduce(function (t, e) {
                return t + (e && e.complexity ? e.complexity() : 0)
            }, 0)
        }, getObjects: function () {
            return this.paths
        }
    }), e.PathGroup.fromObject = function (t, i) {
        "string" == typeof t.paths ? e.loadSVGFromURL(t.paths, function (n) {
            var r = t.paths;
            delete t.paths;
            var o = e.util.groupSVGElements(n, t, r);
            i(o)
        }) : e.util.enlivenObjects(t.paths, function (n) {
            delete t.paths, i(new e.PathGroup(n, t))
        })
    }, void(e.PathGroup.async = !0))
}("undefined" != typeof exports ? exports : this), function (t) {
    "use strict";
    var e = t.fabric || (t.fabric = {}), i = e.util.object.extend, n = e.util.array.min, r = e.util.array.max, o = e.util.array.invoke;
    if (!e.Group) {
        var s = {
            lockMovementX: !0,
            lockMovementY: !0,
            lockRotation: !0,
            lockScalingX: !0,
            lockScalingY: !0,
            lockUniScaling: !0
        };
        e.Group = e.util.createClass(e.Object, e.Collection, {
            type: "group",
            initialize: function (t, e) {
                e = e || {}, this._objects = t || [];
                for (var i = this._objects.length; i--;)this._objects[i].group = this;
                this.originalState = {}, this.callSuper("initialize"), e.originX && (this.originX = e.originX), e.originY && (this.originY = e.originY), this._calcBounds(), this._updateObjectsCoords(), this.callSuper("initialize", e), this.setCoords(), this.saveCoords()
            },
            _updateObjectsCoords: function () {
                this.forEachObject(this._updateObjectCoords, this)
            },
            _updateObjectCoords: function (t) {
                var e = t.getLeft(), i = t.getTop(), n = this.getCenterPoint();
                t.set({
                    originalLeft: e,
                    originalTop: i,
                    left: e - n.x,
                    top: i - n.y
                }), t.setCoords(), t.__origHasControls = t.hasControls, t.hasControls = !1
            },
            toString: function () {
                return "#<fabric.Group: (" + this.complexity() + ")>"
            },
            addWithUpdate: function (t) {
                return this._restoreObjectsState(), t && (this._objects.push(t), t.group = this), this.forEachObject(this._setObjectActive, this), this._calcBounds(), this._updateObjectsCoords(), this
            },
            _setObjectActive: function (t) {
                t.set("active", !0), t.group = this
            },
            removeWithUpdate: function (t) {
                return this._moveFlippedObject(t), this._restoreObjectsState(), this.forEachObject(this._setObjectActive, this), this.remove(t), this._calcBounds(), this._updateObjectsCoords(), this
            },
            _onObjectAdded: function (t) {
                t.group = this
            },
            _onObjectRemoved: function (t) {
                delete t.group, t.set("active", !1)
            },
            delegatedProperties: {
                fill: !0,
                opacity: !0,
                fontFamily: !0,
                fontWeight: !0,
                fontSize: !0,
                fontStyle: !0,
                lineHeight: !0,
                textDecoration: !0,
                textAlign: !0,
                backgroundColor: !0
            },
            _set: function (t, e) {
                if (t in this.delegatedProperties)for (var i = this._objects.length; i--;)this._objects[i].set(t, e);
                this.callSuper("_set", t, e)
            },
            toObject: function (t) {
                return i(this.callSuper("toObject", t), {objects: o(this._objects, "toObject", t)})
            },
            render: function (t) {
                if (this.visible) {
                    t.save(), this.clipTo && e.util.clipContext(this, t), this.transform(t);
                    for (var i = 0, n = this._objects.length; n > i; i++)this._renderObject(this._objects[i], t);
                    this.clipTo && t.restore(), t.restore()
                }
            },
            _renderControls: function (t, e) {
                this.callSuper("_renderControls", t, e);
                for (var i = 0, n = this._objects.length; n > i; i++)this._objects[i]._renderControls(t)
            },
            _renderObject: function (t, e) {
                var i = t.hasRotatingPoint;
                t.visible && (t.hasRotatingPoint = !1, t.render(e), t.hasRotatingPoint = i)
            },
            _restoreObjectsState: function () {
                return this._objects.forEach(this._restoreObjectState, this), this
            },
            realizeTransform: function (t) {
                return this._moveFlippedObject(t), this._setObjectPosition(t), t
            },
            _moveFlippedObject: function (t) {
                var e = t.get("originX"), i = t.get("originY"), n = t.getCenterPoint();
                t.set({originX: "center", originY: "center", left: n.x, top: n.y}), this._toggleFlipping(t);
                var r = t.getPointByOrigin(e, i);
                return t.set({originX: e, originY: i, left: r.x, top: r.y}), this
            },
            _toggleFlipping: function (t) {
                this.flipX && (t.toggle("flipX"), t.set("left", -t.get("left")), t.setAngle(-t.getAngle())), this.flipY && (t.toggle("flipY"), t.set("top", -t.get("top")), t.setAngle(-t.getAngle()))
            },
            _restoreObjectState: function (t) {
                return this._setObjectPosition(t), t.setCoords(), t.hasControls = t.__origHasControls, delete t.__origHasControls, t.set("active", !1), t.setCoords(), delete t.group, this
            },
            _setObjectPosition: function (t) {
                var e = this.getCenterPoint(), i = this._getRotatedLeftTop(t);
                t.set({
                    angle: t.getAngle() + this.getAngle(),
                    left: e.x + i.left,
                    top: e.y + i.top,
                    scaleX: t.get("scaleX") * this.get("scaleX"),
                    scaleY: t.get("scaleY") * this.get("scaleY")
                })
            },
            _getRotatedLeftTop: function (t) {
                var e = this.getAngle() * (Math.PI / 180);
                return {
                    left: -Math.sin(e) * t.getTop() * this.get("scaleY") + Math.cos(e) * t.getLeft() * this.get("scaleX"),
                    top: Math.cos(e) * t.getTop() * this.get("scaleY") + Math.sin(e) * t.getLeft() * this.get("scaleX")
                }
            },
            destroy: function () {
                return this._objects.forEach(this._moveFlippedObject, this), this._restoreObjectsState()
            },
            saveCoords: function () {
                return this._originalLeft = this.get("left"), this._originalTop = this.get("top"), this
            },
            hasMoved: function () {
                return this._originalLeft !== this.get("left") || this._originalTop !== this.get("top")
            },
            setObjectsCoords: function () {
                return this.forEachObject(function (t) {
                    t.setCoords()
                }), this
            },
            _calcBounds: function (t) {
                for (var e, i, n = [], r = [], o = ["tr", "br", "bl", "tl"], s = 0, a = this._objects.length; a > s; ++s) {
                    e = this._objects[s], e.setCoords();
                    for (var c = 0; c < o.length; c++)i = o[c], n.push(e.oCoords[i].x), r.push(e.oCoords[i].y)
                }
                this.set(this._getBounds(n, r, t))
            },
            _getBounds: function (t, i, o) {
                var s = e.util.invertTransform(this.getViewportTransform()), a = e.util.transformPoint(new e.Point(n(t), n(i)), s), c = e.util.transformPoint(new e.Point(r(t), r(i)), s), l = {
                    width: c.x - a.x || 0,
                    height: c.y - a.y || 0
                };
                return o || (l.left = a.x || 0, l.top = a.y || 0, "center" === this.originX && (l.left += l.width / 2), "right" === this.originX && (l.left += l.width), "center" === this.originY && (l.top += l.height / 2), "bottom" === this.originY && (l.top += l.height)), l
            },
            toSVG: function (t) {
                for (var e = ["<g ", 'transform="', this.getSvgTransform(), '">\n'], i = 0, n = this._objects.length; n > i; i++)e.push(this._objects[i].toSVG(t));
                return e.push("</g>\n"), t ? t(e.join("")) : e.join("")
            },
            get: function (t) {
                if (t in s) {
                    if (this[t])return this[t];
                    for (var e = 0, i = this._objects.length; i > e; e++)if (this._objects[e][t])return !0;
                    return !1
                }
                return t in this.delegatedProperties ? this._objects[0] && this._objects[0].get(t) : this[t]
            }
        }), e.Group.fromObject = function (t, i) {
            e.util.enlivenObjects(t.objects, function (n) {
                delete t.objects, i && i(new e.Group(n, t))
            })
        }, e.Group.async = !0
    }
}("undefined" != typeof exports ? exports : this), function (t) {
    "use strict";
    var e = fabric.util.object.extend;
    return t.fabric || (t.fabric = {}), t.fabric.Image ? void fabric.warn("fabric.Image is already defined.") : (fabric.Image = fabric.util.createClass(fabric.Object, {
        type: "image",
        crossOrigin: "",
        alignX: "none",
        alignY: "none",
        meetOrSlice: "meet",
        _lastScaleX: 1,
        _lastScaleY: 1,
        initialize: function (t, e) {
            e || (e = {}), this.filters = [], this.resizeFilters = [], this.callSuper("initialize", e), this._initElement(t, e), this._initConfig(e), e.filters && (this.filters = e.filters, this.applyFilters())
        },
        getElement: function () {
            return this._element
        },
        setElement: function (t, e, i) {
            return this._element = t, this._originalElement = t, this._initConfig(i), 0 !== this.filters.length ? this.applyFilters(e) : e && e(), this
        },
        setCrossOrigin: function (t) {
            return this.crossOrigin = t, this._element.crossOrigin = t, this
        },
        getOriginalSize: function () {
            var t = this.getElement();
            return {width: t.width, height: t.height}
        },
        _stroke: function (t) {
            t.save(), this._setStrokeStyles(t), t.beginPath(), t.strokeRect(-this.width / 2, -this.height / 2, this.width, this.height), t.closePath(), t.restore()
        },
        _renderDashedStroke: function (t) {
            var e = -this.width / 2, i = -this.height / 2, n = this.width, r = this.height;
            t.save(), this._setStrokeStyles(t), t.beginPath(), fabric.util.drawDashedLine(t, e, i, e + n, i, this.strokeDashArray), fabric.util.drawDashedLine(t, e + n, i, e + n, i + r, this.strokeDashArray), fabric.util.drawDashedLine(t, e + n, i + r, e, i + r, this.strokeDashArray), fabric.util.drawDashedLine(t, e, i + r, e, i, this.strokeDashArray), t.closePath(), t.restore()
        },
        toObject: function (t) {
            return e(this.callSuper("toObject", t), {
                src: this._originalElement.src || this._originalElement._src,
                filters: this.filters.map(function (t) {
                    return t && t.toObject()
                }),
                crossOrigin: this.crossOrigin,
                alignX: this.alignX,
                alignY: this.alignY,
                meetOrSlice: this.meetOrSlice
            })
        },
        toSVG: function (t) {
            var e = [], i = -this.width / 2, n = -this.height / 2, r = "none";
            if (this.group && "path-group" === this.group.type && (i = this.left, n = this.top), "none" !== this.alignX && "none" !== this.alignY && (r = "x" + this.alignX + "Y" + this.alignY + " " + this.meetOrSlice), e.push('<g transform="', this.getSvgTransform(), this.getSvgTransformMatrix(), '">\n', '<image xlink:href="', this.getSvgSrc(), '" x="', i, '" y="', n, '" style="', this.getSvgStyles(), '" width="', this.width, '" height="', this.height, '" preserveAspectRatio="', r, '"', "></image>\n"), this.stroke || this.strokeDashArray) {
                var o = this.fill;
                this.fill = null, e.push("<rect ", 'x="', i, '" y="', n, '" width="', this.width, '" height="', this.height, '" style="', this.getSvgStyles(), '"/>\n'), this.fill = o
            }
            return e.push("</g>\n"), t ? t(e.join("")) : e.join("")
        },
        getSrc: function () {
            return this.getElement() ? this.getElement().src || this.getElement()._src : void 0
        },
        setSrc: function (t, e, i) {
            fabric.util.loadImage(t, function (t) {
                return this.setElement(t, e, i)
            }, this, i && i.crossOrigin)
        },
        toString: function () {
            return '#<fabric.Image: { src: "' + this.getSrc() + '" }>'
        },
        clone: function (t, e) {
            this.constructor.fromObject(this.toObject(e), t)
        },
        applyFilters: function (t, e, i, n) {
            if (e = e || this.filters, i = i || this._originalElement) {
                var r = i, o = fabric.util.createCanvasElement(), s = fabric.util.createImage(), a = this;
                return o.width = r.width, o.height = r.height, o.getContext("2d").drawImage(r, 0, 0, r.width, r.height), 0 === e.length ? (this._element = i, t && t(), o) : (e.forEach(function (t) {
                    t && t.applyTo(o, t.scaleX || a.scaleX, t.scaleY || a.scaleY), !n && t && "Resize" === t.type && (a.width *= t.scaleX, a.height *= t.scaleY)
                }), s.width = o.width, s.height = o.height, fabric.isLikelyNode ? (s.src = o.toBuffer(void 0, fabric.Image.pngCompression), a._element = s, !n && (a._filteredEl = s), t && t()) : (s.onload = function () {
                    a._element = s, !n && (a._filteredEl = s), t && t(), s.onload = o = r = null
                }, s.src = o.toDataURL("image/png")), o)
            }
        },
        _render: function (t, e) {
            var i, n, r, o = this._findMargins();
            i = e ? this.left : -this.width / 2, n = e ? this.top : -this.height / 2, "slice" === this.meetOrSlice && (t.beginPath(), t.rect(i, n, this.width, this.height), t.clip()), this.isMoving === !1 && this.resizeFilters.length && this._needsResize() ? (this._lastScaleX = this.scaleX, this._lastScaleY = this.scaleY, r = this.applyFilters(null, this.resizeFilters, this._filteredEl || this._originalElement, !0)) : r = this._element, r && t.drawImage(r, i + o.marginX, n + o.marginY, o.width, o.height), this._renderStroke(t)
        },
        _needsResize: function () {
            return this.scaleX !== this._lastScaleX || this.scaleY !== this._lastScaleY
        },
        _findMargins: function () {
            var t, e, i = this.width, n = this.height, r = 0, o = 0;
            return ("none" !== this.alignX || "none" !== this.alignY) && (t = [this.width / this._element.width, this.height / this._element.height], e = "meet" === this.meetOrSlice ? Math.min.apply(null, t) : Math.max.apply(null, t), i = this._element.width * e, n = this._element.height * e, "Mid" === this.alignX && (r = (this.width - i) / 2), "Max" === this.alignX && (r = this.width - i), "Mid" === this.alignY && (o = (this.height - n) / 2), "Max" === this.alignY && (o = this.height - n)), {
                width: i,
                height: n,
                marginX: r,
                marginY: o
            }
        },
        _resetWidthHeight: function () {
            var t = this.getElement();
            this.set("width", t.width), this.set("height", t.height)
        },
        _initElement: function (t) {
            this.setElement(fabric.util.getById(t)), fabric.util.addClass(this.getElement(), fabric.Image.CSS_CANVAS)
        },
        _initConfig: function (t) {
            t || (t = {}), this.setOptions(t), this._setWidthHeight(t), this._element && this.crossOrigin && (this._element.crossOrigin = this.crossOrigin)
        },
        _initFilters: function (t, e) {
            t.filters && t.filters.length ? fabric.util.enlivenObjects(t.filters, function (t) {
                e && e(t)
            }, "fabric.Image.filters") : e && e()
        },
        _setWidthHeight: function (t) {
            this.width = "width" in t ? t.width : this.getElement() ? this.getElement().width || 0 : 0, this.height = "height" in t ? t.height : this.getElement() ? this.getElement().height || 0 : 0
        },
        complexity: function () {
            return 1
        }
    }), fabric.Image.CSS_CANVAS = "canvas-img", fabric.Image.prototype.getSvgSrc = fabric.Image.prototype.getSrc, fabric.Image.fromObject = function (t, e) {
        fabric.util.loadImage(t.src, function (i) {
            fabric.Image.prototype._initFilters.call(t, t, function (n) {
                t.filters = n || [];
                var r = new fabric.Image(i, t);
                e && e(r)
            })
        }, null, t.crossOrigin)
    }, fabric.Image.fromURL = function (t, e, i) {
        fabric.util.loadImage(t, function (t) {
            e && e(new fabric.Image(t, i))
        }, null, i && i.crossOrigin)
    }, fabric.Image.ATTRIBUTE_NAMES = fabric.SHARED_ATTRIBUTES.concat("x y width height preserveAspectRatio xlink:href".split(" ")), fabric.Image.fromElement = function (t, i, n) {
        var r, o, s, a = fabric.parseAttributes(t, fabric.Image.ATTRIBUTE_NAMES), c = "xMidYMid", l = "meet";
        a.preserveAspectRatio && (s = a.preserveAspectRatio.split(" ")), s && s.length && (l = s.pop(), "meet" !== l && "slice" !== l ? (c = l, l = "meet") : s.length && (c = s.pop())), r = "none" !== c ? c.slice(1, 4) : "none", o = "none" !== c ? c.slice(5, 8) : "none", a.alignX = r, a.alignY = o, a.meetOrSlice = l, fabric.Image.fromURL(a["xlink:href"], i, e(n ? fabric.util.object.clone(n) : {}, a))
    }, fabric.Image.async = !0, void(fabric.Image.pngCompression = 1))
}("undefined" != typeof exports ? exports : this), function (t) {
    "use strict";
    var e = t.fabric || (t.fabric = {}), i = e.util.object.extend, n = e.util.object.clone, r = e.util.toFixed, o = e.StaticCanvas.supports("setLineDash");
    if (e.Text)return void e.warn("fabric.Text is already defined");
    var s = e.Object.prototype.stateProperties.concat();
    s.push("fontFamily", "fontWeight", "fontSize", "text", "textDecoration", "textAlign", "fontStyle", "lineHeight", "textBackgroundColor"), e.Text = e.util.createClass(e.Object, {
        _dimensionAffectingProps: {
            fontSize: !0,
            fontWeight: !0,
            fontFamily: !0,
            fontStyle: !0,
            lineHeight: !0,
            stroke: !0,
            strokeWidth: !0,
            text: !0,
            textAlign: !0
        },
        _reNewline: /\r?\n/,
        type: "text",
        fontSize: 40,
        fontWeight: "normal",
        fontFamily: "Times New Roman",
        textDecoration: "",
        textAlign: "left",
        fontStyle: "",
        lineHeight: 1.16,
        textBackgroundColor: "",
        stateProperties: s,
        stroke: null,
        shadow: null,
        _fontSizeFraction: .25,
        _fontSizeMult: 1.13,
        initialize: function (t, e) {
            e = e || {}, this.text = t, this.__skipDimension = !0, this.setOptions(e), this.__skipDimension = !1, this._initDimensions()
        },
        _initDimensions: function (t) {
            if (!this.__skipDimension) {
                t || (t = e.util.createCanvasElement().getContext("2d"), this._setTextStyles(t)), this._textLines = this.text.split(this._reNewline), this._clearCache();
                var i = this.textAlign;
                this.textAlign = "left", this.width = this._getTextWidth(t), this.textAlign = i, this.height = this._getTextHeight(t)
            }
        },
        toString: function () {
            return "#<fabric.Text (" + this.complexity() + '): { "text": "' + this.text + '", "fontFamily": "' + this.fontFamily + '" }>'
        },
        _render: function (t) {
            this.clipTo && e.util.clipContext(this, t), this._renderTextBackground(t), this._renderText(t), this._renderTextDecoration(t), this.clipTo && t.restore()
        },
        _renderText: function (t) {
            t.save(), this._translateForTextAlign(t), this._setOpacity(t), this._setShadow(t), this._setupCompositeOperation(t), this._renderTextFill(t), this._renderTextStroke(t), this._restoreCompositeOperation(t), this._removeShadow(t), t.restore()
        },
        _translateForTextAlign: function (t) {
            "left" !== this.textAlign && "justify" !== this.textAlign && t.translate("center" === this.textAlign ? this.width / 2 : this.width, 0)
        },
        _setTextStyles: function (t) {
            t.textBaseline = "alphabetic", this.skipTextAlign || (t.textAlign = this.textAlign), t.font = this._getFontDeclaration()
        },
        _getTextHeight: function () {
            return this._textLines.length * this._getHeightOfLine()
        },
        _getTextWidth: function (t) {
            for (var e = this._getLineWidth(t, 0), i = 1, n = this._textLines.length; n > i; i++) {
                var r = this._getLineWidth(t, i);
                r > e && (e = r)
            }
            return e
        },
        _renderChars: function (t, e, i, n, r) {
            e[t](i, n, r)
        },
        _renderTextLine: function (t, e, i, n, r, o) {
            if (r -= this.fontSize * this._fontSizeFraction, "justify" !== this.textAlign)return void this._renderChars(t, e, i, n, r, o);
            var s = this._getLineWidth(e, o), a = this.width;
            if (a >= s)for (var c = i.split(/\s+/), l = this._getWidthOfWords(e, i, o), h = a - l, u = c.length - 1, f = h / u, d = 0, g = 0, p = c.length; p > g; g++)this._renderChars(t, e, c[g], n + d, r, o), d += e.measureText(c[g]).width + f; else this._renderChars(t, e, i, n, r, o)
        },
        _getWidthOfWords: function (t, e) {
            return t.measureText(e.replace(/\s+/g, "")).width
        },
        _getLeftOffset: function () {
            return -this.width / 2
        },
        _getTopOffset: function () {
            return -this.height / 2
        },
        _renderTextFill: function (t) {
            if (this.fill || this._skipFillStrokeCheck) {
                for (var e = 0, i = 0, n = this._textLines.length; n > i; i++) {
                    var r = this._getHeightOfLine(t, i), o = r / this.lineHeight;
                    this._renderTextLine("fillText", t, this._textLines[i], this._getLeftOffset(), this._getTopOffset() + e + o, i), e += r
                }
                this.shadow && !this.shadow.affectStroke && this._removeShadow(t)
            }
        },
        _renderTextStroke: function (t) {
            if (this.stroke && 0 !== this.strokeWidth || this._skipFillStrokeCheck) {
                var e = 0;
                t.save(), this.strokeDashArray && (1 & this.strokeDashArray.length && this.strokeDashArray.push.apply(this.strokeDashArray, this.strokeDashArray), o && t.setLineDash(this.strokeDashArray)), t.beginPath();
                for (var i = 0, n = this._textLines.length; n > i; i++) {
                    var r = this._getHeightOfLine(t, i), s = r / this.lineHeight;
                    this._renderTextLine("strokeText", t, this._textLines[i], this._getLeftOffset(), this._getTopOffset() + e + s, i), e += r
                }
                t.closePath(), t.restore()
            }
        },
        _getHeightOfLine: function () {
            return this.fontSize * this._fontSizeMult * this.lineHeight
        },
        _renderTextBackground: function (t) {
            this._renderTextBoxBackground(t), this._renderTextLinesBackground(t)
        },
        _renderTextBoxBackground: function (t) {
            this.backgroundColor && (t.save(), t.fillStyle = this.backgroundColor, t.fillRect(this._getLeftOffset(), this._getTopOffset(), this.width, this.height), t.restore())
        },
        _renderTextLinesBackground: function (t) {
            var e = 0, i = this._getHeightOfLine();
            if (this.textBackgroundColor) {
                t.save(), t.fillStyle = this.textBackgroundColor;
                for (var n = 0, r = this._textLines.length; r > n; n++) {
                    if ("" !== this._textLines[n]) {
                        var o = this._getLineWidth(t, n), s = this._getLineLeftOffset(o);
                        t.fillRect(this._getLeftOffset() + s, this._getTopOffset() + e, o, this.fontSize * this._fontSizeMult)
                    }
                    e += i
                }
                t.restore()
            }
        },
        _getLineLeftOffset: function (t) {
            return "center" === this.textAlign ? (this.width - t) / 2 : "right" === this.textAlign ? this.width - t : 0
        },
        _clearCache: function () {
            this.__lineWidths = [], this.__lineHeights = [], this.__lineOffsets = []
        },
        _shouldClearCache: function () {
            var t = !1;
            for (var e in this._dimensionAffectingProps)this["__" + e] !== this[e] && (this["__" + e] = this[e], t = !0);
            return t
        },
        _getLineWidth: function (t, e) {
            return this.__lineWidths[e] ? this.__lineWidths[e] : (this.__lineWidths[e] = t.measureText(this._textLines[e]).width, this.__lineWidths[e])
        },
        _renderTextDecoration: function (t) {
            function e(e) {
                var r, o, s, a, c = 0;
                for (r = 0, o = n._textLines.length; o > r; r++) {
                    var l = n._getLineWidth(t, r), h = n._getLineLeftOffset(l), u = n._getHeightOfLine(t, r);
                    for (s = 0, a = e.length; a > s; s++)t.fillRect(n._getLeftOffset() + h, c + (n._fontSizeMult - 1 + e[s]) * n.fontSize - i, l, n.fontSize / 15);
                    c += u
                }
            }

            if (this.textDecoration) {
                var i = this.height / 2, n = this, r = [];
                this.textDecoration.indexOf("underline") > -1 && r.push(.85), this.textDecoration.indexOf("line-through") > -1 && r.push(.43), this.textDecoration.indexOf("overline") > -1 && r.push(-.12), r.length > 0 && e(r)
            }
        },
        _getFontDeclaration: function () {
            return [e.isLikelyNode ? this.fontWeight : this.fontStyle, e.isLikelyNode ? this.fontStyle : this.fontWeight, this.fontSize + "px", e.isLikelyNode ? '"' + this.fontFamily + '"' : this.fontFamily].join(" ")
        },
        render: function (t, e) {
            this.visible && (t.save(), this._setTextStyles(t), this._shouldClearCache() && this._initDimensions(t), e || this.transform(t), this._setStrokeStyles(t), this._setFillStyles(t), this.transformMatrix && t.transform.apply(t, this.transformMatrix), this.group && "path-group" === this.group.type && t.translate(this.left, this.top), this._render(t), t.restore())
        },
        toObject: function (t) {
            var e = i(this.callSuper("toObject", t), {
                text: this.text,
                fontSize: this.fontSize,
                fontWeight: this.fontWeight,
                fontFamily: this.fontFamily,
                fontStyle: this.fontStyle,
                lineHeight: this.lineHeight,
                textDecoration: this.textDecoration,
                textAlign: this.textAlign,
                textBackgroundColor: this.textBackgroundColor
            });
            return this.includeDefaultValues || this._removeDefaultValues(e), e
        },
        toSVG: function (t) {
            var e = this._createBaseSVGMarkup(), i = this._getSVGLeftTopOffsets(this.ctx), n = this._getSVGTextAndBg(i.textTop, i.textLeft);
            return this._wrapSVGTextAndBg(e, n), t ? t(e.join("")) : e.join("")
        },
        _getSVGLeftTopOffsets: function (t) {
            var e = this._getHeightOfLine(t, 0), i = -this.width / 2, n = 0;
            return {
                textLeft: i + (this.group && "path-group" === this.group.type ? this.left : 0),
                textTop: n + (this.group && "path-group" === this.group.type ? -this.top : 0),
                lineTop: e
            }
        },
        _wrapSVGTextAndBg: function (t, e) {
            t.push('	<g transform="', this.getSvgTransform(), this.getSvgTransformMatrix(), '">\n', e.textBgRects.join(""), "		<text ", this.fontFamily ? 'font-family="' + this.fontFamily.replace(/"/g, "'") + '" ' : "", this.fontSize ? 'font-size="' + this.fontSize + '" ' : "", this.fontStyle ? 'font-style="' + this.fontStyle + '" ' : "", this.fontWeight ? 'font-weight="' + this.fontWeight + '" ' : "", this.textDecoration ? 'text-decoration="' + this.textDecoration + '" ' : "", 'style="', this.getSvgStyles(), '" >', e.textSpans.join(""), "</text>\n", "	</g>\n")
        },
        _getSVGTextAndBg: function (t, e) {
            var i = [], n = [], r = 0;
            this._setSVGBg(n);
            for (var o = 0, s = this._textLines.length; s > o; o++)this.textBackgroundColor && this._setSVGTextLineBg(n, o, e, t, r), this._setSVGTextLineText(o, i, r, e, t, n), r += this._getHeightOfLine(this.ctx, o);
            return {textSpans: i, textBgRects: n}
        },
        _setSVGTextLineText: function (t, i, n, o, s) {
            var a = this.fontSize * (this._fontSizeMult - this._fontSizeFraction) - s + n - this.height / 2;
            i.push('<tspan x="', r(o + this._getLineLeftOffset(this.__lineWidths[t]), 4), '" ', 'y="', r(a, 4), '" ', this._getFillAttributes(this.fill), ">", e.util.string.escapeXml(this._textLines[t]), "</tspan>")
        },
        _setSVGTextLineBg: function (t, e, i, n, o) {
            t.push("		<rect ", this._getFillAttributes(this.textBackgroundColor), ' x="', r(i + this._getLineLeftOffset(this.__lineWidths[e]), 4), '" y="', r(o - this.height / 2, 4), '" width="', r(this.__lineWidths[e], 4), '" height="', r(this._getHeightOfLine(this.ctx, e) / this.lineHeight, 4), '"></rect>\n')
        },
        _setSVGBg: function (t) {
            this.backgroundColor && t.push("		<rect ", this._getFillAttributes(this.backgroundColor), ' x="', r(-this.width / 2, 4), '" y="', r(-this.height / 2, 4), '" width="', r(this.width, 4), '" height="', r(this.height, 4), '"></rect>\n')
        },
        _getFillAttributes: function (t) {
            var i = t && "string" == typeof t ? new e.Color(t) : "";
            return i && i.getSource() && 1 !== i.getAlpha() ? 'opacity="' + i.getAlpha() + '" fill="' + i.setAlpha(1).toRgb() + '"' : 'fill="' + t + '"'
        },
        _set: function (t, e) {
            this.callSuper("_set", t, e), t in this._dimensionAffectingProps && (this._initDimensions(), this.setCoords())
        },
        complexity: function () {
            return 1
        }
    }), e.Text.ATTRIBUTE_NAMES = e.SHARED_ATTRIBUTES.concat("x y dx dy font-family font-style font-weight font-size text-decoration text-anchor".split(" ")), e.Text.DEFAULT_SVG_FONT_SIZE = 16, e.Text.fromElement = function (t, i) {
        if (!t)return null;
        var n = e.parseAttributes(t, e.Text.ATTRIBUTE_NAMES);
        i = e.util.object.extend(i ? e.util.object.clone(i) : {}, n), i.top = i.top || 0, i.left = i.left || 0, "dx" in n && (i.left += n.dx), "dy" in n && (i.top += n.dy), "fontSize" in i || (i.fontSize = e.Text.DEFAULT_SVG_FONT_SIZE), i.originX || (i.originX = "left");
        var r = t.textContent.replace(/^\s+|\s+$|\n+/g, "").replace(/\s+/g, " "), o = new e.Text(r, i), s = 0;
        return "left" === o.originX && (s = o.getWidth() / 2), "right" === o.originX && (s = -o.getWidth() / 2), o.set({
            left: o.getLeft() + s,
            top: o.getTop() - o.getHeight() / 2 + o.fontSize * (.18 + o._fontSizeFraction)
        }), o
    }, e.Text.fromObject = function (t) {
        return new e.Text(t.text, n(t))
    }, e.util.createAccessors(e.Text)
}("undefined" != typeof exports ? exports : this);
var __extends = this && this.__extends || function (t, e) {
        function i() {
            this.constructor = t
        }

        for (var n in e)e.hasOwnProperty(n) && (t[n] = e[n]);
        t.prototype = null === e ? Object.create(e) : (i.prototype = e.prototype, new i)
    }, Labijie;
!function (t) {
    var e;
    !function (t) {
        var e = function () {
            function t() {
            }

            return t.text = "Text", t.artwork = "Artwork", t.qrCode = "QrCode", t
        }();
        t.DesignWorkElementTypes = e, function (t) {
            t[t.neutral = 1] = "neutral", t[t.dark = 2] = "dark", t[t.light = 4] = "light"
        }(t.ColorStyles || (t.ColorStyles = {}));
        t.ColorStyles;
        !function (t) {
            t[t.bitmap = 1] = "bitmap", t[t.vector = 2] = "vector"
        }(t.GraphType || (t.GraphType = {}));
        t.GraphType;
        !function (t) {
            t[t.none = 0] = "none", t[t.flipX = 1] = "flipX", t[t.flipY = 2] = "flipY"
        }(t.FlipType || (t.FlipType = {}));
        t.FlipType;
        !function (t) {
            t[t.left = 1] = "left", t[t.center = 2] = "center", t[t.right = 3] = "right"
        }(t.TextHorizontalAlign || (t.TextHorizontalAlign = {}));
        t.TextHorizontalAlign;
        !function (t) {
            t[t.regular = 0] = "regular", t[t.bold = 1] = "bold", t[t.italic = 2] = "italic", t[t.underline = 4] = "underline", t[t.strikeout = 8] = "strikeout"
        }(t.TextStyle || (t.TextStyle = {}));
        t.TextStyle
    }(e = t.Models || (t.Models = {}))
}(Labijie || (Labijie = {}));
var Labijie;
!function (t) {
    var e = function () {
        function t(t) {
            this._designer = t
        }

        return t.prototype.request = function (t, e) {
            var i = this;
            "object" == typeof t && (e = t, t = void 0), e.url = t || e.url, e.global = !1, 1 == e.mask && this._designer.getUI().showSpinner({text: "正在请求数据，请稍后。"});
            var n = (this._designer, e.success), r = e.error;
            return e.success = function (t, e, r) {
                i._designer.getUI().hideSpinner(), $.isFunction(n) && n.call(i._designer, t, e, r)
            }, e.error = function (t, e, n) {
                i._designer.getUI().hideSpinner(), $.isFunction(r) && r.call(i._designer, t, e, n)
            }, $.ajax(t, e)
        }, t
    }();
    t.DesignerAjax = e
}(Labijie || (Labijie = {})), function (t) {
    "use strict";
    if ("undefined" == typeof G_vmlCanvasManager) {
        var e = t.fabric || (t.fabric = {}), i = function () {
            return "undefined" != typeof G_vmlCanvasManager
        }, n = e.util.degreesToRadians, r = [1, 2, 3, 4, 5, 6, 7, 8];
        e.util.object.extend(e.Object.prototype, {
            cornerBorderColor: "transparent",
            useCustomIcons: !1,
            cornerBackgroundColor: "transparent",
            cornerShape: "",
            cornerPadding: 0,
            customiseCornerIcons: function (t, e) {
                var i;
                for (i in t)t.hasOwnProperty(i) && (void 0 !== t[i].cornerShape && (this.cornerShape = t[i].cornerShape), void 0 !== t[i].cornerBackgroundColor && (this.cornerBackgroundColor = t[i].cornerBackgroundColor), void 0 !== t[i].cornerBorderColor && (this.cornerBorderColor = t[i].cornerBorderColor), void 0 !== t[i].cornerSize && (this.cornerSize = t[i].cornerSize), void 0 !== t[i].cornerPadding && (this.cornerPadding = t[i].cornerPadding), void 0 !== t[i].icon && (this.useCustomIcons = !0, this.loadIcon(i, t[i].icon, function () {
                    e && "function" == typeof e && e()
                })))
            },
            loadIcon: function (t, i, n) {
                var r = this, o = new Image;
                o.onload = function () {
                    r[t + "Icon"] = this, n && "function" == typeof n && n()
                }, o.onerror = function () {
                    e.warn(this.src + " icon is not an image")
                }, o.src = i
            },
            customizeCornerIcons: function (t) {
                this.customiseCornerIcons(t)
            },
            drawControls: function (t) {
                if (!this.hasControls)return this;
                var e, i = this._calculateCurrentDimensions(!0), n = i.x, r = i.y, o = -(n / 2), s = -(r / 2), a = this.cornerSize / 2;
                return this.useCustomIcons ? e = "drawImage" : (t.lineWidth = 1, t.globalAlpha = this.isMoving ? this.borderOpacityWhenMoving : 1, t.strokeStyle = t.fillStyle = this.cornerColor, e = this.transparentCorners ? "strokeRect" : "fillRect"), t.save(), this._drawControl("tl", t, e, o - a, s - a, this.tlIcon), this._drawControl("tr", t, e, o + n - a, s - a, this.trIcon), this._drawControl("bl", t, e, o - a, s + r - a, this.blIcon), this._drawControl("br", t, e, o + n - a, s + r - a, this.brIcon), this.get("lockUniScaling") || (this._drawControl("mt", t, e, o + n / 2 - a, s - a, this.mtIcon), this._drawControl("mb", t, e, o + n / 2 - a, s + r - a, this.mbIcon), this._drawControl("mr", t, e, o + n - a, s + r / 2 - a, this.mrIcon), this._drawControl("ml", t, e, o - a, s + r / 2 - a, this.mlIcon)), this.hasRotatingPoint && this._drawControl("mtr", t, e, o + n / 2 - a, s - this.rotatingPointOffset - a, this.mtrIcon), t.restore(), this
            },
            _drawControl: function (t, e, n, r, o, s) {
                if (this.isControlVisible(t)) {
                    var a = this.cornerSize, c = this.cornerBackgroundColor || "black", l = this.cornerShape || "rect", h = this.cornerPadding || 10, u = this.cornerBorderColor;
                    if (this.useCustomIcons)if (l)switch (e.globalAlpha = 1, e.fillStyle = c, e.strokeStyle = u, e.lineWidth = 1, l) {
                        case"rect":
                            e.fillRect(r, o, a - 1, a - 1), e.strokeRect(r, o, a - 1, a - 1), void 0 !== s && e[n](s, r + h / 2, o + h / 2, a - h, a - h);
                            break;
                        case"circle":
                            e.beginPath(), e.arc(r + a / 2, o + a / 2, a / 2, 0, 2 * Math.PI), e.fill(), e.stroke(), e.closePath(), void 0 !== s && e[n](s, r + h / 2, o + h / 2, a - h, a - h)
                    } else void 0 !== s && e[n](s, r, o, a, a); else i() || this.transparentCorners || e.clearRect(r, o, a, a), e[n](r, o, a, a)
                }
            }
        }), e.util.object.extend(e.Canvas.prototype, {
            overwriteActions: !1, fixedCursors: !1, customiseControls: function (t) {
                var e;
                for (e in t)t.hasOwnProperty(e) && (void 0 !== t[e].action && (this.overwriteActions = !0, this.setCustomAction(e, t[e].action)), void 0 !== t[e].cursor && (this.fixedCursors = !0, this.setCustomCursor(e, t[e].cursor)))
            }, setCustomAction: function (t, e) {
                this[t + "Action"] = e
            }, setCustomCursor: function (t, e) {
                this[t + "cursorIcon"] = e
            }, customizeControls: function (t) {
                this.customiseControls(t)
            }, _getActionFromCorner: function (t, e) {
                var i = "drag";
                return e ? i = this.overwriteActions ? "ml" === e ? this.mlAction || "scaleX" : "mr" === e ? this.mrAction || "scaleX" : "mt" === e ? this.mtAction || "scaleY" : "mb" === e ? this.mbAction || "scaleY" : "tr" === e ? this.trAction || "scale" : "tl" === e ? this.tlAction || "scale" : "bl" === e ? this.blAction || "scale" : "br" === e ? this.brAction || "scale" : "mtr" === e ? this.mtrAction || "rotate" : "scale" : "ml" === e || "mr" === e ? "scaleX" : "mt" === e || "mb" === e ? "scaleY" : "mtr" === e ? "rotate" : "scale" : void 0
            }, _setupCurrentTransform: function (t, e) {
                if (e) {
                    var i = this.getPointer(t), r = e._findTargetCorner(this.getPointer(t, !0)), o = this._getActionFromCorner(e, r), s = this._getOriginFromCorner(e, r);
                    this._currentTransform = {
                        target: e,
                        action: o,
                        scaleX: e.scaleX,
                        scaleY: e.scaleY,
                        offsetX: i.x - e.left,
                        offsetY: i.y - e.top,
                        originX: s.x,
                        originY: s.y,
                        ex: i.x,
                        ey: i.y,
                        left: e.left,
                        top: e.top,
                        theta: n(e.angle),
                        width: e.width * e.scaleX,
                        mouseXSign: 1,
                        mouseYSign: 1
                    }, this._currentTransform.original = {
                        left: e.left,
                        top: e.top,
                        scaleX: e.scaleX,
                        scaleY: e.scaleY,
                        originX: s.x,
                        originY: s.y
                    }, "remove" === o && this._removeAction(t, e), "moveUp" === o && this._moveLayerUpAction(t, e), "moveDown" === o && this._moveLayerDownAction(t, e), "object" == typeof o && "rotateByDegrees" === Object.keys(o)[0] && this._rotateByDegrees(t, e, o.rotateByDegrees), this._resetCurrentTransform(t)
                }
            }, _removeAction: function (t, e) {
                this.getActiveGroup() && "undefined" !== this.getActiveGroup() ? (this.getActiveGroup().forEachObject(function (t) {
                    t.remove()
                }), this.discardActiveGroup()) : e.remove()
            }, _moveLayerUpAction: function (t, e) {
                this.getActiveGroup() && "undefined" !== this.getActiveGroup() ? this.getActiveGroup().forEachObject(function (t) {
                    t.bringForward()
                }) : e.bringForward()
            }, _moveLayerDownAction: function (t, e) {
                this.getActiveGroup() && "undefined" !== this.getActiveGroup() ? this.getActiveGroup().forEachObject(function (t) {
                    t.sendBackwards()
                }) : e.sendBackwards()
            }, _rotateByDegrees: function (t, e, i) {
                var n = e.getAngle() + i;
                n = n > 360 ? i : 0 > n ? 315 : n, this.getActiveGroup() && "undefined" !== this.getActiveGroup() ? this.getActiveGroup().forEachObject(function (t) {
                    t.setAngle(n).setCoords()
                }) : e.setAngle(n).setCoords(), this.renderAll()
            }, _setOriginToCenter: function (t) {
                t._originalOriginX = t.originX, t._originalOriginY = t.originY;
                var e = t.getCenterPoint();
                t.set({originX: "center", originY: "center", left: e.x, top: e.y})
            }, _setCenterToOrigin: function (t) {
                var e = t.translateToOriginPoint(t.getCenterPoint(), t._originalOriginX, t._originalOriginY);
                t.set({originX: t._originalOriginX, originY: t._originalOriginY, left: e.x, top: e.y})
            }, _setCornerCursor: function (t, e) {
                var i = /\.(?:jpe?g|png|gif|jpg|jpeg|svg)$/;
                if (this.fixedCursors)switch (t) {
                    case"tl":
                        this.tlcursorIcon ? i.test(this.tlcursorIcon) ? this.setCursor("url(" + this.tlcursorIcon + "), auto") : "resize" === this.tlcursorIcon ? this._setScalingCursor(t, e) : this.setCursor(this.tlcursorIcon) : this._setScalingCursor(t, e);
                        break;
                    case"tr":
                        this.trcursorIcon ? i.test(this.trcursorIcon) ? this.setCursor("url(" + this.trcursorIcon + "), auto") : "resize" === this.trcursorIcon ? this._setScalingCursor(t, e) : this.setCursor(this.trcursorIcon) : this._setScalingCursor(t, e);
                        break;
                    case"bl":
                        this.blcursorIcon ? i.test(this.blcursorIcon) ? this.setCursor("url(" + this.blcursorIcon + "), auto") : "resize" === this.blcursorIcon ? this._setScalingCursor(t, e) : this.setCursor(this.blcursorIcon) : this._setScalingCursor(t, e);
                        break;
                    case"br":
                        this.brcursorIcon ? i.test(this.brcursorIcon) ? this.setCursor("url(" + this.brcursorIcon + "), auto") : "resize" === this.brcursorIcon ? this._setScalingCursor(t, e) : this.setCursor(this.brcursorIcon) : this._setScalingCursor(t, e);
                        break;
                    case"mt":
                        this.mtcursorIcon ? i.test(this.mtcursorIcon) ? this.setCursor("url(" + this.mtcursorIcon + "), auto") : "resize" === this.mtcursorIcon ? this._setScalingCursor(t, e) : this.setCursor(this.mtcursorIcon) : this._setScalingCursor(t, e);
                        break;
                    case"mb":
                        this.mbcursorIcon ? i.test(this.mbcursorIcon) ? this.setCursor("url(" + this.mbcursorIcon + "), auto") : "resize" === this.mbcursorIcon ? this._setScalingCursor(t, e) : this.setCursor(this.mbcursorIcon) : this._setScalingCursor(t, e);
                        break;
                    case"mr":
                        this.mrcursorIcon ? i.test(this.mrcursorIcon) ? this.setCursor("url(" + this.mrcursorIcon + "), auto") : "resize" === this.mrcursorIcon ? this._setScalingCursor(t, e) : this.setCursor(this.mrcursorIcon) : this._setScalingCursor(t, e);
                        break;
                    case"ml":
                        this.mlcursorIcon ? i.test(this.mlcursorIcon) ? this.setCursor("url(" + this.mlcursorIcon + "), auto") : "resize" === this.mlcursorIcon ? this._setScalingCursor(t, e) : this.setCursor(this.mlcursorIcon) : this._setScalingCursor(t, e);
                        break;
                    case"mtr":
                        this.mtrcursorIcon ? i.test(this.mtrcursorIcon) ? this.setCursor("url(" + this.mtrcursorIcon + "), auto") : "resize" === this.mtrcursorIcon ? this._setScalingCursor(t, e) : this.setCursor(this.mtrcursorIcon) : this._setScalingCursor(t, e)
                } else if (t in r)this.setCursor(this._getRotatedCornerCursor(t, e)); else {
                    if ("mtr" !== t || !e.hasRotatingPoint)return this.setCursor(this.defaultCursor), !1;
                    this.setCursor(this.rotationCursor)
                }
            }, _setScalingCursor: function (t, e) {
                this.setCursor(this._getRotatedCornerCursor(t, e))
            }
        })
    }
}("undefined" != typeof exports ? exports : this);
var Labijie;
!function (t) {
    function e(t) {
        return "function" == typeof t
    }

    function i(t) {
        return isFinite(parseFloat(t))
    }

    function n(t) {
        return isFinite(parseFloat(t)) && parseFloat(t) > 0
    }

    function r(t) {
        return isFinite(parseFloat(t)) && parseFloat(t) >= 0
    }

    function o(t) {
        return "undefined" == typeof t || null == t
    }

    function s(t) {
        return "undefined" == typeof t || 0 == t.toString().length
    }

    function a(t) {
        return "undefined" == typeof t
    }

    function c(t) {
        return "[object String]" === Object.prototype.toString.call(t)
    }

    function l(t, e) {
        return null == t || null == e ? t === e : t == e && t.constructor.toString() == e.constructor
    }

    t.isFunction = e, t.isNumber = i, t.isNumberGreateZero = n, t.isNumberGreateOrEqualZero = r, t.isNullOrUndefined = o, t.isNotOrEmptyString = s;
    var h = Object.prototype.hasOwnProperty;
    t.has = function (t, e) {
        return a(h) ? "undefined" != typeof t[e] : h.call(t, e)
    }, t.isUndefined = a, t.isString = c;
    var u = function () {
        function e(t) {
            this.table = {}, this.nElements = 0, this.toStr = t || function (t) {
                    return null === t ? "__NULL" : a(t) ? "__UNDEFINED" : t.toString()
                }
        }

        return e.prototype.getValue = function (t) {
            var e = this.table["$" + this.toStr(t)];
            if (!a(e))return e.value
        }, e.prototype.setValue = function (t, e) {
            if (!a(t) && !a(e)) {
                var i, n = "$" + this.toStr(t), r = this.table[n];
                return a(r) ? (this.nElements++, i = void 0) : i = r.value, this.table[n] = {key: t, value: e}, i
            }
        }, e.prototype.remove = function (t) {
            var e = "$" + this.toStr(t), i = this.table[e];
            return a(i) ? void 0 : (delete this.table[e], this.nElements--, i.value)
        }, e.prototype.keys = function () {
            var e = [];
            for (var i in this.table)if (t.has(this.table, i)) {
                var n = this.table[i];
                e.push(n.key)
            }
            return e
        }, e.prototype.values = function () {
            var e = [];
            for (var i in this.table)if (t.has(this.table, i)) {
                var n = this.table[i];
                e.push(n.value)
            }
            return e
        }, e.prototype.forEach = function (e) {
            for (var i in this.table)if (t.has(this.table, i)) {
                var n = this.table[i], r = e(n.key, n.value);
                if (r === !1)return
            }
        }, e.prototype.containsKey = function (t) {
            return !a(this.getValue(t))
        }, e.prototype.clear = function () {
            this.table = {}, this.nElements = 0
        }, e.prototype.size = function () {
            return this.nElements
        }, e.prototype.isEmpty = function () {
            return this.nElements <= 0
        }, e.prototype.toString = function () {
            var t = "{";
            return this.forEach(function (e, i) {
                t = t + "\n	" + e.toString() + " : " + i.toString()
            }), t + "\n}"
        }, e
    }();
    t.Dictionary = u, Array.prototype.forEach || (Array.prototype.forEach = function (t, e) {
        if (t && "[object Function]" !== Object.prototype.toString.call(t)) {
            e = e || window;
            for (var i = 0, n = this.length; n > i; i++)t.call(e, this[i], i, this)
        }
    }), Array.prototype.filter || (Array.prototype.filter = function (t, e) {
        if (t && "[object Function]" !== Object.prototype.toString.call(t)) {
            e = e || window;
            for (var i = [], n = 0, r = this.length; r > n; n++)t.call(e, this[n], n, this) && i.push(this[n]);
            return i
        }
    }), Array.prototype.map || (Array.prototype.map = function (t, e) {
        if (t && t.constructor == Function.toString()) {
            e = e || window;
            for (var i = [], n = 0, r = this.length; r > n; n++)i.push(t.call(e, this[n], n, this));
            return i
        }
    }), Array.prototype.every || (Array.prototype.every = function (t, e) {
        if (t && "[object Function]" !== Object.prototype.toString.call(t)) {
            e = e || window;
            for (var i = 0, n = this.length; n > i; i++)if (!t.call(e, this[i], i, this))return !1;
            return !0
        }
    }), Array.prototype.some || (Array.prototype.some = function (t, e) {
        if (t && "[object Function]" !== Object.prototype.toString.call(t)) {
            e = e || window;
            for (var i = 0, n = this.length; n > i; i++)if (t.call(e, this[i], i, this))return !0;
            return !1
        }
    }), Array.prototype.indexOf = function (t) {
        for (var e = 0, i = this.length; i > e; e++)if (l(this[e], t))return e;
        return -1
    }, Array.prototype.lastIndexOf = function (t) {
        for (var e = this.length - 1; e >= 0; e--)if (l(this[e], t))return e;
        return -1
    }
}(Labijie || (Labijie = {}));
var Labijie;
!function (t) {
    var e = function () {
        function e(t) {
            this._designer = t
        }

        return e.prototype.product = function (t) {
            return t && (this._product = t, this._productTheme = null, this._productThemePart = null), this._product || null
        }, e.prototype.productTheme = function (t) {
            return t && (this._productTheme = t, this._productThemePart = null), this._productTheme || null
        }, e.prototype.productThemePart = function (t) {
            return t && (this._productThemePart = t), this._productThemePart || null
        }, e.prototype.containsProductTheme = function (t) {
            var e = this.product();
            return null == e ? !1 : e.Themes.some(function (e) {
                return e === t
            })
        }, e.prototype.containsProductThemePart = function (t) {
            var e = this.productTheme();
            return null == e ? !1 : e.Parts.some(function (e) {
                return e === t
            })
        }, e.prototype.selectProduct = function (e, i, n) {
            var r = this;
            "undefined" == typeof n && (n = !0);
            var o = !1, s = this.product();
            if (!("undefined" == typeof e && null == e || null != s && s.Id == e.Id)) {
                s = e, this.productThemePart(null), this.product(e);
                var a = this._designer.getModel();
                a.ProductId = e.Id || 0;
                var c = a.Parts;
                a.Parts = new Array, a.ProductThemeId = 0, $.isArray(e.Themes) && e.Themes.length > 0 && (o = !0, e.Themes = t.Designer.sortArray(e.Themes, function (t) {
                    return t.DisplayOrder
                }), n ? this.selectProductThemeAt(0, function () {
                    r.exportElementsFromOldParts(c, a.Parts), a.Parts.length > 0 && r.selectProductThemePartAt(0, i)
                }, !1) : $.isFunction(i) && i.call(this))
            }
            return o || $.isFunction(i) && i.call(this), s
        }, e.prototype.exportElementsFromOldParts = function (e, i) {
            for (var n = 0; n < i.length; n++) {
                if (n >= e.length)return;
                var r = e[n];
                if (r.Elements.length > 0) {
                    var o = i[n], s = {
                        x: r.DesignRegionWidth / 2,
                        y: r.DesignRegionHeight / 2
                    }, a = {
                        x: o.DesignRegionWidth / 2,
                        y: o.DesignRegionHeight / 2
                    }, c = o.DesignRegionWidth / r.DesignRegionWidth, l = o.DesignRegionHeight / r.DesignRegionHeight;
                    r.Elements.forEach(function (t) {
                        var e = s.x - t.X, r = s.y - t.Y, o = a.x - e * l, h = a.y - r * l;
                        t.X = o, t.Y = h, c > l ? (t.Width = t.Width * c, t.Height = t.Height * c) : (t.Width = t.Width * l, t.Height = t.Height * l), i[n].Elements.push(t)
                    }), t.Designer.calculatePrintDpi(r)
                }
            }
        }, e.prototype.selectProductTheme = function (t, e, i) {
            "undefined" == typeof i && (i = !0);
            var n = !1, r = this.productTheme();
            if (("undefined" != typeof t || null != t && this.containsProductTheme(t)) && ("undefined" == typeof r || null == r || r !== t)) {
                r = t, this.productTheme(t);
                var o = this._designer.getModel(), s = o.Parts, a = new Array;
                if (t.Parts.forEach(function (t, e) {
                        var i = {
                            DisplayName: t.DisplayName,
                            ColorStyle: t.ColorStyle,
                            CanvasPixelWidth: t.DesignCanvasWidth,
                            CanvasPixelHeight: t.DesignCanvasWidth * (t.GraphHeight / t.GraphWidth),
                            CanvasMaxPixelWidth: Math.max(t.DesignCanvasWidth, t.GraphWidth),
                            CanvasGraphFilePath: t.GraphFilePath,
                            PrintingWidthMillimeters: t.PrintingWidthMillimeters,
                            PrintingHeightMillimeters: t.PrintingHeightMillimeters,
                            DesignRegionX: t.DesignRegionX,
                            DesignRegionY: t.DesignRegionY,
                            DesignRegionWidth: t.DesignRegionWidth,
                            DesignRegionHeight: t.DesignRegionHeight,
                            CanvasGraphFileUrl: t.ImageUrl,
                            PrintDpi: 300,
                            Elements: []
                        };
                        a.push(i)
                    }), this.exportElementsFromOldParts(s, a), o.Parts = a, o.ProductThemeId = r.Id, o.ProductThemeVersion = r.Version, o.Appearances = r.Appearances, this._designer.events.modelChanged.trigger(this._designer), null == this.productThemePart() && t.Parts.length > 0)return n = !0, i ? this.selectProductThemePartAt(0, e) : $.isFunction(e) && e.call(this), t
            }
            return n || $.isFunction(e) && e.call(this), r
        }, e.prototype.selectProductThemeAt = function (t, e, i) {
            var n = this.productTheme(), r = this.product(), o = !1;
            if (null != r && t >= 0 && t < r.Themes.length && null != r && $.isArray(r.Themes))if (r.Themes.length > t) {
                var s = r.Themes.indexOf(n);
                if (s != t) {
                    o = !0;
                    var a = r.Themes[t];
                    return n = this.selectProductTheme(a, e, i)
                }
            } else this._designer.debug && console.error("选定配色时数组超出范围。");
            return o || $.isFunction(e) && e.call(this), n
        }, e.prototype.activePart = function (e, i) {
            var n = this, r = -1, o = function (t) {
                var e = n._designer.getModel();
                return null != e ? e.Parts.some(function (e, i) {
                    return e == t ? (r = i, !0) : void 0
                }) : !1
            };
            if ("undefined" != typeof e && null != e && o(e)) {
                var s = this._designer.getCanvas();
                this._designer.getOptions();
                this._designer.suppendEvents(), s.clear(), this._designer.activeElement(null), this._designer.resumeEvents(), e.ColorStyle == t.Models.ColorStyles.dark ? this._designer.setAppearance("dark") : this._designer.setAppearance("light");
                var a = function (n, r, o) {
                    t.Designer.addElementToCanvas(o, r), n == e.Elements.length - 1 ? t.Designer.renderPart(o, e, function () {
                        $.isFunction(i) && i(e), o.getCanvas().renderOnAddRemove = !0
                    }) : c(n + 1, o)
                }, c = function (i, n) {
                    var r = e.Elements[i];
                    switch (r.ItemType) {
                        case t.Models.DesignWorkElementTypes.artwork:
                            var o = r;
                            new t.DesignerArtElement(o, n, function (t) {
                                a(i, t, n)
                            });
                            break;
                        case t.Models.DesignWorkElementTypes.text:
                            var s = r;
                            s.Text = s.Text || "Hellow", new t.DesignerTextElement(s, n, function (t) {
                                a(i, t, n)
                            })
                    }
                };
                e.Elements.length > 0 ? (s.renderOnAddRemove = !1, c(0, this._designer)) : t.Designer.renderPart(this._designer, e, function () {
                    $.isFunction(i) && i(e)
                })
            }
        }, e.prototype.selectProductThemePart = function (t, e) {
            var i = this.productThemePart();
            if ("undefined" != typeof t && null != t && this.containsProductThemePart(t)) {
                i = this.productThemePart(t);
                var n = this.productTheme(), r = n.Parts.indexOf(i), o = this._designer.getModel(), s = o.Parts[r];
                return this.activePart(s, e), i
            }
            return $.isFunction(e) && e.call(this), i
        }, e.prototype.selectProductThemePartAt = function (t, e) {
            var i = this.productTheme(), n = this.productThemePart();
            if (null != i && t >= 0) {
                var r = i.Parts[t];
                return n = this.selectProductThemePart(r, e)
            }
            return this._designer.debug && console.error("选定设计部件时数组超出范围。"), n
        }, e.prototype.selectElementAt = function (t) {
            var e = -1;
            if ($.isNumeric(t)) {
                var i = this._designer.findElementAt(t);
                null != i ? this._designer.getCanvas().setActiveObject(i.getObject()) : (this._designer.getCanvas().deactivateAll().renderAll(), this._designer.activeElement(i))
            } else {
                var i = this._designer.activeElement();
                if (null != i) {
                    var n = i.getObject();
                    e = this._designer.getFabricObjects().indexOf(n)
                }
            }
            return e
        }, e
    }();
    t.DesignerSelection = e
}(Labijie || (Labijie = {}));
var Labijie;
!function (t) {
    var e = function () {
        function t() {
            this.moving = new n, this.rotating = new n, this.modified = new n, this.actived = new n, this.deactived = new n, this.scaling = new n, this.added = new n, this.removed = new n
        }

        return t
    }();
    t.DesignerElementEvents = e;
    var i = function () {
        function t() {
            this.initializing = new r, this.designRegionChanged = new r, this.elementsLayerChanged = new r, this.printDpiChanged = new r, this.modelChanged = new r
        }

        return t
    }();
    t.DesignerEvents = i;
    var n = function () {
        function t() {
            this.handlers = []
        }

        return t.prototype.on = function (t) {
            this.handlers.push(t)
        }, t.prototype.off = function (t) {
            this.handlers = this.handlers.filter(function (e) {
                return e !== t
            })
        }, t.prototype.trigger = function (t) {
            this.handlers.slice(0).forEach(function (e) {
                return e.call(t)
            })
        }, t
    }();
    t.DesignerElementEvent = n;
    var r = function () {
        function t() {
            this.handlers = []
        }

        return t.prototype.on = function (t) {
            this.handlers.push(t)
        }, t.prototype.off = function (t) {
            this.handlers = this.handlers.filter(function (e) {
                return e !== t
            })
        }, t.prototype.trigger = function (t) {
            this.handlers.slice(0).forEach(function (e) {
                return e.call(t)
            })
        }, t
    }();
    t.DesignerEvent = r
}(Labijie || (Labijie = {}));
var Labijie;
!function (t) {
    var e = function () {
        function t() {
        }

        return t.drag = "drag", t.scale = "scale", t.scaleX = "scaleX", t.scaleY = "scaleY", t.rotate = "rotate", t.remove = "remove", t.moveUp = "moveUp", t.moveDown = "moveUp", t
    }();
    t.CornerControlActions = e;
    var i = function () {
        function t() {
        }

        return t.rect = "rect", t.circle = "circle", t
    }();
    t.CornerShapes = i
}(Labijie || (Labijie = {}));
var Labijie;
!function (t) {
    !function (t) {
        t[t.none = 0] = "none", t[t.underline = 1] = "underline", t[t.overline = 2] = "overline", t[t.lineThrough = 3] = "lineThrough"
    }(t.TextDecoration || (t.TextDecoration = {}));
    var e = t.TextDecoration;
    !function (t) {
        t[t.normal = 0] = "normal", t[t.bold = 1] = "bold"
    }(t.FontWeight || (t.FontWeight = {}));
    var i = t.FontWeight;
    !function (t) {
        t[t.normal = 0] = "normal", t[t.italic = 1] = "italic"
    }(t.FontStyle || (t.FontStyle = {}));
    var n = t.FontStyle, r = function () {
        function t() {
            this.commandName = "clearRegion"
        }

        return t.prototype.execute = function (t, e) {
            var i = t.designer.getActivedPart();
            i.Elements = new Array, t.designer.getCanvas().clear(), t.designer.activeElement(null)
        }, t
    }();
    t.ClearDesignRegionCommand = r;
    var o = function () {
        function t() {
            this.commandName = "bringForward"
        }

        return t.prototype.execute = function (t, e) {
            if (null != t.element) {
                var i = t.element.getObject();
                i.bringForward()
            }
        }, t
    }();
    t.BringForwardCommand = o;
    var s = function () {
        function t() {
            this.commandName = "bringBackwards"
        }

        return t.prototype.execute = function (t, e) {
            if (null != t.element) {
                var i = t.element.getObject();
                i.sendBackwards()
            }
        }, t
    }();
    t.BringBackwardsCommand = s;
    var a = function () {
        function t() {
            this.commandName = "remove"
        }

        return t.prototype.execute = function (t, e) {
            if ($.isPlainObject(e) && $.isNumeric(e.index)) {
                var i = t.designer.getFabricObjects();
                if (e.index >= 0 && e.index < i.length) {
                    var n = i[e.index];
                    n.remove()
                }
            }
        }, t
    }();
    t.RemoveCommand = a;
    var c = function () {
        function t() {
            this.commandName = "rotate"
        }

        return t.prototype.execute = function (t, e) {
            if (null != t.element && $.isPlainObject(e)) {
                var i = t.element.getModel(), n = t.element.getObject();
                i.RotationAngle = e.angle || 0, n.rotate(e.angle)
            }
        }, t
    }();
    t.RotateCommand = c;
    var l = function () {
        function t() {
            this.commandName = "translate"
        }

        return t.prototype.execute = function (t, e) {
            if (null != t.element && $.isPlainObject(e)) {
                var i = t.element.getModel(), n = t.element.getObject();
                e.x && (i.X = i.X + e.x, n.setLeft(n.getLeft() + e.x)), e.y && (i.Y = i.Y + e.y, n.setTop(n.getTop() + e.y))
            }
        }, t
    }();
    t.TranslateCommand = l;
    var h = function () {
        function i() {
            this.commandName = "changeTextStyle"
        }

        return i.prototype.execute = function (i, n) {
            if (null != i.element && i.element.elementType == t.DesignElementType.text) {
                var r = i.element.getObject(), o = {};
                switch (n) {
                    case e.lineThrough:
                        o.textDecoration = "line-through";
                        break;
                    case e.overline:
                        o.textDecoration = "overline";
                        break;
                    case e.underline:
                        o.textDecoration = "underline";
                        break;
                    case e.none:
                    default:
                        o.textDecoration = ""
                }
                r.set(o), i.element.saveModel()
            }
        }, i
    }();
    t.ChangeTextDecorationCommand = h;
    var u = function () {
        function e() {
            this.commandName = "changeTextColor"
        }

        return e.prototype.execute = function (e, i) {
            if (null != e.element && e.element.elementType == t.DesignElementType.text) {
                var n = e.element.getObject();
                i.color && n.setFill(i.color), e.element.saveModel()
            }
        }, e
    }();
    t.ChangeTextColorCommand = u;
    var f = function () {
        function e() {
            this.commandName = "changeTextFont"
        }

        return e.prototype.execute = function (e, r) {
            if (null != e.element && e.element.elementType == t.DesignElementType.text) {
                var o = e.element.getObject(), s = {};
                s.fontFamily = r.fontFamily || e.element.getObject().fontFamily;
                var a = "undefined" != typeof r.fontFamily && null != r.fontFamily && r.fontFamily != o.fontFamily;
                a && (s.fontFamily = r.fontFamily);
                var c = "undefined" != typeof r.fontWeight && null != r.fontWeight;
                if (c)switch (r.fontWeight) {
                    case i.bold:
                        c = "bold" !== o.fontWeight, s.fontWeight = "bold";
                        break;
                    case i.normal:
                    default:
                        c = "normal" !== o.fontWeight, s.fontWeight = "normal"
                }
                var l = "undefined" != typeof r.fontStyle && null != r.fontStyle;
                if (l)switch (r.fontStyle) {
                    case n.italic:
                        l = "italic" !== o.fontStyle, s.fontStyle = "italic";
                        break;
                    case n.normal:
                    default:
                        l = "normal" !== o.fontStyle, s.fontStyle = "normal"
                }
                (a || c || l) && (s.lineHeight = t.FontLineOfHeight.getLineHeight(s.fontFamily)), o.set(s), e.element.saveModel()
            }
        }, e
    }();
    t.ChangeTextFontCommand = f;
    var d = function () {
        function e() {
            this.commandName = "changeTextStroke"
        }

        return e.prototype.execute = function (e, i) {
            if (null != e.element && e.element.elementType == t.DesignElementType.text) {
                var n = e.element.getObject(), r = {};
                i.color && (r.stroke = i.color), $.isNumeric(i.width) && (r.strokeWidth = Math.max(0, i.width)), n.set(r), e.element.saveModel()
            }
        }, e
    }();
    t.ChangeTextStrokeCommand = d;
    var g = function () {
        function e() {
            this.commandName = "changeText"
        }

        return e.prototype.execute = function (e, i) {
            if (null != e.element && e.element.elementType == t.DesignElementType.text) {
                var n = e.element.getObject();
                i && n.setText(i), e.element.saveModel()
            }
        }, e
    }();
    t.ChangeTextCommand = g;
    var p = function () {
        function t() {
            this.commandName = "centerH"
        }

        return t.prototype.execute = function (t, e) {
            if (null != t.element) {
                var i = t.element, n = i.getObject(), r = t.designer.getDesignRegion(), o = r.left + (r.width - n.getWidth()) / 2 + n.getWidth() / 2;
                n.setLeft(o), t.element.saveModel()
            }
        }, t
    }();
    t.CenterHorizontalCommand = p;
    var v = function () {
        function t() {
            this.commandName = "centerV"
        }

        return t.prototype.execute = function (t, e) {
            if (null != t.element) {
                var i = t.element, n = i.getObject(), r = t.designer.getDesignRegion(), o = r.top + (r.height - n.getHeight()) / 2 + n.getHeight() / 2;
                n.setTop(o), t.element.saveModel()
            }
        }, t
    }();
    t.CenterVerticalCommand = v
}(Labijie || (Labijie = {}));
var Labijie;
!function (t) {
    var e = function () {
        function t() {
            this._enabled = "undefined" != typeof store && store.enabled
        }

        return t.prototype.remove = function (t) {
            this._enabled && store.set(t, null)
        }, t.prototype.set = function (t, e) {
            return this._enabled ? store.set(t, e) : void 0
        }, t.prototype.get = function (t) {
            if (this._enabled) {
                var e = store.get(t);
                return "undefined" == typeof e ? null : e
            }
            return null
        }, t
    }();
    t.DefaultStore = e
}(Labijie || (Labijie = {}));
var Labijie;
!function (t) {
    !function (t) {
        t[t.art = 0] = "art", t[t.text = 1] = "text", t[t.qrCode = 2] = "qrCode"
    }(t.DesignElementType || (t.DesignElementType = {}));
    var e = t.DesignElementType, i = "给定的数据模型和设计元素类型不一致。", n = function () {
        function t(t) {
            this._elementType = t
        }

        return t.prototype.getElementType = function () {
            return this._elementType
        }, t
    }();
    t.DesignerElementConfig = n;
    var r = function () {
        function n(t, e, i, n) {
            this.price = 0, this.elementType = t.getElementType(), this.designer = i, this._model = e, this.init(t, e, n)
        }

        return n.prototype.isActived = function () {
            return this.getObject() === this.designer.getCanvas().getActiveObject()
        }, n.prototype.getObject = function () {
            return this.fabricObject
        }, n.prototype.init = function (n, r, o) {
            var s = this;
            switch (n.getElementType()) {
                case e.text:
                    if (r.ItemType != t.Models.DesignWorkElementTypes.text)throw console.log(i), i;
                    break;
                case e.art:
                    if (r.ItemType != t.Models.DesignWorkElementTypes.artwork)throw console.log(i), i;
                    break;
                case e.qrCode:
                    if (r.ItemType != t.Models.DesignWorkElementTypes.qrCode)throw console.log(i), i
            }
            var a = this;
            this.createFabricObject(n, r, function (e) {
                e.isElement = !0;
                var i = a.designer.getDesignRegion();
                a.fabricObject = e;
                var n = e;
                a.designer.isVmlMode || (n.hasRotatingPoint = !1), n.lockScalingFlip = !0, a.fabricObject.set({
                    left: e.getLeft() + i.left,
                    top: e.getTop() + i.top
                }), n.clipTo = function (e) {
                    if (a.isActived())e.rect(-(this.width / 2), -(this.height / 2), this.width, this.height); else {
                        a.designer.getDesignRegion();
                        t.Designer.clipToRect(this, e, a.designer.getDesignRegion())
                    }
                };
                var r = a.fabricObject.bringForward, c = a.fabricObject.sendBackwards;
                a.fabricObject.bringForward = function () {
                    var t = r.call(this);
                    return a.designer.saveLayersChanges(), a.designer.events.elementsLayerChanged.trigger(this), t
                }, a.fabricObject.sendBackwards = function () {
                    var t = c.call(this);
                    return a.designer.saveLayersChanges(), a.designer.events.elementsLayerChanged.trigger(this), t
                }, a.fabricObject.set(t.Designer.ElementPropertyName, s), a.fabricObject.on("moving", function (t) {
                    a.onMoving.call(a, t)
                }), a.fabricObject.on("scaling", function (t) {
                    a.onScaling.call(a, t)
                }), a.fabricObject.on("modified", function (t) {
                    a.onModified.call(a, t)
                }), a.fabricObject.on("rotating", function (t) {
                    a.onRotating.call(a, t)
                }), a.fabricObject.on("added", function (t) {
                    a.onAdded.call(a, t)
                }), a.fabricObject.on("removed", function (t) {
                    a.onRemoved.call(a, t)
                }), a.fabricObject.on("selected", function (t) {
                    a.onSelected.call(a, t)
                }), a.fabricObject.on("mouseup", function (t) {
                    a.designer.removeGuideElements()
                }), $.isFunction(o) && o.call(a, a)
            })
        }, n.prototype.onSelected = function (t) {
        }, n.prototype.onAdded = function (t) {
        }, n.prototype.onRemoved = function (t) {
        }, n.prototype.onRotating = function (t) {
            this.fabricObject.setCoords(), this.changeBorderIfOutofRegion(this), this.autoAngle(this)
        }, n.prototype.saveModel = function () {
            var e = this.fabricObject.getPointByOrigin("center", "center");
            console.log("object.left:" + this.fabricObject.getLeft() + "   object.y:" + this.fabricObject.getTop() + "   object.angel:" + this.fabricObject.getAngle() + "   object.scaleX:" + this.fabricObject.getScaleX()), console.log("cetner.left:" + e.x + "   cetner.y:" + e.y);
            var i = e.x, n = e.y, r = this.fabricObject.getAngle();
            this._model.RotationAngle = r, this._model.Width = this.fabricObject.getWidth(), this._model.Height = this.fabricObject.getHeight(), this._model.Flip = t.Models.FlipType.none, this.fabricObject.flipX && (this._model.Flip |= t.Models.FlipType.flipX), this.fabricObject.flipY && (this._model.Flip |= t.Models.FlipType.flipY);
            var o = this.designer.getDesignRegion();
            this._model.X = i - o.left, this._model.Y = n - o.top, this.designer.refreshPrintDpi(), this.designer.debug && (console.log("print dpi:" + this.designer.getActivedPart().PrintDpi), console.log("x:" + this._model.X + "   y:" + this._model.Y + "   width:" + this._model.Width + "   height:" + this._model.Height))
        }, n.prototype.onModified = function (t) {
            this.saveModel(), this.designer.events.modelChanged.trigger(this.designer)
        }, n.prototype.autoAngle = function (t) {
            var e = this.getObject(), i = Math.round(e.getAngle()), n = i % 45;
            8 > n && e.setAngle(i - n), t.designer.drawRotationCircle(Math.round(e.getAngle()))
        }, n.prototype.changeBorderIfOutofRegion = function (t) {
            var e = t.designer.getDesignRegion(), i = t.fabricObject.getBoundingRect(), n = i.left < e.left || i.top < e.top || i.left + i.width > e.left + e.width || i.top + i.height > e.top + e.height;
            debug && console.log("rect: x" + i.left + ",y" + i.top + "r" + (i.width + i.left) + "b" + (i.top + i.height) + "   outbound:" + n), t.fabricObject.borderColor = n ? t.designer.getAppearance().elementWarningBorderColor : t.designer.getAppearance().elementBorderColor
        }, n.prototype.autoCenter = function (t) {
            var e = t.designer.getDesignRegion(), i = {
                x: e.left + e.width / 2,
                y: e.top + e.height / 2
            }, n = t.fabricObject.getCenterPoint();
            Math.abs(i.y - n.y) < 8 ? (t.fabricObject.setTop(i.y), t.designer.drawHorizontalCenterLine()) : t.designer.removeHorizontalCenterLine(), Math.abs(i.x - n.x) < 8 ? (t.fabricObject.setLeft(i.x), t.designer.drawVerticalCenterLine()) : t.designer.removeVerticalCenterLine()
        }, n.prototype.onScaling = function (t) {
            this.fabricObject.setCoords(), this.changeBorderIfOutofRegion(this)
        }, n.prototype.onMoving = function (t) {
            this.fabricObject.setCoords(), this.changeBorderIfOutofRegion(this), this.autoCenter(this)
        }, n.prototype.getModel = function () {
            return this._model
        }, n
    }();
    t.DesignerElement = r
}(Labijie || (Labijie = {}));
var Labijie;
!function (t) {
    var e = function () {
        function e(i, n) {
            var r = this;
            this._activedElement = null, this.debug = !1, this.minPrintDpi = 201, this.elementEvents = new t.DesignerElementEvents, this.events = new t.DesignerEvents, this.commands = new Array, this.store = new t.DefaultStore, this._appearance = "_none", this.isVmlMode = "undefined" != typeof G_vmlCanvasManager;
            var o = this;
            "undefined" != typeof debug && (this.debug = debug), this._guaideElements = {
                hcl: !1,
                vcl: !1,
                rc: !1
            }, fabric.Object.prototype.setControlsVisibility({ml: !1, mr: !1});
            var s = this.createCanvasOptions(n), a = new fabric.Canvas(i, s);
            a.allowTouchScrolling = !0;
            var c = $(a.getElement()).closest("." + a.containerClass), l = $('<div style="display:none;"><canvas class="lbj-designer-exp"></canvas></div>');
            c.parent().append(l);
            var h = l.children(":first");
            this._exportCanvas = new fabric.StaticCanvas(h[0]);
            var u = this._exportCanvas;
            u.selection = !1, u.skipTargetFind = !0, u.perPixelTargetFind = !1, u.renderOnAddRemove = !1, this.selection = new t.DesignerSelection(this), this.version = "1.0", this._eventSuppended = !1, this._canvas = a, this._container = c[0];
            this._canvas;
            if (this.setUI(null), this.isVmlMode || this.initFabricControls(n), "solid" !== n.elementBorderStyle && !this.isVmlMode) {
                var f = fabric.Object.prototype.drawBorders;
                fabric.Object.prototype.drawBorders = function (t) {
                    t.setLineDash([4, 2]), f.call(this, t), t.setLineDash([])
                }
            }
            var c = $(this._container);
            this._designRegion = {
                left: 0,
                top: 0,
                width: c.innerWidth(),
                height: c.innerHeight()
            }, this._canvas.setWidth(this._ui.getCanvasWidth()), this._canvas.setHeight(300), $(window).resize(function () {
                var t = o.getActivedPart();
                e.renderPart(o, t)
            }), $(document).click(function (t) {
                var e = t.target;
                if (e) {
                    var i = $(e), n = o.getCanvas(), r = (i.closest("." + n.containerClass), "true" == i.attr("lbj-designer-click-ignore") || i.closest('[lbj-designer-click-ignore="true"]').length > 0);
                    r || e == o._container || $.contains(o._container, t.target) || (o.getCanvas().deactivateAll().renderAll(), o.deactiveElement())
                }
            });
            var d = {
                Id: 0,
                ProductId: 0,
                ProductThemeId: 0,
                ProductThemeVersion: "",
                Appearances: "#ffffff",
                DisplayName: "",
                DesignerVersion: this.version,
                Parts: new Array
            };
            this.ajax = new t.DesignerAjax(this), this._model = d, this.addDefaultCommands(), this._canvas.on("object:rotating", function (t) {
                return r.onElementRotating.call(r, t)
            }), this._canvas.on("object:modified", function (t) {
                return r.onElementModified.call(r, t)
            }), this._canvas.on("object:selected", function (t) {
                return r.onElementSelected.call(r, t)
            }), this._canvas.on("object:moving", function (t) {
                return r.onElementMoving.call(r, t)
            }), this._canvas.on("object:scaling", function (t) {
                return r.onElementScaling.call(r, t)
            }), this._canvas.on("object:added", function (t) {
                return r.onElementAdded.call(r, t)
            }), this._canvas.on("object:removed", function (t) {
                return r.onElementRemoved.call(r, t)
            }), this._canvas.on("selection:cleared", function (t) {
                return r.onSelectionCleared.call(r, t)
            }), $.browser && $.browser.android && !$.browser.chrome && $("canvas").parents("*").css("overflow", "visible"), this.events.modelChanged.on(function () {
                var t = r.getModel();
                if (0 == t.Id) {
                    var i = {model: t, time: Date.now()};
                    r.store.set(e.LASTEST_DESIGN_STOREKEY, i)
                }
            })
        }

        return e.prototype.addDefaultCommands = function () {
            this.commands.push(new t.CenterHorizontalCommand), this.commands.push(new t.CenterVerticalCommand), this.commands.push(new t.ChangeTextColorCommand), this.commands.push(new t.ChangeTextCommand), this.commands.push(new t.ChangeTextFontCommand), this.commands.push(new t.ChangeTextStrokeCommand), this.commands.push(new t.ChangeTextDecorationCommand), this.commands.push(new t.ClearDesignRegionCommand), this.commands.push(new t.BringForwardCommand), this.commands.push(new t.BringBackwardsCommand), this.commands.push(new t.RotateCommand), this.commands.push(new t.TranslateCommand), this.commands.push(new t.RemoveCommand)
        }, e.prototype.createCanvasOptions = function (t) {
            var e = {selection: !1};
            return e
        }, e.prototype.initFabricControls = function (t) {
            var e = {
                _none: {
                    regionBorderColor: "yellow",
                    elementBorderColor: "#000",
                    elementWarningBorderColor: "red"
                }
            };
            $.isPlainObject(t) || (t = {
                connerControlSettings: {
                    tr: {action: "rotate", cursor: "pointer"},
                    br: {action: "scale", cursor: "se-resize"},
                    bl: {action: "remove", cursor: "pointer"},
                    mt: {action: "moveUp", cursor: "pointer"},
                    mb: {action: "moveDown", cursor: "pointer"}
                }, appearances: e, elementBorderStyle: "solid"
            }), (void 0 === t.appearances || null == t) && (t.appearances = e), this._options = t, fabric.Canvas.prototype.customiseControls(t.connerControlSettings);
            for (var i in t.appearances) {
                this.setAppearance(i);
                break
            }
        }, e.prototype.setAppearance = function (t) {
            var e = this._options.appearances[t];
            "undefined" != typeof e && (e.cornerIconSettings && fabric.Object.prototype.customiseCornerIcons(e.cornerIconSettings), this._appearance = t)
        }, e.prototype.getAppearance = function () {
            var t = this._options.appearances[this._appearance];
            return "undefined" != typeof t ? this._options.appearances[this._appearance] : null
        }, e.prototype.saveLayersChanges = function () {
            var t = this.getActivedPart();
            if (null != t && t.Elements.length > 1) {
                var i = this.getFabricObjects(), n = new Array;
                i.forEach(function (t) {
                    var i = e.findElementByObject(t);
                    n.push(i.getModel())
                }), t.Elements = n
            }
        }, e.prototype.getPriceSum = function () {
            var t = 0, e = 0, i = this.selection.selectProduct();
            return null != i && (t = i.Price, this._model.Parts.forEach(function (t) {
                t.Elements.forEach(function (t) {
                    t.Price && (e += t.Price)
                })
            })), t + e
        }, e.prototype.setUI = function (t) {
            var e = t || null;
            null == e && (e = {
                toast: function (t) {
                }, showSpinner: function (t) {
                }, hideSpinner: function () {
                }, showSplash: function (t) {
                }, hideSplash: function () {
                }, setDesignRegion: function (t) {
                }
            }), this._ui = e;
            var i = this;
            $.isFunction(this._ui.getCanvasWidth) || (this._ui.getCanvasWidth = function () {
                return $(i._container).parent().innerWidth()
            })
        }, e.prototype.exportImage = function (t, i, n) {
            var r = this.getModel(), o = this._exportCanvas;
            return $.isNumeric(i) || (i = -1, r.Parts.some(function (t, e) {
                return t.Elements.length > 0 ? (i = e, !0) : !1
            }), -1 != i) ? void e.exportDesignPartImage(r, o, t, i, n) : void this.getUI().alert("至少要包含一个设计过的部件。")
        }, e.exportImages = function (e, i, n) {
            var r = 0;
            $.isPlainObject(n) && (r = n.imgWidth), (!$.isNumeric(r) || 0 >= r) && (r = void 0);
            var o = $.Deferred(), s = new Array, a = function () {
                $.isPlainObject(n) && $.isFunction(n.success) && n.success.call(this, s), o.resolve(s)
            }, c = e.Parts.length;
            if (c > 0) {
                var l = function (o) {
                    o >= 0 && c > o && t.Designer.exportDesignPartImage(e, i, function (t, e) {
                        var i = {img: t, part: e};
                        s.push(i), $.isPlainObject(n) && $.isFunction(n.partDone) && n.partDone.call(this, i);
                        var r = o + 1;
                        r == c ? a() : l(r)
                    }, o, r)
                };
                l(0)
            } else a();
            return o.promise()
        }, e.applyThemeToDesignWork = function (t, e) {
            if (t.Id != e.DesignWorkId)return t;
            if (t.ProductThemeId != e.ProductThemeId) {
                t.ProductThemeId = e.ProductThemeId, t.Appearances = e.Appearances;
                var i = t.Parts, n = e.Parts;
                if (i.length != n.length)return t;
                i.forEach(function (t, e) {
                    var i = n[e], r = Math.round(i.DesignRegionWidth / i.DesignRegionHeight), o = Math.round(t.DesignRegionWidth / t.DesignRegionHeight);
                    if (r == o) {
                        var s = i.CanvasPixelWidth / t.CanvasPixelWidth;
                        t.DesignRegionWidth = i.DesignRegionWidth, t.DesignRegionHeight = i.DesignRegionHeight, t.CanvasPixelWidth = i.CanvasPixelWidth, t.CanvasPixelHeight = i.CanvasPixelHeight, t.DesignRegionX = i.DesignRegionX, t.DesignRegionY = i.DesignRegionY, t.CanvasMaxPixelWidth = i.CanvasMaxPixelWidth, t.CanvasGraphFilePath = i.CanvasGraphFilePath, t.CanvasGraphFileUrl = i.CanvasGraphFileUrl, t.Elements.forEach(function (t) {
                            t.X *= s, t.Y *= s, t.Width *= s, t.Height *= s
                        })
                    }
                })
            }
            return t
        }, e.exportDesignPartImage = function (i, n, r, o, s) {
            var a = {crossOrigin: "labijie"};
            if (!(o >= 0 && i.Parts.length > o))throw"生成设计图时设计器部件索引超出范围。";
            var c = i.Parts[o];
            s = s || c.CanvasMaxPixelWidth, s = Math.min(s, c.CanvasMaxPixelWidth);
            var l = s / c.CanvasPixelWidth, h = function () {
                n.renderAll();
                var t = n.toDataURL("png");
                n.dispose(), $.isFunction(r) && r.call(self, t, c)
            };
            fabric.Image.fromURL(i.Parts[o].CanvasGraphFileUrl, function (i) {
                var o = s, a = o * (i.height / i.width);
                i.set({
                    width: o,
                    height: a,
                    scaleX: 1,
                    scaleY: 1,
                    left: 0,
                    top: 0
                }), n.dispose(), n.setBackgroundImage(i), n.setWidth(o), n.setHeight(a);
                var u = c.Elements;
                if (u.length > 0) {
                    var f = function (i, r) {
                        var o = u[i], s = function (t) {
                            t.selectable = !1;
                            var s = {
                                scaleX: o.Width * l / t.width,
                                scaleY: o.Width * l / t.width,
                                clipTo: function (t) {
                                    var i = this;
                                    e.clipToRect(i, t, {
                                        left: c.DesignRegionX * l,
                                        top: c.DesignRegionY * l,
                                        width: c.DesignRegionWidth * l,
                                        height: c.DesignRegionHeight * l
                                    })
                                }
                            };
                            t.set(s), n.add(t), t.set({
                                left: t.getLeft() * l + c.DesignRegionX * l,
                                top: t.getTop() * l + c.DesignRegionY * l
                            }), i == u.length - 1 ? (n.renderAll(), $.isFunction(r) && r.call(self)) : f(i + 1, r)
                        };
                        switch (o.ItemType) {
                            case t.Models.DesignWorkElementTypes.artwork:
                                (new t.ArtBuilder).buildObject(o, s);
                                break;
                            case t.Models.DesignWorkElementTypes.text:
                                (new t.TextBuilder).buildObject(o, s)
                        }
                    };
                    f(0, h)
                } else $.isFunction(r) && h()
            }, a)
        }, e.prototype.getDesignRegion = function () {
            return this._designRegion
        }, e.prototype.getGraphRegion = function () {
            return this._graphRegion
        }, e.prototype.removeLastestDesign = function () {
            this.store.remove(t.Designer.LASTEST_DESIGN_STOREKEY)
        }, e.prototype.getLastestDesign = function () {
            var e = this.store.get(t.Designer.LASTEST_DESIGN_STOREKEY);
            return "undefined" == typeof e ? null : e
        }, e.prototype.importDesign = function (e, i) {
            var n = this;
            e.Id > 0 && this.store.remove(t.Designer.LASTEST_DESIGN_STOREKEY);
            var r = $.Deferred();
            return i = this.selection.selectProduct(i, function () {
                var t = null, o = 0, s = i.Themes.some(function (i, n) {
                    return i.Id == e.ProductThemeId && i.Version == e.ProductThemeVersion ? (t = i, o = n, !0) : !1
                });
                s || (t = {
                    Id: e.ProductThemeId,
                    DisplayOrder: 0,
                    Appearances: e.Appearances,
                    Version: e.ProductThemeVersion,
                    Parts: new Array
                }, e.Parts.forEach(function (e) {
                    var i = {
                        Id: 0,
                        ColorStyle: e.ColorStyle,
                        DesignCanvasWidth: e.CanvasPixelWidth,
                        DesignRegionX: e.DesignRegionX,
                        DesignRegionY: e.DesignRegionY,
                        DisplayName: e.DisplayName,
                        GraphFilePath: e.CanvasGraphFilePath,
                        GraphHeight: e.CanvasPixelHeight * (e.CanvasMaxPixelWidth / e.CanvasPixelWidth),
                        GraphWidth: e.CanvasMaxPixelWidth,
                        DesignRegionWidth: e.DesignRegionWidth,
                        DesignRegionHeight: e.DesignRegionHeight,
                        PrintingHeightMillimeters: e.PrintingHeightMillimeters,
                        PrintingWidthMillimeters: e.PrintingWidthMillimeters,
                        ImageUrl: e.CanvasGraphFileUrl
                    };
                    t.Parts.push(i)
                }), i.Themes = [t], o = 0, debug && console.log("加载的设计数据没有发现匹配的配色，可能配色版本不匹配，配色被禁用或已经被删除。")), n._model = e;
                var a = t.Parts[0], c = n;
                n.selection.selectProductTheme(t, function () {
                    n.selection.selectProductThemePart(a, function () {
                        r.resolve()
                    }), c.events.modelChanged.trigger(c)
                }, !1)
            }, !1), r.promise()
        }, e.prototype.getUI = function () {
            return this._ui
        }, e.prototype.deactiveElement = function () {
            var t = this._activedElement;
            if (this._activedElement = null, this._canvas.allowTouchScrolling = !0, this.removeGuideElements(), t) {
                var e = this.elementEvents.deactived;
                e.trigger(t)
            }
        }, e.prototype.activeElement = function (t) {
            if ("undefined" != typeof t && t != this._activedElement) {
                if (null == t)return void this.deactiveElement();
                var e = t.getObject();
                if ((null == t || this.getFabricObjects().some(function (t) {
                        return t === e
                    })) && (this.deactiveElement(), null != t)) {
                    this._activedElement = t, this._canvas.allowTouchScrolling = !1;
                    var i = this.elementEvents.actived;
                    i.trigger(t)
                }
            }
            return this._activedElement || null
        }, e.prototype.getOptions = function () {
            return this._options
        }, e.prototype.onSelectionCleared = function (t) {
            this._eventSuppended || this.deactiveElement()
        }, e.prototype.drawRotationCircle = function (t) {
            var e = this.activeElement(), i = t % 45 == 0;
            if (this._guaideElements.rc || null == e)this.getGuaideObjects().some(function (e) {
                return e.rcx ? (e.set({
                    text: t + "º",
                    fill: i ? "#fff" : "#00B2A5",
                    backgroundColor: i ? "#00B2A5" : "transparent"
                }), !0) : !1
            }); else {
                this._guaideElements.rc = !0;
                var n = e.getObject(), r = n.getCenterPoint(), o = Math.sqrt(Math.pow(n.getWidth() / 2, 2) + Math.pow(n.getHeight() / 2, 2)), s = new fabric.Text(t + "º", {
                    left: r.x,
                    top: r.y - o - 10,
                    selectable: !1,
                    originX: "center",
                    originY: "center",
                    textAlign: "center",
                    fontSize: 12,
                    lineHeight: 1.3,
                    fill: i ? "#fff" : "#00B2A5",
                    backgroundColor: i ? "#00B2A5" : "transparent"
                });
                s.rcx = !0;
                var a = new fabric.Circle({
                    fill: "transparent",
                    stroke: "#00B2A5",
                    strokeWidth: 1,
                    selectable: !1,
                    left: r.x,
                    top: r.y,
                    radius: o,
                    originX: "center",
                    originY: "center"
                });
                a.rc = !0, this.getCanvas().add(s), this.getCanvas().add(a)
            }
        }, e.prototype.removeRotationCircle = function () {
            if (this._guaideElements.rc) {
                var t = this.getCanvas();
                this.getGuaideObjects().forEach(function (e) {
                    e.rc && t.remove(e)
                }), this._guaideElements.rc = !1
            }
        }, e.prototype.drawHorizontalCenterLine = function () {
            if (!this._guaideElements.hcl) {
                this._guaideElements.hcl = !0;
                var t = this._designRegion.top + this._designRegion.height / 2, e = new fabric.Line([0, t, this.getCanvas().getWidth(), t], {
                    stroke: "#00B2A5",
                    strokeWidth: 1,
                    selectable: !1,
                    width: 0,
                    height: 0
                });
                e.hcl = !0, this.getCanvas().add(e)
            }
        }, e.prototype.removeHorizontalCenterLine = function () {
            if (this._guaideElements.hcl) {
                var t = this.getCanvas();
                this.getGuaideObjects().forEach(function (e) {
                    e.hcl && t.remove(e)
                }), this._guaideElements.hcl = !1
            }
        }, e.prototype.drawVerticalCenterLine = function () {
            if (!this._guaideElements.vcl) {
                this._guaideElements.vcl = !0;
                var t = this._designRegion.left + this._designRegion.width / 2, e = new fabric.Line([t, 0, t, this.getCanvas().getHeight()], {
                    stroke: "#00B2A5",
                    strokeWidth: 1,
                    selectable: !1,
                    width: 0,
                    height: 0
                });
                e.vcl = !0, this.getCanvas().add(e)
            }
        }, e.prototype.removeVerticalCenterLine = function () {
            if (this._guaideElements.vcl) {
                var t = this.getCanvas();
                this.getGuaideObjects().forEach(function (e) {
                    e.vcl && t.remove(e)
                }), this._guaideElements.vcl = !1
            }
        }, e.prototype.removeGuideElements = function () {
            var t = this.getGuaideObjects();
            if (t.length > 0) {
                var e = this.getCanvas();
                e.renderOnAddRemove = !1, t.forEach(function (t) {
                    e.remove(t)
                }), this._guaideElements.hcl = !1, this._guaideElements.vcl = !1, this._guaideElements.rc = !1, this.getCanvas().renderAll(), this._canvas.renderOnAddRemove = !0
            }
        }, e.prototype.getGuaideObjects = function () {
            var t = this.getCanvas().getObjects();
            return t.filter(function (t, e) {
                return !t.isElement
            })
        }, e.prototype.getFabricObjects = function () {
            var t = this.getCanvas().getObjects();
            return t.filter(function (t, e) {
                return t.isElement
            })
        }, e.prototype.findElementAt = function (t) {
            var i = this.getFabricObjects();
            if (i.length > 0 && t >= 0 && t < i.length) {
                var n = i[t];
                return e.findElementByObject(n)
            }
            return null
        }, e.prototype.moveElementLayer = function (t, e) {
            var i = this.getFabricObjects();
            if (i.length > 0 && t >= 0 && t < i.length && e >= 0 && e < i.length && t != e) {
                var n = this.findElementAt(t), r = n.getObject();
                r.moveTo(e), this.saveLayersChanges(), this.events.elementsLayerChanged.trigger(this)
            }
        }, e.prototype.getActivedPart = function () {
            var t = this.selection.selectProductTheme();
            if (null != t) {
                var e = this.selection.selectProductThemePart();
                if (null != e) {
                    var i = t.Parts.indexOf(e), n = this.getModel();
                    return n.Parts[i]
                }
            }
            return null
        }, e.prototype.onElementRemoved = function (t) {
            if (!this._eventSuppended && t.target.isElement) {
                var i = t.target, n = e.findElementByObject(i), r = this, o = function (t) {
                    if ("undefined" != typeof t && null != t) {
                        var e = t.getModel(), i = r.selection.selectProductThemePart();
                        if (null != i) {
                            var n = r.selection.selectProductTheme().Parts.indexOf(i), o = r._model.Parts[n];
                            o.Elements = o.Elements.filter(function (t) {
                                return t != e
                            })
                        }
                    }
                }, s = this.getActivedPart(), a = n.getModel();
                s.Elements = s.Elements.filter(function (t) {
                    return t != a
                });
                var c = this.activeElement();
                c == n && this.activeElement(null), o(n), this.refreshPrintDpi();
                var l = this.elementEvents.removed;
                l.trigger(n), this.events.modelChanged.trigger(this)
            }
        }, e.prototype.onElementAdded = function (t) {
            if (!this._eventSuppended && t.target.isElement) {
                var i = t.target, n = e.findElementByObject(i), r = this.elementEvents.added;
                this.refreshPrintDpi(), r.trigger(n), this.events.modelChanged.trigger(this)
            }
        }, e.prototype.onElementScaling = function (t) {
            if (!this._eventSuppended) {
                var i = t.target, n = e.findElementByObject(i), r = this.elementEvents.scaling;
                r.trigger(n)
            }
        }, e.prototype.onElementRotating = function (t) {
            if (!this._eventSuppended) {
                var i = t.target, n = e.findElementByObject(i), r = this.elementEvents.rotating;
                r.trigger(n)
            }
        }, e.prototype.onElementModified = function (t) {
            if (!this._eventSuppended) {
                var i = t.target, n = e.findElementByObject(i), r = this.elementEvents.modified;
                r.trigger(n)
            }
        }, e.prototype.onElementSelected = function (t) {
            if (!this._eventSuppended) {
                var i = t.target, n = e.findElementByObject(i);
                this.activeElement(n)
            }
        }, e.prototype.onElementMoving = function (t) {
            if (!this._eventSuppended) {
                var i = t.target, n = e.findElementByObject(i), r = this.elementEvents.moving;
                r.trigger(n)
            }
        }, e.prototype.executeCommand = function (t, e) {
            var i = this.activeElement(), n = null, r = this.commands.some(function (e) {
                return e.commandName === t ? (n = e, !0) : !1
            });
            if (r) {
                var o = {designer: this, element: i};
                n.execute(o, e), this._canvas.renderAll()
            }
        }, e.prototype.refreshPrintDpi = function () {
            var t = this.getActivedPart(), i = t.PrintDpi;
            e.calculatePrintDpi(t), i != t.PrintDpi && this.events.printDpiChanged.trigger(this)
        }, e.prototype.createElement = function (t) {
            var i = this.selection.selectProductThemePart();
            if (null != i) {
                var n = this.selection.selectProductTheme().Parts.indexOf(i);
                this._model.Parts[n].Elements.push(t.getModel()), t.getObject().borderColor = this.getAppearance().elementBorderColor, t.getObject().borderOpacityWhenMoving = 1, e.addElementToCanvas(this, t, !0), this.refreshPrintDpi(), this.getCanvas().setActiveObject(t.getObject())
            } else this.debug && console.log("找不到选中部件，可能由于没有加载商品。")
        }, e.prototype.newArt = function (e, i, n) {
            var r = this, o = {
                ArtworkId: i.Id,
                ArtworkType: i.GraphType,
                DisplayName: i.DisplayName,
                FilePath: i.FilePath,
                ImagePixelWidth: i.PixelWidth,
                ImagePixelHeight: i.PixelHeight,
                Url: e,
                ItemType: t.Models.DesignWorkElementTypes.artwork,
                X: 0,
                Y: 0,
                Flip: t.Models.FlipType.none,
                Width: 0,
                Height: 0,
                RotationAngle: 0,
                Price: i.Price
            }, s = this, a = new t.DesignerArtElement(o, this, function (t) {
                s.createElement(t), $.isFunction(n) && n.call(r)
            });
            return a
        }, e.prototype.newText = function (e, i) {
            var n = {
                Text: e,
                FontFamily: i,
                ItemType: t.Models.DesignWorkElementTypes.text,
                OutlineColor: "#fff",
                OutlineWidth: 0,
                TextColor: "red",
                TextStyle: t.Models.TextStyle.regular,
                LineHeight: t.FontLineOfHeight.getLineHeight(i),
                X: 0,
                Y: 0,
                Flip: t.Models.FlipType.none,
                Width: 0,
                Height: 0,
                RotationAngle: 0
            }, r = this, o = new t.DesignerTextElement(n, this, function (t) {
                r.createElement(t)
            });
            return o
        }, e.prototype.getCanvas = function () {
            return this._canvas
        }, e.prototype.suppendEvents = function () {
            this._eventSuppended = !0
        }, e.prototype.resumeEvents = function () {
            this._eventSuppended = !1
        }, e.prototype.getActivedPartModel = function () {
            var t = this._model || null;
            if (null != t) {
                var e = this.selection.selectProductThemePart();
                if (null != e) {
                    var i = this.selection.selectProductTheme().Parts.indexOf(e);
                    if (i >= 0)return this._model.Parts[i]
                }
            }
            return null
        }, e.prototype.getModel = function () {
            var t = this._model || null;
            return t
        }, e.calculatePrintDpi = function (e) {
            var i = 300;
            e.Elements.forEach(function (n) {
                if (n.ItemType == t.Models.DesignWorkElementTypes.artwork) {
                    var r = n;
                    if (r.ArtworkType != t.Models.GraphType.vector) {
                        var o = n.Width / e.DesignRegionWidth, s = e.PrintingWidthMillimeters * o, a = r.ImagePixelWidth / (s / 25.4), c = n.Height / e.DesignRegionHeight, l = e.PrintingHeightMillimeters * c, h = r.ImagePixelHeight / (l / 25.4), u = Math.min(a, h);
                        i = Math.min(u, i)
                    }
                }
            }), e.PrintDpi = i
        }, e.validateProduct = function (e) {
            var i = "";
            return $.isPlainObject(e) && $.isArray(e.Themes) && 0 != e.Themes.length ? e.Themes.some(function (e) {
                return $.isArray(e.Parts) && 0 != e.Parts.length ? t.isNotOrEmptyString(e.Version) ? (i = "抱歉，所选的商品中的配色由于缺少版本号，不能进行设计。", !0) : e.Parts.some(function (e) {
                    return t.isNumberGreateZero(e.DesignCanvasWidth) && t.isNumberGreateZero(e.DesignRegionHeight) && t.isNumberGreateZero(e.DesignRegionWidth) && t.isNumberGreateOrEqualZero(e.DesignRegionX) && t.isNumberGreateOrEqualZero(e.DesignRegionY) ? t.isNumberGreateZero(e.PrintingWidthMillimeters) && t.isNumberGreateZero(e.PrintingHeightMillimeters) ? t.isNotOrEmptyString(e.GraphFilePath) ? (i = "抱歉，所选的商品中的配色部件缺少设计图，不能进行设计。", !0) : void 0 : (i = "抱歉，所选的商品中的配色部件打印面积参数不正确，不能进行设计。", !0) : (i = "抱歉，所选的商品中的配色部件设计区域参数不正确，不能进行设计。", !0)
                }) : (i = "抱歉，所选的商品中的配色由于缺少设计部件，不能进行设计。", !0)
            }) : i = "抱歉，所选的商品数据无效，不能进行设计。", i
        }, e.addElementToCanvas = function (t, e, i) {
            var n = e.getObject(), r = t.getCanvas(), o = t.getDesignRegion();
            if (i) {
                var s = o.left + (o.width - n.getWidth()) / 2 + n.getWidth() / 2, a = o.top + (o.height - n.getHeight()) / 2 + n.getHeight() / 2;
                n.set({left: s, top: a}), e.saveModel()
            }
            r.add(n)
        }, e.findElementByObject = function (t) {
            return t.get(e.ElementPropertyName)
        }, e.degreesToRadians = function (t) {
            return t * (Math.PI / 180)
        }, e.radiansToDegrees = function (t) {
            return t * (180 / Math.PI)
        }, e.renderPart = function (t, i, n) {
            if ("undefined" != typeof i && null != i) {
                var r = t.getCanvas();
                fabric.Image.fromURL(i.CanvasGraphFileUrl, function (o) {
                    var s = Math.min(i.CanvasMaxPixelWidth, t._ui.getCanvasWidth()), a = s / i.CanvasPixelWidth, c = (t._ui.getCanvasWidth() - s) / 2, l = 0;
                    i.DesignRegionX = i.DesignRegionX * a, i.DesignRegionY = i.DesignRegionY * a, i.DesignRegionWidth = i.DesignRegionWidth * a, i.DesignRegionHeight = i.DesignRegionHeight * a, i.CanvasPixelWidth = i.CanvasPixelWidth * a, i.CanvasPixelHeight = i.CanvasPixelHeight * a, i.Elements.forEach(function (t) {
                        t.X = t.X * a, t.Y = t.Y * a, t.Width = t.Width * a, t.Height = t.Height * a
                    }), t._designRegion = {
                        left: c + i.DesignRegionX,
                        top: l + i.DesignRegionY,
                        width: i.DesignRegionWidth,
                        height: i.DesignRegionHeight
                    }, t._graphRegion = {
                        left: c,
                        top: l,
                        width: i.CanvasPixelWidth,
                        height: i.CanvasPixelHeight
                    }, r.setWidth(t._ui.getCanvasWidth()), r.setHeight(i.CanvasPixelHeight + l), t.events.designRegionChanged.trigger(t);
                    var h = t._graphRegion;
                    o.set(h);
                    var u = new fabric.Rect({
                        left: t._designRegion.left,
                        top: t._designRegion.top,
                        width: t._designRegion.width,
                        height: t._designRegion.height,
                        strokeDashArray: [2, 2],
                        stroke: t.getAppearance().regionBorderColor,
                        strokeWidth: 1,
                        fill: "transparent"
                    }), f = new fabric.Text("designer ver:" + t.version, {fontSize: 12, fill: "#666666", width: 150});
                    f.set({
                        top: i.CanvasPixelHeight - (f.getHeight() + 2),
                        left: (t._ui.getCanvasWidth() - f.getWidth()) / 2
                    });
                    var d = new fabric.Rect({
                        strokeWidth: 0,
                        fill: "transparent",
                        left: 0,
                        top: 0,
                        width: t._ui.getCanvasWidth(),
                        height: i.CanvasPixelHeight + l
                    }), g = new fabric.Group([d, o, u, f], {
                        top: 0,
                        left: 0,
                        width: t._ui.getCanvasWidth(),
                        height: i.CanvasPixelHeight + l
                    });
                    r.setBackgroundImage(g);
                    var p = t.getFabricObjects();
                    p.forEach(function (i) {
                        var n = e.findElementByObject(i).getModel();
                        i.set({
                            scaleX: n.Width / i.width,
                            scaleY: n.Width / i.width
                        }), i.set({left: n.X + t._designRegion.left, top: n.Y + t._designRegion.top})
                    }), r.renderAll(!1), t.events.printDpiChanged.trigger(t), $.isFunction(n) && n.call(t)
                })
            }
        }, e.clipToRect = function (t, i, n) {
            t.setCoords();
            var r = n, o = 1 / t.scaleX, s = 1 / t.scaleY;
            i.save();
            var a = -(t.width / 2) + 1, c = -(t.height / 2) + 1;
            r.width - 1, r.height - 1;
            i.translate(a, c), i.rotate(e.degreesToRadians(-1 * t.angle)), i.scale(o, s), i.beginPath(), i.rect(r.left - t.oCoords.tl.x, r.top - t.oCoords.tl.y, r.width - 1, r.height - 1), i.closePath(), i.restore()
        }, e.ScaleRegion = function (t, e) {
            return 1 == e ? t : (t.x = t.x * e, t.y = t.y * e, t.width = t.width * e, t.height = t.height * e, t)
        }, e.intersect = function (t, e) {
            var i = Math.max(t.left, e.left), n = Math.min(t.left + t.width, e.left + e.width), r = Math.max(t.top, e.top), o = Math.min(t.top + t.height, e.top + e.height);
            return n >= i && o >= r ? {left: i, top: r, width: n - i, height: o - r} : {
                left: 0,
                top: 0,
                width: 0,
                height: 0
            }
        }, e.GetPixelFromPhysical = function (t, e) {
            var i = e / 25.4, n = t * i;
            return n
        }, e.sortArray = function (t, e) {
            function i(t, e, i) {
                var n = t[e];
                t[e] = t[i], t[i] = n
            }

            if (t.length > 1)for (var n, r = t.length, o = 0; r > o; o++) {
                n = o;
                for (var s = o + 1; r > s; s++)e(t[s]) < e(t[n]) && (n = s);
                o != n && i(t, o, n)
            }
            return t
        }, e.ElementPropertyName = "_lbjBinding", e.LASTEST_DESIGN_STOREKEY = "__lbj_latest_design", e
    }();
    t.Designer = e
}(Labijie || (Labijie = {}));
var Labijie;
!function (t) {
    var e = function (e) {
        function i(i, n, r) {
            e.call(this, new t.DesignerElementConfig(t.DesignElementType.art), i, n, r), this.price = i.Price
        }

        return __extends(i, e), i.prototype.getMaxSize = function () {
            var e = this.designer.getDesignRegion().width;
            if (this.getModel().ArtworkType == t.Models.GraphType.vector)return {
                width: 1e4 * this.getModel().ImagePixelWidth,
                height: 1e4 * this.getModel().ImagePixelHeight
            };
            var i = t.Designer.GetPixelFromPhysical(this.designer.selection.selectProductThemePart().PrintingWidthMillimeters, this.designer.minPrintDpi), n = e / i, r = this.getModel().ImagePixelWidth * n, o = this.getModel().ImagePixelHeight * n;
            return {width: r, height: o}
        }, i.prototype.createFabricObject = function (e, i, n) {
            var r = this, o = new t.ArtBuilder;
            o.buildObject(i, function (t) {
                if (i.Width <= 0 || i.Height <= 0) {
                    var e = r.getMaxSize(), o = r.designer.getDesignRegion().width, s = .75 * o, a = Math.min(s, e.width), c = a / e.width, l = e.height * c;
                    i.Width = a, i.Height = l, t.set({width: a, height: l})
                }
                var h = r, u = t._constrainScale;
                t._constrainScale = function (e) {
                    var i = h.getMaxSize(), n = i.width / t.width;
                    return e > n && (e = n), u(e)
                }, $.isFunction(n) && n(t)
            })
        }, i
    }(t.DesignerElement);
    t.DesignerArtElement = e
}(Labijie || (Labijie = {}));
var Labijie;
!function (t) {
    var e = function () {
        function t() {
        }

        return t.getSetting = function (e) {
            return "undefined" != typeof t._settings[e] ? t._settings[e] : {
                name: "unknown",
                ascent: 1.05,
                descent: .25,
                linespace: 1.5
            }
        }, t.getLineHeight = function (e) {
            var i = t.getSetting(e);
            return i.ascent + i.descent
        }, t.getDescent = function (e) {
            var i = t.getSetting(e);
            return i.descent
        }, t.getAscent = function (e) {
            var i = t.getSetting(e);
            return i.ascent
        }, t.getLineSpace = function (e) {
            if ("undefined" != typeof t._settings[e]) {
                var i = t._settings[e];
                return i.linespace
            }
        }, t._settings = {
            "ABeeZee-Regular": {
                name: "ABeeZee",
                ascent: .92,
                descent: .262,
                linespace: 1.182,
                lineheight: 83
            },
            "Abel-Regular": {name: "Abel", ascent: .9794922, descent: .2949219, linespace: 1.274414, lineheight: 170},
            "AbrilFatface-Regular": {
                name: "Abril Fatface",
                ascent: 1.058,
                descent: .291,
                linespace: 1.349,
                lineheight: 83
            },
            "Acme-Regular": {name: "Acme", ascent: .9590001, descent: .307, linespace: 1.266, lineheight: 83},
            "Actor-Regular": {name: "Actor", ascent: .941, descent: .262, linespace: 1.203, lineheight: 83},
            "Adamina-Regular": {name: "Adamina", ascent: 1.072, descent: .29, linespace: 1.362, lineheight: 83},
            "AdventPro-Regular": {name: "Advent Pro", ascent: .964, descent: .232, linespace: 1.196, lineheight: 83},
            "AguafinaScript-Regular": {
                name: "Aguafina Script",
                ascent: .966,
                descent: .581,
                linespace: 1.547,
                lineheight: 83
            },
            "Akronim-Regular": {name: "Akronim", ascent: .989, descent: .404, linespace: 1.393, lineheight: 83},
            "Aladin-Regular": {name: "Aladin", ascent: .905, descent: .321, linespace: 1.226, lineheight: 83},
            Aldrich: {name: "Aldrich", ascent: .9140625, descent: .2861328, linespace: 1.200195, lineheight: 170},
            "Alef-Regular": {name: "Alef", ascent: 1.009277, descent: .3525391, linespace: 1.361816, lineheight: 170},
            "Alegreya-Regular": {name: "Alegreya", ascent: 1.016, descent: .345, linespace: 1.361, lineheight: 83},
            "AlegreyaSC-Regular": {name: "Alegreya SC", ascent: 1.016, descent: .345, linespace: 1.361, lineheight: 83},
            "AlexBrush-Regular": {name: "Alex Brush", ascent: .825, descent: .425, linespace: 1.25, lineheight: 83},
            "AlfaSlabOne-Regular": {
                name: "Alfa Slab One",
                ascent: 1.036,
                descent: .333,
                linespace: 1.369,
                lineheight: 83
            },
            "Alice-Regular": {name: "Alice", ascent: .909, descent: .234, linespace: 1.143, lineheight: 83},
            "Alike-Regular": {name: "Alike", ascent: .984, descent: .27, linespace: 1.254, lineheight: 83},
            "AlikeAngular-Regular": {
                name: "Alike Angular",
                ascent: .984,
                descent: .27,
                linespace: 1.254,
                lineheight: 83
            },
            "Allan-Regular": {name: "Allan", ascent: .9414063, descent: .2011719, linespace: 1.142578, lineheight: 170},
            "Allerta-Regular": {
                name: "Allerta",
                ascent: 1.032227,
                descent: .2460938,
                linespace: 1.27832,
                lineheight: 85
            },
            "Amarante-Regular": {
                name: "Amarante",
                ascent: .9863281,
                descent: .2636719,
                linespace: 1.25,
                lineheight: 170
            },
            Amaranth: {name: "Amaranth", ascent: .976, descent: .236, linespace: 1.212, lineheight: 83},
            Arvo: {name: "Arvo", ascent: .9609375, descent: .2470703, linespace: 1.234863, lineheight: 170},
            "Lohit-Devanagari": {
                name: "Lohit Devanagari",
                ascent: 1.094727,
                descent: .5029297,
                linespace: 1.857422,
                lineheight: 85
            },
            "ZCool-Black": {name: "站酷高端黑", ascent: .86, descent: .141, linespace: 1.142, lineheight: 83},
            "ZCool-Happy": {name: "站酷快乐体 ", ascent: .86, descent: .2, linespace: 1.141, lineheight: 83}
        }, t
    }();
    t.FontLineOfHeight = e
}(Labijie || (Labijie = {}));
var Labijie;
!function (t) {
    var e = function () {
        function e() {
        }

        return e.prototype.buildOptionsFromModel = function (e, i) {
            i.angle = e.RotationAngle, i.flipX = (e.Flip & t.Models.FlipType.flipX) == t.Models.FlipType.flipX, i.flipY = (e.Flip & t.Models.FlipType.flipY) == t.Models.FlipType.flipY, i.originX = "center", i.originY = "center", e.Width > 0 && e.Height > 0 && (i.width = e.Width, i.height = e.Height, i.scaleX = 1, i.scaleY = 1), i.left = e.X, i.top = e.Y
        }, e
    }();
    t.FabricObjetBuilder = e;
    var i = function (t) {
        function e() {
            t.apply(this, arguments)
        }

        return __extends(e, t), e.prototype.buildObject = function (t, e) {
            var i = {};
            i.crossOrigin = "labijie", this.buildOptionsFromModel(t, i), fabric.Image.fromURL(t.Url, function (t) {
                $.isFunction(e) && e(t)
            }, i)
        }, e
    }(e);
    t.ArtBuilder = i;
    var n = function (e) {
        function i() {
            e.apply(this, arguments)
        }

        return __extends(i, e), i.prototype.buildObject = function (t, e) {
            var i = {};
            this.buildOptionsFromModel(t, i), i.fontSize = 40, i.height = void 0;
            var n = new fabric.Text(t.Text, i);
            n._fontSizeMult = 1, n._getTopOffset = function () {
                return -this.height / 2
            }, n._renderTextStroke = function (t) {
                if (this.stroke && 0 !== this.strokeWidth || this._skipFillStrokeCheck) {
                    var e = 0;
                    t.save(), t.textBaseline = "top", t.beginPath();
                    for (var i = 0, n = this._textLines.length; n > i; i++) {
                        var r = this._getHeightOfLine(t, i);
                        this._renderTextLine("strokeText", t, this._textLines[i], this._getLeftOffset(), this._getTopOffset(), i), e += r
                    }
                    t.closePath(), t.restore()
                }
            }, n._renderTextFill = function (t) {
                if (this.fill || this._skipFillStrokeCheck) {
                    var e = 0;
                    t.textBaseline = "top";
                    for (var i = 0, n = this._textLines.length; n > i; i++) {
                        var r = this._getHeightOfLine(t, i);
                        this._renderTextLine("fillText", t, this._textLines[i], this._getLeftOffset(), this._getTopOffset(), i), e += r
                    }
                    this.shadow && !this.shadow.affectStroke && this._removeShadow(t)
                }
            }, n._fontSizeFraction = 0, $.isFunction(e) && e(n)
        }, i.prototype.buildOptionsFromModel = function (i, n) {
            e.prototype.buildOptionsFromModel.call(this, i, n), n.textAlign = "left", n.stroke = i.OutlineColor, n.strokeWidth = i.OutlineWidth, n.fontWeight = "normal", (i.TextStyle & t.Models.TextStyle.strikeout) == t.Models.TextStyle.strikeout && (n.textDecoration = "line-through"), (i.TextStyle & t.Models.TextStyle.underline) == t.Models.TextStyle.underline && (n.textDecoration = "underline"), (i.TextStyle & t.Models.TextStyle.bold) == t.Models.TextStyle.bold && (n.fontWeight = "bold"), (i.TextStyle & t.Models.TextStyle.italic) == t.Models.TextStyle.italic && (n.fontStyle = "italic"), n.fill = i.TextColor, n.fontFamily = i.FontFamily || "AbrilFatface-Regular", n.lineHeight = t.FontLineOfHeight.getLineHeight(n.fontFamily)
        }, i
    }(e);
    t.TextBuilder = n
}(Labijie || (Labijie = {}));
var Labijie;
!function (t) {
    var e = function (e) {
        function i(i, n, r) {
            e.call(this, new t.DesignerElementConfig(t.DesignElementType.text), i, n, r)
        }

        return __extends(i, e), i.prototype.onAdded = function (t) {
            e.prototype.onAdded.call(this, t);
            var i = this.getModel();
            i.Width > 0 && this.fabricObject.getWidth() != i.Width && this.fabricObject.scale(i.Width / this.fabricObject.width), (0 == i.Width || 0 == i.Height) && (i.Width = this.fabricObject.getWidth(), i.Height = this.fabricObject.getHeight())
        }, i.prototype.getColor = function (t) {
            return "transparent" == t ? "transparent" : "#" + new fabric.Color(t).toHex()
        }, i.prototype.saveModel = function () {
            e.prototype.saveModel.call(this);
            var i = this.fabricObject, n = this.getModel();
            n.Text = i.getText(), n.OutlineColor = this.getColor(i.stroke), n.OutlineWidth = i.strokeWidth, n.TextStyle = t.Models.TextStyle.regular, "line-through" == i.textDecoration && (n.TextStyle |= t.Models.TextStyle.strikeout), "underline" == i.textDecoration && (n.TextStyle |= t.Models.TextStyle.underline), "bold" == i.fontWeight && (n.TextStyle |= t.Models.TextStyle.bold), "italic" == i.fontStyle && (n.TextStyle |= t.Models.TextStyle.italic), n.FontFamily = i.fontFamily, n.TextColor = this.getColor(i.fill), n.LineHeight = i.lineHeight
        }, i.prototype.createFabricObject = function (e, i, n) {
            var r = new t.TextBuilder;
            r.buildObject(i, function (t) {
                $.isFunction(n) && n(t)
            })
        }, i
    }(t.DesignerElement);
    t.DesignerTextElement = e
}(Labijie || (Labijie = {}));
var desinger = {
    shareEntryAdded: !1, shown: !1, wxShareSet: !1, Product: {
        _product: {}, set: function (t) {
            _product = t
        }, get: function () {
            return "undefined" == typeof _product ? {} : _product
        }
    }, show: function (t) {
        desinger.shown || ("undefined" == typeof desinger.Product.get().Id && t === !0 ? desinger.loadProduct(null, function () {
            desinger.show()
        }) : ($("#designer-indicator").hide(), $("#designer-loader").fadeIn(1e3), $(".designer-loaded").fadeIn(1e3), desinger.shown = !0))
    }, registerWechatShareContent: function () {
        if (!desinger.wxShareSet && (desinger.wxShareSet = !0, "undefined" != typeof registerWxShare && $.isFunction(registerWxShare) && "undefined" != typeof d)) {
            var t = d.getModel();
            if ($.isPlainObject(t) && 0 != t) {
                var e = {
                    title: "我在蜡笔街设计了" + desinger.Product.get().DisplayName,
                    link: "http://" + clientEnv.host + (null != clientEnv.port ? ":" + clientEnv.port : "") + "/designs/share/" + t.Id,
                    desc: "这是我在蜡笔街设计的作品，你也来试一试吧！",
                    imgUrl: "http://" + clientEnv.host + (null != clientEnv.port ? ":" + clientEnv.port : "") + "/designs/thumb/" + t.Id
                };
                registerWxShare.call(this, e), $(".wechat-hint").text("大作已准备好啦，试试分享到朋友圈吧！")
            }
        }
    }, isSmallWindow: function () {
        return $(".mobile-menu").is(":visible")
    }, mask: function (t) {
        t = t || !1, t && !$("#designer-indicator").is(":visible") ? $.mask.overlay('div[data-lbj-toggle="designer"]') : $.mask.unoverlay('div[data-lbj-toggle="designer"]')
    }, _request: function (t, e) {
        return "object" == typeof t && (e = t, t = void 0), e.url = t || e.url, e.overlay = !1, void 0 == e.context && (e.context = this), e && (e.cache = !1), jQuery.ajax(e)
    }, validateDesign: function (t, e) {
        desinger.mask(!0), desinger._request({
            type: "POST",
            url: "/Designer/Validate",
            data: {model: t}
        }).done(function (t) {
            $.isFunction(e) && e.call(this, t)
        }).fail(function () {
            $.isFunction(e) && e.call(this, {valid: !1})
        })
    }, loadProduct: function (t, e) {
        desinger.mask(!0), desinger._request({
            type: "GET",
            url: "/Designer/Product",
            data: {id: t || null}
        }).done(function (t) {
            var e = Labijie.Designer.validateProduct(t);
            if (e.length > 0) {
                if (debug) {
                    var i = $.isPlainObject(t) ? "productId: " + t.Id : "";
                    console.log(e + "（" + i + "）")
                }
                return desinger.mask(!1), void $.toast.warning(e)
            }
            desinger.Product.set(t);
            var n = t.Themes[0];
            desinger.loadProductAttributes(t), desinger.loadProductTheme(n, !0, function () {
                desinger.mask(!1)
            }), desinger.loadProductColors(t)
        }).always(function () {
            $.isFunction(e) && e.call(this)
        })
    }, loadProductTheme: function (t, e, i) {
        desinger.loadProductThumbs(t), appendCanvas(), e ? d.selection.selectProduct(desinger.Product.get(), function () {
            $.isFunction(i) && i.call(this)
        }) : $.isFunction(i) && i.call(this);
        var n = $("div.productDescription:first");
        if (n.length > 0) {
            var r = {url: "/Products/Descriptions/" + desinger.Product.get().Id + "/" + t.Id, overlay: !1};
            $.ajax(r).done(function (t) {
                n.update(t)
            })
        }
    }, loadProductThumbs: function (t) {
        var e = jQuery("#product-thumbs");
        e.empty();
        var i = jQuery("#design-part-thumbs-tmpl").render(t);
        e.append(i), e.find(".box-thumb").first().addClass("active")
    }, loadProductColors: function (t, e) {
        var i = jQuery("#product-colors"), n = jQuery(".mobile-themes"), t = CalculateThemeColors(t), r = jQuery("#product-theme-colors-tmpl").render(t), o = jQuery("#mobile-product-theme-colors-tmpl").render(t);
        if (n.html(o), i.html(r), "undefined" != typeof e && null != e) {
            var s = '.color-switch[data-theme-id="' + e.Id + '"]';
            jQuery(s).addClass("active")
        } else {
            var a = jQuery(".color-switch").first().data("theme-id"), s = '.color-switch[data-theme-id="' + a + '"]';
            jQuery(s).addClass("active")
        }
    }, loadDesignWorkInfo: function (t) {
        var e = t.model, i = t.product, n = null;
        jQuery(i.Themes).each(function (t, i) {
            e.ProductThemeId == i.Id && e.ProductThemeVersion == i.Version && (n = i)
        }), desinger.Product.set(i), desinger.loadProductAttributes(i), desinger.loadProductTheme(n), desinger.loadProductColors(i, n)
    }, displayPreview: function (t) {
        var e = d.getModel(), i = e.Parts.length, n = [], r = function (e) {
            e >= 0 && i > e ? d.exportImage(function (o, s) {
                n.push({img: o, part: s});
                var a = e + 1;
                if (a == i) {
                    var c = $.templates("#preview-tmpl"), l = c.render({results: n});
                    $.isFunction(t) && t.call(this), $.modal({
                        title: "设计预览", content: l, buttons: !1, onShow: function () {
                            $("#designer-preview-carousel", this).carousel({interval: 5e3, animation: "fade"})
                        }, onHidden: function () {
                            $("#preview-container").remove()
                        }
                    }), $("[id^=carousel-selector-]").click(function () {
                        var t = $(this).attr("id");
                        try {
                            var e = /-(\d+)$/.exec(t)[1];
                            debug && console.log(t, e), jQuery("#designer-preview-carousel").carousel(parseInt(e))
                        } catch (i) {
                            console.log("Regex failed!", i)
                        }
                    })
                } else r(a)
            }, e, 500) : $.isFunction(t) && t.call(this)
        };
        r(0)
    }, activeLayer: function () {
        var t = $(".dg-layers");
        t.find("li").removeClass("active");
        var e = d.selection.selectElementAt();
        e >= 0 && t.find('li[data-lbj-designer-element-index="' + e + '"]').addClass("active")
    }, refreshLayers: function () {
        var t = d.getActivedPart();
        if (null != t) {
            var e = $.templates("#layers-tmpl"), i = [];
            if (t.Elements.length > 0)for (var n = t.Elements.length - 1; n >= 0; n--)i.push(t.Elements[n]);
            var r = $(".dg-layers"), o = e.render({elements: i});
            r.update(o);
            var s, a = -1;
            $("ol", r).sortable({
                onDragStart: function (t, e, i) {
                    var n = t.offset(), r = e.rootGroup.pointer;
                    s = {left: r.left - n.left, top: r.top - n.top};
                    var o = d.getActivedPart();
                    a = o.Elements.length - 1 - t.index(), i(t, e)
                }, onDrag: function (t, e, i) {
                    i(t, e), t.css("left", e.left - s.left), t.css("top", e.top - s.top)
                }, onDrop: function (e, i, n) {
                    var r = t.Elements.length - 1 - e.index();
                    r != a && d.moveElementLayer(a, r), n(e, i)
                }
            })
        }
    }, changePart: function (t) {
        desinger.mask(!0);
        var e = jQuery(t), i = e.closest("#product-thumbs").find(".box-thumb");
        i.each(function (t, e) {
            jQuery(e).removeClass("active")
        }), e.addClass("active");
        var n = e.data("index");
        d.selection.selectProductThemePartAt(n, function () {
            desinger.mask(!1)
        }), desinger.refreshLayers()
    }, changeTheme: function (t) {
        desinger.mask(!0);
        var e = jQuery(t);
        jQuery(".color-switch").removeClass("active");
        var i = e.data("index");
        d.selection.selectProductThemeAt(i, function () {
            desinger.mask(!1)
        }), jQuery(".color-switch[data-index=" + i + "]").addClass("active");
        var n = desinger.getProductTheme(i);
        desinger.loadProductTheme(n), desinger.refreshLayers()
    }, getProductTheme: function (t) {
        var e = null, i = desinger.Product.get();
        return jQuery(i.Themes).each(function (i, n) {
            i == t && (e = n)
        }), e
    }, loadProductAttributes: function (t) {
        jQuery("#product-attributes").empty();
        var e = t.Attributes, i = !1;
        if (e.length > 0)jQuery.each(e, function (t, n) {
            if (2 == (2 & e[t][0].AttributeUsage))switch (e[t][0].AttributeStyle) {
                case 1:
                    var r = {
                        Attributes: n,
                        DisplayName: e[t][0].AttributeDisplayName,
                        HasInput: i
                    }, o = jQuery("#attribute-multiple-tmpl").render(r);
                    jQuery("#product-attributes").update(o), i = !0;
                    break;
                case 2:
                case 3:
                    var r = {
                        Attributes: n,
                        DisplayName: e[t][0].AttributeDisplayName,
                        HasInput: i
                    }, o = jQuery("#attribute-select-tmpl").render(r);
                    jQuery("#product-attributes").update(o), i || (i = !0);
                    break;
                case 255:
                    var r = {
                        Attributes: n,
                        DisplayName: e[t][0].AttributeDisplayName,
                        HasInput: i
                    }, o = jQuery("#attribute-text-tmpl").render(r);
                    jQuery("#product-attributes").update(o), i || (i = !0)
            }
        }); else {
            var n = jQuery("#attribute-default-tmpl").render();
            jQuery("#product-attributes").append(n)
        }
        setDefaultCount()
    }, getShoppingCartItem: function () {
        var t = [], e = [];
        if (jQuery("#product-attributes option:selected").length > 0 && jQuery("#product-attributes option:selected").each(function (t, i) {
                i = jQuery(i), e.push({
                    AttributeId: i.val(),
                    AttributeDisplayName: i.data("displayname"),
                    AttributeValue: i.text()
                })
            }), jQuery("#product-attributes input.J-SingleInput").length > 0) {
            var i = jQuery("#product-attributes option:selected"), n = jQuery("#product-attributes input.J-SingleInput")[0], r = {}, o = i.val(), s = jQuery(i).data("displayname"), a = i.text(), c = [];
            c.push({
                AttributeId: o,
                AttributeDisplayName: s,
                AttributeValue: a
            }), r.Quantity = n.value, r.AttributesJson = JSON.stringify(c), t.push(r)
        } else jQuery("#product-attributes input").each(function (i, n) {
            var r = {}, o = n.getAttribute("name"), s = jQuery(n).data("displayname"), a = jQuery(n).data("attributevalue"), c = [];
            c.push({AttributeId: o, AttributeDisplayName: s, AttributeValue: a}), jQuery(e).each(function (t, e) {
                c.push(e)
            }), r.Quantity = n.value, r.AttributesJson = JSON.stringify(c), t.push(r)
        });
        return t
    }, getPrice: function () {
        var t = 0;
        jQuery('#product-attributes input[type="text"]').each(function (e, i) {
            t += parseInt(jQuery(i).val())
        });
        var e = (parseFloat(d.getPriceSum()) * t).toFixed(2), i = "免费";
        e > 0 && (i = "¥" + e), jQuery(".price-sale-number").text(i)
    }, loadDesign: function (t, e) {
        desinger._request({type: "GET", url: "/Designer/LoadDesign", data: {id: t}}).done(function (t) {
            $.isPlainObject(t) && $.isPlainObject(t.model) && $.isPlainObject(t.product) && (d.importDesign(t.model, t.product), desinger.loadDesignWorkInfo(t), desinger.registerWechatShareContent(), compareThemeVersion(t.model, t.product) && changeProductColorBox(t.model))
        }).always(function () {
            $.isFunction(e) && e.call(this)
        })
    }, loadSnapshot: function (t, e) {
        desinger._request({type: "GET", url: "/Designer/LoadSnapshot", data: {id: t}}).done(function (t) {
            $.isPlainObject(t) && $.isPlainObject(t.model) && $.isPlainObject(t.product) && (d.importDesign(t.model, t.product), desinger.loadDesignWorkInfo(t), desinger.registerWechatShareContent(), compareThemeVersion(t.model, t.product) && changeProductColorBox(t.model))
        }).always(function () {
            $.isFunction(e) && e.call(this)
        })
    }, loadArtwork: function (t, e) {
        desinger.mask(!0), desinger._request({type: "GET", url: "/Designer/Art", data: {id: t}}).done(function (t) {
            d.newArt(t.FileURL, t, function () {
                desinger.mask(!1)
            }), desinger.getPrice()
        }).always(function () {
            desinger.mask(!1), $.isFunction(e) && e.call(this)
        })
    }
};
$(function () {
    jQuery("body").on("click", "#product-thumbs .box-thumb", function (t) {
        t.preventDefault(), desinger.changePart(this)
    }), jQuery("body").on("click", ".color-switch", function (t) {
        return t.preventDefault(), desinger.changeTheme(this), !1
    }), jQuery("body").on("change", '#product-attributes input[type="text"]', function (t) {
        t.preventDefault(), desinger.getPrice()
    }), jQuery("body").on("click", ".add_item_text", function (t) {
        t.preventDefault(), d.newText("Hello")
    }), jQuery("body").on("click", "#dgm-arts a.dgm-art", function (t) {
        t.preventDefault();
        var e = jQuery(this).data("item");
        jQuery("#dg-arts").modal("hide"), desinger.mask(!0), d.newArt(e.FileURL, e, function () {
            desinger.mask(!1)
        }), desinger.getPrice()
    }), jQuery("body").on("click", "#dgm-products div.product-box", function (t) {
        jQuery("#dg-products").modal("hide"), t.preventDefault();
        var e = jQuery(this).data("id");
        return desinger.loadProduct(e), !1
    }), jQuery("body").on("click", ".list-fonts a", function (t) {
        t.preventDefault();
        var e = jQuery(this).data("font-family"), i = {fontFamily: e};
        d.executeCommand("changeTextFont", i), jQuery("#txt-fontfamily").text(e), $("#dg-fonts").find("a.box-font.active").removeClass("active"), $(this).addClass("active"), jQuery("#dg-fonts").modal("hide")
    }), jQuery("body").on("click", ".popover-close", function (t) {
        jQuery(".popover").hide()
    }), jQuery("body").on("click", "#options-add_item_clipart .rotate-refresh", function () {
        jQuery("#options-add_item_clipart .rotate-value").val(0), d.executeCommand("rotate", {angle: 0})
    }), jQuery("body").on("keyup change input", "#enter-text", function (t) {
        t.preventDefault();
        var e = jQuery(this).val();
        d.executeCommand("changeText", e), desinger.refreshLayers()
    }), jQuery("body").on("click", "#txt-color", function (t) {
        return $(this).popover("toggle"), t.preventDefault(), !1
    }), jQuery("body").on("click", ".popover .bg-colors", function (t) {
        t.preventDefault();
        var e = jQuery(this).data("color");
        d.executeCommand("changeTextColor", {color: e});
        var i = jQuery("#txt-color");
        "transparent" == (e || "transparent") ? (i.css("background-color", ""), i.addClass("graph-paper-sm")) : (i.css("background-color", e || "transparent"), i.removeClass("graph-paper-sm")), i.popover("toggle")
    }), jQuery("body").on("click", "#outline-color", function (t) {
        return $(this).popover("toggle"), t.preventDefault(), !1
    }), jQuery("body").on("click", ".line-colors", function (t) {
        t.preventDefault();
        var e = jQuery(this).attr("data-color");
        d.executeCommand("changeTextStroke", {color: e});
        var i = jQuery("#outline-color");
        "transparent" == (e || "transparent") ? (i.css("background-color", ""), i.addClass("graph-paper-sm")) : (i.css("background-color", e || "transparent"), i.removeClass("graph-paper-sm")), i.popover("toggle")
    }), jQuery("body").on("change", ".outline-value", function (t) {
        var e = parseInt(jQuery(this).val());
        e = Math.min(3, e);
        var i = jQuery(this).attr("data-color");
        d.executeCommand("changeTextStroke", {color: i, width: e})
    }), jQuery("body").on("click", "#options-add_item_text .rotate-refresh", function () {
        jQuery("#options-add_item_text .rotate-value").val(0), d.executeCommand("rotate", {angle: 0})
    }), jQuery("body").on("click", "#text-style-i", function (t) {
        t.preventDefault();
        var e = jQuery(this);
        if (e.hasClass("active")) {
            e.removeClass("active");
            var i = {fontStyle: Labijie.FontStyle.normal};
            d.executeCommand("changeTextFont", i)
        } else {
            e.addClass("active");
            var i = {fontStyle: Labijie.FontStyle.italic};
            d.executeCommand("changeTextFont", i)
        }
        return !1
    }), jQuery("body").on("click", "#text-style-b", function (t) {
        t.preventDefault();
        var e = jQuery(this);
        if (e.hasClass("active")) {
            e.removeClass("active");
            var i = {fontWeight: Labijie.FontWeight.normal};
            d.executeCommand("changeTextFont", i)
        } else {
            e.addClass("active");
            var i = {fontWeight: Labijie.FontWeight.bold};
            d.executeCommand("changeTextFont", i)
        }
    }), jQuery("body").on("touchend click", "li.layer", function (t) {
        var e = $(this).data("lbj-designer-element-index");
        d.selection.selectElementAt(e)
    }), jQuery("body").on("touchend click", ".layer-action-remove>a", function (t) {
        var e = $(this).closest("li"), i = e.data("lbj-designer-element-index");
        d.executeCommand("remove", {index: i})
    }), jQuery("body").on("click", "#dg-help-centerH", function (t) {
        t.preventDefault(), d.executeCommand("centerH")
    }), jQuery("body").on("click", "#dg-help-centerV", function (t) {
        t.preventDefault(), d.executeCommand("centerV")
    }), jQuery("body").on("click", "#dg-help-left", function (t) {
        t.preventDefault(), d.executeCommand("translate", {x: -1})
    }), jQuery("body").on("click", "#dg-help-right", function (t) {
        t.preventDefault(), d.executeCommand("translate", {x: 1})
    }), jQuery("body").on("click", "#dg-help-up", function (t) {
        t.preventDefault(), d.executeCommand("translate", {y: -1})
    }), jQuery("body").on("click", "#dg-help-down", function (t) {
        t.preventDefault(), d.executeCommand("translate", {y: 1})
    }), jQuery("body").on("click", "#dg-help-layer-up", function (t) {
        t.preventDefault(), d.executeCommand("bringForward"), desinger.refreshLayers()
    }), jQuery("body").on("click", "#dg-help-layer-down", function (t) {
        t.preventDefault(), d.executeCommand("bringBackwards"), desinger.refreshLayers()
    }), jQuery("body").on("click", "#dg-help-remove", function (t) {
        var e = d.selection.selectElementAt();
        d.executeCommand("remove", {index: e}), desinger.getPrice()
    }), jQuery("body").on("click", "#dg-help-clear", function (t) {
        t.preventDefault(), $.modal({
            title: "确认操作",
            content: "重置将清空当前部件的设计区域，是否继续？",
            confirm: "是",
            cancel: "否",
            onConfirm: function () {
                d.executeCommand("clearRegion"), desinger.refreshLayers(), $.closeModal()
            }
        })
    }), jQuery("body").on("change", "#clipart-rotate-value", function (t) {
        var e = parseInt(jQuery(this).val()) % 360;
        d.executeCommand("rotate", {angle: e})
    }), jQuery("body").on("change", "#text-rotate-value", function (t) {
        var e = parseInt(jQuery(this).val()) % 360;
        d.executeCommand("rotate", {angle: e})
    }), jQuery("body").on("click", ".price-restart", function (t) {
        t.preventDefault(), desinger.getPrice()
    }), jQuery("body").on("click", ".share-close", function (t) {
        $(".share-modal").modal("hide")
    }), jQuery("body").on("click", ".btn-share", function (t) {
        t.preventDefault();
        var e = d.getModel(), i = e.Parts.some(function (t) {
            return t.Elements.length > 0
        });
        return i ? ($(".share-result").hide(), $(".share-saving").show(), $(".share-modal").modal({
            backdrop: !1,
            show: !0
        }), d.exportImage(function (t) {
            desinger._request({type: "POST", url: "/Designer/Save", data: {work: e, dataURI: t}}).done(function (t) {
                desinger.registerWechatShareContent();
                var e = $(".share-link");
                e.length > 0 && 0 == desinger.shareEntryAdded && (e.each(function () {
                    var e = $(this), i = "http://www.jiathis.com/send/?webid={0}&url={1}&title={2}&summary={3}&pic={4}&appkey={5}&ralateuid={6}&uid=2101989", n = "http://" + clientEnv.host + (null != clientEnv.port ? ":" + clientEnv.port : "") + "/designs/share/" + t, r = "http://" + clientEnv.host + (null != clientEnv.port ? ":" + clientEnv.port : "") + "/designs/thumb/" + t, o = "我在蜡笔街设计了" + desinger.Product.get().DisplayName, s = e.attr("share-uid") || "", a = e.attr("share-appkey") || "", c = "这是我在蜡笔街设计的作品，你也来试一试吧！";
                    i = String.format(i, e.attr("share-code"), n, o, c, r, a, s), e.attr("href", i)
                }), desinger.shareEntryAdded = !0), $(".share-success").show(), d.getModel().Id = t
            }).fail(function () {
                $(".share-error").show()
            }).always(function () {
                $(".share-saving").hide()
            })
        }), !1) : (desinger.mask(!1), void $.modalAlert("要向你的朋友 show 一下你大作至少应该设计一下吧。"))
    }), jQuery("body").on("click", "#btn-save", function (t) {
        t.preventDefault(), desinger.mask(!0);
        var e = d.getModel(), i = e.Parts.some(function (t) {
            return t.Elements.length > 0
        });
        return i ? (d.exportImage(function (t) {
            desinger._request({type: "POST", url: "/Designer/Save", data: {work: e, dataURI: t}}).done(function (t) {
                d.getModel().Id = t, desinger.registerWechatShareContent(), $.toast.success("设计已保存，可以到我的设计中查看。")
            }).always(function () {
                desinger.mask(!1)
            })
        }), !1) : (desinger.mask(!1), void $.toast.warning("至少要对一个部件进行设计。"))
    }), jQuery("body").on("click", "#btn-preview", function (t) {
        return desinger.mask(!0), desinger.displayPreview(function () {
            desinger.mask(!1)
        }), t.preventDefault(), !1
    }), jQuery("body").on("click", "#myArtsList a.thumbnail", function (t) {
        t.preventDefault();
        var e = jQuery(this).data("item");
        d.newArt(e.FileURL, e), jQuery.closeModal()
    }), jQuery("body").on("click", ".btn-mobile-layers, .col-left .arrow-mobile", function (t) {
        var e = $(".dg-layers").closest(".dg-box"), i = jQuery(".col-left .arrow-mobile");
        return e.is(":visible") ? (e.hide(), i.hide(), i.css("left", "0"), i.css("right", "")) : (e.css("display", "inline-block"), i.show(), i.css("right", -32), i.css("left", "auto")), t.preventDefault(), !1
    }), jQuery("body").on("click", ".btn-mobile-edit", function (t) {
        var e = d.activeElement();
        if (null != e) {
            var i = e.getModel();
            switch (i.ItemType) {
                case Labijie.Models.DesignWorkElementTypes.artwork:
                    popover("#options-art", !0);
                    break;
                case Labijie.Models.DesignWorkElementTypes.text:
                    popover("#options-text", !0)
            }
        }
        return t.preventDefault(), !1
    }), jQuery("body").on("click", ".btn-mobile-cart, .col-right .arrow-mobile", function (t) {
        t.preventDefault();
        var e = jQuery(".col-right .arrow-mobile"), i = jQuery(".dg-right");
        jQuery(".col-right i.glyphicons");
        return "block" == i.css("display") ? (i.css("display", "none"), e.css("display", "none"), e.css("right", 0), e.css("left", "auto")) : (e.css("display", "block"), i.css("display", "block"), e.css("right", "auto"), e.css("left", -32)), !1
    }), jQuery("body").on("click", "#btn-addToCart", function (t) {
        t.preventDefault(), desinger.mask(!0);
        var e = desinger.getShoppingCartItem(), i = {}, n = d.getModel(), r = n.Parts.some(function (t) {
            return t.Elements.length > 0
        });
        return r ? (i.ProductThemeColor = n.Appearances, i.DisplayName = n.DisplayName, i.Items = e, i.ProductThemeId = n.ProductThemeId, void d.exportImage(function (t) {
            desinger._request({
                type: "POST",
                url: "/ShoppingCart/Designer/AddToCart",
                data: {work: n, dataURI: t, entry: JSON.stringify(i)}
            }).done(function (t) {
                t.Result > 0 && (jQuery(document).triggerHandler("minicart.showMiniCartList"), $.toast.success("添加购物车成功。"))
            }).always(function () {
                desinger.mask(!1)
            })
        })) : (desinger.mask(!1), void $.toast.warning("至少要对一个部件进行设计。"))
    }), jQuery("body").on("htmlLoaded", function (t, e) {
        var i = $('div[data-lbj-toggle="designer"]', e);
        if (i.length > 0) {
            jQuery("body").trigger("designerLoading", i);
            var n = $(e);
            if (jQuery("#design-area", n).length > 0) {
                if (appendCanvas(), desinger.designWorkId > 0)desinger.loadDesign(desinger.designWorkId, function () {
                    desinger.show(!0)
                }); else if ("undefined" != typeof desinger.snapshotId && desinger.snapshotId.length > 0)desinger.loadSnapshot(desinger.snapshotId, function () {
                    desinger.show(!0)
                }); else if (desinger.artworkId > 0)desinger.loadProduct(null, function () {
                    desinger.show(), desinger.loadArtwork(desinger.artworkId)
                }); else if (desinger.productId > 0)desinger.loadProduct(desinger.productId, function () {
                    desinger.show()
                }); else {
                    var r = d.getLastestDesign();
                    null != r && $.isPlainObject(r.model) ? desinger.validateDesign(r.model, function (t) {
                        if (t.valid) {
                            desinger.Product.set(t.product);
                            var e = null;
                            $(t.product.Themes).each(function () {
                                return this.Id == r.model.ProductThemeId ? (e = this, !1) : void 0
                            }), desinger.loadProductAttributes(t.product), desinger.loadProductTheme(e, !1, function () {
                                desinger.loadProductColors(t.product, e), desinger.show(), d.importDesign(r.model, t.product).always(function () {
                                    desinger.mask(!1)
                                })
                            })
                        } else d.removeLastestDesign(), desinger.loadProduct(null, function () {
                            desinger.show()
                        })
                    }) : desinger.loadProduct(null, function () {
                        desinger.show()
                    })
                }
                var o = $.browser.mobile ? "top" : "right", s = {
                    html: !0,
                    container: "#designer-container",
                    placement: o,
                    trigger: "manual",
                    title: "选择颜色",
                    content: jQuery("#popover-colors-tmpl").html()
                }, a = {
                    html: !0,
                    container: "#designer-container",
                    placement: o,
                    trigger: "manual",
                    title: "选择颜色",
                    content: jQuery("#popover-outline-colors-tmpl").html()
                };
                jQuery("#outline-color").popover(a), jQuery("#outline-color").on("hidden.bs.popover", function () {
                    $(".pop-colors").closest(".popover").remove()
                }), jQuery("#txt-color").popover(s), jQuery("#txt-color").on("hidden.bs.popover", function () {
                    $(".pop-colors").closest(".popover").remove()
                });
                var c = jQuery(".designer-sliders", n);
                if (c.length > 0) {
                    var l = c.data("nouislider-min"), h = c.data("nouislider-max"), u = c.data("nouislider-target-input"), f = (noUiSlider.create(c[0], {
                        start: l,
                        connect: !1,
                        range: {min: l, max: h}
                    }), !1);
                    $(u).change(function () {
                        if (!f) {
                            var t = $(this).val();
                            c[0].noUiSlider.set([t])
                        }
                    }), c[0].noUiSlider.on("update", function (t, e) {
                        var i = $(u);
                        i.length > 0 && (f = !0, $(u).val(parseFloat(t[0])), f = !1, d.executeCommand("changeTextStroke", {width: parseFloat(t[0])}))
                    })
                }
                $(".dg-options>.dg-options-toolbar").find("button[data-type]").click(function () {
                    jQuery("#outline-color").popover("hide"), jQuery("#txt-color").popover("hide");
                    var t = $(this), e = t.data("type"), i = ".toolbar-action-" + e, n = t.closest(".dg-options").children(".dg-options-content");
                    n.addClass("active"), n.children().removeClass("active"), n.find(i).addClass("active")
                })
            }
        }
    })
});
var DesignerUI = {
    alert: function (t, e) {
        jQuery.toast.info(t, e)
    }, showSpinner: function (t) {
        desinger.mask(!0)
    }, hideSpinner: function () {
        desinger.mask(!1)
    }
};