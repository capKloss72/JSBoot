//var h2 = document.querySelector('header h2');

// h2.onclick = function() {
//   console.log('onclick executed');
// }

// h2.onmouseover = function() {
//   console.log('mouseover executed');
// }

// h2.addEventListener('click', function() {
//   console.log('Clicked');
// });

// h2.addEventListener('click', function () {
//   a(5, 10);
// });

// function a(x, y) {
//   console.log(x + y);
// }

var div = document.querySelector('div.wrapper');
var header = document.querySelector('header');
var h2 = document.querySelector('header h2');

function a (message) {
  console.log(message);
}

div.addEventListener('click', function () {
  a ('div clicked');
})

header.addEventListener('click', function () {
  a ('header clicked');
})

h2.addEventListener('click', function () {
  a ('h2 clicked');
})




