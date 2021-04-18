var person1 = {};
person1.firstName = 'John';
person1.lastName = 'Smith';

var person2 = {};
person2.firstName = 'Nick';
person2.lastName = 'Jones';

function createPerson(firstName, lastName) {
  var newPerson = {};
  newPerson.firstName = firstName;
  newPerson.lastName = lastName;
  return newPerson;
}

var person3 = createPerson('Bob', 'Brown');

console.log(person1,person2, person3);


class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
}

var person4 = new Person('Tym', 'Zon');
var person5 = new Person('Max', 'Zon');

console.log(person4, person5);












