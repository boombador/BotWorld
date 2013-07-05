var keyboard = new THREEx.KeyboardState();
var origin = new THREE.Vector3( 0, 0, 0 );
var camRot = 0;
var mapRadius = 10;

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, 600 / 600, 0.1, 1000 );
// var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
var renderer = new THREE.CanvasRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var loader = new THREE.JSONLoader();
var createMesh = function( geometry )
{
    var zmesh = new THREE.Mesh( geometry, new THREE.MeshFaceMaterial() );
    zmesh.position.set( 0, 0, 0 );
    zmesh.overdraw = true;
    scene.add( zmesh );
    console.log(zmesh);
};
loader.load( "viper.js", createMesh );

var ship = new Ship();
var sbody = ship.body;
scene.add( sbody );

var wall = new Wall();
var wbody = wall.body;
scene.add( wbody );

camera.position.y = 10;

function render() {
    if (sbody.position.length() > mapRadius) {
        renderer.render(scene, camera);
        return;
    }
    requestAnimationFrame(render);
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

    renderer.render(scene, camera);
}
render();
