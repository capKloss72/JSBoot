function finalResult(score) {
  if (score >= 81) {
    return function(name) {
      console.log(name + ' you passed an exam with a score of ' + score + ' and you are a student of a state uni');
    }
  } else if (score >= 51) {
    return function(name) {
      console.log(name + ' you passed an exam with a score of ' + score + ' and you are a student of a college');
    }
  } else {
    return function(name) {
      console.log(name + ' you failed with a score of ' + score);
    }
  }
}

var result1 = finalResult(77);
result1('John');

var result1 = finalResult(44);
result1('Bob');

finalResult(96)('Tym');