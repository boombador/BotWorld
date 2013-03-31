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

    this.flags = {};
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

Player.prototype.decideMovement = function(engine, x, y) {
    if (x != undefined && y != undefined) {
        this.mx = x;
        this.my = y;
        return;
    }

    var closest = -1;
    var furthest = 10000000;
    for (var i = 0, len = engine.resources.length; i < len; i++) {
        var xr = engine.resources[i].x;
        var yr = engine.resources[i].y;
        var dx = xr - this.x;
        var dy = yr - this.y;
        var dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < furthest) {
            furthest = dist;
            closest = i;
        }
    }
    this.mx = engine.resources[closest].x;
    this.my = engine.resources[closest].y;
}

Player.prototype.step = function(timelapse) {
    if (this.flags.harvesting) return true;

    var dx = this.mx - this.x;
    var dy = this.my - this.y;
    var mag = Math.sqrt(dx*dx + dy*dy);

    // return if already at 
    if (mag <= .05) {
        this.x = this.mx;
        this.y = this.my;
        this.flags.harvesting = true;
        console.log("found resource at ("+this.x+", "+this.y+")");
        return;
    }

    this.vx = dx * this.speed / mag;
    this.vy = dy * this.speed / mag;

    this.x += this.vx * timeLapse;
    this.y += this.vy * timeLapse;
}

