



document.addEventListener("DOMContentLoaded", function () {
    // On init load medicine
    loadMedicineCards();
});


function loadMedicineCards() {

    fetch('/api/medicine/get-all')
      .then(response => response.json())
      .then(data => {
        const tableBody = document.querySelector('#table tbody');

        data.forEach(item => {
          const row = tableBody.insertRow();
          const cell1 = row.insertCell(0);
          const cell2 = row.insertCell(1);
          const cell3 = row.insertCell(2);

          cell1.textContent = item.id;
          cell2.textContent = item.name; 
          cell3.textContent = item.description;
        });
      })
      .catch(error => console.error('Errore nella chiamata al backend:', error));

}


function addMedicine() {
    // Get name and description
    var name = document.getElementById("name").value;
    var description = document.getElementById("description").value;

    // Create JSON object
    var data = {
      name: name,
      description: description,
    };

    // Do POST using Fetch API
    fetch("/api/medicine", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Medicine Created!");
      })
      .catch((error) => {
        console.error("Errore create medicine", error);
      });
  }

  function reloadMedicine() { loadMedicineCards();}

  function getMedicineById() {
    const medicineId = document.getElementById('medicineId').value;

    fetch(`/api/medicine/${medicineId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Medicine not found');
            }
            return response.json();
        })
        .then(data => {
            const medicineList = document.getElementById('singleMedicine');
            const card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `<h3>${data.name}</h3><p>${data.description}</p><p>${data.id}</p>`;
            medicineList.appendChild(card);
        })
        .catch(error => console.error('Error request', error));
}