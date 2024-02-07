async function getAllMedicines() {
    try {
      // Carica la rappresentazione JSON del blueprint
      const response = await fetch('../static/medicine_bp.json');
      const blueprintData = await response.json();
  
      // Estrai l'URL base dal JSON
      const medicineBaseUrl = blueprintData.url_prefix;
  
      // Costruisci l'URL completo per la richiesta
      const apiUrl = medicineBaseUrl + '/get-all';
  
      // Esegui la richiesta HTTP usando l'URL dinamico
      const resp = await axios.get(apiUrl);
  
      // Restituisci i dati ottenuti dalla richiesta
      return resp.data;
    } catch (error) {
      console.error('Errore durante la richiesta di getAllMedicines:', error);
      throw error; // Puoi gestire l'errore in modo appropriato o propagarlo
    }
}

async function addMedicine(medicine) {
    try {
        const response = await fetch('../static/medicine_bp.json');
        const blueprintData = await response.json();
   
        const medicineBaseUrl = blueprintData.url_prefix;

        const apiUrl = medicineBaseUrl;

        const resp = await axios.post(apiUrl, medicine);

        return resp.data;
      } catch (error) {
        console.error('Errore durante la richiesta di addMedicine:', error);
        throw error; 
      }
}

async function updateMedicine(medicine) {
    try {
        const response = await fetch('../static/medicine_bp.json');
        const blueprintData = await response.json();
   
        const medicineBaseUrl = blueprintData.url_prefix;

        const apiUrl = medicineBaseUrl;

        const resp = await axios.post(apiUrl, medicine);

        return resp.data;
      } catch (error) {
        console.error('Errore durante la richiesta di updateMedicine:', error);
        throw error; 
      }
}

async function deleteMedicine(medicineId) {
    try {
        const response = await fetch('../static/medicine_bp.json');
        const blueprintData = await response.json();
   
        const medicineBaseUrl = blueprintData.url_prefix;

        const apiUrl = medicineBaseUrl;

        const resp = await axios.delete(apiUrl+'/'+medicineId);

        return resp.data;
      } catch (error) {
        console.error('Errore durante la richiesta di deleteMedicine:', error);
        throw error; 
      }
}


