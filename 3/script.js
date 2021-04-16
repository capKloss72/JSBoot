// console.log(a);
// console.log(b());

// var a = 10;

// var b = function b() {
//   return 20;
// }

// console.log(a);

// if (true) {
//   var a = 10;
// } else {
//   var b = 20;
// }

// console.log(a);
// console.log(b);

// function a () {
//   console.log(this);
// }
// a();

var per = {
  firstName: 'John',
  lastName: 'Smith',
  getFullName: function() {
    console.log(this === per);
    return this.firstName + ' ' + this.lastName;
  }
}

console.log(per.getFullName());