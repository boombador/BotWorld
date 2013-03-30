
function initWorld() {
    var scene = new THREE.Scene();

    var sceneCenter = new THREE.Vector3(0, 0, 0);
    var cameraPos = new THREE.Vector3(0, -10, 15);
    var toOrigin = new THREE.Vector3();
    toOrigin.subVectors(sceneCenter, cameraPos);

    var camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 100 );
    camera.position.x = cameraPos.x;
    camera.position.y = cameraPos.y;
    camera.position.z = cameraPos.z;

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
    
    engine.updateEntities();
    engine.world.renderer.render( engine.world.scene, engine.world.camera);
}
