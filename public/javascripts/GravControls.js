
/* GravControls
 * heavily based off FlyControls by James Baicoianu / http://www.baicoianu.com/
 */

var gravControls = function( spec ) {
    var that = {};

    that.keyboard = new THREEx.KeyboardState();

    that.entity = spec.entity;
    that.mesh = spec.entity.mesh;

	that.dragToLook = false;
	that.autoForward = false;

    that.movementSpeed = spec.movementSpeed || 10;
    that.rollSpeed = spec.rollSpeed || Math.PI / 6;
    that.autoForward = spec.autoForward || false;
    that.dragToLook = spec.dragToLook || false;

    that.update = { type: 'none' };

    that.commandScan = function() {
        var fireShot = that.keyboard.pressed( "space" ) ? 1 : 0;
        if (fireShot) update = that.entity.fireLaser( that.mesh.quaternion, that.mesh.eulerOrder );

        that.entity.thrust.forward = that.keyboard.pressed( "w" ) ? 1 : 0;
        that.entity.thrust.back = that.keyboard.pressed( "s" ) ? 1 : 0;
        that.entity.thrust.left = that.keyboard.pressed( "a" ) ? 1 : 0;
        that.entity.thrust.right = that.keyboard.pressed( "d" ) ? 1 : 0;
        that.entity.thrust.up = that.keyboard.pressed( "r" ) ? 1 : 0;
        that.entity.thrust.down = that.keyboard.pressed( "f" ) ? 1 : 0;

        that.entity.angularThrust.pitchUp = that.keyboard.pressed( "up" ) ? 1 : 0;
        that.entity.angularThrust.pitchDown = that.keyboard.pressed( "down" ) ? 1 : 0;
        that.entity.angularThrust.yawLeft = that.keyboard.pressed( "left" ) ? 1 : 0;
        that.entity.angularThrust.yawRight = that.keyboard.pressed( "right" ) ? 1 : 0;
        that.entity.angularThrust.rollLeft = that.keyboard.pressed( "q" ) ? 1 : 0;
        that.entity.angularThrust.rollRight = that.keyboard.pressed( "e" ) ? 1 : 0;
    };

    return that;
};

