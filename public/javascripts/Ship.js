
function Ship() {

    this.maxSpeed = .2;
    this.loaded = false;

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

