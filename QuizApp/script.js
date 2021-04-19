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

  return {
    addQuestionOnLocalStorage: function (newQuestionText, options) {
      var optionsArray, correctAnswer, questionId, newQuestion, getStoredQuestions;

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
        }
      });

      const qCollection = questionLocalStorage.getQuestionCollection();
      // [] 
      if(questionLocalStorage.getQuestionCollection().length > 0) {
        questionId = questionLocalStorage.getQuestionCollection()[questionLocalStorage.getQuestionCollection().length - 1].id + 1;
      } else {
        questionId = 0;
      }
      var newQuestion = new Question(questionId, newQuestionText, optionsArray, correctAnswer);
      getStoredQuestions = questionLocalStorage.getQuestionCollection();
      getStoredQuestions.push(newQuestion);
      questionLocalStorage.setQuestionCollection(getStoredQuestions);
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
    adminOption: document.querySelectorAll('.admin-option')
  }
  
  return {
    getDomItems: domItems
  };

})();

//****CONTROLLER****/
var Controller = (function(quizCtrl, uiCtrl) {
  var selectedDomItems = uiCtrl.getDomItems;
  selectedDomItems.questionInsertBtn.addEventListener('click', function(e) {
    quizCtrl.addQuestionOnLocalStorage(selectedDomItems.newQuestionText.value, selectedDomItems.adminOption);
  })  
})(quizContraller, UIController);
