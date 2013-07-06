var keyboard = new THREEx.KeyboardState();
var origin = new THREE.Vector3( 0, 0, 0 );
var camRot = 0;
var mapRadius = 10;

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, 600 / 600, 0.1, 1000 );
// var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
// var renderer = new THREE.CanvasRenderer();
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var loader = new THREE.JSONLoader();
var ship = new Ship();
ship.init( loader, scene );

var wall = new Wall();
var wbody = wall.body;
scene.add( wbody );

camera.position.y = 10;

var state = 'loading';
function render() {
    if (state == 'loading') {
        if (ship.loaded) {
            state = 'main';
            console.log("game starting");
        }
    } else if (state == 'main') {
        if (ship.body.position.length() > mapRadius) {
            renderer.render(scene, camera);
            return;
        }
        var x = 10 * Math.cos(camRot);
        var z = 10 * Math.sin(camRot);
        camera.position.x = x;
        camera.position.z = z;
        camera.lookAt(origin);

        if( keyboard.pressed("left") ) {
            ship.yaw(.01);
        }
        if( keyboard.pressed("right") ) {
            ship.yaw(-.01);
        }
        if( keyboard.pressed("space") ) {
            ship.thrust();
        }
        ship.step();
    }

    requestAnimationFrame(render);
    renderer.render(scene, camera);
}
render();
