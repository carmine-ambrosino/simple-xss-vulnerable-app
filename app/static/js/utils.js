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

function createButton(imagePath, handler) {
  var button = document.createElement("button");
  button.style.backgroundImage = "url('" + imagePath + "')";
  button.style.backgroundSize = "cover";
  button.style.width = "25px"; // Set icon width
  button.style.height = "25px"; // Set icon height
  button.style.border = "1px solid #ccc"; // Add border to the button
  button.style.marginRight = "10px"; // Set right margin
  button.style.cursor = "pointer"; // Change cursor on hover
  button.style.padding = "12px"; // Add padding to the button
  button.style.borderRadius = "4px"; // Set border radius to make it round
  button.style.backgroundColor = "white"; //Set background color

  button.addEventListener("click", handler);
  return button;
}

function searchCards() {
  var searchTerm = document
    .getElementById("searchInput")
    .value.toLowerCase()
    .trim();

  // Check if the search term is empty
  if (searchTerm === "") {
    // If the search term is empty, do nothing and return
    return;
  }

  // Perform the search only if the search term is not empty
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

  // Enable the back button and disable the addRow button
  document.getElementById("backBtn").disabled = false;
  document.getElementById("addRowBtn").disabled = true;

  // Render the cards with the updated data
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
