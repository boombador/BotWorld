var keyboard = new THREEx.KeyboardState();
var origin = new THREE.Vector3( 0, 0, 0 );
var up = new THREE.Vector3( 0, 1, 0 );
var camRot = 0;
var mapRadius = 10;

var canv = document.getElementById("viewport");
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 60, 1, 0.1, 1000 );
var renderer = new THREE.WebGLRenderer({ canvas: canv });

renderer.setClearColor( 0x000000 )
document.body.appendChild( renderer.domElement );
resize( null, "medium" );


var loader = new THREE.JSONLoader();
var ship = new Ship();
ship.init( loader, scene );

var controls;
var platform = new Platform();
var pbody = platform.body;
scene.add( pbody );

camera.position.y = 0;
camera.position.x = 0;
camera.position.z = 0;

camera.lookAt(origin);

var clock = new THREE.Clock(false);
var state = 'loading';
var asteroids = [];

var w = 200;
var hw = w / 2;

function resize( button, size ) {
    if ( typeof size === "undefined" ) size = button.dataset[ "size" ];
    var width = 0, height = 0;
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
    canv.style.marginLeft = (960 - width) / 2 + "px";
    renderer.setSize( width, height );
    camera.aspect = width / height;
}

function generateAsteroids() {
    var asteroid; 
    var mat = new THREE.MeshPhongMaterial({ specular: '#666666', color: '#666666', emissive: '#666666', shininess: 2 });
    for ( var i= 0; i < 10; i++ ) {
        var r = Math.random() * 20 + 10;
        var geoSphere = new THREE.SphereGeometry( r, 24, 24);
        asteroid = new THREE.Mesh( geoSphere, mat );
 
        // give it a random x and y position between -500 and 500
        asteroid.position.x =  Math.random() * w - hw;
        asteroid.position.y =  Math.random() * w - hw;
        asteroid.position.z =  Math.random() * w - hw;
 
        scene.add( asteroid );
        asteroids.push(asteroid); 
    }
}
generateAsteroids();

function render() {
    if (state == 'loading') {
        if (ship.loaded) {
            controls = new THREE.GravControls( camera );
            controls.movementSpeed = 10;
            controls.rollSpeed = Math.PI / 6;
            controls.autoForward = false;
            controls.dragToLook = false;

            state = 'main';
            console.log("game starting");
            clock.start();
        }
    } else if (state == 'main') {
        if (ship.body.position.length() > mapRadius) {
            renderer.render(scene, camera);
            console.log("You have died");
            return;
        }
        var delta = clock.getDelta();
        controls.update( delta );
    }

    requestAnimationFrame(render);
    renderer.render(scene, camera);
}
render();
