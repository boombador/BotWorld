function Resource(x, y, val) {
    this.x = x;
    this.y = y;
    this.value = val;

    this.body = null;
}

/* returns amount of resources succesfully mined */
Resource.prototype.harvest = function(capacity) {
    var harvested = 0;
    if (capacity < this.value) {
        harvested = capacity;
        this.value -= capacity;
    } else {
        harvested = this.value;
        this.value = 0;
    }

    // TODO: destroy resource block if emptied

    return harvested;
}

Resource.prototype.affix = function(mesh) {
    this.body = mesh;
    mesh.position.x = this.x;
    mesh.position.y = this.y
}
