//****QUIZ CONTROLLER****/
var quizContraller = (function() {
  
  // Question Constructor
  class Question {
    constructor(id, questionText, options, correctAnswer) {
      this.id = id;
      this.questionText = questionText;
      this.options = options;
      this.correctAnswer = correctAnswer;
    }
  }

  var questionLocalStorage = {
    setQuestionCollection: function(newCollection) {
      localStorage.setItem('questionCollection', JSON.stringify(newCollection))     
    },
    getQuestionCollection: function() {
      var quuestionCollection = JSON.parse(localStorage.getItem('questionCollection'))
      return quuestionCollection;
    },
    removeQuestionCollection: function() {
      localStorage.removeItem('questionCollection')
    }
  }

  function isChecked(options) {
    options.forEach(option => {
      if (option.previousElementSibling.checked) {
        return true;
      } else {
        return false;
      }
    });
  }

  return {
    addQuestionOnLocalStorage: function (newQuestionText, options) {
      var optionsArray, correctAnswer, questionId, newQuestion, getStoredQuestions, isChecked = false;

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
          } else {
            alert('You must select the correct answer');
          }
        } else {
          alert('You must add at least two answers');
        }
      } else {
        alert("Please enter a valid question");
      }
      console.log('qCollection.getQuestionCollection() :>> ', questionLocalStorage.getQuestionCollection());
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
    adminOptionsContainer: document.querySelector('.admin-options-container')
  }
  
  return {
    getDomItems: domItems,
    addInoutsDynamically: function() {

      addInput = function () {
        console.log('added input dynamically');
      }

      domItems.adminOptionsContainer.lastElementChild.lastElementChild.addEventListener('focus', addInput);
    }
  };

})();

//****CONTROLLER****/
var Controller = (function(quizCtrl, uiCtrl) {
  var selectedDomItems = uiCtrl.getDomItems;

  uiCtrl.addInoutsDynamically();

  selectedDomItems.questionInsertBtn.addEventListener('click', function(e) {
    quizCtrl.addQuestionOnLocalStorage(selectedDomItems.newQuestionText, selectedDomItems.adminOption);
  })  
})(quizContraller, UIController);
