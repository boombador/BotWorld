
function Ship() {

    this.maxSpeed = .2;
    this.speed = 0;
    this.thrustForce = .0001;
    this.orientation = new THREE.Quaternion(1, 0, 0);
    this.vel = new THREE.Vector3( 0, 0, 0 );
    this.loaded = false;

    return this;
}

Ship.prototype.thrust = function(){
    var dv = new THREE.Vector3();
    dv.setEulerFromQuaternion(this.orientation);
    dv.multiplyScalar(this.thrustForce);
    this.vel.add(dv);

    var len = this.vel.length();
    if (len > this.maxSpeed) {
        this.vel.normalize();
        this.vel.multiplyScalar(this.maxSpeed);
    }
};

Ship.prototype.step = function(){
    this.body.position.add(this.vel);
};

Ship.prototype.rotate = function( axis, rad ) {
    var rotation = new THREE.Quaternion();
    rotation.setFromAxisAngle( axis, rad );
    this.orientation.multiply( rotation );
    this.orientation.normalize();
    this.body.rotation.setEulerFromQuaternion(this.orientation);
};

Ship.prototype.init = function( loader, scene ){
    this.scene = scene;
    var that = this;
    loader.load( "models/viper2.js", function(geometry){
        that.loadMesh(geometry);
    });
};

Ship.prototype.loadMesh = function( geometry ) {
    this.geoBody = geometry;
    this.matBody = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    this.body = new THREE.Mesh( this.geoBody, this.matBody );

    this.body.scale.set( .4, .4, .4 );
    this.body.position.set( 0, 0, 0 );
    this.body.rotation.set( 0, 0, 1 );
    this.body.overdraw = true;

    this.scene.add(this.body);
    this.loaded = true;
    console.log("Ship loaded");
};

