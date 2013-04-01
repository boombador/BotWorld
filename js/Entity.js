function Entity(x, y) {
    this.x = x;
    this.y = y;
    this.z = .5;

    this.type = "Entity";
    this.body = null;
    this.geometry = null;
    this.material = null;
    this.entityID = -1;
}

Entity.prototype.concept = function(geometry, material, scene) {
    this.geometry = geometry;
    this.material = material;
    this.body = new THREE.Mesh(geometry, material);
    scene.add(this.body);
    return this.body;
}

Entity.prototype.updateBody = function() {
    this.body.position.x = this.x;
    this.body.position.y = this.y;
    this.body.position.z = this.z;
}

Entity.prototype.step = function() {
    return null;
}

Entity.prototype.decideMovement = function(engine, x, y) {
    if (x != undefined && y != undefined) {
        this.mx = x;
        this.my = y;
        return;
    }
    return;
}
