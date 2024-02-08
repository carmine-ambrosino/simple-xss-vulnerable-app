const contentContainer = document.getElementById("presentation-screen");
let data = [];
let currentEditingCardId = null;
let comingFromPatient = false;
let type = "";
const medicineFieldsName = ["name", "description"];
const patientFieldsName = [
  "name",
  "surname",
  "dt_birth",
  "fiscal_code",
  "phone",
];
const prescriptionFieldsName = ["dt", "description"];
let allPatients = [];
let allMedicines = [];
let tempData = [];

function formatDate(date) {
  const provDate = new Date(date);
  const day = provDate.getDate();
  const month = provDate.getMonth() + 1;
  const year = provDate.getFullYear();
  return day + "/" + month + "/" + year;
}

function formatDateFromString(date) {
  console.log(date);
  const split = date.split("/");
  const day = split[0];
  const month = split[1];
  const year = split[2];
  return new Date(year, month - 1, day);
}

function findIndexByField(array, fieldName, valueToMatch) {
  return array.findIndex(function (obj) {
    return obj[fieldName] === valueToMatch;
  });
}

const route = (event) => {
  event = event || window.event;
  event.preventDefault();
  window.history.pushState({}, "", event.target.href);
  handleLocation();
};

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

  var editBtn = createButton("Edit", function () {
    editCard(card.id);
  });
  var deleteBtn = createButton("Delete", function () {
    deleteCard(card.id);
  });

  cardActions.appendChild(editBtn);
  cardActions.appendChild(deleteBtn);

  if (type === "patient") {
    var prescriptionBtn = createButton("Prescriptions", function () {
      const patientId = card.id;
      data = data.filter((patient) => patient.id === card.id)[0].prescriptions;
      data = data.map((prescription) => {
        prescription.patient_id = card.id;
        prescription.patient_name = card.name + " " + card.surname;
        return prescription;
      });
      comingFromPatient = true;
      window.history.pushState({}, "", "/api/prescription");
      handleLocation();
    });
    cardActions.appendChild(prescriptionBtn);
  }

  cardDiv.appendChild(cardContent);
  cardDiv.appendChild(cardActions);

  return cardDiv;
}

function createButton(label, handler) {
  var button = document.createElement("button");
  button.textContent = label;
  button.addEventListener("click", handler);
  return button;
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

function setModalContent(card = {}, modalTitle) {
  // Ensure that the modal title element exists
  console.log(card);
  for (const fieldName of getCardFields()) {
    const input = document.getElementById(fieldName);
    input.value =
      fieldName === "dt" || fieldName === "dt_birth"
        ? formatDate(card[fieldName])
        : card[fieldName];
  }

  if (type === "prescription") {
    const dropdown = document.getElementsByName("patientDropdown")[0];
    dropdown.selectedIndex = findIndexByField(
      allPatients,
      "id",
      card.patient_id
    );
    const prescription = data.filter(
      (prescription) => prescription.id === card.id
    )[0];
    for (const medicine of prescription.medicines) {
      const checkbox = document.getElementById(medicine.id);
      checkbox.checked = true;
    }
  }

  document.getElementById("modalActionButton").textContent = modalTitle;
}

function openAddCardModal() {
  currentEditingCardId = null; // Reset currentEditingCardId
  var modal = document.getElementById("modal");
  modal.style.display = "block";
}

function openEditCardModal(card) {
  setModalContent(card, "Edit Card");
  currentEditingCardId = card.id; // Set currentEditingCardId
  var modal = document.getElementById("modal");
  modal.style.display = "block";
}

function searchCards() {
  var searchTerm = document
    .getElementById("searchInput")
    .value.toLowerCase()
    .trim();

  if (searchTerm !== "") {
    data = data.filter(function (card) {
      if (type === "prescription") {
        // For prescription cards, check if the formatted date, patient name, or description matches the search term
        return (
          formatDate(card.dt).includes(searchTerm) ||
          card.patient_name.toLowerCase().includes(searchTerm) ||
          card.description.toLowerCase().includes(searchTerm)
        );
      } else if (type === "patient") {
        // For other card types, only check if the card title matches the search term
        return (
          card.name.toLowerCase().includes(searchTerm) ||
          card.surname.toLowerCase().includes(searchTerm) ||
          card.fiscal_code.toLowerCase().includes(searchTerm)
        );
      } else {
        // For other card types, only check if the card title matches the search term
        return card.name.toLowerCase().includes(searchTerm);
      }
    });
    document.getElementById("backBtn").disabled = false;
    document.getElementById("addRowBtn").disabled = true;
  } else {
    // If the search term is empty, reset the data to its original state
    switch (type) {
      case "medicine":
        data = allMedicines;
        break;
      case "patient":
        data = allPatients;
        break;
      case "prescription":
        data = tempData;
        break;
    }
  }
  renderCards();
}

async function goBack() {
  // Reset the search input
  document.getElementById("searchInput").value = "";

  // Reset the data based on the current type and scenario
  switch (type) {
    case "medicine":
      data = await getAllMedicines();
      break;
    case "patient":
      if (comingFromPatient) {
        // If coming from a patient card, show only prescriptions of that patient
        const patientId = window.location.pathname.split("/").pop();
        const patient = allPatients.find((patient) => patient.id === patientId);
        if (patient) {
          data = patient.prescriptions.map((prescription) => ({
            ...prescription,
            patient_id: patient.id,
            patient_name: patient.name + " " + patient.surname,
          }));
        } else {
          console.error("Patient not found.");
          data = [];
        }
      } else {
        // Otherwise, show all patients
        data = await getAllPatients();
      }
      break;
    case "prescription":
      // Assign data to the original prescription data stored in tempData
      data = tempData || [];
      break;
    default:
      console.error("Invalid type:", type);
      break;
  }

  // Reset the comingFromPatient flag
  comingFromPatient = false;

  // Disable the back button and enable the addRow button
  document.getElementById("backBtn").disabled = true;
  document.getElementById("addRowBtn").disabled = false;

  // Render the cards with the updated data
  renderCards();
}

function getModalInput(modalContentDiv, fieldName) {
  var nameLabel = document.createElement("label");
  nameLabel.setAttribute("for", fieldName);
  nameLabel.textContent = fieldName;

  // Create the Name input
  var nameInput = document.createElement("input");
  nameInput.type = "text";
  nameInput.id = fieldName;
  nameInput.class = "field-value";
  nameInput.placeholder = "Enter " + fieldName;

  modalContentDiv.appendChild(nameLabel);
  modalContentDiv.appendChild(nameInput);
}

function getModalContainer() {
  // Create the main modal div
  const modalDiv = document.createElement("div");
  modalDiv.id = "modal";
  modalDiv.className = "modal";

  // Create the modal content div
  var modalContentDiv = document.createElement("div");
  modalContentDiv.className = "modal-content";

  if (type === "prescription") {
    var dropdown = document.createElement("select");
    dropdown.name = "patientDropdown";
    for (const patient of allPatients) {
      var option = document.createElement("option");
      option.value = patient.id;
      option.text = patient.name + " " + patient.surname;
      dropdown.appendChild(option);
    }
    var label = document.createElement("label");
    label.textContent = "Patient: ";
    dropdown.selectedIndex = -1;
    modalContentDiv.appendChild(label);
    modalContentDiv.appendChild(dropdown);
  }

  for (fieldName of getCardFields()) {
    getModalInput(modalContentDiv, fieldName);
  }

  if (type === "prescription") {
    var medicineListContainer = document.createElement("div");
    medicineListContainer.class = "medicine-list-container";
    for (const medicine of allMedicines) {
      var medicineContainer = document.createElement("div");
      var checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.name = medicine.name;
      checkbox.id = medicine.id;
      checkbox.className = "prescription-medicine-checkbox";
      var label = document.createElement("label");
      label.textContent = medicine.name;
      label.setAttribute("for", medicine.id);
      medicineContainer.appendChild(checkbox);
      medicineContainer.appendChild(label);
      medicineListContainer.appendChild(medicineContainer);
    }
    modalContentDiv.appendChild(medicineListContainer);
  }

  // Create the Add Card button
  var addButton = document.createElement("button");
  addButton.id = "modalActionButton";
  addButton.textContent = "Add Card";
  addButton.addEventListener("click", modalAction);

  // Create the Close button
  var closeButton = document.createElement("span");
  closeButton.className = "close";
  closeButton.id = "closeModalBtn";
  closeButton.textContent = "×";
  closeButton.addEventListener("click", closeModal);

  // Append elements to build the modal structure
  modalContentDiv.appendChild(addButton);
  modalContentDiv.appendChild(closeButton);

  modalDiv.appendChild(modalContentDiv);
  return modalDiv;
}
function modalAction() {
  updatedCard = {};
  for (const fieldName of getCardFields()) {
    if (fieldName === "dt" || fieldName === "dt_birth") {
      console.log(document.getElementById(fieldName).value);
      updatedCard[fieldName] = formatDateFromString(
        document.getElementById(fieldName).value
      );
    } else {
      updatedCard[fieldName] = document.getElementById(fieldName).value;
    }
  }

  if (type === "prescription") {
    const medicinesList = [];
    for (const checkbox of document.getElementsByClassName(
      "prescription-medicine-checkbox"
    )) {
      console.log(checkbox.checked);
      if (checkbox.checked) {
        medicinesList.push(
          allMedicines.filter((medicine) => medicine.id === checkbox.id)[0]
        );
      }
    }
    updatedCard.medicines = medicinesList;
    const patientSelect = document.getElementsByName("patientDropdown")[0];
    updatedCard.id_patient = allPatients[patientSelect.selectedIndex].id;
  }

  console.log(updatedCard);

  if (currentEditingCardId) updatedCard.id = currentEditingCardId;

  if (currentEditingCardId) {
    // If currentEditingCardId is present, update existing card
    getUpdateOperation()(updatedCard);
    var index = data.findIndex((card) => card.id === currentEditingCardId);
    data[index] = updatedCard;
  } else {
    // Otherwise, add a new card
    getInsertOperation()(updatedCard);
    data.push(updatedCard);
    //originalData.push(updatedCard);
  }

  renderCards();
  closeModal();
}

function closeModal() {
  var modal = document.getElementById("modal");
  modal.style.display = "none";

  for (const fieldName of getCardFields()) {
    document.getElementById(fieldName).value = "";
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
  crudCards.class = "crud-cards";
  const controls = document.createElement("div");
  controls.class = "controls";
  const input = document.createElement("input");
  input.type = "text";
  input.id = "searchInput";
  input.placeholder = "Search";
  const searchBtn = document.createElement("button");
  searchBtn.id = "searchBtn";
  searchBtn.appendChild(document.createTextNode("Search"));
  searchBtn.id = "searchBtn";
  searchBtn.textContent = "Search";
  const backBtn = document.createElement("button");
  backBtn.id = "backBtn";
  backBtn.disabled = "true";
  backBtn.appendChild(document.createTextNode("Back"));
  const addRowBtn = document.createElement("button");
  addRowBtn.id = "addRowBtn";
  addRowBtn.appendChild(document.createTextNode("Add Card"));

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
  cardContainer.class = "card-container";

  renderCards(cardContainer);

  crudCards.appendChild(cardContainer);
  return crudCards;
}
/*
<div id="modal" class="modal">
    <div class="modal-content">
        <label for="cardName">Name:</label>
        <input type="text" id="cardName" placeholder="Enter name">
        <label for="cardDescription">Description:</label>
        <input type="text" id="cardDescription" placeholder="Enter description">
        <button id="modalActionButton">Add Card</button>
        <span class="close" id="closeModalBtn">&times;</span>
    </div>
</div>
*/

async function handleMedicineRoute() {
  contentContainer.innerHTML = "";
  type = "medicine";
  data = await getAllMedicines();
  contentContainer.appendChild(getCrudControls(data));
  contentContainer.appendChild(getModalContainer());
}

async function handlePatientRoute() {
  contentContainer.innerHTML = "";
  type = "patient";
  data = await getAllPatients();
  console.log(data);
  contentContainer.appendChild(getCrudControls(data));
  contentContainer.appendChild(getModalContainer());
}

async function handlePrescriptionRoute() {
  contentContainer.innerHTML = "";
  type = "prescription";
  allPatients = await getAllPatients();
  allMedicines = await getAllMedicines();

  if (!comingFromPatient) {
    tempData = [];
    for (const patient of allPatients) {
      for (const prescription of patient.prescriptions) {
        prescription.patient_id = patient.id;
        prescription.patient_name = patient.name + " " + patient.surname;
      }
      tempData = tempData.concat(patient.prescriptions);
    }
    data = tempData;
  } else {
    comingFromPatient = false; // Resetta il flag
  }

  contentContainer.appendChild(getCrudControls(data));
  contentContainer.appendChild(getModalContainer());
}

function handleHomeRoute() {
  contentContainer.innerHTML = "";
  var titleContainer = document.createElement("h1");
  titleContainer.textContent = "Welcome Doctor!";
  var paragraphContainer = document.createElement("p");
  paragraphContainer.textContent =
    "GP-Office is here for you.";
  contentContainer.appendChild(titleContainer);
  contentContainer.appendChild(paragraphContainer);
}

const routes_function = {
  "/": handleHomeRoute,
  "/api": handleHomeRoute,
  "/api/medicine": handleMedicineRoute,
  "/api/patient": handlePatientRoute,
  "/api/prescription": handlePrescriptionRoute,
};

const handleLocation = () => {
  const path = window.location.pathname;
  console.log(path);

  // redirect to '/api' whenever refreshing the page
  window.onbeforeunload = function () {
    window.setTimeout(function () {
      window.location.href = "/api";
    }, 0);
    window.onbeforeunload = null; // necessary to prevent infinite loop, that kills your browser
  };

  const routeHandler = routes_function[path];

  if (routeHandler && typeof routeHandler === "function") {
    routeHandler();
  } else {
    window.history.pushState({}, "", "/api");
    handleHomeRoute();
    console.error(`Handler for route '${path}' not found or not a function.`);
  }
};

window.onpopstate = handleLocation;
window.route = route;

handleLocation();
