function Player(x, y) {
    // current coordinates
    this.x = x;
    this.y = y;

    this.speed = 1;
    this.vx = 0;
    this.vy = 0;

    // moveTo coordinates
    this.mx = x;
    this.my = y;

    // mesh that should be updated for Three.js render calls
    this.body = null;
}

Player.prototype.affix = function(mesh) {
    this.body = mesh;
    mesh.position.x = this.x;
    mesh.position.y = this.y
}

Player.prototype.moveTo = function(x, y) {
    this.mx = x;
    this.my = y;
}

Player.prototype.step = function(timelapse) {
    // random stuff just to make cube interesting
    this.body.rotation.x -= .1 * timelapse;
    this.body.rotation.y += .5 * timelapse;

    var dx = this.mx - this.x;
    var dy = this.my - this.y;
    var mag = Math.sqrt(dx*dx + dy*dy);

    // return if already at 
    if (mag <= .1) {
        this.x = this.mx;
        this.y = this.my;
        return;
    }

    this.vx = dx * this.speed / mag;
    this.vy = dy * this.speed / mag;

    this.x += this.vx * timeLapse;
    this.y += this.vy * timeLapse;
}

Player.prototype.updateBody = function() {
    this.body.position.x = this.x;
    this.body.position.y = this.y;
}
