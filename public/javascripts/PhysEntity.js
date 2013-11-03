var physEntity = function(spec, my) {
    var that = {};
    that.handle = spec.handle;
    that.maxSpeed = spec.maxSpeed || .2;
    that.mat = spec.material ||
        new THREE.MeshBasicMaterial( { color: Math.random() * 0xffffff, wireframe: true } );
    that.loaded = false;

    that.accLinear = .5;
    that.accAngular = Math.PI / 3;

    that.mesh = spec.mesh || null;

	that.moveVector = spec.moveVector || new THREE.Vector3( 0, 0, 0 );
	that.rotationVector = spec.rotationVector || new THREE.Vector3( 0, 0, 0 );
    that.vel = spec.vel || new THREE.Vector3( 0, 0, 0 );

    that.loadMesh = function( geometry ) {

        if (that.mesh) {
            console.log("already loaded a mesh, not generating a new one");
        } else {
            that.geoBody = geometry;
            that.matBody = new THREE.MeshNormalMaterial();
            that.mesh = new THREE.Mesh( that.geoBody, that.matBody );
        }

        that.mesh.useQuaternion = true;

        that.mesh.scale.set( .4, .4, .4 );
        that.mesh.position.set( 0, 10, 0 );
        that.mesh.overdraw = true;

        that.scene.add(that.mesh);
        that.loaded = true;
    };

    return that;
};
