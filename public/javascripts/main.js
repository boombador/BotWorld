var keyboard = new THREEx.KeyboardState();
var origin = new THREE.Vector3( 0, 0, 0 );
var up = new THREE.Vector3( 0, 1, 0 );
var camRot = 0;
var mapRadius = 10;

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, 600 / 600, 0.1, 1000 );
// var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
// var renderer = new THREE.CanvasRenderer();
var renderer = new THREE.WebGLRenderer({ clearColor: 0x000000, clearAlpha: 1 });
renderer.setSize( 600, 600 );
document.body.appendChild( renderer.domElement );

var loader = new THREE.JSONLoader();
var ship = new Ship();
ship.init( loader, scene );

var controls;
var wall = new Wall();
var wbody = wall.body;
scene.add( wbody );

camera.position.y = 10;
camera.position.x = 0;
camera.position.z = 15;

camera.lookAt(origin);

var clock = new THREE.Clock(false);
var state = 'loading';
var particles = [];

function generateAsteroids() {
    var particle, material; 
    for ( var i= 0; i < 10; i++ ) {
        var geoSphere = new THREE.SphereGeometry( .3, 24, 24);
        var matSphere = new THREE.MeshBasicMaterial({ color: 0xffffff });
        particle = new THREE.Mesh( geoSphere, matSphere );
 
        // give it a random x and y position between -500 and 500
        particle.position.x =  Math.random() * 15 - 7.5;
        particle.position.y =  Math.random() * 15 - 7.5;
        particle.position.z =  Math.random() * 15 - 7.5;
 
        scene.add( particle );
        particles.push(particle); 
    }
}
generateAsteroids();

function render() {
    if (state == 'loading') {
        if (ship.loaded) {
            controls = new THREE.FlyControls( ship.body );
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
