
// Create list item
function generateNoteListItem(noteName) {

  var list = document.getElementById('list');
  var newLi = document.createElement('li');
  var newP = document.createElement('p');
  var newPI = document.createElement('p');
  var newIPencil = document.createElement('i');
  var newITimes = document.createElement('i');
  var newInput = document.createElement('input');

  newLi.appendChild(newP);
  newLi.appendChild(newPI);
  newPI.appendChild(newIPencil);
  newPI.appendChild(newITimes);
  newLi.appendChild(newInput);

  newP.innerHTML = noteName;
  newIPencil.setAttribute('class', 'fa fa-pencil-square-o');
  newITimes.setAttribute('class', 'fa fa-times');
  newInput.setAttribute('class', 'edit-node');
  newInput.setAttribute('type', 'text');

	list.appendChild(newLi);

	console.log(newLi);
	
//   var newEl = document.createElement('button');
// console.log(newEl);

// var text = document.createTextNode('Click');

// newEl.appendChild(text);
// newEl.setAttribute('style', 'display: block; margin: 10px auto; padding: 5px 10px; background: coral; color: white');

// var form = document.getElementById('add');
// //form.appendChild(newEl);

// form.insertBefore(newEl, form.children[0]);

// form.removeChild(newEl);



//<li>
//					<p>Third note</p>
//					<p><i class="fa fa-pencil-square-o"></i><i class="fa fa-times"></i></p>
//					<input class="edit-note" type="text">
//				</li>
}

function getUserInput() {
  var btn = document.getElementById('add-btn');
  var input = document.getElementById('add-input');
  
  btn.addEventListener('click', function() {
    console.log(input.nodeValue);
  })
}

var btn = document.getElementById('add-btn');
var input = document.getElementById('add-input');
  
btn.addEventListener('click', function(e) {
	e.preventDefault();
  console.log('Nothing ' + input.value);
  generateNoteListItem(input.value);
})

//generateNoteListItem('input.value');










