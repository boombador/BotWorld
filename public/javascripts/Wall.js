function Wall(radius) {
    var height = 1;
    this.geoBody = new THREE.CylinderGeometry( radius, 1, 1, 32, 10, false );
    this.matBody = new THREE.MeshNormalMaterial();
    this.matBody.side = THREE.DoubleSide;
    this.body = new THREE.Mesh( this.geoBody, this.matBody );
    this.body.position.y = -height;

    return this;
}
