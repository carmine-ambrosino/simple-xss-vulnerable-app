const apiEndpoint = "http://127.0.0.1:5000/api"
const medicineBaseUrl = apiEndpoint + "/medicine"

async function getAllMedicines(){
    const resp = await axios.get(medicineBaseUrl+"/get-all")
    return resp.data 
}

// async function getAllMedicines() {
//     try {
//       // Carica la rappresentazione JSON del blueprint
//       const response = await fetch('../static/medicine_bp.json');
//       const blueprintData = await response.json();
  
//       // Estrai l'URL base dal JSON
//       const medicineBaseUrl1 = blueprintData.url_prefix;
  
//       // Costruisci l'URL completo per la richiesta
//       const apiUrl = medicineBaseUrl1 + '/get-all';
  
//       // Esegui la richiesta HTTP usando l'URL dinamico
//       const resp = await axios.get(apiUrl);
  
//       // Restituisci i dati ottenuti dalla richiesta
//       return resp.data;
//     } catch (error) {
//       console.error('Errore durante la richiesta di getAllMedicines:', error);
//       throw error; // Puoi gestire l'errore in modo appropriato o propagarlo
//     }
//   }

async function addMedicine(medicine){
    const resp = await axios.post(medicineBaseUrl, medicine)
    return resp.data
}

async function updateMedicine(medicine){
    const resp = await axios.post(medicineBaseUrl, medicine)
    return resp.data
}

async function deleteMedicine(medicineId){
    const resp = await axios.delete(medicineBaseUrl+'/'+medicineId)
    return resp.data
}





