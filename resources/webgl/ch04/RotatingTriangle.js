// RotatingTranslatedTriangle.js (c) 2012 matsuda
// Vertex shader program
var VSHADER_SOURCE =
    'attribute vec4 a_Position;\n' +
    'attribute vec4 a_Color;\n' +
    'varying vec4 v_Color;\n' + // varying variable
    'uniform mat4 u_ModelMatrix;\n' +
    'void main() {\n' +
    '  gl_Position = u_ModelMatrix * a_Position;\n' +
    '  v_Color = a_Color;\n' +  // Pass the data to the fragment shader
    '}\n';

// Fragment shader program
var FSHADER_SOURCE =
    'precision mediump float;\n' + // Precision qualifier (See Chapter 6)
    'varying vec4 v_Color;\n' +    // Receive the data from the vertex shader
    'void main() {\n' +
    '  gl_FragColor = v_Color;\n' +
    '}\n';

// Rotation angle (degrees/second)
var temp = {
    rotate: 0,
    scale: 1,
    x: 0,
    y: 0,
    stepX: 0,
    stepY: 0
};
var isDown = false;
function main() {
    // Retrieve <canvas> element
    var canvas = document.getElementById('webgl');

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

    // Write the positions of vertices to a vertex shader
    var n = initVertexBuffers(gl);
    if (n < 0) {
        console.log('Failed to set the positions of the vertices');
        return;
    }

    // Specify the color for clearing <canvas>
    gl.clearColor(0.9, 0.9, 1.0, 1);

    // Get storage location of u_ModelMatrix
    var u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix');
    if (!u_ModelMatrix) {
        console.log('Failed to get the storage location of u_ModelMatrix');
        return;
    }

    // Model matrix
    var modelMatrix = new Matrix4();

    // Start drawing
    var tick = function () {
        draw(gl, n, modelMatrix, u_ModelMatrix);   // Draw the triangle
        requestAnimationFrame(tick, canvas);   // Request that the browser ?calls tick
    };
    tick();
}

function initVertexBuffers(gl) {
    var verticesColors = new Float32Array([
        0.0, 0.5, 1.0, 0.0, 0.0,
        -0.5, -0.5, 0.0, 1.0, 0.0,
        0.5, -0.5, 0.0, 0.0, 1.0,
    ]);
    var n = 3;   // The number of vertices

    // Create a buffer object
    var vertexColorBuffer = gl.createBuffer();
    if (!vertexColorBuffer) {
        console.log('Failed to create the buffer object');
        return false;
    }

    // Write the vertex coordinates and colors to the buffer object
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, verticesColors, gl.STATIC_DRAW);

    var FSIZE = verticesColors.BYTES_PER_ELEMENT;
    //Get the storage location of a_Position, assign and enable buffer
    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    if (a_Position < 0) {
        console.log('Failed to get the storage location of a_Position');
        return -1;
    }
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, FSIZE * 5, 0);
    gl.enableVertexAttribArray(a_Position);  // Enable the assignment of the buffer object

    // Get the storage location of a_Position, assign buffer and enable
    var a_Color = gl.getAttribLocation(gl.program, 'a_Color');
    if (a_Color < 0) {
        console.log('Failed to get the storage location of a_Color');
        return -1;
    }
    gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, FSIZE * 5, FSIZE * 2);
    gl.enableVertexAttribArray(a_Color);  // Enable the assignment of the buffer object

    return n;
}

function draw(gl, n, modelMatrix, u_ModelMatrix) {
    // Set the rotation matrix
    modelMatrix.setTranslate(temp.x / 400, -temp.y / 400, 0);
    modelMatrix.rotate(temp.rotate, 0, 0, 1);
    modelMatrix.scale(temp.scale,temp.scale,temp.scale);


    // Pass the rotation matrix to the vertex shader
    gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);

    // Clear <canvas>
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Draw the rectangle
    gl.drawArrays(gl.TRIANGLES, 0, n);
}

function up() {
    temp.scale += 0.01;
}

function down() {
    temp.scale -= 0.01;
}

function left() {
    temp.rotate += 0.2;
}
function right() {
    temp.rotate -= 0.2;
}
document.addEventListener('mousedown', function (event) {
    isDown = true;
    if (event.pageX || event.pageY) {
        temp.stepX = event.pageX;
        temp.stepY = event.pageY;
    } else {
        temp.stepX = event.clientX;
        temp.stepY = event.clientY;
    }
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
    }
}, false);

document.addEventListener('mouseup', function (event) {
    isDown = false;
});

document.addEventListener('keydown',function (event) {
    switch (event.which){
        case 87:
        case 38:
            up();
            break;
        case 83:
        case 40:
            down();
            break;
        case 65:
        case 37:
            left();
            break;
        case 68:
        case 39:
            right();
            break;
    }
});