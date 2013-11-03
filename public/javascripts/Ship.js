var ship = function(spec)  {
    var that = physEntity(spec);

    that.init = function(loader, scene) {
        that.scene = scene;
        thine = that;
        loader.load( "models/viper2.js", function(geometry){
            thine.loadMesh(geometry);
        });
    };

    return that;
};

/*
Ship.prototype.fireLaser = function ( quat, euler ) {

    var laserGeo = new THREE.CubeGeometry(1,1,1); // a cube of side length one
    var green = new THREE.MeshBasicMaterial( { color: 0x00ff00 } ); // a simple green material
    var laser = new THREE.Mesh( laserGeo, green );
    laser.position.copy( this.body.position );
    var vel = new THREE.Vector3();
    // vel.copy( this.body.rotation ).normalize().multiplyScalar( 3 );
    vel.setEulerFromQuaternion( quat, euler );
    vel.normalize().multiplyScalar( 10 );

    return {
        type: 'newProjectile',
        content: {
            body: laser,
            velocity: vel
        }
    };
};
*/
