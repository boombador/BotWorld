
var projectile = function(spec) {
    spec = spec || {};
    if (!spec.mesh) {
        spec.geo = spec.geo || new THREE.CubeGeometry(1,1,1); // a cube of side length one
        spec.mat = spec.mat || new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        spec.mesh = new THREE.Mesh( spec.geo, spec.mat );
    }

    var that = physEntity( spec );

    return that;
};
