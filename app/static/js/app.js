document.addEventListener('DOMContentLoaded', function() {
    var bottone = document.getElementById('myButton');
  
    bottone.addEventListener('click', function() {
      console.log('Il bottone è stato cliccato!');
      var coloreCasuale = '#' + Math.floor(Math.random()*16777215).toString(16);
      bottone.style.backgroundColor = coloreCasuale;
    });
  });
  