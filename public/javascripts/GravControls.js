
/* GravControls
 * heavily based off FlyControls by James Baicoianu / http://www.baicoianu.com/
 */
THREE.GravControls = function ( entity ) {

    this.keyboard = new THREEx.KeyboardState();
    this.entity = entity;

    this.object = entity.mesh;

	this.dragToLook = false;
	this.autoForward = false;
	this.tmpQuaternion = new THREE.Quaternion();
};

THREE.GravControls.prototype = {

    constructor: THREE.GravControls,

    rotate: function() {
        var angularThrust = {
            pitchUp: 0, pitchDown: 0,
            yawLeft: 0, yawRight: 0,
            rollLeft: 0, rollRight: 0
        };
        return function ( delta ) {
            var rotMult = delta * this.accAngular;
            angularThrust.pitchUp = this.keyboard.pressed( "up" ) ? 1 : 0;
            angularThrust.pitchDown = this.keyboard.pressed( "down" ) ? 1 : 0;
            angularThrust.yawLeft = this.keyboard.pressed( "left" ) ? 1 : 0;
            angularThrust.yawRight = this.keyboard.pressed( "right" ) ? 1 : 0;
            angularThrust.rollLeft = this.keyboard.pressed( "q" ) ? 1 : 0;
            angularThrust.rollRight = this.keyboard.pressed( "e" ) ? 1 : 0;

            this.entity.rotationVector.x = ( -angularThrust.pitchDown + angularThrust.pitchUp );
            this.entity.rotationVector.y = ( -angularThrust.yawRight  + angularThrust.yawLeft );
            this.entity.rotationVector.z = ( -angularThrust.rollRight + angularThrust.rollLeft );

            // perform update
            this.tmpQuaternion.set(
                    this.entity.rotationVector.x * rotMult,
                    this.entity.rotationVector.y * rotMult,
                    this.entity.rotationVector.z * rotMult, 1
                    ).normalize();
            this.object.quaternion.multiply( this.tmpQuaternion );

            // expose the rotation vector for convenience
            this.object.rotation.setEulerFromQuaternion( this.object.quaternion, this.object.eulerOrder );
        };

    }(),

    translate: function() {
        var dv = new THREE.Vector3();
        var thrust = {
            up: 0, down: 0, left: 0, right: 0, forward: 0, back: 0,
        };
        return function ( delta ) {
            var moveMult = delta * this.accLinear;
            thrust.forward = this.keyboard.pressed( "w" ) ? 1 : 0;
            thrust.back = this.keyboard.pressed( "s" ) ? 1 : 0;
            thrust.left = this.keyboard.pressed( "a" ) ? 1 : 0;
            thrust.right = this.keyboard.pressed( "d" ) ? 1 : 0;
            thrust.up = this.keyboard.pressed( "r" ) ? 1 : 0;
            thrust.down = this.keyboard.pressed( "f" ) ? 1 : 0;

            var forward = (
                    thrust.forward || ( this.autoForward && !thrust.back )
                    ) ? 1 : 0;
            this.entity.moveVector.x = ( -thrust.left    + thrust.right );
            this.entity.moveVector.y = ( -thrust.down    + thrust.up );
            this.entity.moveVector.z = ( -forward + thrust.back );

            dv.copy( this.entity.moveVector );
            dv.applyQuaternion( this.object.quaternion );
            dv.multiplyScalar( moveMult );
            this.entity.vel.add( dv );
            this.object.position.add( this.entity.vel );
        };
    }(),

    commandScan: function() {
        var fireShot = this.keyboard.pressed( "space" ) ? 1 : 0;
        var update;
        // if (fireShot) update = this.entity.fireLaser( this.object.quaternion, this.object.eulerOrder );
        // else update = { type: 'none' };
        update = { type: 'none' };
        return update;
    },

    update: function( delta ) {
        // update ship
        this.translate( delta );
        this.rotate( delta );

        return this.commandScan();
    }
};

