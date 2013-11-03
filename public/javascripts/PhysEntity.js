var physEntity = function(spec, my) {
    var that = {};
    that.engine = spec.engine || null;
    that.handle = spec.handle;
    that.maxSpeed = spec.maxSpeed || .2;
    that.mat = spec.material ||
        new THREE.MeshBasicMaterial( { color: Math.random() * 0xffffff, wireframe: true } );
    that.loaded = false;

    that.accLinear = .5;
    that.accAngular = Math.PI / 3;

    that.mesh = spec.mesh || null;

	that.moveVector = spec.moveVector || new THREE.Vector3( 0, 0, 0 );
	that.rotationVector = spec.rotationVector || new THREE.Vector3( 0, 0, 0 );
    that.vel = spec.vel || new THREE.Vector3( 0, 0, 0 );
    that.thrust = { up: 0, down: 0, left: 0, right: 0, forward: 0, back: 0 };
    that.angularThrust = { pitchUp: 0, pitchDown: 0, yawLeft: 0, yawRight: 0, rollLeft: 0, rollRight: 0 };
	that.tmpQuaternion = new THREE.Quaternion();

    that.update = function( delta ) {
        that.translate( delta );
        that.rotate( delta );

        if (that.msg.type == 'command') {
            func = that[that.msg.value];
            if (typeof func == 'function') {
                func();
            } else {
                console.log("function not found: "+that.msg.value);
            }
        }
    };

    that.loadMesh = function( geometry ) {

        if (that.mesh) {
            console.log("already loaded a mesh, not generating a new one");
        } else {
            that.geoBody = geometry;
            that.matBody = new THREE.MeshNormalMaterial();
            that.mesh = new THREE.Mesh( that.geoBody, that.matBody );
        }

        that.mesh.useQuaternion = true;

        that.mesh.scale.set( .4, .4, .4 );
        that.mesh.position.set( 0, 10, 0 );
        that.mesh.overdraw = true;

        that.scene.add(that.mesh);
        that.loaded = true;
    };

    that.translate = function() {
        var dv = new THREE.Vector3();
        return function ( delta, thrust ) {
            var moveMult = delta * that.accLinear;

            thrust = that.thrust;

            var forward = (
                    thrust.forward || ( that.autoForward && !thrust.back )
                    ) ? 1 : 0;
            that.moveVector.x = ( -thrust.left    + thrust.right );
            that.moveVector.y = ( -thrust.down    + thrust.up );
            that.moveVector.z = ( -forward + thrust.back );

            dv.copy( that.moveVector );
            dv.applyQuaternion( that.mesh.quaternion );
            dv.multiplyScalar( moveMult );
            that.vel.add( dv );
            that.mesh.position.add( that.vel );
        };
    }();

    that.rotate = function() {
        return function ( delta ) {
            var rotMult = delta * that.accAngular;
            that.rotationVector.x = ( -that.angularThrust.pitchDown + that.angularThrust.pitchUp );
            that.rotationVector.y = ( -that.angularThrust.yawRight  + that.angularThrust.yawLeft );
            that.rotationVector.z = ( -that.angularThrust.rollRight + that.angularThrust.rollLeft );

            // perform update
            that.tmpQuaternion.set(
                    that.rotationVector.x * rotMult,
                    that.rotationVector.y * rotMult,
                    that.rotationVector.z * rotMult, 1
                    ).normalize();
            that.mesh.quaternion.multiply( that.tmpQuaternion );

            // expose the rotation vector for convenience
            that.mesh.rotation.setEulerFromQuaternion( that.mesh.quaternion, that.mesh.eulerOrder );
        };

    }();

    return that;
};
