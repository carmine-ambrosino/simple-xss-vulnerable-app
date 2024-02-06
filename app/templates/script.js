document.addEventListener('DOMContentLoaded', function () {
    var links = document.querySelectorAll('.mostraSezione');
    var sections = document.querySelectorAll('.sezione');
    var navBar = document.getElementById('nav-bar');
    var navContent = document.getElementById('nav-content');

    // Gestisci il clic sul nav-bar per aprire il nav-content
    navBar.addEventListener('click', function () {
        navContent.style.display = 'block';
    });

    // Gestisci il clic su ciascun link della sezione
    links.forEach(function (link) {
        link.addEventListener('click', function (event) {
            event.preventDefault();

            // Nascondi tutte le sezioni
            sections.forEach(function (section) {
                section.style.display = 'none';
            });

            // Mostra solo la sezione corrispondente al link cliccato
            var targetId = this.getAttribute('href').substring(1); // Rimuovi il carattere '#' dall'id
            var targetSection = document.getElementById(targetId);
            
            // Nascondi il presentation-screen e mostra la sezione
            if (targetSection) {
                document.getElementById('presentation-screen').style.display = 'none';
                targetSection.style.display = 'block';
            }

            // Chiudi il nav-content
            navContent.style.display = 'none';
        });
    });
});




















