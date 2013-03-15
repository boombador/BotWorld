var engine = {
	player: new Player(2, 2),
	width: 5,
	height: 5
};

function Player(x, y) {
	this.x = x;
	this.y = y;
}

function init() {
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

    var renderer = new THREE.CanvasRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    var geometry = new THREE.CubeGeometry(1,1,1);
    var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    engine.cube = new THREE.Mesh( geometry, material );
    scene.add( engine.cube );

    engine.scene = scene;
    engine.camera = camera;
    engine.renderer = renderer;
}

// deprecated
Player.prototype.draw = function() {
	var loc = "cell" + this.x + "," + this.y;
	document.getElementById(loc).className += " player";
};

// engine.player.draw();
engine.player.x = 3;
// engine.player.draw();
