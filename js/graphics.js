var timeLapse;
var timestepStart;
var timestepEnd;

function initWorld() {
    var scene = new THREE.Scene();

    var sceneCenter = new THREE.Vector3(0, 0, 0);
    var cameraPos = new THREE.Vector3(0, -10, 15);
    var toOrigin = new THREE.Vector3();

    var camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 100 );
    camera.position.x = cameraPos.x;
    camera.position.y = cameraPos.y;
    camera.position.z = cameraPos.z;

    toOrigin.subVectors(sceneCenter, cameraPos);
    camera.lookAt(toOrigin);
    scene.add(camera);

    var renderer = new THREE.CanvasRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    var components = {};
    components.scene = scene;
    components.camera = camera;
    components.renderer = renderer;

    return components;
}

function animate() {
    requestAnimationFrame(animate);
    
    timestepStart = timestepEnd;
    timestepEnd = Date.now();
    timeLapse = (timestepEnd - timestepStart) / 1000;
    
    var plyr = engine.player;
    plyr.step(timeLapse);
    plyr.updateBody();

    var rsrc = engine.resources[0];
    rsrc.updateBody();
    var rsrc = engine.resources[1];
    rsrc.updateBody();

    objs.renderer.render( objs.scene, objs.camera);
}
