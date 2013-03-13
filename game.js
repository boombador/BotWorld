function Player(x, y) {
	this.x = x;
	this.y = y;
}

var engine = {
	player: new Player(2, 2),
	width: 5,
	height: 5
};

Player.prototype.draw = function() {
	var loc = "cell" + this.x + "," + this.y;
	document.getElementById(loc).className += " player";
};

engine.player.draw();
engine.player.x = 3;
engine.player.draw();
