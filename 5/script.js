// function Person() {
//   this.name = 'John';
// }

// Person.prototype.greet = 'Hello';

// var per1 = new Person();

// var per2 = Object.create(Person.prototype);

// console.log(per1,per2);

var firstProto = {
  sayHello: function() {
    return 'Hello ' + this.name;
  }
}

var john = Object.create(firstProto, {
  name: {
    value: 'Johm'
  }
})

console.log(john);

var secProto = Object.create(firstProto, {
  sayHi: {
    value: function() {
      return 'Hi ' + this.name;
    }
  }
})

console.log(secProto);

var thirdProto = Object.create(secProto, {
  sayHolla: {
    value: function() {
      return 'Holla ' + this.name;
    }
  }
})

console.log(thirdProto);

var bob = Object.create(thirdProto, {
  sayCzesc: {
    value: function() {
      return 'CHesc ' + this.name;
    }
  }
})

console.log(bob);
console.log(bob.sayCzesc());

var obj = Object.create(null);

console.log(obj);