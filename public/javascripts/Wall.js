function Wall() {
    this.geoBody = new THREE.CylinderGeometry( mapRadius, mapRadius, .5, 32, 10, true );
    this.matBody = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
    this.matBody.side = THREE.DoubleSide;
    this.body = new THREE.Mesh( this.geoBody, this.matBody );

    return this;
}
