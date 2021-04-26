// @ts-check
/**
 * QUIZ CONTROLLER
 */
var QuizController = (function() {
  
  // Question Constructor used to store questions in local storage
  /**
   * class containing questions and list of answer options with a correct answer indicated 
   * @constructor
   * @param {number} id`
   * @param {HTMLDocument} questionText
   * @param {NodeList} options
   * @param {NodeList} correctAnswer
   */
  class Question {
    constructor(id, questionText, options, correctAnswer) {
      this.id = id;
      this.questionText = questionText;
      this.options = options;
      this.correctAnswer = correctAnswer;
    }
  }
  
 /**
  * Function used to write, read and remove questions from local storage
  */
  var questionLocalStorage = {
    setQuestionCollection: function(newCollection) {
      localStorage.setItem('questionCollection', JSON.stringify(newCollection))     
    },
    getQuestionCollection: function() {
      var questionCollection = JSON.parse(localStorage.getItem('questionCollection'))
      return questionCollection;
    },
    removeQuestionCollection: function() {
      localStorage.removeItem('questionCollection')
    }
  }

  
  /**
   * @return {questionLocalStorage, addQuestionOnLocalStorage}
   */
  return {

    // Makes questionLocalStorage publicly accessible 
    getQuestionLocalStorage: questionLocalStorage,

   /**
    * Adds questions to local storage.
    * @param {HTMLElement} newQuestionText 
    * @param {NodeList} options 
    * @returns {boolean} true if element has been added correctly 
    */
    addQuestionOnLocalStorage: function (newQuestionText, options) {
      var optionsArray, correctAnswer, questionId, newQuestion, getStoredQuestions, isChecked = false;

      // Check is local storage is empty and instantiates an empty [] if null
      if (questionLocalStorage.getQuestionCollection() === null) {
        questionLocalStorage.setQuestionCollection([]);
      }

      //Check if the options are not empty and that the correct answer is selected
      optionsArray = [];
      options.forEach(option => {
        // @ts-ignore
        if (option.value !== null && option.value !== "") {
          // @ts-ignore
          optionsArray.push(option.value);
        }
        // @ts-ignore
        if (option.previousElementSibling.checked && option.value !== "") {
          // @ts-ignore
          correctAnswer = option.value;
          isChecked = true;
        }
      });

      // @ts-ignore
      const qCollection = questionLocalStorage.getQuestionCollection();
      // [] Increment question ID or add the first ID if none exists
      if(questionLocalStorage.getQuestionCollection().length > 0) {
        questionId = questionLocalStorage.getQuestionCollection()[questionLocalStorage.getQuestionCollection().length - 1].id + 1;
      } else {
        questionId = 0;
      }

      // @ts-ignore
      if (newQuestionText !== null && newQuestionText.value.length > 0) {
        if (optionsArray.length >= 2) {
          if (isChecked) {
            // @ts-ignore
            var newQuestion = new Question(questionId, newQuestionText.value, optionsArray, correctAnswer);
            getStoredQuestions = questionLocalStorage.getQuestionCollection();
            getStoredQuestions.push(newQuestion);
            questionLocalStorage.setQuestionCollection(getStoredQuestions);
            // @ts-ignore
            newQuestionText.value = "";
            options.forEach(option => {
              // @ts-ignore
              if (option.value !== null && option.value !== "") {
                // @ts-ignore
                option.value = "";
              }
              // @ts-ignore
              if (option.previousElementSibling.checked) {
                // @ts-ignore
                option.previousElementSibling.checked = false;
              }
            });
            return true;
          } else {
            alert('You must select the correct answer');
            return false;
          }
        } else {
          alert('You must add at least two answers');
          return false;
        }
      } else {
        alert("Please enter a valid question");
        return false;
      }
    }
  }
})();

//****UI CONTROLLER****/
var UIController = (function() {

  /**
   * Return DOM elements used by the app
   * @param {HTMLElement} questionInsertBtn button to insert new question / answer
   * @param {HTMLElement} newQuestionText new question text box and associated element
   * @param {NodeList} adminOption questions and selected correct answer
   * @param {Element} adminOptionsContainer contains DIV of the administrative options --> DIV containing answers and correct answer selection
   * @param {Element} insertedQuestionsWrapper inserted / saved sawers including edit button 
   */
  var domItems = {
    // Admin Panel Elements
    questionInsertBtn: document.getElementById('question-insert-btn'),
    newQuestionText: document.getElementById('new-question-text'),
    adminOption: document.querySelectorAll('.admin-option'),
    adminOptionsContainer: document.querySelector('.admin-options-container'),
    insertedQuestionsWrapper: document.querySelector('.inserted-questions-wrapper'),
    questionUpdateBtn: document.getElementById('question-update-btn'),
    questionDeleteBtn: document.getElementById('question-delete-btn'),
    questionClearBtn: document.getElementById('questions-clear-btn')
  }
  
  return {
    getDomItems: domItems,

    // Adds a new answer option dynamically once the focus of the last element is selected 
    addInputsDynamically: function() {

      var addInput = function () {
        var inputHTML, z;

        z = document.querySelectorAll('.admin-option').length;

        inputHTML = '<div class="admin-option-wrapper"><input type="radio" class="admin-option-' + z + '" name="answer" value="1"><input type="text" class="admin-option admin-option-' + z + '" value=""></div>';
        domItems.adminOptionsContainer.insertAdjacentHTML('beforeend', inputHTML);
        domItems.adminOptionsContainer.lastElementChild.previousElementSibling.lastElementChild.removeEventListener('focus', addInput);
        domItems.adminOptionsContainer.lastElementChild.lastElementChild.addEventListener('focus', addInput);
      }
      domItems.adminOptionsContainer.lastElementChild.lastElementChild.addEventListener('focus', addInput);
    },

    /**
     * Update the list of questions in the lower panel
     * @param {any} getQuestions 
     */
    createQuestionList: function(getQuestions) {
      var questionHTML, numberingArray = [];
      domItems.insertedQuestionsWrapper.innerHTML = '';

      //Check if local storage is empty
      if (getQuestions.getQuestionCollection() === null) {
        getQuestions.setQuestionCollection([]);
      }

      //Add new question to question list
      for(var i = 0; i < getQuestions.getQuestionCollection().length; i++) {
        //Update question number
        numberingArray.push(i+1);

        //Add new question and change button id to be ID+1
        questionHTML = '<p><span>' + numberingArray[i] + ' ' + getQuestions.getQuestionCollection()[i].questionText  + '</span><button id="question-' + getQuestions.getQuestionCollection()[i].id  + '">Edit</button></p>';
        
        // Insert new question to question list
        domItems.insertedQuestionsWrapper.insertAdjacentHTML('afterbegin', questionHTML);
      }
    },

    /**
     * Function to edit created questions
     * @param {Event} event 
     * @param {*} storageQuestionList 
     */
    editQuestionList: function(event, storageQuestionList, addInputsDyna) {
      var getID, getStorageQuestionList, foundItem, placeInArray, optionHTML = '';
      if('question-'.indexOf(event.target.id)) {
        getID = parseInt(event.target.id.split('-')[1]);
        getStorageQuestionList = storageQuestionList.getQuestionCollection();
        
        for (var i = 0; i < getStorageQuestionList.length; i++) {
          if (getStorageQuestionList[i].id === getID) {
            foundItem = getStorageQuestionList[i];
            placeInArray = i;
          }
        }

        domItems.newQuestionText.value = foundItem.questionText;
        domItems.adminOptionsContainer.innerHTML = '';

        for (var x = 0; x < foundItem.options.length; x++) {
          optionHTML += '<div class="admin-option-wrapper"><input type="radio" class="admin-option-"' + x + 'name="answer" value="' + x + '"><input type="text" class="admin-option admin-option-'+ x + '" value="' + foundItem.options[x] + '"></div>'
        }

        domItems.adminOptionsContainer.innerHTML = optionHTML;
        domItems.questionDeleteBtn.style.visibility = 'visible';
        domItems.questionUpdateBtn.style.visibility = 'visible';
        domItems.questionInsertBtn.style.visibility = 'hidden';
        domItems.questionClearBtn.style.pointerEvents = 'none';
        addInputsDyna();

        var updateQuestion = function() {
          var newOptions = [], optionElements;
          foundItem.questionText = domItems.newQuestionText.value;
          foundItem.correctAnswer = '';
          optionElements = document.querySelectorAll('.admin-option');

          for (var i = 0; i < optionElements.length; i++) {
            if (optionElements[i].value !== '') {
              newOptions.push(optionElements[i].value);
              
            }
            if (optionElements[i].previousElementSibling.checked) {
              foundItem.correctAnswer = optionElements[i].value;
            }
          }
          foundItem.options = newOptions;

          if (foundItem.questionText !== ''){
            if (foundItem.options.length > 1) {
              if (foundItem.correctAnswer !== '') {
                getStorageQuestionList.splice(placeInArray, 1, foundItem);
                storageQuestionList.setQuestionCollection(getStorageQuestionList);
              } else {
                alert('You must select the correct answer');
                return false;
              }
            } else {
              alert('Please provide at least two options');
            }
          } else {
            alert('Please, Insert question')
          }
        }

        domItems.questionUpdateBtn.onclick = updateQuestion;
        domItems.newQuestionText.value = foundItem.questionText;
        console.log(optionHTML);
      }
    }
  };

})();

//****CONTROLLER****/
/**
 * Controller
 * @param {QuizController} QuizController
 * @param {UIController} UIController
 */
var Controller = (function(quizCtrl, uiCtrl) {
  var selectedDomItems = uiCtrl.getDomItems;

  uiCtrl.addInputsDynamically();
  uiCtrl.createQuestionList(QuizController.getQuestionLocalStorage);

  // @ts-ignore
  selectedDomItems.questionInsertBtn.addEventListener('click', function(e) {
    var adminOptions = document.querySelectorAll('.admin-option');
    
    var checkIfInserted = quizCtrl.addQuestionOnLocalStorage(selectedDomItems.newQuestionText, adminOptions);

    if (checkIfInserted) {
      //Update the question list following a successful insert into question list
      uiCtrl.createQuestionList(QuizController.getQuestionLocalStorage);
    }

  });

  // selectedDomItems.questionUpdateBtn.addEventListener('click', function (e) {
  //   var adminOptions = selectedDomItems.adminOption;
  //   console.log('Here is us ' + selectedDomItems.newQuestionText.value);
  //   console.log(adminOptions);
  // });
  
  selectedDomItems.insertedQuestionsWrapper.addEventListener('click', function(e) {
    uiCtrl.editQuestionList(e, quizCtrl.getQuestionLocalStorage, uiCtrl.addInputsDynamically);

  });

})(QuizController, UIController);
