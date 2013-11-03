
/* GravControls
 * heavily based off FlyControls by James Baicoianu / http://www.baicoianu.com/
 */

var gravControls = function( spec ) {
    var that = {};

    that.keyboard = new THREEx.KeyboardState();

    that.entity = spec.entity;
    that.object = spec.entity.mesh;

	that.dragToLook = false;
	that.autoForward = false;
	that.tmpQuaternion = new THREE.Quaternion();

    that.movementSpeed = spec.movementSpeed || 10;
    that.rollSpeed = spec.rollSpeed || Math.PI / 6;
    that.autoForward = spec.autoForward || false;
    that.dragToLook = spec.dragToLook || false;

    that.rotate = function() {
        var angularThrust = {
            pitchUp: 0, pitchDown: 0,
            yawLeft: 0, yawRight: 0,
            rollLeft: 0, rollRight: 0
        };
        return function ( delta ) {
            var rotMult = delta * that.accAngular;
            angularThrust.pitchUp = that.keyboard.pressed( "up" ) ? 1 : 0;
            angularThrust.pitchDown = that.keyboard.pressed( "down" ) ? 1 : 0;
            angularThrust.yawLeft = that.keyboard.pressed( "left" ) ? 1 : 0;
            angularThrust.yawRight = that.keyboard.pressed( "right" ) ? 1 : 0;
            angularThrust.rollLeft = that.keyboard.pressed( "q" ) ? 1 : 0;
            angularThrust.rollRight = that.keyboard.pressed( "e" ) ? 1 : 0;

            that.entity.rotationVector.x = ( -angularThrust.pitchDown + angularThrust.pitchUp );
            that.entity.rotationVector.y = ( -angularThrust.yawRight  + angularThrust.yawLeft );
            that.entity.rotationVector.z = ( -angularThrust.rollRight + angularThrust.rollLeft );

            // perform update
            that.tmpQuaternion.set(
                    that.entity.rotationVector.x * rotMult,
                    that.entity.rotationVector.y * rotMult,
                    that.entity.rotationVector.z * rotMult, 1
                    ).normalize();
            that.object.quaternion.multiply( that.tmpQuaternion );

            // expose the rotation vector for convenience
            that.object.rotation.setEulerFromQuaternion( that.object.quaternion, that.object.eulerOrder );
        };

    }(),

    that.translate = function() {
        var dv = new THREE.Vector3();
        var thrust = {
            up: 0, down: 0, left: 0, right: 0, forward: 0, back: 0,
        };
        return function ( delta ) {
            var moveMult = delta * that.accLinear;
            thrust.forward = that.keyboard.pressed( "w" ) ? 1 : 0;
            thrust.back = that.keyboard.pressed( "s" ) ? 1 : 0;
            thrust.left = that.keyboard.pressed( "a" ) ? 1 : 0;
            thrust.right = that.keyboard.pressed( "d" ) ? 1 : 0;
            thrust.up = that.keyboard.pressed( "r" ) ? 1 : 0;
            thrust.down = that.keyboard.pressed( "f" ) ? 1 : 0;

            var forward = (
                    thrust.forward || ( that.autoForward && !thrust.back )
                    ) ? 1 : 0;
            that.entity.moveVector.x = ( -thrust.left    + thrust.right );
            that.entity.moveVector.y = ( -thrust.down    + thrust.up );
            that.entity.moveVector.z = ( -forward + thrust.back );

            dv.copy( that.entity.moveVector );
            dv.applyQuaternion( that.object.quaternion );
            dv.multiplyScalar( moveMult );
            that.entity.vel.add( dv );
            that.object.position.add( that.entity.vel );
        };
    }(),

    that.commandScan = function() {
        var fireShot = that.keyboard.pressed( "space" ) ? 1 : 0;
        var update;
        // if (fireShot) update = that.entity.fireLaser( that.object.quaternion, that.object.eulerOrder );
        // else update = { type: 'none' };
        update = { type: 'none' };
        return update;
    },

    that.update = function( delta ) {
        // update ship
        // console.log(that.entity.moveVector);
        // console.log(that.entity.mesh.rotation);
        that.entity;
        debugger;
        that.translate( delta );
        that.rotate( delta );

        return that.commandScan();
    }
    return that;
};

