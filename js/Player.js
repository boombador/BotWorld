function Player(x, y) {
    this.base = Entity;
    this.base(x, y);

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

Player.prototype.concept = function(geometry, material, scene) {
    this.geometry = geometry;
    this.material = material;
    this.body = new THREE.Mesh(geometry, material);
    scene.add(this.body);
    return this.body;
}

Player.prototype.birth = function(scene, name, geometry, material) {
    var geometry = geometry || new THREE.CubeGeometry(1,1,1);
    var material = material || new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    this.name = name || "Carlito";
    if (debug) {
        console.log(this.name +" is born into the world");
    }
    return Player.prototype.concept.call(this, geometry, material, scene);
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

Player.prototype.updateBody = function() {
    this.body.position.x = this.x;
    this.body.position.y = this.y;
}
