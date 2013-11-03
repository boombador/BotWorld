
var origin = new THREE.Vector3( 0, 0, 0 );
var up = new THREE.Vector3( 0, 1, 0 );
var unclaimed = new THREE.MeshPhongMaterial({ specular: '#666666', color: '#666666', emissive: '#666666', shininess: 2 });

var bw = engine();

bw.initReality();
bw.initWorld();

function render() {
    bw.handleState();

    requestAnimationFrame(render);
    bw.renderer.render(bw.scene, bw.camera);
}

render();

