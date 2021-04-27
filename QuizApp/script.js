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

  if (questionLocalStorage.getQuestionCollection() === null) {
    questionLocalStorage.setQuestionCollection([]);
  }

  var quizProgress = {
    questionIndex: 0
  }

  
  /**
   * @return {questionLocalStorage, addQuestionOnLocalStorage}
   */
  return {

    //Returns quizProgress object
    getQuizProgress: quizProgress,

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
              //quizProgress.questionIndex +=1;
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
    },

    checkForCorrectAnswer: function(answer) {
      var correctAnswer = questionLocalStorage.getQuestionCollection()[quizProgress.questionIndex].correctAnswer;
      return answer.innerHTML === correctAnswer;
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
    questionClearBtn: document.getElementById('questions-clear-btn'),
    //Elements for QUIZ Section of html
    askedQuestionText: document.getElementById('asked-question-text'),
    quizOptionsWrapper: document.querySelector('.quiz-options-wrapper'),
    progressWrapper: document.querySelector('.progressBar'),
    instantAnswerContainer: document.querySelector('.instant-answer-container'),
    instantAnswerWrapper: document.getElementById('instant-answer-wrapper'),
    instantAnswerText: document.getElementById('instant-answer-text'),
    instantAnswerBtn: document.getElementById('next-question-btn')
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
    editQuestionList: function(event, storageQuestionList, addInputsDyna, updateQuestionListFunction) {
      var getID, getStorageQuestionList, foundItem, placeInArray, optionHTML = '';
      // @ts-ignore
      if('question-'.indexOf(event.target.id)) {
        // @ts-ignore
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

        var backDefaultView = function() {
          // 185
          var updatedOptions;
          // CUT from updateQuestions Function
           // 168
           domItems.newQuestionText.value = '';
           // 186
           updatedOptions = document.querySelectorAll('.admin-option');
           // 169
           for(var i = 0; i < updatedOptions.length; i++) {
               // 170
               updatedOptions[i].value = '';
               // 171
               updatedOptions[i].previousElementSibling.checked = false;
           }
           // 172
           domItems.questionDeleteBtn.style.visibility = 'hidden';
           // 173
           domItems.questionUpdateBtn.style.visibility = 'hidden';
           // 174
           domItems.questionInsertBtn.style.visibility = 'visible';
           // 175
           domItems.questionClearBtn.style.pointerEvents = '';
           // 178
           updateQuestionListFunction(storageQuestionList);
      }

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
                backDefaultView();
                updateQuestionListFunction(storageQuestionList);
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

        var deleteQuestion = function() {
          // 181
         // console.log('Works');
         // 182
         getStorageQuestionList.splice(placeInArray, 1);
         // 183
         storageQuestionList.setQuestionCollection(getStorageQuestionList);
         // 188
         backDefaultView();
      }
      // 179
      domItems.questionDeleteBtn.onclick = deleteQuestion;
      }      
    },
    clearQuestList: function(storageQuestList) {
      //199
      if(storageQuestList.getQuestionCollection() !== null) {
      // 192
      // console.log(storageQuestList);
      // 193
          if(storageQuestList.getQuestionCollection().length > 0) {
              // 194
              var conf = confirm('Warning! You will lose entire question list');
              // 195
              // console.log(conf);
              // 196
              if(conf) {
                  // 197c
                  storageQuestList.removeQuestionCollection();
                  // 198
                  domItems.insertedQuestionsWrapper.innerHTML = '';
              }
          }
      }
    },

    displayQuestion: function(storageQuestionList, progress) {
      var newOptionHTML, charArray;

      charArray = ['A','B','C','D','E','F'];

      if (storageQuestionList.getQuestionCollection().length > 0) {
        domItems.askedQuestionText.textContent = storageQuestionList.getQuestionCollection()[progress.questionIndex].questionText;
        domItems.quizOptionsWrapper.innerHTML = '';
        var newOptions = [];
        for (var i = 0; i < storageQuestionList.getQuestionCollection()[progress.questionIndex].options.length; i++) {
          newOptionHTML = '<div class="choice-' + i + '"><span class="choice-' + i + '">' + charArray[i] + '</span><p  class="choice-' + i + '">' + storageQuestionList.getQuestionCollection()[progress.questionIndex].options[i]  + '</p></div>'
          domItems.quizOptionsWrapper.insertAdjacentHTML('beforeend', newOptionHTML);
        }
      }
    },

    displayProgress: function(storageQuestionList, progress) {
      var numberOfQuestions = storageQuestionList.getQuestionCollection().length;
      domItems.progressWrapper.firstElementChild.innerHTML = progress.questionIndex + 1 + '/' + numberOfQuestions;
      domItems.progressWrapper.lastElementChild.setAttribute('value', '' + (progress.questionIndex + 1 / numberOfQuestions) * 100);
      domItems.progressWrapper.lastElementChild.setAttribute('max', '100');
    },
    
    newDesign: function(isCorrect, answer) {
      var index = 0;
      var emotion = document.getElementById('emotion');
      var twoOptions = {
        instantAnswerText: ['This is the wrong answer', 'This is a correct answer'],
        emotions: ['./images/sad.png', './images/happy.png'],
        color: ['red', 'green'],
        nextBtnStyle: ["opacity: 0.6; pointer-events: none;", "opacity: 1; pointer-events: '';"]
      }

      domItems.quizOptionsWrapper.style.cssText = "opacity: 0.6; pointer-events: none;";
      domItems.instantAnswerContainer.style.opacity = '1';

      if (isCorrect) {
        index = 1;
      }

      domItems.instantAnswerText.innerHTML = twoOptions.instantAnswerText[index];
      emotion.setAttribute('src', twoOptions.emotions[index]);
      domItems.instantAnswerWrapper.style.backgroundColor = twoOptions.color[index];
      console.log(isCorrect, answer);
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
  // @ts-ignore
  selectedDomItems.questionInsertBtn.addEventListener('click', function(e) {
    var adminOptions = document.querySelectorAll('.admin-option');
    
    // @ts-ignore
    var checkIfInserted = quizCtrl.addQuestionOnLocalStorage(selectedDomItems.newQuestionText, adminOptions);

    if (checkIfInserted) {
      //Update the question list following a successful insert into question list
      uiCtrl.createQuestionList(QuizController.getQuestionLocalStorage);
    }

  });

  selectedDomItems.insertedQuestionsWrapper.addEventListener('click', function(e) {
    uiCtrl.editQuestionList(e, quizCtrl.getQuestionLocalStorage, uiCtrl.addInputsDynamically, uiCtrl.createQuestionList);

  });

  // 189
  selectedDomItems.questionClearBtn.addEventListener('click', function() {
    // 191
    uiCtrl.clearQuestList(quizCtrl.getQuestionLocalStorage);
  });

  // @ts-ignore
  uiCtrl.displayQuestion(quizCtrl.getQuestionLocalStorage, quizCtrl.getQuizProgress);

  // @ts-ignore
  uiCtrl.displayProgress(quizCtrl.getQuestionLocalStorage, quizCtrl.getQuizProgress);

  selectedDomItems.quizOptionsWrapper.addEventListener('click', function(e) {
    var updatedOptionDiv = selectedDomItems.quizOptionsWrapper.querySelectorAll('div');
    for (var i = 0; i < updatedOptionDiv.length; i++) {
      if (e.target.className === 'choice-' + i) {
        var answer = document.querySelector('.quiz-options-wrapper div p.' + e.target.className);
        uiCtrl.newDesign(quizCtrl.checkForCorrectAnswer(answer), answer);
      }
    }
  });

  selectedDomItems.instantAnswerBtn.addEventListener('click', function() {
    quizCtrl.getQuizProgress.questionIndex += 1;
    selectedDomItems.quizOptionsWrapper.style.cssText = "opacity: 1; pointer-events: '';";
    uiCtrl.displayQuestion(quizCtrl.getQuestionLocalStorage, quizCtrl.getQuizProgress);
    uiCtrl.displayProgress(quizCtrl.getQuestionLocalStorage, quizCtrl.getQuizProgress);
    selectedDomItems.instantAnswerContainer.style.opacity = '0';
    if (quizCtrl.getQuizProgress.questionIndex + 1 < quizCtrl.getQuestionLocalStorage.getQuestionCollection().length) {
      selectedDomItems.instantAnswerBtn.style.opacity = '1';
      selectedDomItems.instantAnswerBtn.style.pointerEvents = '';
    } else {
      selectedDomItems.instantAnswerBtn.style.opacity = '0.6';
      selectedDomItems.instantAnswerBtn.style.pointerEvents = 'none';
    }
  });

})(QuizController, UIController);
