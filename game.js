var engine = {
    player: new Player(-10, 0),
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

Player.prototype.affix = function(mesh) {
    this.body = mesh;
    mesh.position.x = this.x;
    mesh.position.y = this.y
}

Player.prototype.moveTo = function(x, y) {
    this.x = x;
    this.y = y;
    this.mx = x;
    this.my = y;
}

Player.prototype.updateBody = function() {
    this.body.position.x = this.x;
    this.body.position.y = this.y;
}
