/**
 * Created by gewangjie on 16/8/25.
 */
// TexturedQuad.js (c) 2012 matsuda and kanda
// Vertex shader program
var VSHADER_SOURCE =
    'attribute vec4 a_Position;\n' +
    'attribute vec2 a_TexCoord;\n' +
    'uniform mat4 u_ModelMatrix;\n' +
    'varying vec2 v_TexCoord;\n' +
    'void main() {\n' +
    '  gl_Position = u_ModelMatrix * a_Position;\n' +
    '  v_TexCoord = a_TexCoord;\n' +
    '}\n';

// Fragment shader program
var FSHADER_SOURCE =
    '#ifdef GL_ES\n' +
    'precision mediump float;\n' +
    '#endif\n' +
    'uniform sampler2D u_Sampler;\n' +
    'varying vec2 v_TexCoord;\n' +
    'void main() {\n' +
    '  gl_FragColor = texture2D(u_Sampler, v_TexCoord);\n' +
    '}\n';

function main() {
    // Retrieve <canvas> element
    var canvas = document.getElementById('webgl');
    var temp = {
        x: 0,
        y: 0,
        stepX: 0,
        stepY: 0
    };
    var isDown = false;
    // Get the rendering context for WebGL
    var gl = getWebGLContext(canvas);
    if (!gl) {
        console.log('Failed to get the rendering context for WebGL');
        return;
    }

    // Initialize shaders
    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.log('Failed to intialize shaders.');
        return;
    }

    // Set the vertex information
    var n = initVertexBuffers(gl);
    if (n < 0) {
        console.log('Failed to set the vertex information');
        return;
    }

    // Specify the color for clearing <canvas>
    gl.clearColor(0.0, 0.0, 0.0, 0.0);

    // Get storage location of u_ModelMatrix
    var u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix');
    if (!u_ModelMatrix) {
        console.log('Failed to get the storage location of u_ModelMatrix');
        return;
    }

    // Current rotation angle
    var currentAngle = 10.0;
    // Model matrix
    var modelMatrix = new Matrix4();

    // Set texture
    if (!initTextures(gl, n)) {
        console.log('Failed to intialize the texture.');
        return;
    }
    draw();

    function initVertexBuffers(gl) {
        var verticesTexCoords = new Float32Array([
            // Vertex coordinates, texture coordinate
            -0.5, 0.5, 0.0, 1.0,
            -0.5, -0.5, 0.0, 0.0,
            0.5, 0.5, 1.0, 1.0,
            0.5, -0.5, 1.0, 0.0,
        ]);
        var n = 4; // The number of vertices

        // Create the buffer object
        var vertexTexCoordBuffer = gl.createBuffer();
        if (!vertexTexCoordBuffer) {
            console.log('Failed to create the buffer object');
            return -1;
        }

        // Bind the buffer object to target
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexTexCoordBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, verticesTexCoords, gl.STATIC_DRAW);

        var FSIZE = verticesTexCoords.BYTES_PER_ELEMENT;
        //Get the storage location of a_Position, assign and enable buffer
        var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
        if (a_Position < 0) {
            console.log('Failed to get the storage location of a_Position');
            return -1;
        }
        gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, FSIZE * 4, 0);
        gl.enableVertexAttribArray(a_Position);  // Enable the assignment of the buffer object

        // Get the storage location of a_TexCoord
        var a_TexCoord = gl.getAttribLocation(gl.program, 'a_TexCoord');
        if (a_TexCoord < 0) {
            console.log('Failed to get the storage location of a_TexCoord');
            return -1;
        }
        // Assign the buffer object to a_TexCoord variable
        gl.vertexAttribPointer(a_TexCoord, 2, gl.FLOAT, false, FSIZE * 4, FSIZE * 2);
        gl.enableVertexAttribArray(a_TexCoord);  // Enable the assignment of the buffer object

        return n;
    }

    function initTextures(gl) {
        var texture = gl.createTexture();   // Create a texture object
        if (!texture) {
            console.log('Failed to create the texture object');
            return false;
        }

        // Get the storage location of u_Sampler
        var u_Sampler = gl.getUniformLocation(gl.program, 'u_Sampler');
        if (!u_Sampler) {
            console.log('Failed to get the storage location of u_Sampler');
            return false;
        }
        var image = new Image();  // Create the image object
        if (!image) {
            console.log('Failed to create the image object');
            return false;
        }
        image.src = '../../images/sky.jpg';
        // Register the event handler to be called on loading an image
        image.onload = function () {
            loadTexture(gl, texture, u_Sampler, image);
        };
        // Tell the browser to load an image

        return true;
    }

    function loadTexture(gl, texture, u_Sampler, image) {
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1); // Flip the image's y axis
        // Enable texture unit0
        gl.activeTexture(gl.TEXTURE0);
        // Bind the texture object to the target
        gl.bindTexture(gl.TEXTURE_2D, texture);

        // Set the texture parameters
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        // Set the texture image
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);

        // Set the texture unit 0 to the sampler
        gl.uniform1i(u_Sampler, 0);
    }

    function tick() {
        draw(temp.x, temp.y);   // Draw the triangle
        requestAnimationFrame(tick);   // Request that the browser ?calls tick
    }

    function draw(x, y) {
        x = x / 800;
        y = y / 800;
        modelMatrix.setRotate(currentAngle, 0, 0, 1);
        modelMatrix.translate(x, y, 0);

        // Pass the rotation matrix to the vertex shader
        gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);

        gl.clear(gl.COLOR_BUFFER_BIT);   // Clear <canvas>

        gl.drawArrays(gl.TRIANGLE_STRIP, 0, n); // Draw the rectangle
    }

//移动状态

    document.addEventListener('mousedown', function (event) {
        isDown = true;
        if (event.pageX || event.pageY) {
            temp.stepX = event.pageX;
            temp.stepY = event.pageY;
        } else {
            temp.stepX = event.clientX;
            temp.stepY = event.clientY;
        }
        console.log('down');
    });

    document.addEventListener('mousemove', function (event) {
        if (isDown) {
            //获取鼠标位于当前屏幕的位置， 并作兼容处理
            if (event.pageX || event.pageY) {
                temp.x += (event.pageX - temp.stepX);
                temp.y += (event.pageY - temp.stepY);
                temp.stepX = event.pageX;
                temp.stepY = event.pageY;
            } else {
                temp.x += (event.clientX - temp.stepX);
                temp.y += (event.clientY - temp.stepY);
                temp.stepX = event.clientX;
                temp.stepY = event.clientY;
            }
            tick();
        }
    }, false);

    document.addEventListener('mouseup', function (event) {
        console.log('up');
        isDown = false;
    });
}

