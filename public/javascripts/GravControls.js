
/* GravControls
 * heavily based off FlyControls by James Baicoianu / http://www.baicoianu.com/
 */
THREE.GravControls = function ( object ) {

    this.object = object;
	this.object.useQuaternion = true;
    this.accLinear = .5;
    this.accAngular = Math.PI / 3;
	this.dragToLook = false;
	this.autoForward = false;

	this.tmpQuaternion = new THREE.Quaternion();
	this.moveVector = new THREE.Vector3( 0, 0, 0 );
	this.rotationVector = new THREE.Vector3( 0, 0, 0 );
    this.vel = new THREE.Vector3( 0, 0, 0 );
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
            angularThrust.pitchUp = keyboard.pressed( "up" ) ? 1 : 0;
            angularThrust.pitchDown = keyboard.pressed( "down" ) ? 1 : 0;
            angularThrust.yawLeft = keyboard.pressed( "left" ) ? 1 : 0;
            angularThrust.yawRight = keyboard.pressed( "right" ) ? 1 : 0;
            angularThrust.rollLeft = keyboard.pressed( "q" ) ? 1 : 0;
            angularThrust.rollRight = keyboard.pressed( "e" ) ? 1 : 0;

            this.rotationVector.x = ( -angularThrust.pitchDown + angularThrust.pitchUp );
            this.rotationVector.y = ( -angularThrust.yawRight  + angularThrust.yawLeft );
            this.rotationVector.z = ( -angularThrust.rollRight + angularThrust.rollLeft );

            // perform update
            this.tmpQuaternion.set(
                    this.rotationVector.x * rotMult,
                    this.rotationVector.y * rotMult,
                    this.rotationVector.z * rotMult, 1
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
            thrust.forward = keyboard.pressed( "w" ) ? 1 : 0;
            thrust.back = keyboard.pressed( "s" ) ? 1 : 0;
            thrust.left = keyboard.pressed( "a" ) ? 1 : 0;
            thrust.right = keyboard.pressed( "d" ) ? 1 : 0;
            thrust.up = keyboard.pressed( "r" ) ? 1 : 0;
            thrust.down = keyboard.pressed( "f" ) ? 1 : 0;

            var forward = (
                    thrust.forward || ( this.autoForward && !thrust.back )
                    ) ? 1 : 0;
            this.moveVector.x = ( -thrust.left    + thrust.right );
            this.moveVector.y = ( -thrust.down    + thrust.up );
            this.moveVector.z = ( -forward + thrust.back );

            dv.copy( this.moveVector );
            dv.applyQuaternion( this.object.quaternion );
            dv.multiplyScalar( moveMult );
            this.vel.add( dv );
            this.object.position.add( this.vel );
        };
    }(),

    update: function( delta ) {
        // update ship
        this.translate( delta );
        this.rotate( delta );
    }
};

