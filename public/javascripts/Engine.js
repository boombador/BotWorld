var engine = function(spec) {

    var that = {};
    spec = spec || {};

    that.scene = spec.scene || new THREE.Scene();
    that.camera = spec.camera || new THREE.PerspectiveCamera( 60, 1, 0.1, 1000 );
    that.loader = spec.loader || new THREE.JSONLoader();
    that.clock = spec.clock || new THREE.Clock(false);

    that.state = 'loading';
    that.asteroids = [];
    that.projectiles = [];
    that.controls = null;
    that.cameraFollow = {
        position: new THREE.Vector3(0, 0, 0),
        rotation: new THREE.Vector3(1, 0, 0)
    };
    followDist = 4;

    that.resize = function( button, size ) {
        if ( typeof size === "undefined" ) size = button.dataset[ "size" ];
        var width = 0, height = 0;
        // size = "small";
        if (size == "small") {
            width = 540;
            height = 405;
        } else if (size == "medium") {
            width = 720;
            height = 520;
        } else if (size == "large") {
            width = 960;
            height = 720;
        }
        that.canv.style.marginLeft = (960 - width) / 2 + "px";
        that.renderer.setSize( width, height );
        that.camera.aspect = width / height;
    };

    that.generateAsteroids = function() {
        var astBody; 
        var w = 200;
        var hw = w / 2;
        for ( var i= 0; i < 10; i++ ) {
            var r = Math.random() * 20 + 10;
            var geoSphere = new THREE.SphereGeometry( r, 24, 24);
            var astBody = new THREE.Mesh( geoSphere, unclaimed );

            var a = Math.random() * w - hw;
            var b = Math.random() * w - hw;
            var c = Math.random() * w - hw;
            var pos = new THREE.Vector3( a, b, c );
            astBody.position.copy( pos );

            var asteroid = {
                radius: r,
                position: pos,
                body: astBody,
                owner: null
            };
    
            that.scene.add( astBody );
            that.asteroids.push(asteroid); 
        }
    };

    that.updateProjectiles = function( delta ) {
        for (var i = 0; i < that.projectiles.length; i++) {
            var proj = that.projectiles[i];
            proj.update( delta );
        }
    };

    that.handleState = function () {
        if (that.state == 'loading') {
            if (that.ship.loaded) {
                that.controls = gravControls({ entity: that.ship});

                that.state = 'main';
                console.log("game starting");
                that.clock.start();
            }
        } else if (that.state == 'main') {
            var delta = that.clock.getDelta();
            that.controls.commandScan();
            that.ship.update( delta );
            that.updateProjectiles( delta );
            that.updateCamera();
            that.detectCollisions();
        }
    };

    that.updateCamera = function() {
        that.camera.position.copy( that.ship.mesh.position );
        that.camera.rotation.copy( that.ship.mesh.rotation );
    };

    that.detectCollisions = function () {
        var asts = that.asteroids;
        var shipPos = that.controls.mesh.position;
        var astPos = new THREE.Vector3();
        for (var i = 0; i < asts.length; i++) {
            var a = asts[i];
            astPos.copy( a.position );
            var dist = astPos.sub(shipPos).length();
            var r = a.radius;

            if (dist <= r) {
                a.owner = that.ship.handle;
                a.body.setMaterial( that.ship.mat );
            }
        }
    };

    that.initReality = function() {
        that.canv = document.getElementById("viewport");
        that.renderer = new THREE.WebGLRenderer({ canvas: that.canv });
        that.renderer.setClearColor( 0x000000 );
        that.resize( null, "large" );
    };

    that.initWorld = function() {
        that.ship = ship({ handle: "eman", engine: that });
        that.ship.init( that.loader, that.scene );

        that.generateAsteroids();
    };
    return that;
};
