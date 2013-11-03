var ship = function(spec)  {
    var that = physEntity(spec);

    that.init = function(loader, scene) {
        that.scene = scene;
        loader.load( "models/viper2.js", function(geometry){
            that.loadMesh(geometry);
        });
    };

    that.fireLaser = function ( quat, euler ) {
        var quat = that.mesh.quaternion;
        var euler = that.mesh.eulerOrder;
        var laserGeo = new THREE.CubeGeometry(1,1,1); // a cube of side length one
        var green = new THREE.MeshBasicMaterial( { color: 0x00ff00 } ); // a simple green material
        var laser = new THREE.Mesh( laserGeo, green );
        laser.position.copy( that.mesh.position );

        var vel = new THREE.Vector3();
        vel.copy( that.mesh.rotation ).normalize().multiplyScalar( 3 );
        vel.setEulerFromQuaternion( quat, euler );
        vel.normalize().multiplyScalar( 10 );

        that.engine.projectiles.push( laser );
        that.engine.scene.add( laser );
    };

    return that;
};

