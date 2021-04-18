// var myObj = '{"name": "John","age": 47,"married": true,"childrenames": ["Anne", "Nick"]}'
// var myData = JSON.parse(myObj);
// console.log(myData);

var xmlHTTP = new XMLHttpRequest();
xmlHTTP.open("GET", "users.json", true);
xmlHTTP.onload = function() {
  if (this.status == 200) {
    var myData = JSON.parse(this.responseText);
    console.log(myData);
  }
}
xmlHTTP.send();