function Entity(x, y) {
    this.x = x;
    this.y = y;
    this.z = .5;

    this.body = null;
    this.geometry = null;
    this.material = null;
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
