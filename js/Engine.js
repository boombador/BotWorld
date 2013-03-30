var timeLapse;
var timestepStart;
var timestepEnd;

var engine = {
    entities: [
        new Player(-5, 0, "Ian"),
        new Terrain(0, 0, 5, 5),
        new Resource(1, 0, 50),
        new Resource(-3, 6, 10)
    ],
    resources: new Array(),
    initEntities: function() {
        var i;
        var len = this.entities.length;
        for (i = 0; i < len; i++) {

            var obj = this.entities[i];
            if (obj.type == "Player") {
                this.player = obj;
                obj.birth(this.world.scene);
            } else if (obj.type == "Terrain") {
                this.terrain = obj;
                obj.arise(this.world.scene);
            } else if (obj.type == "Resource") {
                this.resources.push(obj);
                obj.deposit(this.world.scene);
            }

        }
    },
    updateEntities: function() {
        for (var i = 0, len = this.entities.length; i < len; i++) {
            var obj = this.entities[i];
            obj.step();
            obj.updateBody();
        }
    },
    run: function() {
        timestepEnd = Date.now();
        animate();
    },
};

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
