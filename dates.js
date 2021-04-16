function getCurrentDate() {
  document.getElementById("testitgood").innerHTML = new Date();
}
getCurrentDate();
setInterval(getCurrentDate, 1000);