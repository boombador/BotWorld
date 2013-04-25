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
        var resource = engine.resources[i];
        if (resource == null || resource.value == 0) {
            continue;
        }
        var xr = resource.x;
        var yr = resource.y;
        var dx = xr - this.x;
        var dy = yr - this.y;
        var dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < furthest) {
            furthest = dist;
            closest = i;
        }
    }
    if (closest == -1) {
        this.mx = 0;
        this.my = 0;
        return;
    }
    if (furthest < .5) {
        this.flags.harvesting;
    }
    var resource = engine.resources[closest];
    this.mx = resource.x;
    this.my = resource.y;
    this.objective = closest;
}

Player.prototype.step = function(timelapse) {
    if (this.flags.harvesting) {
        console.log("currently harvesting");
        this.x = this.mx;
        this.y = this.my;
        var resource = engine.resources[this.objective];
        if (resource == null || resource.value == 0) {
            this.flags.harvesting = false;
            console.log("finished harvesting");
            return;
        }
        this.heldResource += resource.harvest(this.maxResource);
        console.log(this.name + " just harvested " + this.heldResource + " at " + this.x + ", " + this.y);
        if (this.heldResource == 0) {
            this.flags.harvesting = false;
            console.log("finished harvesting second");
        }
        return true;
    }

    var dx = this.mx - this.x;
    var dy = this.my - this.y;
    var mag = Math.sqrt(dx*dx + dy*dy);

    this.vx = dx * this.speed / mag;
    this.vy = dy * this.speed / mag;

    this.x += this.vx * timeLapse;
    this.y += this.vy * timeLapse;
}

