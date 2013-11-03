var ship = function(spec)  {
    var that = physEntity(spec);

    that.init = function(loader, scene) {
        that.scene = scene;
        loader.load( "models/viper2.js", function(geometry){
            that.loadMesh(geometry);
        });
    };

    that.fireLaser = function () {
        var quat = that.mesh.quaternion;
        var euler = that.mesh.eulerOrder;

        var laserObj = projectile({ vel: that.mesh.rotation.clone().normalize() });
        laserObj.mesh.position.copy( that.mesh.position );

        that.engine.projectiles.push( laserObj );
        that.engine.scene.add( laserObj.mesh );
    };

    return that;
};

