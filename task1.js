var examScoreJohn = 80, examScoreNick = 45;
var pass = 51;

if (examScoreJohn >= pass && examScoreNick >= pass) {
  console.log('Both students passed');
} else if (examScoreJohn >= pass) {
  console.log('John has passed ' + 'with ' + examScoreJohn);
} else if (examScoreNick >= pass) {
  console.log('Nick has passed ' + 'with ' + examScoreNick);
} else {
  console.log('No one passed');
}