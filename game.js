var engine = {
	player: new Player(2, 2),
	width: 5,
	height: 5
};

function Player(x, y) {
    // current coordinates
	this.x = x;
	this.y = y;
    // moveTo coordinates
    this.mx = x;
    this.my = y;

    // mesh that should be updated for Three.js render calls
    this.body = null;
}

engine.player.x = 3;

Player.prototype.affix = function(mesh) {
    this.body = mesh;
}

Player.prototype.moveTo(x, y) {
    this.mx = x;
    this.my = y;
}
