//****QUIZ CONTROLLER****/
var quizContraller = (function() {
  
  localStorage.setItem('data', JSON.stringify([1, 2, 3, 4]));
  localStorage.removeItem('data');
  console.log(JSON.parse(localStorage.getItem('data')));


})();

//****UI CONTROLLER****/
var UIController = (function() {
  
})();

//****CONTROLLER****/
var Controller = (function(quizCtrl, uiCtrl) {

  
})(quizContraller, UIController);
