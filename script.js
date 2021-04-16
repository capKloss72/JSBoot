function add (a, b) {
  console.log(a + b);
}
add(5,10);

var sum = function(a, b) {
  console.log(a + b);
}
sum(11,12);

var arr = ['John',
  'Bob',
  'Mary', 
  10, 
  true, 
  [1,2,3],
  function(name){
    return 'Hello ' + name;
  }];

console.log(arr[6]('Tymoteusz'));

var arr1 = new Array(1, 'John', false);
console.log(arr1);

var colors = ['white', 'black', 'red'];
colors[1] = 'grey';

colors.push('blue');
colors.pop();
colors.shift();
colors.unshift('yellow');
var black = colors.indexOf('grey');

console.log(colors);



