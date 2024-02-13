const route = (event) => {
  event = event || window.event;
  event.preventDefault();
  window.history.pushState({}, "", event.target.href);
  handleLocation();
};

async function handleMedicineRoute() {
  contentContainer.innerHTML = "";
  type = "medicine";
  data = await getAllMedicines();

  const page = document.createElement("h1");
  page.textContent = "Medicines";
  page.style.textAlign = "center";

  // Create image
  const image = document.createElement("img");
  image.src = "../static/images/icons/medicine.png";
  image.alt = "Patients icon";
  image.width = "25";
  image.height = "27";
  contentContainer.appendChild(image);

  contentContainer.appendChild(page);

  contentContainer.appendChild(getCrudControls(data));
  contentContainer.appendChild(getModalContainer());
}

async function handlePatientRoute() {
  contentContainer.innerHTML = "";
  type = "patient";
  data = await getAllPatients();
  console.log("Data handle patient", data);

  const page = document.createElement("h1");
  page.textContent = "Patients";
  page.style.textAlign = "center";

  // Create image
  const image = document.createElement("img");
  image.src = "../static/images/icons/patient.png";
  image.alt = "Patients icon";
  image.width = "25";
  image.height = "27";

  contentContainer.appendChild(image);
  contentContainer.appendChild(page);

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
    comingFromPatient = false; // Flag Reset
  }

  const page = document.createElement("h1");
  page.textContent = "Prescriptions";
  page.style.textAlign = "center";

  // Create image
  const image = document.createElement("img");
  image.src = "../static/images/icons/prescription-nav.png";
  image.alt = "Patients icon";
  image.width = "25";
  image.height = "27";

  contentContainer.appendChild(image);
  contentContainer.appendChild(page);

  contentContainer.appendChild(getCrudControls(data));
  contentContainer.appendChild(getModalContainer());
}

function handleHomeRoute() {
  contentContainer.innerHTML = "";

  var titleContainer = document.createElement("h1");
  titleContainer.textContent = "Welcome Doctor!";
  var paragraphContainer = document.createElement("p");
  paragraphContainer.textContent = "GP-Office is here for you.";

  // Create image
  const image = document.createElement("img");
  image.src = "../static/images/gpofficelogo.png";
  image.alt = "Patients icon";
  image.width = "250";
  image.height = "250";

  contentContainer.appendChild(image);
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
  console.log("path", path);
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
