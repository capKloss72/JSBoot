var arr = [1,2,3,4,5];

for (var i = 0; i < arr.length; i++) {
  //console.log(arr[i]);
}

var i = 0;
while (arr.length > i) {
  console.log(arr[i] + ' i == ' + i);
  i++;
}

i = 0;
do {
  console.log(arr[i] + ' i == ' + i);
  i++;
} while(arr.length > i);