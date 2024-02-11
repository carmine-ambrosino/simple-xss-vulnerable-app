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
let currentEditingCardPatientName = "";
let patientName ="";
