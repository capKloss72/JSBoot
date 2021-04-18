var person = {
  firstName: 'John',
  lastName: 'Smith',
  fullName: function () {
    return this.firstName + ' ' + this.lastName;
  }
}

var definePerson = function(age,job) {
  console.log(this.fullName() + ' is ' + age + ' years old and he is ' + job);
}

definePerson.call(person, 28, 'develioper');
definePerson.apply(person, [30,'dba']);

var getPerson = definePerson.bind(person, 48);
getPerson('scrum master');
getPerson('PM');