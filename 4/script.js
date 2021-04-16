//var listItem = document.getElementById('list-item');

var newEl = document.createElement('button');
console.log(newEl);

var text = document.createTextNode('Click');

newEl.appendChild(text);
newEl.setAttribute('style', 'display: block; margin: 10px auto; padding: 5px 10px; background: coral; color: white');

var form = document.getElementById('add');
//form.appendChild(newEl);

form.insertBefore(newEl, form.children[0]);

form.removeChild(newEl);