var timeLapse;
var timestepStart;
var timestepEnd;

function Engine() {
    this.entities = null;
    this.resources = new Array();
}

Engine.prototype.initEntities = function(entities) {
    this.entities = entities;
    for (var i = 0, len = entities.length; i < len; i++) {
        var obj = entities[i];
        obj.entityID = i;
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
}

Engine.prototype.updateEntities = function() {
    for (var i = 0, len = this.entities.length; i < len; i++) {
        var obj = this.entities[i];
        obj.decideMovement(this);
        obj.step();
        obj.updateBody();
    }
}

Engine.prototype.run = function() {
    timestepEnd = Date.now();
    Engine.prototype.animate();
};

Engine.prototype.initWorld = function () {
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

    var world = {};
    world.scene = scene;
    world.camera = camera;
    world.renderer = renderer;

    this.world = world;
}

Engine.prototype.animate = function() {
    requestAnimationFrame(Engine.prototype.animate);
    
    timestepStart = timestepEnd;
    timestepEnd = Date.now();
    timeLapse = (timestepEnd - timestepStart) / 1000;
    
    engine.updateEntities();
    engine.world.renderer.render( engine.world.scene, engine.world.camera);
    engine.player.decideMovement(engine);
}
