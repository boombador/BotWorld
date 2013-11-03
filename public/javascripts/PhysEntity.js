var PhysEntity = function(spec, my) {
    var that = {};
    that.handle = spec.handle;
    that.maxSpeed = spec.maxSpeed || .2;
    that.loaded = false;
    that.mat = spec.material ||
        new THREE.MeshBasicMaterial( { color: Math.random() * 0xffffff, wireframe: true } );

    my = my || {};
    

    return that;
};
