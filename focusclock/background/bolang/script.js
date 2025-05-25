var canvas = document.createElement("canvas")
canvas.width = window.innerWidth
canvas.height = 200
var ctx = canvas.getContext("2d")
var cal = window.innerWidth / 5
var particlesArray = []
var points = []
canvas.style.position = "fixed"
canvas.style.bottom = "0px"
document.body.appendChild(canvas)
ctx.fillStyle = "rgba(30,144,255,0.3)"
class Particle {
    constructor(x) {
        this.x = x
        this.vx = x
        this.y = canvas.height / 2
    }
    update() {
        this.x++
        this.x = this.x % canvas.width
    }
    draw() {
        ctx.fillRect(this.x, check(this.vx) * (1 - Math.abs(0.5 - this.x / canvas.width)) * 2 * canvas.height + this.y - this.y / 8, 2, this.y * 2)
        ctx.fillRect(this.x, check(this.vx + canvas.width / 2) * canvas.height + this.y - this.y / 8, 2, this.y * 2)
    }
}
function init() {
    for (var i = 0; i < canvas.width / cal | 0; i++) {
        points.push(Math.random())
    }
    for (var i = 0; i < canvas.width; i++) {
        particlesArray.push(new Particle(i))
    }
}
init()
function check(x) {
    var p0 = (x / cal) | 0
    var p1 = p0 + 1
    var tx1 = p0 * cal
    var tx2 = p1 * cal
    if (p0 >= points.length - 1) {
        p0 = p0 % points.length
        p1 = (p0 + 1) % points.length
    }
    var vx1 = (x - tx1) / cal * points[p0]
    var vx2 = (x - tx2) / cal * points[p1]
    var tx = (x - tx1) / cal
    var tx = 6 * Math.pow(tx, 5) - 15 * Math.pow(tx, 4) + 10 * Math.pow(tx, 3)
    var y = (1 - tx) * vx1 + tx * vx2
    return (y)
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for (var i = 0; i < canvas.width; i++) {
        var particle = particlesArray[i]
        particle.update()
        particle.draw()
    }
}
setInterval(draw, 10)