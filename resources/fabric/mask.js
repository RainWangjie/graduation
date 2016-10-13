/**
 * Created by gewangjie on 2016/10/11.
 */
fabric.Image.filters.Mask = fabric.util.createClass({
    type: 'Mask',
    initialize: function(options) {
        this.mask = options.mask || null;
        this.channel = [ 0, 1, 2, 3 ].indexOf( options.channel ) > -1 ? options.channel : 0;
    },
    applyTo: function(canvasEl) {
        if(!this.mask) return;
        var context = canvasEl.getContext('2d'),
            imageData = context.getImageData(0, 0, canvasEl.width, canvasEl.height),
            data = imageData.data,
            maskEl = this.mask._originalImage,
            maskCanvasEl = fabric.util.createCanvasElement(),
            channel = this.channel,
            i;
        maskCanvasEl.width = maskEl.width;
        maskCanvasEl.height = maskEl.height;
        maskCanvasEl.getContext('2d').drawImage(maskEl, 0, 0, maskEl.width, maskEl.height);
        var maskImageData = maskCanvasEl.getContext('2d').getImageData(0, 0, maskEl.width, maskEl.height),
            maskData = maskImageData.data;
        for ( i = 0; i < imageData.width * imageData.height * 4; i += 4 ) {
            data[ i + 3 ] = maskData[ i + channel ];
        }
        context.putImageData( imageData, 0, 0 );
    }
});