var h2 = document.querySelector('header h2');

// h2.onclick = function() {
//   console.log('onclick executed');
// }

// h2.onmouseover = function() {
//   console.log('mouseover executed');
// }

h2.addEventListener('click', function() {
  console.log('Clicked');
});

h2.addEventListener('click', a);

function a() {
  console.log('A Clicked');
}

