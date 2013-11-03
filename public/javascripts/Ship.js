
function Ship(handle) {
    this.handle = handle;
    this.maxSpeed = .2;
    this.loaded = false;
    this.mat = new THREE.MeshBasicMaterial( { color: Math.random() * 0xffffff, wireframe: true } );

    return this;
}

Ship.prototype.init = function( loader, scene ){
    this.scene = scene;
    var that = this;
    loader.load( "models/viper2.js", function(geometry){
        that.loadMesh(geometry);
    });
};

Ship.prototype.loadMesh = function( geometry ) {
    this.geoBody = geometry;
    this.matBody = new THREE.MeshNormalMaterial();
    this.body = new THREE.Mesh( this.geoBody, this.matBody );

    this.body.scale.set( .4, .4, .4 );
    this.body.position.set( 0, 10, 0 );
    this.body.overdraw = true;

    this.scene.add(this.body);
    this.loaded = true;
    console.log("Ship loaded");
};

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

