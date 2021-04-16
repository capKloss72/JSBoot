class Student {
  constructor(name, score1, score2) {
    this.name = name;
    this.score1 = score1;
    this.score2 = score2; 
  }  
  showIfPassed(diplomaDegrees, passingLimits) {
    for (var i = 0; i < diplomaDegrees.length && i < passingLimits.length; i++) {
      if (this.calacuateTotalScore() >= passingLimits[i]) {     
        return this.name + ' has passed with a mark of ' + this.calacuateTotalScore() + ' diploma ' + diplomaDegrees[i];  
      } else {
        if (diplomaDegrees[i] === 'E') {
          return this.name + ' has failed with a mark of ' + this.calacuateTotalScore() + ' diploma ' + diplomaDegrees[i];
        }
      }
    }
  }
  calacuateTotalScore() {
    return this.score1 + this.score2;
  } 
}

var student1 = new Student('John', 47, 46);
var student2 = new Student('Bob', 23, 24);
var student3 = new Student('Nick', 40, 35);
var student4 = new Student('Alex', 44, 45);

var students = [student1, student2, student3, student4];

var diplomaDegrees = ['A', 'B', 'C', 'D', 'E'];
var passingLimits = [91, 81, 71, 61, 51];

for (var i = 0; i < students.length; i++) {
  console.log(students[i].showIfPassed(diplomaDegrees, passingLimits));
  //students[i].showIfPassed(diplomaDegrees, passingLimits);
}





