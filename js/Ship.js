function Ship() {
    this.geoBody = new THREE.CubeGeometry(1,1,1);
    this.matBody = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    this.body = new THREE.Mesh( this.geoBody, this.matBody );

    this.rot = 1.57079633;

    return this;
}

Ship.prototype.yaw = function(rad){
    this.rot += rad;
    this.body.rotation.y = this.rot;
};

Ship.prototype.thrust = function(){
    var x = speed * Math.cos(this.rot);
    var z = speed * Math.sin(this.rot);
    this.body.position.x += z;
    this.body.position.z += x;
};

/*
// define the Student class
function Student() {
  // Call the parent constructor
  Person.call(this);
}

// inherit Person
Student.prototype = new Person();

// correct the constructor pointer because it points to Person
Student.prototype.constructor = Student;
 
// replace the sayHello method
Student.prototype.sayHello = function(){
  alert('hi, I am a student');
}

// add sayGoodBye method
Student.prototype.sayGoodBye = function(){
  alert('goodBye');
}

var student1 = new Student();
student1.sayHello();
student1.walk();
student1.sayGoodBye();

// check inheritance
alert(student1 instanceof Person); // true 
alert(student1 instanceof Student); // true
*/
