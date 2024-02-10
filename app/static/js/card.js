function getCard(card) {
  var cardDiv = document.createElement("div");
  cardDiv.classList.add("card");

  var cardContent = document.createElement("div");
  cardContent.classList.add("card-content");

  var cardTitle = document.createElement("div");
  cardContent.appendChild(cardTitle);

  switch (type) {
    case "medicine":
      cardTitle.innerHTML = "<h2>" + card.name + "</h2>";
      var cardSubtitle = document.createElement("div");
      cardSubtitle.innerHTML = "<p>" + card.description + "</p>";
      cardContent.appendChild(cardSubtitle);
      break;
    case "patient":
      cardTitle.innerHTML = "<h2>" + card.name + " " + card.surname + "</h2>";
      var cardSubtitle1 = document.createElement("div");
      cardSubtitle1.innerHTML = "<p>" + formatDate(card.dt_birth) + "</p>";
      cardContent.appendChild(cardSubtitle1);
      var cardSubtitle2 = document.createElement("div");
      cardSubtitle2.innerHTML = "<p>" + card.fiscal_code + "</p>";
      cardContent.appendChild(cardSubtitle2);
      var cardSubtitle3 = document.createElement("div");
      cardSubtitle3.innerHTML = "<p>" + card.phone + "</p>";
      cardContent.appendChild(cardSubtitle3);

      break;
    case "prescription":
      cardTitle.innerHTML = formatDate(card.dt);
      var cardSubtitle1 = document.createElement("div");
      cardSubtitle1.innerHTML = "<p>" + card.patient_name + "</p>";
      cardContent.appendChild(cardSubtitle1);

      var cardSubtitle2 = document.createElement("div");
      cardSubtitle2.innerHTML = "<p>" + card.description + "</p>";
      cardContent.appendChild(cardSubtitle2);

      var cardSubtitle3 = document.createElement("div");
      if (card.medicines && card.medicines.length > 0) {
        cardSubtitle3.innerHTML =
          "<p>" +
          card.medicines.map((medicine) => medicine.name).join(", ") +
          "</p>";
      } else {
        cardSubtitle3.innerHTML = "<p>No medicines prescribed</p>";
      }
      cardContent.appendChild(cardSubtitle3);
      break;
  }

  var cardActions = document.createElement("div");
  cardActions.classList.add("card-actions");

  var editBtn = createButton("../static/images/icons/edit.png", function () {
    editCard(card.id);
  });
  var deleteBtn = createButton(
    "../static/images/icons/delete.png",
    function () {
      deleteCard(card.id);
    }
  );

  cardActions.appendChild(editBtn);
  cardActions.appendChild(deleteBtn);

  if (type === "patient") {
    var prescriptionBtn = createButton(
      "../static/images/icons/prescription.png",
      function () {
        const patientId = card.id;
        data = data.filter((patient) => patient.id === card.id)[0]
          .prescriptions;
        data = data.map((prescription) => {
          prescription.patient_id = card.id;
          prescription.patient_name = card.name + " " + card.surname;
          return prescription;
        });
        comingFromPatient = true;
        window.history.pushState({}, "", "/api/prescription");
        handleLocation();
      }
    );

    cardActions.appendChild(prescriptionBtn);
  }

  cardDiv.appendChild(cardContent);
  cardDiv.appendChild(cardActions);

  return cardDiv;
}

function editCard(id) {
  var card = data.find(function (item) {
    return item.id === id;
  });

  if (card) {
    openEditCardModal(card);
  }
}

function deleteCard(id) {
  var confirmDelete = confirm("Are you sure you want to delete this card?");

  if (confirmDelete) {
    getDeleteOperation()(id);
    data = data.filter(function (item) {
      return item.id !== id;
    });

    renderCards();
  }
}

function getCardFields() {
  let arrayFields = [];
  switch (type) {
    case "medicine":
      return medicineFieldsName;
    case "patient":
      return patientFieldsName;
    case "prescription":
      return prescriptionFieldsName;
  }
}

function getDeleteOperation() {
  switch (type) {
    case "medicine":
      return deleteMedicine;
    case "patient":
      return deletePatient;
    case "prescription":
      return deletePrescription;
  }
}

function getUpdateOperation() {
  switch (type) {
    case "medicine":
      return updateMedicine;
    case "patient":
      return updatePatient;
    case "prescription":
      return updatePrescription;
  }
}

function getInsertOperation() {
  switch (type) {
    case "medicine":
      return addMedicine;
    case "patient":
      return addPatient;
    case "prescription":
      return addPrescription;
  }
}

function getCardData() {
  switch (type) {
    case "medicine":
      return getAllMedicines;
    case "patient":
      return getAllPatients;
    case "prescription":
      return getAllPrescriptions;
  }
}

function editCard(id) {
  var card = data.find(function (item) {
    return item.id === id;
  });

  if (card) {
    openEditCardModal(card);
  }
}

function renderCards(cardContainer) {
  const cardCont = cardContainer || document.getElementById("card-container");
  cardCont.innerHTML = "";
  for (const elem of data) {
    cardCont.appendChild(getCard(elem));
  }
}

function getCrudControls() {
  const crudCards = document.createElement("div");
  crudCards.className = "crud-cards";
  const controls = document.createElement("div");
  controls.className = "controls";
  const input = document.createElement("input");
  input.type = "text";
  input.id = "searchInput";
  input.placeholder = "Search";
  const searchBtn = document.createElement("button");
  searchBtn.id = "searchBtn";

  searchBtn.innerHTML =
    '<img src="../static/images/icons/search.png" alt="Search" width="17px" height="17px">';
  const backBtn = document.createElement("button");
  backBtn.id = "backBtn";
  backBtn.disabled = true;
  backBtn.innerHTML =
    '<img src="../static/images/icons/back.png" alt="Back" width="17px" height="17px">';
  const addRowBtn = document.createElement("button");
  addRowBtn.id = "addRowBtn";
  addRowBtn.innerHTML =
    '<img src="../static/images/icons/add.png" alt="Add Card" width="17px" height="17px">';

  searchBtn.addEventListener("click", searchCards);
  backBtn.addEventListener("click", goBack);
  addRowBtn.addEventListener("click", openAddCardModal);

  controls.appendChild(input);
  controls.appendChild(searchBtn);
  controls.appendChild(backBtn);
  controls.appendChild(addRowBtn);

  crudCards.appendChild(controls);

  var cardContainer = document.createElement("div");
  cardContainer.id = "card-container";
  cardContainer.className = "card-container";

  renderCards(cardContainer);

  crudCards.appendChild(cardContainer);
  return crudCards;
}
