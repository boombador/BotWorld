var timeLapse;
var timestepStart;
var timestepEnd;

function initWorld() {
    var scene = new THREE.Scene();

    var camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 100 );
    // var camera = new THREE.OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, 1, 1000 );

    camera.position.z = 15;
    // camera.lookAt();
    scene.add(camera);

    var renderer = new THREE.CanvasRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    var geometry = new THREE.CubeGeometry(1,1,1);
    var playerMaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    var resourceMaterial = new THREE.MeshBasicMaterial( { color: 0x0000dd } );
    var playerCube = new THREE.Mesh( geometry, playerMaterial );
    var resourceCube = new THREE.Mesh( geometry, resourceMaterial );
    scene.add( playerCube );
    scene.add( resourceCube );

    var components = {};
    components.scene = scene;
    components.camera = camera;
    components.renderer = renderer;
    components.playerCube = playerCube;
    components.resourceCube = resourceCube;
    components.renderer = renderer;

    return components;
}

function animate() {
    requestAnimationFrame(animate);
    
    timestepStart = timestepEnd;
    timestepEnd = Date.now();
    timeLapse = (timestepEnd - timestepStart) / 1000;
    
    plyr = engine.player;
    plyr.step(timeLapse);
    plyr.updateBody();

    objs.renderer.render( objs.scene, objs.camera);
}
