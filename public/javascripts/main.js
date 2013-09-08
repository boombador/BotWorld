
var origin = new THREE.Vector3( 0, 0, 0 );
var up = new THREE.Vector3( 0, 1, 0 );
var unclaimed = new THREE.MeshPhongMaterial({ specular: '#666666', color: '#666666', emissive: '#666666', shininess: 2 });

engine = {
    scene: new THREE.Scene(),
    camera: new THREE.PerspectiveCamera( 60, 1, 0.1, 1000 ),
    loader: new THREE.JSONLoader(),
    clock: new THREE.Clock(false),

    state: 'loading',
    asteroids: [],
    controls: null,

    resize: function( button, size ) {
        if ( typeof size === "undefined" ) size = button.dataset[ "size" ];
        var width = 0, height = 0;
        size = 'large';
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
        this.canv.style.marginLeft = (960 - width) / 2 + "px";
        this.renderer.setSize( width, height );
        this.camera.aspect = width / height;
    },

    generateAsteroids: function() {
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
    
            this.scene.add( astBody );
            this.asteroids.push(asteroid); 
        }
    },

    handleState: function () {
        if (this.state == 'loading') {
            if (this.ship.loaded) {
                this.controls = new THREE.GravControls( this.camera );
                this.controls.movementSpeed = 10;
                this.controls.rollSpeed = Math.PI / 6;
                this.controls.autoForward = false;
                this.controls.dragToLook = false;

                this.state = 'main';
                console.log("game starting");
                this.clock.start();
            }
        } else if (this.state == 'main') {
            if (this.ship.body.position.length() > this.mapRadius) {
                this.renderer.render(this.scene, this.camera);
                console.log("You have died");
                return;
            }
            this.detectCollisions();
            var delta = this.clock.getDelta();
            this.controls.update( delta );
        }
    },

    detectCollisions: function () {
        var asts = this.asteroids;
        var shipPos = this.controls.object.position;
        var astPos = new THREE.Vector3();
        for (var i = 0; i < asts.length; i++) {
            var a = asts[i];
            astPos.copy( a.position );
            var dist = astPos.sub(shipPos).length();
            var r = a.radius;

            if (dist <= r) {
                a.owner = this.ship.handle;
                a.body.setMaterial( this.ship.mat );
            }
        }
    },

    initReality: function() {
        this.canv = document.getElementById("viewport");
        this.renderer = new THREE.WebGLRenderer({ canvas: this.canv });
        this.renderer.setClearColor( 0x000000 );
        this.resize( null, "medium" );
    },

    initWorld: function() {
        this.ship = new Ship("eman");
        this.mapRadius = 10;
        this.ship.init( this.loader, this.scene );

        this.platform = new Platform();
        // this.scene.add( this.platform.body );
        this.generateAsteroids();
    }
}

engine.initReality();
engine.initWorld();

function render() {
    engine.handleState();

    requestAnimationFrame(render);
    engine.renderer.render(engine.scene, engine.camera);
}

render();

