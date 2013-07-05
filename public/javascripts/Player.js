function Player(x, y, name) {
    this.base = Entity;
    this.base(x, y);
    this.name = name || "Carlito";
    this.type = "Player";

    // movement variables
    // speed
    this.speed = 1;
    this.vx = 0;
    this.vy = 0;
    // moveTo coordinates
    this.mx = x;
    this.my = y;

    // mesh that should be updated for Three.js render calls
    this.heldResource = 0;
    this.maxResource = 8;

}

Player.prototype = new Entity;

Player.prototype.birth = function(scene, geometry, material) {
    var geometry = geometry || new THREE.CubeGeometry(1,1,1);
    var material = material || new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    
    if (debug) {
        console.log(this.name +" is born into the world");
    }
    return Entity.prototype.concept.call(this, geometry, material, scene);
}

Player.prototype.moveTo = function(x, y) {
    this.mx = x;
    this.my = y;
}

Player.prototype.step = function(timelapse) {
    var dx = this.mx - this.x;
    var dy = this.my - this.y;
    var mag = Math.sqrt(dx*dx + dy*dy);

    // return if already at 
    if (mag <= .05) {
        this.x = this.mx;
        this.y = this.my;
        return;
    }

    this.vx = dx * this.speed / mag;
    this.vy = dy * this.speed / mag;

    this.x += this.vx * timeLapse;
    this.y += this.vy * timeLapse;
}

