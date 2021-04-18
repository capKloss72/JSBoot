//import configData from './example.json';

var myObjJS = {
  name: 'John',
  age: 47,
  married: true,
  childrenames: ['Anne', 'Nick']
};


var myData = JSON.stringify(myObjJS);

console.log(myData);

var myReadJSON = JSON.parse(myData);

console.log(myReadJSON);

