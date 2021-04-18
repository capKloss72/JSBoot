function calc(num1) {
  var num2 = 10;
  return function(num3) {
    var sum = num1 + num2 + num3;
    console.log(sum);
  }
}

var add = calc(5);
add(15);


function a() {
  var arr = [];
  for (var i = 0; i < 3; i++) {
    arr.push((function() {
      console.log(i);
    })())
  }
  return arr;
}

a();

var c = a();

console.log(c[0],c[1],c[2]);