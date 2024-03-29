function setModalContent(card = {}, modalTitle) {
  currentEditingCardPatientName = card.patient_name;
  // Ensure that the modal title element exists
  console.log("card ", card);
  for (const fieldName of getCardFields()) {
    const input = document.getElementById(fieldName);
    input.value =
      fieldName === "dt" || fieldName === "dt_birth"
        ? formatDate(card[fieldName])
        : card[fieldName];
  }

  if (type === "prescription") {
    patientName = card.patient_name || currentEditingCardPatientName;
    const patientDropdown = document.getElementsByName("patientDropdown")[0];
    if (patientDropdown) {
      const selectedIndex = findIndexByField(allPatients, "id", card.patient_id);
      patientDropdown.selectedIndex = selectedIndex !== -1 ? selectedIndex : 0;
    }
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
  document.getElementById("modalActionButton").textContent = "Add Card ";
  currentEditingCardId = null; // Reset currentEditingCardId
  var modal = document.getElementById("modal");
  modal.style.display = "block";
}

function openEditCardModal(card) {
  originalFiscalCodeValue = card.fiscal_code;
  setModalContent(card, "Edit Card ");
  currentEditingCardId = card.id; // Set currentEditingCardId
  currentEditingCardPatientName = card.patient_name || "";
  var modal = document.getElementById("modal");
  modal.style.display = "block";
}

function getModalInput(modalContentDiv, fieldName) {
  var nameLabel = document.createElement("label");
  nameLabel.setAttribute("for", fieldName);
  
  switch (fieldName) {
    case "name":
      nameLabel.textContent = "Name:";
      break;
    case "surname":
      nameLabel.textContent = "Surname:";
      break;
    case "fiscal_code":
      nameLabel.textContent = "Fiscal Code:";
      break;
    case "phone":
      nameLabel.textContent = "Phone Number:";
      break;
    case "dt_birth":
      nameLabel.textContent = "Date of Birth:";
      break;
    case "dt":
      nameLabel.textContent = "Date of Prescription:";
      break;
    case "description":
      nameLabel.textContent = "Description:";
      break;
    default:
      nameLabel.textContent = fieldName;
      break;
  }
  nameLabel.classList.add("form-group");

  // Create the Name input
  var nameInput = document.createElement("input");
  nameInput.type = "text";
  nameInput.id = fieldName;
  nameInput.classList.add("field-value");
  if (fieldName === "dt" || fieldName === "dt_birth") {
    nameInput.placeholder = "GG/MM/YYYYY"; 
  } else {
    nameInput.placeholder = "Enter " + fieldName;
  }
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
    var medicineLabel = document.createElement("label");
    medicineLabel.textContent = "Medicine:";
    modalContentDiv.appendChild(medicineLabel);
    var medicineListContainer = document.createElement("div");
    medicineListContainer.className = "medicine-list-container";
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

async function modalAction() {
  updatedCard = {};
  for (const fieldName of getCardFields()) {
    if (fieldName === "dt" || fieldName === "dt_birth") {
      updatedCard[fieldName] = formatDateFromString(
        document.getElementById(fieldName).value
      );
    } else {
      updatedCard[fieldName] = document.getElementById(fieldName).value;
    }

    if (fieldName === "fiscal_code" && originalFiscalCodeValue) { 
      const fiscal_code_from_card = originalFiscalCodeValue;
      try {
        const patientInfo = await getAllInfoPatientFromFiscalCode(fiscal_code_from_card);
        updatedCard.prescriptions = patientInfo[0].prescriptions;

      } catch (error) {
        console.error('No patient found with this fiscal code:', error);
      }
    }

  }

  if (type === "prescription") {
    const medicinesList = [];
    for (const checkbox of document.getElementsByClassName(
      "prescription-medicine-checkbox"
    )) {
      console.log("check", checkbox.checked);
      if (checkbox.checked) {
        medicinesList.push(
          allMedicines.filter((medicine) => medicine.id === checkbox.id)[0]
        );
      }
    }
    updatedCard.medicines = medicinesList;
    const patientSelect = document.getElementsByName("patientDropdown")[0];
    updatedCard.id_patient = allPatients[patientSelect.selectedIndex].id;
    updatedCard.patient_name =
      allPatients[patientSelect.selectedIndex].name +
      " " +
      allPatients[patientSelect.selectedIndex].surname;
  }

  console.log("updated Card ", updatedCard);

  if (currentEditingCardId) {
    updatedCard.id = currentEditingCardId;
    // If currentEditingCardId is present, update existing card
    getUpdateOperation()(updatedCard);
    var index = data.findIndex((card) => card.id === currentEditingCardId);
    data[index] = updatedCard;
  } else {
    // Otherwise, add a new card
    getInsertOperation()(updatedCard);
    data.push(updatedCard);
  }

  renderCards();
  closeModal();

  if (!currentEditingCardId) {
    setTimeout(function(){location.reload()}, 100);
  }
}

function closeModal() {
  var modal = document.getElementById("modal");
  modal.style.display = "none";

  for (const fieldName of getCardFields()) {
    document.getElementById(fieldName).value = "";
  }
}
