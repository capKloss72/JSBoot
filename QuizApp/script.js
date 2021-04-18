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

  return {
    addQuestionOnLocalStorage: function (newQuestionText, options) {
      var optionsArr, corrAnswer, questionId, newQuestion;
      questionId = 0;
      options.forEach(option => {
        if (option.value !== null && option.value !== "") {
          optionsArr.push(option.value);
        }
        if (option.previousElementSibling.checked && option.value !== "") {
          corrAnswer = option.value;
        }
      });
      var newQuestion = new Question(1,newQuestionText,optionsArr,corrAnswer);
      localStorage.setItem(questionId, JSON.stringify(newQuestion));
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
