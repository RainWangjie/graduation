(function (global) {

    'use strict';

    var fabric = global.fabric || (global.fabric = {}),
        extend = fabric.util.object.extend;

    /**
     * Mask filter class
     * See http://resources.aleph-1.com/mask/
     * @class fabric.Image.filters.Mask
     * @memberOf fabric.Image.filters
     * @extends fabric.Image.filters.BaseFilter
     * @see {@link fabric.Image.filters.Mask#initialize} for constructor definition
     */
    fabric.Image.filters.MaskUp = fabric.util.createClass(fabric.Image.filters.BaseFilter, /** @lends fabric.Image.filters.Mask.prototype */ {

        /**
         * Filter type
         * @param {String} type
         * @default
         */
        type: 'MaskUp',
        /**
         * Constructor
         * @memberOf fabric.Image.filters.Mask.prototype
         * @param {Object} [options] Options object
         * @param {fabric.Image} [options.mask] Mask image object
         * @param {Number} [options.channel=0] Rgb channel (0, 1, 2 or 3)
         */
        initialize: function (options) {
            options = options || {};
            this.mask = options.mask;
            this.channel = [0, 1, 2, 3].indexOf(options.channel) > -1 ? options.channel : 0;
        },

        /**
         * Applies filter to canvas element
         * @param {Object} canvasEl Canvas element to apply filter to
         */
        applyTo: function (canvasEl) {
            if (!this.mask) {
                return;
            }
            var context = canvasEl.getContext('2d'),
                maskEl = this.mask.getElement(),
                imgCanvasEl = fabric.util.createCanvasElement(),
                imgCtx = imgCanvasEl.getContext('2d'),
                maskCanvasEl = fabric.util.createCanvasElement(),
                maskImgCtx = maskCanvasEl.getContext('2d'),
                i;
            imgCanvasEl.width = print.w;
            imgCanvasEl.height = print.h;
            maskCanvasEl.width = print.w;
            maskCanvasEl.height = print.h;

            //清空画布
            imgCtx.clearRect(0, 0, print.w, print.h);
            maskImgCtx.clearRect(0, 0, print.w, print.h);
            maskCtx.clearRect(0, 0, print.w, print.h);
            maskCtx.save();
            var img = canvas.getActiveObject(),
                imgEl = document.getElementById(img.id),
                options = {
                    top: img.getTop(),
                    left: img.getLeft(),
                    scale: img.getScaleX(),
                    rotate: img.getAngle()
                };
            console.log(options);
            var img_w = img.width * options.scale,
                img_h = img.height * options.scale;
            imgCtx.translate(print.w / 2, print.h / 2);
            imgCtx.rotate(options.rotate * Math.PI / 180);
            imgCtx.drawImage(imgEl, options.left - print.x, options.top - print.y, img_w, img_h);

            maskCtx.translate(print.w / 2, print.h / 2);
            maskCtx.rotate(options.rotate * Math.PI / 180);
            maskCtx.drawImage(imgEl, options.left - print.x, options.top - print.y, img_w, img_h);
            maskCtx.restore();

            var imageData = imgCtx.getImageData(0, 0, print.w, print.h),
                data = imageData.data;

            maskImgCtx.drawImage(maskEl, 0, 0, print.w, print.h);
            var maskImageData = maskImgCtx.getImageData(0, 0, print.w, print.h),
                maskData = maskImageData.data;

            for (i = 0; i < maskData.length; i += 4) {
                if (maskData[i + 3] == 0) {
                    data[i + 3] = 0;
                }
            }
            context.putImageData(imageData, 0, 0);
        },

        /**
         * Returns object representation of an instance
         * @return {Object} Object representation of an instance
         */
        toObject: function () {
            return extend(this.callSuper('toObject'), {
                mask: this.mask.toObject(),
                channel: this.channel
            });
        }
    });

    /**
     * Returns filter instance from an object representation
     * @static
     * @param {Object} object Object to create an instance from
     * @param {Function} [callback] Callback to invoke when a mask filter instance is created
     */
    fabric.Image.filters.Mask.fromObject = function (object, callback) {
        fabric.util.loadImage(object.mask.src, function (img) {
            object.mask = new fabric.Image(img, object.mask);
            callback && callback(new fabric.Image.filters.Mask(object));
        });
    };

    /**
     * Indicates that instances of this type are async
     * @static
     * @type Boolean
     * @default
     */
    fabric.Image.filters.Mask.async = true;

})(typeof exports !== 'undefined' ? exports : this);