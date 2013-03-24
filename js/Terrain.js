function Terrain(x, y, width, height) {
    this.base = Entity;
    this.base(x, y);
    this.width = width || 5;
    this.height = height || 5;
}

Terrain.prototype = new Entity;

Terrain.prototype.arise = function(scene, geometry, material) {
    var geometry = geometry || new THREE.PlaneGeometry(this.width, this.height);
    var material = material || new THREE.MeshBasicMaterial( { color: 0x006600 } );
    if (debug) {
        console.log("Terrain arose with a center at ("+this.x+", "+this.y+").");
    }
    return Entity.prototype.concept.call(this, geometry, material, scene);
}
