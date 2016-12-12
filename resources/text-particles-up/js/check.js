/**
 * Created by gewangjie on 16/8/13.
 */

//引力函数
function gravitate(partA, partB) {
    var dx = partB.x - partA.x;
    var dy = partB.y - partA.y;
    var distQ = dx * dx + dy * dy;           //计算物体建的距离
    var dist = Math.sqrt(distQ);           //距离的平方
    var F = (partA.mass * partB.mass) / distQ;  //万有引力公式

    var ax = F * dx / dist;        //作用力作用于加速度
    var ay = F * dy / dist;

    partA.vx += ax / partA.mass;    //加速度作用于速度
    partA.vy += ay / partA.mass;
    partB.vx -= ax / partB.mass;
    partB.vy -= ay / partB.mass;
}

//移动函数
function move(partA, i) {
    partA.x += partA.vx;
    partA.y += partA.vy;

    for (var partB, j = i + 1; j < numParticles; j++) {
        partB = particles[j];
        //引力
        checkCollision(partA, partB); //碰撞检测
        gravitate(partA, partB);
    }
}

function rotate(x, y, sin, cos, reverse) {
    return {
        x: (reverse) ? (x * cos + y * sin) : (x * cos - y * sin),
        y: (reverse) ? (y * cos - x * sin) : (y * cos + x * sin)
    }
}

//碰撞检测
function checkCollision(ball0, ball1) {
    var dx = ball1.x - ball0.x,
        dy = ball1.y - ball0.y,
        dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < ball0.radius + ball1.radius) {
        var angle = Math.atan2(dy, dx),
            sin = Math.sin(angle),
            cos = Math.cos(angle);

        //rotate ball0 position
        var pos0 = {
            x: 0,
            y: 0
        };

        //rotate ball1 position
        var pos1 = rotate(dx, dy, sin, cos, true);

        //rotate ball0 velocity
        var vel0 = rotate(ball0.vx, ball0.vy, sin, cos, true);

        //rotate ball1 velcoity
        var vel1 = rotate(ball1.vx, ball1.vy, sin, cos, true);

        //collision reaction

        var vxTotal = vel0.x - vel1.x;

        vel0.x = ((ball0.mass - ball1.mass) * vel0.x + 2 * ball1.mass * vel1.x) / (ball0.mass + ball1.mass);
        vel1.x = vxTotal + vel0.x;

        //update position - to avoid objects becoming stuck together
        var absV = Math.abs(vel0.x) + Math.abs(vel1.x),
            overlap = (ball0.radius + ball1.radius) - Math.abs(pos0.x - pos1.x);
        //update position
        pos0.x += vel0.x / absV * overlap;
        pos1.x += vel1.x / absV * overlap;

        //rotate everything back
        var pos0F = rotate(pos0.x, pos0.y, sin, cos, false);
        var pos1F = rotate(pos1.x, pos1.y, sin, cos, false);

        //adjust position to actual screen position
        ball1.x = ball0.x + pos1F.x;
        ball1.y = ball0.y + pos1F.y;
        ball0.x = ball0.x + pos0F.x;
        ball0.y = ball0.y + pos0F.y;

        //rotate velocity back
        var vel0F = rotate(vel0.x, vel0.y, sin, cos, false);
        var vel1F = rotate(vel1.x, vel1.y, sin, cos, false);

        ball0.vx = vel0F.x;
        ball0.vy = vel0F.y;
        ball1.vx = vel1F.x;
        ball1.vy = vel1F.y;

    }
}

//边界检测
function checkWalls(ball) {
    if (ball.x + ball.radius > canvas.width) {
        ball.x = canvas.width - ball.radius;
        ball.vx *= bounce;
    } else if (ball.x - ball.radius < 0) {
        ball.x = ball.radius;
        ball.vx *= bounce;
    }

    if (ball.y + ball.radius > canvas.height) {
        ball.y = canvas.height - ball.radius;
        ball.vy *= bounce;
    } else if (ball.y - ball.radius < 0) {
        ball.y = ball.radius;
        ball.vy *= bounce;
    }
}