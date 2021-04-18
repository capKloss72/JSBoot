var func = function() {
  console.log('Hello');
}

function sum(x,y, fn) {
  console.log(x+y);
  console.log(fn());
}

var booboo = function done() {
  return 'Calling from annomymous functions';
}

sum(5, 5, booboo);

var scores = [55,35,87,45];

function checkResult(arr, fn) {
  var newArr = [];
  for (var i = 0; i < arr.length; i++) {
    newArr.push(fn(arr[i]));
  }
  return newArr;
}

function passOrFail(score) {
  return score >= 51;
}

function diffInScore(score) {
  return score - 51;
}

console.log(checkResult(scores, passOrFail));
console.log(checkResult(scores, diffInScore));

