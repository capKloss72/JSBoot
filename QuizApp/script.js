// @ts-check
//****QUIZ CONTROLLER ****/
var quizController = (function() {
  
  // Question Constructor used to store questions in local storage
  class Question {
    constructor(id, questionText, options, correctAnswer) {
      this.id = id;
      this.questionText = questionText;
      this.options = options;
      this.correctAnswer = correctAnswer;
    }
  }

  /*
    Function used to write, read and remove questions from local storage
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

  // Returns functions and variables form QUIZ CONTROLLER
  return {

    // Makes questionLocalStorage publicly accessible 
    getQuestionLocalStorage: questionLocalStorage,

    /*
      Adds questions to local storage.
      Parameters: newQuestionText - new-question-text element from domItems
                  options - text next to the radio button used to indicate correct answer
    */
    addQuestionOnLocalStorage: function (newQuestionText, options) {
      var optionsArray, correctAnswer, questionId, newQuestion, getStoredQuestions, isChecked = false;

      // Check is local storage is empty and instantiates an empty [] if null
      if (questionLocalStorage.getQuestionCollection() === null) {
        questionLocalStorage.setQuestionCollection([]);
      }

      optionsArray = [];
      options.forEach(option => {
        if (option.value !== null && option.value !== "") {
          optionsArray.push(option.value);
        }
        if (option.previousElementSibling.checked && option.value !== "") {
          correctAnswer = option.value;
          isChecked = true;
        }
      });

      const qCollection = questionLocalStorage.getQuestionCollection();
      // [] 
      if(questionLocalStorage.getQuestionCollection().length > 0) {
        questionId = questionLocalStorage.getQuestionCollection()[questionLocalStorage.getQuestionCollection().length - 1].id + 1;
      } else {
        questionId = 0;
      }

      if (newQuestionText !== null && newQuestionText.value.length > 0) {
        if (optionsArray.length >= 2) {
          if (isChecked) {
            var newQuestion = new Question(questionId, newQuestionText.value, optionsArray, correctAnswer);
            getStoredQuestions = questionLocalStorage.getQuestionCollection();
            getStoredQuestions.push(newQuestion);
            questionLocalStorage.setQuestionCollection(getStoredQuestions);
            newQuestionText.value = "";
            options.forEach(option => {
              if (option.value !== null && option.value !== "") {
                option.value = "";
              }
              if (option.previousElementSibling.checked) {
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

  var domItems = {
    // Admin Panel Elements
    questionInsertBtn: document.getElementById('question-insert-btn'),
    newQuestionText: document.getElementById('new-question-text'),
    adminOption: document.querySelectorAll('.admin-option'),
    adminOptionsContainer: document.querySelector('.admin-options-container'),
    insertedQuestionsWrapper: document.querySelector('.inserted-questions-wrapper')
  }
  
  return {
    getDomItems: domItems,
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

        //Add new question
        questionHTML = '<p><span>' + numberingArray[i] + ' ' + getQuestions.getQuestionCollection()[i].questionText  + '</span><button id="question-' + getQuestions.getQuestionCollection()[i].id  + '">Edit</button></p>';
        domItems.insertedQuestionsWrapper.insertAdjacentHTML('afterbegin', questionHTML);
      }
    }
  };

})();

//****CONTROLLER****/
var Controller = (function(quizCtrl, uiCtrl) {
  var selectedDomItems = uiCtrl.getDomItems;

  uiCtrl.addInputsDynamically();
  uiCtrl.createQuestionList(quizController.getQuestionLocalStorage);

  selectedDomItems.questionInsertBtn.addEventListener('click', function(e) {
    var adminOptions = document.querySelectorAll('.admin-option');
    
    var checkIfInserted = quizCtrl.addQuestionOnLocalStorage(selectedDomItems.newQuestionText, adminOptions);

    if (checkIfInserted) {
      //Update the question list following a successful insert into question list
      uiCtrl.createQuestionList(quizController.getQuestionLocalStorage);
    }

  });
  
  selectedDomItems.insertedQuestionsWrapper.addEventListener('click', function(e) {
    console.log(e.target);

  });

})(quizController, UIController);
