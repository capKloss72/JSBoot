var list = document.querySelector('ul');

// Create list item
function generateNoteListItem(noteName) {

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

  cleanupAddNoteInput();
}

// Edit and delte items
list.addEventListener('click', function(e) {
  if (e.target.classList[1] === 'fa-pencil-square-o') {
    var parentPara = e.target.parentNode;
    parentPara.style.display = 'none';
    var input = parentPara.nextElementSibling;
    var note = parentPara.previousElementSibling;    
    console.log(e.target.classList[1] + ' ' + note + ' ' + input);
  }
})

function cleanupAddNoteInput() {
  if (input.value != null && (input.value).trim().length > 0) {
    input.value = '';
  }
}

var btn = document.getElementById('add-btn');
var input = document.getElementById('add-input');
  
btn.addEventListener('click', function(e) {
	e.preventDefault();
	var newNote = input.value.trim();
  if (newNote != null && newNote.length > 0) {
		generateNoteListItem(input.value);
	}
})









