//var icons = document.getElementsByClassName('fa');

// for (var i = 0; i < icons.length; i++) {
//   console.log(icons[i]);
// }

// var iconsarray = Array.from(icons);
// iconsarray.push('hello');

// console.log(iconsarray);

// Array.from(icons).forEach(function(icon) {
//   console.log(icon);
// })

// var lis = document.getElementsByTagName('li');
// console.log(lis);

// var lis = document.querySelectorAll('li, h2, #hide-list');
// console.log(lis);

// Array.from(lis).forEach(function(li) {
//   li.textContent = 'Hello world';
// });

var h2 = document.querySelector('header h2');

h2.className = 'changeBg';
// h2.className += ' changeFt';

// console.log(h2.className);

h2.classList.add('changeFt');

h2.classList.toggle('changeBg');

console.log(h2.classList);

















