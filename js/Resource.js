function Resource(x, y, val) {
    this.base = Entity;
    this.base(x, y);
    this.type = "Resource";
    this.value = val || 10;
}

Resource.prototype = new Entity;

Resource.prototype.deposit = function(scene, geometry, material) {
    var geometry = geometry || new THREE.CubeGeometry(1,1,1);
    var material = material || new THREE.MeshBasicMaterial( { color: 0x0000dd } );
    if (debug) {
        console.log("Resource deposit formed at ("+this.x+", "+this.y+").");
    }
    return Entity.prototype.concept.call(this, geometry, material, scene);
}

Resource.prototype.harvest = function(capacity) {
    if (debug) console.log("this resource is being harvested");
    var harvested = 0;
    if (this.value > capacity) {
        harvested = capacity;
        this.value -= harvested;
    } else {
        harvested = this.value;
        this.value = 0;
        console.log("Resource depleted");
    }
    return harvested;
}

Resource.prototype.updateBody = function() {
    this.body.position.x = this.x;
    this.body.position.y = this.y;
    this.body.position.z = this.z;
}
