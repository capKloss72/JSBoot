class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
}

class ProtoTest {
  constructor(test) {
    this.test = test;
  }
}

Person.prototype.getFullName = function() {
  return this.firstName + ' ' + this.lastName;
}

var person1 = new Person('Tym', 'Zon');
var person2 = new Person('Sim', 'Cavilli');


var protoTest = new ProtoTest('test');

console.log(person1.getFullName(), person2, protoTest);



