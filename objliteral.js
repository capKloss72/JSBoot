var person = {firstName: 'John', 
  lastName: 'Smith', 
  age: 7,
  dauther: {
    name: 'Mary',
    age: 5
  },
  myFunction: function(par) {
    console.log(par.d + ' is a dauther of ' + par.f + ' and she is ' + par.a);
  }
};
console.log(person);
person.myFunction({d: person.dauther.name, f: person.firstName, a: person.dauther.age});



