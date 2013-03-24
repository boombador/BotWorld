function Resource(x, y, val) {
    this.base = Entity;
    this.base(x, y);
    this.value = val || 10;

    // var resourceCube = new THREE.Mesh( geometry, resourceMaterial );
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

/* returns amount of resources succesfully mined */
Resource.prototype.harvest = function(capacity) {
    var harvested = 0;
    if (capacity < this.value) {
        harvested = capacity;
        this.value -= capacity;
    } else {
        harvested = this.value;
        this.value = 0;
    }

    // TODO: destroy resource block if emptied

    return harvested;
}

Resource.prototype.affix = function(mesh) {
    this.body = mesh;
    mesh.position.x = this.x;
    mesh.position.y = this.y
}
