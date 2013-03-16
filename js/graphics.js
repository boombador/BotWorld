var timeLapse;
var timestepStart;
var timestepEnd;

function initWorld() {
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 100 );
    camera.position.z = 15;

    var renderer = new THREE.CanvasRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    var geometry = new THREE.CubeGeometry(1,1,1);
    var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    var cube = new THREE.Mesh( geometry, material );
    scene.add( cube );

    var components = {};
    components.scene = scene;
    components.camera = camera;
    components.renderer = renderer;
    components.cube = cube;
    components.renderer = renderer;

    return components;
}

function render() {
    requestAnimationFrame(render);
    
    timestepStart = timestepEnd;
    timestepEnd = Date.now();
    timeLapse = (timestepEnd - timestepStart) / 1000;
    
    objs.renderer.render( objs.scene, objs.camera);
    
    plyr = engine.player;
    plyr.step(timeLapse);
    plyr.updateBody();
}
